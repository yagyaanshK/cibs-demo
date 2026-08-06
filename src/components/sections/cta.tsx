import type { Settings } from "@/lib/data";
import { IconArrow, IconMail, IconPhone, Mountains } from "@/components/icons";

export function CTA({ institute }: { institute: Settings }) {
  return (
    <section className="relative overflow-hidden bg-maroon-900 text-cream">
      <Mountains className="absolute inset-x-0 top-0 h-24 w-full rotate-180 text-ivory" />
      <div className="absolute inset-0 dharma-pattern opacity-50" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />

      <div className="shell relative py-24 text-center sm:py-28">
        <h2 className="mx-auto max-w-3xl text-balance font-display text-3xl font-semibold sm:text-4xl lg:text-5xl">
          Begin your journey in the <span className="text-gold">Nalanda tradition</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-cream/75">
          Applications for the 2026–27 session are open across our undergraduate, postgraduate, doctoral and Sowa Rigpa programmes.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a href="#programmes" className="group inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-maroon-900 shadow-[var(--shadow-lift)] transition-transform hover:-translate-y-0.5">
            Apply Now <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a href={`tel:${institute.phone}`} className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-6 py-3.5 text-sm font-semibold text-cream transition-colors hover:border-gold hover:text-gold">
            <IconPhone className="h-4 w-4" /> {institute.phone}
          </a>
          <a href={`mailto:${institute.email}`} className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-6 py-3.5 text-sm font-semibold text-cream transition-colors hover:border-gold hover:text-gold">
            <IconMail className="h-4 w-4" /> Email us
          </a>
        </div>
      </div>
    </section>
  );
}
