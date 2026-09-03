# Keshav Singh — Portfolio

Migrated from a static HTML/CSS/JS site to a modern **Next.js + FastAPI** stack.

## Stack

**Frontend** (`frontend/`) — Next.js 16 (App Router), React 19, TypeScript,
Tailwind CSS v4, shadcn/ui-style components, Framer Motion.

**Backend** (`backend/`) — FastAPI (Python), serving REST, an SSE streaming
chat endpoint, and a WebSocket chat endpoint.

**Legacy** (`legacy/`) — the previous static site and Express backend, kept for
reference.

## Backend endpoints

| Method | Path           | Purpose                                  |
| ------ | -------------- | ---------------------------------------- |
| GET    | `/health`      | Health check                             |
| POST   | `/chat`        | Chatbot reply (JSON)                     |
| POST   | `/chat/stream` | Chatbot reply streamed as SSE            |
| WS     | `/ws/chat`     | Chatbot over WebSocket                   |
| POST   | `/contact`     | Persist a contact-form submission        |
| GET    | `/messages`    | List stored contact messages (admin)     |

## Running locally

### Backend (port 8001)

```bash
cd backend
python3 -m venv .venv
./.venv/bin/pip install -r requirements.txt
./.venv/bin/uvicorn main:app --reload --port 8001
```

Optional env (see `backend/.env.example`):

- `ALLOWED_ORIGINS` — comma-separated extra CORS origins for the deployed
  frontend. `localhost`/`127.0.0.1` are always allowed.
- `ADMIN_TOKEN` — bearer token required by `GET /messages`; if unset that
  endpoint returns `503`.

### Frontend (port 3000)

```bash
cd frontend
npm install
npm run dev
```

The frontend reads the API base URL from `frontend/.env.local`
(`NEXT_PUBLIC_API_URL`, default `http://localhost:8001`).
