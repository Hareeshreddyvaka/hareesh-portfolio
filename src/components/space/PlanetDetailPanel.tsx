import { useEffect, useState } from 'react';
import { PlanetInfo } from '../../hooks/usePlanetInteraction';
import { usePortfolioData } from '../../hooks/usePortfolioData';
import { X, ExternalLink, Github, Mail, Linkedin, Twitter, GraduationCap, Award, Code, Briefcase, User } from 'lucide-react';

interface PlanetDetailPanelProps {
  planet: PlanetInfo | null;
  onClose: () => void;
}

export function PlanetDetailPanel({ planet, onClose }: PlanetDetailPanelProps) {
  const { data } = usePortfolioData();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (planet) {
      requestAnimationFrame(() => setIsVisible(true));
    } else {
      setIsVisible(false);
    }
  }, [planet]);

  // ESC to close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!planet && !isVisible) return null;

  // Render different content based on which planet/section is selected
  const renderContent = () => {
    if (!data || !planet) return null;

    switch (planet.section) {
      case 'hero':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <User className="text-[#00D4FF]" size={20} />
              <h3 className="text-sm uppercase tracking-widest text-[#00D4FF]">Personal</h3>
            </div>
            <div>
              <h4 className="text-2xl font-bold text-white mb-1">{data.personal.name}</h4>
              <p className="text-gray-400">{data.personal.title}</p>
            </div>
            <p className="text-gray-300 leading-relaxed">{data.personal.bio}</p>
            <div className="space-y-3 pt-4 border-t border-white/10">
              <a href={`mailto:${data.personal.email}`} className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                <Mail size={16} className="text-[#3A86FF]" />
                <span className="text-sm">{data.personal.email}</span>
              </a>
              {data.personal.social.github && (
                <a href={data.personal.social.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                  <Github size={16} className="text-[#9D4EDD]" />
                  <span className="text-sm">GitHub</span>
                </a>
              )}
              {data.personal.social.linkedin && (
                <a href={data.personal.social.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                  <Linkedin size={16} className="text-[#3A86FF]" />
                  <span className="text-sm">LinkedIn</span>
                </a>
              )}
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <Code className="text-[#FF4422]" size={20} />
              <h3 className="text-sm uppercase tracking-widest text-[#FF4422]">Projects</h3>
            </div>
            <div className="grid grid-cols-1 gap-3 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
              {data.projects.map(p => (
                <div key={p.id} className="bg-black/30 border border-white/5 rounded-xl p-4 hover:border-white/15 transition-colors">
                  <h4 className="text-white font-semibold mb-1">{p.title}</h4>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">{p.shortDescription}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {p.tags.slice(0, 3).map(t => (
                      <span key={t} className="text-[10px] px-2 py-0.5 bg-white/5 rounded-full text-gray-300">{t}</span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {p.githubLink && (
                      <a href={p.githubLink} target="_blank" rel="noopener noreferrer" className="text-xs text-[#3A86FF] hover:text-white flex items-center gap-1 transition-colors">
                        <Github size={12} /> Code
                      </a>
                    )}
                    {p.liveLink && (
                      <a href={p.liveLink} target="_blank" rel="noopener noreferrer" className="text-xs text-[#00D9FF] hover:text-white flex items-center gap-1 transition-colors">
                        <ExternalLink size={12} /> Live
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'skills':
        return (
          <div className="space-y-5">
            <div className="flex items-center gap-3 mb-2">
              <Briefcase className="text-[#FFAA00]" size={20} />
              <h3 className="text-sm uppercase tracking-widest text-[#FFAA00]">Skills</h3>
            </div>
            <div className="space-y-5 max-h-[55vh] overflow-y-auto pr-2 custom-scrollbar">
              {data.skills.map(cat => (
                <div key={cat.category}>
                  <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-3">{cat.category}</h4>
                  <div className="space-y-2">
                    {cat.items.map(skill => (
                      <div key={skill.name} className="flex items-center gap-3">
                        <span className="text-sm text-gray-300 w-32 shrink-0">{skill.name}</span>
                        <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full rounded-full bg-gradient-to-r from-[#9D4EDD] to-[#00D9FF]" style={{ width: `${skill.level}%` }} />
                        </div>
                        <span className="text-xs text-gray-500 w-8 text-right">{skill.level}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'certs':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <Award className="text-[#EEDB9A]" size={20} />
              <h3 className="text-sm uppercase tracking-widest text-[#EEDB9A]">Certifications</h3>
            </div>
            <div className="space-y-3">
              {data.certifications.map(cert => (
                <div key={cert.id} className="bg-black/30 border border-[#EEDB9A]/10 rounded-xl p-4">
                  <div className="flex items-start gap-4">
                    {cert.certificateImage && (
                      <img src={cert.certificateImage} alt={cert.title} className="w-16 h-12 rounded object-cover border border-white/10" loading="lazy" />
                    )}
                    <div className="flex-1">
                      <h4 className="text-white font-semibold">{cert.title}</h4>
                      <p className="text-sm text-[#EEDB9A]">{cert.issuer} · {cert.date}</p>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-2">{cert.description}</p>
                    </div>
                  </div>
                  {cert.credentialUrl && cert.credentialUrl !== '#' && (
                    <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="mt-3 block text-xs text-[#3A86FF] hover:text-white flex items-center gap-1 transition-colors">
                      <ExternalLink size={12} /> Verify Credential
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <Mail className="text-[#FFB973]" size={20} />
              <h3 className="text-sm uppercase tracking-widest text-[#FFB973]">Contact</h3>
            </div>
            <p className="text-gray-300">Let's connect across the cosmos. Reach out via email or social.</p>
            <div className="space-y-3">
              <a href={`mailto:${data.personal.email}`} className="flex items-center gap-3 p-3 bg-black/30 rounded-xl border border-white/5 hover:border-[#3A86FF]/30 transition-colors">
                <Mail size={18} className="text-[#3A86FF]" />
                <span className="text-sm text-gray-300">{data.personal.email}</span>
              </a>
              {data.personal.social.github && (
                <a href={data.personal.social.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-black/30 rounded-xl border border-white/5 hover:border-[#9D4EDD]/30 transition-colors">
                  <Github size={18} className="text-[#9D4EDD]" />
                  <span className="text-sm text-gray-300">GitHub</span>
                </a>
              )}
              {data.personal.social.linkedin && (
                <a href={data.personal.social.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-black/30 rounded-xl border border-white/5 hover:border-[#3A86FF]/30 transition-colors">
                  <Linkedin size={18} className="text-[#3A86FF]" />
                  <span className="text-sm text-gray-300">LinkedIn</span>
                </a>
              )}
              {data.personal.social.twitter && (
                <a href={data.personal.social.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-black/30 rounded-xl border border-white/5 hover:border-[#00D9FF]/30 transition-colors">
                  <Twitter size={18} className="text-[#00D9FF]" />
                  <span className="text-sm text-gray-300">Twitter / X</span>
                </a>
              )}
            </div>
          </div>
        );

      case 'about':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <GraduationCap className="text-[#274687]" size={20} />
              <h3 className="text-sm uppercase tracking-widest text-[#6B8FD4]">Education</h3>
            </div>
            <div className="bg-black/30 border border-[#274687]/20 rounded-xl p-5">
              <h4 className="text-white font-semibold text-lg">{data.education.degree}</h4>
              <p className="text-[#6B8FD4] font-medium">{data.education.school}</p>
              {data.education.specialization && (
                <p className="text-sm text-gray-400 mt-1">Specialization: {data.education.specialization}</p>
              )}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-black/20 rounded-lg p-3 border border-white/5">
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider">Duration</div>
                  <div className="text-white font-mono">{data.education.startYear} — {data.education.endYear}</div>
                </div>
                {data.education.cgpa && (
                  <div className="bg-black/20 rounded-lg p-3 border border-white/5">
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider">CGPA</div>
                    <div className="text-white font-mono">{data.education.cgpa}</div>
                  </div>
                )}
                {data.education.semester && (
                  <div className="bg-black/20 rounded-lg p-3 border border-white/5">
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider">Semester</div>
                    <div className="text-white font-mono">{data.education.semester}</div>
                  </div>
                )}
                {data.education.credits && (
                  <div className="bg-black/20 rounded-lg p-3 border border-white/5">
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider">Credits</div>
                    <div className="text-white font-mono">{data.education.credits}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return (
          <p className="text-gray-400">{planet?.description}</p>
        );
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 pointer-events-none transition-opacity duration-500 ease-in-out flex items-center justify-end pr-4 md:pr-10 ${
        planet ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Dim overlay */}
      <div
        className="absolute inset-0 bg-black/40 pointer-events-auto backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`relative z-10 w-full max-w-md max-h-[85vh] bg-[#0A0D12]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_60px_rgba(0,0,0,0.8)] pointer-events-auto transform transition-all duration-500 ease-out flex flex-col overflow-hidden ${
          planet ? 'translate-x-0 scale-100' : 'translate-x-[120%] scale-95'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-0">
          <div>
            <h2 className="text-2xl font-bold font-outfit" style={{ color: planet?.color || '#fff' }}>
              {planet?.name}
            </h2>
            <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">
              {planet?.section} sector
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors border border-white/5"
          >
            <X size={18} />
          </button>
        </div>

        {/* Divider */}
        <div className="mx-6 mt-4 mb-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {renderContent()}
        </div>

        {/* Footer hints */}
        <div className="p-4 border-t border-white/5 flex justify-between items-center text-[11px] text-gray-600">
          <span>ESC to close</span>
          <span>Scroll to explore</span>
        </div>
      </div>

      {/* Custom scrollbar styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
      `}</style>
    </div>
  );
}
