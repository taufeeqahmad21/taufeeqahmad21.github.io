import { ArrowUpRight, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { sections } from "@/data/site";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";

const channels = [
  { key: "email", Icon: Mail, value: profile.email, fallback: "Email address coming soon" },
  { key: "linkedin", Icon: LinkedInIcon, value: profile.socials.linkedin.href, fallback: "Profile link coming soon" },
  { key: "github", Icon: GitHubIcon, value: profile.socials.github.href, fallback: "Profile link coming soon" },
] as const;

function displayValue(value: string) {
  return value.replace(/^mailto:/, "").replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

export function Contact() {
  const copy = sections.contact;
  const mailto = profile.socials.email.href;

  return (
    <section id="contact" aria-labelledby="contact-title" className="section-y border-t border-line">
      <div className="container-page">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-panel border border-line-strong bg-surface-1 px-6 py-14 shadow-raised sm:px-12 sm:py-20 lg:px-16">
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid opacity-60" />
            <div
              aria-hidden="true"
              className="absolute -top-40 left-1/2 -z-10 h-80 w-[48rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(91_140_255/0.16),transparent)]"
            />

            <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.25fr_1fr] lg:items-end lg:gap-16">
              <div className="flex flex-col items-start gap-6">
                <p className="flex items-center gap-3 font-mono text-eyebrow uppercase text-fg-subtle">
                  <span className="text-accent-strong">{copy.index}</span>
                  <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
                  {copy.eyebrow}
                </p>
                <h2 id="contact-title" className="max-w-xl text-balance text-title font-semibold text-fg">
                  {copy.title}{" "}
                  <span className="font-serif font-normal italic tracking-[-0.01em] text-fg-muted">{copy.accent}</span>
                </h2>
                <p className="max-w-lg text-pretty text-lead text-fg-muted">{copy.description}</p>
                <div className="mt-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                  <ButtonLink
                    href={mailto}
                    size="lg"
                    icon={<Mail className="size-4" aria-hidden="true" />}
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
                </div>
              </div>

              <ul className="flex flex-col divide-y divide-line rounded-card border border-line bg-bg/40">
                {channels.map(({ key, Icon, value, fallback }) => {
                  const label = profile.socials[key].label;
                  const href = key === "email" ? mailto : value;
                  const inner = (
                    <>
                      <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-control border border-line bg-surface-2 text-fg-muted">
                        <Icon className="size-4" aria-hidden="true" />
                      </span>
                      <span className="flex min-w-0 flex-1 flex-col">
                        <span className="text-xs text-fg-subtle">{label}</span>
                        <span className={cn("text-sm [overflow-wrap:anywhere]", value ? "text-fg" : "text-fg-subtle")}>
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
                            className="size-4 text-fg-subtle transition-transform duration-(--duration-base) group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
                            aria-hidden="true"
                          />
                        </a>
                      ) : (
                        <div className="flex items-center gap-4 px-5 py-4">{inner}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
