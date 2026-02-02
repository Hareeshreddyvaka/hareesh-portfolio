import { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';
import AnimatedCursor from 'react-animated-cursor';
import Aos from 'aos';
import { Helmet } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import ChatbotWidget from './components/ui/ChatbotWidget';
import PageLoader from './components/ui/PageLoader';
import { useTheme } from './hooks/useTheme';

const HeroSection = lazy(() => import('./sections/HeroSection'));
const AboutSection = lazy(() => import('./sections/AboutSection'));
const SkillsSection = lazy(() => import('./sections/SkillsSection'));
const ProjectsSection = lazy(() => import('./sections/ProjectsSection'));
const ExperienceSection = lazy(() => import('./sections/ExperienceSection'));
const AchievementsSection = lazy(() => import('./sections/AchievementsSection'));
const ContactSection = lazy(() => import('./sections/ContactSection'));

function App() {
  const { isDark } = useTheme();
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    Aos.init({
      duration: 900,
      once: true,
      offset: 80,
      easing: 'ease-out-cubic',
    });
    setShowCursor(true);
  }, []);

  const cursorColor = useMemo(() => (isDark ? '56,189,248' : '59,130,246'), [isDark]);

  return (
    <>
      <Helmet>
        <title>Vaka Hareesh Reddy | AI & ML Engineer</title>
        <meta
          name="description"
          content="World-class AI & ML developer portfolio of Vaka Hareesh Reddy – projects, skills, experience, and contact information for hiring."
        />
        <meta
          name="keywords"
          content="Vaka Hareesh Reddy, AI engineer, machine learning, full stack developer, React portfolio, VIT Chennai"
        />
        <meta name="author" content="Vaka Hareesh Reddy" />
        <meta property="og:title" content="Vaka Hareesh Reddy | AI & ML Engineer" />
        <meta
          property="og:description"
          content="Explore the AI & ML projects, experience, and achievements of Vaka Hareesh Reddy."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <LazyMotion features={domAnimation}>
        <div className="relative min-h-screen overflow-hidden bg-surface dark:bg-surface-dark text-foreground dark:text-foreground-dark">
          {showCursor && (
            <AnimatedCursor
              innerSize={10}
              outerSize={36}
              color={cursorColor}
              outerAlpha={0.2}
              innerScale={0.7}
              outerScale={2.1}
              clickables={['a', 'button', '.interactive']}
            />
          )}
          <Navbar />
          <main className="flex flex-col gap-16 md:gap-24">
            <Suspense fallback={<PageLoader />}>
              <HeroSection />
            </Suspense>
            <Suspense fallback={<PageLoader />}>
              <AboutSection />
            </Suspense>
            <Suspense fallback={<PageLoader />}>
              <SkillsSection />
            </Suspense>
            <Suspense fallback={<PageLoader />}>
              <ProjectsSection />
            </Suspense>
            <Suspense fallback={<PageLoader />}>
              <ExperienceSection />
            </Suspense>
            <Suspense fallback={<PageLoader />}>
              <AchievementsSection />
            </Suspense>
            <Suspense fallback={<PageLoader />}>
              <ContactSection />
            </Suspense>
          </main>
          <Footer />
          <ScrollToTop />
          <ChatbotWidget />
        </div>
      </LazyMotion>
      <Toaster position="top-right" />
    </>
  );
}

export default App;
