import { ArrowUpRight, BookMarked } from "lucide-react";
import { githubHandle, githubProfile, repositories } from "@/data/github";
import { profile } from "@/data/profile";
import { sections } from "@/data/site";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { GitHubIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function GitHub() {
  return (
    <section id="github" aria-labelledby="github-title" className="section-y border-t border-line">
      <div className="container-page">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading id="github-title" copy={sections.github} />
          <Reveal delay={0.05}>
            <ButtonLink
              href={githubProfile.href}
              variant="secondary"
              icon={<GitHubIcon className="size-4" />}
              trailingIcon={<ArrowUpRight className="size-4" aria-hidden="true" />}
              pendingLabel="GitHub profile link coming soon"
            >
              View GitHub profile
            </ButtonLink>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-[0.9fr_2fr]">
          {/* profile card */}
          <Reveal>
            <Card className="flex h-full flex-col gap-6 p-6 sm:p-7">
              <div className="flex items-center gap-4">
                <span className="inline-flex size-14 items-center justify-center rounded-full border border-line-strong bg-surface-2 font-mono text-base font-semibold text-fg">
                  {profile.initials}
                </span>
                <div className="flex min-w-0 flex-col gap-1">
                  <p className="font-semibold text-fg">{profile.name}</p>
                  <p className={cn("truncate font-mono text-xs", githubHandle ? "text-fg-muted" : "text-fg-subtle")}>
                    {githubHandle ?? "github.com/… (username pending)"}
                  </p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-fg-muted">
                Android apps, web platforms and the experiments in between. Repositories are listed
                here once they&apos;re public.
              </p>
            </Card>
          </Reveal>

          {/* repositories */}
          <ul className="grid gap-4 sm:grid-cols-2">
            {repositories.map((repo, i) => {
              const content = (
                <>
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex min-w-0 items-center gap-2.5 font-mono text-sm text-fg">
                      <BookMarked className="size-4 shrink-0 text-fg-subtle" aria-hidden="true" />
                      <span className="truncate">{repo.name}</span>
                    </span>
                    {repo.href ? (
                      <ArrowUpRight
                        className="size-4 shrink-0 text-fg-subtle transition-transform duration-(--duration-base) group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
                        aria-hidden="true"
                      />
                    ) : (
                      <Badge variant="pending">Not yet public</Badge>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed text-fg-muted">{repo.description}</p>
                  {repo.language && (
                    <p className="mt-auto inline-flex items-center gap-2 text-xs text-fg-subtle">
                      <span aria-hidden="true" className="size-2.5 rounded-full bg-accent" />
                      {repo.language}
                    </p>
                  )}
                </>
              );
              const box = "group flex h-full flex-col gap-4 p-6";
              return (
                <Reveal as="li" key={repo.name} delay={0.06 * (i + 1)} className="h-full">
                  {repo.href ? (
                    <a
                      href={repo.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        box,
                        "surface-card transition-[border-color,transform] duration-(--duration-slow) ease-(--ease-out-expo) hover:-translate-y-0.5 hover:border-line-strong",
                      )}
                    >
                      {content}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ) : (
                    <div className={cn(box, "surface-card")}>{content}</div>
                  )}
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
