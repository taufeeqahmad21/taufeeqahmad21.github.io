import type { ReactNode } from "react";
import Image, { type StaticImageData } from "next/image";
import { Camera } from "lucide-react";
import type { Project, ProjectPreview as PreviewData, ProjectScreenshot } from "@/types/content";
import { cn } from "@/lib/utils";

/**
 * Project visual. Real screenshots (website or store listing) are shown in a frame with a
 * "Screenshot" caption; otherwise a code-drawn illustration is shown and labelled as a mockup,
 * so the two can never be confused.
 */
export function ProjectPreview({ project, className }: { project: Project; className?: string }) {
  const { preview } = project;
  return (
    <div
      className={cn(
        "relative isolate flex aspect-[4/3] items-center justify-center overflow-hidden rounded-card border border-line bg-surface-2",
        className,
      )}
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid opacity-70 [mask-image:none]" />
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-x-0 bottom-0 -z-10 h-2/3",
          project.platform === "android"
            ? "bg-[radial-gradient(ellipse_at_bottom,rgb(160_140_255/0.18),transparent_70%)]"
            : "bg-[radial-gradient(ellipse_at_bottom,rgb(91_140_255/0.18),transparent_70%)]",
        )}
      />
      {preview.kind === "image" && (
        <>
          <BrowserScreenshot src={preview.src} alt={preview.alt} />
          <PreviewCaption real>{preview.caption}</PreviewCaption>
        </>
      )}
      {preview.kind === "screenshots" && (
        <>
          <PhoneScreenshots images={preview.images} />
          <PreviewCaption real>{preview.caption}</PreviewCaption>
        </>
      )}
      {preview.kind === "mockup" && (
        <>
          <Mockup variant={preview.variant} name={project.name} />
          <PreviewCaption>Illustrative mockup · not a screenshot</PreviewCaption>
        </>
      )}
    </div>
  );
}

function PreviewCaption({ children, real = false }: { children: ReactNode; real?: boolean }) {
  return (
    <span
      className={cn(
        "absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border bg-bg/80 px-2 py-0.5 font-mono text-[0.625rem] backdrop-blur",
        real ? "border-line-strong text-fg" : "border-line text-fg-muted",
      )}
    >
      {real && <Camera className="size-3" aria-hidden="true" />}
      {children}
    </span>
  );
}

/* Website screenshot inside a minimal browser frame, matching the mockup composition. */
function BrowserScreenshot({ src, alt }: { src: StaticImageData; alt: string }) {
  return (
    <div className="w-[88%] translate-y-5 overflow-hidden rounded-xl border border-line-strong bg-surface-1 shadow-raised">
      <div aria-hidden="true" className="flex items-center gap-1 border-b border-line px-3 py-2">
        <span className="size-1.5 rounded-full bg-surface-4" />
        <span className="size-1.5 rounded-full bg-surface-4" />
        <span className="size-1.5 rounded-full bg-surface-4" />
      </div>
      <Image src={src} alt={alt} sizes="(min-width: 1024px) 520px, 90vw" className="h-auto w-full" />
    </div>
  );
}

/* Store screenshots side by side; the middle one is lifted. Two on phones, three from sm up. */
function PhoneScreenshots({ images }: { images: ProjectScreenshot[] }) {
  return (
    <ul className="flex w-full items-center justify-center gap-3 px-4 sm:gap-4">
      {images.slice(0, 3).map((image, i) => (
        <li
          key={image.alt}
          className={cn(
            "relative aspect-[3/4] w-[42%] overflow-hidden rounded-xl border border-line-strong bg-surface-1 shadow-raised sm:w-[29%]",
            i === 1 && "sm:-translate-y-3",
            i === 2 && "hidden sm:block",
          )}
        >
          <Image src={image.src} alt={image.alt} fill sizes="(min-width: 640px) 180px, 42vw" className="object-cover" />
        </li>
      ))}
    </ul>
  );
}

function Mockup({ variant, name }: { variant: Extract<PreviewData, { kind: "mockup" }>["variant"]; name: string }) {
  if (variant === "web-tools") return <WebToolsMockup name={name} />;
  return <PhoneMockup name={name} variant={variant} />;
}

