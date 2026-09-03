"use client";

import Image from "next/image";
import { Code2, Gauge, Rocket, Smartphone } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { Card } from "@/components/ui/card";

const highlights = [
  { icon: Code2, title: "Clean Code", desc: "Well-structured & typed" },
  { icon: Smartphone, title: "Responsive", desc: "Great on any device" },
  { icon: Gauge, title: "Performance", desc: "Fast, optimized apps" },
  { icon: Rocket, title: "Shipping", desc: "Real-world impact" },
];

export function About() {
  return (
    <section id="about" className="py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <Reveal>
          <a
            href="/Resume-2026.pdf"
            target="_blank"
            rel="noreferrer"
            className="group relative block overflow-hidden rounded-xl border shadow-lg"
          >
            <Image
              src="/Resume-2026.png"
              alt="Keshav Singh — Resume"
              width={900}
              height={1273}
              className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </a>
        </Reveal>

        <div>
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              About Me
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Backend, GenAI &amp; full-stack web
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              I&apos;m Keshav Singh, a Computer Science engineering student and
              backend/Gen-AI engineer with production experience across fintech
              co-lending orchestration and ML-driven financial analytics.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              On the backend I build FastAPI/PostgreSQL services with async data
              pipelines, Celery/Redis job orchestration, and append-only ledgers.
              On the AI side I ship RAG systems and LLM-orchestrated features with
              LangChain, LangGraph, the OpenAI API and pgvector, plus
              scikit-learn/XGBoost credit-scoring and forecasting &mdash; with
              React/TypeScript frontends end to end.
            </p>
          </Reveal>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {highlights.map((h, i) => (
              <Reveal key={h.title} delay={i * 0.08}>
                <Card className="flex items-center gap-3 p-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <h.icon className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{h.title}</p>
                    <p className="text-xs text-muted-foreground">{h.desc}</p>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
