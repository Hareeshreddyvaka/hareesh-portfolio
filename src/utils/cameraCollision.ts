import * as THREE from 'three';

export interface CollisionSphere {
  center: THREE.Vector3;
  radius: number;
}

/**
 * Checks if the desired camera position is inside any planet/object bounding sphere.
 * If it is, it pushes the camera outward along the normal.
 */
export function resolveCameraCollision(
  cameraPosition: THREE.Vector3,
  obstacles: CollisionSphere[],
  minDistancePadding: number = 2.0
): THREE.Vector3 {
  const resolvedPosition = cameraPosition.clone();

  for (const obstacle of obstacles) {
    const minSafeDistance = obstacle.radius + minDistancePadding;
    const distanceToCenter = resolvedPosition.distanceTo(obstacle.center);

    if (distanceToCenter < minSafeDistance) {
      // Vector from obstacle center to camera
      const direction = new THREE.Vector3().subVectors(resolvedPosition, obstacle.center).normalize();
      
      // Push camera outward to the safe boundary
      resolvedPosition.copy(obstacle.center).add(direction.multiplyScalar(minSafeDistance));
    }
  }

  return resolvedPosition;
}
