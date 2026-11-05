import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

/** "TA." wordmark (+ name on wider screens). Links to the top of the page. */
export function Logo({ className, showName = true }: { className?: string; showName?: boolean }) {
  return (
    <a
      href="#home"
      className={cn("group inline-flex items-center gap-3 rounded-full", className)}
      aria-label={`${profile.name}, back to top`}
    >
      <span
        aria-hidden="true"
        className="inline-flex h-10 items-baseline rounded-full px-1 text-[1.375rem] font-semibold leading-10 tracking-[-0.05em] text-fg"
      >
        {profile.initials}
        <span className="text-accent transition-colors duration-(--duration-base) group-hover:text-violet">.</span>
      </span>
      {showName && (
        <span
          aria-hidden="true"
          className="hidden border-l border-line-strong pl-3 text-sm text-fg-muted transition-colors duration-(--duration-base) group-hover:text-fg md:inline"
        >
          {profile.name}
        </span>
      )}
    </a>
  );
}
