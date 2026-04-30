// ============================================================================
// Space Portfolio — Asset Configuration Registry
// ============================================================================
// Strategy: Hybrid — Texture-mapped spheres for planets (photorealistic)
//           + GLB models for spacecraft/asteroids (complex geometry)
//           + Procedural generation for starfields, nebulae, black holes, galaxies
// ============================================================================

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface TextureAsset {
  /** Path relative to /public – loaded via useTexture / TextureLoader */
  url: string;
  source: string;
  license: string;
  /** Approximate file size for budgeting */
  fileSize: string;
}

export interface PlanetConfig {
  type: 'textured-sphere' | 'textured-sphere-with-rings' | 'emissive-sphere';
  textures: Record<string, TextureAsset>;
  geometry: {
    radius: number;
    widthSegments: number;
    heightSegments: number;
  };
  ring?: {
    innerRadius: number;
    outerRadius: number;
    segments: number;
    textureKey: string; // key into textures
  };
  animation: {
    rotationSpeed: number; // radians per frame
    axialTilt: number;     // radians
  };
  lodDistance?: number;
  metadata: {
    quality: 'excellent' | 'good' | 'basic';
    interactive: boolean;
    description: string;
  };
}

export interface ModelAsset {
  url: string;
  source: string;
  license: string;
  fileSize: string;
  quality: 'excellent' | 'good' | 'basic';
  scale?: number;
}

export interface ProceduralConfig {
  type: string;
  implementation: string;
  config: Record<string, unknown>;
}

export interface SpaceAssetsConfig {
  planets: Record<string, PlanetConfig>;
  skybox: {
    starfield: TextureAsset;
    milkyway: TextureAsset;
  };
  spacecraft: {
    source: string;
    license: string;
    models: Record<string, ModelAsset>;
  };
  asteroids: {
    source: string;
    license: string;
    models: Record<string, ModelAsset>;
  };
  procedural: {
    starfield: ProceduralConfig;
    nebula: ProceduralConfig;
    blackHole: ProceduralConfig;
    galaxy: ProceduralConfig;
  };
  metadata: {
    totalAssetSize: string;
    performanceBudget: string;
    strategy: string;
    artStyle: string;
    sources: { name: string; url: string; license: string }[];
  };
}

// ---------------------------------------------------------------------------
// Texture source constants
// ---------------------------------------------------------------------------

const SSS = '/assets/textures/planets'; // Solar System Scope textures in public/
const SKY = '/assets/textures/skybox';
const MDL = '/assets/models';

const SSS_SOURCE = 'Solar System Scope';
const SSS_LICENSE = 'CC-BY-4.0';
// NASA constants — reserved for future ISS / rover models
// const NASA_SOURCE = 'NASA';
// const NASA_LICENSE = 'Public Domain';
const KENNEY_SOURCE = 'Kenney.nl';
const KENNEY_LICENSE = 'CC0 (Public Domain)';

// ---------------------------------------------------------------------------
// Main Config
// ---------------------------------------------------------------------------

