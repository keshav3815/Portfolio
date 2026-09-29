"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

import { cn } from "@/lib/utils";
import { journey, type JourneyMilestone } from "@/lib/data";
import { SectionHeading } from "@/components/section-heading";
import { Card } from "@/components/ui/card";

export function Journey() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 75%", "end 55%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="journey" className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 mx-auto h-96 max-w-3xl rounded-full bg-primary/10 blur-3xl" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="My Story"
          title="The Journey So Far"
          subtitle="From a first-year CS student to shipping GenAI and fintech systems in production — scroll through it."
        />

        <div ref={trackRef} className="relative">
          <div className="absolute bottom-0 left-6 top-0 w-0.5 -translate-x-1/2 rounded-full bg-border md:left-1/2" />
          <motion.div
            style={{ scaleY: progress }}
            className="absolute bottom-0 left-6 top-0 w-0.5 -translate-x-1/2 origin-top rounded-full bg-linear-to-b from-primary via-primary to-primary/40 md:left-1/2"
          />

          <ol>
            {journey.map((m, i) => (
              <Milestone key={m.title} milestone={m} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Milestone({
  milestone: m,
  index,
}: {
  milestone: JourneyMilestone;
  index: number;
}) {
  const left = index % 2 === 0;

  return (
    <li
      className={cn(
        "relative flex pl-16 not-first:mt-10 md:pl-0 md:not-first:-mt-10",
        left ? "md:justify-start" : "md:justify-end"
      )}
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-100px 0px" }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="absolute left-6 top-4 z-10 -translate-x-1/2 md:left-1/2"
      >
        <div
          className={cn(
            "relative flex size-12 items-center justify-center rounded-full border-4 border-background shadow-lg",
            m.current
              ? "bg-primary text-primary-foreground"
              : "bg-card text-primary ring-2 ring-primary/40"
          )}
        >
          {m.current && (
            <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-primary/40" />
          )}
          <m.icon className="size-5" />
        </div>
      </motion.div>

      <motion.div
        data-reveal
        initial={{ opacity: 0, x: left ? -40 : 40, y: 16 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-100px 0px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full md:w-[calc(50%-3rem)]"
      >
        <Card
          className={cn(
            "group relative p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl sm:p-6",
            m.current && "border-primary/50 ring-1 ring-primary/30"
          )}
        >
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-primary px-2.5 py-0.5 font-mono text-xs font-semibold text-primary-foreground">
              {m.date}
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              {m.chapter}
            </span>
          </div>
          <h3 className="text-lg font-bold leading-snug">{m.title}</h3>
          <p className="mt-1 text-sm font-medium text-muted-foreground">
            {m.org}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {m.description}
          </p>
        </Card>
      </motion.div>
    </li>
  );
}
