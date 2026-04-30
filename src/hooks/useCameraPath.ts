export type EasingFunction = 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'ease-out-cubic';

export interface CameraWaypoint {
  pos: [number, number, number];
  target: [number, number, number];
  label: string;
}

export interface CameraPathSegment {
  start: number; // 0.0 to 1.0 scroll progress
  end: number;   // 0.0 to 1.0 scroll progress
  pathId: string;
  description: string;
  startWaypoint: CameraWaypoint;
  endWaypoint: CameraWaypoint;
  easing: EasingFunction;
  type: 'linear' | 'orbit' | 'flyby';
  orbitParams?: {
    center: [number, number, number];
    radius: number;
    startAngle: number;
    endAngle: number;
  };
}

export const MAIN_CAMERA_PATH: CameraPathSegment[] = [
  {
    start: 0.0,
    end: 0.2,
    pathId: 'approach-earth',
    description: 'Flying to Earth',
    type: 'linear',
    startWaypoint: { pos: [0, 0, 20], target: [0, 0, 0], label: 'start' },
    endWaypoint: { pos: [-3, 0, 5], target: [0, 0, 0], label: 'earth-approach' },
    easing: 'ease-out-cubic'
  },
  {
    start: 0.2,
    end: 0.35,
    pathId: 'orbit-earth',
    description: 'Orbiting Earth',
    type: 'orbit',
    startWaypoint: { pos: [-3, 0, 5], target: [0, 0, 0], label: 'earth-orbit-start' },
    endWaypoint: { pos: [3, 0, 5], target: [0, 0, 0], label: 'earth-orbit-end' },
    easing: 'linear',
    orbitParams: {
      center: [0, 0, 0],
      radius: 5,
      startAngle: Math.PI,
      endAngle: 0
    }
  },
  {
    start: 0.35,
    end: 0.5,
    pathId: 'travel-to-projects',
    description: 'Journey to Projects Planet (Mars)',
    type: 'linear',
    startWaypoint: { pos: [3, 0, 5], target: [0, 0, 0], label: 'earth-departure' },
    endWaypoint: { pos: [15, 2, -10], target: [10, 0, -15], label: 'projects-approach' },
    easing: 'ease-in-out'
  },
  {
    start: 0.5,
    end: 0.75,
    pathId: 'travel-to-skills',
    description: 'Journey to Skills Planet (Venus/Jupiter)',
    type: 'linear',
    startWaypoint: { pos: [15, 2, -10], target: [10, 0, -15], label: 'skills-departure' },
    endWaypoint: { pos: [-15, -5, -25], target: [-20, 0, -30], label: 'skills-approach' },
    easing: 'ease-in-out'
  },
  {
    start: 0.75,
    end: 1.0,
    pathId: 'travel-to-certs-contact',
    description: 'Journey to Certs and Contact Planets',
    type: 'linear',
    startWaypoint: { pos: [-15, -5, -25], target: [-20, 0, -30], label: 'certs-departure' },
    endWaypoint: { pos: [0, 10, -40], target: [0, 0, -45], label: 'contact-approach' },
    easing: 'ease-in-out'
  }
];

export function useCameraPath() {
  return {
    paths: {
      mainJourney: MAIN_CAMERA_PATH
    }
  };
}
