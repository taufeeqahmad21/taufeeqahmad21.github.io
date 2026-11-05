import { additionalProjects, featuredProjects, projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { sections } from "@/data/site";
import { ButtonArrow, ButtonLink } from "@/components/ui/Button";
import { GitHubIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectInDevelopment } from "@/components/projects/ProjectInDevelopment";
import { ProjectShowcase } from "@/components/projects/ProjectShowcase";

export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="section-y">
      <div className="container-page">
        <SectionHeading id="work-title" copy={sections.work} split />

        <div className="mt-14 flex flex-col gap-8 md:mt-20 lg:gap-10">
          {featuredProjects.map((project, i) => (
            <ProjectShowcase key={project.slug} project={project} index={i} total={projects.length} />
          ))}
          {additionalProjects.map((project) => (
            <ProjectInDevelopment key={project.slug} project={project} />
          ))}
        </div>

        <Reveal className="mt-10 flex flex-col items-start justify-between gap-5 border-t border-line pt-8 sm:flex-row sm:items-center">
          <p className="max-w-lg text-sm leading-relaxed text-fg-muted">
            More Android projects will be added here as each one is written up. My GitHub profile has the latest code in
            the meantime.
          </p>
          <ButtonLink
            href={profile.socials.github.href}
            variant="secondary"
            size="sm"
            icon={<GitHubIcon className="size-4" />}
            trailingIcon={<ButtonArrow direction="up-right" />}
            pendingLabel="GitHub profile link coming soon"
          >
            Browse GitHub
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
