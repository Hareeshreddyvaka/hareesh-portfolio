// ============================================================================
// Jupiter — Gas giant with banding and atmosphere glow
// ============================================================================

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePlanetTextures } from '../../../contexts/useAssets';
import { SPACE_ASSETS } from '../../../config/assetConfig';
import AtmosphereGlow from '../AtmosphereGlow';

interface JupiterProps {
  position?: [number, number, number];
  scale?: number;
  scrollProgress?: number;
  interactive?: boolean;
}

export default function Jupiter({
  position = [0, 0, 0],
  scale = 1,
  scrollProgress = 0,
  interactive = true,
}: JupiterProps) {
  const cfg = SPACE_ASSETS.planets.jupiter;
  const textures = usePlanetTextures('jupiter');

  const ref = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const currentLOD = useRef(false);

  const [hovered, setHovered] = useState(false);
  const targetScale = useRef(scale);

  useFrame((state, delta) => {
    targetScale.current = hovered ? scale * 1.06 : scale;

    if (ref.current) {
      ref.current.rotation.y += cfg.animation.rotationSpeed;
      ref.current.rotation.x =
        cfg.animation.axialTilt + scrollProgress * 0.08;

      ref.current.scale.lerp(
        new THREE.Vector3(targetScale.current, targetScale.current, targetScale.current),
        delta * 4,
      );
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
      <mesh
        ref={ref}
        rotation={[cfg.animation.axialTilt, 0, 0]}
        onPointerEnter={interactive ? () => setHovered(true) : undefined}
        onPointerLeave={interactive ? () => setHovered(false) : undefined}
      >
        <sphereGeometry args={[radius, widthSegments, heightSegments]} />
        <meshStandardMaterial
          ref={materialRef}
          map={textures.dayMap ?? null}
          metalness={0.05}
          roughness={0.85}
        />
      </mesh>

      {/* Pale warm atmospheric rim */}
      <AtmosphereGlow
        radius={radius}
        color={{ r: 0.8, g: 0.7, b: 0.6 }}
        baseIntensity={0.3}
        activeIntensity={1.0}
        lodDistance={25}
      />
    </group>
  );
}
