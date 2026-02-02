import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, MessageCircle, Zap } from 'lucide-react';

const ChatbotWidget: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.button
        type="button"
        className="interactive fixed bottom-8 left-8 z-40 flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-500 via-secondary-500 to-cyan-400 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/40 transition hover:-translate-y-1"
        whileTap={{ scale: 0.94 }}
        onClick={() => setOpen((prev) => !prev)}
      >
        <Bot size={18} />
        AI Assistant
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed bottom-24 left-8 z-40 w-80 rounded-3xl border border-white/10 bg-white/90 p-6 text-sm text-slate-600 shadow-2xl shadow-primary-500/30 backdrop-blur dark:bg-slate-900/90 dark:text-slate-200"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div className="flex items-center gap-2 text-slate-900 dark:text-white">
              <MessageCircle size={18} className="text-primary-500" />
              <p className="font-semibold">AI Copilot (coming soon)</p>
            </div>
            <p className="mt-3 text-xs">
              Imagine an AI concierge that understands your project goals, curates relevant case studies, and schedules time
              with me instantly. I&apos;m building this next — stay tuned!
            </p>
            <div className="mt-4 flex items-center gap-2 rounded-2xl bg-primary-500/10 px-3 py-2 text-xs font-medium text-primary-600 dark:bg-primary-400/10 dark:text-primary-200">
              <Zap size={16} />
              Prototype in progress
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotWidget;

