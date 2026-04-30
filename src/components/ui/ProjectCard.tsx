import { useRef } from 'react';
import type { Project } from '../../types/portfolio';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);


  return (
    <div 
      ref={cardRef}
      className="project-card group relative flex flex-col bg-[#1A1F26]/80 backdrop-blur-md rounded-2xl border border-white/5 overflow-hidden transition-[transform,border-color] duration-200 ease-in-out hover:-translate-y-1 hover:border-white/30"
    >
      {/* Parallax Image Container */}
      <div className="relative w-full h-48 overflow-hidden bg-black/50">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
          style={{ backgroundImage: `url(${project.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F26]/90 to-transparent" />
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
              className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
            >
              <Github size={16} />
              <span>Source</span>
            </a>
          )}
          {project.liveLink && (
            <a 
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-[#00D9FF] hover:text-[#3A86FF] transition-colors"
            >
              <ExternalLink size={16} />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
