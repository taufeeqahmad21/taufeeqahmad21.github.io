import type { Project } from "@/types/content";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectLinks, projectAvailabilityNote } from "./ProjectLinks";
import { MediaCaption, Mockup } from "./ProjectMedia";
import { ProjectStatusBadge } from "./ProjectStatus";

/**
 * A project that isn't public yet. Deliberately quieter than the released showcases:
 * dashed outline, no glow, a labelled mockup instead of screenshots, and no links.
 */
export function ProjectInDevelopment({ project }: { project: Project }) {
  const titleId = `project-${project.slug}`;
  const note = projectAvailabilityNote(project);

  return (
    <Reveal>
      <article
        aria-labelledby={titleId}
        className="grid grid-cols-1 overflow-hidden rounded-stage border border-dashed border-line-strong bg-surface-1/40 lg:grid-cols-2"
      >
        <div className="relative isolate flex aspect-[4/3] items-center justify-center overflow-hidden border-b border-dashed border-line-strong sm:aspect-[16/9] lg:aspect-auto lg:min-h-[26rem] lg:border-b-0 lg:border-r">
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid opacity-50" />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-[radial-gradient(ellipse_at_bottom,rgb(162_142_255/0.14),transparent_70%)]"
          />
          {project.preview.kind === "mockup" && <Mockup variant={project.preview.variant} name={project.name} />}
          <MediaCaption className="absolute bottom-4 right-4">Illustrative mockup · not a screenshot</MediaCaption>
        </div>

        <div className="flex flex-col gap-6 p-6 sm:p-10">
          <div className="flex flex-wrap items-center gap-2">
            <ProjectStatusBadge project={project} />
            <Badge variant="violet">{project.category}</Badge>
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-mono text-eyebrow uppercase text-fg-subtle">Currently building</p>
            <h3 id={titleId} className="text-title font-semibold text-fg-muted">
              {project.name}
            </h3>
          </div>
          <p className="max-w-md text-pretty text-[1.0625rem] leading-relaxed text-fg-muted">{project.description}</p>
          <ul className="flex flex-wrap gap-2" aria-label="Technologies">
            {project.technologies.map((tech) => (
              <li key={tech}>
                <Badge variant="outline" mono>
                  {tech}
                </Badge>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-col gap-3 pt-2">
            <ProjectLinks project={project} />
            {note && <p className="text-xs text-fg-subtle">{note}</p>}
          </div>
        </div>
      </article>
    </Reveal>
  );
}
