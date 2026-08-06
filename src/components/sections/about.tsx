import Link from "next/link";
import { stats } from "@/lib/content";
import type { Settings } from "@/lib/data";
import { DharmaWheel, EndlessKnot, IconArrow } from "@/components/icons";

export function About({ institute }: { institute: Settings }) {
  return (
    <section id="about" className="scroll-mt-24 py-20 sm:py-24">
      <div className="shell grid gap-14 lg:grid-cols-2 lg:items-center">
        {/* Visual */}
        <div className="relative order-last lg:order-first">
          <div className="relative overflow-hidden rounded-[2rem] border border-maroon-100 bg-gradient-to-br from-maroon to-maroon-900 p-10 text-cream shadow-[var(--shadow-lift)]">
            <div className="absolute inset-0 dharma-pattern opacity-40" />
            <div className="relative">
              <DharmaWheel className="h-16 w-16 text-gold" />
              <blockquote className="mt-6 font-display text-2xl leading-snug text-cream">
                &ldquo;A seat of learning where the rivers of Nalanda and the Himalayas meet.&rdquo;
              </blockquote>
              <p className="mt-4 text-sm text-cream/70">
                Founded in {institute.founded} on the inspiration of H.E. Kushok Bakula Rinpoche, CIBS preserves and advances the Buddhist scholarly heritage of the trans-Himalaya.
              </p>
              <div className="mt-8 flex items-center gap-3 border-t border-cream/15 pt-6">
                <EndlessKnot className="h-6 w-6 text-gold" />
                <span className="text-sm font-medium text-cream/80">Deemed to be University · Ministry of Culture</span>
              </div>
            </div>
          </div>
          {/* floating stat chip */}
          <div className="absolute -bottom-6 -right-4 hidden rounded-2xl border border-gold/30 bg-cream px-6 py-4 shadow-[var(--shadow-lift)] sm:block">
            <p className="font-display text-3xl font-semibold text-maroon">65+</p>
            <p className="text-xs font-medium text-ink-soft">Years of scholarship</p>
          </div>
        </div>

        {/* Copy */}
        <div>
          <p className="eyebrow text-gold-600">About the Institute</p>
          <h2 className="mt-2 text-3xl font-semibold text-maroon sm:text-4xl">
            Rooted in tradition, oriented to the future
          </h2>
          <div className="mt-4 gold-rule" />
          <p className="mt-6 leading-relaxed text-ink-soft">
            The Central Institute of Buddhist Studies, formerly the School of Buddhist Philosophy, is a Deemed to be University at Choglamsar, Leh. It carries forward the intellectual lineage of Nalanda and Takshila — offering rigorous study of Buddhist philosophy, classical and modern languages, the traditional medical science of Sowa Rigpa, and contemporary disciplines.
          </p>
          <p className="mt-4 leading-relaxed text-ink-soft">
            As a Government of India institution, CIBS is committed to accessible, accountable and accreditation-driven education aligned with NEP-2020 and the requirements of NAAC and NIRF.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-xl border border-maroon-100 bg-cream px-4 py-4 text-center">
                <p className="font-display text-2xl font-semibold text-maroon">{s.value}</p>
                <p className="mt-1 text-[11px] font-medium uppercase tracking-wide text-ink-soft">{s.label}</p>
              </div>
            ))}
          </div>

          <Link href="/about" className="mt-8 inline-flex items-center gap-2 rounded-full bg-maroon px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-maroon-700">
            Read our full history <IconArrow className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
