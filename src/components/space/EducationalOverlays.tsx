import React, { useState } from 'react';
import { useCinematicTimeline } from '../../hooks/useCinematicTimeline';
import { Info } from 'lucide-react';

const PLANET_FACTS: Record<string, { title: string, fact: string }> = {
  'hero': { title: 'Earth', fact: 'Earth rotates at about 1,000 miles per hour and orbits the sun at about 67,000 miles per hour.' },
  'projects': { title: 'Mars', fact: 'Mars is home to Olympus Mons, the tallest mountain in the solar system, standing 13.6 miles high.' },
  'skills': { title: 'Venus', fact: 'Venus is the hottest planet in our solar system, with a surface temperature of 900°F (475°C).' },
  'certs': { title: 'Saturn', fact: 'Saturn\'s rings are made mostly of chunks of ice and small amounts of carbonaceous dust.' },
  'contact': { title: 'Jupiter', fact: 'Jupiter is so large that all the other planets in the solar system could fit inside it.' }
};

export function EducationalOverlays() {
  const [showFacts, setShowFacts] = useState(false);
  const { currentSection } = useCinematicTimeline();

  const currentFact = PLANET_FACTS[currentSection.current];

  return (
    <>
      {/* Toggle Button */}
      <button 
        onClick={() => setShowFacts(!showFacts)}
        className={`fixed top-24 right-6 md:right-10 z-50 p-2 rounded-full border transition-all backdrop-blur-md ${
          showFacts ? 'bg-[#9D4EDD]/20 border-[#9D4EDD] text-white' : 'bg-black/40 border-white/10 text-gray-400 hover:text-white'
        }`}
        title="Toggle Space Facts"
      >
        <Info size={18} />
      </button>

      {/* Fact Panel */}
      <div 
        className={`fixed top-36 right-6 md:right-10 z-40 w-64 p-4 rounded-xl bg-black/60 backdrop-blur-xl border border-white/10 text-sm transition-all duration-500 origin-top-right ${
          showFacts && currentFact ? 'scale-100 opacity-100' : 'scale-90 opacity-0 pointer-events-none'
        }`}
      >
        <div className="text-[10px] uppercase tracking-widest text-[#9D4EDD] mb-1">Stellar Fact</div>
        <div className="font-bold text-white mb-2">{currentFact?.title}</div>
        <div className="text-gray-300 leading-relaxed">{currentFact?.fact}</div>
      </div>
    </>
  );
}
