// ============================================================================
// Venus — Thick atmosphere with surface beneath
// ============================================================================

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePlanetTextures } from '../../../contexts/useAssets';
import { SPACE_ASSETS } from '../../../config/assetConfig';
import AtmosphereGlow from '../AtmosphereGlow';

interface VenusProps {
  position?: [number, number, number];
  scale?: number;
  scrollProgress?: number;
  interactive?: boolean;
}

export default function Venus({
  position = [0, 0, 0],
  scale = 1,
  scrollProgress = 0,
  interactive = true,
}: VenusProps) {
  const cfg = SPACE_ASSETS.planets.venus;
  const textures = usePlanetTextures('venus');

  const surfaceRef = useRef<THREE.Mesh>(null);
  const atmoRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const currentLOD = useRef(false);

  const [hovered, setHovered] = useState(false);
  const targetScale = useRef(scale);

  useFrame((state, delta) => {
    targetScale.current = hovered ? scale * 1.08 : scale;

    if (surfaceRef.current) {
      // Venus rotates retrograde (opposite direction)
      surfaceRef.current.rotation.y += cfg.animation.rotationSpeed;
      surfaceRef.current.rotation.x = scrollProgress * 0.1;

      surfaceRef.current.scale.lerp(
        new THREE.Vector3(targetScale.current, targetScale.current, targetScale.current),
        delta * 4,
      );
    }

    if (atmoRef.current) {
      // Atmosphere rotates slightly faster
      atmoRef.current.rotation.y += cfg.animation.rotationSpeed * 1.5;
    }

    const dist = state.camera.position.distanceTo(new THREE.Vector3(...position));
    const useLOD = dist > cfg.lodDistance!;
    if (useLOD !== currentLOD.current) {
      currentLOD.current = useLOD;
      const baseName = cfg.textures.surfaceMap.url.substring(0, cfg.textures.surfaceMap.url.lastIndexOf('.'));
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
      {/* Surface */}
      <mesh
        ref={surfaceRef}
        onPointerEnter={interactive ? () => setHovered(true) : undefined}
        onPointerLeave={interactive ? () => setHovered(false) : undefined}
      >
        <sphereGeometry args={[radius, widthSegments, heightSegments]} />
        <meshStandardMaterial
          ref={materialRef}
          map={textures.surfaceMap ?? null}
          metalness={0.05}
          roughness={0.9}
        />
      </mesh>

      {/* Thick cloudy atmosphere layer */}
      {textures.atmosphereMap && (
        <mesh ref={atmoRef}>
          <sphereGeometry args={[radius * 1.02, widthSegments, heightSegments]} />
          <meshStandardMaterial
            map={textures.atmosphereMap}
            transparent
            opacity={0.6}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* Orange-yellow Rayleigh rim */}
      <AtmosphereGlow
        radius={radius}
        color={{ r: 0.9, g: 0.7, b: 0.3 }}
        baseIntensity={0.3}
        activeIntensity={1.0}
        lodDistance={20}
      />
    </group>
  );
}
