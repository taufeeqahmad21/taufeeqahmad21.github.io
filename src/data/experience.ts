import type { ExperienceEntry } from "@/types/content";

/**
 * Experience timeline, newest first. Only add roles you can verify.
 * `isPlaceholder: true` renders an entry as a dashed "To be added" template.
 */
export const experience: ExperienceEntry[] = [
  {
    id: "independent-products",
    role: "Independent product development",
    organization: "Kalyvor · InvoiceFlow",
    period: "Ongoing",
    summary:
      "Designing and building my own products end to end: Kalyvor, a tools-first productivity platform for the web, and InvoiceFlow, an Android app for invoices, estimates and receipts.",
    highlights: [
      "Own product direction, architecture, interface design and implementation.",
      "Build for both platforms: Kotlin and Jetpack Compose on Android, Next.js and TypeScript on the web.",
    ],
    technologies: ["Kotlin", "Jetpack Compose", "Next.js", "TypeScript", "Tailwind CSS"],
    isPlaceholder: false,
  },
];
