// ============================================================================
// NebulaCloud — Volumetric nebula using shader sphere
// ============================================================================

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import nebulaVertex from '../../../shaders/nebula.vert?raw';
import nebulaFragment from '../../../shaders/nebula.frag?raw';

export default function NebulaCloud() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: nebulaVertex,
        fragmentShader: nebulaFragment,
        uniforms: {
          uTime: { value: 0 },
        },
        transparent: true,
        depthWrite: false,
        side: THREE.BackSide,
      }),
    [],
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh>
      <sphereGeometry args={[200, 32, 32]} />
      <primitive object={material} attach="material" ref={materialRef} />
    </mesh>
  );
}
