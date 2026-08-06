import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { facultyIcons, IconArrow } from "@/components/icons";
import { getFaculties, getProgrammes } from "@/lib/data";

export const metadata: Metadata = {
  title: "Academics",
  description: "Faculties and programmes of study at the Central Institute of Buddhist Studies.",
};

export const revalidate = 60;

export default async function AcademicsPage() {
  const [faculties, programmes] = await Promise.all([getFaculties(), getProgrammes()]);

  return (
    <>
      <PageHeader
        eyebrow="Academics"
        title="Faculties & Programmes of Study"
        intro="Four faculties unite the classical scholarship of the Nalanda tradition with a modern, NEP-2020 aligned curriculum — from philosophy and language to the living science of Sowa Rigpa."
        crumbs={[{ label: "Academics" }]}
      />

      {/* Faculties */}
      <section id="faculties" className="shell scroll-mt-24 py-16 sm:py-20">
        <p className="eyebrow text-gold-600">The Four Faculties</p>
        <h2 className="mt-2 text-3xl font-semibold text-maroon">Disciplines of study</h2>
        <div className="mt-4 gold-rule" />

        <div className="mt-10 space-y-5">
          {faculties.map((f, i) => {
            const Icon = facultyIcons[f.icon];
            return (
              <article
                key={f.name}
                className="grid gap-6 rounded-2xl border border-maroon-100 bg-cream p-6 shadow-[var(--shadow-soft)] sm:grid-cols-[auto_1fr] sm:items-center sm:p-8"
              >
                <div className="flex items-center gap-4">
                  <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-maroon text-gold">
                    <Icon className="h-9 w-9" />
                  </span>
                  <span className="font-display text-2xl text-maroon sm:hidden">{f.name}</span>
                </div>
                <div>
                  <div className="mb-1 flex items-center gap-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-gold-600">Faculty {String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="hidden font-display text-2xl text-maroon sm:block">{f.name}</h3>
                  <p className="mt-2 max-w-3xl text-ink-soft">{f.blurb}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {f.points.map((p) => (
                      <li key={p} className="rounded-full bg-maroon-50 px-3 py-1 text-xs font-medium text-maroon">{p}</li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Programmes */}
      <section id="programmes" className="scroll-mt-24 bg-cream py-16 sm:py-20">
        <div className="shell">
          <p className="eyebrow text-gold-600">Programmes</p>
          <h2 className="mt-2 text-3xl font-semibold text-maroon">Degrees offered</h2>
          <div className="mt-4 gold-rule" />

          <div className="mt-10 overflow-hidden rounded-2xl border border-maroon-100 bg-ivory shadow-[var(--shadow-soft)]">
            {programmes.map((p) => (
              <div key={p.title} className="flex flex-col gap-3 border-b border-maroon-50 p-6 last:border-0 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 inline-flex shrink-0 rounded-full bg-maroon-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-maroon">
                    {p.level}
                  </span>
                  <div>
                    <h3 className="font-display text-lg text-ink">{p.title}</h3>
                    <p className="mt-1 text-sm text-ink-soft">{p.note}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 pl-16 sm:pl-0">
                  {p.duration && <span className="text-sm font-medium text-gold-800">{p.duration}</span>}
                  <Link href="/admissions" className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-maroon hover:text-maroon-700">
                    Apply <IconArrow className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
