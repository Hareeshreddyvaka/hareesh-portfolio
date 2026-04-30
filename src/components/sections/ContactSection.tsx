import { useState } from 'react';
import { usePortfolioData } from '../../hooks/usePortfolioData';
import { Send, Github, Linkedin, Twitter, Mail } from 'lucide-react';

export default function ContactSection() {
  const { data, isLoading } = usePortfolioData();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (isLoading || !data) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate sending
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  const { personal } = data;

  return (
    <section
      id="contact-section"
      className="relative w-full min-h-[100vh] py-32 pointer-events-auto bg-black flex flex-col justify-center"
    >
      <h2 className="text-2xl font-bold text-white mb-4 text-center">Let us build something intelligent</h2>
      <div id="contact-content" className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left: Info */}
        <div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-outfit">
            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9D4EDD] to-[#3A86FF]">Connect</span>
          </h2>
          <p className="text-xl text-gray-400 font-inter max-w-lg mb-10">
            Have a project in mind or want to explore potential collaborations? Reach out and I'll get back to you across the cosmos.
          </p>

          <div className="space-y-6">
            <a href={`mailto:${personal.email}`} className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors group">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#3A86FF]/20 group-hover:border-[#3A86FF]/50 transition-all">
                <Mail className="text-[#3A86FF]" size={20} />
              </div>
              <span className="font-mono text-lg">{personal.email}</span>
            </a>
            
            <div className="flex gap-4 pt-6 mt-6 border-t border-white/10">
              {personal.social.github && (
                <a href={personal.social.github} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 text-gray-400 hover:bg-[#9D4EDD]/20 hover:text-[#9D4EDD] transition-colors border border-transparent hover:border-[#9D4EDD]/50">
                  <Github size={24} />
                </a>
              )}
              {personal.social.linkedin && (
                <a href={personal.social.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 text-gray-400 hover:bg-[#3A86FF]/20 hover:text-[#3A86FF] transition-colors border border-transparent hover:border-[#3A86FF]/50">
                  <Linkedin size={24} />
                </a>
              )}
              {personal.social.twitter && (
                <a href={personal.social.twitter} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 text-gray-400 hover:bg-[#00D9FF]/20 hover:text-[#00D9FF] transition-colors border border-transparent hover:border-[#00D9FF]/50">
                  <Twitter size={24} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="bg-[#1A1F26]/60 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
          {/* Subtle glow bg */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#3A86FF]/10 rounded-full blur-[100px] -z-10" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#9D4EDD]/10 rounded-full blur-[100px] -z-10" />

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-400 uppercase tracking-wider">Name</label>
              <input 
                id="name"
                required
                type="text" 
                className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#3A86FF] focus:ring-1 focus:ring-[#3A86FF] transition-all"
                placeholder="John Doe"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-400 uppercase tracking-wider">Email</label>
              <input 
                id="email"
                required
                type="email" 
                className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#3A86FF] focus:ring-1 focus:ring-[#3A86FF] transition-all"
                placeholder="john@example.com"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-medium text-gray-400 uppercase tracking-wider">Message</label>
              <textarea 
                id="message"
                required
                rows={4}
                className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#3A86FF] focus:ring-1 focus:ring-[#3A86FF] transition-all resize-none"
                placeholder="How can we help you?"
              />
            </div>

            <button 
              type="submit"
              disabled={isSubmitting || isSuccess}
              className={`mt-4 w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold transition-all duration-300 ${
                isSuccess 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' 
                  : 'bg-gradient-to-r from-[#9D4EDD] to-[#3A86FF] text-white hover:shadow-[0_0_20px_rgba(58,134,255,0.4)] hover:scale-[1.02]'
              }`}
            >
              {isSubmitting ? (
                <span className="animate-pulse">Sending Transmission...</span>
              ) : isSuccess ? (
                <span>Transmission Received!</span>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send size={18} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
