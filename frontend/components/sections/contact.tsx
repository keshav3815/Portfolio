"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { CheckCircle2, Loader2, Mail, MapPin, Send } from "lucide-react";

import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
} from "@/components/icons/social";
import { sendContact } from "@/lib/api";
import { social } from "@/lib/data";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Status = "idle" | "loading" | "success" | "error";

const socials = [
  { icon: LinkedinIcon, href: social.linkedin, label: "LinkedIn" },
  { icon: GithubIcon, href: social.github, label: "GitHub" },
  { icon: InstagramIcon, href: social.instagram, label: "Instagram" },
];

export function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");

  function update(key: keyof typeof form) {
    return (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      await sendContact(form);
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Let's Connect"
          title="Get In Touch"
          subtitle="Have a project in mind or want to collaborate? Drop me a message."
        />

        <div className="grid gap-8 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <Card>
              <CardContent className="p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                      required
                      placeholder="Your name"
                      value={form.name}
                      onChange={update("name")}
                    />
                    <Input
                      required
                      type="email"
                      placeholder="Email address"
                      value={form.email}
                      onChange={update("email")}
                    />
                  </div>
                  <Input
                    required
                    placeholder="Subject"
                    value={form.subject}
                    onChange={update("subject")}
                  />
                  <Textarea
                    required
                    placeholder="Your message..."
                    value={form.message}
                    onChange={update("message")}
                  />
                  <Button
                    type="submit"
                    size="lg"
                    disabled={status === "loading"}
                    className="w-full sm:w-auto"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="size-4 animate-spin" /> Sending...
                      </>
                    ) : (
                      <>
                        Send Message <Send className="size-4" />
                      </>
                    )}
                  </Button>

                  {status === "success" && (
                    <p className="flex items-center gap-2 text-sm text-primary">
                      <CheckCircle2 className="size-4" /> Message sent — thanks
                      for reaching out!
                    </p>
                  )}
                  {status === "error" && (
                    <p className="text-sm text-destructive">
                      Something went wrong. Please try again or email me
                      directly.
                    </p>
                  )}
                </form>
              </CardContent>
            </Card>
          </Reveal>

          <Reveal className="lg:col-span-2" delay={0.1}>
            <Card className="h-full">
              <CardContent className="flex h-full flex-col gap-6 p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Mail className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a
                      href={`mailto:${social.email}`}
                      className="text-sm font-medium hover:text-primary"
                    >
                      {social.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <MapPin className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="text-sm font-medium">
                      Chandigarh, India · Remote
                    </p>
                  </div>
                </div>

                <div className="mt-auto">
                  <p className="mb-3 text-sm text-muted-foreground">
                    Find me online
                  </p>
                  <div className="flex gap-3">
                    {socials.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={s.label}
                        className="flex size-10 items-center justify-center rounded-lg border transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        <s.icon className="size-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