export const SPACE_ASSETS: SpaceAssetsConfig = {

  // =========================================================================
  // PLANETS — Texture-mapped spheres
  // =========================================================================
  planets: {

    earth: {
      type: 'textured-sphere',
      textures: {
        dayMap:      { url: `${SSS}/earth_daymap.jpg`,      source: SSS_SOURCE, license: SSS_LICENSE, fileSize: '~500KB' },
        nightMap:    { url: `${SSS}/earth_nightmap.jpg`,    source: SSS_SOURCE, license: SSS_LICENSE, fileSize: '~400KB' },
        cloudMap:    { url: `${SSS}/earth_clouds.jpg`,      source: SSS_SOURCE, license: SSS_LICENSE, fileSize: '~300KB' },
        normalMap:   { url: `${SSS}/earth_normal.jpg`,      source: SSS_SOURCE, license: SSS_LICENSE, fileSize: '~500KB' },
        specularMap: { url: `${SSS}/earth_specular.jpg`,    source: SSS_SOURCE, license: SSS_LICENSE, fileSize: '~200KB' },
      },
      geometry: { radius: 1, widthSegments: 64, heightSegments: 64 },
      animation: { rotationSpeed: 0.0005, axialTilt: 0.4101 },
      lodDistance: 20,
      metadata: { quality: 'excellent', interactive: true, description: 'Earth with day/night, clouds & atmosphere' },
    },

    jupiter: {
      type: 'textured-sphere',
      textures: {
        dayMap: { url: `${SSS}/jupiter.jpg`, source: SSS_SOURCE, license: SSS_LICENSE, fileSize: '~500KB' },
      },
      geometry: { radius: 2.5, widthSegments: 64, heightSegments: 64 },
      animation: { rotationSpeed: 0.0012, axialTilt: 0.0546 },
      lodDistance: 35,
      metadata: { quality: 'excellent', interactive: true, description: 'Jupiter with Great Red Spot banding' },
    },

    saturn: {
      type: 'textured-sphere-with-rings',
      textures: {
        dayMap:  { url: `${SSS}/saturn.jpg`,            source: SSS_SOURCE, license: SSS_LICENSE, fileSize: '~400KB' },
        ringMap: { url: `${SSS}/saturn_ring_alpha.png`, source: SSS_SOURCE, license: SSS_LICENSE, fileSize: '~150KB' },
      },
      geometry: { radius: 2.0, widthSegments: 64, heightSegments: 64 },
      ring: { innerRadius: 2.3, outerRadius: 3.8, segments: 64, textureKey: 'ringMap' },
      animation: { rotationSpeed: 0.0010, axialTilt: 0.4665 },
      lodDistance: 35,
      metadata: { quality: 'excellent', interactive: true, description: 'Saturn with translucent ring system' },
    },

    mars: {
      type: 'textured-sphere',
      textures: {
        dayMap: { url: `${SSS}/mars.jpg`, source: SSS_SOURCE, license: SSS_LICENSE, fileSize: '~400KB' },
      },
      geometry: { radius: 0.8, widthSegments: 64, heightSegments: 64 },
      animation: { rotationSpeed: 0.0005, axialTilt: 0.4396 },
      lodDistance: 20,
      metadata: { quality: 'excellent', interactive: true, description: 'Mars — the red planet' },
    },

    venus: {
      type: 'textured-sphere',
      textures: {
        surfaceMap:    { url: `${SSS}/venus_surface.jpg`,    source: SSS_SOURCE, license: SSS_LICENSE, fileSize: '~400KB' },
        atmosphereMap: { url: `${SSS}/venus_atmosphere.jpg`, source: SSS_SOURCE, license: SSS_LICENSE, fileSize: '~300KB' },
      },
      geometry: { radius: 0.95, widthSegments: 64, heightSegments: 64 },
      animation: { rotationSpeed: -0.0002, axialTilt: 3.0963 }, // Venus rotates retrograde
      lodDistance: 20,
      metadata: { quality: 'excellent', interactive: true, description: 'Venus with thick atmosphere layer' },
    },

    sun: {
      type: 'emissive-sphere',
      textures: {
        dayMap: { url: `${SSS}/sun.jpg`, source: SSS_SOURCE, license: SSS_LICENSE, fileSize: '~500KB' },
      },
      geometry: { radius: 5, widthSegments: 64, heightSegments: 64 },
      animation: { rotationSpeed: 0.0003, axialTilt: 0.1265 },
      lodDistance: 35,
      metadata: { quality: 'excellent', interactive: true, description: 'Sun with emissive corona glow' },
    },
  },

  // =========================================================================
  // SKYBOX — Star background textures
  // =========================================================================
  skybox: {
    starfield: {
      url: `${SKY}/stars.jpg`,
      source: SSS_SOURCE,
      license: SSS_LICENSE,
      fileSize: '~1MB',
    },
    milkyway: {
      url: `${SKY}/stars_milkyway.jpg`,
      source: SSS_SOURCE,
      license: SSS_LICENSE,
      fileSize: '~1.5MB',
    },
  },

  // =========================================================================
  // SPACECRAFT — GLB models
  // =========================================================================
  spacecraft: {
    source: KENNEY_SOURCE,
    license: KENNEY_LICENSE,
    models: {
      shuttle: {
        url: `${MDL}/spacecraft/spaceship_01.glb`,
        source: KENNEY_SOURCE,
        license: KENNEY_LICENSE,
        fileSize: '~150KB',
        quality: 'good',
        scale: 0.5,
      },
      fighter: {
        url: `${MDL}/spacecraft/spaceship_02.glb`,
        source: KENNEY_SOURCE,
        license: KENNEY_LICENSE,
        fileSize: '~120KB',
        quality: 'good',
        scale: 0.4,
      },
      station: {
        url: `${MDL}/spacecraft/space_station.glb`,
        source: KENNEY_SOURCE,
        license: KENNEY_LICENSE,
        fileSize: '~300KB',
        quality: 'good',
        scale: 0.3,
      },
    },
  },

  // =========================================================================
  // ASTEROIDS — GLB models
  // =========================================================================
  asteroids: {
    source: KENNEY_SOURCE,
    license: KENNEY_LICENSE,
    models: {
      asteroid_01: {
        url: `${MDL}/asteroids/asteroid_01.glb`,
        source: KENNEY_SOURCE,
        license: KENNEY_LICENSE,
        fileSize: '~80KB',
        quality: 'good',
        scale: 0.3,
      },
      asteroid_02: {
        url: `${MDL}/asteroids/asteroid_02.glb`,
        source: KENNEY_SOURCE,
        license: KENNEY_LICENSE,
        fileSize: '~100KB',
        quality: 'good',
        scale: 0.25,
      },
      asteroid_03: {
        url: `${MDL}/asteroids/asteroid_03.glb`,
        source: KENNEY_SOURCE,
        license: KENNEY_LICENSE,
        fileSize: '~90KB',
        quality: 'good',
        scale: 0.35,
      },
    },
  },

  // =========================================================================
  // PROCEDURAL — Generated in realtime, no downloads needed
  // =========================================================================
  procedural: {

    starfield: {
      type: 'points-geometry',
      implementation: 'Three.js Points + BufferGeometry + custom ShaderMaterial',
      config: {
        count: 80000,
        spread: 400,
        sizeRange: [0.05, 0.5],
        colors: {
          white: { rgb: [1, 1, 1], weight: 0.7 },
          blue:  { rgb: [0.7, 0.85, 1], weight: 0.15 },
          gold:  { rgb: [1, 1, 0.8], weight: 0.1 },
          warm:  { rgb: [1, 0.8, 0.6], weight: 0.05 },
        },
        twinkleSpeedRange: [0.3, 2.5],
      },
    },

    nebula: {
      type: 'volumetric-points',
      implementation: 'Three.js Points + AdditiveBlending custom material',
      config: {
        layerCount: 3,
        pointsPerLayer: 2000,
        spread: 50,
        colors: ['#8B5CF6', '#3B82F6', '#EC4899', '#F97316'],
        opacity: 0.15,
        pulseSpeed: 0.002,
      },
    },

    blackHole: {
      type: 'shader-based',
      implementation: 'Custom Three.js ShaderMaterial on sphere + ring geometry',
      config: {
        eventHorizonRadius: 1.0,
        accretionDisk: {
          innerRadius: 1.5,
          outerRadius: 4.0,
          segments: 128,
          rotationSpeed: 0.003,
          colors: ['#FF6B00', '#FFA500', '#FFCC00', '#FFFFFF', '#8B5CF6'],
        },
        glow: {
          color: '#FFA500',
          intensity: 2.0,
          falloff: 3.0,
        },
        particleJets: {
          count: 500,
          speed: 0.01,
          spread: 0.3,
        },
      },
    },

    galaxy: {
      type: 'spiral-points',
      implementation: 'Three.js Points with logarithmic spiral math',
      config: {
        arms: 4,
        stars: 40000,
        radius: 80,
        armWidth: 0.4,
        rotationSpeed: 0.0003,
        coreColor: [1, 0.95, 0.8],
        armColor: [0.6, 0.7, 1.0],
        coreDensity: 0.7,
      },
    },
  },

  // =========================================================================
  // METADATA — Global project info
  // =========================================================================
  metadata: {
    totalAssetSize: '~12MB',
    performanceBudget: '<20MB',
    strategy: 'hybrid: texture-spheres for planets + GLB for props + procedural for VFX',
    artStyle: 'photorealistic-planets-with-stylised-accessories',
    sources: [
      { name: 'Solar System Scope', url: 'https://www.solarsystemscope.com/textures/', license: 'CC-BY-4.0' },
      { name: 'NASA 3D Resources',  url: 'https://nasa3d.arc.nasa.gov/',             license: 'Public Domain' },
      { name: 'Kenney.nl',          url: 'https://kenney.nl/assets/space-kit',        license: 'CC0' },
    ],
  },
};

// ---------------------------------------------------------------------------
// Helper — collect all texture URLs that need preloading
// ---------------------------------------------------------------------------

export function getAllTextureUrls(): string[] {
  const urls: string[] = [];

  // Planet textures
  for (const planet of Object.values(SPACE_ASSETS.planets)) {
    for (const tex of Object.values(planet.textures)) {
      urls.push(tex.url);
    }
  }

  // Skybox textures
  urls.push(SPACE_ASSETS.skybox.starfield.url);
  urls.push(SPACE_ASSETS.skybox.milkyway.url);

  return urls;
}

/** Collect all GLB model URLs */
export function getAllModelUrls(): string[] {
  const urls: string[] = [];

  for (const model of Object.values(SPACE_ASSETS.spacecraft.models)) {
    urls.push(model.url);
  }
  for (const model of Object.values(SPACE_ASSETS.asteroids.models)) {
    urls.push(model.url);
  }

  return urls;
}

/** Get planet config by name */
export function getPlanetConfig(name: string): PlanetConfig | undefined {
  return SPACE_ASSETS.planets[name];
}

/** Get all planet names */
export function getPlanetNames(): string[] {
  return Object.keys(SPACE_ASSETS.planets);
}
