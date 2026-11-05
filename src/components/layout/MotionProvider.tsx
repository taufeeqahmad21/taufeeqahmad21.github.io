"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";

/** Disables transform/layout animation for users who prefer reduced motion. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
