import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useCinematicTimeline } from '../../hooks/useCinematicTimeline';

export function WarpEffect() {
  const { currentSection } = useCinematicTimeline();
  const linesRef = useRef<THREE.LineSegments>(null);
  
  // Create speed lines geometry
  const geometry = useMemo(() => {
    const count = 500;
    const points = [];
    for (let i = 0; i < count; i++) {
      // Cylinder distribution
      const theta = Math.random() * Math.PI * 2;
      const radius = 10 + Math.random() * 20; // 10 to 30 away from center
      const x = Math.cos(theta) * radius;
      const y = Math.sin(theta) * radius;
      const z = -Math.random() * 200; // Far ahead
      
      const length = 2 + Math.random() * 8;
      
      points.push(new THREE.Vector3(x, y, z));
      points.push(new THREE.Vector3(x, y, z + length));
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  const material = useMemo(() => new THREE.LineBasicMaterial({
    color: '#3A86FF',
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending
  }), []);

  useFrame((state, delta) => {
    if (linesRef.current) {
      // Move lines towards camera
      linesRef.current.position.z += delta * 150;
      
      // Reset if they pass the camera
      if (linesRef.current.position.z > 50) {
        linesRef.current.position.z = -100;
      }
      
      // Only show when in 'travel' mode
      const isTravel = currentSection.current === 'travel';
      const targetOpacity = isTravel ? 0.3 : 0.0;
      
      material.opacity = THREE.MathUtils.lerp(material.opacity, targetOpacity, delta * 3);
    }
  });

  return (
    <lineSegments ref={linesRef} geometry={geometry} material={material} />
  );
}
