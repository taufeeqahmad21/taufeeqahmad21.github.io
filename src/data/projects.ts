import type { Project } from "@/types/content";

/**
 * Projects shown on the site.
 *
 * - `featured: true` → large showcase row. `featured: false` → compact card in the grid below.
 * - `links.live` / `links.source`: leave `null` until a URL is public. The card then shows
 *   "Not yet public" instead of a dead link.
 * - `preview`: use `{ kind: "image", src: importedScreenshot, alt: "…" }` once you have a
 *   screenshot (put it in src/assets/projects/ and import it). Until then a code-drawn
 *   illustration is used.
 *
 * To add another Android project, copy an entry, give it a unique `slug`, and set
 * `preview: { kind: "mockup", variant: "android-generic" }` if there's no screenshot yet.
 */
export const projects: Project[] = [
  {
    slug: "kalyvor",
    name: "Kalyvor",
    category: "Productivity Platform",
    platform: "web",
    description:
      "A tools-first productivity platform designed to bring useful digital utilities and AI-powered workflows into one place.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    links: { live: null, source: null },
    preview: { kind: "mockup", variant: "web-tools" },
    featured: true,
  },
  {
    slug: "invoiceflow",
    name: "InvoiceFlow",
    category: "Android Application",
    platform: "android",
    description:
      "An invoice, estimate and receipt management application designed for freelancers and small businesses.",
    technologies: ["Kotlin", "Jetpack Compose", "Android"],
    links: { live: null, source: null },
    preview: { kind: "mockup", variant: "android-invoice" },
    featured: true,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const additionalProjects = projects.filter((p) => !p.featured);
