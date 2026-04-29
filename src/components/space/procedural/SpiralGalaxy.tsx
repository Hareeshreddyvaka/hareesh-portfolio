// ============================================================================
// SpiralGalaxy — Procedural multi-arm spiral galaxy
// ============================================================================

import { useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SpiralGalaxyProps {
  position?: [number, number, number];
  scale?: number;
  scrollProgress?: number;
  arms?: number;
  starCount?: number;
  radius?: number;
}

const galaxyVertex = /* glsl */ `
  attribute float aSize;
  attribute vec3 aColor;

  uniform float uTime;
  uniform float uIntensity;

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vColor = aColor;
    vAlpha = uIntensity;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * (250.0 / -mvPosition.z);
    gl_PointSize = clamp(gl_PointSize, 0.3, 4.0);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const galaxyFragment = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;

    float a = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(vColor, a * vAlpha);
  }
`;

export default function SpiralGalaxy({
  position = [0, 0, -100],
  scale = 1,
  scrollProgress = 0,
  arms = 4,
  starCount = 40000,
  radius = 80,
}: SpiralGalaxyProps) {
  const isMobile =
    typeof window !== 'undefined' &&
    (window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent));
  const count = isMobile ? Math.floor(starCount * 0.4) : starCount;

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes     = new Float32Array(count);
    const colors    = new Float32Array(count * 3);

    const coreColor = new THREE.Color(1, 0.95, 0.8);
    const armColor  = new THREE.Color(0.6, 0.7, 1.0);
    const dustColor = new THREE.Color(0.9, 0.6, 0.4);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Which arm?
      const arm = i % arms;
      const armAngle = (arm / arms) * Math.PI * 2;

      // Distance from centre (exponential for dense core)
      const r = Math.pow(Math.random(), 0.5) * radius;

      // Logarithmic spiral angle
      const spiralAngle = armAngle + r * 0.06 + (Math.random() - 0.5) * 0.5;

      // Arm width increases with distance
      const spread = r * 0.08;
      positions[i3]     = Math.cos(spiralAngle) * r + (Math.random() - 0.5) * spread;
      positions[i3 + 1] = (Math.random() - 0.5) * radius * 0.02; // thin disc
      positions[i3 + 2] = Math.sin(spiralAngle) * r + (Math.random() - 0.5) * spread;

      // Size — slightly bigger closer to core
      sizes[i] = (0.02 + Math.random() * 0.08) * (1 + (1 - r / radius) * 2);

      // Color — lerp from core to arm, occasional dust
      const t = r / radius;
      const rnd = Math.random();
      let col: THREE.Color;
      if (rnd < 0.1) {
        col = dustColor;
      } else {
        col = coreColor.clone().lerp(armColor, t);
      }
      colors[i3]     = col.r;
      colors[i3 + 1] = col.g;
      colors[i3 + 2] = col.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute('aSize',    new THREE.Float32BufferAttribute(sizes, 1));
    geo.setAttribute('aColor',   new THREE.Float32BufferAttribute(colors, 3));
    return geo;
  }, [arms, count, radius]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: galaxyVertex,
        fragmentShader: galaxyFragment,
        uniforms: {
          uTime: { value: 0 },
          uIntensity: { value: 0.6 },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [],
  );

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;

    // Scroll changes intensity
    const scrollFade = Math.max(0.2, 1 - scrollProgress * 0.8);
    material.uniforms.uIntensity.value = 0.6 * scrollFade;
  });

  return (
    <group position={position} scale={[scale, scale, scale]} rotation={[Math.PI * 0.35, 0, 0]}>
      <points geometry={geometry} material={material} />
    </group>
  );
}
