import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { DharmaWheel } from "@/components/icons";
import { leadership } from "@/lib/content";

export const metadata: Metadata = {
  title: "Administration",
  description: "Leadership, office bearers and statutory bodies of the Central Institute of Buddhist Studies.",
};

export default function AdministrationPage() {
  const { chancellor, offices, bodies } = leadership;
  return (
    <>
      <PageHeader
        eyebrow="Administration"
        title="Governance & Leadership"
        intro="CIBS is governed within the framework of a Deemed to be University under the Ministry of Culture, led by its Chancellor and administered through its statutory bodies and offices."
        crumbs={[{ label: "Administration" }]}
      />

      {/* Chancellor */}
      <section id="chancellor" className="shell scroll-mt-24 py-16 sm:py-20">
        <div className="grid gap-8 rounded-2xl border border-maroon-100 bg-cream p-8 shadow-[var(--shadow-lift)] sm:grid-cols-[auto_1fr] sm:items-center sm:p-10">
          <div className="grid h-28 w-28 place-items-center rounded-full bg-maroon text-gold ring-4 ring-gold/20">
            <DharmaWheel className="h-16 w-16" />
          </div>
          <div>
            <p className="eyebrow text-gold-600">Chancellor</p>
            <h2 className="mt-1 font-display text-3xl text-maroon">{chancellor.name}</h2>
            <p className="mt-2 text-ink-soft">{chancellor.detail}</p>
          </div>
        </div>
      </section>

      {/* Offices */}
      <section id="officers" className="scroll-mt-24 bg-cream py-16 sm:py-20">
        <div className="shell">
          <p className="eyebrow text-gold-600">Office Bearers</p>
          <h2 className="mt-2 text-3xl font-semibold text-maroon">The University offices</h2>
          <div className="mt-4 gold-rule" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {offices.map((o) => (
              <div key={o.role} className="rounded-2xl border border-maroon-100 bg-ivory p-6">
                <p className="text-xs font-bold uppercase tracking-wider text-gold-600">{o.role}</p>
                <p className="mt-2 font-display text-lg text-maroon">{o.holder}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-ink-soft">
            Names and contact details of current office bearers are maintained by the CIBS team through the admin panel.
          </p>
        </div>
      </section>

      {/* Statutory bodies */}
      <section id="bodies" className="shell scroll-mt-24 py-16 sm:py-20">
        <p className="eyebrow text-gold-600">Statutory Bodies</p>
        <h2 className="mt-2 text-3xl font-semibold text-maroon">Committees & councils</h2>
        <div className="mt-4 gold-rule" />
        <div className="mt-8 flex flex-wrap gap-3">
          {bodies.map((b) => (
            <span key={b} className="rounded-full border border-maroon-100 bg-cream px-5 py-2.5 text-sm font-medium text-ink">
              {b}
            </span>
          ))}
        </div>
      </section>
    </>
  );
}
