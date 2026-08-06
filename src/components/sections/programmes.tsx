import Link from "next/link";
import { quickLinks, type Programme } from "@/lib/content";
import { IconArrow } from "@/components/icons";

export function Programmes({ programmes }: { programmes: Programme[] }) {
  return (
    <section id="programmes" className="scroll-mt-24 bg-cream py-20 sm:py-24">
      <div className="shell grid gap-12 lg:grid-cols-[1.3fr_0.7fr]">
        {/* Programmes */}
        <div>
          <p className="eyebrow text-gold-600">Admission & Fee</p>
          <h2 className="mt-2 text-3xl font-semibold text-maroon sm:text-4xl">Programmes of Study</h2>
          <div className="mt-4 gold-rule" />

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {programmes.map((p) => (
              <Link
                key={p.title}
                href="/admissions"
                className="group flex flex-col rounded-2xl border border-maroon-100 bg-ivory p-6 transition-all hover:-translate-y-1 hover:border-gold hover:shadow-[var(--shadow-lift)]"
              >
                <span className="inline-flex w-fit rounded-full bg-maroon-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-maroon">
                  {p.level}
                </span>
                <h3 className="mt-4 font-display text-xl text-ink group-hover:text-maroon">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{p.note}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-maroon">
                  Eligibility & apply <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick links panel */}
        <aside className="lg:pt-16">
          <div className="rounded-2xl border border-maroon-100 bg-ivory p-6 shadow-[var(--shadow-soft)]">
            <h3 className="font-display text-lg text-maroon">Quick Links</h3>
            <div className="mt-3 gold-rule" />
            <ul className="mt-5 grid grid-cols-2 gap-2">
              {quickLinks.map((q) => (
                <li key={q.label}>
                  <Link
                    href={q.href}
                    className="flex items-center justify-between rounded-lg border border-transparent bg-cream px-3 py-2.5 text-sm font-medium text-ink transition-colors hover:border-maroon-100 hover:text-maroon"
                  >
                    {q.label}
                    <IconArrow className="h-3.5 w-3.5 text-maroon-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 rounded-2xl bg-maroon p-6 text-cream">
            <h3 className="font-display text-lg">Admissions Helpdesk</h3>
            <p className="mt-2 text-sm text-cream/75">
              Guidance on eligibility, documents and important dates for the 2026–27 session.
            </p>
            <Link href="/contact" className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-maroon-900 transition-transform hover:-translate-y-0.5">
              Get in touch <IconArrow className="h-4 w-4" />
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
}
