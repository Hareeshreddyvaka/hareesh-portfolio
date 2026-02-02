import { SectionHeading } from '../components/ui/SectionHeading';
import { projects } from '../data/projects';
import { ProjectCard } from '../components/ui/ProjectCard';

const ProjectsSection: React.FC = () => (
  <section id="projects" className="section-padding relative overflow-hidden bg-surface-dark">
    {/* Background Elements */}
    <div className="absolute inset-0 bg-grid opacity-20" />
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-96 bg-primary-900/20 blur-[120px] rounded-full pointer-events-none" />

    <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-20">
      <SectionHeading
        eyebrow="Selected Work"
        title="Engineering Intelligence"
        description="A collection of production-ready systems bridging the gap between research and real-world application."
      />

      <div className="grid gap-8 md:grid-cols-2 lg:gap-10">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </div>
  </section>
);

export default ProjectsSection;

