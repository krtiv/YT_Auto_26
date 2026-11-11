from src.llm import complete_json

SYSTEM_PROMPT = (
    "You are a scriptwriter for a faceless YouTube narration channel. You "
    "write tight, engaging voiceover scripts broken into short scenes, each "
    "paired with search keywords for stock footage that visually matches "
    "the narration."
)


def generate_script(idea: dict, target_seconds: int = 240) -> dict:
    """Turn a video idea into a scene-by-scene script.

    Returns {"title": str, "scenes": [{"narration": str, "visual_keywords": [str, ...]}, ...]}
    `visual_keywords` are short, literal, stock-footage-searchable phrases
    (e.g. "ancient roman ruins aerial"), not abstract concepts.
    """
    prompt = f"""Video idea:
Title: {idea['title']}
Hook: {idea['hook']}
Angle: {idea['angle']}

Write the full narration script for this video, aimed at roughly
{target_seconds} seconds of spoken audio (~2.5 words/second). Split it into
8-16 scenes. The first scene's narration must be the hook verbatim or a very
close variant. The last scene should end with a short call-to-action to like
and subscribe.

Respond with ONLY a JSON object, no other text, in this exact shape:
{{
  "title": "{idea['title']}",
  "scenes": [
    {{
      "narration": "what the narrator says during this scene",
      "visual_keywords": ["literal stock footage search phrase", "a second alternative phrase"]
    }}
  ]
}}"""

    script = complete_json(prompt, system=SYSTEM_PROMPT, max_tokens=4096)
    if not script.get("scenes"):
        raise ValueError("Generated script has no scenes")
    return script
