import { ArrowDown, ArrowRight } from "lucide-react";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { HeroVisual } from "@/components/hero/HeroVisual";

function Headline({ text, accent }: { text: string; accent?: string }) {
  const at = accent ? text.indexOf(accent) : -1;
  if (!accent || at === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <span className="font-serif font-normal italic tracking-[-0.015em] text-gradient">{accent}</span>
      {text.slice(at + accent.length)}
    </>
  );
}

export function Hero() {
  const { availability, socials } = profile;

  return (
    <section id="home" aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      {/* background: engineering grid + a single, restrained light source */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid" />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[-18rem] -z-10 h-[36rem] w-[64rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(91_140_255/0.14),rgb(160_140_255/0.05)_55%,transparent)]"
      />

      <div className="container-page grid min-h-[100svh] items-center gap-16 pb-24 pt-32 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:pb-20 lg:pt-28">
        <div className="flex flex-col items-start">
          <Reveal onMount>
            <p
              className={cn(
                "inline-flex items-center gap-2.5 rounded-full border px-3 py-1.5 text-xs",
                availability.isPlaceholder
                  ? "border-dashed border-line-strong text-fg-subtle"
                  : "border-line bg-surface-1/80 text-fg-muted",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "size-2 rounded-full",
                  availability.isPlaceholder ? "bg-fg-subtle/60" : "animate-pulse-dot bg-success",
                )}
              />
              {availability.label}
            </p>
          </Reveal>

          <Reveal onMount delay={0.05}>
            <p className="mt-8 font-mono text-sm text-fg-subtle">
              <span className="text-accent-strong">{profile.name}</span>
              <span aria-hidden="true"> / </span>
              <span className="sr-only">, </span>
              {profile.title}
            </p>
          </Reveal>

          <Reveal onMount delay={0.1}>
            <h1
              id="hero-title"
              className="mt-5 max-w-[14ch] text-balance text-display font-semibold text-fg"
            >
              <Headline text={profile.headline} accent={profile.headlineAccent} />
            </h1>
          </Reveal>

          <Reveal onMount delay={0.15}>
            <p className="mt-7 max-w-xl text-pretty text-lead text-fg-muted">{profile.intro}</p>
          </Reveal>

          <Reveal onMount delay={0.2} className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <ButtonLink
              href="#projects"
              size="lg"
              trailingIcon={
                <ArrowRight
                  className="size-4 transition-transform duration-(--duration-base) group-hover/button:translate-x-0.5"
                  aria-hidden="true"
                />
              }
            >
              View Projects
            </ButtonLink>
            <ButtonLink href="#contact" size="lg" variant="secondary">
              Contact Me
            </ButtonLink>
          </Reveal>

          <Reveal onMount delay={0.25} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            {[
              { link: socials.github, Icon: GitHubIcon },
              { link: socials.linkedin, Icon: LinkedInIcon },
            ].map(({ link, Icon }) =>
              link.href ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-control text-sm text-fg-muted transition-colors duration-(--duration-base) hover:text-fg"
                >
                  <Icon className="size-4" />
                  {link.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : (
                <span
                  key={link.label}
                  className="inline-flex items-center gap-2 text-sm text-fg-subtle"
                  title={`${link.label} profile link coming soon`}
                >
                  <Icon className="size-4 opacity-60" />
                  {link.label}
                  <span className="rounded-full border border-dashed border-line-strong px-2 py-0.5 font-mono text-[0.625rem]">
                    link pending
                  </span>
                </span>
              ),
            )}
          </Reveal>
        </div>

        <Reveal onMount delay={0.2} className="pb-10 lg:pb-0">
          <HeroVisual />
        </Reveal>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-fg-subtle transition-colors hover:text-fg lg:inline-flex"
      >
        <ArrowDown className="size-3.5" aria-hidden="true" />
        Scroll
      </a>
    </section>
  );
}
