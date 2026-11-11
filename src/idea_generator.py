import json
from typing import Optional

import config
from src.llm import complete_json

SYSTEM_PROMPT = (
    "You are a YouTube content strategist who comes up with video ideas for "
    "faceless narration channels (facts, stories, top-10 lists). Ideas must "
    "be specific enough to script immediately, not generic."
)


def _load_used_topics() -> list[str]:
    if config.USED_TOPICS_FILE.exists():
        return json.loads(config.USED_TOPICS_FILE.read_text())
    return []


def _save_used_topic(title: str) -> None:
    used = _load_used_topics()
    used.append(title)
    config.USED_TOPICS_FILE.write_text(json.dumps(used, indent=2))


def generate_idea(topic_hint: Optional[str] = None) -> dict:
    """Generate a single video idea as {"title", "hook", "angle"}.

    `topic_hint` lets a caller steer the subject (e.g. "ancient Rome");
    otherwise the model picks freely within the channel's niche.
    """
    used_topics = _load_used_topics()[-50:]
    avoid_clause = (
        f"\nDo not repeat or closely resemble these already-used video ideas:\n"
        + "\n".join(f"- {t}" for t in used_topics)
        if used_topics
        else ""
    )
    hint_clause = f'\nThe video should be about: "{topic_hint}".' if topic_hint else ""

    prompt = f"""Channel niche: {config.CHANNEL_NICHE}
{hint_clause}{avoid_clause}

Come up with ONE new video idea for this channel. Respond with ONLY a JSON
object, no other text, in this exact shape:
{{
  "title": "a punchy, clickable working title (not the final YouTube title)",
  "hook": "the first line a narrator would say, designed to stop someone scrolling",
  "angle": "1-2 sentences on what makes this video idea specific and interesting"
}}"""

    idea = complete_json(prompt, system=SYSTEM_PROMPT)
    _save_used_topic(idea["title"])
    return idea
