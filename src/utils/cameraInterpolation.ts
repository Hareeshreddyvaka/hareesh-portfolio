import * as THREE from 'three';
import { EasingFunction } from '../hooks/useCameraPath';

export const Easing = {
  linear: (t: number) => t,
  'ease-in': (t: number) => t * t,
  'ease-out': (t: number) => t * (2 - t),
  'ease-in-out': (t: number) => t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  'ease-out-cubic': (t: number) => (--t) * t * t + 1
};

export function interpolateVector3(
  start: THREE.Vector3,
  end: THREE.Vector3,
  progress: number,
  easingType: EasingFunction = 'linear'
): THREE.Vector3 {
  const t = Easing[easingType](Math.max(0, Math.min(1, progress)));
  const result = new THREE.Vector3();
  result.lerpVectors(start, end, t);
  return result;
}

export function interpolateOrbit(
  center: THREE.Vector3,
  radius: number,
  startAngle: number,
  endAngle: number,
  progress: number,
  easingType: EasingFunction = 'linear'
): THREE.Vector3 {
  const t = Easing[easingType](Math.max(0, Math.min(1, progress)));
  const currentAngle = startAngle + (endAngle - startAngle) * t;
  
  return new THREE.Vector3(
    center.x + Math.cos(currentAngle) * radius,
    center.y,
    center.z + Math.sin(currentAngle) * radius
  );
}

export function smoothInterpolation(
  currentPos: THREE.Vector3,
  targetPos: THREE.Vector3,
  factor: number = 0.05
): void {
  // Use lerp for smooth damping frame-over-frame (avoids jerky camera)
  currentPos.lerp(targetPos, factor);
}
