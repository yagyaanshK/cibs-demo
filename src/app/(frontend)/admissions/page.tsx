import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { IconArrow } from "@/components/icons";
import { admissionSteps, quickLinks } from "@/lib/content";
import { getProgrammes, getSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Admission & Fee",
  description: "How to apply to programmes at the Central Institute of Buddhist Studies, Leh.",
};

export const revalidate = 60;

export default async function AdmissionsPage() {
  const [programmes, institute] = await Promise.all([getProgrammes(), getSettings()]);

  return (
    <>
      <PageHeader
        eyebrow="Admission & Fee"
        title="Join CIBS — Admissions 2026–27"
        intro="Applications are invited across undergraduate, postgraduate, doctoral and Sowa Rigpa programmes. Follow the steps below to apply."
        crumbs={[{ label: "Admission & Fee" }]}
      />

      {/* Steps */}
      <section className="shell py-16 sm:py-20">
        <p className="eyebrow text-gold-600">The Process</p>
        <h2 className="mt-2 text-3xl font-semibold text-maroon">How to apply</h2>
        <div className="mt-4 gold-rule" />

        <ol className="mt-10 grid gap-5 md:grid-cols-3 lg:grid-cols-5">
          {admissionSteps.map((s) => (
            <li key={s.step} className="relative rounded-2xl border border-maroon-100 bg-cream p-5 shadow-[var(--shadow-soft)]">
              <span className="font-display text-3xl font-semibold text-gold">{s.step}</span>
              <h3 className="mt-2 font-display text-lg text-maroon">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Programmes + apply */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="shell grid gap-10 lg:grid-cols-[1.4fr_0.6fr]">
          <div>
            <p className="eyebrow text-gold-600">Programmes open</p>
            <h2 className="mt-2 text-3xl font-semibold text-maroon">Choose your programme</h2>
            <div className="mt-4 gold-rule" />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {programmes.map((p) => (
                <div key={p.title} className="rounded-2xl border border-maroon-100 bg-ivory p-6">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-maroon-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-maroon">{p.level}</span>
                    {p.duration && <span className="text-xs font-medium text-gold-800">{p.duration}</span>}
                  </div>
                  <h3 className="mt-3 font-display text-lg text-ink">{p.title}</h3>
                  <p className="mt-1.5 text-sm text-ink-soft">{p.note}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl bg-maroon p-6 text-cream">
              <h3 className="font-display text-xl">Start your application</h3>
              <p className="mt-2 text-sm text-cream/75">Apply online for the 2026–27 academic session.</p>
              <Link href="#" className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-maroon-900 transition-transform hover:-translate-y-0.5">
                Apply Online <IconArrow className="h-4 w-4" />
              </Link>
              <p className="mt-4 border-t border-cream/15 pt-4 text-sm text-cream/70">
                Helpdesk: <a href={`tel:${institute.phone}`} className="font-medium text-gold-soft">{institute.phone}</a>
              </p>
            </div>

            <div className="rounded-2xl border border-maroon-100 bg-ivory p-6">
              <h3 className="font-display text-lg text-maroon">Downloads & Links</h3>
              <div className="mt-3 gold-rule" />
              <ul className="mt-4 space-y-2">
                {quickLinks.slice(0, 5).map((q) => (
                  <li key={q.label}>
                    <Link href={q.href} className="flex items-center justify-between rounded-lg bg-cream px-3 py-2.5 text-sm font-medium text-ink hover:text-maroon">
                      {q.label} <IconArrow className="h-3.5 w-3.5 text-maroon-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
