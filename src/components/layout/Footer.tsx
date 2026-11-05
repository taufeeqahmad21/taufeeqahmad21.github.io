import { navItems } from "@/data/site";
import { profile } from "@/data/profile";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { CurrentYear } from "./CurrentYear";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-line">
      <div className="container-page flex flex-col gap-10 pb-10 pt-14 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-4">
          <Logo showName={false} />
          <p className="max-w-xs text-sm leading-relaxed text-fg-subtle">
            {profile.title}. {profile.secondaryExpertise}.
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-12 gap-y-1 sm:grid-cols-3">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="inline-flex min-h-10 items-center text-sm text-fg-muted transition-colors duration-(--duration-base) hover:text-fg"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* oversized wordmark, decorative */}
      <div aria-hidden="true" className="container-page select-none overflow-hidden">
        <p className="whitespace-nowrap bg-[linear-gradient(180deg,rgb(236_239_245/0.09),rgb(236_239_245/0))] bg-clip-text pb-[0.14em] text-[clamp(3rem,10.5vw,9.5rem)] font-semibold leading-[0.9] tracking-[-0.055em] text-transparent">
          {profile.name}
        </p>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col-reverse items-start justify-between gap-4 py-6 sm:flex-row sm:items-center">
          <p className="font-mono text-xs text-fg-subtle">
            © <CurrentYear /> {profile.name}. Built with Next.js, hosted on GitHub Pages.
          </p>
          <SocialLinks className="-ml-2 sm:-mr-2 sm:ml-0" />
        </div>
      </div>
    </footer>
  );
}
