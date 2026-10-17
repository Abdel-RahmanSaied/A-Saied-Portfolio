"use client";

import { useEffect, useRef, useState } from "react";

type Props = { value: number; prefix?: string; suffix?: string; decimals?: number };

function format(n: number, decimals: number) {
  return n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

/**
 * Counts up to `value` when scrolled into view.
 *
 * The server render and the first client render both show the final value,
 * so crawlers and no-JS visitors read the real number. The count-up only
 * starts after mount, for elements that are still below the fold and only
 * when the visitor hasn't asked for reduced motion.
 */
export default function AnimatedNumber({ value, prefix = "", suffix = "", decimals = 0 }: Props) {
  const [shown, setShown] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return; // already visible: keep final value

    setShown(0);
    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const duration = 1400;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setShown(Number((eased * value).toFixed(decimals)));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, decimals]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {format(shown, decimals)}
      {suffix}
    </span>
  );
}
