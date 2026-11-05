"use client";

import { motion } from "motion/react";
import { duration, ease } from "@/lib/motion";

type Part = { text: string; accent: boolean };

/**
 * Split `text` into words (on whitespace); each word is a list of parts so a word can mix
 * accent and plain text — e.g. "impact." keeps its full stop in the same animated unit.
 */
function toWords(text: string, accents: string[]): Part[][] {
  const isAccent = new Array<boolean>(text.length).fill(false);
  for (const accent of accents) {
    let from = 0;
    for (let at = text.indexOf(accent, from); at !== -1; at = text.indexOf(accent, from)) {
      isAccent.fill(true, at, at + accent.length);
      from = at + accent.length;
    }
  }

  const words: Part[][] = [];
  for (const match of text.matchAll(/\S+/g)) {
    const start = match.index ?? 0;
    const parts: Part[] = [];
    for (let i = 0; i < match[0].length; i++) {
      const accent = isAccent[start + i];
      const last = parts.at(-1);
      if (last && last.accent === accent) last.text += match[0][i];
      else parts.push({ text: match[0][i], accent });
    }
    words.push(parts);
  }
  return words;
}

/**
 * Headline whose words rise into place one after another. Accent words use the serif
 * italic face. The full sentence is in the HTML for SEO and screen readers; with reduced
 * motion the words simply appear.
 */
export function AnimatedHeadline({ text, accents }: { text: string; accents: string[] }) {
  const words = toWords(text, accents);
  return (
    <>
      {words.map((parts, i) => (
        <span key={i}>
          <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <motion.span
              className="inline-block"
              initial={{ y: "105%" }}
              animate={{ y: "0%" }}
              transition={{ duration: duration.reveal + 0.2, ease: ease.outExpo, delay: 0.15 + i * 0.06 }}
            >
              {parts.map((part, j) =>
                part.accent ? (
                  <span key={j} className="text-accent-serif text-gradient pr-[0.04em]">
                    {part.text}
                  </span>
                ) : (
                  <span key={j}>{part.text}</span>
                ),
              )}
            </motion.span>
          </span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </>
  );
}
