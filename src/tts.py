import asyncio
from pathlib import Path

import edge_tts
from moviepy import AudioFileClip

import config


async def _synthesize_one(text: str, out_path: Path, voice: str) -> None:
    communicate = edge_tts.Communicate(text, voice)
    await communicate.save(str(out_path))


def synthesize_scene(text: str, out_path: Path, voice: str = None) -> float:
    """Synthesize narration text to an mp3 file, return its duration in seconds."""
    voice = voice or config.TTS_VOICE
    out_path.parent.mkdir(parents=True, exist_ok=True)
    asyncio.run(_synthesize_one(text, out_path, voice))
    with AudioFileClip(str(out_path)) as clip:
        return clip.duration


def synthesize_script(script: dict, work_dir: Path) -> list[dict]:
    """Synthesize every scene's narration, returning the script's scenes
    enriched with "audio_path" and "duration" fields."""
    audio_dir = work_dir / "audio"
    audio_dir.mkdir(parents=True, exist_ok=True)

    enriched_scenes = []
    for i, scene in enumerate(script["scenes"]):
        audio_path = audio_dir / f"scene_{i:02d}.mp3"
        duration = synthesize_scene(scene["narration"], audio_path)
        enriched_scenes.append(
            {**scene, "audio_path": str(audio_path), "duration": duration}
        )
    return enriched_scenes
