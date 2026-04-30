import { usePortfolioData } from '../../hooks/usePortfolioData';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const { data, isLoading } = usePortfolioData();

  if (isLoading || !data) return null;

  const { personal } = data;

  return (
    <section 
      id="hero-section"
      className="relative w-full h-[100vh] flex flex-col items-center justify-center pointer-events-auto"
    >
      <div className="z-10 text-center px-4 max-w-4xl pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 font-outfit tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            {personal.name}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <h2 className="text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#9D4EDD] via-[#3A86FF] to-[#00D9FF] font-medium mb-6 font-inter tracking-wide">
            {personal.title}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
        >
          <p className="text-gray-400 text-lg md:text-xl font-inter max-w-2xl mx-auto">
            {personal.bio}
          </p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1, delay: 2.5 }}
      >
        <span className="text-xs tracking-widest uppercase mb-2 text-gray-400 font-mono">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"
        />
      </motion.div>
    </section>
  );
}
