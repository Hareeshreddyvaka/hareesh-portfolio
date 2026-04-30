import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface MercuryProps {
  position?: [number, number, number];
  scale?: number;
}

export function Mercury({ position = [5, 0, 5], scale = 0.5 }: MercuryProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1; // Slow rotation
    }
    if (groupRef.current) {
      // Very fast orbit around sun/center
      groupRef.current.rotation.y += delta * 0.05; 
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial 
          color="#8c8c8c" 
          roughness={0.9} 
          metalness={0.2}
          bumpScale={0.015}
        />
      </mesh>
    </group>
  );
}
