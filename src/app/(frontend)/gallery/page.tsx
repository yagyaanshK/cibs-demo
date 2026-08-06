import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/page-header";
import { getGallery } from "@/lib/data";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photographs of the CIBS campus, hostels and academic life in Choglamsar, Leh.",
};

export const revalidate = 60;

export default async function GalleryPage() {
  const gallery = await getGallery();

  return (
    <>
      <PageHeader
        eyebrow="Campus Life"
        title="Photo Gallery"
        intro="Glimpses of the Institute — its campus, residences, the Sowa Rigpa dispensary and student life, set against the Himalaya at Choglamsar."
        crumbs={[{ label: "Gallery" }]}
      />

      <section className="shell py-16 sm:py-20">
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>figure]:mb-4">
          {gallery.map((g, i) => (
            <figure key={g.title} className="group relative break-inside-avoid overflow-hidden rounded-2xl bg-maroon-900">
              <div className={`relative ${i % 3 === 0 ? "aspect-[4/5]" : "aspect-[4/3]"}`}>
                <Image
                  src={g.src}
                  alt={g.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-maroon-900/85 via-transparent to-transparent" />
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 p-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gold-soft">{g.tag}</span>
                <p className="font-display text-cream">{g.title}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
