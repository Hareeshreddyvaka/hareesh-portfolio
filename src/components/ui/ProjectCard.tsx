import { useRef } from 'react';
import type { Project } from '../../types/portfolio';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

const PROJECT_GRADIENTS = [
  'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
  'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)',
  'linear-gradient(135deg, #0d0d0d, #1a1a2e, #2d1b69)',
];

export default function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const gradientIndex = project.id.charCodeAt(0) % PROJECT_GRADIENTS.length;

  return (
    <div
      ref={cardRef}
      className="project-card group relative flex flex-col bg-[#1A1F26]/80 backdrop-blur-md rounded-2xl border border-white/5 overflow-hidden transition-[transform,border-color] duration-200 ease-in-out hover:-translate-y-1 hover:border-white/30"
    >
      {/* Image / Gradient Banner */}
      <div className="relative w-full h-48 overflow-hidden bg-black/50">
        {project.image ? (
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
            style={{ backgroundImage: `url(${project.image})` }}
          />
        ) : (
          <div
            className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110"
            style={{ background: PROJECT_GRADIENTS[gradientIndex] }}
            aria-hidden="true"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F26]/90 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <span className="inline-block text-xs font-mono uppercase tracking-widest text-white/40 mb-1">
            {project.tags[0]}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-white mb-2 font-outfit">
          {project.title}
        </h3>

        <p className="text-gray-400 text-sm mb-6 flex-1 font-inter">
          {project.shortDescription}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[var(--text-xs)] px-[10px] py-[2px] rounded-full font-medium bg-white/10 border border-white/15 text-white/80"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="text-[var(--text-xs)] px-[10px] py-[2px] rounded-full font-medium bg-white/5 border border-transparent text-gray-400">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 mt-auto">
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} source code on GitHub`}
              className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
            >
              <Github size={16} aria-hidden="true" />
              <span>Source</span>
            </a>
          )}
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live demo`}
              className="flex items-center gap-2 text-sm text-[#00D9FF] hover:text-[#3A86FF] transition-colors"
            >
              <ExternalLink size={16} aria-hidden="true" />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
