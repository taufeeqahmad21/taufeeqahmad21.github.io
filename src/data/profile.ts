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
  positioning: "Independent product builder who designs, develops and launches real digital products.",
  headline: "I build digital products that make an impact.",
  headlineAccents: ["digital products", "impact"],
  intro:
    "I'm Taufeeq Ahmad, an Android Developer and Software Engineer focused on building useful applications, scalable platforms and thoughtful digital experiences.",
  availability: {
    label: "Open to Android and software engineering opportunities",
    isPlaceholder: false,
  },
  email,
  // Generated from resume/resume.html with `pnpm resume`.
  resumeUrl: "/resume.pdf",
  socials: {
    github: { label: "GitHub", href: "https://github.com/taufeeqahmad21" },
    linkedin: { label: "LinkedIn", href: "https://www.linkedin.com/in/taufeeqahmaddev" },
    email: { label: "Email", href: email ? `mailto:${email}` : null },
  },
};
