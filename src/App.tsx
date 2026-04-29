import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { Canvas } from '@react-three/fiber';
import { AssetProvider } from './contexts/AssetContext';
import { useAssets } from './contexts/useAssets';
import AssetPreloader from './components/space/AssetPreloader';
import { ErrorBoundary } from './utils/errorBoundary';
import { PlanetarySystem } from './components/space/planetarySystem/PlanetarySystem';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { SettingsMenu } from './components/space/SettingsMenu';
import { TutorialOverlay } from './components/space/TutorialOverlay';
import { PhotoMode } from './components/space/PhotoMode';
import { HelpOverlay } from './components/space/HelpOverlay';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import ScrollSections from './components/sections/ScrollSections';
import ScrollProgress from './components/ui/ScrollProgress';
import CustomCursor from './components/ui/CustomCursor';


function PortfolioRoot() {
  const { isLoading, progress } = useAssets();
  const { showHelp, setShowHelp } = useKeyboardShortcuts();

  return (
    <>
      <AssetPreloader progress={progress} isLoading={isLoading} />
      <ScrollProgress />

      {/* 3D Canvas — fixed background */}
      <div className="fixed inset-0 z-0 bg-black">
        <Canvas
          camera={{ position: [0, 0, 20], fov: 55, near: 0.1, far: 500 }}
          gl={{ 
            antialias: false,
            alpha: false, 
            powerPreference: 'high-performance',
            stencil: false,
          }}
          dpr={[1, 1.5]}
        >
          <ErrorBoundary>
            {!isLoading && <PlanetarySystem />}
          </ErrorBoundary>
        </Canvas>
      </div>

      {/* DOM Overlays */}
      {!isLoading && (
        <>
          {/* Navbar — always visible */}
          <div className="fixed top-0 left-0 right-0 z-50">
            <Navbar />
          </div>

          {/* Scroll-triggered portfolio sections — appear/disappear over the 3D scene */}
          <ScrollSections />

          {/* Scroll spacer — creates scroll distance for camera movement */}
          <div className="relative z-10 pointer-events-none">
            <div className="w-full h-[500vh]" aria-hidden="true" />
            <div className="pointer-events-auto">
              <Footer />
            </div>
          </div>

          {/* Utility overlays */}
          <SettingsMenu />
          <PhotoMode />
          <TutorialOverlay />
        </>
      )}

      <HelpOverlay isOpen={showHelp} onClose={() => setShowHelp(false)} />
    </>
  );
}

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <ErrorBoundary>
      <AssetProvider preloadPlanets preloadSkybox>
        <PortfolioRoot />
        <CustomCursor />
      </AssetProvider>
    </ErrorBoundary>
  );
}
