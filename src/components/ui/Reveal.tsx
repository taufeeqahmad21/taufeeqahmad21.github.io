"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { duration, ease } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds to wait before animating — use small steps (0.05–0.1) to stagger siblings. */
  delay?: number;
  as?: "div" | "li" | "article";
  /** Animate immediately on mount instead of when scrolled into view (for above-the-fold content). */
  onMount?: boolean;
};

/**
 * Fades and lifts content in once. Reduced-motion users get the content without movement
 * (handled globally by <MotionConfig reducedMotion="user">).
 */
export function Reveal({ children, className, delay = 0, as = "div", onMount = false }: RevealProps) {
  const Component = motion[as];
  const visible = { opacity: 1, y: 0 };
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 16 }}
      {...(onMount
        ? { animate: visible }
        : { whileInView: visible, viewport: { once: true, margin: "0px 0px -10% 0px" } })}
      transition={{ duration: duration.reveal, ease: ease.outExpo, delay }}
    >
      {children}
    </Component>
  );
}
