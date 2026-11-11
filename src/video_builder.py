import textwrap
from pathlib import Path

import numpy as np
from moviepy import (
    AudioFileClip,
    CompositeVideoClip,
    ImageClip,
    VideoFileClip,
    concatenate_videoclips,
    vfx,
)
from PIL import Image, ImageDraw, ImageFont

import config

CAPTION_FONT_CANDIDATES = [
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
]


def _load_caption_font(size: int) -> ImageFont.ImageFont:
    for path in CAPTION_FONT_CANDIDATES:
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def _make_caption_image(text: str, width: int, height: int) -> np.ndarray:
    """Render a semi-transparent caption bar with wrapped white text, sized
    to the full video frame, for compositing near the bottom of the frame."""
    font_size = max(24, width // 32)
    font = _load_caption_font(font_size)
    wrapped = textwrap.fill(text, width=36)

    img = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    text_bbox = draw.multiline_textbbox((0, 0), wrapped, font=font, align="center")
    text_w = text_bbox[2] - text_bbox[0]
    text_h = text_bbox[3] - text_bbox[1]

    pad_x, pad_y = 40, 24
    box_w = text_w + 2 * pad_x
    box_h = text_h + 2 * pad_y
    box_x = (width - box_w) // 2
    box_y = height - box_h - int(height * 0.08)

    draw.rounded_rectangle(
        [box_x, box_y, box_x + box_w, box_y + box_h],
        radius=20,
        fill=(0, 0, 0, 160),
    )
    draw.multiline_text(
        (width // 2, box_y + box_h // 2),
        wrapped,
        font=font,
        fill=(255, 255, 255, 255),
        anchor="mm",
        align="center",
    )
    return np.array(img)


def _fit_clip_to_frame(clip: VideoFileClip, width: int, height: int) -> VideoFileClip:
    """Scale a clip up to cover the target frame, then center-crop to it."""
    scale = max(width / clip.w, height / clip.h)
    resized = clip.resized(scale)
    x_center, y_center = resized.w / 2, resized.h / 2
    return resized.cropped(
        x_center=x_center, y_center=y_center, width=width, height=height
    )


def _build_scene_clip(scene: dict, width: int, height: int) -> CompositeVideoClip:
    duration = scene["duration"]
    raw_clip = VideoFileClip(scene["clip_path"])
    fitted = _fit_clip_to_frame(raw_clip, width, height)

    if fitted.duration < duration:
        fitted = fitted.with_effects([vfx.Loop(duration=duration)])
    video_clip = fitted.subclipped(0, duration).without_audio()

    narration_audio = AudioFileClip(scene["audio_path"])
    video_clip = video_clip.with_audio(narration_audio)

    caption_array = _make_caption_image(scene["narration"], width, height)
    caption_clip = ImageClip(caption_array).with_duration(duration)

    return CompositeVideoClip([video_clip, caption_clip], size=(width, height))


def build_video(
    scenes: list[dict],
    out_path: Path,
    width: int = None,
    height: int = None,
    fps: int = 30,
) -> Path:
    """Assemble scenes (each with narration, audio_path, clip_path, duration)
    into a single narrated video with burned-in captions."""
    width = width or config.VIDEO_WIDTH
    height = height or config.VIDEO_HEIGHT

    scene_clips = [_build_scene_clip(scene, width, height) for scene in scenes]
    final_clip = concatenate_videoclips(scene_clips, method="compose")

    out_path.parent.mkdir(parents=True, exist_ok=True)
    final_clip.write_videofile(
        str(out_path),
        fps=fps,
        codec="libx264",
        audio_codec="aac",
        threads=4,
        logger=None,
    )

    for clip in scene_clips:
        clip.close()
    final_clip.close()

    return out_path
