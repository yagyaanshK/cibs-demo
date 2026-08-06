"use client";

import { useState } from "react";
import Image from "next/image";
import { IconArrow } from "@/components/icons";

type Screen = {
  id: string;
  label: string;
  path: string;
  headline: string;
  caption: string;
};

const SCREENS: Screen[] = [
  {
    id: "login",
    label: "Secure sign-in",
    path: "/admin/login",
    headline: "A private, CIBS-branded sign-in",
    caption:
      "Only authorised CIBS staff can reach the panel. Accounts are created by an administrator — there is no public sign-up.",
  },
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin",
    headline: "Everything in one place",
    caption:
      "Content, Administration and Settings are grouped so staff can find what they need without training. One click to add a new item.",
  },
  {
    id: "notices-list",
    label: "Notice board",
    path: "/admin/collections/notices",
    headline: "The notice board, managed by CIBS",
    caption:
      "Every notice, advertisement, event and tender in one searchable list — filter by category, sort by date, see what is published at a glance.",
  },
  {
    id: "notice-edit",
    label: "Publishing a notice",
    path: "/admin/collections/notices/1",
    headline: "Publish a notice in under a minute",
    caption:
      "Type the title, pick a category and date, attach the PDF, and publish. Save as a draft to prepare in advance — it appears on the website within a minute of publishing.",
  },
  {
    id: "media",
    label: "Media library",
    path: "/admin/collections/media",
    headline: "Documents and photographs",
    caption:
      "Notice PDFs and campus photographs live in one library. Images are resized automatically for fast loading on slow connections.",
  },
  {
    id: "faculties",
    label: "Faculties",
    path: "/admin/collections/faculties",
    headline: "Academic content, editable",
    caption:
      "The four faculties shown on the website — edit the description or highlights and the site updates itself.",
  },
  {
    id: "programmes",
    label: "Programmes",
    path: "/admin/collections/programmes",
    headline: "Programmes of study",
    caption:
      "Add or amend degrees, levels and durations. They flow through to the homepage, Academics and Admissions pages automatically.",
  },
  {
    id: "gallery",
    label: "Gallery",
    path: "/admin/collections/gallery-items",
    headline: "Campus gallery",
    caption: "Upload a photograph, give it a caption, set the order — the public gallery updates itself.",
  },
  {
    id: "users",
    label: "Staff & roles",
    path: "/admin/collections/users",
    headline: "Two roles, safely separated",
    caption:
      "Editors can publish notices and edit content. Only Administrators can manage staff accounts — so the panel stays safe in everyday use.",
  },
  {
    id: "settings",
    label: "Institute settings",
    path: "/admin/globals/institute-settings",
    headline: "Contact details without a developer",
    caption:
      "Phone, email, address and social links used across the entire website — changed once, updated everywhere. No code, no support ticket.",
  },
];

export function AdminPreview() {
  const [active, setActive] = useState(0);
  const screen = SCREENS[active];

  return (
    <section className="shell py-12 sm:py-16">
      <div className="grid gap-8 lg:grid-cols-[260px_1fr] lg:items-start">
        {/* Screen list */}
        <nav aria-label="Admin screens" className="lg:sticky lg:top-28">
          <p className="eyebrow text-gold-600">Walkthrough</p>
          <h2 className="mt-2 font-display text-xl text-maroon">Screens</h2>
          <div className="mt-3 gold-rule" />
          <ul className="mt-4 flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {SCREENS.map((s, i) => (
              <li key={s.id} className="shrink-0 lg:shrink">
                <button
                  onClick={() => setActive(i)}
                  aria-current={i === active}
                  className={`w-full whitespace-nowrap rounded-lg px-3.5 py-2.5 text-left text-sm font-medium transition-colors lg:whitespace-normal ${
                    i === active
                      ? "bg-maroon text-cream shadow-[var(--shadow-soft)]"
                      : "bg-cream text-ink-soft ring-1 ring-maroon-100 hover:bg-maroon-50 hover:text-maroon"
                  }`}
                >
                  <span className={`mr-2 text-xs ${i === active ? "text-gold-soft" : "text-maroon-300"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Viewer */}
        <div>
          <div className="overflow-hidden rounded-2xl border border-maroon-100 bg-cream shadow-[var(--shadow-lift)]">
            {/* browser chrome */}
            <div className="flex items-center gap-3 border-b border-maroon-100 bg-sand px-4 py-2.5">
              <span className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-maroon-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-gold" />
                <span className="h-2.5 w-2.5 rounded-full bg-teal/60" />
              </span>
              <span className="flex-1 truncate rounded-md bg-cream px-3 py-1 text-center text-xs text-ink-soft">
                cibs.ac.in{screen.path}
              </span>
            </div>

            <div className="relative aspect-[1440/900] w-full bg-white">
              <Image
                key={screen.id}
                src={`/admin-preview/${screen.id}.png`}
                alt={`${screen.label} — CIBS admin panel`}
                fill
                sizes="(max-width: 1024px) 100vw, 70vw"
                className="rise object-contain object-top"
                priority={active === 0}
              />
            </div>
          </div>

          {/* Caption */}
          <div className="mt-6 rounded-2xl border border-maroon-100 bg-cream p-6">
            <h3 className="font-display text-xl text-maroon">{screen.headline}</h3>
            <p className="mt-2 leading-relaxed text-ink-soft">{screen.caption}</p>

            <div className="mt-5 flex items-center justify-between border-t border-maroon-50 pt-4">
              <button
                onClick={() => setActive((i) => Math.max(0, i - 1))}
                disabled={active === 0}
                className="inline-flex items-center gap-2 text-sm font-semibold text-maroon disabled:opacity-30"
              >
                <IconArrow className="h-4 w-4 rotate-180" /> Previous
              </button>
              <span className="text-xs text-ink-soft">
                {active + 1} of {SCREENS.length}
              </span>
              <button
                onClick={() => setActive((i) => Math.min(SCREENS.length - 1, i + 1))}
                disabled={active === SCREENS.length - 1}
                className="inline-flex items-center gap-2 text-sm font-semibold text-maroon disabled:opacity-30"
              >
                Next <IconArrow className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
