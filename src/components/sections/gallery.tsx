import Image from "next/image";
import Link from "next/link";
import type { GalleryItem } from "@/lib/content";

export function Gallery({ gallery }: { gallery: GalleryItem[] }) {
  const items = gallery.slice(0, 6);
  return (
    <section id="gallery" className="scroll-mt-24 py-20 sm:py-24">
      <div className="shell">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow text-gold-600">Campus Life</p>
            <h2 className="mt-2 text-3xl font-semibold text-maroon sm:text-4xl">Glimpses of CIBS</h2>
            <div className="mt-4 gold-rule" />
          </div>
          <Link href="/gallery" className="text-sm font-semibold text-maroon hover:text-maroon-700">
            View full gallery →
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:grid-rows-2">
          {items.map((g, i) => (
            <figure
              key={g.title}
              className={`group relative overflow-hidden rounded-2xl bg-maroon-900 ${
                i === 0 ? "lg:col-span-2 lg:row-span-2" : ""
              } ${i === 3 ? "lg:col-span-2" : ""}`}
            >
              <div className={`${i === 0 ? "aspect-square" : "aspect-[4/3]"} w-full`}>
                <Image
                  src={g.src}
                  alt={g.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
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
      </div>
    </section>
  );
}
