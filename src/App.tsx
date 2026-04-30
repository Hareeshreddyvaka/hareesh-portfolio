import { lazy, Suspense, startTransition, useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import MobilePortfolio from './components/MobilePortfolio';
import { portfolioSeedData } from './data/portfolioSeed';
import { useIsMobile } from './hooks/useIsMobile';

const LazyPortfolioExperience = lazy(() => import('./PortfolioExperience'));

interface FirstPaintFallbackProps {
  isVisible: boolean;
}

function FirstPaintFallback({ isVisible }: FirstPaintFallbackProps) {
  const { personal } = portfolioSeedData;

  return (
    <div
      className={`progressive-fallback fixed inset-0 z-10 flex items-center justify-center px-6 text-center transition-opacity duration-[800ms] ${
        isVisible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <div className="progressive-fallback__stars absolute inset-0" aria-hidden="true" />
      <div className="relative z-10 max-w-4xl">
        <p className="mb-4 text-xs uppercase tracking-[0.35em] text-white/55">
          Portfolio Loading
        </p>
        <h1 className="font-['Space_Grotesk'] text-5xl font-bold leading-[0.95] text-white md:text-7xl lg:text-[5.5rem]">
          {personal.name}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/72 md:text-xl">
          {personal.title}
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const isMobile = useIsMobile();
  const [shouldLoadExperience, setShouldLoadExperience] = useState(false);
  const [isExperienceReady, setIsExperienceReady] = useState(false);

  useEffect(() => {
    if (isMobile) {
      return undefined;
    }

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
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      setShouldLoadExperience(false);
      setIsExperienceReady(false);
      return undefined;
    }

    let firstFrame = 0;
    let secondFrame = 0;

    firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => {
        startTransition(() => {
          setShouldLoadExperience(true);
        });
      });
    });

    return () => {
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
    };
  }, [isMobile]);

  if (isMobile) {
    return <MobilePortfolio />;
  }

  return (
    <main role="main">
      <FirstPaintFallback isVisible={!isExperienceReady} />

      {shouldLoadExperience ? (
        <Suspense fallback={<FirstPaintFallback isVisible />}>
          <LazyPortfolioExperience onReady={() => setIsExperienceReady(true)} />
        </Suspense>
      ) : null}
    </main>
  );
}
