"use client";

import { cn } from "@/lib/utils";
import { skillCategories } from "@/lib/data";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Card } from "@/components/ui/card";

export function Skills() {
  return (
    <section id="skills" className="py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="My Abilities"
          title="Technical Skills"
          subtitle="The stack I use to build backend services, GenAI systems, and full-stack web apps."
        />

        <div className="grid justify-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((cat, i) => (
            <Reveal key={cat.title} delay={i * 0.08}>
              <Card
                className={cn(
                  "h-full p-6",
                  cat.featured && "ring-2 ring-primary/40"
                )}
              >
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <cat.icon className="size-5" />
                  </div>
                  <h3 className="text-lg font-bold">{cat.title}</h3>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center gap-2 rounded-lg bg-muted/60 px-3 py-2.5 text-sm transition-colors hover:bg-muted"
                    >
                      <skill.icon className="size-4 shrink-0 text-primary" />
                      <span className="min-w-0 leading-snug">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
