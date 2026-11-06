"use client";

import { useEffect } from "react";

/**
 * Feeds the pointer position to any element with the `spotlight` utility (see globals.css)
 * as --spot-x / --spot-y, so cards light up softly under the cursor. One passive listener
 * for the whole page; does nothing on touch-only devices.
 */
export function Spotlight() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let frame = 0;
    function onMove(event: PointerEvent) {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const target = (event.target as Element | null)?.closest<HTMLElement>("[data-spotlight]");
        if (!target) return;
        const rect = target.getBoundingClientRect();
        target.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
        target.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
      });
    }

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
    };
  }, []);

  return null;
}
