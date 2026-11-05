import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type CardVariant = "default" | "interactive" | "raised" | "placeholder";

const variants: Record<CardVariant, string> = {
  default: "surface-card",
  interactive:
    "surface-card transition-[border-color,transform,background-color] duration-(--duration-slow) ease-(--ease-out-expo) hover:-translate-y-0.5 hover:border-line-strong",
  raised: "surface-card shadow-raised border-line-strong",
  placeholder: "rounded-card border border-dashed border-line-strong bg-transparent",
};

type CardProps = {
  as?: ElementType;
  variant?: CardVariant;
  className?: string;
  children: ReactNode;
};

export function Card({ as: Component = "div", variant = "default", className, children }: CardProps) {
  return <Component className={cn(variants[variant], className)}>{children}</Component>;
}
