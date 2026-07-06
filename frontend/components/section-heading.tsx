import { Reveal } from "@/components/reveal";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <Reveal className="mx-auto mb-12 max-w-2xl text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>
      <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-primary" />
      {subtitle && (
        <p className="mt-4 text-muted-foreground">{subtitle}</p>
      )}
    </Reveal>
  );
}
