import { SectionHeading } from '../components/ui/SectionHeading';
import { timeline } from '../data/timeline';
import { Timeline } from '../components/ui/Timeline';

const ExperienceSection: React.FC = () => (
  <section id="experience" className="section-padding relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.08),transparent_60%)]" />
    <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12">
      <SectionHeading
        eyebrow="Experience & Education"
        title="Learning in public. Delivering in production."
        description="Timelines of research, internships, and leadership moments that shaped my craft."
      />
      <Timeline items={timeline} />
    </div>
  </section>
);

export default ExperienceSection;

