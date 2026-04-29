import React from 'react';
import { useCinematicTimeline } from '../../hooks/useCinematicTimeline';
import { useScrollOrchestrator } from '../../hooks/useScrollOrchestrator';

export function SectionContext() {
  const { currentSection } = useCinematicTimeline();
  const { totalProgress } = useScrollOrchestrator();

  let sectionLabel = 'UNKNOWN SECTOR';
  switch (currentSection.current) {
    case 'deep-space': sectionLabel = 'DEEP SPACE // APPROACHING SYSTEM'; break;
    case 'approach-earth': sectionLabel = 'SECTOR 1 // INNER SYSTEM'; break;
    case 'hero': sectionLabel = 'EARTH // PERSONAL OVERVIEW'; break;
    case 'travel': sectionLabel = 'TRANSIT // HYPER-LANE'; break;
    case 'projects': sectionLabel = 'MARS // PROJECT ARCHIVES'; break;
    case 'skills': sectionLabel = 'VENUS // SKILL REPOSITORY'; break;
    case 'certs': sectionLabel = 'SATURN // VERIFIED CREDENTIALS'; break;
    case 'contact': sectionLabel = 'JUPITER // COMM RELAY'; break;
  }

  return (
    <div className="fixed top-24 left-6 md:left-10 z-40 pointer-events-none">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#00D9FF] animate-pulse shadow-[0_0_8px_#00D9FF]" />
          <span className="text-[#00D9FF] font-mono text-[10px] tracking-[0.2em]">CURRENT SECTOR</span>
        </div>
        <h2 className="text-white font-outfit text-xl font-bold tracking-wider drop-shadow-md">
          {sectionLabel}
        </h2>
        
        {/* Progress Bar HUD */}
        <div className="w-48 h-1 bg-white/10 rounded-full mt-2 overflow-hidden border border-white/5">
          <div 
            className="h-full bg-gradient-to-r from-[#9D4EDD] to-[#00D9FF] rounded-full"
            style={{ width: `${Math.max(2, totalProgress * 100)}%` }}
          />
        </div>
        <div className="text-[9px] text-white/50 font-mono mt-1 tracking-widest">
          SYS_NAV: {(totalProgress * 100).toFixed(1)}% COMPLETE
        </div>
      </div>
    </div>
  );
}
