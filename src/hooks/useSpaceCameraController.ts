import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useCinematicTimeline } from './useCinematicTimeline';
import { resolveCameraCollision, CollisionSphere } from '../utils/cameraCollision';
import { useScrollOrchestrator } from './useScrollOrchestrator';

// ─── Easing curves ────────────────────────────────────────────────────────────
function easeInOut(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function easeIn(t: number): number {
  return t * t * t;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function easeExpoInOut(t: number): number {
  if (t === 0) return 0;
  if (t === 1) return 1;
  return t < 0.5
    ? Math.pow(2, 20 * t - 10) / 2
    : (2 - Math.pow(2, -20 * t + 10)) / 2;
}

// ─── Inline 2D value noise (no library) ──────────────────────────────────────
function hashNoise(n: number): number {
  return ((Math.sin(n) * 43758.5453) % 1 + 1) % 1;
}

function valueNoise2D(x: number, y: number): number {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const ux = fx * fx * (3.0 - 2.0 * fx);
  const uy = fy * fy * (3.0 - 2.0 * fy);
  const a = hashNoise(ix + iy * 57.0);
  const b = hashNoise(ix + 1.0 + iy * 57.0);
  const c = hashNoise(ix + (iy + 1.0) * 57.0);
  const d = hashNoise(ix + 1.0 + (iy + 1.0) * 57.0);
  return a * (1 - ux) * (1 - uy) + b * ux * (1 - uy) + c * (1 - ux) * uy + d * ux * uy;
}

// ─── Collision spheres ────────────────────────────────────────────────────────
const obstacleSpheres: CollisionSphere[] = [
  { center: new THREE.Vector3(0, 0, 0), radius: 2.5 },
  { center: new THREE.Vector3(15, 2, -10), radius: 3.5 },
  { center: new THREE.Vector3(-15, -5, -25), radius: 4.0 },
  { center: new THREE.Vector3(-20, 10, -35), radius: 3.0 },
  { center: new THREE.Vector3(0, 10, -40), radius: 5.0 }
];

// Reduced-motion check — evaluated once at module init, safe for SSR guard
const prefersReduced =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Travel sections where shake should be active
const TRAVEL_SECTIONS = new Set(['travel', 'deep-space', 'approach-earth']);

export function useSpaceCameraController(mode: string = 'CINEMATIC') {
  const { camera } = useThree();
  const { cameraState, currentSection } = useCinematicTimeline();
  const { sectionProgress } = useScrollOrchestrator();

  const currentPosition = useRef(new THREE.Vector3(0, 10, 80));
  const currentTarget = useRef(new THREE.Vector3(0, 0, 0));

  // Pre-allocate reusable vectors — no allocation in render loop
  const _desiredPos = useMemo(() => new THREE.Vector3(), []);
  const _desiredTarget = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    if (mode === 'CINEMATIC') {
      const cState = cameraState.current;
      const section = currentSection.current;
      const time = state.clock.elapsedTime;

      _desiredPos.set(cState.px, cState.py, cState.pz);
      _desiredTarget.set(cState.tx, cState.ty, cState.tz);

      // Dynamic FOV with easeInOut damper
      if (camera instanceof THREE.PerspectiveCamera) {
        const fovT = easeInOut(Math.min(delta * 5, 1));
        camera.fov = camera.fov + (cState.fov - camera.fov) * fovT;
        camera.updateProjectionMatrix();
      }

      // Collision detection — distance pushback, O(n), no raycasting
      const safePosition = resolveCameraCollision(_desiredPos, obstacleSpheres, 1.5);

      // Smooth interpolation with easeInOut applied to lerp factor
      const lerpFactor = easeInOut(Math.min(delta * 6, 1)) * 0.08 + 0.02;
      currentPosition.current.lerp(safePosition, lerpFactor);
      currentTarget.current.lerp(_desiredTarget, lerpFactor);

      camera.position.copy(currentPosition.current);
      camera.lookAt(currentTarget.current);

      // ── Travel shake (skipped when reduced motion) ──────────────────────────
      if (!prefersReduced && TRAVEL_SECTIONS.has(section)) {
        const fadeIn = Math.min(sectionProgress / 0.05, 1.0);
        const fadeOut = Math.min((1.0 - sectionProgress) / 0.05, 1.0);
        const shakeIntensity = Math.min(fadeIn, fadeOut);

        if (shakeIntensity > 0) {
          const shakeX = (valueNoise2D(time * 8.0, 0.0) - 0.5) * 0.016;
          const shakeY = (valueNoise2D(0.0, time * 8.0) - 0.5) * 0.012;
          camera.position.x += shakeX * shakeIntensity;
          camera.position.y += shakeY * shakeIntensity;
        }
      }

      // ── Breathing motion at planet sections (skipped when reduced motion) ───
      if (!prefersReduced && !TRAVEL_SECTIONS.has(section)) {
        const breatheBlend = Math.min(
          (sectionProgress - 0.15) / 0.1,
          (0.85 - sectionProgress) / 0.1,
          1.0
        );
        if (breatheBlend > 0) {
          const breatheY = Math.sin(time * 0.5) * 0.05;
          const breatheX = Math.cos(time * 0.3) * 0.02;
          camera.position.y += breatheY * breatheBlend;
          camera.position.x += breatheX * breatheBlend;
        }
      }
    }
  });

  return { currentPosition, currentTarget };
}
