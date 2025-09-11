import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download, ExternalLink } from 'lucide-react';

const Hero = () => {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-dark-200 via-dark-300 to-dark-400"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: '-3s' }}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary-600/5 rounded-full blur-2xl animate-pulse-slow"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Name */}
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-secondary-500 bg-clip-text text-transparent">
                Vaka Hareesh Reddy
              </span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Computer Science Engineer @ VIT Chennai (AI & ML).  
              Passionate about Artificial Intelligence, Web Development, and building impactful digital experiences.
            </motion.p>

            {/* Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {/* View Work */}
              <motion.button
                onClick={scrollToAbout}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 20px 25px -5px rgba(59, 130, 246, 0.3)',
                }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full font-semibold shadow-lg hover:shadow-primary-500/25 transition-all duration-300 flex items-center gap-2"
              >
                View My Work
                <ExternalLink size={18} />
              </motion.button>

              {/* Resume Download (update link later) */}
              <motion.a
                href="/resume.pdf"
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-primary-500 text-primary-400 rounded-full font-semibold hover:bg-primary-500/10 transition-all duration-300 flex items-center gap-2"
              >
                Download Resume
                <Download size={18} />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Scroll down arrow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.button
              onClick={scrollToAbout}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-primary-400 hover:text-primary-300 transition-colors duration-300"
            >
              <ArrowDown size={32} />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
