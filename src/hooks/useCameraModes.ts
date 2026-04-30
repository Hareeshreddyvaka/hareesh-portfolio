import { useState, useCallback, useEffect } from 'react';

export type CameraMode = 'CINEMATIC' | 'FREE_ROAM' | 'ORBIT' | 'INSPECT';

// Global state alternative to avoid prop drilling
let currentGlobalMode: CameraMode = 'CINEMATIC';
const listeners = new Set<(mode: CameraMode) => void>();

export function useCameraModes() {
  const [mode, setModeState] = useState<CameraMode>(currentGlobalMode);

  const setMode = useCallback((newMode: CameraMode) => {
    currentGlobalMode = newMode;
    listeners.forEach(l => l(newMode));
  }, []);

  // Sync state across components
  useEffect(() => {
    const listener = (m: CameraMode) => setModeState(m);
    listeners.add(listener);
    return () => { listeners.delete(listener); };
  }, []);

  return { mode, setMode };
}
