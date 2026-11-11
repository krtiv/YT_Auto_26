import hashlib
from pathlib import Path

import requests

import config

PEXELS_SEARCH_URL = "https://api.pexels.com/videos/search"


def _cache_path(query: str) -> Path:
    digest = hashlib.sha1(query.encode()).hexdigest()[:16]
    return config.CACHE_DIR / "footage" / f"{digest}.mp4"


def _pick_best_video_file(video: dict) -> str:
    """Pick the HD file closest to the channel's target resolution."""
    files = sorted(
        video["video_files"],
        key=lambda f: abs((f.get("width") or 0) - config.VIDEO_WIDTH),
    )
    hd_files = [f for f in files if (f.get("height") or 0) >= 720]
    return (hd_files or files)[0]["link"]


def search_clip_url(query: str) -> str:
    """Return a direct download URL for a Pexels video matching `query`,
    or raise if nothing is found."""
    if not config.PEXELS_API_KEY:
        raise RuntimeError("PEXELS_API_KEY is not set. Add it to your .env file.")

    response = requests.get(
        PEXELS_SEARCH_URL,
        headers={"Authorization": config.PEXELS_API_KEY},
        params={"query": query, "orientation": "landscape", "per_page": 5},
        timeout=30,
    )
    response.raise_for_status()
    results = response.json().get("videos", [])
    if not results:
        raise ValueError(f"No Pexels results for query: {query!r}")
    return _pick_best_video_file(results[0])


def fetch_clip(query: str) -> Path:
    """Download (or reuse a cached copy of) a stock video matching `query`.
    Returns the local file path."""
    cache_path = _cache_path(query)
    if cache_path.exists():
        return cache_path

    url = search_clip_url(query)
    cache_path.parent.mkdir(parents=True, exist_ok=True)
    with requests.get(url, stream=True, timeout=60) as response:
        response.raise_for_status()
        with open(cache_path, "wb") as f:
            for chunk in response.iter_content(chunk_size=1 << 20):
                f.write(chunk)
    return cache_path


def fetch_clip_for_scene(scene: dict) -> Path:
    """Try each of a scene's visual_keywords in order until one returns a clip."""
    last_error = None
    for keyword in scene["visual_keywords"]:
        try:
            return fetch_clip(keyword)
        except (requests.HTTPError, ValueError) as exc:
            last_error = exc
    raise RuntimeError(
        f"Could not find stock footage for any of {scene['visual_keywords']}"
    ) from last_error
