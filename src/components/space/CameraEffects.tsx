import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';
import { useCinematicTimeline } from '../../hooks/useCinematicTimeline';
import { useCameraModes } from '../../hooks/useCameraModes';

type BloomEffectRef = {
  intensity: number;
};

type ChromaticAberrationEffectRef = {
  offset: THREE.Vector2;
};

type VignetteEffectRef = {
  darkness: number;
};

export function CameraEffects() {
  const { effectsState } = useCinematicTimeline();
  const { mode } = useCameraModes();

  const bloomRef = useRef<BloomEffectRef | null>(null);
  const chromabRef = useRef<ChromaticAberrationEffectRef | null>(null);
  const vignetteRef = useRef<VignetteEffectRef | null>(null);

  useFrame(() => {
    if (mode === 'CINEMATIC') {
      const state = effectsState.current;
      if (bloomRef.current) bloomRef.current.intensity = state.bloom;
      if (chromabRef.current) chromabRef.current.offset.set(state.chromaticX, state.chromaticY);
      if (vignetteRef.current) vignetteRef.current.darkness = state.vignette;
    } else {
      if (bloomRef.current) bloomRef.current.intensity = 0.8;
      if (chromabRef.current) chromabRef.current.offset.set(0, 0);
      if (vignetteRef.current) vignetteRef.current.darkness = 0.4;
    }
  });

  return (
    <EffectComposer disableNormalPass multisampling={0}>
      <Bloom
        ref={bloomRef}
        intensity={0.8}
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
        darkness={0.4}
      />
    </EffectComposer>
  );
}
