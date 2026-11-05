import { Globe, Play } from "lucide-react";
import type { EmploymentEntry } from "@/types/content";
import { Badge } from "@/components/ui/Badge";
import { ButtonArrow, ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/** Company monogram from the abbreviation in parentheses, e.g. "My Taxi Ride (MTR)" → "MTR". */
function monogram(company: string) {
  return company.match(/\(([^)]+)\)/)?.[1] ?? company.slice(0, 3).toUpperCase();
}

/**
 * Professional role, presented as a large editorial panel: period and company links on the
 * left, role, scope, confirmed responsibilities and stack on the right.
 */
export function EmploymentCard({ entry }: { entry: EmploymentEntry }) {
  const current = entry.endDate === null;
  const titleId = `role-${entry.id}`;

  return (
    <Reveal>
      <article
        aria-labelledby={titleId}
        className="group surface-stage relative isolate overflow-hidden transition-[border-color] duration-(--duration-slow) hover:border-line-strong"
      >
        <div
          aria-hidden="true"
          className="absolute -left-1/4 top-[-40%] -z-10 h-[90%] w-[80%] bg-[radial-gradient(closest-side,rgb(91_140_255/0.14),transparent)] opacity-80 transition-opacity duration-(--duration-image) group-hover:opacity-100"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* meta column */}
          <div className="flex flex-col gap-6 border-b border-line p-6 sm:p-10 lg:col-span-4 lg:border-b-0 lg:border-r">
            <div className="flex flex-wrap items-center gap-2">
              {current && (
                <Badge variant="success">
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-success" />
                  Current role
                </Badge>
              )}
              <Badge variant="outline">{entry.employmentType}</Badge>
            </div>

            <p className="text-heading font-medium text-fg">
              <time dateTime={entry.startDate}>{entry.startLabel}</time>
              <span className="text-fg-subtle"> – </span>
              {current ? (
                <span className="text-accent-serif text-accent-strong">Present</span>
              ) : (
                <time dateTime={entry.endDate ?? undefined}>{entry.endLabel}</time>
              )}
            </p>

            <div className="flex items-center gap-4">
              <span
                aria-hidden="true"
                className="inline-flex size-14 shrink-0 items-center justify-center rounded-2xl border border-line-strong bg-surface-2 font-mono text-sm font-semibold tracking-tight text-fg"
              >
                {monogram(entry.company)}
              </span>
              <p className="text-[0.9375rem] leading-snug text-fg-muted">{entry.company}</p>
            </div>

            <div className="mt-auto flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap lg:flex-col">
              {entry.links.map((link) => (
                <ButtonLink
                  key={link.href}
                  href={link.href}
                  variant="secondary"
                  size="md"
                  icon={
                    link.kind === "google-play" ? (
                      <Play className="size-4 fill-current" aria-hidden="true" />
                    ) : (
                      <Globe className="size-4" aria-hidden="true" />
                    )
                  }
                  trailingIcon={<ButtonArrow direction="up-right" />}
                  className="justify-between lg:w-full"
                >
                  {link.label}
                </ButtonLink>
              ))}
            </div>
          </div>

          {/* role column */}
          <div className="flex flex-col gap-8 p-6 sm:p-10 lg:col-span-8">
            <div className="flex flex-col gap-3">
              <h4 id={titleId} className="text-showcase font-semibold text-fg">
                {entry.role}
              </h4>
              <p className="text-lead text-fg-muted">
                <span className="text-accent-serif">at</span> {entry.company}
              </p>
            </div>

            <p className="max-w-2xl text-pretty text-[1.0625rem] leading-relaxed text-fg">{entry.summary}</p>

            <div className="flex flex-col gap-4">
              <p className="font-mono text-eyebrow uppercase text-fg-subtle">Responsibilities</p>
              <ol className="grid grid-cols-1 border-t border-line md:grid-cols-2 md:gap-x-10">
                {entry.responsibilities.map((item, i) => (
                  <li key={item} className="flex items-baseline gap-4 border-b border-line py-4">
                    <span className="font-mono text-xs text-fg-subtle">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[0.9375rem] leading-snug text-fg">{item}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex flex-col gap-3">
              <p className="font-mono text-eyebrow uppercase text-fg-subtle">Technology</p>
              <ul className="flex flex-wrap gap-2" aria-label="Technologies">
                {entry.technologies.map((tech) => (
                  <li key={tech}>
                    <Badge variant="outline" mono>
                      {tech}
                    </Badge>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
