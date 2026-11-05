import Image from "next/image";
import { projects, getProject } from "@/data/projects";
import type { Project } from "@/types/content";
import { cn, initials } from "@/lib/utils";

const statusLabel: Record<Project["status"], string> = {
  published: "Published",
  live: "Live",
  "in-development": "In development",
};

const waToolbox = getProject("wa-toolbox");
const peekShot = waToolbox.preview.kind === "screenshots" ? waToolbox.preview.images[1] : null;

/**
 * Hero composition: a "product console" listing the real products with their real icons
 * and status, and one real Play Store screenshot peeking out behind it. Presentational
 * (the Work section carries the same information), so it's hidden from assistive tech.
 */
export function HeroVisual() {
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-[34rem] select-none lg:ml-auto lg:mr-0">
      {/* atmosphere */}
      <div className="absolute -inset-10 -z-10 bg-[radial-gradient(closest-side,rgb(91_140_255/0.18),transparent)] blur-2xl" />

      {/* real screenshot behind the console */}
      {peekShot && (
        <div className="absolute -right-3 -top-16 hidden w-36 rotate-[7deg] overflow-hidden rounded-2xl border border-line-strong shadow-raised sm:block lg:-right-8 xl:-right-14">
          <Image src={peekShot.src} alt="" sizes="144px" className="h-auto w-full" priority />
        </div>
      )}

      <div className="relative overflow-hidden rounded-panel border border-line-strong bg-surface-1/85 shadow-stage backdrop-blur-xl">
        {/* window bar */}
        <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3.5">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-surface-4" />
              <span className="size-2.5 rounded-full bg-surface-4" />
              <span className="size-2.5 rounded-full bg-surface-4" />
            </div>
            <span className="font-mono text-[0.6875rem] text-fg-subtle">~/products</span>
          </div>
          <span className="font-mono text-[0.6875rem] text-fg-subtle">{projects.length} products</span>
        </div>

        {/* code fragment */}
        <pre className="border-b border-line px-5 py-4 font-mono text-[0.6875rem] leading-[1.8] sm:text-xs">
          <code>
            <span className="text-code-keyword">val</span> <span className="text-fg">shipped</span>{" "}
            <span className="text-fg-subtle">=</span> <span className="text-fg">products</span>
            {"\n"}
            {"    "}
            <span className="text-fg-subtle">.</span>
            <span className="text-code-type">filter</span> <span className="text-fg-subtle">{"{"}</span>{" "}
            <span className="text-fg">it</span>
            <span className="text-fg-subtle">.</span>
            <span className="text-fg">isPublic</span> <span className="text-fg-subtle">{"}"}</span>
            {"  "}
            <span className="text-code-comment italic">{"// idea → release"}</span>
          </code>
        </pre>

        {/* product rows */}
        <ul className="divide-y divide-line">
          {projects.map((project) => {
            const released = project.status !== "in-development";
            return (
              <li key={project.slug} className="flex items-center gap-4 px-5 py-4">
                {project.icon ? (
                  <Image
                    src={project.icon}
                    alt=""
                    width={40}
                    height={40}
                    className="size-10 shrink-0 rounded-[0.7rem] border border-line-strong"
                  />
                ) : (
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-[0.7rem] border border-dashed border-line-strong font-mono text-[0.6875rem] text-fg-subtle">
                    {initials(project.name)}
                  </span>
                )}
                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className={cn("truncate text-[0.9375rem] font-medium", released ? "text-fg" : "text-fg-muted")}>
                    {project.name}
                  </span>
                  <span className="truncate font-mono text-[0.6875rem] text-fg-subtle">
                    {project.platform === "android" ? "Android" : "Web"} · {project.technologies.slice(0, 2).join(", ")}
                  </span>
                </span>
                <span
                  className={cn(
                    "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.6875rem]",
                    released
                      ? "border-[rgb(74_222_128/0.28)] bg-success-soft text-success"
                      : "border-dashed border-line-strong text-fg-subtle",
                  )}
                >
                  <span
                    className={cn("size-1.5 rounded-full", released ? "bg-success" : "border border-fg-subtle")}
                  />
                  {statusLabel[project.status]}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
