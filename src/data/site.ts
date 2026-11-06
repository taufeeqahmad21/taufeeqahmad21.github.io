import type { NavItem, SectionCopy } from "@/types/content";

/** Primary navigation, in page order. */
export const navItems: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Products" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

/** Android career start (BrindaSoft, March 2018), from the resume. Used for the years stat. */
const careerStart = new Date(2018, 2, 1);
const yearsOfAndroid = Math.floor((Date.now() - careerStart.getTime()) / (365.25 * 24 * 60 * 60 * 1000));

/** Hero proof points. Only facts confirmed on the resume; recomputed at build time. */
export const heroStats: { value: number; suffix?: string; label: string }[] = [
  { value: yearsOfAndroid, suffix: "+", label: "Years building Android apps" },
  { value: 2, label: "Ride-hailing & taxi platforms" },
  { value: 3, label: "Products of my own, 2 live" },
];

export const sections = {
  experience: {
    index: "01",
    eyebrow: "Experience",
    title: `${yearsOfAndroid}+ years on apps people`,
    accent: "ride with every day.",
    description:
      "Real-time, location-based Android for ride-hailing and taxi platforms: tracking, booking, dispatch and in-trip messaging.",
  },
  work: {
    index: "02",
    eyebrow: "Products",
    title: "Products I design,",
    accent: "build and ship.",
    description:
      "Outside my day job I build my own products end to end. Two are live, an Android app on Google Play and a web platform I co-founded, and a third is in development.",
  },
  about: {
    index: "03",
    eyebrow: "About",
    title: "Engineering with the",
    accent: "product in mind.",
  },
  contact: {
    index: "04",
    eyebrow: "Contact",
    title: "Have an idea? Let's build something",
    accent: "meaningful.",
    description:
      "I'm open to senior Android and software engineering roles (remote) and product collaborations. Email is the quickest way to reach me.",
  },
} satisfies Record<string, SectionCopy>;

export const about = {
  /** Large editorial statement at the top of the About section. */
  statement: {
    lead: "I've spent my career on apps that have to work in real time,",
    accent: "with a driver waiting and a passenger watching the map.",
  },
  paragraphs: [
    "Since 2018 I've built Android for ride-hailing and taxi platforms, first at BrindaSoft and now at My Taxi Ride. That means live location, flaky networks, background work that has to survive the OS, and flows that can't afford to crash mid-trip. I've also built a push-to-talk voice app over MQTT and SignalR with long-running background services, and identity verification with AWS Face Liveness.",
    "I work in Kotlin and Jetpack Compose and structure apps around MVVM and Clean Architecture, so features stay testable and the codebase stays easy to change. On the web I build with Next.js, React and TypeScript.",
    "Outside work I ship my own products end to end: WA Toolbox on Google Play, Kalyvor, which I co-founded, and InvoiceFlow, now in development.",
  ],
};
