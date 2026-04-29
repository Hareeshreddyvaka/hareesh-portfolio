import { useState } from 'react';

interface UserPreferences {
  enablePostProcessing: boolean;
  reduceMotion: boolean;
  showTooltips: boolean;
}

const DEFAULT_PREFS: UserPreferences = {
  enablePostProcessing: true,
  reduceMotion: false,
  showTooltips: true,
};

export function useUserPreferences() {
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    try {
      const saved = localStorage.getItem('space_portfolio_prefs');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not load preferences from localStorage', e);
    }
    // Check OS reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return { ...DEFAULT_PREFS, reduceMotion: prefersReducedMotion };
  });

  const updatePreference = <K extends keyof UserPreferences>(key: K, value: UserPreferences[K]) => {
    setPreferences(prev => {
      const updated = { ...prev, [key]: value };
      localStorage.setItem('space_portfolio_prefs', JSON.stringify(updated));
      return updated;
    });
  };

  return { preferences, updatePreference };
}
