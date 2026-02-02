import { motion, Variants } from 'framer-motion';
import { ArrowDownRight, Download } from 'lucide-react';
import { Link } from 'react-scroll';
import profileImage from '../assets/profile.svg';
import { socialLinks } from '../data/socials';
import CanvasContainer from '../components/3d/CanvasContainer';
import NeuralNetwork from '../components/3d/NeuralNetwork';

const staggerContainer: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.12, duration: 0.8, ease: 'easeOut' },
  },
};

const childVariant: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="section-padding relative flex min-h-screen items-center overflow-hidden pt-32">
      {/* 3D Background */}
      <CanvasContainer className="absolute inset-0 -z-10 opacity-60">
        <NeuralNetwork />
      </CanvasContainer>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface-dark/50 to-surface-dark pointer-events-none" />
      <div className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-primary-500/10 blur-[100px]" />
      <div className="absolute -right-40 bottom-20 h-[500px] w-[500px] rounded-full bg-secondary-500/10 blur-[100px]" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-16 lg:flex-row items-center">
        <motion.div
          className="flex flex-1 flex-col justify-center gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={childVariant} className="flex items-center gap-3">
            <span className="h-px w-12 bg-primary-500" />
            <span className="text-sm font-mono font-medium tracking-wider text-primary-400">
              AI & ML ENGINEER
            </span>
          </motion.div>

          <motion.h1
            variants={childVariant}
            className="text-5xl font-bold leading-tight text-white md:text-7xl lg:text-8xl tracking-tight"
          >
            Vaka <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">
              Hareesh Reddy
            </span>
          </motion.h1>

          <motion.p
            variants={childVariant}
            className="text-lg text-slate-400 md:text-xl max-w-2xl leading-relaxed"
          >
            Architecting intelligent systems at the intersection of <span className="text-primary-300">Research</span> and <span className="text-secondary-300">Production</span>.
            Specializing in end-to-end ML pipelines and immersive digital experiences.
          </motion.p>

          <motion.div variants={childVariant} className="flex flex-wrap items-center gap-5">
            <Link
              to="contact"
              smooth
              duration={500}
              className="interactive group relative flex items-center gap-3 overflow-hidden rounded-full bg-primary-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-primary-500/25 transition-all hover:bg-primary-500 hover:shadow-primary-500/40 hover:scale-105"
            >
              <span className="relative z-10">Hire Me</span>
              <ArrowDownRight size={18} className="relative z-10 transition-transform group-hover:rotate-45" />
              <div className="absolute inset-0 -z-0 bg-gradient-to-r from-primary-600 to-secondary-600 opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>

            <a
              href="https://drive.google.com/file/d/1-portfolio-resume/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
              className="interactive flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-base font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/20"
            >
              <Download size={18} />
              Resume
            </a>
          </motion.div>

          <motion.div variants={childVariant} className="flex items-center gap-6 pt-4">
            {socialLinks.slice(0, 3).map((social) => (
              <a
                key={social.name}
                href={social.url}
                target={social.name === 'Email' ? '_self' : '_blank'}
                rel="noreferrer"
                className="text-slate-400 transition-colors hover:text-primary-400"
              >
                <span className="sr-only">{social.name}</span>
                {/* Assuming social.icon is a component or we render text if not available. 
                    The original code rendered text handles. Let's keep it simple or use icons if available.
                    Original used text. Let's switch to icons if possible, but for now text is safer.
                */}
                <span className="text-sm font-mono hover:underline decoration-primary-500/50 underline-offset-4">
                  {social.handle}
                </span>
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right side - Profile Card with Glassmorphism */}
        <motion.div
          className="relative hidden lg:flex flex-1 items-center justify-center"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
        >
          <div className="relative z-10 glass-card p-2 rounded-[2.5rem] rotate-3 hover:rotate-0 transition-transform duration-500">
            <img
              src={profileImage}
              alt="Vaka Hareesh Reddy"
              className="h-[400px] w-[320px] rounded-[2rem] object-cover shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 glass-panel p-6 rounded-2xl max-w-[200px]">
              <p className="text-xs font-mono text-primary-300 mb-1">CURRENT STATUS</p>
              <p className="text-sm font-medium text-white">Open to new opportunities & collaborations.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

