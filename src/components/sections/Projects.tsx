import { ArrowUpRight, Plus } from "lucide-react";
import { additionalProjects, featuredProjects } from "@/data/projects";
import { githubProfile } from "@/data/github";
import { sections } from "@/data/site";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FeaturedProject } from "@/components/projects/FeaturedProject";
import { ProjectCard } from "@/components/projects/ProjectCard";

// Static class lookups so Tailwind can see every class name.
const mdSpan = { 1: "md:col-span-1", 2: "md:col-span-2" } as const;
const lgSpan = { 1: "lg:col-span-1", 2: "lg:col-span-2", 3: "lg:col-span-3" } as const;
const mdLayout = { 1: "md:flex-col md:items-start", 2: "md:flex-row md:items-center" } as const;
const lgLayout = { 1: "lg:flex-col lg:items-start", 2: "lg:flex-row lg:items-center", 3: "lg:flex-row lg:items-center" } as const;

/**
 * The "More Android projects" card fills the rest of the last grid row (2 columns on md,
 * 3 on lg) and only switches to a horizontal layout when it is wide enough.
 */
function placeholderLayout(count: number) {
  const md = count % 2 === 0 ? 2 : 1;
  const lg = (3 - (count % 3)) as 1 | 2 | 3;
  return {
    cell: cn("h-full", mdSpan[md], lgSpan[lg]),
    card: cn("sm:flex-row sm:items-center", mdLayout[md], lgLayout[lg]),
  };
}

export function Projects() {
  const placeholder = placeholderLayout(additionalProjects.length);
  return (
    <section id="projects" aria-labelledby="projects-title" className="section-y border-t border-line">
      <div className="container-page">
        <SectionHeading id="projects-title" copy={sections.projects} />

        <div className="mt-14 flex flex-col gap-6 lg:gap-8">
          {featuredProjects.map((project, i) => (
            <FeaturedProject key={project.slug} project={project} index={i} />
          ))}
        </div>

        <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:mt-8 lg:grid-cols-3">
          {additionalProjects.map((project, i) => (
            <Reveal as="li" key={project.slug} delay={0.06 * i} className="h-full">
              <ProjectCard project={project} />
            </Reveal>
          ))}
          <Reveal as="li" className={placeholder.cell}>
            <Card
              variant="placeholder"
              className={cn("flex h-full flex-col items-start justify-between gap-6 p-6 sm:p-8", placeholder.card)}
            >
              <div className="flex items-start gap-4">
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-control border border-line-strong text-fg-muted">
                  <Plus className="size-5" aria-hidden="true" />
                </span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-[1.0625rem] font-semibold text-fg">More Android projects</h3>
                  <p className="max-w-lg text-sm leading-relaxed text-fg-muted">
                    Further Android work will be added here as each project is written up. My GitHub
                    profile has the latest code in the meantime.
                  </p>
                </div>
              </div>
              <ButtonLink
                href={githubProfile.href}
                variant="secondary"
                size="sm"
                trailingIcon={<ArrowUpRight className="size-4" aria-hidden="true" />}
                pendingLabel="GitHub profile link coming soon"
              >
                Browse GitHub
              </ButtonLink>
            </Card>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}
