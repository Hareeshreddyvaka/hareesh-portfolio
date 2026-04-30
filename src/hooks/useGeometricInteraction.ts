import { useState, useCallback } from 'react';
import { ThreeEvent } from '@react-three/fiber';

export function useGeometricInteraction() {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const onPointerOver = useCallback((e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    document.body.style.cursor = 'pointer';
    setHovered(true);
  }, []);

  const onPointerOut = useCallback((e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    document.body.style.cursor = 'auto';
    setHovered(false);
  }, []);

  const onClick = useCallback((e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    setClicked(true);
    // Trigger the burst animation state for 500ms
    setTimeout(() => setClicked(false), 500);
  }, []);

  return { 
    hovered, 
    clicked, 
    handlers: { onPointerOver, onPointerOut, onClick } 
  };
}
