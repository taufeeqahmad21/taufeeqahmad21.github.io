import { ArrowUpRight, Plus } from "lucide-react";
import { additionalProjects, featuredProjects } from "@/data/projects";
import { githubProfile } from "@/data/github";
import { sections } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FeaturedProject } from "@/components/projects/FeaturedProject";
import { ProjectCard } from "@/components/projects/ProjectCard";

export function Projects() {
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
          <Reveal
            as="li"
            className={additionalProjects.length === 0 ? "md:col-span-2 lg:col-span-3" : "h-full"}
          >
            <Card
              variant="placeholder"
              className="flex h-full flex-col items-start justify-between gap-6 p-6 sm:flex-row sm:items-center sm:p-8"
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
