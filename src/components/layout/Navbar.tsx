import { useEffect, useState } from 'react';
import { useScrollOrchestrator } from '../../hooks/useScrollOrchestrator';
import { usePortfolioData } from '../../hooks/usePortfolioData';

export default function Navbar() {
  const { currentSection } = useScrollOrchestrator();
  const { data } = usePortfolioData();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Planet navigation — scroll to percentage of the full document
  const navItems = [
    { id: 'hero', label: 'Home', scrollPct: 0 },
    { id: 'projects', label: 'Projects', scrollPct: 0.35 },
    { id: 'skills', label: 'Skills', scrollPct: 0.55 },
    { id: 'certifications', label: 'Certs', scrollPct: 0.78 },
    { id: 'contact', label: 'Contact', scrollPct: 0.92 },
  ];

  const scrollToPct = (pct: number) => {
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    window.scrollTo({ top: maxScroll * pct, behavior: 'smooth' });
  };

  return (
    <nav
      className={`w-full transition-all duration-300 ${
        scrolled
          ? 'bg-[#0A0D12]/80 backdrop-blur-xl border-b border-white/5 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-white font-bold font-outfit text-lg tracking-tight flex items-center gap-2.5 group"
        >
          <span className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#9D4EDD] to-[#00D9FF] flex items-center justify-center text-xs font-bold shadow-[0_0_12px_rgba(157,78,221,0.4)]">
            {data?.personal.name.charAt(0) || 'H'}
          </span>
          <span className="hidden sm:inline group-hover:text-[#00D9FF] transition-colors">
            {data?.personal.name || 'Portfolio'}
          </span>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-0.5 p-1 bg-white/[0.03] rounded-full border border-white/[0.06] backdrop-blur-sm">
          {navItems.map((item) => {
            const isActive = currentSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToPct(item.scrollPct)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-white/10 text-white shadow-[0_0_10px_rgba(255,255,255,0.08)]'
                    : 'text-gray-500 hover:text-gray-300 hover:bg-white/[0.03]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden">
          <button className="text-white/70 p-2 hover:text-white transition-colors">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
