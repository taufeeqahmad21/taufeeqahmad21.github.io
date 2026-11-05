import { profile } from "@/data/profile";
import { siteUrl } from "@/lib/site";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Journey } from "@/components/sections/Journey";
import { Technology } from "@/components/sections/Technology";
import { Work } from "@/components/sections/Work";

/** schema.org Person — only includes links that have been verified. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  description: profile.positioning,
  url: `${siteUrl}/`,
  knowsAbout: ["Android", "Kotlin", "Jetpack Compose", "Next.js", "React", "TypeScript"],
  sameAs: [profile.socials.github.href, profile.socials.linkedin.href].filter(Boolean),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Work />
        <About />
        <Technology />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
