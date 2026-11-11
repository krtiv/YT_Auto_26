# YT_Auto_26

Automation pipeline for a faceless-narration YouTube channel (facts, stories,
top-10 lists). Given a topic hint (or none), it:

1. **Generates a video idea** (title, hook, angle) with an LLM, avoiding
   topics it's already used.
2. **Writes a scene-by-scene script** (narration + stock-footage search
   keywords per scene).
3. **Synthesizes voiceover audio** per scene with `edge-tts` (free, no API
   key required).
4. **Fetches matching stock footage** per scene from Pexels.
5. **Assembles the final video**: footage cropped/looped to match each
   scene's voiceover length, with burned-in captions.
6. **Generates upload metadata** (title, description, tags) with an LLM.
7. **Uploads to YouTube** via the YouTube Data API, with optional scheduled
   publishing.

The whole pipeline can run on entirely free services: Gemini or Groq for
the LLM steps, `edge-tts` for voice, Pexels for footage, and the YouTube
Data API for upload (all free-tier). Anthropic is also supported if you'd
rather pay for Claude.

## Setup

```bash
pip install -r requirements.txt
cp .env.example .env
```

Fill in `.env`:

- `LLM_PROVIDER` — `gemini` (default), `groq`, or `anthropic`.
  - `gemini`: free key at https://ai.google.dev → set `GEMINI_API_KEY`.
  - `groq`: free key at https://console.groq.com → set `GROQ_API_KEY`.
  - `anthropic`: paid, set `ANTHROPIC_API_KEY` if you choose this.
- `PEXELS_API_KEY` — free key from https://www.pexels.com/api/ for stock
  footage.
- YouTube upload needs an OAuth client: in Google Cloud Console, enable the
  **YouTube Data API v3**, create an OAuth client of type **Desktop app**,
  download the JSON, and save it at `credentials/client_secret.json` (or
  point `YOUTUBE_CLIENT_SECRET_FILE` elsewhere). The first upload opens a
  browser to authorize; after that, `credentials/token.json` is reused.
  This is free, but YouTube's default upload quota is limited to roughly
  6 uploads/day per project.

`ffmpeg` must be installed and on `PATH` (used by moviepy).

## Usage

```bash
# Full pipeline, uploads as a private video
python scripts/run_pipeline.py

# Steer the topic, don't upload (just build the mp4)
python scripts/run_pipeline.py --topic "ancient Rome" --no-upload

# Upload and schedule publishing
python scripts/run_pipeline.py --privacy private --publish-at 2026-01-01T15:00:00Z
```

Generated videos and intermediate audio/footage land under `output/<run_id>/`
(gitignored). Stock footage is cached by search query in
`output/cache/footage/` to avoid re-downloading.

## Project layout

```
config.py                 Environment-driven settings
src/
  llm.py                  LLM wrapper (Gemini / Groq / Anthropic; text + JSON completions)
  idea_generator.py       Video idea generation, dedup against data/used_topics.json
  script_generator.py     Scene-by-scene script generation
  tts.py                  edge-tts voiceover synthesis
  stock_footage.py        Pexels search + download, with local caching
  video_builder.py        moviepy assembly: crop/loop footage, burn in captions
  metadata_generator.py   YouTube title/description/tags generation
  youtube_uploader.py     OAuth + resumable upload via YouTube Data API
  pipeline.py             End-to-end orchestration
scripts/run_pipeline.py   CLI entrypoint
```

## Notes

- Each pipeline stage is a plain function/module, so you can run stages
  individually (e.g. just generate ideas, or just build a video from an
  existing script) from a Python shell.
- `DEFAULT_PRIVACY_STATUS=private` in `.env` is intentional — review
  generated videos before setting a default of `public`.
