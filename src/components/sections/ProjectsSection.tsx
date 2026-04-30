import { usePortfolioData } from '../../hooks/usePortfolioData';
import ProjectCard from '../ui/ProjectCard';

export default function ProjectsSection() {
  const { data, isLoading } = usePortfolioData();

  if (isLoading || !data) return null;

  return (
    <section 
      id="projects-section"
      className="relative w-full min-h-[100vh] py-32 pointer-events-auto bg-gradient-to-b from-transparent via-[#0F1419]/80 to-[#0F1419] flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto px-6 w-full">
        {/* Section Header */}
        <div className="mb-16 md:mb-24">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-outfit">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9D4EDD] to-[#3A86FF]">Projects</span>
          </h2>
          <p className="text-xl text-gray-400 font-inter max-w-2xl">
            A selection of my recent work bridging the gap between deep learning theoretical models and full-stack production deployments.
          </p>
        </div>

        {/* CSS Grid for Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
