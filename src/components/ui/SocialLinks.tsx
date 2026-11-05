import { profile } from "@/data/profile";
import type { SocialKey } from "@/types/content";
import { cn } from "@/lib/utils";
import { socialIcons } from "./Icons";

type SocialLinksProps = {
  keys?: SocialKey[];
  className?: string;
};

/** Icon-only social links. Unverified links render as dimmed, non-interactive icons. */
export function SocialLinks({ keys = ["github", "linkedin", "email"], className }: SocialLinksProps) {
  return (
    <ul className={cn("flex items-center gap-1", className)}>
      {keys.map((key) => {
        const link = profile.socials[key];
        const Icon = socialIcons[key];
        const iconEl = <Icon className="size-[18px]" />;
        const box = "inline-flex size-10 items-center justify-center rounded-control";
        return (
          <li key={key}>
            {link.href ? (
              <a
                href={link.href}
                className={cn(
                  box,
                  "text-fg-muted transition-colors duration-(--duration-base) hover:bg-surface-2 hover:text-fg",
                )}
                aria-label={link.label}
                {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {iconEl}
              </a>
            ) : (
              <span
                className={cn(box, "cursor-not-allowed text-fg-subtle/60")}
                title={`${link.label} link coming soon`}
              >
                {iconEl}
                <span className="sr-only">{link.label} (link coming soon)</span>
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
