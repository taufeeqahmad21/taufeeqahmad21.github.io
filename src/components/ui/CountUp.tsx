"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { ease } from "@/lib/motion";

type CountUpProps = {
  value: number;
  /** Text after the number, e.g. "+". */
  suffix?: string;
  /** Seconds after mount to start; ignored once that time has passed. */
  delay?: number;
  className?: string;
};

/**
 * A number that counts up from zero the first time it scrolls into view. The final value is
 * in the server HTML (for SEO, no-JS and screen readers); reduced-motion users just see it.
 */
export function CountUp({ value, suffix = "", delay = 0, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const mountedAt = useRef(0);

  useEffect(() => {
    mountedAt.current = performance.now();
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView || reduce) return;
    // The delay choreographs the first paint; a number scrolled into view later starts at once.
    const elapsed = (performance.now() - mountedAt.current) / 1000;
    const controls = animate(0, value, {
      duration: 1.6,
      delay: Math.max(0, delay - elapsed),
      ease: ease.outExpo,
      onUpdate: (latest) => {
        node.textContent = `${Math.round(latest)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduce, value, suffix, delay]);

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}
