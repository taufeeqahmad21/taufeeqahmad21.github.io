import { sections } from "@/data/site";
import { skillCategories } from "@/data/skills";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Typographic technology index. Each category is a row: a serif-italic category name and
 * its tools set as large text. Hovering a row lights it; hovering a tool lifts that tool.
 * No proficiency levels, on purpose.
 */
export function Technology() {
  return (
    <section id="technology" aria-labelledby="technology-title" className="section-y border-t border-line">
      <div className="container-page">
        <SectionHeading id="technology-title" copy={sections.technology} split />

        <ul className="mt-14 border-t border-line md:mt-20">
          {skillCategories.map((category, i) => (
            <Reveal as="li" key={category.id} delay={0.04 * i} className="group relative isolate border-b border-line">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(91_140_255/0.07),transparent_70%)] opacity-0 transition-opacity duration-(--duration-slow) group-hover:opacity-100"
              />
              <div className="grid grid-cols-1 gap-5 py-8 sm:py-10 lg:grid-cols-12 lg:gap-10">
                <div className="flex flex-col gap-2 lg:col-span-4">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-xs text-fg-subtle transition-colors duration-(--duration-base) group-hover:text-accent-strong">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-accent-serif text-[clamp(2rem,1.5rem+1.8vw,3rem)] leading-none text-fg-muted transition-colors duration-(--duration-slow) group-hover:text-fg">
                      {category.title}
                    </h3>
                  </div>
                  <p className="max-w-xs pl-9 text-sm leading-relaxed text-fg-subtle">
                    {category.description}
                  </p>
                </div>
                <ul
                  aria-label={`${category.title} technologies`}
                  className="flex flex-wrap items-baseline gap-x-2 gap-y-2 lg:col-span-8 lg:pt-2"
                >
                  {category.skills.map((skill, j) => (
                    <li key={skill} className="flex items-baseline gap-2">
                      <span className="inline-block text-[clamp(1.25rem,1.05rem+0.9vw,1.875rem)] font-medium tracking-[-0.025em] text-fg transition-[color,transform] duration-(--duration-base) ease-(--ease-out-expo) hover:-translate-y-0.5 hover:text-accent-strong">
                        {skill}
                      </span>
                      {j < category.skills.length - 1 && (
                        <span aria-hidden="true" className="text-[clamp(1.25rem,1.05rem+0.9vw,1.875rem)] font-light text-fg-subtle/50">
                          /
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
