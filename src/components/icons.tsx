import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

/** Eight-spoke Dharma wheel — CIBS mark motif. */
export function DharmaWheel(props: P) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden {...props}>
      <circle cx="24" cy="24" r="21" stroke="currentColor" strokeWidth="2" />
      <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="2" />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i * Math.PI) / 4;
        return (
          <line
            key={i}
            x1={24 + Math.cos(a) * 6}
            y1={24 + Math.sin(a) * 6}
            x2={24 + Math.cos(a) * 21}
            y2={24 + Math.sin(a) * 21}
            stroke="currentColor"
            strokeWidth="1.6"
          />
        );
      })}
    </svg>
  );
}

/** Endless knot — used as a section divider flourish. */
export function EndlessKnot(props: P) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden {...props}>
      <path
        d="M8 8h10v6H12v6h10V8h2v18H12v-6h6v-6H8V8Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Lotus(props: P) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden {...props}>
      <path d="M24 40c-9 0-16-5-16-11 3-1 6-1 9 0M24 40c9 0 16-5 16-11-3-1-6-1-9 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M24 40c-5 0-9-6-9-13 0-6 4-11 9-15 5 4 9 9 9 15 0 7-4 13-9 13Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M24 40c-3 0-5-6-5-12M24 40c3 0 5-6 5-12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function Script(props: P) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden {...props}>
      <rect x="9" y="7" width="30" height="34" rx="3" stroke="currentColor" strokeWidth="2" />
      <path d="M15 15h18M15 22h18M15 29h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Herb(props: P) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden {...props}>
      <path d="M24 42V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M24 24c-4 0-9-3-9-9 5 0 9 3 9 9ZM24 20c4 0 9-3 9-9-5 0-9 3-9 9ZM24 32c-4 0-8-2-8-7 5 0 8 2 8 7Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

export function Compass(props: P) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden {...props}>
      <circle cx="24" cy="24" r="17" stroke="currentColor" strokeWidth="2" />
      <path d="m30 18-4 8-8 4 4-8 8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

export const facultyIcons = { lotus: Lotus, script: Script, herb: Herb, compass: Compass };

/** Layered Himalayan ridgeline for the hero base. */
export function Mountains({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 1440 320" fill="none" preserveAspectRatio="none" aria-hidden>
      <path d="M0 220 L240 120 L420 200 L640 90 L820 190 L1040 100 L1240 200 L1440 130 V320 H0 Z" fill="currentColor" opacity="0.35" />
      <path d="M0 260 L200 180 L400 250 L620 160 L860 250 L1080 170 L1300 250 L1440 210 V320 H0 Z" fill="currentColor" opacity="0.6" />
      <path d="M0 300 L260 250 L520 290 L780 240 L1040 290 L1300 250 L1440 285 V320 H0 Z" fill="currentColor" />
    </svg>
  );
}

/* Utility glyphs */
export function IconPhone(props: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path d="M6.5 4h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16 16 0 0 1 4.5 6.2 2 2 0 0 1 6.5 4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
export function IconMail(props: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
export function IconPin(props: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
export function IconArrow(props: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
export function IconChevron(props: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
