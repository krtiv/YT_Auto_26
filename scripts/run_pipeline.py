#!/usr/bin/env python3
import argparse
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from src.pipeline import run_pipeline


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Generate (and optionally upload) a faceless narration video."
    )
    parser.add_argument(
        "--topic", default=None, help="Optional topic hint to steer idea generation"
    )
    parser.add_argument(
        "--no-upload",
        action="store_true",
        help="Build the video but skip uploading it to YouTube",
    )
    parser.add_argument(
        "--privacy",
        choices=["private", "unlisted", "public"],
        default=None,
        help="YouTube privacy status (default: value in .env)",
    )
    parser.add_argument(
        "--publish-at",
        default=None,
        help="RFC3339 timestamp to schedule publishing (e.g. 2026-01-01T15:00:00Z)",
    )
    args = parser.parse_args()

    result = run_pipeline(
        topic_hint=args.topic,
        upload=not args.no_upload,
        privacy_status=args.privacy,
        publish_at=args.publish_at,
    )

    print(json.dumps({k: v for k, v in result.items() if k != "script"}, indent=2))


if __name__ == "__main__":
    main()
