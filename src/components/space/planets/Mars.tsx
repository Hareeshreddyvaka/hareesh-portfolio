// ============================================================================
// Mars — The Red Planet
// ============================================================================

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePlanetTextures } from '../../../contexts/useAssets';
import { SPACE_ASSETS } from '../../../config/assetConfig';

interface MarsProps {
  position?: [number, number, number];
  scale?: number;
  scrollProgress?: number;
  interactive?: boolean;
}

export default function Mars({
  position = [0, 0, 0],
  scale = 1,
  scrollProgress = 0,
  interactive = true,
}: MarsProps) {
  const cfg = SPACE_ASSETS.planets.mars;
  const textures = usePlanetTextures('mars');

  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const targetScale = useRef(scale);

  useFrame((_state, delta) => {
    targetScale.current = hovered ? scale * 1.08 : scale;

    if (ref.current) {
      ref.current.rotation.y += cfg.animation.rotationSpeed;
      ref.current.rotation.x =
        cfg.animation.axialTilt + scrollProgress * 0.1;

      ref.current.scale.lerp(
        new THREE.Vector3(targetScale.current, targetScale.current, targetScale.current),
        delta * 4,
      );
    }
  });

  const { radius, widthSegments, heightSegments } = cfg.geometry;

  return (
    <group position={position}>
      <mesh
        ref={ref}
        rotation={[cfg.animation.axialTilt, 0, 0]}
        onPointerEnter={interactive ? () => setHovered(true) : undefined}
        onPointerLeave={interactive ? () => setHovered(false) : undefined}
      >
        <sphereGeometry args={[radius, widthSegments, heightSegments]} />
        <meshStandardMaterial
          map={textures.dayMap ?? null}
          metalness={0.08}
          roughness={0.9}
        />
      </mesh>

      {/* Faint reddish atmosphere */}
      <mesh scale={[1.05, 1.05, 1.05]}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshBasicMaterial
          color={new THREE.Color(0.9, 0.4, 0.2)}
          transparent
          opacity={0.03}
          side={THREE.BackSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}
