"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Send } from "lucide-react";

import { GithubIcon, LinkedinIcon } from "@/components/icons/social";
import { Button } from "@/components/ui/button";
import { social } from "@/lib/data";

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-16"
    >
      {/* aurora background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-aurora absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-primary/25 blur-3xl" />
        <div className="animate-aurora absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-accent/40 blur-3xl [animation-delay:-7s]" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="inline-flex items-center rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            Available for new opportunities
          </span>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Hi, I&apos;m <span className="text-primary">Keshav Singh</span>
          </h1>
          <h2 className="mt-3 text-xl font-semibold text-muted-foreground sm:text-2xl">
            AI Engineer &amp; Full-Stack Web3 Developer
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            I build production-grade web apps with Next.js &amp; FastAPI, ship AI
            agents and RAG systems across the LLM ecosystem, and craft on-chain
            experiences with Solidity &amp; Web3.
          </p>

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

          <div className="mt-8 flex items-center gap-4">
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
          </div>
        </motion.div>

        <motion.div
          className="relative mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
        >
          <div className="absolute inset-0 -z-10 rounded-full bg-linear-to-tr from-primary/40 to-accent/40 blur-2xl" />
          <div className="relative h-72 w-72 overflow-hidden rounded-full border-4 border-background shadow-2xl sm:h-80 sm:w-80 lg:h-96 lg:w-96">
            <Image
              src="/keshav.png"
              alt="Keshav Singh"
              fill
              priority
              sizes="(max-width: 1024px) 20rem, 24rem"
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
