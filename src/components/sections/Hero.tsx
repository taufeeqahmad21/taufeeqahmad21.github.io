import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";
import { ButtonArrow, ButtonLink } from "@/components/ui/Button";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedHeadline } from "@/components/hero/AnimatedHeadline";
import { HeroVisual } from "@/components/hero/HeroVisual";

export function Hero() {
  const { availability, socials } = profile;
  const profileLinks = [
    { link: socials.github, Icon: GitHubIcon },
    { link: socials.linkedin, Icon: LinkedInIcon },
  ];

  return (
    <section id="home" aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      {/* atmosphere: engineering grid, a cool key light and a violet fill */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid" />
      <div
        aria-hidden="true"
        className="absolute -left-40 top-[-20rem] -z-10 h-[44rem] w-[64rem] rounded-full bg-[radial-gradient(closest-side,rgb(91_140_255/0.16),transparent)]"
      />
      <div
        aria-hidden="true"
        className="absolute -right-40 bottom-[-12rem] -z-10 h-[36rem] w-[48rem] rounded-full bg-[radial-gradient(closest-side,rgb(162_142_255/0.09),transparent)]"
      />

      <div className="container-page flex min-h-[100svh] flex-col justify-center pb-20 pt-32 sm:pt-36 lg:pb-24 lg:pt-40">
        <Reveal onMount className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <p
            className={cn(
              "inline-flex items-center gap-2.5 rounded-full border px-3.5 py-1.5 text-xs sm:text-[0.8125rem]",
              availability.isPlaceholder
                ? "border-dashed border-line-strong text-fg-subtle"
                : "border-line bg-surface-1/80 text-fg-muted",
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "size-2 shrink-0 rounded-full",
                availability.isPlaceholder ? "bg-fg-subtle/60" : "animate-pulse-dot bg-success",
              )}
            />
            {availability.label}
          </p>
          <p className="font-mono text-xs text-fg-subtle">
            <span className="text-fg-muted">{profile.name}</span>
            <span aria-hidden="true"> — </span>
            <span className="sr-only">, </span>
            {profile.title}
          </p>
        </Reveal>

        <h1
          id="hero-title"
          className="mt-8 max-w-[15ch] text-balance text-display font-semibold text-fg sm:mt-10"
        >
          <AnimatedHeadline text={profile.headline} accents={profile.headlineAccents} />
        </h1>

        <div className="mt-12 grid grid-cols-1 items-end gap-14 lg:mt-16 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
          <div className="flex flex-col items-start">
            <Reveal onMount delay={0.45}>
              <p className="max-w-xl text-pretty text-lead text-fg-muted">{profile.intro}</p>
            </Reveal>

            <Reveal onMount delay={0.55} className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <ButtonLink href="#work" size="lg" trailingIcon={<ButtonArrow />}>
                View Selected Work
              </ButtonLink>
              <ButtonLink href="#contact" size="lg" variant="secondary">
                Contact Me
              </ButtonLink>
            </Reveal>

            <Reveal onMount delay={0.65} className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3">
              {profileLinks.map(({ link, Icon }) =>
                link.href ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex min-h-11 items-center gap-2.5 rounded-control text-sm text-fg-muted transition-colors duration-(--duration-base) hover:text-fg"
                  >
                    <Icon className="size-4" />
                    <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-(--duration-slow) ease-(--ease-out-expo) group-hover:bg-[length:100%_1px]">
                      {link.label}
                    </span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : (
                  <span
                    key={link.label}
                    className="inline-flex items-center gap-2 text-sm text-fg-subtle"
                    title={`${link.label} profile link coming soon`}
                  >
                    <Icon className="size-4 opacity-60" />
                    {link.label} (link pending)
                  </span>
                ),
              )}
            </Reveal>
          </div>

          <Reveal onMount delay={0.5} className="pt-6 sm:pt-12 lg:pt-0">
            <HeroVisual />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
