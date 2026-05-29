import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    label: "AI / ML",
    icon: "🧠",
    color: "#00F5FF",
    skills: [
      { name: "PyTorch", level: 87 },
      { name: "Deep Learning", level: 88 },
      { name: "Computer Vision", level: 85 },
      { name: "TensorFlow/Keras", level: 76 },
      { name: "IBM watsonx.ai", level: 80 },
      { name: "Scikit-learn", level: 82 },
    ],
  },
  {
    label: "Languages",
    icon: "⌨️",
    color: "#06FFA5",
    skills: [
      { name: "Python", level: 92 },
      { name: "JavaScript", level: 88 },
      { name: "C++", level: 86 },
      { name: "Java", level: 78 },
      { name: "C", level: 74 },
      { name: "SQL / R", level: 72 },
    ],
  },
  {
    label: "Web & Backend",
    icon: "🌐",
    color: "#A855F7",
    skills: [
      { name: "React", level: 90 },
      { name: "HTML / CSS", level: 90 },
      { name: "Node.js", level: 84 },
      { name: "Express", level: 82 },
      { name: "Flask / FastAPI", level: 80 },
      { name: "REST APIs", level: 85 },
    ],
  },
  {
    label: "Tools & Platforms",
    icon: "🛠️",
    color: "#FBBF24",
    skills: [
      { name: "Git & GitHub", level: 93 },
      { name: "Linux", level: 87 },
      { name: "Docker", level: 72 },
      { name: "Google Cloud", level: 68 },
      { name: "n8n Automation", level: 78 },
      { name: "Figma", level: 78 },
    ],
  },
];

const specializations = [
  { label: "CNN / LSTM / Transformers", icon: "🔬" },
  { label: "MARL (MAPPO / PPO)", icon: "🤖" },
  { label: "XAI (SHAP, Grad-CAM)", icon: "🔍" },
  { label: "Curriculum Learning + GAE", icon: "📈" },
  { label: "AES-256 / RSA-2048 / TOTP", icon: "🔐" },
  { label: "MediaPipe / OpenCV", icon: "👁️" },
  { label: "Google Gemini API", icon: "✨" },
  { label: "Prompt Engineering", icon: "💬" },
];

const SkillBar = ({ name, level, color, delay }) => {
  const barRef = useRef(null);
  const fillRef = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        fillRef.current,
        { width: "0%" },
        {
          width: `${level}%`,
          duration: 1.2,
          ease: "power2.out",
          delay,
          scrollTrigger: {
            trigger: barRef.current,
            start: "top 90%",
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={barRef} className="mb-3">
      <div className="flex justify-between mb-1">
        <span className="text-xs font-mono text-white/70">{name}</span>
        <span className="text-xs font-mono" style={{ color }}>{level}%</span>
      </div>
      <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
        <div
          ref={fillRef}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}, ${color}88)`,
            boxShadow: `0 0 6px ${color}66`,
            width: "0%",
          }}
        />
      </div>
    </div>
  );
};

const Skills = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".skill-cat-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".skill-grid",
            start: "top 80%",
          },
        }
      );
      gsap.fromTo(
        ".spec-pill",
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          stagger: 0.06,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: ".spec-grid",
            start: "top 85%",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="relative bg-neural-black py-24 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <span className="section-tag mb-4 inline-flex">03 / Skills</span>
          <AnimatedTitle
            title="TECH <br /> ARSENAL"
            containerClass="!text-left text-white"
          />
          <p className="mt-4 max-w-xl text-sm font-general text-[#8892a4] leading-relaxed">
            Built across coursework, personal projects, and late-night problem solving.
            Most of what I know came from building things, not from lectures.
          </p>
        </div>

        {/* Skill category grid */}
        <div className="skill-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {skillCategories.map((cat, i) => (
            <div key={cat.label} className="skill-cat-card neural-card rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-5">
                <span className="text-lg">{cat.icon}</span>
                <span className="text-xs font-mono uppercase tracking-widest" style={{ color: cat.color }}>
                  {cat.label}
                </span>
              </div>
              {cat.skills.map((skill, j) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  color={cat.color}
                  delay={j * 0.08}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Specialization pills */}
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-white/40 mb-4">
            Concepts & Specializations
          </p>
          <div className="spec-grid flex flex-wrap gap-2.5">
            {specializations.map((spec) => (
              <div
                key={spec.label}
                className="spec-pill flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-mono text-white/70 hover:border-cyan-glow/40 hover:text-white transition-all duration-200"
              >
                <span>{spec.icon}</span>
                <span>{spec.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
