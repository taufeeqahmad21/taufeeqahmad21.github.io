import type { SectionCopy } from "@/types/content";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  copy: SectionCopy;
  id: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({ copy, id, align = "left", className }: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <p className="flex items-center gap-3 font-mono text-eyebrow uppercase text-fg-subtle">
        <span className="text-accent-strong">{copy.index}</span>
        <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
        {copy.eyebrow}
      </p>
      <h2 id={id} className="max-w-3xl text-balance text-title font-semibold text-fg">
        {copy.title}
        {copy.accent && (
          <>
            {" "}
            <span className="font-serif font-normal italic tracking-[-0.01em] text-fg-muted">
              {copy.accent}
            </span>
          </>
        )}
      </h2>
      {copy.description && (
        <p className="max-w-2xl text-pretty text-lead text-fg-muted">{copy.description}</p>
      )}
    </Reveal>
  );
}
