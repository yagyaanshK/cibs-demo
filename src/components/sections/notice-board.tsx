"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Notice, NoticeCategory } from "@/lib/content";
import { IconArrow } from "@/components/icons";

const TABS: (NoticeCategory | "All")[] = ["All", "Notice", "Advertisement", "Event", "Tender"];

const dateFmt = new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" });

export function NoticeBoard({
  notices,
  hideHeading = false,
}: {
  notices: Notice[];
  hideHeading?: boolean;
}) {
  const [tab, setTab] = useState<(typeof TABS)[number]>("All");

  const list = useMemo(() => {
    const filtered = tab === "All" ? notices : notices.filter((n) => n.category === tab);
    return [...filtered].sort((a, b) => +new Date(b.date) - +new Date(a.date));
  }, [tab, notices]);

  return (
    <section id="notices" className={`shell scroll-mt-24 ${hideHeading ? "py-10" : "-mt-4 py-16 sm:py-20"}`}>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className={hideHeading ? "sr-only" : ""}>
          <p className="eyebrow text-gold-600">Announcements</p>
          <h2 className="mt-2 text-3xl font-semibold text-maroon sm:text-4xl">Notice Board</h2>
        </div>
        <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Notice categories">
          {TABS.map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                tab === t
                  ? "bg-maroon text-cream shadow-[var(--shadow-soft)]"
                  : "bg-cream text-ink-soft ring-1 ring-maroon-100 hover:bg-maroon-50 hover:text-maroon"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <ul className="mt-8 divide-y divide-maroon-50 overflow-hidden rounded-2xl border border-maroon-100 bg-cream shadow-[var(--shadow-soft)]">
        {list.map((n, i) => {
          const d = new Date(n.date);
          return (
            <li key={i}>
              <a href={n.href} className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-maroon-50/60 sm:gap-6 sm:px-7">
                <div className="hidden shrink-0 flex-col items-center rounded-xl bg-sand px-3 py-2 text-maroon sm:flex">
                  <span className="font-display text-xl font-semibold leading-none">{dateFmt.format(d).split(" ")[0]}</span>
                  <span className="text-[11px] font-semibold uppercase">{dateFmt.format(d).split(" ")[1]}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <CategoryTag category={n.category} />
                    {n.isNew && (
                      <span className="rounded bg-gold/20 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-gold-800">
                        New
                      </span>
                    )}
                    <span className="text-xs text-ink-soft sm:hidden">{dateFmt.format(d)}</span>
                  </div>
                  <p className="truncate text-[15px] font-medium text-ink group-hover:text-maroon">{n.title}</p>
                </div>
                <IconArrow className="h-5 w-5 shrink-0 text-maroon-300 transition-all group-hover:translate-x-1 group-hover:text-maroon" />
              </a>
            </li>
          );
        })}
        {list.length === 0 && (
          <li className="px-6 py-10 text-center text-sm text-ink-soft">No items in this category yet.</li>
        )}
      </ul>

      <div className="mt-6 text-center">
        <Link href="/notices" className="inline-flex items-center gap-2 text-sm font-semibold text-maroon hover:text-maroon-700">
          View all announcements <IconArrow className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

const tagStyles: Record<NoticeCategory, string> = {
  Notice: "bg-maroon-50 text-maroon",
  Advertisement: "bg-teal/10 text-teal-700",
  Event: "bg-gold/15 text-gold-800",
  Tender: "bg-ink/8 text-ink-soft",
};

function CategoryTag({ category }: { category: NoticeCategory }) {
  return (
    <span className={`rounded px-2 py-0.5 text-[11px] font-semibold ${tagStyles[category]}`}>
      {category}
    </span>
  );
}
