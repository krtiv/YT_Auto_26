import json
import re

import config

_clients = {}


def _get_gemini_client():
    from google import genai

    if not config.GEMINI_API_KEY:
        raise RuntimeError("GEMINI_API_KEY is not set. Add it to your .env file.")
    if "gemini" not in _clients:
        _clients["gemini"] = genai.Client(api_key=config.GEMINI_API_KEY)
    return _clients["gemini"]


def _get_groq_client():
    from groq import Groq

    if not config.GROQ_API_KEY:
        raise RuntimeError("GROQ_API_KEY is not set. Add it to your .env file.")
    if "groq" not in _clients:
        _clients["groq"] = Groq(api_key=config.GROQ_API_KEY)
    return _clients["groq"]


def _get_anthropic_client():
    from anthropic import Anthropic

    if not config.ANTHROPIC_API_KEY:
        raise RuntimeError("ANTHROPIC_API_KEY is not set. Add it to your .env file.")
    if "anthropic" not in _clients:
        _clients["anthropic"] = Anthropic(api_key=config.ANTHROPIC_API_KEY)
    return _clients["anthropic"]


def _complete_gemini(prompt: str, system: str, max_tokens: int) -> str:
    from google.genai import types

    client = _get_gemini_client()
    response = client.models.generate_content(
        model=config.GEMINI_MODEL,
        contents=prompt,
        config=types.GenerateContentConfig(
            system_instruction=system or None, max_output_tokens=max_tokens
        ),
    )
    return response.text


def _complete_groq(prompt: str, system: str, max_tokens: int) -> str:
    client = _get_groq_client()
    messages = []
    if system:
        messages.append({"role": "system", "content": system})
    messages.append({"role": "user", "content": prompt})
    response = client.chat.completions.create(
        model=config.GROQ_MODEL, messages=messages, max_tokens=max_tokens
    )
    return response.choices[0].message.content


def _complete_anthropic(prompt: str, system: str, max_tokens: int) -> str:
    client = _get_anthropic_client()
    response = client.messages.create(
        model=config.ANTHROPIC_MODEL,
        max_tokens=max_tokens,
        system=system or "You are a helpful assistant.",
        messages=[{"role": "user", "content": prompt}],
    )
    return "".join(block.text for block in response.content if block.type == "text")


_PROVIDERS = {
    "gemini": _complete_gemini,
    "groq": _complete_groq,
    "anthropic": _complete_anthropic,
}


def complete(prompt: str, system: str = "", max_tokens: int = 2048) -> str:
    """Send a single-turn prompt to the configured LLM provider (LLM_PROVIDER
    in .env: "gemini", "groq", or "anthropic") and return the text response."""
    provider = config.LLM_PROVIDER.lower()
    if provider not in _PROVIDERS:
        raise ValueError(
            f"Unknown LLM_PROVIDER {provider!r}; expected one of {list(_PROVIDERS)}"
        )
    return _PROVIDERS[provider](prompt, system, max_tokens)


def complete_json(prompt: str, system: str = "", max_tokens: int = 2048) -> dict:
    """Send a prompt that must return JSON and parse it, tolerating stray prose
    or markdown code fences around the JSON object/array."""
    text = complete(prompt, system=system, max_tokens=max_tokens)
    match = re.search(r"\{.*\}|\[.*\]", text, re.DOTALL)
    if not match:
        raise ValueError(f"No JSON object found in LLM response: {text!r}")
    return json.loads(match.group(0))
