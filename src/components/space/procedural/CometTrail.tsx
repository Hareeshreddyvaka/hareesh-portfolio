import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function CometTrail() {
  const cometRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (cometRef.current) {
      cometRef.current.position.x -= delta * 15;
      cometRef.current.position.z -= delta * 5;
      
      // Reset position when it goes too far
      if (cometRef.current.position.x < -100) {
        cometRef.current.position.set(100, Math.random() * 20 - 10, Math.random() * 50 - 25);
      }
    }
  });

  return (
    <group ref={cometRef} position={[50, 5, -10]}>
      {/* Head */}
      <mesh>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      
      {/* Trail */}
      <mesh position={[2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.01, 0.2, 4, 8]} />
        <meshBasicMaterial 
          color="#00d4ff" 
          transparent={true} 
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}
