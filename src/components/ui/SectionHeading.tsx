import { motion } from 'framer-motion';
import clsx from 'clsx';

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
};

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  align = 'center',
}) => (
  <div
    className={clsx('mx-auto flex w-full max-w-3xl flex-col gap-4', {
      'text-left': align === 'left',
      'text-center': align === 'center',
    })}
  >
    <motion.span
      className="text-sm font-mono font-semibold uppercase tracking-[0.4em] text-primary-400"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {eyebrow}
    </motion.span>
    <motion.h2
      className="text-4xl font-bold leading-tight text-white md:text-5xl font-display"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.05 }}
      viewport={{ once: true }}
    >
      {title}
    </motion.h2>
    {description && (
      <motion.p
        className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        viewport={{ once: true }}
      >
        {description}
      </motion.p>
    )}
  </div>
);

