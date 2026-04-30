// ============================================================================
// Earth — Texture-mapped sphere with day/night, clouds & atmosphere glow
// ============================================================================

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePlanetTextures } from '../../../contexts/useAssets';
import { SPACE_ASSETS } from '../../../config/assetConfig';
import AtmosphereGlow from '../AtmosphereGlow';

interface EarthProps {
  position?: [number, number, number];
  scale?: number;
  scrollProgress?: number;
  interactive?: boolean;
  showClouds?: boolean;
  showAtmosphere?: boolean;
}

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
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const currentLOD = useRef(false);

  const [hovered, setHovered] = useState(false);
  const targetScale = useRef(scale);

  useFrame((state, delta) => {
    targetScale.current = hovered ? scale * 1.08 : scale;

    if (earthRef.current) {
      earthRef.current.rotation.y += cfg.animation.rotationSpeed;
      earthRef.current.rotation.x =
        cfg.animation.axialTilt + scrollProgress * 0.15;

      earthRef.current.scale.lerp(
        new THREE.Vector3(targetScale.current, targetScale.current, targetScale.current),
        delta * 4,
      );
    }

    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += cfg.animation.rotationSpeed * 1.15;
    }

    const dist = state.camera.position.distanceTo(new THREE.Vector3(...position));
    const useLOD = dist > cfg.lodDistance!;
    if (useLOD !== currentLOD.current) {
      currentLOD.current = useLOD;
      const baseName = cfg.textures.dayMap.url.substring(0, cfg.textures.dayMap.url.lastIndexOf('.'));
      const texPath = baseName + (useLOD ? '-512.webp' : '.webp');
      new THREE.TextureLoader().load(texPath, tex => {
        tex.colorSpace = THREE.SRGBColorSpace;
        if (materialRef.current) materialRef.current.map = tex;
      });
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
          ref={materialRef}
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

      {/* Rayleigh atmosphere — blue-white rim */}
      {showAtmosphere && (
        <AtmosphereGlow
          radius={radius}
          color={{ r: 0.3, g: 0.6, b: 1.0 }}
          baseIntensity={0.3}
          activeIntensity={1.0}
          lodDistance={20}
        />
      )}
    </group>
  );
}
