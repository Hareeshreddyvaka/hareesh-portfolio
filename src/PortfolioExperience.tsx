import { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { AssetProvider } from './contexts/AssetContext';
import { useAssets } from './contexts/useAssets';
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

interface PortfolioExperienceProps {
  onReady: () => void;
}

function PortfolioExperienceRoot({ onReady }: PortfolioExperienceProps) {
  const { isLoading } = useAssets();
  const { showHelp, setShowHelp } = useKeyboardShortcuts();
  const hasSignaledReady = useRef(false);

  useEffect(() => {
    if (isLoading || hasSignaledReady.current) return;

    hasSignaledReady.current = true;
    const frame = requestAnimationFrame(() => {
      onReady();
    });

    return () => cancelAnimationFrame(frame);
  }, [isLoading, onReady]);

  const isSceneReady = !isLoading;

  return (
    <>
      <div
        className="transition-opacity duration-[800ms]"
        style={{
          opacity: isSceneReady ? 1 : 0,
          pointerEvents: isSceneReady ? 'auto' : 'none',
        }}
      >
        <ScrollProgress />

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
              {isSceneReady ? <PlanetarySystem /> : null}
            </ErrorBoundary>
          </Canvas>
        </div>

        {isSceneReady ? (
          <>
            <div className="fixed top-0 left-0 right-0 z-50">
              <Navbar />
            </div>

            <ScrollSections />

            <div className="relative z-10 pointer-events-none">
              <div className="w-full h-[500vh]" aria-hidden="true" />
              <div className="pointer-events-auto">
                <Footer />
              </div>
            </div>

            <SettingsMenu />
            <PhotoMode />
            <TutorialOverlay />
            <CustomCursor />
          </>
        ) : null}
      </div>

      <HelpOverlay isOpen={showHelp} onClose={() => setShowHelp(false)} />
    </>
  );
}

export default function PortfolioExperience(props: PortfolioExperienceProps) {
  return (
    <ErrorBoundary>
      <AssetProvider preloadPlanets preloadSkybox>
        <PortfolioExperienceRoot {...props} />
      </AssetProvider>
    </ErrorBoundary>
  );
}
