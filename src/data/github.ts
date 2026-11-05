import type { Repository } from "@/types/content";
import { profile } from "./profile";

/**
 * Selected repositories. Only list repositories that exist and are public.
 * - `name`: shown as the project name until the real public repository name is known.
 * - `href`: the repository URL (null until public).
 * - `language`: the primary language shown on GitHub — leave null until verified.
 * No stars, forks or contribution numbers are shown on purpose.
 */
export const repositories: Repository[] = [
  {
    name: "Kalyvor",
    description:
      "Tools-first productivity platform bringing digital utilities and AI-powered workflows into one place.",
    language: null,
    href: null,
  },
  {
    name: "InvoiceFlow",
    description:
      "Android app for creating and managing invoices, estimates and receipts for freelancers and small businesses.",
    language: null,
    href: null,
  },
];

export const githubProfile = profile.socials.github;

/** "github.com/username" style label derived from the profile URL, if set. */
export const githubHandle = githubProfile.href
  ? githubProfile.href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")
  : null;
