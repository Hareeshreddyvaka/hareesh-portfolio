import { usePortfolioData } from '../../hooks/usePortfolioData';
import { useScrollOrchestrator, SECTION_BOUNDARIES } from '../../hooks/useScrollOrchestrator';
import type { Certificate, Project, Skill, SkillCategory } from '../../types/portfolio';
import ProjectCard from '../ui/ProjectCard';
import SkillBar from '../ui/SkillBar';
import { Send, Github, Linkedin, Twitter, Mail, ChevronDown, Sparkles, Code2, Award, Rocket } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const sectionsConfig = [
  { id: 'hero', start: SECTION_BOUNDARIES.hero[0], end: SECTION_BOUNDARIES.hero[1] },
  { id: 'projects', start: SECTION_BOUNDARIES.projects[0], end: SECTION_BOUNDARIES.projects[1] },
  { id: 'skills', start: SECTION_BOUNDARIES.skills[0], end: SECTION_BOUNDARIES.skills[1] },
  { id: 'certifications', start: SECTION_BOUNDARIES.certifications[0], end: SECTION_BOUNDARIES.certifications[1] },
  { id: 'contact', start: SECTION_BOUNDARIES.contact[0], end: SECTION_BOUNDARIES.contact[1] },
];

export default function ScrollSections() {
  const { data, isLoading } = usePortfolioData();
  const { sectionProgress } = useScrollOrchestrator();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const timer = setTimeout(() => {
      const maxScroll = document.body.scrollHeight - window.innerHeight;

      sectionsConfig.forEach((config, idx) => {
        const sectionEl = sectionRefs.current[idx];
        if (!sectionEl) return;

        const sectionLength = config.end - config.start;
        const labelEl = sectionEl.querySelector('.section-label');
        const headingEl = sectionEl.querySelector('.section-heading');
        const contentEls = gsap.utils.toArray('.section-content', sectionEl);

        gsap.set(sectionEl, { autoAlpha: 0, y: 0 });

        ScrollTrigger.create({
          trigger: document.body,
          start: () => maxScroll * config.start,
          end: () => maxScroll * config.end,
          onEnter: () => gsap.set(sectionEl, { autoAlpha: 1 }),
          onLeaveBack: () => gsap.set(sectionEl, { autoAlpha: 0 }),
        });

        if (labelEl) {
          ScrollTrigger.create({
            trigger: document.body,
            start: () => maxScroll * (config.start + 0.08 * sectionLength),
            toggleActions: 'play none none reverse',
            animation: gsap.from(labelEl, {
              y: prefersReduced ? 0 : 20,
              opacity: 0,
              duration: prefersReduced ? 0.2 : 0.3,
              ease: 'power2.out'
            })
          });
        }

        if (headingEl) {
          ScrollTrigger.create({
            trigger: document.body,
            start: () => maxScroll * (config.start + 0.1 * sectionLength),
            toggleActions: 'play none none reverse',
            animation: gsap.from(headingEl, {
              y: prefersReduced ? 0 : 40,
              opacity: 0,
              duration: prefersReduced ? 0.2 : 0.4,
              ease: 'power2.out',
              delay: 0.08
            })
          });
        }

        if (contentEls.length > 0) {
          ScrollTrigger.create({
            trigger: document.body,
            start: () => maxScroll * (config.start + 0.1 * sectionLength),
            toggleActions: 'play none none reverse',
            animation: gsap.from(contentEls, {
              y: prefersReduced ? 0 : 24,
              opacity: 0,
              duration: prefersReduced ? 0.2 : 0.35,
              ease: 'power2.out',
              stagger: 0.06,
              delay: 0.28
            })
          });
        }

        ScrollTrigger.create({
          trigger: document.body,
          start: () => maxScroll * (config.start + 0.85 * sectionLength),
          toggleActions: 'play none none reverse',
          animation: gsap.to(sectionEl, {
            y: prefersReduced ? 0 : -20,
            opacity: 0,
            duration: prefersReduced ? 0.2 : 0.3,
            ease: 'power1.in'
          })
        });
      });

      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      if (response.ok) {
        setIsSuccess(true);
        form.reset();
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch {
      alert('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setIsSuccess(false), 5000);
    }
  };

  if (isLoading || !data) return null;
  const { personal, projects, skills, certifications, education } = data;

  const weight = Math.round(300 + (sectionProgress * 400));

  return (
    <>
      {/* ═══════════════ HERO SECTION ═══════════════ */}
      <div
        ref={el => sectionRefs.current[0] = el}
        className="fixed inset-0 z-20 flex items-center justify-center pointer-events-none"
      >
        <div className="text-center px-6 max-w-4xl pointer-events-auto">
          <div className="mb-6 section-content">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#00D9FF] text-xs font-mono tracking-widest uppercase">
              <Sparkles size={12} aria-hidden="true" /> Welcome to my universe
            </span>
          </div>
          <span className="text-[var(--text-xs)] tracking-[0.15em] text-white/40 uppercase block mb-2 section-label">01 / About</span>
          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] text-white mb-5 tracking-tight leading-[0.95] section-heading" style={{ fontVariationSettings: `'wght' ${weight}` }}>
            {personal.name.split(' ').map((word: string, i: number) => (
              <span key={i} className={i === personal.name.split(' ').length - 1 
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#9D4EDD] via-[#3A86FF] to-[#00D9FF]' 
                : ''}>
                {word}{' '}
              </span>
            ))}
          </h1>
          <p className="text-lg md:text-xl text-white/50 font-light max-w-2xl mx-auto mb-8 leading-relaxed section-content">
            {personal.title}
          </p>
          <div className="flex items-center justify-center gap-4 section-content">
            {personal.social.github && (
              <a href={personal.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile"
                className="group p-3 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                <Github size={20} aria-hidden="true" />
              </a>
            )}
            {personal.social.linkedin && (
              <a href={personal.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile"
                className="group p-3 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-[#3A86FF] hover:bg-[#3A86FF]/10 hover:border-[#3A86FF]/30 transition-all duration-300">
                <Linkedin size={20} aria-hidden="true" />
              </a>
            )}
            {personal.social.twitter && (
              <a href={personal.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter profile"
                className="group p-3 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-[#00D9FF] hover:bg-[#00D9FF]/10 hover:border-[#00D9FF]/30 transition-all duration-300">
                <Twitter size={20} aria-hidden="true" />
              </a>
            )}
          </div>
          <div className="mt-16 flex flex-col items-center opacity-40 section-content">
            <span className="text-[10px] tracking-[4px] uppercase text-white/60 font-mono mb-2">Scroll to explore</span>
            <ChevronDown size={16} className="text-white/40 animate-bounce" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* ═══════════════ PROJECTS SECTION ═══════════════ */}
      <div
        ref={el => sectionRefs.current[1] = el}
        className="fixed inset-0 z-20 flex items-center pointer-events-none overflow-y-auto"
      >
        <div className="w-full max-w-6xl mx-auto px-6 py-16 pointer-events-auto">
          <div className="mb-10 relative">
            <div className="absolute -inset-10 bg-gradient-radial from-[#0F1419]/80 to-transparent blur-xl -z-10 rounded-full" />
            <div className="flex items-center gap-3 mb-4 section-content">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#9D4EDD] to-[#3A86FF] flex items-center justify-center">
                <Rocket size={18} className="text-white" />
              </div>
              <span className="text-xs font-mono text-white/40 tracking-widest uppercase">Mars Sector</span>
            </div>
            <span className="text-[var(--text-xs)] tracking-[0.15em] text-white/40 uppercase block mb-2 section-label">02 / Projects</span>
            <h2 className="text-4xl md:text-5xl text-white mb-3 section-heading" style={{ fontVariationSettings: `'wght' ${weight}` }}>
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9D4EDD] to-[#3A86FF]">Projects</span>
            </h2>
            <p className="text-white/40 text-lg max-w-xl section-content">
              Bridging deep learning research with full-stack production systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project: Project) => (
              <div key={project.id} className="section-content">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════ SKILLS SECTION ═══════════════ */}
      <div
        ref={el => sectionRefs.current[2] = el}
        className="fixed inset-0 z-20 flex items-center pointer-events-none overflow-y-auto"
      >
        <div className="w-full max-w-6xl mx-auto px-6 py-16 pointer-events-auto">
          <div className="mb-10 text-center relative">
            <div className="absolute -inset-20 bg-gradient-radial from-[#0F1419]/80 to-transparent blur-2xl -z-10 rounded-full" />
            <div className="flex items-center justify-center gap-3 mb-4 section-content">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3A86FF] to-[#00D9FF] flex items-center justify-center">
                <Code2 size={18} className="text-white" />
              </div>
              <span className="text-xs font-mono text-white/40 tracking-widest uppercase">Venus Sector</span>
            </div>
            <span className="text-[var(--text-xs)] tracking-[0.15em] text-white/40 uppercase block mb-2 section-label">03 / Skills</span>
            <h2 className="text-4xl md:text-5xl text-white mb-3 section-heading" style={{ fontVariationSettings: `'wght' ${weight}` }}>
              Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3A86FF] to-[#00D9FF]">Proficiency</span>
            </h2>
            <p className="text-white/40 text-lg max-w-xl mx-auto section-content">
              Tools and technologies I use to build intelligent systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((category: SkillCategory) => (
              <div key={category.category} className="bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/5 p-6 section-content">
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
        ref={el => sectionRefs.current[3] = el}
        className="fixed inset-0 z-20 flex items-center justify-center pointer-events-none"
      >
        <div className="w-full max-w-3xl mx-auto px-6 text-center pointer-events-auto">
          <div className="flex items-center justify-center gap-3 mb-4 section-content">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#EEDB9A] to-[#D4A53C] flex items-center justify-center">
              <Award size={18} className="text-black" />
            </div>
            <span className="text-xs font-mono text-white/40 tracking-widest uppercase">Saturn Sector</span>
          </div>
          <span className="text-[var(--text-xs)] tracking-[0.15em] text-white/40 uppercase block mb-2 section-label">04 / Education</span>
          <h2 className="text-4xl md:text-5xl text-white mb-6 section-heading" style={{ fontVariationSettings: `'wght' ${weight}` }}>
            Certifications
          </h2>
          
          <div className="space-y-4">
            {certifications.map((cert: Certificate) => (
              <div key={cert.id} className="bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/5 p-8 text-left section-content">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#9D4EDD]/20 to-[#3A86FF]/20 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <Award size={22} className="text-[#EEDB9A]" />
                  </div>
                  <div>
                    <h3 className="text-xl text-white mb-1" style={{ fontVariationSettings: `'wght' ${weight}` }}>{cert.title}</h3>
                    <p className="text-sm text-[#00D9FF] font-mono mb-3">{cert.issuer} · {cert.date}</p>
                    <p className="text-white/40 text-sm leading-relaxed">{cert.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/5 p-8 text-left section-content">
            <h3 className="text-lg text-white mb-1" style={{ fontVariationSettings: `'wght' ${weight}` }}>{education.degree}</h3>
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
        ref={el => sectionRefs.current[4] = el}
        className="fixed inset-0 z-20 flex items-center pointer-events-none overflow-y-auto"
      >
        <div className="w-full max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pointer-events-auto">
          {/* Left */}
          <div className="relative">
            <div className="absolute -inset-10 bg-gradient-radial from-black/80 to-transparent blur-xl -z-10 rounded-full" />
            <div className="flex items-center gap-3 mb-4 section-content">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFB973] to-[#FF7B00] flex items-center justify-center">
                <Mail size={18} className="text-white" />
              </div>
              <span className="text-xs font-mono text-white/40 tracking-widest uppercase">Jupiter Sector</span>
            </div>
            <span className="text-[var(--text-xs)] tracking-[0.15em] text-white/40 uppercase block mb-2 section-label">05 / Contact</span>
            <h2 className="text-4xl md:text-5xl text-white mb-4 section-heading" style={{ fontVariationSettings: `'wght' ${weight}` }}>
              Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9D4EDD] to-[#3A86FF]">Connect</span>
            </h2>
            <p className="text-white/40 text-lg mb-8 max-w-lg section-content">
              Have a project in mind or want to explore collaborations? Reach out across the cosmos.
            </p>

            <a href={`mailto:${personal.email}`} className="flex items-center gap-4 text-white/60 hover:text-white transition-colors group mb-6 section-content">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#3A86FF]/20 group-hover:border-[#3A86FF]/50 transition-all">
                <Mail className="text-[#3A86FF]" size={20} />
              </div>
              <span className="font-mono text-sm">{personal.email}</span>
            </a>

            <div className="flex gap-3 pt-4 border-t border-white/5 section-content">
              {personal.social.github && (
                <a href={personal.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="p-3 rounded-full bg-white/5 text-white/40 hover:bg-[#9D4EDD]/20 hover:text-[#9D4EDD] transition-all border border-transparent hover:border-[#9D4EDD]/30">
                  <Github size={22} aria-hidden="true" />
                </a>
              )}
              {personal.social.linkedin && (
                <a href={personal.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="p-3 rounded-full bg-white/5 text-white/40 hover:bg-[#3A86FF]/20 hover:text-[#3A86FF] transition-all border border-transparent hover:border-[#3A86FF]/30">
                  <Linkedin size={22} aria-hidden="true" />
                </a>
              )}
              {personal.social.twitter && (
                <a href={personal.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter profile" className="p-3 rounded-full bg-white/5 text-white/40 hover:bg-[#00D9FF]/20 hover:text-[#00D9FF] transition-all border border-transparent hover:border-[#00D9FF]/30">
                  <Twitter size={22} aria-hidden="true" />
                </a>
              )}
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white/[0.03] backdrop-blur-md p-8 rounded-2xl border border-white/5 relative overflow-hidden section-content">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#3A86FF]/5 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#9D4EDD]/5 rounded-full blur-[80px]" />

            <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono text-white/30 uppercase tracking-wider">Name</label>
                <input required type="text" name="name" placeholder="Your name"
                  className="bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#3A86FF]/50 focus:ring-1 focus:ring-[#3A86FF]/30 transition-all placeholder:text-white/15" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono text-white/30 uppercase tracking-wider">Email</label>
                <input required type="email" name="email" placeholder="you@example.com"
                  className="bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#3A86FF]/50 focus:ring-1 focus:ring-[#3A86FF]/30 transition-all placeholder:text-white/15" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono text-white/30 uppercase tracking-wider">Message</label>
                <textarea required rows={3} name="message" placeholder="Your message..."
                  className="bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#3A86FF]/50 focus:ring-1 focus:ring-[#3A86FF]/30 transition-all resize-none placeholder:text-white/15" />
              </div>
              <button type="submit" disabled={isSubmitting || isSuccess}
                className={`mt-2 w-full py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-all duration-300 ${
                  isSuccess
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'bg-gradient-to-r from-[#9D4EDD] to-[#3A86FF] text-white hover:shadow-[0_0_25px_rgba(58,134,255,0.3)] hover:scale-[1.01]'
                }`}>
                <span aria-live="polite">
                  {isSubmitting ? (
                    <span className="animate-pulse">Sending...</span>
                  ) : isSuccess ? (
                    <span>Transmission Received!</span>
                  ) : (
                    <><span>Send Message</span><Send size={16} aria-hidden="true" /></>
                  )}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
