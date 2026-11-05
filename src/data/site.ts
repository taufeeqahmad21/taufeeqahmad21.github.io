import type { FocusArea, NavItem, SectionCopy } from "@/types/content";

export const navItems: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export const sections = {
  about: {
    index: "01",
    eyebrow: "About",
    title: "Engineering with the",
    accent: "product in mind.",
  },
  skills: {
    index: "02",
    eyebrow: "Skills & Technologies",
    title: "The stack I build",
    accent: "with every day.",
    description:
      "Grouped by where they sit in a product, from the device in someone's hand to the services behind it.",
  },
  projects: {
    index: "03",
    eyebrow: "Featured Projects",
    title: "Selected work,",
    accent: "built end to end.",
    description:
      "Products I'm designing and engineering, covering the architecture, the interface and everything between.",
  },
  experience: {
    index: "04",
    eyebrow: "Experience",
    title: "Where I've been",
    accent: "building.",
  },
  github: {
    index: "05",
    eyebrow: "Open Source",
    title: "Code you can",
    accent: "read.",
    description: "Selected repositories from my GitHub profile.",
  },
  contact: {
    index: "06",
    eyebrow: "Contact",
    title: "Let's build something",
    accent: "worth using.",
    description:
      "I'm interested in Android and full-stack engineering work, product collaborations and conversations about building software well. The quickest way to reach me is email.",
  },
} satisfies Record<string, SectionCopy>;

export const about = {
  paragraphs: [
    "I'm a software engineer focused on Android. I like the whole arc of building a product: understanding the problem, shaping the architecture, and refining the interface until it feels obvious to the person using it.",
    "On Android I work in Kotlin and Jetpack Compose and structure apps around MVVM and Clean Architecture, so features stay testable and the codebase stays easy to change as it grows. On the web I build with Next.js, React and TypeScript, backed by Node.js services, REST APIs, Firebase and AWS.",
    "I pick the simplest approach that holds up over time. Performance, maintainability and a considered user experience are requirements, not extras.",
  ],
  focusAreas: [
    {
      icon: "smartphone",
      title: "Android development",
      description:
        "Native apps in Kotlin and Jetpack Compose with state that's predictable, UI that's responsive and code that's easy to test.",
    },
    {
      icon: "layers",
      title: "Scalable architecture",
      description:
        "Clear layers and module boundaries with MVVM and Clean Architecture, so a codebase can grow without slowing its team down.",
    },
    {
      icon: "globe",
      title: "Modern web platforms",
      description:
        "Fast, accessible web products with Next.js, React and TypeScript, connected to REST APIs and cloud services.",
    },
    {
      icon: "compass",
      title: "Product thinking",
      description:
        "Starting from the user and the problem, then choosing the technical approach that solves it cleanly.",
    },
  ] satisfies FocusArea[],
  principles: ["Performance", "Maintainability", "User experience"],
};
