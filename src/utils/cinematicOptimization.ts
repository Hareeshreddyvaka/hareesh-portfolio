import { useEffect, useState } from 'react';

/**
 * Hook to determine device capabilities and apply performance optimizations
 * like lowering pixel ratio, reducing particle counts, or disabling heavy effects.
 */
export function useCinematicOptimization() {
  const [performanceTier, setPerformanceTier] = useState<'HIGH' | 'MEDIUM' | 'LOW'>('HIGH');

  useEffect(() => {
    // Simple heuristic: if mobile, set to MEDIUM or LOW
    const isMobile = /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
    // We could also check hardware concurrency
    const cores = navigator.hardwareConcurrency || 4;

    if (isMobile) {
      setPerformanceTier(cores > 4 ? 'MEDIUM' : 'LOW');
    } else {
      setPerformanceTier('HIGH');
    }
  }, []);

  return {
    tier: performanceTier,
    dpr: performanceTier === 'HIGH' ? [1, 2] : performanceTier === 'MEDIUM' ? [1, 1.5] : [1, 1],
    enablePostProcessing: performanceTier !== 'LOW',
    particleCountMultiplier: performanceTier === 'HIGH' ? 1 : performanceTier === 'MEDIUM' ? 0.5 : 0.2
  };
}
