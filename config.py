import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv()

ROOT_DIR = Path(__file__).parent
DATA_DIR = ROOT_DIR / "data"
OUTPUT_DIR = ROOT_DIR / "output"
CACHE_DIR = ROOT_DIR / "output" / "cache"

for _dir in (DATA_DIR, OUTPUT_DIR, CACHE_DIR):
    _dir.mkdir(parents=True, exist_ok=True)

LLM_PROVIDER = os.environ.get("LLM_PROVIDER", "gemini")  # "gemini" | "groq" | "anthropic"

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "")
GEMINI_MODEL = os.environ.get("GEMINI_MODEL", "gemini-2.0-flash")

GROQ_API_KEY = os.environ.get("GROQ_API_KEY", "")
GROQ_MODEL = os.environ.get("GROQ_MODEL", "llama-3.3-70b-versatile")

ANTHROPIC_API_KEY = os.environ.get("ANTHROPIC_API_KEY", "")
ANTHROPIC_MODEL = os.environ.get("ANTHROPIC_MODEL", "claude-sonnet-5-5")

PEXELS_API_KEY = os.environ.get("PEXELS_API_KEY", "")

YOUTUBE_CLIENT_SECRET_FILE = os.environ.get(
    "YOUTUBE_CLIENT_SECRET_FILE", "credentials/client_secret.json"
)
YOUTUBE_TOKEN_FILE = os.environ.get("YOUTUBE_TOKEN_FILE", "credentials/token.json")

CHANNEL_NAME = os.environ.get("CHANNEL_NAME", "rgraphiiee")
CHANNEL_NICHE = os.environ.get(
    "CHANNEL_NICHE", "faceless narration: facts, stories, and top-10 lists"
)
VIDEO_LANGUAGE = os.environ.get("VIDEO_LANGUAGE", "en")
TTS_VOICE = os.environ.get("TTS_VOICE", "en-US-GuyNeural")

_res = os.environ.get("VIDEO_RESOLUTION", "1920x1080")
VIDEO_WIDTH, VIDEO_HEIGHT = (int(x) for x in _res.split("x"))

DEFAULT_PRIVACY_STATUS = os.environ.get("DEFAULT_PRIVACY_STATUS", "private")

USED_TOPICS_FILE = DATA_DIR / "used_topics.json"
