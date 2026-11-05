import { about, sections } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section-y relative isolate border-t border-line">
      <div
        aria-hidden="true"
        className="absolute right-0 top-1/3 -z-10 h-[30rem] w-[40rem] rounded-full bg-[radial-gradient(closest-side,rgb(162_142_255/0.07),transparent)]"
      />
      <div className="container-page">
        <SectionHeading id="about-title" copy={sections.about} />

        <Reveal delay={0.05} className="mt-14 md:mt-20">
          <p className="max-w-5xl text-balance text-statement font-medium text-fg">
            {about.statement.lead}{" "}
            <span className="text-accent-serif text-fg-muted">{about.statement.accent}</span>
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-14 md:mt-20 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col gap-6 lg:col-span-5">
            {about.paragraphs.map((paragraph, i) => (
              <Reveal key={i} delay={0.05 * i}>
                <p className="text-pretty text-[1.0625rem] leading-[1.75] text-fg-muted">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <h3 className="font-mono text-eyebrow uppercase text-fg-subtle">What I focus on</h3>
            </Reveal>
            <ol className="mt-5 border-t border-line">
              {about.focusAreas.map((area, i) => (
                <Reveal as="li" key={area.title} delay={0.04 * i} className="group border-b border-line">
                  <div className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 gap-y-1.5 py-5 sm:grid-cols-[3rem_minmax(0,1fr)] sm:py-6">
                    <span className="pt-1.5 font-mono text-xs text-fg-subtle transition-colors duration-(--duration-base) group-hover:text-accent-strong">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-heading font-medium text-fg transition-transform duration-(--duration-slow) ease-(--ease-out-expo) group-hover:translate-x-1">
                      {area.title}
                    </span>
                    <span className="col-start-2 max-w-md text-sm leading-relaxed text-fg-muted">
                      {area.description}
                    </span>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
