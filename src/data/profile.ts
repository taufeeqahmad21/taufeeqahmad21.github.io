import type { Profile } from "@/types/content";

// PLACEHOLDER — your public contact email, e.g. "hello@yourdomain.com"
const email: string | null = null;

/**
 * Personal details. Anything set to `null` (or flagged `isPlaceholder`) is not
 * verified yet and renders as a visible "pending" state on the site.
 * See README → "Content checklist".
 */
export const profile: Profile = {
  name: "Tauseef Ahmad",
  initials: "TA",
  title: "Android Developer & Software Engineer",
  secondaryExpertise: "Full-Stack Web Development",
  positioning:
    "Product-minded software engineer who builds scalable Android applications and modern web platforms.",
  headline: "Building thoughtful digital experiences through code.",
  headlineAccent: "thoughtful",
  intro:
    "I'm an Android developer and software engineer. I build native apps with Kotlin and Jetpack Compose and web platforms with Next.js and TypeScript, with a focus on clean architecture, performance and the details people notice when they use the product.",
  availability: {
    // PLACEHOLDER — replace with your real status and set isPlaceholder: false.
    label: "Availability status — to be confirmed",
    isPlaceholder: true,
  },
  email,
  // PLACEHOLDER — put the PDF in /public (e.g. /public/resume.pdf) and set "/resume.pdf".
  resumeUrl: null,
  socials: {
    // PLACEHOLDER — e.g. "https://github.com/<username>"
    github: { label: "GitHub", href: null },
    // PLACEHOLDER — e.g. "https://www.linkedin.com/in/<handle>"
    linkedin: { label: "LinkedIn", href: null },
    email: { label: "Email", href: email ? `mailto:${email}` : null },
  },
};
