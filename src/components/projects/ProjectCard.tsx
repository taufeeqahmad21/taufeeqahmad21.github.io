import Image from "next/image";
import type { Project } from "@/types/content";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ProjectLinks, projectAvailabilityNote } from "./ProjectLinks";
import { ProjectPreview } from "./ProjectPreview";
import { ProjectStatusBadge } from "./ProjectStatus";

/** Compact card for non-featured projects (the grid under the showcase). */
export function ProjectCard({ project }: { project: Project }) {
  const note = projectAvailabilityNote(project);
  return (
    <Card as="article" variant="interactive" className="flex h-full flex-col gap-5 p-3">
      <ProjectPreview project={project} className="aspect-[16/10]" />
      <div className="flex flex-1 flex-col gap-4 px-2 pb-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={project.platform === "android" ? "violet" : "accent"}>{project.category}</Badge>
          <ProjectStatusBadge project={project} />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            {project.icon && (
              <Image src={project.icon} alt="" width={40} height={40} className="size-10 shrink-0 rounded-[0.625rem] border border-line-strong" />
            )}
            <h3 className="text-heading font-semibold text-fg">{project.name}</h3>
          </div>
          <p className="text-sm leading-relaxed text-fg-muted">{project.description}</p>
        </div>
        <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
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
    </Card>
  );
}
