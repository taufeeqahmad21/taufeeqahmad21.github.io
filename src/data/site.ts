import type { FocusArea, NavItem, SectionCopy } from "@/types/content";

/** Primary navigation, in page order. "Technology" sits between Work and Experience without a nav entry. */
export const navItems: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export const sections = {
  work: {
    index: "01",
    eyebrow: "Selected Work",
    title: "Products I design,",
    accent: "build and ship.",
    description:
      "Two products are out in the world: an Android app on Google Play and a web platform. A third is in development.",
  },
  about: {
    index: "02",
    eyebrow: "About",
    title: "Engineering with the",
    accent: "product in mind.",
  },
  technology: {
    index: "03",
    eyebrow: "Technology",
    title: "The stack behind",
    accent: "the products.",
    description: "Grouped by where each tool sits in a product, from the device in someone's hand to the services behind it.",
  },
  experience: {
    index: "04",
    eyebrow: "Experience",
    title: "Where I've been",
    accent: "building.",
    description:
      "Professional Android development at My Taxi Ride since 2021, alongside the products I design and ship independently.",
  },
  contact: {
    index: "05",
    eyebrow: "Contact",
    title: "Have an idea? Let's build something",
    accent: "meaningful.",
    description:
      "I'm open to Android and software engineering opportunities, product collaborations and conversations about building software well. Email is the quickest way to reach me.",
  },
} satisfies Record<string, SectionCopy>;

export const about = {
  /** Large editorial statement at the top of the About section. */
  statement: {
    lead: "I design, build and release my own products,",
    accent: "from a blank file to something people can use.",
  },
  paragraphs: [
    "WA Toolbox is live on Google Play, Kalyvor is live on the web, and InvoiceFlow is in development. Each one has meant owning every layer: the product decisions, the architecture, the interface and the code.",
    "On Android I work in Kotlin and Jetpack Compose and structure apps around MVVM and Clean Architecture, so features stay testable and the codebase stays easy to change. On the web I build with Next.js, React and TypeScript, backed by REST APIs, Firebase and AWS.",
    "I pick the simplest approach that will hold up, and I care about the parts users never see: clear boundaries, readable code and performance that doesn't need apologising for.",
  ],
  focusAreas: [
    {
      title: "Android applications",
      description: "Native apps in Kotlin and Jetpack Compose, built for real devices and real store releases.",
    },
    {
      title: "Scalable web platforms",
      description: "Fast, accessible products with Next.js, React and TypeScript, connected to APIs and cloud services.",
    },
    {
      title: "Product architecture",
      description: "Clear layers and module boundaries with MVVM and Clean Architecture, so a product can keep growing.",
    },
    {
      title: "Clean, maintainable code",
      description: "Code that's easy to read, test and change, because every product outlives its first version.",
    },
    {
      title: "Real-world problem solving",
      description: "Starting from what someone is trying to get done, then choosing the technical approach that solves it cleanly.",
    },
  ] satisfies FocusArea[],
};
