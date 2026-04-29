import { useMemo, useEffect, useRef } from 'react';
import { gsap as GSAPCore } from 'gsap';
import { cinematicSequences } from '../animations/cinematicSequences';
import { useScrollOrchestrator } from './useScrollOrchestrator';
import { useCameraModes } from './useCameraModes';

export function useCinematicTimeline() {
  const { totalProgress } = useScrollOrchestrator();
  const { mode } = useCameraModes();
  
  // State objects that GSAP will mutate
  const cameraState = useRef({
    px: 0, py: 10, pz: 80,
    tx: 0, ty: 0, tz: 0,
    fov: 65,
  });
  
  const effectsState = useRef({
    bloom: 2.5,
    chromaticX: 0.005, chromaticY: 0.005,
    vignette: 0.8
  });
  
  const currentSection = useRef('deep-space');

  // Build the GSAP timeline once
  const tl = useMemo(() => {
    const timeline = GSAPCore.timeline({ paused: true });
    
    // Sort sequences just in case
    const seqs = [...cinematicSequences].sort((a, b) => a.progress - b.progress);
    
    // Set initial state
    const start = seqs[0];
    cameraState.current = {
      px: start.camera.position[0], py: start.camera.position[1], pz: start.camera.position[2],
      tx: start.camera.target[0], ty: start.camera.target[1], tz: start.camera.target[2],
      fov: start.camera.fov || 65
    };
    if (start.effects) {
      effectsState.current = {
        bloom: start.effects.bloomIntensity || 1,
        chromaticX: start.effects.chromaticAberrationOffset?.[0] || 0,
        chromaticY: start.effects.chromaticAberrationOffset?.[1] || 0,
        vignette: start.effects.vignetteDarkness || 0.5
      };
    }

    // Build tweens between keyframes
    for (let i = 1; i < seqs.length; i++) {
      const prev = seqs[i - 1];
      const next = seqs[i];
      const duration = next.progress - prev.progress;
      
      const camProps = {
        px: next.camera.position[0], py: next.camera.position[1], pz: next.camera.position[2],
        tx: next.camera.target[0], ty: next.camera.target[1], tz: next.camera.target[2],
        fov: next.camera.fov || 65,
        ease: 'power2.inOut',
        duration
      };

      timeline.to(cameraState.current, camProps, prev.progress);
      
      if (next.effects) {
        const effProps = {
          bloom: next.effects.bloomIntensity ?? effectsState.current.bloom,
          chromaticX: next.effects.chromaticAberrationOffset?.[0] ?? effectsState.current.chromaticX,
          chromaticY: next.effects.chromaticAberrationOffset?.[1] ?? effectsState.current.chromaticY,
          vignette: next.effects.vignetteDarkness ?? effectsState.current.vignette,
          ease: 'power2.inOut',
          duration
        };
        timeline.to(effectsState.current, effProps, prev.progress);
      }
    }
    
    return timeline;
  }, []);

  // Update timeline based on scroll progress
  useEffect(() => {
    if (mode === 'CINEMATIC') {
      // Seek timeline to exact progress (0 to 1)
      tl.progress(totalProgress);
      
      // Determine current section for UI context
      const currentSeq = [...cinematicSequences].reverse().find(s => totalProgress >= s.progress);
      if (currentSeq && currentSeq.section) {
        currentSection.current = currentSeq.section;
      }
    }
  }, [totalProgress, mode, tl]);

  return { cameraState, effectsState, currentSection };
}
