import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const icon = theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />;

  return (
    <motion.button
      type="button"
      className="interactive relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/80 text-slate-700 shadow-sm transition hover:scale-105 dark:bg-slate-800/80 dark:text-slate-100"
      whileTap={{ scale: 0.92 }}
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {mounted && (
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0, y: -6 }}
          animate={{ rotate: 0, opacity: 1, y: 0 }}
          exit={{ rotate: 90, opacity: 0, y: 6 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
        >
          {icon}
        </motion.span>
      )}
    </motion.button>
  );
};

