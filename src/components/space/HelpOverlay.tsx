import React from 'react';
import { X } from 'lucide-react';

interface HelpOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SHORTCUTS = [
  { key: '?', label: 'Toggle this help dialog' },
  { key: 'P', label: 'Toggle Photo / Free Roam mode' },
  { key: 'Esc', label: 'Close panels, return to cinematic view' },
  { key: '↑ ↓ ← →', label: 'Fine camera control (in Free Roam)' },
  { key: 'Scroll', label: 'Fly through the solar system' },
  { key: 'Click', label: 'Inspect a planet' },
];

export function HelpOverlay({ isOpen, onClose }: HelpOverlayProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-[#0A0D14]/95 border border-white/10 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white font-['Space_Grotesk']">
            Navigation Controls
          </h2>
          <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-3">
          {SHORTCUTS.map((s) => (
            <div key={s.key} className="flex items-center justify-between gap-4">
              <span className="text-white/70 text-sm">{s.label}</span>
              <kbd className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[#00D9FF] text-xs font-mono min-w-[60px] text-center">
                {s.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 text-center">
          <p className="text-xs text-white/30">Press <kbd className="text-[#9D4EDD]">?</kbd> again to close</p>
        </div>
      </div>
    </div>
  );
}
