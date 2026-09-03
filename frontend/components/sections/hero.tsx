"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Atom,
  Bot,
  Code2,
  Database,
  Layers,
  Send,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react";

import { GithubIcon, LinkedinIcon } from "@/components/icons/social";
import { ParticleNetwork } from "@/components/particle-network";
import { Button } from "@/components/ui/button";
import { social } from "@/lib/data";

const valueProps = [
  {
    title: "Scalable Backends",
    description: "Production FastAPI services on PostgreSQL with async pipelines.",
    metric: "async · typed",
    icon: Zap,
  },
  {
    title: "GenAI Systems",
    description: "RAG pipelines, multi-agent workflows & governed LLM orchestration.",
    metric: "RAG · Agents",
    icon: Bot,
  },
  {
    title: "Fintech Orchestration",
    description: "Co-lending, sub-ledgers, settlement & reconciliation with async jobs.",
    metric: "Celery · Redis",
    icon: Workflow,
  },
  {
    title: "Data & ML Products",
    description: "Credit-scoring, forecasting, vector search & SSE-streamed APIs.",
    metric: "SSE · pgvector",
    icon: Database,
  },
];

const heroTechStack = [
  { name: "Python", icon: Code2 },
  { name: "FastAPI", icon: Zap },
  { name: "PostgreSQL", icon: Database },
  { name: "LangChain", icon: Layers },
  { name: "React", icon: Atom },
];

export function Hero() {
  const panelRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = panelRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: Math.max(-8, Math.min(8, -(y / rect.height) * 12)),
      y: Math.max(-8, Math.min(8, (x / rect.width) * 12)),
    });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-16"
    >
      {/* aurora + particle network background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-aurora absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-primary/25 blur-3xl" />
        <div className="animate-aurora absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-accent/40 blur-3xl [animation-delay:-7s]" />
        <ParticleNetwork />
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-12 sm:px-6 lg:grid-cols-12 lg:gap-10">
        <motion.div
          className="lg:col-span-6"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="size-1.5 animate-pulse rounded-full bg-primary" />
            Available for new opportunities
          </span>

          <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Hi, I&apos;m <span className="text-primary">Keshav Singh</span>
          </h1>
          <h2 className="mt-3 text-xl font-semibold text-muted-foreground sm:text-2xl">
            Gen-AI Engineer &amp;{" "}
            <span className="bg-linear-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
              Full-Stack Web Developer
            </span>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            I build production FastAPI/PostgreSQL backends, async data pipelines,
            and RAG &amp; LLM-orchestrated features &mdash; across fintech
            co-lending orchestration and ML-driven financial analytics, with
            React/TypeScript frontends end to end.
          </p>

          {/* value prop grid */}
          <div className="mt-7 grid grid-cols-2 gap-3">
            {valueProps.map((vp) => (
              <div
                key={vp.title}
                className="group rounded-xl border bg-card/60 p-3.5 backdrop-blur-sm transition-colors hover:border-primary/50"
              >
                <div className="flex items-center justify-between">
                  <div className="w-fit rounded-lg border bg-background p-1.5 transition-transform group-hover:scale-105">
                    <vp.icon className="size-4 text-primary" />
                  </div>
                  <span className="rounded bg-primary/10 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-primary">
                    {vp.metric}
                  </span>
                </div>
                <h3 className="mt-2 text-sm font-bold">{vp.title}</h3>
                <p className="mt-0.5 text-xs leading-snug text-muted-foreground">
                  {vp.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <a href="#projects">
                View My Work <ArrowRight className="size-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#contact">
                Hire Me <Send className="size-4" />
              </a>
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a
              href={social.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <GithubIcon className="size-5" />
            </a>
            <a
              href={social.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <LinkedinIcon className="size-5" />
            </a>
            <div className="hidden h-4 w-px bg-border sm:block" />
            <div className="flex flex-wrap items-center gap-2">
              {heroTechStack.map((tech) => (
                <span
                  key={tech.name}
                  className="inline-flex items-center gap-1.5 rounded-md border bg-card px-2.5 py-1 text-xs font-medium text-muted-foreground"
                >
                  <tech.icon className="size-3.5" />
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* right column: 3D tilt glass panel */}
        <motion.div
          className="lg:col-span-6"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
        >
          <div
            ref={panelRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="mx-auto max-w-lg"
            style={{ perspective: "1000px" }}
          >
            <div
              className="relative overflow-hidden rounded-2xl border bg-card/80 shadow-2xl backdrop-blur-xl transition-transform duration-200 ease-out"
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              }}
            >
              {/* header bar */}
              <div className="flex items-center justify-between border-b bg-background/60 px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-rose-500/80" />
                  <span className="size-2.5 rounded-full bg-amber-500/80" />
                  <span className="size-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono text-[11px] text-muted-foreground">
                    keshav-ai-stack.py
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-primary">
                  <Sparkles className="size-3.5 animate-pulse" />
                  Live
                </div>
              </div>

              {/* visual */}
              <div className="relative aspect-16/10 w-full overflow-hidden">
                <Image
                  src="/hero-3d.jpg"
                  alt="3D visualization of an AI engineering workstation"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 32rem"
                  className="scale-105 object-cover transition-transform duration-700 hover:scale-100"
                />
                <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-background/20" />

                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-background/90 px-2.5 py-1 text-[11px] font-semibold text-foreground shadow-lg">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-primary" />
                  </span>
                  LLM Reasoning
                </span>
                <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-background/90 px-2.5 py-1 text-[11px] font-semibold text-foreground shadow-lg">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75 [animation-delay:-1s]" />
                    <span className="relative inline-flex size-2 rounded-full bg-primary" />
                  </span>
                  AI Agents
                </span>
              </div>

              {/* pipeline bar */}
              <div className="flex flex-wrap items-center gap-2 border-t bg-background/60 px-4 py-3 font-mono text-[11px]">
                <Layers className="size-3.5 text-primary" />
                <span className="text-foreground">FastAPI</span>
                <ArrowRight className="size-3 text-muted-foreground" />
                <span className="text-foreground">PostgreSQL</span>
                <ArrowRight className="size-3 text-muted-foreground" />
                <span className="text-primary">LangChain Agents</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
