// ============================================================================
// CameraEffects — Dynamic post-processing orchestrator
// ============================================================================
// Per-section bloom + vignette targets, smooth lerp every frame.
// DOF on planet detail panel open/close.
// FPS-based bloom resolution fallback.
// ============================================================================

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import {
  EffectComposer,
  Bloom,
  Vignette,
  ChromaticAberration,
  DepthOfField,
} from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';
import { useCinematicTimeline } from '../../hooks/useCinematicTimeline';
import { useCameraModes } from '../../hooks/useCameraModes';
import { useScrollOrchestrator } from '../../hooks/useScrollOrchestrator';

// ─── Per-section post-processing targets ──────────────────────────────────────
const PP_TARGETS: Record<string, { bloom: number; vignette: number }> = {
  sun:        { bloom: 0.9, vignette: 0.3 },
  earth:      { bloom: 0.4, vignette: 0.2 },
  mars:       { bloom: 0.3, vignette: 0.25 },
  venus:      { bloom: 0.5, vignette: 0.2 },
  saturn:     { bloom: 0.5, vignette: 0.2 },
  jupiter:    { bloom: 0.45, vignette: 0.2 },
  travel:     { bloom: 0.6, vignette: 0.5 },
  // Section names from useCinematicTimeline.currentSection
  hero:         { bloom: 0.4, vignette: 0.2 },
  projects:     { bloom: 0.3, vignette: 0.25 },
  skills:       { bloom: 0.5, vignette: 0.2 },
  certs:        { bloom: 0.5, vignette: 0.2 },
  contact:      { bloom: 0.45, vignette: 0.2 },
  'deep-space': { bloom: 0.8, vignette: 0.6 },
  'approach-earth': { bloom: 0.6, vignette: 0.4 },
};

const DEFAULT_TARGET = { bloom: 0.5, vignette: 0.3 };
const LERP_FACTOR = 0.05;

// Planet world positions (must match PlanetarySystem.tsx)
const PLANET_POSITIONS: Record<string, THREE.Vector3> = {
  earth:   new THREE.Vector3(0, 0, 0),
  mars:    new THREE.Vector3(15, 2, -10),
  venus:   new THREE.Vector3(-15, -5, -25),
  saturn:  new THREE.Vector3(-20, 10, -35),
  jupiter: new THREE.Vector3(0, 10, -40),
};

type BloomEffectRef = { intensity: number; resolution: number };
type ChromaticAberrationEffectRef = { offset: THREE.Vector2 };
type VignetteEffectRef = { darkness: number };
type DOFEffectRef = { target: THREE.Vector3; bokehScale: number; focusDistance: number };

