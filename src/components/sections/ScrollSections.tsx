import { usePortfolioData } from '../../hooks/usePortfolioData';
import { useScrollOrchestrator, mapRange } from '../../hooks/useScrollOrchestrator';
import type { Certificate, Project, Skill, SkillCategory } from '../../types/portfolio';
import ProjectCard from '../ui/ProjectCard';
import SkillBar from '../ui/SkillBar';
import { Send, Github, Linkedin, Twitter, Mail, ChevronDown, Sparkles, Code2, Award, Rocket } from 'lucide-react';
import { useState } from 'react';

/**
 * ScrollSections — DOM overlay sections that fade in/out as the user scrolls
 * through different parts of the 3D space. Each section is positioned with
 * CSS `position: fixed` and uses scroll progress to control opacity/transform.
 */
export default function ScrollSections() {
  const { data, isLoading } = usePortfolioData();
  const { totalProgress } = useScrollOrchestrator();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (isLoading || !data) return null;
  const { personal, projects, skills, certifications, education } = data;

  // Opacity helpers: fade in and out within a scroll range
  const sectionOpacity = (start: number, peak: number, end: number) => {
    if (totalProgress < start || totalProgress > end) return 0;
    if (totalProgress < peak) return mapRange(totalProgress, start, peak, 0, 1);
    return mapRange(totalProgress, peak, end, 1, 0);
  };

  const sectionTransform = (start: number, peak: number, end: number) => {
    const op = sectionOpacity(start, peak, end);
    const yShift = totalProgress < peak 
      ? mapRange(totalProgress, start, peak, 30, 0) 
      : mapRange(totalProgress, peak, end, 0, -20);
    return {
      opacity: op,
      transform: `translateY(${yShift}px)`,
      pointerEvents: (op > 0.1 ? 'auto' : 'none') as 'auto' | 'none',
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <>
      {/* ═══════════════ HERO SECTION ═══════════════ */}
      <div
        className="fixed inset-0 z-20 flex items-center justify-center pointer-events-none"
        style={sectionTransform(0.05, 0.15, 0.28)}
      >
        <div className="text-center px-6 max-w-4xl">
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#00D9FF] text-xs font-mono tracking-widest uppercase">
              <Sparkles size={12} /> Welcome to my universe
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold text-white mb-5 font-['Space_Grotesk'] tracking-tight leading-[0.95]">
            {personal.name.split(' ').map((word: string, i: number) => (
              <span key={i} className={i === personal.name.split(' ').length - 1 
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#9D4EDD] via-[#3A86FF] to-[#00D9FF]' 
                : ''}>
                {word}{' '}
              </span>
            ))}
          </h1>
          <p className="text-lg md:text-xl text-white/50 font-light max-w-2xl mx-auto mb-8 leading-relaxed">
            {personal.title}
          </p>
          <div className="flex items-center justify-center gap-4">
            {personal.social.github && (
              <a href={personal.social.github} target="_blank" rel="noopener noreferrer"
                className="group p-3 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                <Github size={20} />
              </a>
            )}
            {personal.social.linkedin && (
              <a href={personal.social.linkedin} target="_blank" rel="noopener noreferrer"
                className="group p-3 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-[#3A86FF] hover:bg-[#3A86FF]/10 hover:border-[#3A86FF]/30 transition-all duration-300">
                <Linkedin size={20} />
              </a>
            )}
            {personal.social.twitter && (
              <a href={personal.social.twitter} target="_blank" rel="noopener noreferrer"
                className="group p-3 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-[#00D9FF] hover:bg-[#00D9FF]/10 hover:border-[#00D9FF]/30 transition-all duration-300">
                <Twitter size={20} />
              </a>
            )}
          </div>
          {/* Scroll hint */}
          <div className="mt-16 flex flex-col items-center opacity-40">
            <span className="text-[10px] tracking-[4px] uppercase text-white/60 font-mono mb-2">Scroll to explore</span>
            <ChevronDown size={16} className="text-white/40 animate-bounce" />
          </div>
        </div>
      </div>

      {/* ═══════════════ PROJECTS SECTION ═══════════════ */}
      <div
        className="fixed inset-0 z-20 flex items-center pointer-events-none overflow-y-auto"
        style={sectionTransform(0.33, 0.4, 0.48)}
      >
        <div className="w-full max-w-6xl mx-auto px-6 py-16">
          <div className="mb-10 relative">
            <div className="absolute -inset-10 bg-gradient-radial from-[#0F1419]/80 to-transparent blur-xl -z-10 rounded-full" />
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#9D4EDD] to-[#3A86FF] flex items-center justify-center">
                <Rocket size={18} className="text-white" />
              </div>
              <span className="text-xs font-mono text-white/40 tracking-widest uppercase">Mars Sector</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white font-['Space_Grotesk'] mb-3">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9D4EDD] to-[#3A86FF]">Projects</span>
            </h2>
            <p className="text-white/40 text-lg max-w-xl">
              Bridging deep learning research with full-stack production systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project: Project, i: number) => (
              <div key={project.id} style={{ transitionDelay: `${i * 100}ms` }}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════ SKILLS SECTION ═══════════════ */}
      <div
        className="fixed inset-0 z-20 flex items-center pointer-events-none overflow-y-auto"
        style={sectionTransform(0.53, 0.6, 0.68)}
      >
        <div className="w-full max-w-6xl mx-auto px-6 py-16">
          <div className="mb-10 text-center relative">
            <div className="absolute -inset-20 bg-gradient-radial from-[#0F1419]/80 to-transparent blur-2xl -z-10 rounded-full" />
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3A86FF] to-[#00D9FF] flex items-center justify-center">
                <Code2 size={18} className="text-white" />
              </div>
              <span className="text-xs font-mono text-white/40 tracking-widest uppercase">Venus Sector</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white font-['Space_Grotesk'] mb-3">
              Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3A86FF] to-[#00D9FF]">Proficiency</span>
            </h2>
            <p className="text-white/40 text-lg max-w-xl mx-auto">
              Tools and technologies I use to build intelligent systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((category: SkillCategory, catIdx: number) => (
              <div key={category.category} className="bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/5 p-6"
                style={{ transitionDelay: `${catIdx * 80}ms` }}>
                <h3 className="text-sm font-bold text-[#00D9FF] mb-5 font-mono uppercase tracking-widest pb-3 border-b border-white/5">
                  {category.category}
                </h3>
                <div className="flex flex-col gap-2">
                  {category.items.map((skill: Skill) => (
                    <SkillBar key={skill.name} name={skill.name} level={skill.level} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════ CERTIFICATIONS SECTION ═══════════════ */}
      <div
        className="fixed inset-0 z-20 flex items-center justify-center pointer-events-none"
        style={sectionTransform(0.73, 0.78, 0.84)}
      >
        <div className="w-full max-w-3xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#EEDB9A] to-[#D4A53C] flex items-center justify-center">
              <Award size={18} className="text-black" />
            </div>
            <span className="text-xs font-mono text-white/40 tracking-widest uppercase">Saturn Sector</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white font-['Space_Grotesk'] mb-6">
            Certifications
          </h2>
          
          <div className="space-y-4">
            {certifications.map((cert: Certificate) => (
              <div key={cert.id} className="bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/5 p-8 text-left">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#9D4EDD]/20 to-[#3A86FF]/20 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <Award size={22} className="text-[#EEDB9A]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white font-['Space_Grotesk'] mb-1">{cert.title}</h3>
                    <p className="text-sm text-[#00D9FF] font-mono mb-3">{cert.issuer} · {cert.date}</p>
                    <p className="text-white/40 text-sm leading-relaxed">{cert.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Education block */}
          <div className="mt-8 bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/5 p-8 text-left">
            <h3 className="text-lg font-bold text-white font-['Space_Grotesk'] mb-1">{education.degree}</h3>
            <p className="text-sm text-[#00D9FF] font-mono mb-2">{education.school} · {education.specialization}</p>
            <div className="flex gap-6 text-sm text-white/40">
              <span>CGPA: <span className="text-white/70 font-bold">{education.cgpa}</span></span>
              <span>Credits: <span className="text-white/70 font-bold">{education.credits}</span></span>
              <span>{education.startYear} – {education.endYear}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════ CONTACT SECTION ═══════════════ */}
      <div
        className="fixed inset-0 z-20 flex items-center pointer-events-none overflow-y-auto"
        style={sectionTransform(0.88, 0.94, 1.01)}
      >
        <div className="w-full max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div className="relative">
            <div className="absolute -inset-10 bg-gradient-radial from-black/80 to-transparent blur-xl -z-10 rounded-full" />
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFB973] to-[#FF7B00] flex items-center justify-center">
                <Mail size={18} className="text-white" />
              </div>
              <span className="text-xs font-mono text-white/40 tracking-widest uppercase">Jupiter Sector</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white font-['Space_Grotesk'] mb-4">
              Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9D4EDD] to-[#3A86FF]">Connect</span>
            </h2>
            <p className="text-white/40 text-lg mb-8 max-w-lg">
              Have a project in mind or want to explore collaborations? Reach out across the cosmos.
            </p>

            <a href={`mailto:${personal.email}`} className="flex items-center gap-4 text-white/60 hover:text-white transition-colors group mb-6">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#3A86FF]/20 group-hover:border-[#3A86FF]/50 transition-all">
                <Mail className="text-[#3A86FF]" size={20} />
              </div>
              <span className="font-mono text-sm">{personal.email}</span>
            </a>

            <div className="flex gap-3 pt-4 border-t border-white/5">
              {personal.social.github && (
                <a href={personal.social.github} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 text-white/40 hover:bg-[#9D4EDD]/20 hover:text-[#9D4EDD] transition-all border border-transparent hover:border-[#9D4EDD]/30">
                  <Github size={22} />
                </a>
              )}
              {personal.social.linkedin && (
                <a href={personal.social.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 text-white/40 hover:bg-[#3A86FF]/20 hover:text-[#3A86FF] transition-all border border-transparent hover:border-[#3A86FF]/30">
                  <Linkedin size={22} />
                </a>
              )}
              {personal.social.twitter && (
                <a href={personal.social.twitter} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 text-white/40 hover:bg-[#00D9FF]/20 hover:text-[#00D9FF] transition-all border border-transparent hover:border-[#00D9FF]/30">
                  <Twitter size={22} />
                </a>
              )}
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white/[0.03] backdrop-blur-md p-8 rounded-2xl border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#3A86FF]/5 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#9D4EDD]/5 rounded-full blur-[80px]" />

            <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono text-white/30 uppercase tracking-wider">Name</label>
                <input required type="text" placeholder="Your name"
                  className="bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#3A86FF]/50 focus:ring-1 focus:ring-[#3A86FF]/30 transition-all placeholder:text-white/15" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono text-white/30 uppercase tracking-wider">Email</label>
                <input required type="email" placeholder="you@example.com"
                  className="bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#3A86FF]/50 focus:ring-1 focus:ring-[#3A86FF]/30 transition-all placeholder:text-white/15" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono text-white/30 uppercase tracking-wider">Message</label>
                <textarea required rows={3} placeholder="Your message..."
                  className="bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#3A86FF]/50 focus:ring-1 focus:ring-[#3A86FF]/30 transition-all resize-none placeholder:text-white/15" />
              </div>
              <button type="submit" disabled={isSubmitting || isSuccess}
                className={`mt-2 w-full py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-all duration-300 ${
                  isSuccess
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'bg-gradient-to-r from-[#9D4EDD] to-[#3A86FF] text-white hover:shadow-[0_0_25px_rgba(58,134,255,0.3)] hover:scale-[1.01]'
                }`}>
                {isSubmitting ? (
                  <span className="animate-pulse">Sending...</span>
                ) : isSuccess ? (
                  <span>Transmission Received!</span>
                ) : (
                  <><span>Send Message</span><Send size={16} /></>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
