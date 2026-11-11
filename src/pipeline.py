import re
import time
from pathlib import Path
from typing import Optional

import config
from src import idea_generator, metadata_generator, script_generator, tts
from src import stock_footage, video_builder, youtube_uploader


def _slugify(text: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")
    return slug[:60] or "video"


def run_pipeline(
    topic_hint: Optional[str] = None,
    upload: bool = True,
    privacy_status: Optional[str] = None,
    publish_at: Optional[str] = None,
) -> dict:
    """Run idea -> script -> voiceover -> footage -> video -> metadata ->
    (optional) upload, end to end. Returns a summary dict of every stage's
    output, including the final video path and, if uploaded, the video id.
    """
    idea = idea_generator.generate_idea(topic_hint)
    script = script_generator.generate_script(idea)

    run_id = f"{int(time.time())}_{_slugify(idea['title'])}"
    work_dir = config.OUTPUT_DIR / run_id

    scenes = tts.synthesize_script(script, work_dir)
    for scene in scenes:
        clip_path = stock_footage.fetch_clip_for_scene(scene)
        scene["clip_path"] = str(clip_path)

    video_path = work_dir / "final.mp4"
    video_builder.build_video(scenes, video_path)

    metadata = metadata_generator.generate_metadata(idea, script)

    result = {
        "idea": idea,
        "script": script,
        "video_path": str(video_path),
        "metadata": metadata,
        "video_id": None,
    }

    if upload:
        video_id = youtube_uploader.upload_video(
            video_path,
            metadata,
            privacy_status=privacy_status,
            publish_at=publish_at,
        )
        result["video_id"] = video_id

    return result
