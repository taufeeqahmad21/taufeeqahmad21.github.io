/** Motion tokens for Framer Motion (mirrors the CSS --ease / --duration tokens). */
export const ease = {
  outExpo: [0.16, 1, 0.3, 1] as const,
};

export const duration = {
  fast: 0.15,
  base: 0.25,
  slow: 0.6,
  reveal: 0.8,
};

/** Delay between siblings in staggered entrances (seconds). */
export const stagger = {
  tight: 0.04,
  base: 0.08,
};
