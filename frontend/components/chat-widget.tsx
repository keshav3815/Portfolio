"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Loader2, MessageCircle, Send, X } from "lucide-react";

import { streamChat } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Message = { role: "user" | "bot"; text: string };

const GREETING: Message = {
  role: "bot",
  text: "Hi! I'm Keshav's AI assistant. Ask me about his skills, projects, or stack.",
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, open]);

  async function send(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || busy) return;

    setInput("");
    setBusy(true);
    setMessages((m) => [...m, { role: "user", text }, { role: "bot", text: "" }]);

    try {
      await streamChat(text, (delta) => {
        setMessages((m) => {
          const next = [...m];
          next[next.length - 1] = {
            role: "bot",
            text: next[next.length - 1].text + delta,
          };
          return next;
        });
      });
    } catch {
      setMessages((m) => {
        const next = [...m];
        next[next.length - 1] = {
          role: "bot",
          text: "Sorry — I couldn't reach the server. Please try again.",
        };
        return next;
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-5 z-50 flex h-[28rem] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-2xl border bg-card shadow-2xl"
          >
            <div className="flex items-center gap-2 border-b bg-primary px-4 py-3 text-primary-foreground">
              <Bot className="size-5" />
              <div className="flex-1">
                <p className="text-sm font-semibold leading-tight">
                  AI Assistant
                </p>
                <p className="text-xs opacity-80">Ask about Keshav</p>
              </div>
              <button
                aria-label="Close chat"
                onClick={() => setOpen(false)}
                className="rounded-md p-1 hover:bg-white/20"
              >
                <X className="size-4" />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex",
                    m.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed",
                      m.role === "user"
                        ? "rounded-br-sm bg-primary text-primary-foreground"
                        : "rounded-bl-sm bg-muted text-foreground"
                    )}
                  >
                    {m.text ||
                      (busy && i === messages.length - 1 ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : null)}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={send} className="flex items-center gap-2 border-t p-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="h-10"
              />
              <Button type="submit" size="icon" disabled={busy}>
                <Send className="size-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        size="icon"
        aria-label="Open chat"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-50 size-14 rounded-full shadow-lg"
      >
        {open ? <X className="size-6" /> : <MessageCircle className="size-6" />}
      </Button>
    </>
  );
}
