// ============================================================================
// Saturn — Ringed gas giant with translucent ring system
// ============================================================================

import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePlanetTextures } from '../../../contexts/useAssets';
import { SPACE_ASSETS } from '../../../config/assetConfig';

interface SaturnProps {
  position?: [number, number, number];
  scale?: number;
  scrollProgress?: number;
  interactive?: boolean;
}

export default function Saturn({
  position = [0, 0, 0],
  scale = 1,
  scrollProgress = 0,
  interactive = true,
}: SaturnProps) {
  const cfg = SPACE_ASSETS.planets.saturn;
  const textures = usePlanetTextures('saturn');

  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const targetScale = useRef(scale);

  // Create ring geometry — a flat disc with UV mapped radially
  const ringGeometry = useMemo(() => {
    if (!cfg.ring) return null;
    const { innerRadius, outerRadius, segments } = cfg.ring;
    const geo = new THREE.RingGeometry(innerRadius, outerRadius, segments);

    // Remap UVs so texture goes from inner to outer radius
    const pos = geo.attributes.position;
    const uv = geo.attributes.uv;
    const v3 = new THREE.Vector3();

    for (let i = 0; i < pos.count; i++) {
      v3.fromBufferAttribute(pos, i);
      const len = v3.length();
      const t = (len - innerRadius) / (outerRadius - innerRadius);
      uv.setXY(i, t, 1);
    }

    return geo;
  }, [cfg.ring]);

  useFrame((_state, delta) => {
    targetScale.current = hovered ? scale * 1.06 : scale;

    if (groupRef.current) {
      groupRef.current.rotation.y += cfg.animation.rotationSpeed;
      groupRef.current.rotation.x =
        cfg.animation.axialTilt + scrollProgress * 0.1;

      groupRef.current.scale.lerp(
        new THREE.Vector3(targetScale.current, targetScale.current, targetScale.current),
        delta * 4,
      );
    }
  });

  const { radius, widthSegments, heightSegments } = cfg.geometry;

  return (
    <group position={position}>
      <group
        ref={groupRef}
        rotation={[cfg.animation.axialTilt, 0, 0]}
        onPointerEnter={interactive ? () => setHovered(true) : undefined}
        onPointerLeave={interactive ? () => setHovered(false) : undefined}
      >
        {/* Planet body */}
        <mesh>
          <sphereGeometry args={[radius, widthSegments, heightSegments]} />
          <meshStandardMaterial
            map={textures.dayMap ?? null}
            metalness={0.05}
            roughness={0.8}
          />
        </mesh>

        {/* Ring system */}
        {ringGeometry && (
          <mesh geometry={ringGeometry} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial
              map={textures.ringMap ?? null}
              side={THREE.DoubleSide}
              transparent
              opacity={0.8}
              depthWrite={false}
              metalness={0.2}
              roughness={0.6}
            />
          </mesh>
        )}

        {/* Atmosphere glow */}
        <mesh scale={[1.06, 1.06, 1.06]}>
          <sphereGeometry args={[radius, 32, 32]} />
          <meshBasicMaterial
            color={new THREE.Color(0.9, 0.85, 0.6)}
            transparent
            opacity={0.03}
            side={THREE.BackSide}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>
    </group>
  );
}
