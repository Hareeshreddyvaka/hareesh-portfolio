import React, { useState, useEffect } from 'react';
import { MousePointer2, Move, ZoomIn, X } from 'lucide-react';
import { useUserPreferences } from '../../hooks/useUserPreferences';

export function TutorialOverlay() {
  const [isVisible, setIsVisible] = useState(false);
  const { preferences } = useUserPreferences();

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('space_portfolio_tutorial');
    if (!hasSeenTutorial && preferences.showTooltips) {
      const timer = setTimeout(() => setIsVisible(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [preferences.showTooltips]);

  const dismiss = () => {
    setIsVisible(false);
    localStorage.setItem('space_portfolio_tutorial', 'true');
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-end justify-center pb-24 pointer-events-none"
      aria-live="polite"
      aria-atomic="true"
    >
      <div
        role="dialog"
        aria-modal="false"
        aria-label="Navigation tutorial"
        className="bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl pointer-events-auto max-w-md w-full mx-4 animate-in slide-in-from-bottom-8 fade-in duration-700 relative"
      >
        <button
          onClick={dismiss}
          aria-label="Close tutorial"
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
        >
          <X size={18} aria-hidden="true" />
        </button>

        <h3 className="text-white font-outfit font-bold text-lg mb-4 text-center">
          Navigating the System
        </h3>

        <div className="space-y-4">
          <div className="flex items-center gap-4 text-white/80">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 text-[#00D9FF]">
              <Move size={20} aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Scroll to Travel</p>
              <p className="text-xs text-white/50">Scroll down to fly the camera through the solar system.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-white/80">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 text-[#9D4EDD]">
              <MousePointer2 size={20} aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Click to Inspect</p>
              <p className="text-xs text-white/50">Click on any planet to enter orbit and view portfolio data.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-white/80">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 text-[#3A86FF]">
              <ZoomIn size={20} aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Drag to Look</p>
              <p className="text-xs text-white/50">While in orbit, drag to rotate the camera around the planet.</p>
            </div>
          </div>
        </div>

        <button
          onClick={dismiss}
          className="w-full mt-6 py-2 rounded-lg bg-gradient-to-r from-[#9D4EDD]/20 to-[#00D9FF]/20 border border-white/10 text-white text-sm font-bold hover:from-[#9D4EDD]/40 hover:to-[#00D9FF]/40 transition-all"
        >
          ACKNOWLEDGE
        </button>
      </div>
    </div>
  );
}
