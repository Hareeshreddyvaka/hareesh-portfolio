import * as THREE from 'three';
import { useCameraPath } from './useCameraPath';
import { interpolateVector3, interpolateOrbit } from '../utils/cameraInterpolation';

export function useScrollToCamera() {
  const { paths } = useCameraPath();
  const mainJourney = paths.mainJourney;

  const getCameraStateForScroll = (scrollProgress: number) => {
    // Ensure bounds
    const progress = Math.max(0, Math.min(1, scrollProgress));

    // Find current segment
    const segment = mainJourney.find(seg => progress >= seg.start && progress <= seg.end) 
                    || mainJourney[mainJourney.length - 1];

    // Calculate local progress within segment
    const localProgress = segment.start === segment.end 
      ? 1 
      : (progress - segment.start) / (segment.end - segment.start);

    let position = new THREE.Vector3();
    let target = new THREE.Vector3();

    const startPos = new THREE.Vector3(...segment.startWaypoint.pos);
    const endPos = new THREE.Vector3(...segment.endWaypoint.pos);
    const startTarget = new THREE.Vector3(...segment.startWaypoint.target);
    const endTarget = new THREE.Vector3(...segment.endWaypoint.target);

    if (segment.type === 'orbit' && segment.orbitParams) {
      const center = new THREE.Vector3(...segment.orbitParams.center);
      position = interpolateOrbit(
        center, 
        segment.orbitParams.radius, 
        segment.orbitParams.startAngle, 
        segment.orbitParams.endAngle, 
        localProgress, 
        segment.easing
      );
    } else {
      position = interpolateVector3(startPos, endPos, localProgress, segment.easing);
    }

    // Always interpolate target linearly for smooth looking
    target = interpolateVector3(startTarget, endTarget, localProgress, segment.easing);

    return { position, target, segment };
  };

  return { getCameraStateForScroll };
}
