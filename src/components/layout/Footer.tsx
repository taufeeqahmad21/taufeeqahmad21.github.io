import { navItems } from "@/data/site";
import { profile } from "@/data/profile";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { CurrentYear } from "./CurrentYear";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-page flex flex-col gap-10 py-12 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-4">
          <Logo />
          <p className="max-w-xs text-sm text-fg-subtle">
            {profile.title}. {profile.secondaryExpertise}.
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-10 gap-y-2.5 sm:grid-cols-3">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="text-sm text-fg-muted transition-colors duration-(--duration-base) hover:text-fg"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col-reverse items-start justify-between gap-4 py-6 sm:flex-row sm:items-center">
          <p className="font-mono text-xs text-fg-subtle">
            © <CurrentYear /> {profile.name}. All rights reserved.
          </p>
          <SocialLinks className="-ml-2 sm:ml-0 sm:-mr-2" />
        </div>
      </div>
    </footer>
  );
}
