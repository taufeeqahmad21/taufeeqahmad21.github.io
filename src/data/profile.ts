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
  title: "Senior Android Developer",
  secondaryExpertise: "Full-Stack Web Development",
  positioning:
    "Senior Android Developer with 8+ years building real-time, location-based apps for ride-hailing and taxi platforms.",
  headline: "I build real-time Android apps that keep cities moving.",
  headlineAccents: ["real-time", "moving"],
  intro:
    "I'm Taufeeq Ahmad, a Senior Android Developer with 8+ years on ride-hailing and taxi platforms: live driver tracking, booking, dispatch and in-trip messaging. I also design and ship my own products for Android and the web.",
  availability: {
    label: "Open to senior Android roles · Remote",
    isPlaceholder: false,
  },
  email,
  // Generated from resume/resume.html with `pnpm resume`.
  resumeUrl: "/Taufeeq-Ahmad-Resume.pdf",
  socials: {
    github: { label: "GitHub", href: "https://github.com/taufeeqahmad21" },
    linkedin: { label: "LinkedIn", href: "https://www.linkedin.com/in/taufeeqahmad21" },
    email: { label: "Email", href: email ? `mailto:${email}` : null },
  },
};
