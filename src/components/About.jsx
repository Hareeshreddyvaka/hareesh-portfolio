import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "7.82", label: "CGPA", suffix: "" },
  { value: "120", label: "Problems Solved", suffix: "+" },
  { value: "7", label: "Projects Built", suffix: "+" },
  { value: "2027", label: "Graduation Year", suffix: "" },
];

const BentoCard = ({ children, className = "", style = {} }) => (
  <div
    className={`neural-card relative overflow-hidden rounded-2xl p-6 transition-all duration-300 ${className}`}
    style={{
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.08)",
      backdropFilter: "blur(10px)",
      ...style,
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.border = "1px solid rgba(0,245,255,0.25)";
      e.currentTarget.style.background = "rgba(0,245,255,0.04)";
      e.currentTarget.style.transform = "translateY(-2px)";
      e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,245,255,0.08)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)";
      e.currentTarget.style.background = "rgba(255,255,255,0.03)";
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "none";
    }}
  >
    {children}
  </div>
);

const About = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        // Stagger cards on scroll
        gsap.fromTo(
          cardsRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              end: "bottom 60%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Animate stat numbers counting up
        stats.forEach((stat, i) => {
          const el = document.getElementById(`stat-val-${i}`);
          if (!el) return;
          const target = parseFloat(stat.value);
          const isDecimal = stat.value.includes(".");
          gsap.fromTo(
            { val: 0 },
            { val: target },
            {
              duration: 1.5,
              ease: "power2.out",
              onUpdate: function () {
                el.textContent = isDecimal
                  ? this.targets()[0].val.toFixed(2)
                  : Math.floor(this.targets()[0].val);
              },
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
                toggleActions: "play none none none",
              },
            }
          );
        });
      }, sectionRef);

      return () => ctx.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen w-screen py-24"
      style={{ background: "#020308" }}
    >
      <div className="container mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div
            className="mb-4 inline-block rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em]"
            style={{
              background: "rgba(124,58,237,0.12)",
              border: "1px solid rgba(124,58,237,0.35)",
              color: "#7C3AED",
            }}
          >
            Who I Am
          </div>
          <AnimatedTitle
            title="ABOUT <br /> THE ENGINEER"
            containerClass="!text-white text-center"
          />
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

          {/* Card 1 — Bio (col-span-2, large) */}
          <div
            ref={(el) => (cardsRef.current[0] = el)}
            className="md:col-span-2"
          >
            <BentoCard className="h-full">
              <div className="flex h-full flex-col gap-6 md:flex-row">
                {/* Text content */}
                <div className="flex-1">
                  <div
                    className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest"
                    style={{ color: "#00F5FF" }}
                  >
                    <span
                      className="inline-block h-px w-6"
                      style={{ background: "#00F5FF" }}
                    />
                    Bio
                  </div>
                  <h3
                    className="mb-4 text-xl font-bold text-white"
                    style={{ fontFamily: "General Sans, sans-serif" }}
                  >
                    Vaka Hareesh Reddy
                  </h3>
                  <p
                    className="mb-4 text-sm leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.65)" }}
                  >
                    Third-year CS student at{" "}
                    <span style={{ color: "#00F5FF", fontWeight: 600 }}>
                      VIT Chennai
                    </span>{" "}
                    specializing in AI &amp; Machine Learning. I build
                    things — from multi-agent reinforcement learning systems
                    to explainable medical AI. I learn fastest by building.
                  </p>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    When I'm not training neural nets, I'm pushing code to
                    GitHub, solving algorithmic challenges, or exploring
                    the intersection of cryptography and intelligent systems.
                  </p>

                  {/* Tags */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {[
                      "PyTorch",
                      "GSAP",
                      "React",
                      "Computer Vision",
                      "MARL",
                      "XAI",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full px-3 py-1 text-xs font-medium"
                        style={{
                          background: "rgba(124,58,237,0.1)",
                          border: "1px solid rgba(124,58,237,0.25)",
                          color: "rgba(167,139,250,0.9)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Profile picture with fallback */}
                <div className="flex flex-shrink-0 items-center justify-center md:items-start">
                  <img
                    id="profile-pic"
                    src="/assets/profile.png"
                    alt="Vaka Hareesh Reddy"
                    className="h-36 w-36 rounded-2xl object-cover hidden"
                    style={{
                      border: "2px solid rgba(0,245,255,0.3)",
                      boxShadow: "0 0 30px rgba(0,245,255,0.1)",
                    }}
                    onLoad={(e) => {
                      e.currentTarget.classList.remove("hidden");
                      const fallback = document.getElementById("profile-fallback");
                      if (fallback) fallback.style.display = "none";
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  <div
                    id="profile-fallback"
                    className="flex h-36 w-36 items-center justify-center rounded-2xl text-4xl font-black"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(0,245,255,0.1), rgba(124,58,237,0.15))",
                      border: "2px solid rgba(0,245,255,0.3)",
                      color: "#00F5FF",
                      textShadow: "0 0 20px rgba(0,245,255,0.6)",
                      boxShadow:
                        "0 0 30px rgba(0,245,255,0.1), inset 0 0 30px rgba(0,245,255,0.05)",
                      fontFamily: "sans-serif",
                    }}
                  >
                    HR
                  </div>
                </div>
              </div>
            </BentoCard>
          </div>

          {/* Card 2 — Education / CGPA */}
          <div ref={(el) => (cardsRef.current[1] = el)}>
            <BentoCard className="h-full">
              <div
                className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest"
                style={{ color: "#7C3AED" }}
              >
                <span
                  className="inline-block h-px w-6"
                  style={{ background: "#7C3AED" }}
                />
                Education
              </div>

              {/* Stats grid */}
              <div className="mt-2 grid grid-cols-2 gap-4">
                {stats.map((stat, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center justify-center rounded-xl py-4 text-center"
                    style={{
                      background: "rgba(0,0,0,0.3)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <span
                      className="text-2xl font-black"
                      style={{
                        color: i % 2 === 0 ? "#00F5FF" : "#a78bfa",
                        textShadow:
                          i % 2 === 0
                            ? "0 0 12px rgba(0,245,255,0.4)"
                            : "0 0 12px rgba(167,139,250,0.4)",
                      }}
                    >
                      <span id={`stat-val-${i}`}>{stat.value}</span>
                      {stat.suffix}
                    </span>
                    <span
                      className="mt-1 text-[10px] font-medium uppercase tracking-wider"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              <div
                className="mt-4 rounded-xl p-3 text-center"
                style={{
                  background: "rgba(124,58,237,0.08)",
                  border: "1px solid rgba(124,58,237,0.2)",
                }}
              >
                <p
                  className="text-xs font-semibold"
                  style={{ color: "rgba(167,139,250,0.9)" }}
                >
                  VIT Chennai
                </p>
                <p
                  className="text-[10px] mt-0.5"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  B.Tech CSE (AI &amp; ML) · 2023–2027
                </p>
              </div>
            </BentoCard>
          </div>

          {/* Card 3 — LeetCode */}
          <div ref={(el) => (cardsRef.current[2] = el)}>
            <BentoCard>
              <div
                className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest"
                style={{ color: "#00F5FF" }}
              >
                <span
                  className="inline-block h-px w-6"
                  style={{ background: "#00F5FF" }}
                />
                Problem Solving
              </div>

              <div className="flex items-center gap-4">
                <div
                  className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full text-xl font-black"
                  style={{
                    background: "rgba(0,245,255,0.08)",
                    border: "2px solid rgba(0,245,255,0.3)",
                    color: "#00F5FF",
                  }}
                >
                  120+
                </div>
                <div>
                  <p className="font-bold text-white">Problems Solved</p>
                  <p
                    className="text-xs mt-1"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    Arrays · Graphs · Dynamic Programming
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                {[
                  { label: "Arrays & Strings", pct: 82 },
                  { label: "Graphs & Trees", pct: 74 },
                  { label: "Dynamic Programming", pct: 68 },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-[10px] mb-1">
                      <span style={{ color: "rgba(255,255,255,0.55)" }}>
                        {item.label}
                      </span>
                      <span style={{ color: "#00F5FF" }}>{item.pct}%</span>
                    </div>
                    <div
                      className="h-1 w-full rounded-full overflow-hidden"
                      style={{ background: "rgba(255,255,255,0.08)" }}
                    >
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${item.pct}%`,
                          background:
                            "linear-gradient(90deg, #00F5FF, #7C3AED)",
                          boxShadow: "0 0 6px rgba(0,245,255,0.4)",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </BentoCard>
          </div>

          {/* Card 4 — Location & Availability */}
          <div ref={(el) => (cardsRef.current[3] = el)}>
            <BentoCard>
              <div
                className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest"
                style={{ color: "#7C3AED" }}
              >
                <span
                  className="inline-block h-px w-6"
                  style={{ background: "#7C3AED" }}
                />
                Location
              </div>

              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">🇮🇳</span>
                <div>
                  <p className="font-semibold text-white">Chennai, Tamil Nadu</p>
                  <p
                    className="text-xs"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    India
                  </p>
                </div>
              </div>

              {/* Availability badge */}
              <div
                className="flex items-center gap-2 rounded-full px-4 py-2.5"
                style={{
                  background: "rgba(0,200,80,0.08)",
                  border: "1px solid rgba(0,200,80,0.25)",
                }}
              >
                <span
                  className="relative flex h-2.5 w-2.5"
                >
                  <span
                    className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                    style={{ background: "#00c850" }}
                  />
                  <span
                    className="relative inline-flex h-2.5 w-2.5 rounded-full"
                    style={{ background: "#00c850" }}
                  />
                </span>
                <span
                  className="text-xs font-semibold"
                  style={{ color: "#00c850" }}
                >
                  Open to Opportunities
                </span>
              </div>

              <div
                className="mt-4 space-y-2 text-xs"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                <div className="flex items-center gap-2">
                  <span>📧</span>
                  <span>hareeshreddyvaka2006@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>📱</span>
                  <span>+91 8309628645</span>
                </div>
              </div>
            </BentoCard>
          </div>

          {/* Card 5 — IBM Certification */}
          <div ref={(el) => (cardsRef.current[4] = el)}>
            <BentoCard>
              <div
                className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest"
                style={{ color: "#00F5FF" }}
              >
                <span
                  className="inline-block h-px w-6"
                  style={{ background: "#00F5FF" }}
                />
                Certification
              </div>

              <div className="flex items-start gap-4">
                <div
                  className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl text-xs font-black text-white"
                  style={{
                    background: "linear-gradient(135deg, #0f62fe, #4589ff)",
                    boxShadow: "0 4px 16px rgba(15,98,254,0.3)",
                  }}
                >
                  IBM
                </div>
                <div>
                  <p
                    className="text-sm font-bold text-white leading-snug"
                  >
                    IBM Generative AI
                  </p>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    IBM Skills Build · 2024
                  </p>
                </div>
              </div>

              <a
                href="/assets/ibm-genai-cert.png"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-full py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200"
                style={{
                  background: "rgba(15,98,254,0.12)",
                  border: "1px solid rgba(15,98,254,0.3)",
                  color: "#4589ff",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(15,98,254,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(15,98,254,0.12)";
                }}
              >
                View Certificate →
              </a>
            </BentoCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
