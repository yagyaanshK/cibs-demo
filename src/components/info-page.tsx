import Link from "next/link";
import { PageHeader } from "./page-header";
import { IconArrow } from "./icons";
import { type InfoPage as InfoPageData } from "@/lib/content";
import { getSettings } from "@/lib/data";

export async function InfoPage({ data }: { data: InfoPageData }) {
  const institute = await getSettings();

  return (
    <>
      <PageHeader
        eyebrow={data.eyebrow}
        title={data.title}
        intro={data.intro}
        crumbs={[{ label: data.title }]}
      />

      <section className="shell py-16 sm:py-20">
        <div className="grid gap-5 sm:grid-cols-2">
          {data.cards.map((c) => (
            <article
              key={c.title}
              className="rounded-2xl border border-maroon-100 bg-cream p-6 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:border-gold"
            >
              <h3 className="font-display text-lg text-maroon">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{c.text}</p>
            </article>
          ))}
        </div>

        {data.links && data.links.length > 0 && (
          <div className="mt-10 rounded-2xl bg-maroon p-6 text-cream sm:p-8">
            <h3 className="font-display text-xl">Related Links</h3>
            <div className="mt-5 flex flex-wrap gap-3">
              {data.links.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-4 py-2 text-sm font-medium transition-colors hover:border-gold hover:text-gold"
                >
                  {l.label} <IconArrow className="h-3.5 w-3.5" />
                </Link>
              ))}
            </div>
          </div>
        )}

        <p className="mt-10 rounded-xl border border-dashed border-maroon-100 bg-cream/60 px-5 py-4 text-sm text-ink-soft">
          Detailed content for this section will be managed by the CIBS team through the admin panel. For assistance, contact{" "}
          <a href={`mailto:${institute.email}`} className="font-medium text-maroon hover:underline">{institute.email}</a>.
        </p>
      </section>
    </>
  );
}
