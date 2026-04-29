// ============================================================================
// Venus — Thick atmosphere with surface beneath
// ============================================================================

import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePlanetTextures } from '../../../contexts/useAssets';
import { SPACE_ASSETS } from '../../../config/assetConfig';

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
  const [hovered, setHovered] = useState(false);
  const targetScale = useRef(scale);

  // Atmosphere haze material
  const hazeMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(1.0, 0.85, 0.5),
        transparent: true,
        opacity: 0.06,
        side: THREE.BackSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [],
  );

  useFrame((_state, delta) => {
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
          map={textures.surfaceMap ?? null}
          metalness={0.05}
          roughness={0.9}
        />
      </mesh>

      {/* Thick cloudy atmosphere */}
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

      {/* Outer glow */}
      <mesh scale={[1.12, 1.12, 1.12]}>
        <sphereGeometry args={[radius, 32, 32]} />
        <primitive object={hazeMaterial} attach="material" />
      </mesh>
    </group>
  );
}
