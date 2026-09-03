"""Vercel serverless entrypoint — exposes the FastAPI ASGI app.

Vercel's Python runtime looks for `app` in files under `api/`. The real
application lives in `main.py` at the project root, so put that on the path
first.

Serverless caveats (accepted for this deployment):
  * WS /ws/chat does not work on serverless functions — the frontend chat
    widget uses POST /chat/stream (SSE) instead, which does.
  * messages.json is written to MESSAGES_FILE (set to /tmp on Vercel) and is
    NOT durable across cold starts.
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from main import app  # noqa: E402,F401
