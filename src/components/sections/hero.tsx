import Image from "next/image";
import Link from "next/link";
import type { Settings } from "@/lib/data";
import { IconArrow, Mountains } from "@/components/icons";

export function Hero({ institute }: { institute: Settings }) {
  return (
    <section className="relative overflow-hidden bg-maroon-900 text-cream">
      {/* Real campus photograph */}
      <div className="absolute inset-0">
        <Image
          src="/images/campus-1.jpg"
          alt="The great Buddha statues and monks at the CIBS campus, Choglamsar, against the Himalaya"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      {/* Legibility overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-maroon-900 via-maroon-900/85 to-maroon-900/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-maroon-900 via-transparent to-maroon-900/40" />
      <div className="absolute inset-0 dharma-pattern opacity-30" />

      <div className="shell relative py-24 lg:py-32">
        <div className="max-w-2xl">
          <p className="eyebrow inline-flex items-center gap-2 rounded-full border border-gold/40 bg-maroon-900/50 px-4 py-1.5 text-gold-soft rise backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            {institute.status} · Est. {institute.founded}
          </p>

          <h1 className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.05] drop-shadow-sm sm:text-5xl lg:text-6xl rise" style={{ animationDelay: "0.05s" }}>
            Central Institute of <span className="text-gold">Buddhist Studies</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/85 rise" style={{ animationDelay: "0.12s" }}>
            {institute.tagline} A Deemed to be University under the {institute.ministry}, nurturing scholarship in philosophy, language, Sowa&nbsp;Rigpa medicine and modern studies at Choglamsar, Leh.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3 rise" style={{ animationDelay: "0.18s" }}>
            <Link
              href="/admissions"
              className="group inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-maroon-900 shadow-[var(--shadow-lift)] transition-transform hover:-translate-y-0.5"
            >
              Explore Admissions
              <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-full border border-cream/30 bg-maroon-900/20 px-6 py-3.5 text-sm font-semibold text-cream backdrop-blur transition-colors hover:border-gold hover:text-gold"
            >
              About the Institute
            </Link>
          </div>
        </div>
      </div>

      <Mountains className="relative z-10 block h-20 w-full text-ivory sm:h-28" />
    </section>
  );
}
