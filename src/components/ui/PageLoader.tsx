import { motion } from 'framer-motion';

const dotTransition = {
  repeat: Infinity,
  repeatType: 'mirror' as const,
  duration: 0.8,
};

const PageLoader: React.FC = () => (
  <div className="flex min-h-[320px] items-center justify-center">
    <div className="flex items-center gap-2">
      {[0, 1, 2].map((index) => (
        <motion.span
          key={index}
          className="h-3 w-3 rounded-full bg-gradient-to-r from-primary-500 via-secondary-500 to-cyan-400"
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ ...dotTransition, delay: index * 0.16 }}
        />
      ))}
    </div>
  </div>
);

export default PageLoader;

