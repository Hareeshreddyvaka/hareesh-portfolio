// ============================================================================
// AtmosphereGlow — Shared Rayleigh rim atmosphere shader component
// ============================================================================
// Uses atmosphere.vert / atmosphere.frag via raw string import.
// Dynamic intensity lerps toward target based on camera proximity.
// ============================================================================

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Import GLSL as raw strings via Vite's ?raw suffix
import atmosphereVert from '../../shaders/atmosphere.vert?raw';
import atmosphereFrag from '../../shaders/atmosphere.frag?raw';

interface AtmosphereGlowProps {
  /** Planet surface radius (units) */
  radius: number;
  /** RGB color of the atmosphere rim {r,g,b} 0-1 */
  color: { r: number; g: number; b: number };
  /** Base intensity when camera is far (default 0.3) */
  baseIntensity?: number;
  /** Target intensity when camera is close (default 1.0) */
  activeIntensity?: number;
  /** How close (world units) before intensity ramps up */
  lodDistance?: number;
}

export default function AtmosphereGlow({
  radius,
  color,
  baseIntensity = 0.3,
  activeIntensity = 1.0,
  lodDistance = 20,
}: AtmosphereGlowProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const intensityRef = useRef(baseIntensity);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: atmosphereVert,
        fragmentShader: atmosphereFrag,
        uniforms: {
          uAtmosphereColor: { value: new THREE.Color(color.r, color.g, color.b) },
          uIntensity: { value: baseIntensity },
        },
        transparent: true,
        depthWrite: false,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useFrame(({ camera }) => {
    if (!meshRef.current) return;

    // Measure distance from camera to this mesh's world position
    const worldPos = new THREE.Vector3();
    meshRef.current.getWorldPosition(worldPos);
    const dist = camera.position.distanceTo(worldPos);

    // Target intensity based on proximity
    const target = dist < lodDistance ? activeIntensity : baseIntensity;

    // Lerp current intensity toward target
    intensityRef.current += (target - intensityRef.current) * 0.03;
    material.uniforms.uIntensity.value = intensityRef.current;
  });

  // Atmosphere shell is slightly larger than planet surface
  const atmoRadius = radius * 1.025;

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[atmoRadius, 32, 32]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}
