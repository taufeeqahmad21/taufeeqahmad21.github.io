import type { Project } from "@/types/content";
import { Badge } from "@/components/ui/Badge";

const labels: Record<Project["status"], string> = {
  published: "Published on Google Play",
  live: "Live",
  "in-development": "In Development",
};

/** Green "released" badge for published/live products; dashed pending badge while in development. */
export function ProjectStatusBadge({ project }: { project: Project }) {
  const released = project.status !== "in-development";
  const label =
    project.status === "published" && project.platform !== "android" ? "Published" : labels[project.status];

  return (
    <Badge variant={released ? "success" : "pending"}>
      <span
        aria-hidden="true"
        className={released ? "size-1.5 rounded-full bg-success" : "size-1.5 rounded-full border border-fg-subtle"}
      />
      {label}
    </Badge>
  );
}
