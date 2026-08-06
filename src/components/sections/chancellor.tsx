import Image from "next/image";
import Link from "next/link";
import { leadership } from "@/lib/content";
import { IconArrow } from "@/components/icons";

/**
 * Leadership band — the Chancellor (Union Minister of Culture) and the Vice
 * Chancellor. The Institute's link to the Government of India, prominent for
 * visiting officials. Verified facts only; no words are attributed to them.
 */
export function ChancellorFeature() {
  const { chancellor, viceChancellor } = leadership;

  return (
    <section className="bg-cream py-16 sm:py-20">
      <div className="shell">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-gold-600">Under the Aegis of the Ministry of Culture</p>
          <h2 className="mt-2 text-3xl font-semibold text-maroon sm:text-4xl">Leadership</h2>
          <div className="mx-auto mt-4 gold-rule" />
          <p className="mt-5 text-sm leading-relaxed text-ink-soft">
            The Central Institute of Buddhist Studies functions as a Deemed to be University under the Ministry of Culture,
            Government of India, with the Hon&rsquo;ble Union Minister of Culture as its Chancellor.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl gap-5 sm:grid-cols-2">
          <LeaderCard person={chancellor} />
          <LeaderCard person={viceChancellor} />
        </div>

        <div className="mt-6 text-center">
          <Link href="/administration" className="inline-flex items-center gap-2 text-sm font-semibold text-maroon hover:text-maroon-700">
            Governance & Administration <IconArrow className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function LeaderCard({
  person,
}: {
  person: { name: string; role: string; detail: string; photo: string };
}) {
  return (
    <article className="flex items-center gap-5 rounded-2xl border border-maroon-100 bg-ivory p-5 shadow-[var(--shadow-soft)] sm:gap-6 sm:p-6">
      <div className="relative h-44 w-36 shrink-0 overflow-hidden rounded-xl border-2 border-gold/40 bg-maroon-900 shadow-[var(--shadow-soft)] sm:h-52 sm:w-40">
        <Image src={person.photo} alt={`${person.name}, ${person.role}`} fill sizes="160px" className="object-cover object-top" />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-bold uppercase tracking-wider text-gold-600">{person.role}</p>
        <h3 className="mt-1 font-display text-2xl text-maroon">{person.name}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{person.detail}</p>
      </div>
    </article>
  );
}
