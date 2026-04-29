// ============================================================================
// Earth — Texture-mapped sphere with day/night, clouds & atmosphere glow
// ============================================================================

import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePlanetTextures } from '../../../contexts/useAssets';
import { SPACE_ASSETS } from '../../../config/assetConfig';

interface EarthProps {
  position?: [number, number, number];
  scale?: number;
  scrollProgress?: number;
  interactive?: boolean;
  showClouds?: boolean;
  showAtmosphere?: boolean;
}

// Atmosphere glow shader
const atmosphereVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vPosition;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const atmosphereFragment = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vPosition;
  uniform vec3 uGlowColor;
  uniform float uIntensity;

  void main() {
    vec3 viewDir = normalize(-vPosition);
    float rim = 1.0 - max(dot(viewDir, vNormal), 0.0);
    float glow = pow(rim, 3.0) * uIntensity;
    gl_FragColor = vec4(uGlowColor, glow * 0.6);
  }
`;

export default function Earth({
  position = [0, 0, 0],
  scale = 1,
  scrollProgress = 0,
  interactive = true,
  showClouds = true,
  showAtmosphere = true,
}: EarthProps) {
  const cfg = SPACE_ASSETS.planets.earth;
  const textures = usePlanetTextures('earth');

  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);

  const [hovered, setHovered] = useState(false);
  const targetScale = useRef(scale);

  // Atmosphere shader material
  const atmosphereMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: atmosphereVertex,
        fragmentShader: atmosphereFragment,
        uniforms: {
          uGlowColor: { value: new THREE.Color(0.3, 0.6, 1.0) },
          uIntensity: { value: 1.5 },
        },
        transparent: true,
        depthWrite: false,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
      }),
    [],
  );

  useFrame((_state, delta) => {
    // Smooth hover scale
    targetScale.current = hovered ? scale * 1.08 : scale;

    if (earthRef.current) {
      earthRef.current.rotation.y += cfg.animation.rotationSpeed;
      // Scroll-driven subtle tilt
      earthRef.current.rotation.x =
        cfg.animation.axialTilt + scrollProgress * 0.15;

      // Smooth scale lerp
      earthRef.current.scale.lerp(
        new THREE.Vector3(targetScale.current, targetScale.current, targetScale.current),
        delta * 4,
      );
    }

    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += cfg.animation.rotationSpeed * 1.15;
    }
  });

  const { radius, widthSegments, heightSegments } = cfg.geometry;

  return (
    <group position={position}>
      {/* Main Earth sphere */}
      <mesh
        ref={earthRef}
        rotation={[cfg.animation.axialTilt, 0, 0]}
        onPointerEnter={interactive ? () => setHovered(true) : undefined}
        onPointerLeave={interactive ? () => setHovered(false) : undefined}
      >
        <sphereGeometry args={[radius, widthSegments, heightSegments]} />
        <meshStandardMaterial
          map={textures.dayMap ?? null}
          normalMap={textures.normalMap ?? null}
          metalnessMap={textures.specularMap ?? null}
          metalness={0.1}
          roughness={0.7}
        />
      </mesh>

      {/* Cloud layer */}
      {showClouds && textures.cloudMap && (
        <mesh ref={cloudsRef} rotation={[cfg.animation.axialTilt, 0, 0]}>
          <sphereGeometry args={[radius * 1.01, widthSegments, heightSegments]} />
          <meshStandardMaterial
            map={textures.cloudMap}
            transparent
            opacity={0.35}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* Atmosphere glow */}
      {showAtmosphere && (
        <mesh scale={[1.15, 1.15, 1.15]}>
          <sphereGeometry args={[radius, 32, 32]} />
          <primitive object={atmosphereMaterial} attach="material" />
        </mesh>
      )}
    </group>
  );
}
