import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn, isExternal, withBasePath } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

/*
 * Buttons share one shape language: rounded-full pills, a 1px highlight on top, and a
 * gentle press (scale 0.98). Use <ButtonArrow/> as `trailingIcon` for the hover nudge.
 */
const base =
  "group/button relative isolate inline-flex shrink-0 items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full font-medium tracking-[-0.01em] transition-[background-color,border-color,color,box-shadow,transform] duration-(--duration-base) ease-(--ease-out-expo) select-none active:scale-[0.98]";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.28),0_10px_28px_-12px_rgb(91_140_255/0.8)] hover:bg-[#6a97ff] hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.32),0_14px_36px_-12px_rgb(91_140_255/0.95)] before:absolute before:inset-y-0 before:-left-1/2 before:-z-10 before:w-1/3 before:skew-x-[-20deg] before:bg-white/20 before:opacity-0 before:transition-[left,opacity] before:duration-(--duration-image) before:ease-(--ease-out-expo) hover:before:left-[120%] hover:before:opacity-100",
  secondary:
    "border border-line-strong bg-surface-2/70 text-fg shadow-[inset_0_1px_0_rgb(255_255_255/0.05)] hover:border-[rgb(148_163_184/0.32)] hover:bg-surface-3",
  ghost: "text-fg-muted hover:bg-surface-2 hover:text-fg",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-13 px-7 text-base",
};

const pendingStyle =
  "cursor-not-allowed border border-dashed border-line-strong bg-transparent text-fg-subtle active:scale-100";

type ButtonLinkProps = {
  /** `null` renders a non-interactive "pending" button instead of a broken link. */
  href: string | null;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  /** Icon placed after the label. */
  trailingIcon?: ReactNode;
  /** Screen-reader / tooltip text explaining why the link is unavailable. */
  pendingLabel?: string;
  download?: boolean;
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  icon,
  trailingIcon,
  pendingLabel = "Not available yet",
  download,
  className,
}: ButtonLinkProps) {
  if (!href) {
    return (
      <span
        className={cn(base, sizes[size], pendingStyle, className)}
        title={pendingLabel}
        aria-disabled="true"
      >
        {icon}
        {children}
        <span className="sr-only"> ({pendingLabel})</span>
      </span>
    );
  }

  const external = isExternal(href);
  return (
    <a
      href={withBasePath(href)}
      className={cn(base, sizes[size], variants[variant], className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...(download ? { download: "" } : {})}
    >
      {icon}
      {children}
      {trailingIcon}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}

/** Arrow that nudges in its direction when the parent button is hovered. */
export function ButtonArrow({ direction = "right" }: { direction?: "right" | "up-right" }) {
  return direction === "right" ? (
    <ArrowRight
      className="size-4 transition-transform duration-(--duration-base) ease-(--ease-out-expo) group-hover/button:translate-x-0.5"
      aria-hidden="true"
    />
  ) : (
    <ArrowUpRight
      className="size-4 transition-transform duration-(--duration-base) ease-(--ease-out-expo) group-hover/button:-translate-y-0.5 group-hover/button:translate-x-0.5"
      aria-hidden="true"
    />
  );
}
