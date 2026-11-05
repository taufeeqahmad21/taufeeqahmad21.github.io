import type { Project } from "@/types/content";
import kalyvorHome from "@/assets/projects/kalyvor-home.webp";
import kalyvorIcon from "@/assets/projects/kalyvor-icon.png";
import waToolboxDirectChat from "@/assets/projects/wa-toolbox-direct-chat.webp";
import waToolboxIcon from "@/assets/projects/wa-toolbox-icon.png";
import waToolboxOverview from "@/assets/projects/wa-toolbox-overview.webp";
import waToolboxStatusSaver from "@/assets/projects/wa-toolbox-status-saver.webp";

/**
 * Projects shown on the site, in display order.
 *
 * - `featured: true` → large showcase row. `featured: false` → compact card in the grid below.
 * - `status` drives the badge and the main button: "published" (Android → "Google Play"),
 *   "live" (web → "Visit Website") or "in-development" (no links, "In Development").
 * - `links.live` / `links.source`: only set verified, public URLs. "Source Code" appears only
 *   when `source` is set.
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
    technologies: ["Kotlin", "Android SDK", "AdMob"],
    icon: waToolboxIcon,
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
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    icon: kalyvorIcon,
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
    links: { live: null, source: null },
    preview: { kind: "mockup", variant: "android-invoice" },
    featured: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const additionalProjects = projects.filter((p) => !p.featured);
