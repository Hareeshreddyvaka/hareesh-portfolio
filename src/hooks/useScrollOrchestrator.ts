import { useState, useEffect } from 'react';

export interface ScrollState {
  totalProgress: number; // 0-1 across the entire document
  sectionProgress: number; // 0-1 within the actively targeted section 
  currentSection: 'hero' | 'projects' | 'skills' | 'certifications' | 'contact';
}

const SECTION_BOUNDARIES = {
  hero: [0, 0.25],
  projects: [0.25, 0.50],
  skills: [0.50, 0.75],
  certifications: [0.75, 0.90],
  contact: [0.90, 1.0],
} as const;

export function useScrollOrchestrator(): ScrollState {
  const [scrollState, setScrollState] = useState<ScrollState>({
    totalProgress: 0,
    sectionProgress: 0,
    currentSection: 'hero',
  });

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPx = window.scrollY;
          const maxScroll = document.body.scrollHeight - window.innerHeight;
          const progress = Math.max(0, Math.min(1, maxScroll > 0 ? scrollPx / maxScroll : 0));
          
          let currentSection: ScrollState['currentSection'] = 'hero';
          let sectionProgress = 0;

          // Determine current section
          for (const [section, [start, end]] of Object.entries(SECTION_BOUNDARIES)) {
            if (progress >= start && progress <= end) {
              currentSection = section as ScrollState['currentSection'];
              // Normalize progress within the section block to 0-1
              sectionProgress = (progress - start) / (end - start);
              break;
            } else if (progress > end) {
              currentSection = section as ScrollState['currentSection'];
              sectionProgress = 1;
            }
          }

          setScrollState({
            totalProgress: progress,
            sectionProgress,
            currentSection,
          });

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger once on mount
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollState;
}

export function constrain(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max);
}

export function mapRange(val: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  return ((constrain(val, inMin, inMax) - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}
