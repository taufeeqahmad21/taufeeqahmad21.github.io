"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};
const BUILD_YEAR = new Date().getFullYear();

/**
 * The year is baked into the static HTML at build time, then corrected in the browser
 * so the copyright stays current even if the site isn't rebuilt every January.
 */
export function CurrentYear() {
  const year = useSyncExternalStore(
    noopSubscribe,
    () => new Date().getFullYear(),
    () => BUILD_YEAR,
  );
  return <>{year}</>;
}
