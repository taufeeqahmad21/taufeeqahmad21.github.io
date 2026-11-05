import { employment } from "@/data/experience";
import { profile } from "@/data/profile";
import { siteUrl } from "@/lib/site";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Technology } from "@/components/sections/Technology";
import { Work } from "@/components/sections/Work";

const currentRole = employment.find((entry) => entry.endDate === null);
const companyWebsite = currentRole?.links.find((link) => link.kind === "website")?.href;

/** schema.org Person — only verified facts: profile links and the confirmed current employer. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  description: profile.positioning,
  url: `${siteUrl}/`,
  knowsAbout: ["Android", "Kotlin", "Jetpack Compose", "Next.js", "React", "TypeScript"],
  sameAs: [profile.socials.github.href, profile.socials.linkedin.href].filter(Boolean),
  ...(currentRole && {
    worksFor: {
      "@type": "Organization",
      name: currentRole.company,
      ...(companyWebsite && { url: companyWebsite }),
    },
  }),
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
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
