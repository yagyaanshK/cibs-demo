import Image from "next/image";
import Link from "next/link";

/**
 * CIBS lockup: the official emblem with a compact "CIBS" wordmark stacked
 * beneath it, and the full institute name set alongside. Stacking the acronym
 * under the emblem gives the full name room to lay out on two tidy lines
 * instead of wrapping and overrunning the header.
 */
export function BrandMark({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const primary = tone === "light" ? "text-cream" : "text-maroon";
  const secondary = tone === "light" ? "text-cream/80" : "text-ink";
  const divider = tone === "light" ? "bg-cream/20" : "bg-maroon-100";

  return (
    <Link
      href="/"
      className="group flex shrink-0 items-center gap-3"
      aria-label="Central Institute of Buddhist Studies — home"
    >
      {/* Emblem + acronym, stacked */}
      <span className="flex shrink-0 flex-col items-center gap-1">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-cream ring-2 ring-gold/40 transition-transform group-hover:scale-105">
          <Image
            src="/images/cibs-logo.png"
            alt="CIBS emblem"
            width={40}
            height={35}
            className="h-7 w-auto object-contain"
            priority
          />
        </span>
        <span className={`font-display text-xs font-bold leading-none tracking-[0.14em] ${primary}`}>
          CIBS
        </span>
      </span>

      <span className={`hidden h-9 w-px sm:block ${divider}`} aria-hidden />

      <span className={`hidden max-w-[12rem] font-display text-[13px] font-semibold leading-[1.2] sm:block ${secondary}`}>
        Central Institute of Buddhist Studies
      </span>
    </Link>
  );
}
