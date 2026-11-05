import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

/** Monogram + name. Links to the top of the page. */
export function Logo({ className }: { className?: string }) {
  return (
    <a
      href="#home"
      className={cn("group inline-flex items-center gap-3 rounded-control", className)}
      aria-label={`${profile.name}, back to top`}
    >
      <span
        aria-hidden="true"
        className="relative inline-flex size-9 items-center justify-center overflow-hidden rounded-[0.7rem] border border-line-strong bg-surface-2 font-mono text-[0.8125rem] font-semibold tracking-tight text-fg shadow-[inset_0_1px_0_rgb(255_255_255/0.06)] transition-colors duration-(--duration-base) group-hover:border-line-accent"
      >
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgb(91_140_255/0.35),transparent_65%)]" />
        <span className="relative">{profile.initials}</span>
      </span>
      <span className="hidden flex-col leading-tight sm:flex">
        <span className="text-[0.9375rem] font-semibold tracking-[-0.01em] text-fg">{profile.name}</span>
        <span className="font-mono text-[0.6875rem] text-fg-subtle">Android · Software Engineer</span>
      </span>
    </a>
  );
}
