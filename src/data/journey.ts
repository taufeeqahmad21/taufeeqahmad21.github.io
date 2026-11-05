import type { JourneyEntry } from "@/types/content";

/**
 * Independent product journey, in the same order as the Work section.
 * This is my own product work, kept separate from employment (src/data/experience.ts):
 * no dates, team sizes or metrics.
 * Status, platform, icon and links are read from the project in src/data/projects.ts.
 */
export const journeyIntro = {
  period: "Ongoing",
  summary:
    "Designing and building my own products end to end, for Android and for the web.",
  highlights: [
    "Own product direction, architecture, interface design and implementation.",
    "Build for both platforms: Kotlin and Jetpack Compose on Android, Next.js and TypeScript on the web.",
  ],
};

export const journey: JourneyEntry[] = [
  {
    projectSlug: "wa-toolbox",
    role: "Design, development and Google Play release",
    summary:
      "Built a native Android utility app that brings several messaging tools together, and published it on Google Play.",
  },
  {
    projectSlug: "kalyvor",
    role: "Product, design and web development",
    summary:
      "Built a tools-first web platform with Next.js and TypeScript, where every tool shares the same design language and needs no account.",
  },
  {
    projectSlug: "invoiceflow",
    role: "Product design and Android development",
    summary:
      "Building an invoice, estimate and receipt app for freelancers and small businesses with Kotlin and Jetpack Compose.",
  },
];
