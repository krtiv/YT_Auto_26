from src.llm import complete_json

SYSTEM_PROMPT = (
    "You are a YouTube SEO specialist who writes high-CTR titles, "
    "descriptions, and tags for faceless narration channels."
)


def generate_metadata(idea: dict, script: dict) -> dict:
    """Generate YouTube upload metadata from a video's idea and full script.

    Returns {"title": str, "description": str, "tags": [str, ...]}
    """
    full_narration = " ".join(scene["narration"] for scene in script["scenes"])

    prompt = f"""Video working title: {idea['title']}
Angle: {idea['angle']}
Full narration script: {full_narration}

Write YouTube upload metadata for this video. The title must be under 100
characters, attention-grabbing, and not clickbait-dishonest. The description
should be 3-5 sentences summarizing the video, followed by 3-5 relevant
hashtags. Provide 10-15 single or short multi-word tags.

Respond with ONLY a JSON object, no other text, in this exact shape:
{{
  "title": "...",
  "description": "...",
  "tags": ["tag1", "tag2"]
}}"""

    return complete_json(prompt, system=SYSTEM_PROMPT)