export function CameraEffects() {
  const { effectsState, currentSection } = useCinematicTimeline();
  const { mode } = useCameraModes();
  const { sectionProgress } = useScrollOrchestrator();
  const { camera } = useThree();

  const bloomRef = useRef<BloomEffectRef | null>(null);
  const chromabRef = useRef<ChromaticAberrationEffectRef | null>(null);
  const vignetteRef = useRef<VignetteEffectRef | null>(null);
  const dofRef = useRef<DOFEffectRef | null>(null);

  // Smoothed current values
  const currentBloom = useRef(0.5);
  const currentVignette = useRef(0.3);
  const currentBokeh = useRef(0);
  const dofEnabled = useRef(false);
  const dofClosing = useRef(false);

  // FPS tracking
  const frameTimings = useRef<number[]>([]);
  const lowFpsFrameCount = useRef(0);
  const bloomResolution = useRef(1.0);

  // DOF state — driven externally via window events
  const panelOpen = useRef(false);
  const activePlanetId = useRef<string | null>(null);

  // Listen for panel open/close events dispatched by PlanetDetailPanel
  // We use a custom DOM event so we don't need prop drilling
  if (typeof window !== 'undefined') {
    (window as Record<string, unknown>).__cameraEffectsSetPanel = (
      planetId: string | null
    ) => {
      if (planetId) {
        panelOpen.current = true;
        dofClosing.current = false;
        activePlanetId.current = planetId;
      } else {
        panelOpen.current = false;
        dofClosing.current = true;
        activePlanetId.current = null;
      }
    };
  }

  useFrame((_state, delta) => {
    // ── FPS tracking ──────────────────────────────────────────────────────────
    frameTimings.current.push(delta);
    if (frameTimings.current.length > 60) frameTimings.current.shift();

    if (frameTimings.current.length === 60) {
      const avgDelta = frameTimings.current.reduce((a, b) => a + b, 0) / 60;
      const avgFps = 1 / avgDelta;

      if (avgFps < 50) {
        bloomResolution.current = 0.5;
        lowFpsFrameCount.current = 0;
      } else if (avgFps > 58) {
        lowFpsFrameCount.current++;
        if (lowFpsFrameCount.current > 120) {
          bloomResolution.current = 1.0;
          lowFpsFrameCount.current = 0;
        }
      }
    }

    // ── Section target selection ──────────────────────────────────────────────
    const section = currentSection.current;
    const target = PP_TARGETS[section] ?? DEFAULT_TARGET;

    // ── Vignette travel ramp using sectionProgress ────────────────────────────
    let vignetteTarget = target.vignette;
    if (section === 'travel') {
      // Full travel intensity in mid-travel (0.4–0.6), ramp at edges
      if (sectionProgress >= 0.4 && sectionProgress <= 0.6) {
        vignetteTarget = PP_TARGETS.travel.vignette;
      } else if (sectionProgress < 0.15 || sectionProgress > 0.85) {
        // Near boundaries — lerp back toward zero
        const edgeT = sectionProgress < 0.15
          ? sectionProgress / 0.15
          : (1.0 - sectionProgress) / 0.15;
        vignetteTarget = vignetteTarget * edgeT;
      }
    }

    // ── Smooth lerp bloom + vignette ─────────────────────────────────────────
    if (mode === 'CINEMATIC') {
      const csBloom = effectsState.current.bloom;
      // Blend between GSAP timeline value and per-section target
      const blendedBloomTarget = (csBloom + target.bloom) * 0.5;
      currentBloom.current += (blendedBloomTarget - currentBloom.current) * LERP_FACTOR;
      currentVignette.current += (vignetteTarget - currentVignette.current) * LERP_FACTOR;
    } else {
      currentBloom.current += (0.8 - currentBloom.current) * LERP_FACTOR;
      currentVignette.current += (0.4 - currentVignette.current) * LERP_FACTOR;
    }

    // ── Apply bloom + vignette ────────────────────────────────────────────────
    if (bloomRef.current) {
      bloomRef.current.intensity = currentBloom.current;
      bloomRef.current.resolution = bloomResolution.current;
    }
    if (vignetteRef.current) {
      vignetteRef.current.darkness = currentVignette.current;
    }

    // ── Chromatic aberration from GSAP timeline ───────────────────────────────
    if (chromabRef.current && mode === 'CINEMATIC') {
      chromabRef.current.offset.set(
        effectsState.current.chromaticX,
        effectsState.current.chromaticY,
      );
    } else if (chromabRef.current) {
      chromabRef.current.offset.set(0, 0);
    }

    // ── Depth of field ────────────────────────────────────────────────────────
    if (dofRef.current) {
      if (panelOpen.current && activePlanetId.current) {
        const planetPos = PLANET_POSITIONS[activePlanetId.current];
        if (planetPos) {
          dofEnabled.current = true;
          const focalDist = camera.position.distanceTo(planetPos);
          dofRef.current.focusDistance = focalDist * 0.01; // normalized 0-1
          // Lerp bokeh up
          currentBokeh.current += (8 - currentBokeh.current) * 0.06;
          dofRef.current.bokehScale = currentBokeh.current;
        }
      } else if (dofClosing.current) {
        // Lerp bokeh to 0
        currentBokeh.current += (0 - currentBokeh.current) * 0.06;
        dofRef.current.bokehScale = currentBokeh.current;
        if (currentBokeh.current < 0.05) {
          dofClosing.current = false;
          dofEnabled.current = false;
          currentBokeh.current = 0;
        }
      }
    }
  });

  return (
    <EffectComposer disableNormalPass multisampling={0}>
      <Bloom
        ref={bloomRef}
        intensity={0.5}
        luminanceThreshold={0.3}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      <ChromaticAberration
        ref={chromabRef}
        blendFunction={BlendFunction.NORMAL}
        offset={new THREE.Vector2(0, 0)}
      />
      <Vignette
        ref={vignetteRef}
        eskil={false}
        offset={0.1}
        darkness={0.3}
      />
      <DepthOfField
        ref={dofRef}
        focusDistance={0}
        focalLength={0.02}
        bokehScale={0}
        height={480}
      />
    </EffectComposer>
  );
}
