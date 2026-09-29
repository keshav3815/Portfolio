"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";

import { GithubIcon } from "@/components/icons/social";
import { projects } from "@/lib/data";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function Projects() {
  return (
    <section id="projects" className="bg-muted/40 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="My Work"
          title="Featured Projects"
          subtitle="A few recent builds across GenAI and full-stack web."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={i * 0.1}>
              <Card className="group flex h-full flex-col overflow-hidden pt-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {project.ribbon && (
                    <span className="absolute right-3 top-3 rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground">
                      {project.ribbon}
                    </span>
                  )}
                </div>

                <CardContent className="flex flex-1 flex-col pt-5">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <h3 className="text-lg font-bold">{project.title}</h3>
                    <Badge variant="muted">{project.status}</Badge>
                  </div>
                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>

                  <div className="mb-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>

                  <div className="mt-auto flex gap-2">
                    {project.live && (
                      <Button asChild size="sm">
                        <a href={project.live} target="_blank" rel="noreferrer">
                          <ExternalLink className="size-4" /> Live
                        </a>
                      </Button>
                    )}
                    {project.code && (
                      <Button asChild size="sm" variant="outline">
                        <a href={project.code} target="_blank" rel="noreferrer">
                          <GithubIcon className="size-4" /> Code
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
