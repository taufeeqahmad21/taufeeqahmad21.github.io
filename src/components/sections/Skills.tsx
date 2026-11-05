import { sections } from "@/data/site";
import { skillCategories } from "@/data/skills";
import { Card } from "@/components/ui/Card";
import { skillIcons } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="section-y border-t border-line">
      <div className="container-page">
        <SectionHeading id="skills-title" copy={sections.skills} />

        <ul className="mt-14 grid gap-4 md:grid-cols-2">
          {skillCategories.map((category, i) => {
            const Icon = skillIcons[category.icon];
            return (
              <Reveal as="li" key={category.id} delay={0.06 * i} className="h-full">
                <Card className="group relative flex h-full flex-col gap-7 overflow-hidden p-6 sm:p-8">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-[radial-gradient(closest-side,rgb(91_140_255/0.1),transparent)] opacity-0 transition-opacity duration-(--duration-slow) group-hover:opacity-100"
                  />
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex flex-col gap-2">
                      <h3 className="text-heading font-semibold text-fg">{category.title}</h3>
                      <p className="max-w-sm text-sm leading-relaxed text-fg-muted">{category.description}</p>
                    </div>
                    <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-control border border-line-strong bg-surface-2 text-fg-muted transition-colors duration-(--duration-slow) group-hover:border-line-accent group-hover:text-accent-strong">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                  </div>
                  <ul className="mt-auto flex flex-wrap gap-2" aria-label={`${category.title} skills`}>
                    {category.skills.map((skill) => (
                      <li
                        key={skill}
                        className="rounded-control border border-line bg-surface-2/70 px-3 py-1.5 font-mono text-[0.8125rem] text-fg transition-colors duration-(--duration-base) hover:border-line-strong"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
