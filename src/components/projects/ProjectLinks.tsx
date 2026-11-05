import { ArrowUpRight, Globe, Hammer, Play } from "lucide-react";
import type { Project } from "@/types/content";
import { ButtonLink } from "@/components/ui/Button";
import { GitHubIcon } from "@/components/ui/Icons";

/**
 * Primary CTA by status:
 * - published Android app → "Google Play"
 * - live website → "Visit Website"
 * - in development → a non-interactive "In Development" state
 * "Source Code" is only shown when the repository is public.
 */
export function ProjectLinks({ project }: { project: Project }) {
  const { live, source } = project.links;
  const released = project.status !== "in-development" && live;

  return (
    <div className="flex flex-wrap gap-3">
      {released ? (
        <ButtonLink
          href={live}
          size="md"
          icon={
            project.platform === "android" ? (
              <Play className="size-4 fill-current" aria-hidden="true" />
            ) : (
              <Globe className="size-4" aria-hidden="true" />
            )
          }
          trailingIcon={<ArrowUpRight className="size-4" aria-hidden="true" />}
        >
          {project.platform === "android" ? "Google Play" : "Visit Website"}
          <span className="sr-only">: {project.name}</span>
        </ButtonLink>
      ) : (
        <ButtonLink
          href={null}
          size="md"
          icon={<Hammer className="size-4" aria-hidden="true" />}
          pendingLabel={`${project.name} is in development; public links will be added when available`}
        >
          In Development
        </ButtonLink>
      )}
      {source && (
        <ButtonLink
          href={source}
          size="md"
          variant="secondary"
          icon={<GitHubIcon className="size-4" />}
        >
          Source Code
        </ButtonLink>
      )}
    </div>
  );
}

export function projectAvailabilityNote(project: Project): string | null {
  if (project.status === "in-development") return "Not yet public. Links will be added when available.";
  if (!project.links.live) return "Public link coming soon.";
  return null;
}
