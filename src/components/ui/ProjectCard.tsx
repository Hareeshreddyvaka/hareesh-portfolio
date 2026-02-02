import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { Project } from '../../data/projects';

type ProjectCardProps = {
  project: Project;
  index: number;
};

const iconMap = {
  'View Live': <ExternalLink size={16} />,
  'View Code': <Github size={16} />,
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => (
  <motion.article
    className="glass-card group flex flex-col overflow-hidden border border-white/5 bg-white/5 hover:border-primary-500/30 hover:shadow-neon-blue transition-all duration-500"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
  >
    <div className="relative h-64 overflow-hidden">
      <img
        src={project.image}
        alt={project.title}
        className="h-full w-full object-cover transition duration-700 group-hover:scale-110 group-hover:rotate-1"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-surface-dark via-surface-dark/20 to-transparent opacity-60 transition duration-500 group-hover:opacity-40" />

      <div className="absolute top-4 right-4 flex gap-2">
        {project.tags.slice(0, 2).map((tag) => (
          <span key={tag} className="glass-panel px-3 py-1 text-xs font-mono font-medium text-primary-300 rounded-full backdrop-blur-md">
            {tag}
          </span>
        ))}
      </div>
    </div>

    <div className="flex h-full flex-col gap-5 p-8 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="flex flex-col gap-3">
        <h3 className="text-2xl font-bold text-white font-display group-hover:text-primary-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed">
          {project.description}
        </p>
        <div className="flex items-center gap-2 text-xs font-mono text-primary-400 mt-2">
          <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
          {project.impact}
        </div>
      </div>

      <div className="mt-auto flex flex-wrap gap-4 pt-4">
        {project.links.map((link) => (
          <a
            key={`${project.slug}-${link.label}`}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors group/link"
          >
            {iconMap[link.label]}
            <span className="relative">
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary-500 transition-all duration-300 group-hover/link:w-full" />
            </span>
          </a>
        ))}
      </div>
    </div>
  </motion.article>
);

