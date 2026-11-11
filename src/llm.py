import json
import re

from anthropic import Anthropic

import config

_client = None


def _get_client() -> Anthropic:
    global _client
    if _client is None:
        if not config.ANTHROPIC_API_KEY:
            raise RuntimeError(
                "ANTHROPIC_API_KEY is not set. Add it to your .env file."
            )
        _client = Anthropic(api_key=config.ANTHROPIC_API_KEY)
    return _client


def complete(prompt: str, system: str = "", max_tokens: int = 2048) -> str:
    """Send a single-turn prompt to Claude and return the text response."""
    client = _get_client()
    response = client.messages.create(
        model=config.ANTHROPIC_MODEL,
        max_tokens=max_tokens,
        system=system or "You are a helpful assistant.",
        messages=[{"role": "user", "content": prompt}],
    )
    return "".join(block.text for block in response.content if block.type == "text")


def complete_json(prompt: str, system: str = "", max_tokens: int = 2048) -> dict:
    """Send a prompt that must return JSON and parse it, tolerating stray prose
    or markdown code fences around the JSON object/array."""
    text = complete(prompt, system=system, max_tokens=max_tokens)
    match = re.search(r"\{.*\}|\[.*\]", text, re.DOTALL)
    if not match:
        raise ValueError(f"No JSON object found in LLM response: {text!r}")
    return json.loads(match.group(0))
