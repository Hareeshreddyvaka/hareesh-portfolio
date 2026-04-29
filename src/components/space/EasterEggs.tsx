import React, { useRef, useState } from 'react';
import { useFrame, type ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';
import { Html } from '@react-three/drei';

export function EasterEggs() {
  const probeRef = useRef<THREE.Group>(null);
  const [discovered, setDiscovered] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useFrame((state, delta) => {
    if (probeRef.current) {
      // Very slow rotation to simulate tumbling through deep space
      probeRef.current.rotation.x += delta * 0.1;
      probeRef.current.rotation.y += delta * 0.15;
    }
  });

  const handleDiscover = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (!discovered) {
      setDiscovered(true);
      setShowToast(true);
      // Auto hide toast after 5s
      setTimeout(() => setShowToast(false), 5000);
    }
  };

  return (
    <group>
      {/* Hidden Voyager Probe far off the main path */}
      <group 
        ref={probeRef} 
        position={[45, 15, -65]} 
        scale={0.5}
        onClick={handleDiscover}
        onPointerOver={() => { document.body.style.cursor = 'help'; }}
        onPointerOut={() => { document.body.style.cursor = 'auto'; }}
      >
        {/* Simple geometric representation of a satellite if no model is loaded */}
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#888888" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 1.2, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 1.5]} />
          <meshStandardMaterial color="#dddddd" />
        </mesh>
        <mesh position={[1.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <planeGeometry args={[2, 1]} />
          <meshStandardMaterial color="#224488" metalness={0.9} roughness={0.1} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[-1.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <planeGeometry args={[2, 1]} />
          <meshStandardMaterial color="#224488" metalness={0.9} roughness={0.1} side={THREE.DoubleSide} />
        </mesh>

        {/* Glow when discovered */}
        {discovered && (
          <mesh>
            <sphereGeometry args={[2.5, 16, 16]} />
            <meshBasicMaterial color="#9D4EDD" transparent opacity={0.2} blending={THREE.AdditiveBlending} />
          </mesh>
        )}
      </group>

      {/* Discovery Toast Notification */}
      {showToast && (
        <Html position={[45, 18, -65]} center>
          <div className="bg-[#9D4EDD]/20 backdrop-blur-md border border-[#9D4EDD]/50 text-white px-4 py-3 rounded-lg shadow-[0_0_20px_rgba(157,78,221,0.4)] animate-in fade-in slide-in-from-bottom-4 text-center min-w-[200px]">
            <p className="text-xs font-mono text-[#00D9FF] mb-1">ANOMALY DETECTED</p>
            <p className="font-bold">Voyager 1 Probe Found!</p>
            <p className="text-xs text-white/70 mt-1">Distance from Earth: 15B miles</p>
          </div>
        </Html>
      )}
    </group>
  );
}
