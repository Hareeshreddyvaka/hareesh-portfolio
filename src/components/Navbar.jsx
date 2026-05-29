import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { FiDownload } from "react-icons/fi";

import Button from "./Button";

const navItems = ["About", "Projects", "Skills", "Journey", "Contact"];

const NavBar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);

  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }
    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav
          className="flex size-full items-center justify-between rounded-xl px-4 py-2"
          style={{
            background: "rgba(2,3,8,0.85)",
            border: "1px solid rgba(0,245,255,0.2)",
            backdropFilter: "blur(12px)",
          }}
        >
          {/* Logo + CV Download */}
          <div className="flex items-center gap-5">
            {/* HR Logo */}
            <a
              href="#hero"
              className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-black tracking-wider transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, rgba(0,245,255,0.15), rgba(124,58,237,0.15))",
                border: "1px solid rgba(0,245,255,0.4)",
                color: "#00F5FF",
                textShadow: "0 0 12px rgba(0,245,255,0.8)",
                boxShadow: "0 0 16px rgba(0,245,255,0.15)",
                fontFamily: "sans-serif",
              }}
            >
              HR
            </a>

            {/* Download CV */}
            <a
              href="/Vaka_Hareesh_Reddy_CV.pdf"
              download
              className="hidden items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium uppercase tracking-wider transition-all duration-300 md:flex"
              style={{
                background: "rgba(0,245,255,0.08)",
                border: "1px solid rgba(0,245,255,0.3)",
                color: "#00F5FF",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(0,245,255,0.18)";
                e.currentTarget.style.boxShadow = "0 0 12px rgba(0,245,255,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(0,245,255,0.08)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <FiDownload size={12} />
              Resume
            </a>
          </div>

          {/* Nav Links + Audio Toggle */}
          <div className="flex h-full items-center gap-2">
            <div className="hidden md:flex md:items-center">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.toLowerCase()}`}
                  className="relative ms-8 font-general text-xs uppercase text-white/70 transition-colors duration-200 hover:text-[#00F5FF]"
                  style={{ fontFamily: "General Sans, sans-serif" }}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, { color: "#00F5FF", duration: 0.2 });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, { color: "rgba(255,255,255,0.7)", duration: 0.2 });
                  }}
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Audio Indicator */}
            <button
              onClick={toggleAudioIndicator}
              className="ml-8 flex items-center space-x-0.5 rounded-full p-2 transition-all duration-200"
              title="Toggle ambient sound"
              style={{
                background: isAudioPlaying ? "rgba(0,245,255,0.1)" : "transparent",
                border: `1px solid ${isAudioPlaying ? "rgba(0,245,255,0.4)" : "rgba(255,255,255,0.1)"}`,
              }}
            >
              <audio
                ref={audioElementRef}
                className="hidden"
                src="/audio/loop.mp3"
                loop
              />
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={clsx("indicator-line", {
                    active: isIndicatorActive,
                  })}
                  style={{
                    animationDelay: `${bar * 0.1}s`,
                    background: isAudioPlaying ? "#00F5FF" : "rgba(255,255,255,0.5)",
                    boxShadow: isAudioPlaying ? "0 0 4px rgba(0,245,255,0.8)" : "none",
                  }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default NavBar;
