// ============================================================================
// EnhancedStarfield — Dense procedural starfield with depth + twinkling
// ============================================================================
// Upgrades the base Starfield with more stars, better color variation,
// and scroll-responsive depth parallax.
// ============================================================================

import { useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SPACE_ASSETS } from '../../../config/assetConfig';

interface EnhancedStarfieldProps {
  scrollProgress?: number;
  intensity?: number;
  speed?: number;
}

const vertexShader = /* glsl */ `
  attribute float aSize;
  attribute vec3 aColor;
  attribute float aTwinklePhase;
  attribute float aTwinkleFreq;
  attribute float aDepthLayer;

  uniform float uTime;
  uniform float uIntensity;
  uniform float uScrollProgress;

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vColor = aColor;

    // Twinkle animation
    float twinkle = 0.4 + 0.6 * sin(uTime * aTwinkleFreq + aTwinklePhase);
    vAlpha = twinkle * uIntensity;

    // Depth-based parallax on scroll
    vec3 pos = position;
    pos.y -= uScrollProgress * aDepthLayer * 80.0;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * (300.0 / -mvPosition.z) * (0.5 + 0.5 * uIntensity);
    gl_PointSize = clamp(gl_PointSize, 0.5, 6.0);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;

    // Soft radial falloff for a natural star look
    float core = smoothstep(0.5, 0.0, d);
    float glow = smoothstep(0.5, 0.15, d) * 0.5;
    float a = (core + glow) * vAlpha;

    gl_FragColor = vec4(vColor, a);
  }
`;

export default function EnhancedStarfield({
  scrollProgress = 0,
  intensity = 1,
  speed = 1,
}: EnhancedStarfieldProps) {
  const cfg = SPACE_ASSETS.procedural.starfield.config as {
    count: number;
    spread: number;
    sizeRange: number[];
    twinkleSpeedRange: number[];
    colors: Record<string, { rgb: number[]; weight: number }>;
  };

  // Mobile detection — reduce particle count
  const isMobile =
    typeof window !== 'undefined' &&
    (window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent));
  const count = isMobile ? Math.floor(cfg.count * 0.5) : cfg.count;

  const geometry = useMemo(() => {
    const spread = cfg.spread;
    const [sizeMin, sizeMax] = cfg.sizeRange;
    const [twMin, twMax] = cfg.twinkleSpeedRange;

    // Build cumulative weights for color selection
    const colorEntries = Object.values(cfg.colors);
    const cumulWeights: number[] = [];
    let sum = 0;
    for (const c of colorEntries) { sum += c.weight; cumulWeights.push(sum); }

    const positions  = new Float32Array(count * 3);
    const sizes      = new Float32Array(count);
    const colors     = new Float32Array(count * 3);
    const phases     = new Float32Array(count);
    const freqs      = new Float32Array(count);
    const depthLayer = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Distribute in a large sphere-ish volume
      positions[i3]     = (Math.random() - 0.5) * spread;
      positions[i3 + 1] = (Math.random() - 0.5) * spread;
      positions[i3 + 2] = -Math.random() * spread;

      // Size based on distance (farther = smaller)
      const depthNorm = -positions[i3 + 2] / spread;
      sizes[i] = sizeMin + (sizeMax - sizeMin) * (1 - depthNorm) + Math.random() * 0.1;
      depthLayer[i] = depthNorm;

      // Weighted color pick
      const r = Math.random();
      let picked = colorEntries[0].rgb;
      for (let c = 0; c < cumulWeights.length; c++) {
        if (r < cumulWeights[c]) { picked = colorEntries[c].rgb; break; }
      }
      colors[i3]     = picked[0];
      colors[i3 + 1] = picked[1];
      colors[i3 + 2] = picked[2];

      phases[i] = Math.random() * Math.PI * 2;
      freqs[i]  = twMin + Math.random() * (twMax - twMin);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position',       new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute('aSize',          new THREE.Float32BufferAttribute(sizes, 1));
    geo.setAttribute('aColor',         new THREE.Float32BufferAttribute(colors, 3));
    geo.setAttribute('aTwinklePhase',  new THREE.Float32BufferAttribute(phases, 1));
    geo.setAttribute('aTwinkleFreq',   new THREE.Float32BufferAttribute(freqs, 1));
    geo.setAttribute('aDepthLayer',    new THREE.Float32BufferAttribute(depthLayer, 1));
    return geo;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
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
    material.uniforms.uTime.value = state.clock.elapsedTime * speed;
    material.uniforms.uIntensity.value = intensity;
    material.uniforms.uScrollProgress.value = scrollProgress;
  });

  return <points geometry={geometry} material={material} />;
}
