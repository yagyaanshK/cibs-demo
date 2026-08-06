import type { Faculty } from "@/lib/content";
import { facultyIcons, IconArrow } from "@/components/icons";

export function Faculties({ faculties }: { faculties: Faculty[] }) {
  return (
    <section id="faculties" className="scroll-mt-24 bg-cream py-20 sm:py-24">
      <div className="shell">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-gold-600">Academics</p>
          <h2 className="mt-2 text-3xl font-semibold text-maroon sm:text-4xl">Four Faculties of Learning</h2>
          <div className="mx-auto mt-4 gold-rule" />
          <p className="mt-5 text-ink-soft">
            From the classical philosophy of Nalanda to the living science of Sowa Rigpa, CIBS unites ancient wisdom with a modern, NEP-2020 aligned curriculum.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {faculties.map((f) => {
            const Icon = facultyIcons[f.icon];
            return (
              <article
                key={f.name}
                className="group relative flex flex-col rounded-2xl border border-maroon-100 bg-ivory p-6 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:border-gold hover:shadow-[var(--shadow-lift)]"
              >
                <span className="grid h-14 w-14 place-items-center rounded-xl bg-maroon text-gold transition-colors group-hover:bg-maroon-700">
                  <Icon className="h-8 w-8" />
                </span>
                <h3 className="mt-5 font-display text-xl text-maroon">{f.name}</h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-soft">{f.blurb}</p>
                <ul className="mt-4 space-y-1.5 border-t border-maroon-50 pt-4">
                  {f.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-xs font-medium text-ink">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                      {p}
                    </li>
                  ))}
                </ul>
                <a href="#programmes" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-maroon opacity-0 transition-opacity group-hover:opacity-100">
                  Learn more <IconArrow className="h-4 w-4" />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
