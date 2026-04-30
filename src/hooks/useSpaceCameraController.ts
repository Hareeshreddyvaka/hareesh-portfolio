import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useCinematicTimeline } from './useCinematicTimeline';
import { resolveCameraCollision, CollisionSphere } from '../utils/cameraCollision';

// Planet collision spheres
const obstacleSpheres: CollisionSphere[] = [
  { center: new THREE.Vector3(0, 0, 0), radius: 2.5 },
  { center: new THREE.Vector3(15, 2, -10), radius: 3.5 },
  { center: new THREE.Vector3(-15, -5, -25), radius: 4.0 },
  { center: new THREE.Vector3(-20, 10, -35), radius: 3.0 },
  { center: new THREE.Vector3(0, 10, -40), radius: 5.0 }
];

export function useSpaceCameraController(mode: string = 'CINEMATIC') {
  const { camera } = useThree();
  const { cameraState } = useCinematicTimeline();
  
  const currentPosition = useRef(new THREE.Vector3(0, 10, 80));
  const currentTarget = useRef(new THREE.Vector3(0, 0, 0));

  // Pre-allocate reusable vectors — no allocation in render loop
  const _desiredPos = useMemo(() => new THREE.Vector3(), []);
  const _desiredTarget = useMemo(() => new THREE.Vector3(), []);

  useFrame((_state, delta) => {
    if (mode === 'CINEMATIC') {
      const cState = cameraState.current;
      
      _desiredPos.set(cState.px, cState.py, cState.pz);
      _desiredTarget.set(cState.tx, cState.ty, cState.tz);
      
      // Dynamic FOV
      if (camera instanceof THREE.PerspectiveCamera) {
        camera.fov = THREE.MathUtils.lerp(camera.fov, cState.fov, delta * 5);
        camera.updateProjectionMatrix();
      }

      // Collision detection
      const safePosition = resolveCameraCollision(_desiredPos, obstacleSpheres, 1.5);

      // Smooth interpolation
      currentPosition.current.lerp(safePosition, 0.08);
      currentTarget.current.lerp(_desiredTarget, 0.08);

      camera.position.copy(currentPosition.current);
      camera.lookAt(currentTarget.current);
    }
  });

  return { currentPosition, currentTarget };
}
