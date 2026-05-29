import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef, useState } from "react";
import { TiArrowDown } from "react-icons/ti";
import { FiGithub } from "react-icons/fi";

import AnimatedTitle from "./AnimatedTitle";
import NeuralCanvas from "./NeuralCanvas";

gsap.registerPlugin(ScrollTrigger);

const ROTATING_WORDS = [
  "Deep Learning",
  "Reinforcement Learning",
  "Explainable AI",
  "Cryptography",
  "Automation",
];

const Hero = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [fadeWord, setFadeWord] = useState(true);
  const heroRef = useRef(null);
  const subtitleRef = useRef(null);
  const sectionTagRef = useRef(null);
  const buttonsRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  // Rotating words with fade
  useEffect(() => {
    const interval = setInterval(() => {
      setFadeWord(false);
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
        setFadeWord(true);
      }, 300);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // GSAP entrance animations
  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        // Section tag slides down from above
        gsap.fromTo(
          sectionTagRef.current,
          { y: -30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.3 }
        );

        // Subtitle fades up
        gsap.fromTo(
          subtitleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power2.out", delay: 0.9 }
        );

        // Buttons fade in
        gsap.fromTo(
          buttonsRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 1.2 }
        );

        // Scroll indicator pulses
        gsap.fromTo(
          scrollIndicatorRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1, ease: "power1.out", delay: 1.8 }
        );

        // Bounce animation on scroll indicator
        gsap.to(scrollIndicatorRef.current, {
          y: 10,
          duration: 0.8,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
          delay: 2.5,
        });
      }, heroRef);

      return () => ctx.revert();
    },
    { scope: heroRef }
  );

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative flex h-screen min-h-screen w-screen items-center justify-center overflow-hidden"
      style={{ background: "#020308" }}
    >
      {/* Neural Canvas Background */}
      <div className="absolute inset-0 z-0">
        <NeuralCanvas />
      </div>

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(2,3,8,0.15) 0%, rgba(2,3,8,0.5) 50%, rgba(2,3,8,0.85) 100%)",
        }}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 h-32"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(2,3,8,0.95))",
        }}
      />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center px-6 text-center">
        {/* Section Tag */}
        <div
          ref={sectionTagRef}
          className="mb-6 inline-flex items-center gap-2 rounded-full px-5 py-1.5 text-xs font-semibold uppercase tracking-[0.25em]"
          style={{
            background: "rgba(0,245,255,0.08)",
            border: "1px solid rgba(0,245,255,0.35)",
            color: "#00F5FF",
            letterSpacing: "0.25em",
          }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{
              background: "#00F5FF",
              boxShadow: "0 0 8px #00F5FF",
              animation: "pulse 2s ease-in-out infinite",
            }}
          />
          AI / ML Engineer
        </div>

        {/* Main Title */}
        <AnimatedTitle
          title="VAKA <br /> HAREESH REDDY"
          containerClass="!text-white text-center mb-6 hero-name-title"
        />

        {/* Subtitle with rotating words */}
        <p
          ref={subtitleRef}
          className="mb-10 max-w-xl text-sm leading-relaxed md:text-base"
          style={{ color: "rgba(255,255,255,0.6)" }}
        >
          Building Intelligent Systems from{" "}
          <span
            style={{
              color: "#00F5FF",
              fontWeight: 600,
              opacity: fadeWord ? 1 : 0,
              transition: "opacity 0.3s ease",
              display: "inline-block",
              minWidth: "180px",
              textAlign: "left",
              textShadow: "0 0 12px rgba(0,245,255,0.5)",
            }}
          >
            {ROTATING_WORDS[wordIndex]}
          </span>
        </p>

        {/* CTA Buttons */}
        <div
          ref={buttonsRef}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          {/* Primary: Explore My Work */}
          <button
            onClick={scrollToProjects}
            className="group relative overflow-hidden rounded-full px-7 py-3 text-sm font-semibold uppercase tracking-wider transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #00F5FF, #7C3AED)",
              color: "#020308",
              boxShadow: "0 0 24px rgba(0,245,255,0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 0 36px rgba(0,245,255,0.5)";
              e.currentTarget.style.transform = "scale(1.03)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                "0 0 24px rgba(0,245,255,0.3)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Explore My Work
          </button>

          {/* Secondary: View GitHub */}
          <a
            href="https://github.com/Hareeshreddyvaka"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold uppercase tracking-wider transition-all duration-300"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "rgba(255,255,255,0.85)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(0,245,255,0.5)";
              e.currentTarget.style.color = "#00F5FF";
              e.currentTarget.style.background = "rgba(0,245,255,0.07)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
              e.currentTarget.style.color = "rgba(255,255,255,0.85)";
              e.currentTarget.style.background = "rgba(255,255,255,0.04)";
            }}
          >
            <FiGithub size={16} />
            View GitHub
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1"
        style={{ color: "rgba(255,255,255,0.35)" }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <TiArrowDown
          size={20}
          style={{ color: "rgba(0,245,255,0.5)" }}
        />
      </div>

      <style>{`
        .hero-name-title {
          font-size: clamp(2.5rem, 8vw, 7rem) !important;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.85); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
