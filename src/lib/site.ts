import { profile } from "@/data/profile";

/**
 * Absolute public URL of the site, including any GitHub Pages sub-path, without a
 * trailing slash. Set by the deploy workflow; falls back to localhost for development.
 */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

export const siteMeta = {
  title: `${profile.name} | ${profile.title}`,
  shortTitle: profile.name,
  description: `Portfolio of ${profile.name}, an Android developer and software engineer building apps with Kotlin and Jetpack Compose and web platforms with Next.js and TypeScript.`,
  keywords: [
    "Taufeeq Ahmad",
    "Android Developer",
    "Software Engineer",
    "Kotlin",
    "Jetpack Compose",
    "Next.js",
    "TypeScript",
    "Full-Stack Developer",
  ],
};

export const ogImage = {
  /** Relative to metadataBase so it picks up the GitHub Pages sub-path. */
  url: "og-image.png",
  width: 1200,
  height: 630,
  alt: `${profile.name} | ${profile.title}`,
};
