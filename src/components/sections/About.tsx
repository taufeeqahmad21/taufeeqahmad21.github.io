import { about, sections } from "@/data/site";
import { profile } from "@/data/profile";
import { Card } from "@/components/ui/Card";
import { focusIcons } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section-y border-t border-line">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <div className="flex flex-col gap-10">
            <SectionHeading id="about-title" copy={sections.about} />
            <Reveal delay={0.05}>
              <blockquote className="border-l border-line-accent pl-5 text-lg leading-relaxed text-fg">
                {profile.positioning}
              </blockquote>
            </Reveal>
          </div>

          <div className="flex flex-col gap-6 lg:pt-14">
            {about.paragraphs.map((paragraph, i) => (
              <Reveal key={i} delay={0.05 * i}>
                <p className="text-pretty text-[1.0625rem] leading-[1.75] text-fg-muted">{paragraph}</p>
              </Reveal>
            ))}
            <Reveal delay={0.15}>
              <ul className="mt-2 flex flex-wrap gap-2" aria-label="Engineering principles">
                {about.principles.map((principle) => (
                  <li
                    key={principle}
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-surface-1 px-3.5 py-1.5 text-sm text-fg"
                  >
                    <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
                    {principle}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {about.focusAreas.map((area, i) => {
            const Icon = focusIcons[area.icon];
            return (
              <Reveal as="li" key={area.title} delay={0.06 * i} className="h-full">
                <Card variant="interactive" className="flex h-full flex-col gap-5 p-6">
                  <span className="inline-flex size-10 items-center justify-center rounded-control border border-line-accent bg-accent-soft text-accent-strong">
                    <Icon className="size-[18px]" aria-hidden="true" />
                  </span>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-[1.0625rem] font-semibold tracking-[-0.01em] text-fg">{area.title}</h3>
                    <p className="text-sm leading-relaxed text-fg-muted">{area.description}</p>
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
