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
  /** Words from `headline` set in the italic serif accent face. */
  headlineAccents: string[];
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
  title: string;
  description: string;
};

export type SkillCategory = {
  id: string;
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
  /** One-paragraph product summary. */
  description: string;
  /** Short facts shown beside the description, e.g. "Positioning", "Built with". Verified only. */
  details?: { label: string; text: string }[];
  /** Feature names exactly as the product presents them. */
  features?: string[];
  technologies: string[];
  /** Real app or site icon, if available. */
  icon?: StaticImageData;
  /** Background atmosphere of the showcase. */
  tint: "emerald" | "blue" | "violet";
  links: {
    /** Store listing or website URL. Only set when verified and public. */
    live: string | null;
    source: string | null;
  };
  preview: ProjectPreview;
  featured: boolean;
};

/** One step in the independent product journey (not employment). */
export type JourneyEntry = {
  /** Project this step refers to; status, platform and links come from it. */
  projectSlug: string;
  /** What the work involved. Factual, no invented metrics. */
  role: string;
  summary: string;
};

/** A professional employment entry. Only verified facts: no metrics, team sizes or clients. */
export type EmploymentEntry = {
  id: string;
  company: string;
  role: string;
  /** Displayed start, e.g. "February 2021". */
  startLabel: string;
  /** ISO start date (YYYY-MM), used for <time> and structured data. */
  startDate: string;
  /** Displayed end, e.g. "March 2024"; null while current (shown as "Present"). */
  endLabel: string | null;
  /** ISO end date (YYYY-MM), or null while current. */
  endDate: string | null;
  employmentType: string;
  summary: string;
  responsibilities: string[];
  technologies: string[];
  links: { label: string; href: string; kind: "website" | "google-play" }[];
};
