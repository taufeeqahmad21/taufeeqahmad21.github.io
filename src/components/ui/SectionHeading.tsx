import type { SectionCopy } from "@/types/content";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  copy: SectionCopy;
  id: string;
  className?: string;
  /** Put the description beside the title on large screens instead of below it. */
  split?: boolean;
};

/** Editorial section opener: index + eyebrow on a hairline, then a large title with a serif accent. */
export function SectionHeading({ copy, id, className, split = false }: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-8 md:gap-10", className)}>
      <Reveal>
        <p className="flex items-center gap-4 font-mono text-eyebrow uppercase text-fg-subtle">
          <span className="text-accent-strong">{copy.index}</span>
          <span>{copy.eyebrow}</span>
          <span aria-hidden="true" className="rule-fade flex-1" />
        </p>
      </Reveal>
      <div className={cn("flex flex-col gap-6", split && "lg:flex-row lg:items-end lg:justify-between lg:gap-16")}>
        <Reveal delay={0.05}>
          <h2 id={id} className="max-w-4xl text-balance text-title font-semibold text-fg">
            {copy.title}
            {copy.accent && (
              <>
                {" "}
                <span className="text-accent-serif text-fg-muted">{copy.accent}</span>
              </>
            )}
          </h2>
        </Reveal>
        {copy.description && (
          <Reveal delay={0.1} className={cn(split && "lg:max-w-sm lg:pb-2")}>
            <p className="max-w-2xl text-pretty text-lead text-fg-muted">{copy.description}</p>
          </Reveal>
        )}
      </div>
    </div>
  );
}
