import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { socialLinks } from '../../data/socials';
import { Link } from 'react-scroll';

const iconMap: Record<string, JSX.Element> = {
  GitHub: <Github size={18} />,
  LinkedIn: <Linkedin size={18} />,
  Email: <Mail size={18} />,
  Twitter: <Twitter size={18} />,
};

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="section-padding bg-white/30 text-slate-600 backdrop-blur-xl dark:bg-slate-950/50 dark:text-slate-300">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <motion.div
            className="flex flex-col gap-1"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
              Vaka Hareesh Reddy
            </span>
            <p className="text-lg font-semibold text-slate-800 dark:text-slate-100">
              Building intelligence that ships to production.
            </p>
          </motion.div>
          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target={link.name === 'Email' ? '_self' : '_blank'}
                rel="noreferrer"
                className="interactive flex items-center gap-2 rounded-full border border-white/10 bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary-500/30 dark:bg-slate-900/80 dark:text-slate-100"
              >
                {iconMap[link.name]}
                {link.handle}
              </a>
            ))}
          </motion.div>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-primary-500/40 to-transparent" />
        <div className="flex flex-col gap-3 text-sm text-slate-500 dark:text-slate-400 md:flex-row md:items-center md:justify-between">
          <p className="order-2 md:order-1">
            © {year} Vaka Hareesh Reddy. Crafted with React, Vite, Tailwind CSS, and Framer Motion.
          </p>
          <div className="order-1 flex items-center gap-4 md:order-2">
            <Link
              to="hero"
              smooth
              duration={500}
              className="interactive cursor-pointer text-sm font-medium text-primary-600 transition hover:text-primary-500 dark:text-primary-300 dark:hover:text-primary-200"
            >
              Back to top
            </Link>
            <a
              href="https://github.com/hareesh-vaka"
              target="_blank"
              rel="noreferrer"
              className="interactive text-sm font-medium text-primary-600 transition hover:text-primary-500 dark:text-primary-300 dark:hover:text-primary-200"
            >
              Open-source ethos
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

