import { ArrowUpRight, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { sections } from "@/data/site";
import { cn } from "@/lib/utils";
import { ButtonArrow, ButtonLink } from "@/components/ui/Button";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";

const channels = [
  { key: "email", Icon: Mail, value: profile.email, fallback: "Email address coming soon" },
  { key: "linkedin", Icon: LinkedInIcon, value: profile.socials.linkedin.href, fallback: "Profile link coming soon" },
  { key: "github", Icon: GitHubIcon, value: profile.socials.github.href, fallback: "Profile link coming soon" },
] as const;

/** Strip the scheme and add break opportunities before "@" and after "/", so long values wrap cleanly. */
function displayValue(value: string) {
  const text = value.replace(/^mailto:/, "").replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
  return text.split(/(?=@)|(?<=\/)/).map((part, i) => (
    <span key={i}>
      {i > 0 && <wbr />}
      {part}
    </span>
  ));
}

export function Contact() {
  const copy = sections.contact;
  const mailto = profile.socials.email.href;

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative isolate overflow-hidden border-t border-line">
      {/* atmosphere: light rising from below the fold */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_50%_100%,black_20%,transparent_75%)]" />
      <div
        aria-hidden="true"
        className="absolute bottom-[-24rem] left-1/2 -z-10 h-[44rem] w-[80rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(91_140_255/0.2),rgb(162_142_255/0.08)_55%,transparent)]"
      />

      <div className="container-page section-y">
        <Reveal>
          <p className="flex items-center gap-4 font-mono text-eyebrow uppercase text-fg-subtle">
            <span className="text-accent-strong">{copy.index}</span>
            <span>{copy.eyebrow}</span>
            <span aria-hidden="true" className="rule-fade flex-1" />
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 id="contact-title" className="mt-10 max-w-[16ch] text-balance text-mega font-semibold text-fg md:mt-14">
            {copy.title} <span className="text-accent-serif text-gradient pr-[0.06em]">{copy.accent}</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-14 md:mt-20 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col items-start gap-8 lg:col-span-7 lg:min-w-0">
            <Reveal delay={0.05}>
              <p className="max-w-xl text-pretty text-lead text-fg-muted">{copy.description}</p>
            </Reveal>

            {profile.email && mailto && (
              <Reveal delay={0.1}>
                <a
                  href={mailto}
                  className="group inline-flex max-w-full items-center gap-3 text-[clamp(1.25rem,0.75rem+2vw,2.5rem)] font-medium tracking-[-0.03em] text-fg"
                >
                  <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-(--duration-image) ease-(--ease-out-expo) group-hover:bg-[length:100%_2px]">
                    {/* break only at the "@", never mid-word */}
                    {profile.email.split("@")[0]}
                    <wbr />@{profile.email.split("@")[1]}
                  </span>
                  <ArrowUpRight
                    className="size-[0.8em] shrink-0 text-fg-muted transition-[transform,color] duration-(--duration-slow) ease-(--ease-out-expo) group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent-strong"
                    aria-hidden="true"
                  />
                </a>
              </Reveal>
            )}

            <Reveal delay={0.15} className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <ButtonLink
                href={mailto}
                size="lg"
                icon={<Mail className="size-4" aria-hidden="true" />}
                trailingIcon={<ButtonArrow />}
                pendingLabel="Email address not added yet"
              >
                Send an email
              </ButtonLink>
              <ButtonLink
                href={profile.socials.linkedin.href}
                size="lg"
                variant="secondary"
                icon={<LinkedInIcon className="size-4" />}
                pendingLabel="LinkedIn link not added yet"
              >
                Connect on LinkedIn
              </ButtonLink>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8 xl:col-span-4 xl:col-start-9">
            <div className="flex flex-col gap-5">
              <p
                className={cn(
                  "inline-flex items-start gap-3 rounded-card border p-4 text-sm leading-snug",
                  profile.availability.isPlaceholder
                    ? "border-dashed border-line-strong text-fg-subtle"
                    : "border-[rgb(74_222_128/0.22)] bg-success-soft text-fg",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-1.5 size-2 shrink-0 rounded-full",
                    profile.availability.isPlaceholder ? "bg-fg-subtle/60" : "animate-pulse-dot bg-success",
                  )}
                />
                {profile.availability.label}
              </p>

              <ul className="flex flex-col divide-y divide-line rounded-card border border-line bg-bg/50 backdrop-blur">
                {channels.map(({ key, Icon, value, fallback }) => {
                  const label = profile.socials[key].label;
                  const href = key === "email" ? mailto : value;
                  const inner = (
                    <>
                      <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-line bg-surface-2 text-fg-muted transition-colors duration-(--duration-base) group-hover:border-line-accent group-hover:text-accent-strong">
                        <Icon className="size-4" aria-hidden="true" />
                      </span>
                      <span className="flex min-w-0 flex-1 flex-col">
                        <span className="text-xs text-fg-subtle">{label}</span>
                        <span className={cn("text-sm break-words", value ? "text-fg" : "text-fg-subtle")}>
                          {value ? displayValue(value) : fallback}
                        </span>
                      </span>
                    </>
                  );
                  return (
                    <li key={key}>
                      {href ? (
                        <a
                          href={href}
                          className="group flex items-center gap-4 px-5 py-4 transition-colors duration-(--duration-base) hover:bg-surface-2/60"
                          {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        >
                          {inner}
                          <ArrowUpRight
                            className="size-4 shrink-0 text-fg-subtle transition-transform duration-(--duration-base) group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
                            aria-hidden="true"
                          />
                          {href.startsWith("http") && <span className="sr-only"> (opens in a new tab)</span>}
                        </a>
                      ) : (
                        <div className="flex items-center gap-4 px-5 py-4">{inner}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
