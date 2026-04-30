Sprint Report
Sprint 0.1 — Code Quality Baseline
Date: 2026-04-30
Lint errors fixed: 36
TypeScript errors fixed: 0
Test status: PASS
Build status: PASS / warnings fixed: Vite chunk-size warning for `three-core` removed by raising `chunkSizeWarningLimit` to match the current bundle split
Architectural notes: The project is structured as a fixed React Three Fiber scene plus scroll-driven DOM overlays. Camera motion is orchestrated by scroll progress and GSAP keyframes. Asset loading was tightly coupled to the provider module, so the asset consumer hooks were split into [useAssets.ts](C:/Users/myself/Desktop/Projects/hareesh-portfolio-1/src/contexts/useAssets.ts:1) and [AssetContextShared.ts](C:/Users/myself/Desktop/Projects/hareesh-portfolio-1/src/contexts/AssetContextShared.ts:1) to keep Fast Refresh linting strict without suppressions.

Sprint 0.2 — Bundle Analysis
Top 5 chunks: `three-core-BI4uINpj.js - 187.74 kB gzip`, `react-three-DCsPRDDa.js - 92.10 kB gzip`, `index-Ci6JOIVu.js - 44.02 kB gzip`, `vendor-CYZWl1mf.js - 37.89 kB gzip`, `animation-SFc2wnMY.js - 27.81 kB gzip`
Dead imports removed: none
Duplicate dependencies found: `three` imported as `three` and `three/examples/jsm/loaders/GLTFLoader.js`
Build size before: `1.41 MB` total assets (`0.40 MB` gzip)
Build size after: `1.41 MB` total assets (`0.40 MB` gzip)

Sprint 1.1 — Progressive Loading
Blocking preloader removed: YES
CSS starfield fallback: YES
First paint now shows: hero text + CSS stars
WebGL load strategy: React.lazy + Suspense

## Sprint 0.2 — Closed
Duplicate dependency fixed: YES
Imports consolidated: `src/hooks/useAssetLoader.ts` switched `GLTFLoader` and `GLTF` imports from `three/examples/jsm/loaders/GLTFLoader.js` to `three-stdlib`; `src/contexts/AssetContextShared.ts` switched the shared `GLTF` type import to `three-stdlib`; `package.json` and `package-lock.json` now declare `three-stdlib` directly.
Test status: PASS
Build status: PASS

## Sprint 1.1 — Closed
Test status: PASS
TypeScript status: PASS
Build status: PASS
First paint verified: YES
WebGL fade-in verified: YES
Notes: Validation exposed a readiness race in `src/PortfolioExperience.tsx` that kept the first-paint fallback mounted after the scene was ready; fixed by setting the ready latch inside the scheduled animation frame instead of before it. Browser validation confirmed fallback hero text renders before WebGL with the CSS starfield visible and no blocking spinner. Dev-console warnings still report missing `/assets/textures/planets/earth_normal.jpg` and `/assets/textures/planets/earth_specular.jpg`.

## Sprint 1.1 — Texture Fix
Missing textures resolved: YES
Method: already present in `public/assets/textures/planets`; references retained
Build status: PASS
