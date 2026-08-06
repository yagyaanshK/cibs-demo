import Link from "next/link";
import { Mountains } from "./icons";

type Crumb = { label: string; href?: string };

export function PageHeader({
  eyebrow,
  title,
  intro,
  crumbs = [],
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  crumbs?: Crumb[];
}) {
  return (
    <section className="relative overflow-hidden bg-maroon-900 text-cream">
      <div className="absolute inset-0 dharma-pattern opacity-30" />
      <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-maroon-500/30 blur-3xl" />

      <div className="shell relative pt-12 pb-20 sm:pt-16 sm:pb-24">
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-cream/60">
          <Link href="/" className="hover:text-gold-soft">Home</Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-1.5">
              <span className="text-cream/30">/</span>
              {c.href ? (
                <Link href={c.href} className="hover:text-gold-soft">{c.label}</Link>
              ) : (
                <span className="text-cream/85">{c.label}</span>
              )}
            </span>
          ))}
        </nav>

        {eyebrow && <p className="eyebrow text-gold-soft">{eyebrow}</p>}
        <h1 className="mt-2 max-w-3xl text-balance font-display text-3xl font-semibold sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {intro && <p className="mt-5 max-w-2xl leading-relaxed text-cream/80">{intro}</p>}
      </div>

      <Mountains className="block h-12 w-full text-ivory sm:h-16" />
    </section>
  );
}
