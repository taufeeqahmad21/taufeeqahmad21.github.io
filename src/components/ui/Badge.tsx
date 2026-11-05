import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant = "default" | "accent" | "violet" | "outline" | "success" | "pending";

const variants: Record<BadgeVariant, string> = {
  default: "border-line bg-surface-2 text-fg-muted",
  accent: "border-line-accent bg-accent-soft text-accent-strong",
  violet: "border-[rgb(160_140_255/0.3)] bg-violet-soft text-violet",
  outline: "border-line-strong bg-transparent text-fg-muted",
  success: "border-[rgb(74_222_128/0.28)] bg-[rgb(74_222_128/0.08)] text-success",
  pending: "border-dashed border-line-strong bg-transparent text-fg-subtle",
};

type BadgeProps = {
  children: ReactNode;
  variant?: BadgeVariant;
  mono?: boolean;
  className?: string;
};

export function Badge({ children, variant = "default", mono = false, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs leading-none",
        mono && "font-mono tracking-tight",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
