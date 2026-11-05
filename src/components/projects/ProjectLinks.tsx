import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/content";
import { ButtonLink } from "@/components/ui/Button";
import { GitHubIcon } from "@/components/ui/Icons";

/** "View Project" + "Source Code". Missing URLs render as honest "not yet public" states. */
export function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap gap-3">
      <ButtonLink
        href={project.links.live}
        size="sm"
        trailingIcon={<ArrowUpRight className="size-4" aria-hidden="true" />}
        pendingLabel={`${project.name} is not publicly available yet`}
      >
        View Project
      </ButtonLink>
      <ButtonLink
        href={project.links.source}
        size="sm"
        variant="secondary"
        icon={<GitHubIcon className="size-4" />}
        pendingLabel={`${project.name} source code is not public`}
      >
        Source Code
      </ButtonLink>
    </div>
  );
}

export function projectAvailabilityNote(project: Project): string | null {
  const { live, source } = project.links;
  if (live && source) return null;
  if (!live && !source) return "Not yet public. Links will be added when available.";
  if (!live) return "Live version not yet public.";
  return "Source code is private.";
}
