"use client";

import { certifications } from "@/lib/data";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function Certifications() {
  return (
    <section id="certifications" className="bg-muted/40 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="My Achievements"
          title="Certifications"
          subtitle="Credentials that back up the work."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, i) => (
            <Reveal key={cert.title} delay={i * 0.1}>
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <cert.icon className="size-6" />
                    </div>
                    <div>
                      <p className="font-semibold">{cert.org}</p>
                      <Badge variant="muted">{cert.issuer}</Badge>
                    </div>
                  </div>
                  <h3 className="mb-2 text-sm font-semibold">{cert.title}</h3>
                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                    {cert.description}
                  </p>
                  <div className="flex items-center justify-between border-t pt-3 text-sm">
                    <span className="text-muted-foreground">
                      {cert.metaLabel}
                    </span>
                    <span className="font-medium">{cert.metaValue}</span>
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
