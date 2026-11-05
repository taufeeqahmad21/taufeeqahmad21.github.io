import type { Project } from "@/types/content";
import kalyvorHome from "@/assets/projects/kalyvor-home.webp";
import kalyvorIcon from "@/assets/projects/kalyvor-icon.png";
import waToolboxDirectChat from "@/assets/projects/wa-toolbox-direct-chat.webp";
import waToolboxIcon from "@/assets/projects/wa-toolbox-icon.png";
import waToolboxOverview from "@/assets/projects/wa-toolbox-overview.webp";
import waToolboxSavedMessages from "@/assets/projects/wa-toolbox-saved-messages.webp";
import waToolboxStatusSaver from "@/assets/projects/wa-toolbox-status-saver.webp";
import waToolboxTools from "@/assets/projects/wa-toolbox-tools.webp";

/**
 * Projects shown on the site, in display order.
 *
 * - `featured: true` → large showcase. `featured: false` → the "in development" panel below.
 * - `status` drives the badge and the main button: "published" (Android → "Google Play"),
 *   "live" (web → "Visit Website") or "in-development" (no links, "In Development").
 * - `links.live` / `links.source`: only set verified, public URLs. "Source Code" appears only
 *   when `source` is set.
 * - `details` and `features`: only facts the product itself states (store listing, website).
 * - `preview`: real screenshots (`image` for a website, `screenshots` for an app) or, until
 *   they exist, a code-drawn `mockup` that is labelled as such on the page.
 *
 * Screenshots and icons live in src/assets/projects/ and are imported statically.
 */
export const projects: Project[] = [
  {
    slug: "wa-toolbox",
    name: "WA Toolbox",
    category: "Android Application",
    platform: "android",
    status: "published",
    description:
      "An all-in-one Android utility app for messaging, bringing together direct chat without saving numbers, a status saver, QR code tools, a text repeater, fancy text and saved messages.",
    details: [
      { label: "Platform", text: "Native Android app, published on Google Play." },
      { label: "Product", text: "Multiple messaging utilities in one fast, lightweight app." },
    ],
    features: ["Direct Chat", "Status Saver", "QR Tools", "Text Repeater", "Fancy Text", "Saved Messages", "Cleaner"],
    technologies: ["Kotlin", "Android SDK", "AdMob"],
    icon: waToolboxIcon,
    tint: "emerald",
    links: {
      live: "https://play.google.com/store/apps/details?id=com.watoolbox.app",
      source: null,
    },
    preview: {
      kind: "screenshots",
      caption: "Screenshots · Google Play",
      images: [
        { src: waToolboxOverview, alt: "WA Toolbox Google Play screenshot showing the app's home screen of tools" },
        { src: waToolboxDirectChat, alt: "WA Toolbox Google Play screenshot of the Direct Chat screen" },
        { src: waToolboxStatusSaver, alt: "WA Toolbox Google Play screenshot of the Status Saver screen" },
        { src: waToolboxTools, alt: "WA Toolbox Google Play screenshot of the Tools screen" },
        { src: waToolboxSavedMessages, alt: "WA Toolbox Google Play screenshot of the Saved Messages screen" },
      ],
    },
    featured: true,
  },
  {
    slug: "kalyvor",
    name: "Kalyvor",
    category: "Productivity Web Platform",
    platform: "web",
    status: "live",
    description:
      "A tools-first productivity platform that brings online tools for PDFs, images, documents, developers and everyday calculations into one searchable place, usable without an account.",
    details: [
      {
        label: "Positioning",
        text: "One place for everyday online tools. Search for a tool, or describe the task and Kalyvor points to the right one.",
      },
      { label: "Experience", text: "No account and no setup. Every tool shares the same design language." },
      { label: "Built with", text: "Next.js, TypeScript and Tailwind CSS." },
    ],
    features: ["PDF", "Image", "Document", "Developer", "Calculators", "Utilities"],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    icon: kalyvorIcon,
    tint: "blue",
    links: { live: "https://kalyvor.com/", source: null },
    preview: {
      kind: "image",
      src: kalyvorHome,
      alt: "Kalyvor homepage with tool search, quick actions and featured tool categories",
      caption: "Screenshot · kalyvor.com",
    },
    featured: true,
  },
  {
    slug: "invoiceflow",
    name: "InvoiceFlow",
    category: "Android Application",
    platform: "android",
    status: "in-development",
    description:
      "An invoice, estimate and receipt management application designed for freelancers and small businesses.",
    technologies: ["Kotlin", "Jetpack Compose", "Android"],
    tint: "violet",
    links: { live: null, source: null },
    preview: { kind: "mockup", variant: "android-invoice" },
    featured: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const additionalProjects = projects.filter((p) => !p.featured);

export function getProject(slug: string): Project {
  const project = projects.find((p) => p.slug === slug);
  if (!project) throw new Error(`Unknown project: ${slug}`);
  return project;
}
