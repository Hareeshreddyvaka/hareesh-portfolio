import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Face Shape Classification & Hairstyle Try-On",
    shortDesc: "3-model ensemble (EfficientNet-B3, MobileNetV2, CoAtNet-Tiny) achieving 89.6% accuracy across 5 face shape categories.",
    description: "Built a weighted soft-voting ensemble of three architectures. Added a virtual hairstyle try-on pipeline using MediaPipe facial landmarks and alpha compositing to overlay hairstyle images onto input photos.",
    tags: ["EfficientNet-B3", "MobileNetV2", "PyTorch", "MediaPipe", "OpenCV"],
    category: "Deep Learning",
    badgeClass: "badge-dl",
    image: "/assets/projects/proj-face-shape.png",
    github: "https://github.com/Hareeshreddyvaka/Face-Shape-TryOn",
    accent: "#00F5FF",
  },
  {
    id: 2,
    title: "Multi-Agent Warehouse Robot Coordination",
    shortDesc: "MAPPO system coordinating multiple warehouse robots with curriculum learning across 10×10 to 20×20 grid environments.",
    description: "Centralized critic architecture where each agent acts independently but the critic sees the full state during training. Applied Generalized Advantage Estimation (GAE) to reduce gradient variance.",
    tags: ["MAPPO", "PyTorch", "Curriculum Learning", "GAE", "MARL"],
    category: "Reinforcement Learning",
    badgeClass: "badge-rl",
    image: "/assets/projects/proj-marl.png",
    github: "https://github.com/Hareeshreddyvaka/warehouse-rl-mappo",
    accent: "#06FFA5",
  },
  {
    id: 3,
    title: "DeepHealthX — Explainable Cardiac Detection",
    shortDesc: "Multi-modal deep learning model fusing clinical lab data, ECG signals, and cardiac MRI with full XAI layer.",
    description: "Three-input model with SHAP for tabular attribution, Grad-CAM for MRI spatial attention, and temporal gradient saliency for ECG decisions. Written up as an IEEE Access-format paper.",
    tags: ["SHAP", "Grad-CAM", "TensorFlow", "Multi-modal", "XAI"],
    category: "Explainable AI",
    badgeClass: "badge-xai",
    image: "/assets/projects/proj-deephealthx.png",
    github: "https://github.com/Hareeshreddyvaka/DeepHealthX_XAI",
    accent: "#A855F7",
  },
  {
    id: 4,
    title: "SecureDocs — Cryptographic File Sharing",
    shortDesc: "Flask web app with AES-256-GCM file encryption, RSA-2048 key exchange, and TOTP-based 2FA login.",
    description: "Every file operation is written to an audit log. Document owners can grant or revoke recipient access with expiry controls. Simulated cloud storage and KMS demo pages included.",
    tags: ["AES-256-GCM", "RSA-2048", "Flask", "TOTP", "Python"],
    category: "Security",
    badgeClass: "badge-sec",
    image: "/assets/projects/proj-securedocs.png",
    github: "https://github.com/Hareeshreddyvaka/SecureOffice",
    accent: "#F87171",
  },
  {
    id: 5,
    title: "Automated Placement & Internship Tracker",
    shortDesc: "n8n workflow watching Gmail via OAuth2, using Google Gemini to extract structured fields from placement emails.",
    description: "Handled base64-encoded MIME payloads and routed parsed data into a centralized tracker. Extracts company, role, deadline, CTC, and eligibility automatically — no manual checking needed.",
    tags: ["n8n", "Gmail API", "Google Gemini", "OAuth2", "Automation"],
    category: "Automation",
    badgeClass: "badge-auto",
    image: "/assets/projects/proj-placement.png",
    github: "#",
    accent: "#FBBF24",
  },
  {
    id: 6,
    title: "Car Rental Customer Feedback Analyzer",
    shortDesc: "IBM watsonx.ai-powered sentiment analysis dashboard identifying recurring complaint patterns in customer reviews.",
    description: "Classified reviews as positive, neutral, or negative, then visualized the sentiment breakdown to find recurring complaint patterns. Reduced manual review time by 68%.",
    tags: ["IBM watsonx.ai", "Sentiment Analysis", "Python", "NLP"],
    category: "NLP",
    badgeClass: "badge-nlp",
    image: "/assets/projects/proj-feedback.png",
    github: "#",
    accent: "#60A5FA",
  },
];

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(cardRef.current, {
      rotateX: -y * 8,
      rotateY: x * 8,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "power2.out",
    });
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      className="project-card neural-card rounded-2xl overflow-hidden flex-shrink-0 w-[340px] sm:w-[400px]"
      style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          style={{ transform: isHovered ? "scale(1.06)" : "scale(1)" }}
          onError={(e) => {
            e.target.style.display = "none";
            e.target.parentElement.style.background = `linear-gradient(135deg, rgba(0,0,0,0.8), ${project.accent}22)`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1220] via-transparent to-transparent" />
        {/* Category badge */}
        <div className={`absolute top-3 left-3 flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-mono ${project.badgeClass}`}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: project.accent }} />
          {project.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-zentry text-base font-bold uppercase text-white leading-snug mb-2">
          {project.title}
        </h3>
        <p className="text-xs font-general text-[#8892a4] leading-relaxed mb-4">
          {project.shortDesc}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-mono text-white/60"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {project.github && project.github !== "#" ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-general transition-colors duration-200"
              style={{ color: project.accent }}
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </a>
          ) : (
            <span className="text-xs font-mono text-white/30">Private Repo</span>
          )}
        </div>
      </div>

      {/* Glow border on hover */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          boxShadow: `inset 0 0 30px ${project.accent}15, 0 0 30px ${project.accent}10`,
        }}
      />
    </div>
  );
};

const Projects = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const titleRef = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Title entrance
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
          },
        }
      );

      // Horizontal scroll for project track
      const track = trackRef.current;
      const totalScroll = track.scrollWidth - track.parentElement.clientWidth;

      gsap.to(track, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${totalScroll + 400}`,
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="relative bg-neural-black overflow-hidden">
      <div className="sticky top-0 flex flex-col py-16 px-6 sm:px-12">
        {/* Header */}
        <div ref={titleRef} className="mb-10 max-w-4xl mx-auto w-full">
          <div className="flex items-center gap-3 mb-4">
            <span className="section-tag">02 / Projects</span>
          </div>
          <AnimatedTitle
            title="WHAT I'VE <br /> BUILT"
            containerClass="!text-left text-white"
          />
          <p className="mt-4 max-w-xl text-sm font-general text-[#8892a4] leading-relaxed">
            From multi-agent reinforcement learning systems to explainable medical AI —
            here's what I've built over the past two years, mostly for coursework but many on my own time.
          </p>
        </div>

        {/* Horizontal scroll track */}
        <div className="overflow-hidden w-full">
          <div
            ref={trackRef}
            className="flex gap-5 will-change-transform pb-4"
            style={{ width: "max-content" }}
          >
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
