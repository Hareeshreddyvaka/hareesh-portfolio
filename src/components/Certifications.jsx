import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const Certifications = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cert-card",
        { opacity: 0, y: 30, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".cert-card",
            start: "top 80%",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="certifications" ref={sectionRef} className="relative bg-neural-black py-24 px-6 sm:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <span className="section-tag mb-4 inline-flex">05 / Certifications</span>
          <AnimatedTitle
            title="CREDENTIALS <br /> & TRAINING"
            containerClass="!text-left text-white"
          />
        </div>

        {/* IBM Cert Card */}
        <div className="cert-card neural-card rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Image side */}
            <div className="relative bg-[#0d1220] flex items-center justify-center p-8 min-h-[240px]">
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  background: "radial-gradient(circle at center, #60A5FA 0%, transparent 70%)",
                }}
              />
              <img
                src="/assets/ibm-genai-cert.png"
                alt="IBM Generative AI Certification"
                className="relative z-10 max-w-full max-h-48 object-contain rounded-lg shadow-lg"
                style={{ boxShadow: "0 0 30px rgba(96, 165, 250, 0.2)" }}
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>

            {/* Info side */}
            <div className="p-7 flex flex-col justify-center gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400" style={{ boxShadow: "0 0 6px #60A5FA" }} />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400">Certification</span>
                </div>
                <h3 className="font-zentry text-xl font-bold uppercase text-white leading-snug">
                  Generative AI Using IBM Watsonx
                </h3>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-white/40">Issuer</span>
                  <span className="text-xs font-general text-white/80">IBM Skills Build</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-white/40">Year</span>
                  <span className="text-xs font-general text-white/80">2024</span>
                </div>
              </div>

              <p className="text-sm font-general text-[#8892a4] leading-relaxed">
                Mastered Generative AI fundamentals, IBM watsonx.ai platform, prompt engineering,
                and enterprise-grade AI application development.
              </p>

              <div className="flex flex-wrap gap-1.5">
                {["Generative AI", "IBM watsonx", "Prompt Engineering", "LLMs", "Enterprise AI"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-blue-400/20 bg-blue-400/10 px-2 py-0.5 text-[10px] font-mono text-blue-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Academic highlights */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: "📊", label: "CGPA", value: "7.82", sub: "VIT Chennai | AI/ML" },
            { icon: "💻", label: "Problems Solved", value: "120+", sub: "Arrays, Graphs, DP" },
            { icon: "🔬", label: "Projects", value: "7+", sub: "AI/ML focused" },
          ].map((stat) => (
            <div key={stat.label} className="neural-card rounded-xl p-4 text-center">
              <span className="text-2xl mb-2 block">{stat.icon}</span>
              <p className="font-zentry text-2xl font-bold uppercase gradient-text">{stat.value}</p>
              <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest mt-0.5">{stat.label}</p>
              <p className="text-xs font-general text-white/30 mt-0.5">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
