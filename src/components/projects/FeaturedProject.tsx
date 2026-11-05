import type { Project } from "@/types/content";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectLinks, projectAvailabilityNote } from "./ProjectLinks";
import { ProjectPreview } from "./ProjectPreview";

type FeaturedProjectProps = {
  project: Project;
  index: number;
};

/** Large showcase row. Alternates preview side on desktop for rhythm. */
export function FeaturedProject({ project, index }: FeaturedProjectProps) {
  const reversed = index % 2 === 1;
  const note = projectAvailabilityNote(project);
  const titleId = `project-${project.slug}`;

  return (
    <Reveal as="article" className="group">
      <div
        className="surface-card grid items-center gap-8 p-3 transition-colors duration-(--duration-slow) hover:border-line-strong sm:p-4 lg:grid-cols-2 lg:gap-12"
      >
        <ProjectPreview
          project={project}
          className={cn(
            // Wide frame while stacked (tablet), 4:3 beside the text on desktop.
            "transition-transform duration-(--duration-slow) ease-(--ease-out-expo) sm:aspect-[16/9] lg:aspect-[4/3]",
            reversed && "lg:order-2",
          )}
        />
        <div className={cn("flex flex-col gap-6 px-3 pb-5 sm:px-4 lg:py-6", reversed ? "lg:pl-10" : "lg:pr-10")}>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={project.platform === "android" ? "violet" : "accent"}>{project.category}</Badge>
            <span className="font-mono text-xs text-fg-subtle">{String(index + 1).padStart(2, "0")}</span>
          </div>
          <div className="flex flex-col gap-3">
            <h3 id={titleId} className="text-title font-semibold text-fg">
              {project.name}
            </h3>
            <p className="max-w-md text-pretty text-[1.0625rem] leading-relaxed text-fg-muted">
              {project.description}
            </p>
          </div>
          <ul className="flex flex-wrap gap-2" aria-label="Technologies">
            {project.technologies.map((tech) => (
              <li key={tech}>
                <Badge variant="outline" mono>
                  {tech}
                </Badge>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 border-t border-line pt-6">
            <ProjectLinks project={project} />
            {note && <p className="text-xs text-fg-subtle">{note}</p>}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
