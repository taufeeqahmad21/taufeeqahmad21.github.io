import type { ReactNode } from "react";
import { cn, isExternal, withBasePath } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "group/button relative inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-control font-medium tracking-[-0.01em] transition-[background-color,border-color,color,box-shadow,transform] duration-(--duration-base) ease-(--ease-out-expo) select-none";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.25),0_8px_24px_-10px_rgb(91_140_255/0.7)] hover:bg-[#6d99ff] hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.3),0_10px_30px_-10px_rgb(91_140_255/0.85)] active:translate-y-px",
  secondary:
    "border border-line-strong bg-surface-2/80 text-fg hover:border-[rgb(148_163_184/0.3)] hover:bg-surface-3 active:translate-y-px",
  ghost: "text-fg-muted hover:bg-surface-2 hover:text-fg",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-12 px-6 text-base",
};

const pendingStyle =
  "cursor-not-allowed border border-dashed border-line-strong bg-transparent text-fg-subtle";

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
