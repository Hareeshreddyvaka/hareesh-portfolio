import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * AsteroidField — Instanced dodecahedrons orbiting randomly.
 * Fixed: pre-compute positions, avoid Math.random() in useFrame.
 */
export function AsteroidField({ count = 80, radius = 40 }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  // Pre-compute all orbital parameters ONCE
  const orbits = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        phase: Math.random() * Math.PI * 2,
        speed: 0.005 + Math.random() * 0.02,
        orbitRadius: radius * 0.3 + Math.random() * radius * 0.7,
        yOffset: (Math.random() - 0.5) * radius * 0.4,
        eccentricity: 0.8 + Math.random() * 0.4,
        scale: 0.03 + Math.random() * 0.08,
        tilt: Math.random() * Math.PI * 0.3,
      });
    }
    return arr;
  }, [count, radius]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    orbits.forEach((orbit, i) => {
      const angle = orbit.phase + t * orbit.speed;
      
      dummy.position.set(
        Math.cos(angle) * orbit.orbitRadius * orbit.eccentricity,
        orbit.yOffset + Math.sin(t * 0.5 + orbit.phase) * 2,
        Math.sin(angle) * orbit.orbitRadius
      );
      
      dummy.rotation.set(
        t * orbit.speed * 3,
        t * orbit.speed * 2,
        t * orbit.speed
      );
      
      dummy.scale.setScalar(orbit.scale);
      dummy.updateMatrix();
      
      if (meshRef.current) {
        meshRef.current.setMatrixAt(i, dummy.matrix);
      }
    });
    
    if (meshRef.current) {
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#555555" roughness={0.8} />
    </instancedMesh>
  );
}
