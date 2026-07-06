import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
} from "@/components/icons/social";
import { social } from "@/lib/data";

const socials = [
  { icon: LinkedinIcon, href: social.linkedin, label: "LinkedIn" },
  { icon: GithubIcon, href: social.github, label: "GitHub" },
  { icon: InstagramIcon, href: social.instagram, label: "Instagram" },
];

export function Footer() {
  return (
    <footer className="border-t py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Keshav Singh. Built with Next.js &amp;
          FastAPI.
        </p>
        <div className="flex gap-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <s.icon className="size-5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
