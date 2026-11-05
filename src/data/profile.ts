import type { Profile } from "@/types/content";

const email: string | null = "taufeeqahmad2998@gmail.com";

/**
 * Personal details. Anything set to `null` (or flagged `isPlaceholder`) is not
 * verified yet and renders as a visible "pending" state on the site.
 * See README → "Content checklist".
 */
export const profile: Profile = {
  name: "Taufeeq Ahmad",
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
    label: "Open to Android and software engineering opportunities",
    isPlaceholder: false,
  },
  email,
  // PLACEHOLDER — put the PDF in /public (e.g. /public/resume.pdf) and set "/resume.pdf".
  resumeUrl: null,
  socials: {
    github: { label: "GitHub", href: "https://github.com/taufeeqahmad21" },
    linkedin: { label: "LinkedIn", href: "https://www.linkedin.com/in/taufeeqahmaddev" },
    email: { label: "Email", href: email ? `mailto:${email}` : null },
  },
};
