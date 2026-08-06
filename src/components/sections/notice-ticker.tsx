import type { Notice } from "@/lib/content";

/** Thin auto-scrolling "latest updates" band, pauses on hover. */
export function NoticeTicker({ notices }: { notices: Notice[] }) {
  const items = notices.slice(0, 6);
  if (items.length === 0) return null;
  const doubled = [...items, ...items];

  return (
    <div className="relative z-20 -mt-6 border-y border-maroon-100 bg-cream">
      <div className="shell flex items-stretch">
        <span className="my-3 flex shrink-0 items-center gap-2 rounded-md bg-maroon px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-cream">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
          Latest
        </span>
        <div className="marquee-track relative ml-4 flex-1 overflow-hidden">
          <div className="animate-marquee flex w-max items-center gap-10 py-3 whitespace-nowrap">
            {doubled.map((n, i) => (
              <a key={i} href={n.href} className="group flex items-center gap-2.5 text-sm text-ink-soft hover:text-maroon">
                <span className="text-[10px] font-bold uppercase tracking-wide text-gold-600">{n.category}</span>
                <span className="group-hover:underline">{n.title}</span>
                <span className="text-maroon-100">•</span>
              </a>
            ))}
          </div>
          {/* edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-cream to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-cream to-transparent" />
        </div>
      </div>
    </div>
  );
}
