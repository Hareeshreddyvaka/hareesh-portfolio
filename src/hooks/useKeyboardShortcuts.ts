import { useEffect, useState, useCallback } from 'react';
import { useCameraModes } from './useCameraModes';

/**
 * Global keyboard shortcut system.
 * ? = Help, P = Photo mode, Escape = Close panels, Arrows = Fine camera
 */
export function useKeyboardShortcuts() {
  const [showHelp, setShowHelp] = useState(false);
  const { mode, setMode } = useCameraModes();

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Don't capture if user is typing in an input
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
    
    switch (e.key) {
      case '?':
        e.preventDefault();
        setShowHelp(prev => !prev);
        break;
      case 'p':
      case 'P':
        e.preventDefault();
        setMode(mode === 'FREE_ROAM' ? 'CINEMATIC' : 'FREE_ROAM');
        break;
      case 'Escape':
        setShowHelp(false);
        setMode('CINEMATIC');
        // Dispatch custom event that panels can listen to
        window.dispatchEvent(new CustomEvent('portfolio:close-panels'));
        break;
    }
  }, [mode, setMode]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return { showHelp, setShowHelp };
}
