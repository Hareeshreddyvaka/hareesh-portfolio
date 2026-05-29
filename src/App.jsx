import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Timeline from "./components/Timeline";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

gsap.registerPlugin(ScrollTrigger);

// Custom cursor
const Cursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const handleMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.to(dot, { x: mouseX, y: mouseY, duration: 0.08, ease: "none" });
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      gsap.set(ring, { x: ringX - 14, y: ringY - 14 });
      requestAnimationFrame(animate);
    };

    const handleHover = (e) => {
      const isInteractive = e.target.closest("a, button, [role='button'], input, textarea");
      ring.classList.toggle("hovering", !!isInteractive);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mousemove", handleHover);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousemove", handleHover);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" style={{ transform: "translate(-50%, -50%)" }} />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
};

function App() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden bg-neural-black">
      {/* Custom cursor (desktop only) */}
      <div className="hidden sm:block">
        <Cursor />
      </div>

      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Timeline />
      <Certifications />
      <Contact />
      <Footer />
    </main>
  );
}

export default App;
