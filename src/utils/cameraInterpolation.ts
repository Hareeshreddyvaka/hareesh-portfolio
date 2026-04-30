import * as THREE from 'three';
import { EasingFunction } from '../hooks/useCameraPath';

// ─── Easing functions (cubic/expo precision) ──────────────────────────────────

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function easeInCubic(t: number): number {
  return t * t * t;
}

function easeExpoInOut(t: number): number {
  if (t === 0) return 0;
  if (t === 1) return 1;
  return t < 0.5
    ? Math.pow(2, 20 * t - 10) / 2
    : (2 - Math.pow(2, -20 * t + 10)) / 2;
}

export const Easing = {
  linear: (t: number) => t,
  'ease-in': easeInCubic,
  'ease-out': easeOutCubic,
  'ease-in-out': easeInOutCubic,
  'ease-out-cubic': easeOutCubic,
  'ease-expo': easeExpoInOut,
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
  // Eased lerp for smooth damping frame-over-frame
  currentPos.lerp(targetPos, easeInOutCubic(Math.min(factor * 2, 1)) * factor);
}
