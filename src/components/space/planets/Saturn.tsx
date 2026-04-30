// ============================================================================
// Saturn — Ringed gas giant with InstancedMesh particle ring system
// ============================================================================

import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePlanetTextures } from '../../../contexts/useAssets';
import { SPACE_ASSETS } from '../../../config/assetConfig';
import AtmosphereGlow from '../AtmosphereGlow';

const RING_COUNT = 8000;

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
  const ringsRef = useRef<THREE.InstancedMesh>(null);
  const [hovered, setHovered] = useState(false);
  const targetScale = useRef(scale);

  const { radius } = cfg.geometry;
  const { widthSegments, heightSegments } = cfg.geometry;

  // Pre-compute ring particle transforms and colors — done once at mount
  const { matrices, colors, ringData } = useMemo(() => {
    const mats: THREE.Matrix4[] = [];
    const cols: THREE.Color[] = [];
    // Store angle+radius+y for shimmer in useFrame
    const data: { angle: number; r: number; y: number; scaleVal: number }[] = [];

    const sandyTan = new THREE.Color(0.87, 0.78, 0.59);
    const white = new THREE.Color(1.0, 1.0, 1.0);
    const innerR = radius * 1.3;
    const ringSpan = radius * 0.9; // innerR to innerR + ringSpan

    for (let i = 0; i < RING_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = innerR + Math.random() * ringSpan;
      const y = (Math.random() - 0.5) * 0.08 * radius;
      const scaleVal = 0.02 + Math.random() * 0.04;

      const mat = new THREE.Matrix4();
      mat.makeScale(scaleVal, scaleVal, scaleVal);
      mat.setPosition(Math.cos(angle) * r, y, Math.sin(angle) * r);
      mats.push(mat);

      // Color lerp: sandy tan (inner) → white (outer)
      const t = (r - innerR) / ringSpan;
      const col = sandyTan.clone().lerp(white, t);
      cols.push(col);

      data.push({ angle, r, y, scaleVal });
    }

    return { matrices: mats, colors: cols, ringData: data };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Apply initial matrices + colors once after mount
  const ringsInitialized = useRef(false);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
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

    // Initialize once ring instanced mesh is available
    if (ringsRef.current && !ringsInitialized.current) {
      for (let i = 0; i < RING_COUNT; i++) {
        ringsRef.current.setMatrixAt(i, matrices[i]);
        ringsRef.current.setColorAt(i, colors[i]);
      }
      ringsRef.current.instanceMatrix.needsUpdate = true;
      if (ringsRef.current.instanceColor) {
        ringsRef.current.instanceColor.needsUpdate = true;
      }
      ringsInitialized.current = true;
    }

    // Shimmer — update Y position per particle each frame
    if (ringsRef.current && ringsInitialized.current) {
      const mat = new THREE.Matrix4();
      for (let i = 0; i < RING_COUNT; i++) {
        const { angle, r, y, scaleVal } = ringData[i];
        const shimmerY = y + Math.sin(time + i * 0.7) * 0.003;
        mat.makeScale(scaleVal, scaleVal, scaleVal);
        mat.setPosition(Math.cos(angle) * r, shimmerY, Math.sin(angle) * r);
        ringsRef.current.setMatrixAt(i, mat);
      }
      ringsRef.current.instanceMatrix.needsUpdate = true;
    }
  });

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

        {/* Particle ring system — 8000 instanced sphere particles */}
        <instancedMesh
          ref={ringsRef}
          args={[undefined, undefined, RING_COUNT]}
          frustumCulled={false}
        >
          <sphereGeometry args={[1, 4, 4]} />
          <meshBasicMaterial
            vertexColors
            transparent
            opacity={0.85}
            depthWrite={false}
          />
        </instancedMesh>

        {/* Warm pale atmosphere rim */}
        <AtmosphereGlow
          radius={radius}
          color={{ r: 0.8, g: 0.7, b: 0.6 }}
          baseIntensity={0.3}
          activeIntensity={1.0}
          lodDistance={25}
        />
      </group>
    </group>
  );
}
