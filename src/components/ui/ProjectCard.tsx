import { useRef } from 'react';
import type { Project } from '../../types/portfolio';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Parse colors dynamically based on tags where possible, or use defaults
  const getBadgeColor = (tag: string) => {
    const t = tag.toLowerCase();
    if (t.includes('react')) return 'bg-cyan-500/20 text-cyan-300';
    if (t.includes('python')) return 'bg-yellow-500/20 text-yellow-300';
    if (t.includes('node') || t.includes('mongo')) return 'bg-green-500/20 text-green-300';
    if (t.includes('ai') || t.includes('deep') || t.includes('torch')) return 'bg-purple-500/20 text-purple-300';
    return 'bg-slate-700 text-slate-300';
  };

  return (
    <div 
      ref={cardRef}
      className="project-card group relative flex flex-col bg-[#1A1F26]/80 backdrop-blur-md rounded-2xl border border-white/5 overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(58,134,255,0.15)] hover:border-white/10"
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
              className={`text-xs px-2.5 py-1 rounded-full font-medium ${getBadgeColor(tag)}`}
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-400">
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
