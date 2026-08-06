import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/page-header";
import { EndlessKnot } from "@/components/icons";
import { history, visionMission, stats, institute as staticInstitute } from "@/lib/content";
import { getSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description: "The history, vision and mission of the Central Institute of Buddhist Studies, Leh.",
};

export const revalidate = 60;

export default async function AboutPage() {
  const institute = await getSettings();
  const { foundedLong, founder } = staticInstitute;

  return (
    <>
      <PageHeader
        eyebrow="About the Institute"
        title="A seat of learning where Nalanda and the Himalaya meet"
        intro={`Founded on ${foundedLong} on the inspiration of ${founder}, CIBS is a ${institute.status} under the ${institute.ministry}.`}
        crumbs={[{ label: "About" }]}
      />

      {/* At a glance */}
      <section id="glance" className="shell -mt-10 scroll-mt-24">
        <div className="grid grid-cols-2 gap-4 rounded-2xl border border-maroon-100 bg-cream p-6 shadow-[var(--shadow-lift)] sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-2xl font-semibold text-maroon sm:text-3xl">{s.value}</p>
              <p className="mt-1 text-[11px] font-medium uppercase tracking-wide text-ink-soft">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* History */}
      <section id="history" className="shell scroll-mt-24 py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-start">
          <div>
            <p className="eyebrow text-gold-600">Historical Background</p>
            <h2 className="mt-2 text-3xl font-semibold text-maroon">From the monasteries of Ladakh</h2>
            <div className="mt-4 gold-rule" />
            <p className="mt-6 leading-relaxed text-ink-soft">{history.intro}</p>
            {history.paras.map((p, i) => (
              <p key={i} className="mt-4 leading-relaxed text-ink-soft">{p}</p>
            ))}
          </div>

          <aside className="lg:sticky lg:top-28">
            <div className="overflow-hidden rounded-2xl border border-maroon-100 shadow-[var(--shadow-soft)]">
              <div className="relative aspect-[4/3]">
                <Image src="/images/campus-2.jpg" alt="CIBS campus, Ladakh" fill sizes="(max-width:1024px) 100vw, 40vw" className="object-cover" />
              </div>
              <div className="bg-maroon p-5 text-cream">
                <p className="font-display text-lg">Founded {institute.founded}</p>
                <p className="mt-1 text-sm text-cream/75">As the School of Buddhist Philosophy, by ten major monasteries of Ladakh.</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Vision & Mission */}
      <section id="vision" className="scroll-mt-24 bg-cream py-16 sm:py-20">
        <div className="shell grid gap-10 lg:grid-cols-2">
          <div className="rounded-2xl border border-maroon-100 bg-ivory p-8">
            <EndlessKnot className="h-8 w-8 text-gold" />
            <h2 className="mt-4 font-display text-2xl text-maroon">Our Vision</h2>
            <p className="mt-3 leading-relaxed text-ink-soft">{visionMission.vision}</p>
          </div>
          <div className="rounded-2xl border border-maroon-100 bg-ivory p-8">
            <EndlessKnot className="h-8 w-8 text-gold" />
            <h2 className="mt-4 font-display text-2xl text-maroon">Our Mission</h2>
            <ul className="mt-4 space-y-3">
              {visionMission.mission.map((m) => (
                <li key={m} className="flex gap-3 text-sm leading-relaxed text-ink">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Accreditation */}
      <section id="accreditation" className="shell scroll-mt-24 py-16 sm:py-20">
        <div className="rounded-2xl bg-maroon p-8 text-cream sm:p-10">
          <p className="eyebrow text-gold-soft">Accreditation & Compliance</p>
          <h2 className="mt-2 font-display text-2xl sm:text-3xl">Recognised, accountable, quality-assured</h2>
          <p className="mt-4 max-w-3xl text-cream/80">
            As a Government of India institution, CIBS maintains transparency and quality through statutory recognition and accreditation frameworks.
          </p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {["Deemed to be University", "NAAC Accreditation", "NIRF Participation", "AISHE / IQAC"].map((b) => (
              <div key={b} className="rounded-xl border border-cream/15 bg-maroon-900/30 px-5 py-4 text-sm font-medium">
                {b}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
