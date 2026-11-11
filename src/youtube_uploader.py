from pathlib import Path
from typing import Optional

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload

import config

SCOPES = ["https://www.googleapis.com/auth/youtube.upload"]


def _get_credentials() -> Credentials:
    token_path = Path(config.YOUTUBE_TOKEN_FILE)
    client_secret_path = Path(config.YOUTUBE_CLIENT_SECRET_FILE)

    creds = None
    if token_path.exists():
        creds = Credentials.from_authorized_user_file(str(token_path), SCOPES)

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            if not client_secret_path.exists():
                raise RuntimeError(
                    f"YouTube OAuth client secret not found at {client_secret_path}. "
                    "Download it from Google Cloud Console (APIs & Services > "
                    "Credentials > OAuth client, Desktop app type) and save it there."
                )
            flow = InstalledAppFlow.from_client_secrets_file(
                str(client_secret_path), SCOPES
            )
            creds = flow.run_local_server(port=0)

        token_path.parent.mkdir(parents=True, exist_ok=True)
        token_path.write_text(creds.to_json())

    return creds


def upload_video(
    video_path: Path,
    metadata: dict,
    privacy_status: str = None,
    publish_at: Optional[str] = None,
    category_id: str = "22",
) -> str:
    """Upload a finished video to YouTube with the given metadata.

    `publish_at` is an RFC 3339 timestamp (e.g. "2026-01-01T15:00:00Z"); when
    set, `privacy_status` is forced to "private" and YouTube auto-publishes
    the video at that time. Returns the uploaded video's id.
    """
    privacy_status = privacy_status or config.DEFAULT_PRIVACY_STATUS
    creds = _get_credentials()
    youtube = build("youtube", "v3", credentials=creds)

    status = {"privacyStatus": privacy_status, "selfDeclaredMadeForKids": False}
    if publish_at:
        status["privacyStatus"] = "private"
        status["publishAt"] = publish_at

    body = {
        "snippet": {
            "title": metadata["title"],
            "description": metadata["description"],
            "tags": metadata.get("tags", []),
            "categoryId": category_id,
        },
        "status": status,
    }

    media = MediaFileUpload(str(video_path), chunksize=-1, resumable=True)
    request = youtube.videos().insert(
        part="snippet,status", body=body, media_body=media
    )

    response = None
    while response is None:
        _, response = request.next_chunk()

    return response["id"]
