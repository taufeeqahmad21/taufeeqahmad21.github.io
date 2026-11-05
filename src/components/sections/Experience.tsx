import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { employment } from "@/data/experience";
import { journey, journeyIntro } from "@/data/journey";
import { getProject } from "@/data/projects";
import { sections } from "@/data/site";
import { cn, initials } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectStatusBadge } from "@/components/projects/ProjectStatus";
import { EmploymentCard } from "@/components/experience/EmploymentCard";

/** Small labelled divider that introduces each part of the section. */
function PartHeading({ index, children }: { index: string; children: string }) {
  return (
    <Reveal>
      <h3 className="flex items-center gap-4 font-mono text-eyebrow uppercase text-fg-subtle">
        <span className="text-fg-muted">{index}</span>
        <span>{children}</span>
        <span aria-hidden="true" className="rule-fade flex-1" />
      </h3>
    </Reveal>
  );
}

/**
 * Experience: (A) professional employment, then (B) independent product development,
 * clearly separated so personal products can't be read as employment.
 */
export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="section-y border-t border-line">
      <div className="container-page">
        <SectionHeading id="experience-title" copy={sections.experience} split />

        {/* A — professional employment */}
        <div className="mt-14 flex flex-col gap-8 md:mt-20">
          <PartHeading index="A">Professional experience</PartHeading>
          {employment.map((entry) => (
            <EmploymentCard key={entry.id} entry={entry} />
          ))}
        </div>

        {/* B — independent products, kept visibly separate from employment */}
        <div className="mt-20 md:mt-28">
          <PartHeading index="B">Independent product development</PartHeading>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">
          {/* overview */}
          <Reveal className="lg:col-span-4">
            <div className="surface-card flex flex-col gap-6 p-6 sm:p-8 lg:sticky lg:top-28">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="accent">Independent work</Badge>
                <Badge variant="outline" mono>
                  {journeyIntro.period}
                </Badge>
              </div>
              <p className="text-[1.0625rem] leading-relaxed text-fg">{journeyIntro.summary}</p>
              <ul className="flex flex-col gap-3">
                {journeyIntro.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 text-sm leading-relaxed text-fg-muted">
                    <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-fg-subtle" />
                    {highlight}
                  </li>
                ))}
              </ul>
              <p className="border-t border-line pt-5 text-sm leading-relaxed text-fg-subtle">
                My own products, built independently and separate from my employment at My Taxi Ride.
              </p>
            </div>
          </Reveal>

          {/* milestones */}
          <ol className="relative flex flex-col lg:col-span-8">
            <span aria-hidden="true" className="absolute bottom-8 left-[1.4375rem] top-8 w-px bg-line-strong" />
            {journey.map((entry, i) => {
              const project = getProject(entry.projectSlug);
              const released = project.status !== "in-development";
              return (
                <Reveal as="li" key={entry.projectSlug} delay={0.06 * i} className="group relative pb-10 pl-16 last:pb-0 sm:pl-20">
                  {/* node */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute left-0 top-0 flex size-12 items-center justify-center overflow-hidden rounded-2xl border bg-bg",
                      released ? "border-line-strong" : "border-dashed border-line-strong",
                    )}
                  >
                    {project.icon ? (
                      <Image src={project.icon} alt="" width={48} height={48} className="size-full" />
                    ) : (
                      <span className="font-mono text-xs text-fg-subtle">{initials(project.name)}</span>
                    )}
                  </span>

                  <article
                    className={cn(
                      "flex flex-col gap-4 rounded-card p-6 transition-[border-color,background-color] duration-(--duration-slow) sm:p-7",
                      released
                        ? "surface-card group-hover:border-line-strong"
                        : "border border-dashed border-line-strong bg-transparent",
                    )}
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex flex-col gap-1.5">
                        <h4 className={cn("text-heading font-semibold", released ? "text-fg" : "text-fg-muted")}>
                          {project.name}
                        </h4>
                        <p className="font-mono text-xs text-fg-subtle">{entry.role}</p>
                      </div>
                      <ProjectStatusBadge project={project} />
                    </div>
                    <p className="text-[0.9375rem] leading-relaxed text-fg-muted">{entry.summary}</p>
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                      <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
                        {project.technologies.map((tech) => (
                          <li key={tech}>
                            <Badge variant={released ? "default" : "pending"} mono>
                              {tech}
                            </Badge>
                          </li>
                        ))}
                      </ul>
                      {released && project.links.live && (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link inline-flex min-h-10 items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-fg"
                        >
                          {project.platform === "android" ? "Google Play" : "Visit website"}
                          <ArrowUpRight
                            className="size-4 transition-transform duration-(--duration-base) group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                            aria-hidden="true"
                          />
                          <span className="sr-only">: {project.name} (opens in a new tab)</span>
                        </a>
                      )}
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
