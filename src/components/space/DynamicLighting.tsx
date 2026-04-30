import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useCinematicTimeline } from '../../hooks/useCinematicTimeline';

const SECTOR_MOODS: Record<string, { lightColor: string, fogColor: string, fogNear: number, fogFar: number }> = {
  'deep-space':     { lightColor: '#ffffff', fogColor: '#050510', fogNear: 60, fogFar: 200 },
  'approach-earth': { lightColor: '#fff5e0', fogColor: '#0A0D12', fogNear: 50, fogFar: 180 },
  'hero':           { lightColor: '#fff5e0', fogColor: '#0A0D12', fogNear: 50, fogFar: 180 },
  'travel':         { lightColor: '#aaccff', fogColor: '#0d0520', fogNear: 30, fogFar: 120 },
  'projects':       { lightColor: '#ffddaa', fogColor: '#120800', fogNear: 45, fogFar: 160 },
  'skills':         { lightColor: '#ffeecc', fogColor: '#0a0700', fogNear: 50, fogFar: 170 },
  'certs':          { lightColor: '#e0f0ff', fogColor: '#030812', fogNear: 55, fogFar: 180 },
  'contact':        { lightColor: '#cceeff', fogColor: '#000510', fogNear: 60, fogFar: 200 },
};

export function DynamicLighting() {
  const { currentSection } = useCinematicTimeline();
  const { scene } = useThree();
  
  const mainLightRef = useRef<THREE.DirectionalLight>(null);
  const fillLightRef = useRef<THREE.PointLight>(null);
  
  // Pre-allocate reusable objects to avoid GC pressure in useFrame
  const _tempVec = useMemo(() => new THREE.Vector3(), []);
  
  // Cache colors
  const colors = useMemo(() => {
    const map: Record<string, { light: THREE.Color, fog: THREE.Color }> = {};
    Object.keys(SECTOR_MOODS).forEach(key => {
      map[key] = {
        light: new THREE.Color(SECTOR_MOODS[key].lightColor),
        fog: new THREE.Color(SECTOR_MOODS[key].fogColor)
      };
    });
    return map;
  }, []);

  // Initialize fog once
  useMemo(() => {
    scene.fog = new THREE.Fog('#050510', 60, 200);
  }, [scene]);

  useFrame((state, delta) => {
    const moodKey = SECTOR_MOODS[currentSection.current] ? currentSection.current : 'deep-space';
    const targetMood = SECTOR_MOODS[moodKey];
    const targetColors = colors[moodKey];
    const lerpFactor = Math.min(delta * 2, 1);
    
    // Smoothly interpolate scene fog (using Fog, not FogExp2 for better control)
    if (scene.fog instanceof THREE.Fog) {
      scene.fog.color.lerp(targetColors.fog, lerpFactor);
      scene.fog.near = THREE.MathUtils.lerp(scene.fog.near, targetMood.fogNear, lerpFactor);
      scene.fog.far = THREE.MathUtils.lerp(scene.fog.far, targetMood.fogFar, lerpFactor);
    }
    
    // Smoothly interpolate lighting
    if (mainLightRef.current) {
      mainLightRef.current.color.lerp(targetColors.light, lerpFactor);
    }
    
    // Fill light follows camera — REUSE vector, no allocation
    if (fillLightRef.current) {
      _tempVec.set(
        state.camera.position.x - 10,
        state.camera.position.y + 10,
        state.camera.position.z + 5
      );
      fillLightRef.current.position.lerp(_tempVec, lerpFactor);
    }
  });

  return (
    <>
      <directionalLight 
        ref={mainLightRef} 
        position={[30, 20, 20]} 
        intensity={2.5} 
      />
      <pointLight 
        ref={fillLightRef} 
        intensity={0.5} 
        color="#8B5CF6" 
        distance={60} 
      />
      <ambientLight intensity={0.12} />
    </>
  );
}
