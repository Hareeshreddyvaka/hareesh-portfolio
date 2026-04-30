import { useEffect, useRef } from 'react';

export function useTouchCamera(orbitMode: boolean, onRotate: (dx: number, dy: number) => void, onZoom: (zoomDelta: number) => void) {
  const touchStartRef = useRef<{ x: number, y: number, dist?: number } | null>(null);

  useEffect(() => {
    if (!orbitMode) return;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 2) {
        const dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        touchStartRef.current = { x: 0, y: 0, dist };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartRef.current) return;

      if (e.touches.length === 1 && touchStartRef.current.dist === undefined) {
        const dx = e.touches[0].clientX - touchStartRef.current.x;
        const dy = e.touches[0].clientY - touchStartRef.current.y;
        
        onRotate(dx * 0.01, dy * 0.01);
        
        touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 2 && touchStartRef.current.dist !== undefined) {
        const newDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        
        const delta = touchStartRef.current.dist - newDist;
        onZoom(delta * 0.05);
        
        touchStartRef.current.dist = newDist;
      }
    };

    const handleTouchEnd = () => {
      touchStartRef.current = null;
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [orbitMode, onRotate, onZoom]);
}
