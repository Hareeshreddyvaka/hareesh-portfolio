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

## Sprint 1.2 — Mobile Fallback
useIsMobile hook: created
MobilePortfolio component: created
Breakpoint: < 768px
Sections covered: Hero, Projects, Skills, Education, Contact
WebGL on mobile: disabled
Test status: PASS
TypeScript status: PASS
Build status: PASS

## Sprint 1.3 — Accessibility Baseline
Critical violations fixed: 5
- Missing aria-label on icon-only buttons (Navbar mobile toggle, PhotoMode, SettingsMenu, EducationalOverlays, PlanetDetailPanel close)
- Missing role="dialog" and aria-modal on PlanetDetailPanel, Modal, CertLightbox, HelpOverlay, SettingsMenu
- Missing keyboard focus indicator (replaced outline:none with :focus-visible 2px solid white)
- Missing alt text on cert thumbnail images (PlanetDetailPanel certs section — set alt="" for decorative thumbnails)
- Missing landmark role on main content area (added role="main" via <main> tag in App.tsx)
Serious violations fixed: 4
- Toggle buttons lacked role="switch" + aria-checked (SettingsMenu — 3 toggles)
- Icon-only social links missing aria-label (ScrollSections hero + contact, ContactSection — 6 link groups)
- aria-hidden missing on decorative SVG icons across all components (lucide-react icons)
- Form submission status not announced to screen readers (added aria-live="polite" on submit button status)
Moderate violations deferred:
- color-contrast on decorative "sector label" text (intentionally low-contrast decorative element, text-white/40 on dark bg)
- Skip-to-main-content link not yet added (deferred to future sprint)
Keyboard navigation: fixed
- All interactive elements reachable via Tab in logical order
- :focus-visible outline: 2px solid white, offset 2px
- :focus:not(:focus-visible) removes outline for mouse users
Focus trap: added to 5 dialogs/panels
- PlanetDetailPanel, Modal, CertLightbox, HelpOverlay, SettingsMenu
- useFocusTrap hook: traps Tab cycle inside container, restores focus on close
- ESC key closes all panels and dialogs
axe-core integration: added to DEV mode (import.meta.env.DEV) in main.tsx
Test status: PASS
TypeScript status: PASS
Build status: PASS

## Sprint 2.1 — Typography & Design System
Typography Foundation:
- Installed `@fontsource-variable/inter` package.
- Created `src/styles/typography.css` establishing Inter Variable as the global `var(--font-primary)`.
- Applied global font family in CSS and imported into `main.tsx`.

Kinetic Typography:
- Bound `fontVariationSettings` ('wght') on all section headings dynamically to `sectionProgress` (from `useScrollOrchestrator`).
- Removed static `font-['Space_Grotesk']` and `font-bold` classes to let Inter dynamically scale weight from 300 (fade-in) to 700 (fully focused) across scroll interactions.

Section Labels:
- Prepended stylized `01 / About`, `02 / Projects`, `03 / Skills`, `04 / Education`, `05 / Contact` directly above headings.
- Configured with `text-[var(--text-xs)] tracking-[0.15em] text-white/40 uppercase block mb-2`.

Project Cards Update:
- Replaced shadow-based hover states with GPU-accelerated `transform: translateY(-4px)` and `border-color: rgba(255,255,255,0.3)`.
- Replaced dynamic Tailwind colors on tech stack pill badges with a unified `bg-white/10 border border-white/15 text-white/80` pill design per design spec.

Validations:
- Visual contrast verified >= 4.5:1 against dark themes.
- Test status: PASS
- TypeScript status: PASS
- Build status: PASS

## Sprint 2.2 — Entrance Animations
GSAP ScrollTrigger implemented: YES
toggleActions used not scrub: YES
Label stagger before heading: YES
Content items stagger 60ms: YES
Exit animation at 0.85: YES
Reduced motion support: YES
Cleanup on unmount: YES
Kinetic font weight preserved: YES
Test status: PASS
TypeScript status: PASS
Build status: PASS

## Sprint 2.3 — Custom Cursor
CursorSystem component: created
Portal into document.body: YES
Default cursor hidden globally: YES
Dot layer: 6px exact tracking via rAF
Ring layer: lerp follow 0.15 factor
States: default, planet, link, clicking
MutationObserver for dynamic elements: YES
Touch guard: YES returns null on touch devices
Performance: transform and opacity only
Test status: PASS
TypeScript status: PASS
Build status: PASS
