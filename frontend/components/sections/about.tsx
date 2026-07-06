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
            href="/Resume.png"
            target="_blank"
            rel="noreferrer"
            className="group relative block overflow-hidden rounded-xl border shadow-lg"
          >
            <Image
              src="/Resume.png"
              alt="Keshav Singh — Resume"
              width={900}
              height={1200}
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
              Building across web, AI &amp; Web3
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              I&apos;m Keshav Singh, a Computer Science engineering student
              building at the intersection of full-stack web development, applied
              Generative AI, and Web3.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              On the product side I ship modern apps with Next.js, React,
              TypeScript and FastAPI. On the AI side I build RAG pipelines, AI
              agents and multi-agent systems with LangChain, LlamaIndex, Ollama
              and models from OpenAI and Google Gemini. I&apos;m also deep into
              Web3 — writing smart contracts in Solidity and wiring up live crypto
              market data.
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
