import { useEffect, useState, useRef } from 'react';

interface SectionTransitionProps {
  activeSection: string;
}

export function SectionTransition({ activeSection }: SectionTransitionProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prevSection = useRef(activeSection);

  useEffect(() => {
    if (activeSection !== prevSection.current && activeSection) {
      setIsTransitioning(true);
      const timer = setTimeout(() => setIsTransitioning(false), 800);
      prevSection.current = activeSection;
      return () => clearTimeout(timer);
    }
  }, [activeSection]);

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-30 transition-opacity duration-500 ${
        isTransitioning ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Radial warp lines */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={`w-[200vmax] h-[200vmax] rounded-full border border-white/5 transition-transform duration-700 ${
            isTransitioning ? 'scale-100' : 'scale-0'
          }`}
          style={{
            background: 'radial-gradient(circle, transparent 30%, rgba(157,78,221,0.03) 60%, transparent 100%)',
          }}
        />
      </div>

      {/* Brief flash on edges */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          isTransitioning ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(58,134,255,0.05) 70%, transparent 100%)',
        }}
      />
    </div>
  );
}
