import type { ReactNode } from "react";
import Image, { type StaticImageData } from "next/image";
import { Camera } from "lucide-react";
import type { ProjectPreview, ProjectScreenshot } from "@/types/content";
import { cn } from "@/lib/utils";

/**
 * Caption chip that says what the visual is. Real screenshots get a camera icon and a
 * brighter chip; code-drawn mockups are always labelled as such so the two can't be confused.
 */
export function MediaCaption({ children, real = false, className }: { children: ReactNode; real?: boolean; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border bg-bg/80 px-2.5 py-1 font-mono text-[0.6875rem] backdrop-blur",
        real ? "border-line-strong text-fg" : "border-line text-fg-muted",
        className,
      )}
    >
      {real && <Camera className="size-3.5" aria-hidden="true" />}
      {children}
    </span>
  );
}

/**
 * Store screenshots as a row of phones. On small screens it's a swipeable strip (with the
 * next screenshot peeking in); from lg up all screenshots sit in one staggered row.
 */
export function ScreenshotGallery({ images, label }: { images: ProjectScreenshot[]; label: string }) {
  return (
    <ul
      aria-label={label}
      className="scroll-strip -mx-5 flex gap-4 px-5 pb-2 sm:-mx-10 sm:gap-5 sm:px-10 lg:mx-0 lg:justify-center lg:gap-6 lg:overflow-visible lg:px-0"
    >
      {images.map((image, i) => (
        <li
          key={image.alt}
          className={cn(
            "relative aspect-[3/4] w-[58%] shrink-0 snap-center overflow-hidden rounded-2xl border border-line-strong bg-surface-2 shadow-raised transition-transform duration-(--duration-image) ease-(--ease-out-expo) sm:w-[34%] lg:w-[17.5%]",
            // Odd screenshots sit lower for a staggered row; every screenshot lifts 8px on hover.
            i % 2 === 1 ? "lg:translate-y-8 lg:hover:translate-y-6" : "lg:hover:-translate-y-2",
          )}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 210px, (min-width: 640px) 34vw, 58vw"
            className="object-cover"
          />
        </li>
      ))}
    </ul>
  );
}

/* Website screenshot in a minimal browser frame. The image eases in slightly on stage hover. */
export function BrowserShot({ src, alt, url }: { src: StaticImageData; alt: string; url: string }) {
  return (
    <div className="overflow-hidden rounded-t-2xl border border-b-0 border-line-strong bg-surface-1 shadow-raised">
      <div className="flex items-center gap-3 border-b border-line px-4 py-2.5">
        <div aria-hidden="true" className="flex gap-1.5">
          <span className="size-2 rounded-full bg-surface-4" />
          <span className="size-2 rounded-full bg-surface-4" />
          <span className="size-2 rounded-full bg-surface-4" />
        </div>
        <span className="mx-auto hidden max-w-xs flex-1 truncate rounded-full border border-line bg-surface-2 px-3 py-1 text-center font-mono text-[0.6875rem] text-fg-subtle sm:block">
          {url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
        </span>
        <span aria-hidden="true" className="hidden w-[2.625rem] sm:block" />
      </div>
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1280px) 1100px, 92vw"
          className="object-cover object-top transition-transform duration-(--duration-image) ease-(--ease-out-expo) group-hover:scale-[1.015]"
        />
      </div>
    </div>
  );
}

/* ---------- Code-drawn mockups (used until real screenshots exist) ---------- */

export function Mockup({ variant, name }: { variant: Extract<ProjectPreview, { kind: "mockup" }>["variant"]; name: string }) {
  if (variant === "web-tools") return <WebToolsMockup name={name} />;
  return <PhoneMockup name={name} variant={variant} />;
}

/* Browser window with a grid of tool tiles. */
function WebToolsMockup({ name }: { name: string }) {
  const tiles = ["bg-accent/70", "bg-violet/60", "bg-surface-4", "bg-surface-4", "bg-accent/40", "bg-surface-4"];
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
    <div aria-hidden="true" className="w-[42%] min-w-36 max-w-52 translate-y-10 rounded-[1.6rem] border border-line-strong bg-surface-3 p-1.5 shadow-raised">
      <div className="overflow-hidden rounded-[1.25rem] bg-bg">
        <div className="flex items-center justify-between px-3 pb-1 pt-2">
          <span className="font-mono text-[0.5rem] text-fg-subtle">9:41</span>
          <span className="size-1.5 rounded-full bg-surface-4" />
        </div>
        <div className="flex flex-col gap-2.5 px-3 pb-4 pt-2">
          <span className="text-[0.6875rem] font-semibold text-fg">{name}</span>
          {variant === "android-invoice" && (
            <div className="rounded-lg border border-[rgb(162_142_255/0.3)] bg-violet-soft p-2">
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
