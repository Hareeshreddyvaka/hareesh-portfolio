import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-content",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("sent");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="relative bg-neural-black py-24 px-6 sm:px-12">
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div className="contact-content max-w-5xl mx-auto relative">
        {/* Header */}
        <div className="mb-14 text-center">
          <span className="section-tag mb-4 inline-flex">06 / Contact</span>
          <AnimatedTitle
            title="LET'S BUILD <br /> SOMETHING"
            containerClass="text-white"
          />
          <p className="mt-4 max-w-lg mx-auto text-sm font-general text-[#8892a4] leading-relaxed">
            Open to AI/ML Engineering roles, Data Science positions, and interesting collaborations.
            I respond within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left — Contact Info */}
          <div className="flex flex-col gap-6">
            {/* Contact cards */}
            <div className="neural-card rounded-2xl p-6">
              <p className="text-xs font-mono text-white/40 uppercase tracking-widest mb-4">Reach Me At</p>
              <div className="space-y-4">
                <a
                  href="mailto:hareeshreddyvaka2006@gmail.com"
                  className="flex items-center gap-3 text-sm font-general text-white/70 hover:text-cyan-glow transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center group-hover:border-cyan-glow/40 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  hareeshreddyvaka2006@gmail.com
                </a>
                <div className="flex items-center gap-3 text-sm font-general text-white/70">
                  <div className="w-8 h-8 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  +91 8309628645
                </div>
                <div className="flex items-center gap-3 text-sm font-general text-white/70">
                  <div className="w-8 h-8 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  Chennai, Tamil Nadu, India
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="neural-card rounded-2xl p-6">
              <p className="text-xs font-mono text-white/40 uppercase tracking-widest mb-4">Connect</p>
              <div className="flex gap-3">
                <a
                  href="https://github.com/Hareeshreddyvaka"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-mono text-white/70 hover:border-cyan-glow/40 hover:text-white transition-all"
                  aria-label="GitHub Profile"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/hareesh-reddy-vaka"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-mono text-white/70 hover:border-violet-glow/40 hover:text-white transition-all"
                  aria-label="LinkedIn Profile"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
                <a
                  href="https://x.com/HareeshVaka"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-mono text-white/70 hover:border-white/30 hover:text-white transition-all"
                  aria-label="Twitter/X Profile"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  Twitter
                </a>
              </div>
            </div>

            {/* CV download */}
            <a
              href="/Vaka_Hareesh_Reddy_CV.pdf"
              download
              className="neural-card rounded-2xl p-5 flex items-center gap-4 hover:border-mint-glow/30 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-mint-glow/10 border border-mint-glow/20 flex items-center justify-center group-hover:bg-mint-glow/20 transition-colors">
                <svg className="w-5 h-5 text-mint-glow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-general text-white font-medium">Download Resume</p>
                <p className="text-xs font-mono text-white/40">Vaka_Hareesh_Reddy_CV.pdf</p>
              </div>
              <svg className="w-4 h-4 ml-auto text-white/30 group-hover:text-mint-glow transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Right — Contact Form */}
          <form onSubmit={handleSubmit} className="neural-card rounded-2xl p-6 flex flex-col gap-4">
            <p className="text-xs font-mono text-white/40 uppercase tracking-widest mb-2">Send a Message</p>
            <div>
              <label className="block text-xs font-mono text-white/50 mb-1.5">Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-general text-white placeholder-white/20 focus:outline-none focus:border-cyan-glow/40 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-white/50 mb-1.5">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@company.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-general text-white placeholder-white/20 focus:outline-none focus:border-cyan-glow/40 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-white/50 mb-1.5">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="What would you like to discuss?"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-general text-white placeholder-white/20 focus:outline-none focus:border-cyan-glow/40 transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-xl py-3 text-sm font-mono font-medium transition-all duration-300 mt-2"
              style={{
                background: status === "sent"
                  ? "linear-gradient(135deg, #06FFA5, #00D4A1)"
                  : "linear-gradient(135deg, #00F5FF22, #7C3AED22)",
                border: `1px solid ${status === "sent" ? "#06FFA5" : "rgba(0,245,255,0.3)"}`,
                color: status === "sent" ? "#06FFA5" : "#00F5FF",
              }}
            >
              {status === "idle" && "Send Message →"}
              {status === "sending" && "Sending..."}
              {status === "sent" && "✓ Message Sent!"}
              {status === "error" && "Error — Try Again"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
