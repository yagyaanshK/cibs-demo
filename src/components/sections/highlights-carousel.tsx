"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Highlight } from "@/lib/content";
import { IconArrow } from "@/components/icons";

/**
 * Homepage highlights carousel — functions, ceremonies and dignitary events.
 * Auto-advances, pauses on hover/focus, and respects prefers-reduced-motion.
 */
export function HighlightsCarousel({ items }: { items: Highlight[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = items.length;

  const go = useCallback((n: number) => setIndex((n + count) % count), [count]);
  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  // Auto-advance
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    if (paused || count <= 1) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    timer.current = setInterval(() => setIndex((i) => (i + 1) % count), 5000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused, count]);

  if (count === 0) return null;

  return (
    <section id="highlights" className="scroll-mt-24 py-16 sm:py-20">
      <div className="shell">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-gold-600">Milestones & Events</p>
          <h2 className="mt-2 text-3xl font-semibold text-maroon sm:text-4xl">Life at the Institute</h2>
          <div className="mx-auto mt-4 gold-rule" />
        </div>

        <div
          className="group relative mt-10 overflow-hidden rounded-3xl border border-maroon-100 bg-maroon-900 shadow-[var(--shadow-lift)]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          role="region"
          aria-roledescription="carousel"
          aria-label="Institute highlights"
        >
          <div className="relative aspect-[16/10] w-full sm:aspect-[16/8]">
            {items.map((h, i) => (
              <div
                key={h.src}
                className={`absolute inset-0 transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0"}`}
                aria-hidden={i !== index}
              >
                <Image
                  src={h.src}
                  alt={h.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1100px"
                  className="object-cover"
                  priority={i === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon-900 via-maroon-900/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-gold-soft">{h.title}</p>
                  <p className="mt-1 max-w-2xl font-display text-lg text-cream sm:text-xl">{h.caption}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-cream/90 text-maroon opacity-0 shadow-md transition-opacity hover:bg-cream focus-visible:opacity-100 group-hover:opacity-100"
          >
            <IconArrow className="h-5 w-5 rotate-180" />
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-cream/90 text-maroon opacity-0 shadow-md transition-opacity hover:bg-cream focus-visible:opacity-100 group-hover:opacity-100"
          >
            <IconArrow className="h-5 w-5" />
          </button>

          {/* Dots */}
          <div className="absolute inset-x-0 top-4 flex justify-center gap-2">
            {items.map((h, i) => (
              <button
                key={h.src}
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-gold" : "w-1.5 bg-cream/50 hover:bg-cream/80"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
