import { employment } from "@/data/experience";
import { sections } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EmploymentCard } from "@/components/experience/EmploymentCard";

/** Professional employment, most recent first. Independent products live in the Work section. */
export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="section-y border-t border-line">
      <div className="container-page">
        <SectionHeading id="experience-title" copy={sections.experience} split />

        <div className="mt-14 flex flex-col gap-8 md:mt-20 lg:gap-10">
          {employment.map((entry) => (
            <EmploymentCard key={entry.id} entry={entry} />
          ))}
        </div>
      </div>
    </section>
  );
}
