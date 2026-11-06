import { about, sections } from "@/data/site";
import { skillCategories } from "@/data/skills";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** About: an editorial statement, the story in three paragraphs, and the stack beside it. */
export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section-y relative isolate border-t border-line">
      <div
        aria-hidden="true"
        className="absolute right-0 top-1/3 -z-10 h-[30rem] w-[40rem] rounded-full bg-[radial-gradient(closest-side,rgb(162_142_255/0.07),transparent)]"
      />
      <div className="container-page">
        <SectionHeading id="about-title" copy={sections.about} />

        <Reveal delay={0.05} className="mt-12 md:mt-16">
          <p className="max-w-5xl text-balance text-statement font-medium text-fg">
            {about.statement.lead}{" "}
            <span className="text-accent-serif text-fg-muted">{about.statement.accent}</span>
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-14 md:mt-16 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col gap-6 lg:col-span-6">
            {about.paragraphs.map((paragraph, i) => (
              <Reveal key={i} delay={0.05 * i}>
                <p className="text-pretty text-[1.0625rem] leading-[1.75] text-fg-muted">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal>
              <h3 className="font-mono text-eyebrow uppercase text-fg-subtle">Stack</h3>
            </Reveal>
            <dl className="mt-5 border-t border-line">
              {skillCategories.map((category, i) => (
                <Reveal key={category.id} delay={0.04 * i} className="group border-b border-line py-5">
                  <dt className="text-accent-serif text-2xl leading-none text-fg-muted transition-colors duration-(--duration-slow) group-hover:text-fg">
                    {category.title}
                  </dt>
                  <dd className="mt-3">
                    <ul aria-label={`${category.title} technologies`} className="flex flex-wrap gap-1.5">
                      {category.skills.map((skill) => (
                        <li
                          key={skill}
                          className="rounded-full border border-line bg-surface-1/60 px-3 py-1 font-mono text-xs text-fg transition-[border-color,color] duration-(--duration-base) hover:border-line-accent hover:text-accent-strong"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
