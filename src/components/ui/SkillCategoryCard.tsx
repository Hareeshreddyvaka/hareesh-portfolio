import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { SkillCategory } from '../../data/skills';

type SkillCategoryCardProps = {
  category: SkillCategory;
};



export const SkillCategoryCard: React.FC<SkillCategoryCardProps> = ({ category }) => (
  <motion.div
    className="glass-card group relative flex flex-col gap-6 p-8 hover:border-primary-500/30 transition-all duration-500"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -5 }}
    transition={{ duration: 0.4 }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

    <div className="relative z-10 flex items-center justify-between gap-4">
      <div>
        <p className="text-xs font-mono font-semibold uppercase tracking-wider text-primary-400">
          {category.icon}
        </p>
        <h3 className="mt-2 text-2xl font-bold text-white font-display">{category.title}</h3>
      </div>
      <span className="rounded-full bg-primary-500/10 p-3 text-primary-400 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110 group-hover:bg-primary-500/20">
        <Sparkles size={20} />
      </span>
    </div>

    <p className="relative z-10 text-sm text-slate-400 leading-relaxed">{category.description}</p>

    <div className="relative z-10 flex flex-col gap-4">
      {category.items.map((item, idx) => (
        <div key={item.name} className="group/item flex flex-col gap-2 rounded-xl bg-white/5 p-4 hover:bg-white/10 transition-colors border border-white/5 hover:border-white/10">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <span className="text-base font-semibold text-slate-200 group-hover/item:text-white transition-colors">{item.name}</span>
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-mono font-medium text-slate-400 border border-white/5">
                {item.level}
              </span>
            </div>
            <span className="font-mono text-xs text-primary-400">{item.confidence}%</span>
          </div>

          {item.blurb && <p className="text-xs text-slate-500">{item.blurb}</p>}

          <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-dark border border-white/5">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
              initial={{ width: 0 }}
              whileInView={{ width: `${item.confidence}%` }}
              transition={{ duration: 1, delay: 0.2 + idx * 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
            />
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

