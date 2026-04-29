export interface CinematicKeyframe {
  progress: number; // 0 to 1 representing total scroll
  camera: {
    position: [number, number, number];
    target: [number, number, number];
    fov?: number;
  };
  effects?: {
    bloomIntensity?: number;
    chromaticAberrationOffset?: [number, number]; // [x, y]
    vignetteDarkness?: number;
    dofFocusDistance?: number;
    dofFocalLength?: number;
  };
  section?: string;
}

/**
 * The master timeline for the cinematic experience.
 * This defines exact keyframes that GSAP will tween between.
 */
export const cinematicSequences: CinematicKeyframe[] = [
  // ═══════════════════════════════════════════════════════════════
  // SEQ 1: OPENING (0% - 5%) - Deep Space Start
  // ═══════════════════════════════════════════════════════════════
  {
    progress: 0.0,
    camera: { position: [0, 10, 80], target: [0, 0, 0], fov: 65 },
    effects: { bloomIntensity: 2.5, chromaticAberrationOffset: [0.005, 0.005], vignetteDarkness: 0.8 },
    section: 'deep-space'
  },
  {
    progress: 0.05,
    camera: { position: [0, 0, 20], target: [0, 0, 0], fov: 55 },
    effects: { bloomIntensity: 1.5, chromaticAberrationOffset: [0.002, 0.002], vignetteDarkness: 0.5 },
    section: 'approach-earth'
  },
  
  // ═══════════════════════════════════════════════════════════════
  // SEQ 2: EARTH EXPLORATION (10% - 25%) - Hero Section
  // ═══════════════════════════════════════════════════════════════
  {
    progress: 0.1,
    camera: { position: [-3, 0, 5], target: [0, 0, 0], fov: 50 },
    effects: { bloomIntensity: 1.2, chromaticAberrationOffset: [0.0, 0.0], vignetteDarkness: 0.4 },
    section: 'hero'
  },
  {
    progress: 0.25,
    camera: { position: [3, 0, 5], target: [0, 0, 0], fov: 50 },
    effects: { bloomIntensity: 1.2, chromaticAberrationOffset: [0.0, 0.0], vignetteDarkness: 0.4 },
    section: 'hero'
  },

  // ═══════════════════════════════════════════════════════════════
  // SEQ 3: DEPARTURE & WARP TO MARS (30% - 40%) - Projects
  // ═══════════════════════════════════════════════════════════════
  {
    progress: 0.3,
    camera: { position: [8, 1, -2], target: [15, 2, -10], fov: 60 }, // Pull back, look to Mars
    effects: { bloomIntensity: 2.0, chromaticAberrationOffset: [0.008, 0.008], vignetteDarkness: 0.6 },
    section: 'travel'
  },
  {
    progress: 0.35,
    camera: { position: [12, 2, -8], target: [15, 2, -10], fov: 50 }, // Near Mars
    effects: { bloomIntensity: 1.0, chromaticAberrationOffset: [0.0, 0.0], vignetteDarkness: 0.4 },
    section: 'projects'
  },
  {
    progress: 0.45,
    camera: { position: [18, 2, -8], target: [15, 2, -10], fov: 50 }, // Orbiting Mars
    effects: { bloomIntensity: 1.0, chromaticAberrationOffset: [0.0, 0.0], vignetteDarkness: 0.4 },
    section: 'projects'
  },

  // ═══════════════════════════════════════════════════════════════
  // SEQ 4: WARP TO VENUS & MERCURY (50% - 60%) - Skills
  // ═══════════════════════════════════════════════════════════════
  {
    progress: 0.5,
    camera: { position: [0, -1, -15], target: [-15, -5, -25], fov: 65 }, // Look to Venus
    effects: { bloomIntensity: 2.2, chromaticAberrationOffset: [0.006, 0.006], vignetteDarkness: 0.7 },
    section: 'travel'
  },
  {
    progress: 0.55,
    camera: { position: [-12, -5, -22], target: [-15, -5, -25], fov: 50 }, // Near Venus
    effects: { bloomIntensity: 1.5, chromaticAberrationOffset: [0.0, 0.0], vignetteDarkness: 0.4 },
    section: 'skills'
  },
  {
    progress: 0.65,
    camera: { position: [-18, -5, -22], target: [-15, -5, -25], fov: 50 }, // Orbiting Venus
    effects: { bloomIntensity: 1.5, chromaticAberrationOffset: [0.0, 0.0], vignetteDarkness: 0.4 },
    section: 'skills'
  },

  // ═══════════════════════════════════════════════════════════════
  // SEQ 5: WARP TO SATURN (70% - 80%) - Certs
  // ═══════════════════════════════════════════════════════════════
  {
    progress: 0.7,
    camera: { position: [-18, 2, -28], target: [-20, 10, -35], fov: 60 },
    effects: { bloomIntensity: 1.8, chromaticAberrationOffset: [0.004, 0.004], vignetteDarkness: 0.6 },
    section: 'travel'
  },
  {
    progress: 0.75,
    camera: { position: [-17, 10, -32], target: [-20, 10, -35], fov: 50 },
    effects: { bloomIntensity: 1.2, chromaticAberrationOffset: [0.0, 0.0], vignetteDarkness: 0.3 },
    section: 'certs'
  },
  {
    progress: 0.82,
    camera: { position: [-23, 10, -32], target: [-20, 10, -35], fov: 50 },
    effects: { bloomIntensity: 1.2, chromaticAberrationOffset: [0.0, 0.0], vignetteDarkness: 0.3 },
    section: 'certs'
  },

  // ═══════════════════════════════════════════════════════════════
  // SEQ 6: FINAL JOURNEY TO JUPITER & NEPTUNE (85% - 100%) - Contact
  // ═══════════════════════════════════════════════════════════════
  {
    progress: 0.85,
    camera: { position: [-10, 10, -37], target: [0, 10, -40], fov: 65 },
    effects: { bloomIntensity: 2.0, chromaticAberrationOffset: [0.005, 0.005], vignetteDarkness: 0.7 },
    section: 'travel'
  },
  {
    progress: 0.9,
    camera: { position: [-4, 10, -36], target: [0, 10, -40], fov: 55 },
    effects: { bloomIntensity: 1.4, chromaticAberrationOffset: [0.0, 0.0], vignetteDarkness: 0.4 },
    section: 'contact'
  },
  {
    progress: 1.0,
    camera: { position: [4, 10, -36], target: [0, 10, -40], fov: 55 },
    effects: { bloomIntensity: 1.4, chromaticAberrationOffset: [0.0, 0.0], vignetteDarkness: 0.5 },
    section: 'contact'
  }
];
