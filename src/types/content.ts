import type { StaticImageData } from "next/image";

/**
 * A link that may not be known yet. `href: null` renders a clearly marked
 * "pending" state instead of a broken link — fill it in when it's verified.
 */
export type PendingLink = {
  label: string;
  href: string | null;
};

export type SocialKey = "github" | "linkedin" | "email";

export type Profile = {
  name: string;
  initials: string;
  title: string;
  secondaryExpertise: string;
  positioning: string;
  headline: string;
  /** A word from `headline` set in the italic serif accent face. */
  headlineAccent?: string;
  intro: string;
  availability: {
    label: string;
    /** true while the label is a stand-in that still needs confirming. */
    isPlaceholder: boolean;
  };
  email: string | null;
  resumeUrl: string | null;
  socials: Record<SocialKey, PendingLink>;
};

export type NavItem = {
  id: string;
  label: string;
};

export type SectionCopy = {
  index: string;
  eyebrow: string;
  title: string;
  /** Rendered in the italic serif accent face after the title. */
  accent?: string;
  description?: string;
};

export type FocusArea = {
  icon: "smartphone" | "layers" | "globe" | "compass";
  title: string;
  description: string;
};

export type SkillCategory = {
  id: string;
  icon: "smartphone" | "globe" | "server" | "wrench";
  title: string;
  description: string;
  skills: string[];
};

export type ProjectScreenshot = { src: StaticImageData; alt: string };

export type ProjectPreview =
  /** A real website screenshot, shown in a browser frame. Import it statically so basePath is handled for you. */
  | { kind: "image"; src: StaticImageData; alt: string; caption: string }
  /** Real app screenshots (e.g. from the store listing), shown side by side. */
  | { kind: "screenshots"; images: ProjectScreenshot[]; caption: string }
  /** A built-in, code-drawn illustration used until real screenshots exist. */
  | { kind: "mockup"; variant: "web-tools" | "android-invoice" | "android-generic" };

/**
 * - `published`: released on a store (Android → "Google Play" button).
 * - `live`: publicly available website ("Visit Website" button).
 * - `in-development`: not public yet ("In Development" state, no links).
 */
export type ProjectStatus = "published" | "live" | "in-development";

export type Project = {
  slug: string;
  name: string;
  category: string;
  platform: "web" | "android";
  status: ProjectStatus;
  description: string;
  technologies: string[];
  /** Real app or site icon, if available. */
  icon?: StaticImageData;
  links: {
    /** Store listing or website URL. Only set when verified and public. */
    live: string | null;
    source: string | null;
  };
  preview: ProjectPreview;
  featured: boolean;
};

export type ExperienceEntry = {
  id: string;
  role: string;
  organization: string;
  period: string;
  summary: string;
  highlights: string[];
  technologies: string[];
  /** Placeholder entries render with a dashed "to be added" treatment. */
  isPlaceholder: boolean;
};

export type Repository = {
  name: string;
  description: string;
  /** Only set once verified on GitHub. */
  language: string | null;
  href: string | null;
};
