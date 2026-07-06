"""FastAPI backend for Keshav Singh's portfolio.

Replaces the previous Express server. Exposes:
  GET  /health          — health check
  POST /chat            — chatbot (JSON request/response)
  POST /chat/stream     — chatbot response streamed token-by-token (SSE)
  WS   /ws/chat         — chatbot over a WebSocket connection
  POST /contact         — persist a contact-form submission
  GET  /messages        — list stored contact messages (admin)
"""
from __future__ import annotations

import asyncio
import json
from datetime import datetime, timezone
from pathlib import Path

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, EmailStr, Field

from chatbot import generate_chat_response

app = FastAPI(title="Keshav Portfolio API", version="1.0.0")

# Allow the Next.js dev server (any localhost port) to call the API.
app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"http://(localhost|127\.0\.0\.1)(:\d+)?",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MESSAGES_FILE = Path(__file__).parent / "messages.json"


# ----------------------------- models --------------------------------------
class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1)


class ChatResponse(BaseModel):
    response: str


class ContactRequest(BaseModel):
    name: str = Field(..., min_length=1)
    email: EmailStr
    subject: str = Field(..., min_length=1)
    message: str = Field(..., min_length=1)


# --------------------------- persistence -----------------------------------
def _read_messages() -> list[dict]:
    if MESSAGES_FILE.exists():
        try:
            return json.loads(MESSAGES_FILE.read_text("utf-8"))
        except (json.JSONDecodeError, OSError):
            return []
    return []


def _write_messages(messages: list[dict]) -> None:
    MESSAGES_FILE.write_text(json.dumps(messages, indent=2), "utf-8")


# ----------------------------- routes --------------------------------------
@app.get("/health")
async def health() -> dict:
    return {"message": "Server is Healthy", "status": "healthy"}


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


@app.post("/contact")
async def contact(req: ContactRequest) -> dict:
    messages = _read_messages()
    messages.append(
        {
            "name": req.name,
            "email": str(req.email),
            "subject": req.subject,
            "message": req.message,
            "timestamp": datetime.now(timezone.utc).isoformat(),
        }
    )
    _write_messages(messages)
    return {"success": True, "message": "Message sent successfully!"}


@app.get("/messages")
async def messages() -> dict:
    stored = _read_messages()
    return {"count": len(stored), "messages": stored}
