import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
import { Menu, X, Download, Mail } from 'lucide-react';
import clsx from 'clsx';
import { navItems } from '../../data/navigation';
import { ThemeToggle } from '../ui/ThemeToggle';

const navMotion = {
  initial: { opacity: 0, y: -12 },
  animate: { opacity: 1, y: 0 },
};

const mobileVariants = {
  hidden: { opacity: 0, y: -24 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
};

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const handleNavClick = () => setIsOpen(false);

  return (
    <motion.header
      {...navMotion}
      transition={{ duration: 0.6, delay: 0.2, type: 'spring' }}
      className={clsx(
        'fixed inset-x-0 top-0 z-50 mx-auto flex max-w-6xl items-center justify-between rounded-full px-6 py-4 transition-all duration-300 ease-out md:px-10',
        isScrolled
          ? 'bg-white/80 text-slate-900 shadow-lg shadow-primary-500/10 backdrop-blur dark:bg-slate-900/80 dark:text-slate-100'
          : 'mt-6 bg-white/40 text-slate-900 shadow-sm shadow-primary-500/5 backdrop-blur-2xl dark:bg-slate-900/40 dark:text-slate-100',
      )}
    >
      <div className="flex items-center gap-3">
        <span className="h-10 w-10 rounded-2xl bg-gradient-to-br from-primary-500 via-secondary-400 to-cyan-400 shadow-glow" />
        <span className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-600 dark:text-slate-300">
          Hareesh
        </span>
      </div>
      <nav className="hidden items-center gap-8 md:flex">
        {navItems.map((item) => (
          <Link
            key={item.id}
            to={item.id}
            smooth
            spy
            offset={-80}
            duration={500}
            className="cursor-pointer text-sm font-medium text-slate-500 transition hover:text-primary-500 dark:text-slate-300 dark:hover:text-primary-300"
            activeClass="text-primary-500 font-semibold dark:text-primary-300"
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="hidden items-center gap-4 md:flex">
        <button
          type="button"
          className="interactive flex items-center gap-2 rounded-full border border-white/10 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary-500/30 dark:bg-slate-800/80 dark:text-slate-100"
          onClick={() => window.open('mailto:hareesh.vaka.ai@gmail.com')}
        >
          <Mail size={16} />
          Hire Me
        </button>
        <a
          className="interactive flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-500 via-secondary-500 to-cyan-400 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-primary-500/40 transition hover:-translate-y-0.5 hover:shadow-primary-500/60"
          href="https://drive.google.com/file/d/1-portfolio-resume/view?usp=sharing"
          target="_blank"
          rel="noreferrer"
        >
          <Download size={16} />
          Download Resume
        </a>
        <ThemeToggle />
      </div>
      <div className="flex items-center gap-3 md:hidden">
        <ThemeToggle />
        <button
          type="button"
          className="rounded-full border border-white/20 bg-white/70 p-2 text-slate-700 shadow-sm transition hover:scale-105 dark:bg-slate-800/80 dark:text-slate-100"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-x-4 top-20 z-40 rounded-3xl border border-white/10 bg-white/90 p-6 shadow-2xl shadow-primary-500/20 dark:bg-slate-900/95"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileVariants}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.id}
                  smooth
                  spy
                  offset={-70}
                  duration={500}
                  onClick={handleNavClick}
                  className="cursor-pointer rounded-full px-4 py-3 text-base font-semibold text-slate-600 transition hover:bg-slate-200/80 hover:text-primary-600 dark:text-slate-200 dark:hover:bg-slate-800/80 dark:hover:text-primary-300"
                  activeClass="bg-primary-500/10 text-primary-600 dark:text-primary-300"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-2 flex flex-col gap-3">
                <a
                  className="interactive flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary-500 via-secondary-500 to-cyan-400 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/40 transition hover:shadow-primary-500/60"
                  href="https://drive.google.com/file/d/1-portfolio-resume/view?usp=sharing"
                  target="_blank"
                  rel="noreferrer"
                  onClick={handleNavClick}
                >
                  <Download size={18} />
                  Download Resume
                </a>
                <button
                  type="button"
                  className="interactive flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/80 px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary-500/30 dark:bg-slate-800/80 dark:text-slate-100"
                  onClick={() => {
                    window.open('mailto:hareesh.vaka.ai@gmail.com');
                    handleNavClick();
                  }}
                >
                  <Mail size={18} />
                  Hire Me
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;

