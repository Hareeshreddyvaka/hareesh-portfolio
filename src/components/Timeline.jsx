import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const timelineItems = [
  {
    period: "Aug 2023 – Present",
    type: "Education",
    title: "B.Tech CSE — Artificial Intelligence & Machine Learning",
    org: "VIT Chennai",
    detail: "CGPA: 7.82 | No backlogs",
    tags: ["AI/ML Specialization", "Deep Learning", "Reinforcement Learning", "XAI"],
    color: "#00F5FF",
    icon: "🎓",
  },
  {
    period: "Jan – May 2025",
    type: "Project",
    title: "DeepHealthX — Explainable Cardiac Disease Detection",
    org: "Academic Research",
    detail: "Multi-modal DL + SHAP + Grad-CAM + Temporal Saliency. IEEE Access format paper.",
    tags: ["Multi-modal AI", "XAI", "Research Paper"],
    color: "#A855F7",
    icon: "🔬",
  },
  {
    period: "Jan – May 2025",
    type: "Project",
    title: "Multi-Agent Warehouse Robot Coordination",
    org: "Deep Learning Coursework",
    detail: "MAPPO with centralized critic across 10×10 to 20×20 grids. GAE reduced training variance significantly.",
    tags: ["MARL", "MAPPO", "Curriculum Learning"],
    color: "#06FFA5",
    icon: "🤖",
  },
  {
    period: "Jan – May 2025",
    type: "Project",
    title: "Face Shape Classification & Hairstyle Try-On",
    org: "Computer Vision Coursework",
    detail: "EfficientNet-B3 + MobileNetV2 + CoAtNet-Tiny ensemble. 89.6% test accuracy. MediaPipe virtual try-on.",
    tags: ["EfficientNet", "Ensemble", "MediaPipe"],
    color: "#00F5FF",
    icon: "👁️",
  },
  {
    period: "2025",
    type: "Project",
    title: "SecureDocs — Cryptographic File Sharing",
    org: "Compiler Design Course Project",
    detail: "AES-256-GCM encryption, RSA-2048 key exchange, TOTP 2FA, full audit logging.",
    tags: ["Cryptography", "Flask", "Security"],
    color: "#F87171",
    icon: "🔐",
  },
  {
    period: "2025",
    type: "Project",
    title: "Automated Placement & Internship Tracker",
    org: "Personal Project",
    detail: "n8n workflow + Gmail API OAuth2 + Google Gemini API for structured field extraction.",
    tags: ["n8n", "LLM Integration", "Automation"],
    color: "#FBBF24",
    icon: "⚡",
  },
  {
    period: "2024",
    type: "Certification",
    title: "IBM Generative AI Certification",
    org: "IBM Skills Build",
    detail: "Covered GenAI models, prompt engineering, and IBM watsonx.ai platform.",
    tags: ["IBM watsonx", "GenAI", "LLMs"],
    color: "#60A5FA",
    icon: "🏆",
  },
];

const Timeline = () => {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Animate timeline line growth
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: true,
          },
        }
      );

      // Animate each timeline item
      gsap.fromTo(
        ".tl-item",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".tl-container",
            start: "top 75%",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="journey" ref={sectionRef} className="relative bg-neural-black py-24 px-6 sm:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <span className="section-tag mb-4 inline-flex">04 / Journey</span>
          <AnimatedTitle
            title="THE <br /> JOURNEY"
            containerClass="!text-left text-white"
          />
          <p className="mt-4 max-w-xl text-sm font-general text-[#8892a4] leading-relaxed">
            From VIT Chennai to building systems that can see, reason, and coordinate —
            every project has been a step toward understanding intelligence.
          </p>
        </div>

        {/* Timeline */}
        <div className="tl-container relative">
          {/* Vertical line */}
          <div
            ref={lineRef}
            className="timeline-line absolute left-[18px] top-0 bottom-0"
            style={{
              background: "linear-gradient(180deg, #00F5FF, #7C3AED, transparent)",
              width: "1px",
              opacity: 0.5,
            }}
          />

          <div className="space-y-8 pl-12">
            {timelineItems.map((item, i) => (
              <div key={i} className="tl-item relative">
                {/* Dot */}
                <div
                  className="absolute -left-12 w-5 h-5 rounded-full border-2 flex items-center justify-center"
                  style={{
                    borderColor: item.color,
                    background: `${item.color}15`,
                    boxShadow: `0 0 12px ${item.color}40`,
                    top: "2px",
                    left: "-39px",
                  }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: item.color }}
                  />
                </div>

                {/* Card */}
                <div className="neural-card rounded-xl p-5 hover:border-white/20 transition-all duration-300">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{item.icon}</span>
                      <span
                        className="text-[10px] font-mono uppercase tracking-widest rounded-full px-2 py-0.5 border"
                        style={{
                          color: item.color,
                          borderColor: `${item.color}30`,
                          background: `${item.color}10`,
                        }}
                      >
                        {item.type}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-white/40">{item.period}</span>
                  </div>

                  <h3 className="font-general font-semibold text-sm text-white mb-0.5">
                    {item.title}
                  </h3>
                  <p className="text-[10px] font-mono text-white/40 mb-2">{item.org}</p>
                  <p className="text-xs font-general text-[#8892a4] leading-relaxed mb-3">
                    {item.detail}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-mono text-white/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
