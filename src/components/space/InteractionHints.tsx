import { useEffect, useState, useCallback } from 'react';

interface InteractionHintsProps {
  mode?: 'EXPLORE' | 'ORBIT' | 'INSPECT';
  hasSelection?: boolean;
}

export function InteractionHints({ mode = 'EXPLORE', hasSelection = false }: InteractionHintsProps) {
  const [showHint, setShowHint] = useState(true);
  const [hintText, setHintText] = useState('');
  const [hintKey, setHintKey] = useState(0); // to re-trigger fade animation

  const dismiss = useCallback(() => setShowHint(false), []);

  // Update hint text based on mode
  useEffect(() => {
    if (mode === 'EXPLORE' && !hasSelection) {
      setHintText('Scroll to fly through space · Click planets to explore');
    } else if (mode === 'ORBIT') {
      setHintText('Drag to rotate · Scroll to zoom · ESC to return');
    } else if (mode === 'INSPECT') {
      setHintText('ESC or ← Back to return to flight');
    } else {
      setHintText('');
    }
    setShowHint(true);
    setHintKey(prev => prev + 1);
  }, [mode, hasSelection]);

  // Auto-dismiss after 5s
  useEffect(() => {
    if (!showHint) return;
    const timer = setTimeout(dismiss, 6000);
    return () => clearTimeout(timer);
  }, [showHint, hintKey, dismiss]);

  if (!hintText) return null;

  return (
    <div
      key={hintKey}
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-40 pointer-events-none transition-all duration-1000 ${
        showHint ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="bg-black/60 backdrop-blur-md border border-white/10 text-white/70 px-6 py-3 rounded-full text-sm font-light tracking-wide flex items-center gap-3 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
        <span className="inline-block w-2 h-2 rounded-full bg-[#00D9FF] animate-pulse" />
        {hintText}
      </div>
    </div>
  );
}
