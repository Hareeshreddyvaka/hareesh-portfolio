# Design System — Vaka Hareesh Reddy Portfolio

## 1. Project Overview
- **What the project is**: A personal web-based portfolio showcasing Vaka Hareesh Reddy's professional background, projects, skills, and certifications.
- **Core concept**: A high-performance, scroll-driven 3D space journey. As the user scrolls, a cinematic camera travels through the solar system. Each planet corresponds to a specific section of the portfolio (Earth = Hero, Mars = Projects, Venus = Skills, Saturn = Certifications, Jupiter = Contact).
- **Target audience**: Recruiters, hiring managers, and fellow developers.
- **Current completion stat**: Stable, production-ready (99 Performance / 100 Accessibility Lighthouse scores).

## 2. Color System
The color system emphasizes a cosmic theme, utilizing a deep navy/space base with vibrant neon accents to highlight key interactions and planets.
- **Base/Background**: Deep Space `#020205`, Dark Slate `#0A0D12`
- **Primary Accents**: Purple `#9D4EDD`, Cyan `#00D9FF`, Bright Blue `#3A86FF`
- **Planet-Specific Accents**:
  - Earth (Hero): `#00D4FF` (Cyan)
  - Mars (Projects): `#FF4422` (Red-Orange)
  - Venus (Skills): `#FFAA00` (Yellow-Orange)
  - Saturn (Certs): `#EEDB9A` (Pale Gold/Tan)
  - Jupiter (Contact): `#FFB973` (Warm Peach)
- **UI Elements**: White with varying opacity levels (e.g., `rgba(255, 255, 255, 0.1)` for borders and glassmorphism backgrounds).

## 3. Typography
- **Primary Font**: `Inter Variable` (sans-serif) for body text and descriptive UI content. Employs kinetic weight changes based on scroll progression.
- **Display Font**: `Space Grotesk` and `Outfit` for headings, titles, and planetary labels, providing a modern, technical, and space-themed aesthetic.
- **Monospace Font**: `Fira Code` or standard monospace for technical readouts, HUD elements, and tooltips.

## 4. Spacing & Layout
- **Grid System**: Tailwind CSS standard 4-point spacing scale.
- **Layout Approach**: 
  - Fixed full-screen WebGL canvas (`canvas`) in the background.
  - Absolute/fixed positioned HUD overlays for navigation and context.
  - Centered glassmorphic modal panels for detailed planetary content.
- **Safe Zones**: Content is kept within safe zones, padding the edges (e.g., `px-6 md:px-10`) to accommodate screen variations without obscuring the 3D scene.

## 5. Component Inventory
- **Layout & Overlays**: `MobilePortfolio` (fallback), `PlanetDetailPanel`, `SectionContext` (HUD), `HelpOverlay`, `TutorialOverlay`.
- **UI Elements**: `CustomCursor`, `ThemeToggle`, `ProgressBar`, `SkillBar`, `ProjectCard`, `SkillCategoryCard`, `CertLightbox`, `Timeline`.
- **Space & 3D Components**: `InteractivePlanet`, `AtmosphereGlow`, `AsteroidField`, `BlackHole`, `CometTrail`, `EnhancedStarfield`, `NebulaCloud`, `SpiralGalaxy`.
- **System Orchestrators**: `PlanetarySystem` (Main Scene), `DynamicLighting`, `CameraEffects`, `AssetPreloader`.

## 6. Animation
- **Scroll Orchestration**: Driven by `GSAP` and custom hooks (`useScrollOrchestrator.ts`). The camera progresses linearly through the solar system based on scroll percentage.
- **Kinetic Typography**: `ScrollTrigger` modifies font weights dynamically as sections enter and exit the viewport.
- **Micro-interactions**: Framer Motion handles hover states, button scales (`whileTap={{ scale: 0.92 }}`), and panel slide-ins. 
- **Planet Idle Animation**: Slow rotation and gentle vertical floating (unless `reduceMotion` is enabled).

## 7. Three.js Scene Configuration
- **Rendering Engine**: React Three Fiber (R3F) with `drei` utilities.
- **Planets**: Hybrid approach utilizing high-res texture maps (Albedo, Normal, Specular, Cloud layers) mapped to simple sphere geometries rather than complex GLB models, keeping vertex count low.
- **Procedural VFX**: Instanced meshes for asteroids, shader-based Rayleigh scattering for atmospheres (`AtmosphereGlow.tsx`), and a custom shader for the `ReactiveStarfield` (showing Doppler shift during travel).
- **Lighting**: Custom `DynamicLighting.tsx` interpolates main directional light, point fill light, and scene fog colors based on the current sector (e.g., warm light near Sun, deep blue near Neptune).

## 8. Asset Management
- **Central Registry**: `src/config/assetConfig.ts` controls all paths, LOD thresholds, and geometry settings.
- **Textures**: Converted to 8K WebP formats for maximum quality and compression.
- **LOD Strategy**: Texture resolution scales dynamically based on camera proximity (falling back to `-512.webp` maps when viewed from a distance).
- **Preloading**: A cinematic boot sequence (`AssetPreloader.tsx`) masks texture loading times.

## 9. Mobile Responsiveness
- **Conditional Rendering**: For mobile devices (detected by user agent or screen width), the application heavily optimizes or disables the 3D scene.
- **Mobile Fallback**: `MobilePortfolio.tsx` provides a seamless, standard scroll-based web experience without WebGL dependencies to ensure high performance on low-tier devices.
- **Touch Interactions**: Orbital controls support touch-drag for rotation and pinch-to-zoom.

## 10. State & Performance Management
- **State**: React Context and custom hooks (`useCinematicTimeline`, `usePlanetInteraction`, `useUserPreferences`).
- **Optimization**: `useCinematicOptimization` auto-adjusts particle counts (`particleCountMultiplier`) and dynamically disables post-processing (`CameraEffects.tsx`) if frame rates drop below ~50 FPS.
- **Accessibility**: Includes a `reduceMotion` toggle, `useFocusTrap` for modal accessibility, and Axe-core validation in development.

## 11. Weakness Analysis & Gap Analysis (Roadmap for "Google Stitch" Upgrade)
- **Animation Easing**: Camera paths between planets can feel slightly linear; GSAP custom eases should be refined to feel more natural (ease in/out of planetary orbits).
- **UI Polish**: Glassmorphic panels (`PlanetDetailPanel`) need tighter integration with the background (e.g., more sophisticated depth-of-field blurring when opened).
- **Texture Sharpness**: While 8K textures are used, normal maps can appear flat at grazing angles. Implementing a better bump/displacement scale approach is recommended.
- **Post-Processing**: Bloom thresholds currently blow out brighter text elements. Need to isolate bloom to the 3D scene using selective bloom or layering, keeping the DOM UI crisp.
