import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * AsteroidField — Instanced dodecahedrons orbiting randomly.
 * Fixed: pre-compute positions, avoid Math.random() in useFrame.
 */
export function AsteroidField({ count = 800 }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  // Pre-compute once on mount
  const { geometry, material } = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1, 1);
    const mat = new THREE.MeshStandardMaterial({
      color: 0x888877,
      roughness: 0.9,
      metalness: 0.1,
    });
    return { geometry: geo, material: mat };
  }, []);

  useEffect(() => {
    if (!meshRef.current) return;
    
    const dummy = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      dummy.position.set(
        (Math.random() - 0.5) * 200,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 200
      );
      dummy.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        0
      );
      const s = 0.1 + Math.random() * 0.4;
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [count]);

  // Very slow entire field rotation to keep it alive
  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, count]}
      frustumCulled={false}
    />
  );
}
