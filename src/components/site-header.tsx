"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IconChevron, IconMail, IconPhone } from "./icons";
import { languages, nav, type NavItem, type NavChild } from "@/lib/content";
import type { Settings } from "@/lib/data";

export function SiteHeader({ institute }: { institute: Settings }) {
  const [open, setOpen] = useState(false);

  // Desktop mega-menu: which top-level dropdown is showing. Kept as shared state
  // (not per-item CSS :hover) so moving the cursor from a trigger to the panel
  // never loses the hover and closes it.
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openMenu = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenu(label);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActiveMenu(null), 140);
  };
  const closeMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenu(null);
  };
  const activeItem = nav.find((n) => n.label === activeMenu && n.children && n.children.length > 0);

  return (
    <>
      {/* ============ Official banner ============ */}
      <div className="relative bg-maroon-700 text-cream">
        <div className="pointer-events-none absolute inset-0 banner-knots opacity-60" aria-hidden />

        <div className="relative hidden border-b border-cream/10 md:block">
          <div className="shell flex h-9 items-center justify-between text-xs">
            <p className="flex items-center gap-2">
              <span className="text-gold-soft">{institute.status}</span>
              <span className="text-cream/40">·</span>
              <span>{institute.ministry}</span>
            </p>
            <div className="flex items-center gap-5">
              <a href={`tel:${institute.phone}`} className="flex items-center gap-1.5 hover:text-gold-soft">
                <IconPhone className="h-3.5 w-3.5" /> {institute.phone}
              </a>
              <a href={`mailto:${institute.email}`} className="flex items-center gap-1.5 hover:text-gold-soft">
                <IconMail className="h-3.5 w-3.5" /> {institute.email}
              </a>
              <LangSwitch />
            </div>
          </div>
        </div>

        <div className="shell relative py-2.5">
          <div className="flex items-center gap-3 rounded-sm border border-gold/25 px-3 py-2 sm:gap-5 sm:px-5">
            <Link href="/" className="relative shrink-0" aria-label={`${institute.name} — home`}>
              <span
                aria-hidden
                className="pointer-events-none absolute -inset-4 z-0 rounded-full bg-maroon-700 [-webkit-mask-image:radial-gradient(closest-side,#000_72%,transparent)] [mask-image:radial-gradient(closest-side,#000_72%,transparent)]"
              />
              <Image
                src="/images/cibs-emblem-color.png"
                alt="CIBS emblem"
                width={72}
                height={72}
                className="relative z-10 h-12 w-12 object-contain drop-shadow sm:h-16 sm:w-16"
                priority
              />
            </Link>

            <div className="relative min-w-0 flex-1">
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 z-0 bg-maroon-700 [-webkit-mask-image:linear-gradient(to_right,transparent,#000_14%,#000_86%,transparent)] [mask-image:linear-gradient(to_right,transparent,#000_14%,#000_86%,transparent)]"
              />
              <div className="relative z-10 text-center">
                <p className="text-[10px] font-medium tracking-wide text-cream/85">Deemed to be University</p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/name-bhoti.png" alt="" aria-hidden className="mx-auto mt-1 hidden h-4 w-auto opacity-95 sm:block" />
                <h1 className="mt-0.5 font-display text-base font-semibold uppercase leading-tight tracking-[0.02em] text-cream sm:text-xl lg:text-[26px]">
                  Central Institute of Buddhist Studies
                </h1>
                <p lang="hi" className="text-[11px] font-medium text-gold-soft sm:text-[13px]">
                  केंद्रीय बौद्ध विद्या संस्थान (समवत विश्वविद्यालय)
                </p>
                <p className="text-[9px] text-cream/75 sm:text-[10px]">(under the Ministry of Culture, Government of India)</p>
              </div>
            </div>

            <div className="relative hidden shrink-0 flex-col items-center gap-1 sm:flex">
              <span
                aria-hidden
                className="pointer-events-none absolute -inset-x-6 -inset-y-3 z-0 rounded-lg bg-maroon-700 [-webkit-mask-image:radial-gradient(closest-side,#000_70%,transparent)] [mask-image:radial-gradient(closest-side,#000_70%,transparent)]"
              />
              <div className="relative z-10 flex flex-col items-center gap-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/emblem-of-india.svg" alt="State Emblem of India" className="h-11 w-auto lg:h-14" style={{ filter: "brightness(0) invert(1)" }} />
                <span className="text-center text-[8px] font-semibold uppercase leading-tight tracking-wide text-cream lg:text-[9px]">
                  Ministry of Culture
                  <span className="block font-normal text-cream/70">Government of India</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============ Sticky navigation bar ============ */}
      <header className="sticky top-0 z-50 border-b border-maroon-100 bg-cream/95 backdrop-blur supports-[backdrop-filter]:bg-cream/85">
        <div className="shell relative flex items-center justify-between gap-3 py-2" onMouseLeave={scheduleClose}>
          <Link href="/" className="flex shrink-0 items-center gap-2" aria-label={`${institute.name} — home`}>
            <Image src="/images/cibs-emblem-color.png" alt="" width={28} height={28} className="h-7 w-7 object-contain" />
            <span className="font-display text-base font-bold text-maroon">CIBS</span>
          </Link>

          <nav className="hidden flex-1 flex-wrap items-center justify-center gap-x-0.5 gap-y-0.5 xl:flex" aria-label="Primary">
            {nav.map((item) => (
              <TopItem key={item.label} item={item} active={activeMenu === item.label} onOpen={() => openMenu(item.label)} />
            ))}
          </nav>

          {/* Shared full-width mega panel — anchored to the shell, right below the nav */}
          {activeItem && (
            <div
              className="absolute inset-x-0 top-full z-30 hidden pt-1 xl:block"
              onMouseEnter={() => openMenu(activeItem.label)}
            >
              <div className="rounded-2xl border border-maroon-100 bg-cream p-5 shadow-[var(--shadow-lift)]">
                <p className="mb-3 border-b border-maroon-50 pb-2 text-[11px] font-bold uppercase tracking-wider text-maroon">
                  {activeItem.label}
                </p>
                <div className="columns-2 gap-6 sm:columns-3 lg:columns-4 [&>*]:mb-1 [&>*]:break-inside-avoid">
                  {activeItem.children!.map((c) => (
                    <ChildEntry key={c.label} child={c} onNavigate={closeMenu} />
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Link
              href="/ums-preview"
              className="hidden rounded border border-maroon-300 px-3 py-2 text-xs font-semibold text-maroon transition-colors hover:bg-maroon-50 lg:inline-flex"
            >
              UMS Demo
            </Link>
            <Link
              href="/admissions"
              className="hidden rounded-full bg-maroon px-4 py-2 text-sm font-semibold text-cream shadow-[var(--shadow-soft)] transition-colors hover:bg-maroon-700 sm:inline-block"
            >
              Apply
            </Link>
            <button
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-lg border border-maroon-100 text-maroon xl:hidden"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              <span className="relative block h-4 w-5">
                <span className={`absolute left-0 h-0.5 w-5 bg-current transition-all ${open ? "top-2 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 top-2 h-0.5 w-5 bg-current transition-all ${open ? "opacity-0" : "opacity-100"}`} />
                <span className={`absolute left-0 h-0.5 w-5 bg-current transition-all ${open ? "top-2 -rotate-45" : "top-4"}`} />
              </span>
            </button>
          </div>
        </div>

        {open && <MobileMenu institute={institute} onNavigate={() => setOpen(false)} />}
      </header>
    </>
  );
}

/* ---------- Desktop: top-level item with mega dropdown ---------- */
function TopItem({ item, active, onOpen }: { item: NavItem; active: boolean; onOpen: () => void }) {
  const hasChildren = Boolean(item.children && item.children.length > 0);
  return (
    <Link
      href={item.href}
      onMouseEnter={onOpen}
      onFocus={onOpen}
      aria-expanded={hasChildren ? active : undefined}
      className={`flex items-center gap-1 rounded-md px-2.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-maroon-50 hover:text-maroon ${
        active && hasChildren ? "bg-maroon-50 text-maroon" : "text-ink"
      }`}
    >
      {item.label}
      {hasChildren && <IconChevron className={`h-3 w-3 opacity-60 transition-transform ${active ? "rotate-180" : ""}`} />}
    </Link>
  );
}

function ChildEntry({ child, onNavigate }: { child: NavChild; onNavigate: () => void }) {
  const cls =
    "block rounded-lg px-3 py-1.5 text-sm text-ink-soft transition-colors hover:bg-maroon-50 hover:text-maroon";
  if (child.children && child.children.length > 0) {
    return (
      <div className="break-inside-avoid py-1">
        <ChildLink child={child} onNavigate={onNavigate} className="block px-3 pb-0.5 text-[11px] font-bold uppercase tracking-wide text-gold-800" />
        {child.children.map((g) => (
          <ChildLink key={g.label} child={g} onNavigate={onNavigate} className={cls} />
        ))}
      </div>
    );
  }
  return <ChildLink child={child} onNavigate={onNavigate} className={cls} />;
}

function ChildLink({
  child,
  className,
  onNavigate,
}: {
  child: { label: string; href: string; external?: boolean };
  className: string;
  onNavigate: () => void;
}) {
  if (child.external) {
    return (
      <a href={child.href} target="_blank" rel="noopener noreferrer" className={className} onClick={onNavigate}>
        {child.label}
      </a>
    );
  }
  return (
    <Link href={child.href} className={className} onClick={onNavigate}>
      {child.label}
    </Link>
  );
}

/* ---------- Mobile: accordion ---------- */
function MobileMenu({ institute, onNavigate }: { institute: Settings; onNavigate: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <div className="max-h-[75vh] overflow-y-auto border-t border-maroon-100 bg-cream xl:hidden">
      <nav className="shell flex flex-col py-2" aria-label="Mobile">
        {nav.map((item) => {
          const hasChildren = item.children && item.children.length > 0;
          const isOpen = expanded === item.label;
          return (
            <div key={item.label} className="border-b border-maroon-50">
              <div className="flex items-center justify-between">
                <Link href={item.href} onClick={onNavigate} className="flex-1 py-3 text-[15px] font-medium text-ink hover:text-maroon">
                  {item.label}
                </Link>
                {hasChildren && (
                  <button
                    onClick={() => setExpanded(isOpen ? null : item.label)}
                    aria-label={`Toggle ${item.label}`}
                    aria-expanded={isOpen}
                    className="grid h-9 w-9 place-items-center text-maroon"
                  >
                    <IconChevron className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                )}
              </div>
              {hasChildren && isOpen && (
                <div className="pb-2 pl-3">
                  {item.children!.map((c) => (
                    <div key={c.label}>
                      <MobileLink child={c} onNavigate={onNavigate} className="block py-2 text-sm font-medium text-ink-soft hover:text-maroon" />
                      {c.children?.map((g) => (
                        <MobileLink key={g.label} child={g} onNavigate={onNavigate} className="block py-1.5 pl-4 text-sm text-ink-soft/90 hover:text-maroon" />
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
        <div className="flex flex-wrap items-center gap-3 py-4">
          <Link
            href="/ums-preview"
            onClick={onNavigate}
            className="rounded bg-maroon px-3 py-2 text-sm font-semibold text-cream"
          >
            Open UMS Demo
          </Link>
          <div className="flex items-center gap-1 rounded-full border border-maroon-100 p-0.5">
            {languages.map((l) => (
              <button
                key={l.code}
                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${l.active ? "bg-maroon text-cream" : "text-ink-soft"}`}
                title={l.label}
              >
                {l.short}
              </button>
            ))}
          </div>
          <a href={`tel:${institute.phone}`} className="text-sm text-ink-soft">{institute.phone}</a>
        </div>
      </nav>
    </div>
  );
}

function MobileLink({
  child,
  className,
  onNavigate,
}: {
  child: { label: string; href: string; external?: boolean };
  className: string;
  onNavigate: () => void;
}) {
  if (child.external) {
    return (
      <a href={child.href} target="_blank" rel="noopener noreferrer" className={className}>
        {child.label}
      </a>
    );
  }
  return (
    <Link href={child.href} onClick={onNavigate} className={className}>
      {child.label}
    </Link>
  );
}

function LangSwitch() {
  return (
    <div className="flex items-center gap-1 rounded-full border border-cream/25 p-0.5">
      {languages.map((l) => (
        <button
          key={l.code}
          className={`rounded-full px-2 py-0.5 text-[11px] font-semibold transition-colors ${
            l.active ? "bg-gold text-maroon-900" : "text-cream/70 hover:text-cream"
          }`}
          title={l.label}
          aria-current={l.active ? "true" : undefined}
        >
          {l.short}
        </button>
      ))}
    </div>
  );
}
