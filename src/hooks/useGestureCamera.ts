import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useCameraModes } from './useCameraModes';

export function useGestureCamera() {
  const { camera } = useThree();
  const { mode } = useCameraModes();
  
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const velocity = useRef(new THREE.Vector3(0, 0, 0));
  
  useEffect(() => {
    if (mode !== 'FREE_ROAM') return;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      
      const deltaX = e.clientX - previousMousePosition.current.x;
      const deltaY = e.clientY - previousMousePosition.current.y;
      
      // Map mouse drag to camera pan velocity
      velocity.current.x -= deltaX * 0.01;
      velocity.current.y += deltaY * 0.01;
      
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const speed = 0.5;
      switch(e.key) {
        case 'ArrowUp': velocity.current.z -= speed; break;
        case 'ArrowDown': velocity.current.z += speed; break;
        case 'ArrowLeft': velocity.current.x -= speed; break;
        case 'ArrowRight': velocity.current.x += speed; break;
      }
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mode]);

  useFrame(() => {
    if (mode === 'FREE_ROAM') {
      // Apply velocity and dampen
      camera.position.add(velocity.current);
      velocity.current.multiplyScalar(0.9); // friction
      camera.lookAt(0, 0, 0); // Keep looking at center for now, or could make it free look
    }
  });
}
