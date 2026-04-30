// ============================================================================
// NebulaCloud — Volumetric nebula using layered point sprites
// ============================================================================

import { useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface NebulaCloudProps {
  position?: [number, number, number];
  scrollProgress?: number;
  intensity?: number;
  colors?: string[];
  spread?: number;
  pointCount?: number;
}

const nebulaVertex = /* glsl */ `
  attribute float aSize;
  attribute vec3 aColor;
  attribute float aPhase;

  uniform float uTime;
  uniform float uIntensity;
  uniform float uScrollProgress;

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vColor = aColor;

    // Slow pulsing opacity per particle
    float pulse = 0.6 + 0.4 * sin(uTime * 0.5 + aPhase);
    vAlpha = pulse * uIntensity;

    vec3 pos = position;
    // Gentle drift animation
    pos.x += sin(uTime * 0.15 + aPhase) * 1.5;
    pos.y += cos(uTime * 0.12 + aPhase * 1.3) * 1.2;
    pos.z += sin(uTime * 0.1 + aPhase * 0.7) * 0.8;

    // Scroll parallax
    pos.y -= uScrollProgress * 15.0;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * (200.0 / -mvPosition.z);
    gl_PointSize = clamp(gl_PointSize, 1.0, 60.0);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const nebulaFragment = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;

    // Very soft gaussian-like falloff for volumetric feel
    float a = exp(-d * d * 8.0) * vAlpha;
    gl_FragColor = vec4(vColor, a * 0.3);
  }
`;

export default function NebulaCloud({
  position = [0, 0, -20],
  scrollProgress = 0,
  intensity = 1,
  colors = ['#8B5CF6', '#3B82F6', '#EC4899', '#F97316'],
  spread = 50,
  pointCount = 2000,
}: NebulaCloudProps) {
  const isMobile =
    typeof window !== 'undefined' &&
    (window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent));
  const count = isMobile ? Math.floor(pointCount * 0.5) : pointCount;

  const parsedColors = useMemo(
    () => colors.map((c) => new THREE.Color(c)),
    [colors],
  );

  const geometry = useMemo(() => {
    const positions  = new Float32Array(count * 3);
    const sizes      = new Float32Array(count);
    const colorAttrs = new Float32Array(count * 3);
    const phases     = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Gaussian-ish distribution (clumpier in centre)
      const r = Math.pow(Math.random(), 0.6) * spread;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6; // flatter
      positions[i3 + 2] = r * Math.cos(phi) * 0.4;

      sizes[i] = 0.5 + Math.random() * 3.0;
      phases[i] = Math.random() * Math.PI * 2;

      // Pick a random nebula colour
      const col = parsedColors[Math.floor(Math.random() * parsedColors.length)];
      colorAttrs[i3]     = col.r;
      colorAttrs[i3 + 1] = col.g;
      colorAttrs[i3 + 2] = col.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute('aSize',    new THREE.Float32BufferAttribute(sizes, 1));
    geo.setAttribute('aColor',   new THREE.Float32BufferAttribute(colorAttrs, 3));
    geo.setAttribute('aPhase',   new THREE.Float32BufferAttribute(phases, 1));
    return geo;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: nebulaVertex,
        fragmentShader: nebulaFragment,
        uniforms: {
          uTime: { value: 0 },
          uIntensity: { value: intensity },
          uScrollProgress: { value: 0 },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
  // eslint-disable-next-line react-hooks/exhaustive-deps
  []);

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
    material.uniforms.uIntensity.value = intensity;
    material.uniforms.uScrollProgress.value = scrollProgress;
  });

  return (
    <points
      geometry={geometry}
      material={material}
      position={position}
    />
  );
}
