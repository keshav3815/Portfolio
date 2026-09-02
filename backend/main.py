"""FastAPI backend for Keshav Singh's portfolio.

Replaces the previous Express server. Exposes:
  GET  /              — API metadata / endpoint index
  GET  /health        — health check
  POST /chat          — chatbot (JSON request/response)
  POST /chat/stream   — chatbot response streamed token-by-token (SSE)
  WS   /ws/chat       — chatbot over a WebSocket connection
  POST /contact       — persist a contact-form submission
  GET  /messages      — list stored contact messages (admin, token-gated)

Environment:
  ALLOWED_ORIGINS   comma-separated extra CORS origins (e.g. the deployed
                    frontend URL). localhost/127.0.0.1 are always allowed.
  ADMIN_TOKEN       bearer token required by GET /messages. If unset, the
                    endpoint is disabled (returns 503).
"""
from __future__ import annotations

import asyncio
import json
import os
import secrets
import tempfile
import threading
from datetime import datetime, timezone
from pathlib import Path

from fastapi import Depends, FastAPI, HTTPException, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from pydantic import BaseModel, EmailStr, Field

from chatbot import generate_chat_response

API_VERSION = "1.0.0"

app = FastAPI(title="Keshav Portfolio API", version=API_VERSION)

# localhost (any port, http or https) is always allowed; extra production
# origins come from ALLOWED_ORIGINS as a comma-separated list.
_extra_origins = [
    o.strip() for o in os.getenv("ALLOWED_ORIGINS", "").split(",") if o.strip()
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=_extra_origins,
    allow_origin_regex=r"https?://(localhost|127\.0\.0\.1)(:\d+)?",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# On a read-only/ephemeral host (Vercel & other serverless), point this at a
# writable path such as /tmp/messages.json. Note that such storage does NOT
# survive cold starts — use a real database for durable contact submissions.
MESSAGES_FILE = Path(
    os.getenv("MESSAGES_FILE", str(Path(__file__).parent / "messages.json"))
)
_messages_lock = threading.Lock()

ADMIN_TOKEN = os.getenv("ADMIN_TOKEN", "")
_bearer = HTTPBearer(auto_error=False)


def require_admin(
    creds: HTTPAuthorizationCredentials | None = Depends(_bearer),
) -> None:
    if not ADMIN_TOKEN:
        raise HTTPException(
            status_code=503, detail="Admin endpoint disabled (ADMIN_TOKEN unset)"
        )
    if creds is None or not secrets.compare_digest(creds.credentials, ADMIN_TOKEN):
        raise HTTPException(status_code=401, detail="Invalid or missing token")


# ----------------------------- models --------------------------------------
class RootResponse(BaseModel):
    name: str
    version: str
    endpoints: list[str]


class HealthResponse(BaseModel):
    status: str
    message: str


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1)


class ChatResponse(BaseModel):
    response: str


class ContactRequest(BaseModel):
    name: str = Field(..., min_length=1)
    email: EmailStr
    subject: str = Field(..., min_length=1)
    message: str = Field(..., min_length=1)


class ContactResponse(BaseModel):
    success: bool
    message: str


class StoredMessage(BaseModel):
    name: str
    email: str
    subject: str
    message: str
    timestamp: str


class MessagesResponse(BaseModel):
    count: int
    messages: list[StoredMessage]


# --------------------------- persistence -----------------------------------
def _read_messages() -> list[dict[str, str]]:
    if MESSAGES_FILE.exists():
        try:
            return json.loads(MESSAGES_FILE.read_text("utf-8"))
        except (json.JSONDecodeError, OSError):
            return []
    return []


def _write_messages(messages: list[dict[str, str]]) -> None:
    """Atomically replace messages.json (write temp file, then os.replace)."""
    fd, tmp = tempfile.mkstemp(dir=MESSAGES_FILE.parent, suffix=".tmp")
    try:
        with os.fdopen(fd, "w", encoding="utf-8") as fh:
            json.dump(messages, fh, indent=2)
        os.replace(tmp, MESSAGES_FILE)
    except BaseException:
        try:
            os.unlink(tmp)
        except OSError:
            pass
        raise


def _append_message(entry: dict[str, str]) -> None:
    with _messages_lock:
        messages = _read_messages()
        messages.append(entry)
        _write_messages(messages)


# ----------------------------- routes --------------------------------------
@app.get("/", response_model=RootResponse)
async def root() -> RootResponse:
    return RootResponse(
        name="Keshav Portfolio API",
        version=API_VERSION,
        endpoints=[
            "GET /health",
            "POST /chat",
            "POST /chat/stream",
            "WS /ws/chat",
            "POST /contact",
            "GET /messages",
        ],
    )


@app.get("/health", response_model=HealthResponse)
async def health() -> HealthResponse:
    return HealthResponse(status="healthy", message="Server is Healthy")


@app.post("/chat", response_model=ChatResponse)
async def chat(req: ChatRequest) -> ChatResponse:
    return ChatResponse(response=generate_chat_response(req.message))


@app.post("/chat/stream")
async def chat_stream(req: ChatRequest) -> StreamingResponse:
    """Stream the chatbot reply word-by-word as Server-Sent Events."""
    full = generate_chat_response(req.message)

    async def event_gen():
        for word in full.split(" "):
            payload = json.dumps({"delta": word + " "})
            yield f"data: {payload}\n\n"
            await asyncio.sleep(0.03)
        yield "data: [DONE]\n\n"

    return StreamingResponse(
        event_gen(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )


@app.websocket("/ws/chat")
async def ws_chat(ws: WebSocket) -> None:
    await ws.accept()
    try:
        while True:
            message = await ws.receive_text()
            await ws.send_text(generate_chat_response(message))
    except WebSocketDisconnect:
        return


@app.post("/contact", response_model=ContactResponse)
async def contact(req: ContactRequest) -> ContactResponse:
    entry = StoredMessage(
        name=req.name,
        email=str(req.email),
        subject=req.subject,
        message=req.message,
        timestamp=datetime.now(timezone.utc).isoformat(),
    )
    await asyncio.to_thread(_append_message, entry.model_dump())
    return ContactResponse(success=True, message="Message sent successfully!")


@app.get(
    "/messages",
    response_model=MessagesResponse,
    dependencies=[Depends(require_admin)],
)
async def messages() -> MessagesResponse:
    stored = _read_messages()
    return MessagesResponse(count=len(stored), messages=stored)