/* Browser window with a grid of tool tiles — Kalyvor-style "tools-first" layout. */
function WebToolsMockup({ name }: { name: string }) {
  const tiles = [
    "bg-accent/70",
    "bg-violet/60",
    "bg-surface-4",
    "bg-surface-4",
    "bg-accent/40",
    "bg-surface-4",
  ];
  return (
    <div aria-hidden="true" className="w-[82%] translate-y-6 overflow-hidden rounded-xl border border-line-strong bg-surface-1 shadow-raised">
      <div className="flex items-center gap-3 border-b border-line px-3 py-2">
        <div className="flex gap-1">
          <span className="size-1.5 rounded-full bg-surface-4" />
          <span className="size-1.5 rounded-full bg-surface-4" />
          <span className="size-1.5 rounded-full bg-surface-4" />
        </div>
        <span className="h-3.5 flex-1 rounded-md bg-surface-3" />
      </div>
      <div className="flex">
        <div className="hidden w-1/4 flex-col gap-2 border-r border-line p-3 min-[420px]:flex">
          <span className="text-[0.625rem] font-semibold text-fg">{name}</span>
          {[70, 55, 80, 45].map((w, i) => (
            <span key={i} className={cn("h-1.5 rounded-full", i === 0 ? "bg-accent/60" : "bg-surface-4")} style={{ width: `${w}%` }} />
          ))}
        </div>
        <div className="flex flex-1 flex-col gap-3 p-3 sm:p-4">
          <span className="h-2 w-2/5 rounded-full bg-fg/70" />
          <span className="h-1.5 w-3/5 rounded-full bg-surface-4" />
          <div className="grid grid-cols-3 gap-2">
            {tiles.map((tile, i) => (
              <div key={i} className="flex flex-col gap-1.5 rounded-lg border border-line bg-surface-2 p-2">
                <span className={cn("size-3.5 rounded", tile)} />
                <span className="h-1 w-4/5 rounded-full bg-surface-4" />
                <span className="h-1 w-1/2 rounded-full bg-surface-3" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* Android phone frame. The invoice variant shows a document list; generic shows a feed. */
function PhoneMockup({ name, variant }: { name: string; variant: "android-invoice" | "android-generic" }) {
  const rows = variant === "android-invoice" ? ["INV-0012", "EST-0007", "RCP-0031", "INV-0011"] : ["", "", "", ""];
  return (
    <div aria-hidden="true" className="w-[38%] min-w-36 max-w-48 translate-y-10 rounded-[1.6rem] border border-line-strong bg-surface-3 p-1.5 shadow-raised">
      <div className="overflow-hidden rounded-[1.25rem] bg-bg">
        <div className="flex items-center justify-between px-3 pb-1 pt-2">
          <span className="font-mono text-[0.5rem] text-fg-subtle">9:41</span>
          <span className="size-1.5 rounded-full bg-surface-4" />
        </div>
        <div className="flex flex-col gap-2.5 px-3 pb-4 pt-2">
          <span className="text-[0.6875rem] font-semibold text-fg">{name}</span>
          {variant === "android-invoice" && (
            <div className="rounded-lg border border-[rgb(160_140_255/0.3)] bg-violet-soft p-2">
              <span className="block h-1 w-1/3 rounded-full bg-violet/60" />
              <span className="mt-1.5 block h-2 w-1/2 rounded-full bg-fg/70" />
            </div>
          )}
          {rows.map((label, i) => (
            <div key={i} className="flex items-center justify-between gap-2 rounded-md border border-line bg-surface-1 px-2 py-1.5">
              <div className="flex flex-col gap-1">
                {label ? (
                  <span className="font-mono text-[0.5rem] text-fg-muted">{label}</span>
                ) : (
                  <span className="h-1 w-10 rounded-full bg-surface-4" />
                )}
                <span className="h-1 w-8 rounded-full bg-surface-3" />
              </div>
              <span className={cn("h-1.5 w-6 rounded-full", i % 2 ? "bg-surface-4" : "bg-accent/60")} />
            </div>
          ))}
          <span className="ml-auto mt-1 size-6 rounded-lg bg-violet/70" />
        </div>
      </div>
    </div>
  );
}
