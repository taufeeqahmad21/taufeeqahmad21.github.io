import type { ExperienceEntry } from "@/types/content";

/**
 * Experience timeline, newest first.
 * Entries with `isPlaceholder: true` are templates. Replace their text with your real
 * role, organisation and dates, then set `isPlaceholder: false` (or delete them).
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
  {
    id: "placeholder-role-1",
    role: "Role title",
    organization: "Company name",
    period: "Start — End",
    summary:
      "Add a professional role here: what you were responsible for, what you built and the outcome you can verify.",
    highlights: ["Key responsibility or result.", "Another responsibility or result."],
    technologies: ["Technology"],
    isPlaceholder: true,
  },
];
