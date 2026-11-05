import { experience } from "@/data/experience";
import { sections } from "@/data/site";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="section-y border-t border-line">
      <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading id="experience-title" copy={sections.experience} />
        </div>

        <ol className="relative flex flex-col gap-4">
          {/* timeline rail */}
          <span aria-hidden="true" className="absolute bottom-6 left-[0.6875rem] top-6 w-px bg-line-strong" />
          {experience.map((entry, i) => (
            <Reveal as="li" key={entry.id} delay={0.06 * i} className="relative pl-10">
              <span
                aria-hidden="true"
                className={cn(
                  "absolute left-0 top-7 flex size-[1.375rem] items-center justify-center rounded-full border bg-bg",
                  entry.isPlaceholder ? "border-dashed border-line-strong" : "border-line-accent",
                )}
              >
                <span
                  className={cn("size-2 rounded-full", entry.isPlaceholder ? "bg-surface-4" : "bg-accent")}
                />
              </span>

              <article
                className={cn(
                  "flex flex-col gap-4 p-6 sm:p-7",
                  entry.isPlaceholder
                    ? "rounded-card border border-dashed border-line-strong"
                    : "surface-card",
                )}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex flex-col gap-1">
                    <h3 className={cn("text-lg font-semibold", entry.isPlaceholder ? "text-fg-muted" : "text-fg")}>
                      {entry.role}
                    </h3>
                    <p className="text-sm text-fg-muted">{entry.organization}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    {entry.isPlaceholder && <Badge variant="pending">To be added</Badge>}
                    <span className="font-mono text-xs text-fg-subtle">{entry.period}</span>
                  </div>
                </div>
                <p className={cn("text-[0.9375rem] leading-relaxed", entry.isPlaceholder ? "text-fg-subtle" : "text-fg-muted")}>
                  {entry.summary}
                </p>
                {entry.highlights.length > 0 && (
                  <ul className="flex flex-col gap-2">
                    {entry.highlights.map((h) => (
                      <li key={h} className="flex gap-3 text-sm leading-relaxed text-fg-muted">
                        <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-fg-subtle" />
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
                {entry.technologies.length > 0 && (
                  <ul className="flex flex-wrap gap-1.5 pt-1" aria-label="Technologies">
                    {entry.technologies.map((tech) => (
                      <li key={tech}>
                        <Badge variant={entry.isPlaceholder ? "pending" : "default"} mono>
                          {tech}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
