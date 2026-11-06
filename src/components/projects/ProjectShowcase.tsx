import Image from "next/image";
import type { Project } from "@/types/content";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectLinks } from "./ProjectLinks";
import { BrowserShot, MediaCaption, ScreenshotGallery } from "./ProjectMedia";
import { ProjectStatusBadge } from "./ProjectStatus";

const tintGlow: Record<Project["tint"], string> = {
  emerald: "bg-[radial-gradient(closest-side,rgb(52_211_153/0.16),transparent)]",
  blue: "bg-[radial-gradient(closest-side,rgb(76_141_255/0.2),transparent)]",
  violet: "bg-[radial-gradient(closest-side,rgb(155_135_255/0.16),transparent)]",
};

type ProjectShowcaseProps = {
  project: Project;
  index: number;
  total: number;
};

/**
 * Immersive showcase "stage" for a released product: a large real-screenshot composition
 * on top, then the story — name, summary, verified details, features, stack and the CTA.
 */
export function ProjectShowcase({ project, index, total }: ProjectShowcaseProps) {
  const titleId = `project-${project.slug}`;
  const { preview } = project;
  const number = String(index + 1).padStart(2, "0");

  return (
    <Reveal>
      <article
        aria-labelledby={titleId}
        data-spotlight
        className="group surface-stage relative isolate overflow-hidden transition-[border-color] duration-(--duration-slow) hover:border-line-strong"
      >
        {/* atmosphere */}
        <div
          aria-hidden="true"
          className={cn(
            "absolute left-1/2 top-[-30%] -z-10 h-[70%] w-[110%] -translate-x-1/2 opacity-80 transition-opacity duration-(--duration-image) group-hover:opacity-100",
            tintGlow[project.tint],
          )}
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid opacity-60" />

        {/* top bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 pt-5 sm:px-10 sm:pt-8">
          <div className="flex flex-wrap items-center gap-2">
            <ProjectStatusBadge project={project} />
            <Badge variant={project.platform === "android" ? "violet" : "accent"}>{project.category}</Badge>
          </div>
          <span className="font-mono text-xs text-fg-subtle">
            <span className="text-fg">{number}</span> / {String(total).padStart(2, "0")}
          </span>
        </div>

        {/* media */}
        <div className="relative px-5 pt-8 sm:px-10 sm:pt-12">
          {preview.kind === "screenshots" && (
            <div className="pb-6 lg:pb-14">
              <ScreenshotGallery images={preview.images} label={`${project.name} screenshots`} />
            </div>
          )}
          {preview.kind === "image" && (
            <div className="mx-auto max-w-5xl">
              <BrowserShot src={preview.src} alt={preview.alt} url={project.links.live ?? ""} />
            </div>
          )}
          {preview.kind !== "mockup" && (
            <MediaCaption real className="absolute bottom-4 right-5 sm:right-10">
              {preview.caption}
            </MediaCaption>
          )}
        </div>

        {/* story */}
        <div className="grid grid-cols-1 gap-10 border-t border-line px-5 py-9 sm:px-10 sm:py-12 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col gap-6 lg:col-span-6">
            <div className="flex items-center gap-4">
              {project.icon && (
                <Image
                  src={project.icon}
                  alt=""
                  width={64}
                  height={64}
                  className="size-12 shrink-0 rounded-[0.9rem] border border-line-strong shadow-card sm:size-16 sm:rounded-[1.1rem]"
                />
              )}
              <h3 id={titleId} className="text-showcase font-semibold text-fg">
                {project.name}
              </h3>
            </div>
            <p className="max-w-xl text-pretty text-lead text-fg-muted">{project.description}</p>
            <div className="pt-2">
              <ProjectLinks project={project} size="lg" />
            </div>
          </div>

          <div className="flex flex-col gap-8 lg:col-span-5 lg:col-start-8">
            {project.details && project.details.length > 0 && (
              <dl className="flex flex-col divide-y divide-line border-y border-line">
                {project.details.map((detail) => (
                  <div key={detail.label} className="grid grid-cols-1 gap-1.5 py-4 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-6">
                    <dt className="font-mono text-eyebrow uppercase text-fg-subtle sm:pt-1">{detail.label}</dt>
                    <dd className="text-[0.9375rem] leading-relaxed text-fg">{detail.text}</dd>
                  </div>
                ))}
              </dl>
            )}
            {project.features && project.features.length > 0 && (
              <div className="flex flex-col gap-3">
                <p className="font-mono text-eyebrow uppercase text-fg-subtle">
                  {project.platform === "web" ? "Tool categories" : "Features"}
                </p>
                <ul className="flex flex-wrap gap-2">
                  {project.features.map((feature) => (
                    <li key={feature}>
                      <Badge>{feature}</Badge>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex flex-col gap-3">
              <p className="font-mono text-eyebrow uppercase text-fg-subtle">Technology</p>
              <ul className="flex flex-wrap gap-2" aria-label="Technologies">
                {project.technologies.map((tech) => (
                  <li key={tech}>
                    <Badge variant="outline" mono>
                      {tech}
                    </Badge>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
