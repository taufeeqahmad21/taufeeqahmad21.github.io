import type { Project } from "@/types/content";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ProjectLinks } from "./ProjectLinks";
import { ProjectPreview } from "./ProjectPreview";

/** Compact card for non-featured projects (the grid under the showcase). */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card as="article" variant="interactive" className="flex h-full flex-col gap-5 p-3">
      <ProjectPreview project={project} className="aspect-[16/10]" />
      <div className="flex flex-1 flex-col gap-4 px-2 pb-3">
        <Badge variant={project.platform === "android" ? "violet" : "accent"} className="self-start">
          {project.category}
        </Badge>
        <div className="flex flex-col gap-2">
          <h3 className="text-heading font-semibold text-fg">{project.name}</h3>
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
        <div className="mt-auto pt-2">
          <ProjectLinks project={project} />
        </div>
      </div>
    </Card>
  );
}
