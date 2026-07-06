export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8001";

export type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export async function sendContact(payload: ContactPayload): Promise<void> {
  const res = await fetch(`${API_URL}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(`Request failed with ${res.status}`);
  }
}

/**
 * Stream a chatbot reply from the FastAPI `/chat/stream` SSE endpoint,
 * invoking `onDelta` with each incremental chunk of text.
 */
export async function streamChat(
  message: string,
  onDelta: (delta: string) => void,
  signal?: AbortSignal
): Promise<void> {
  const res = await fetch(`${API_URL}/chat/stream`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
    signal,
  });

  if (!res.ok || !res.body) {
    throw new Error(`Request failed with ${res.status}`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    const events = buffer.split("\n\n");
    buffer = events.pop() ?? "";

    for (const evt of events) {
      const line = evt.split("\n").find((l) => l.startsWith("data:"));
      if (!line) continue;
      const data = line.slice(5).trim();
      if (data === "[DONE]") return;
      try {
        const parsed = JSON.parse(data) as { delta?: string };
        if (parsed.delta) onDelta(parsed.delta);
      } catch {
        /* ignore malformed keep-alive lines */
      }
    }
  }
}
