import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import clsx from 'clsx';
import { Achievement } from '../../data/achievements';

type AchievementCardProps = {
  achievement: Achievement;
  index: number;
};

export const AchievementCard: React.FC<AchievementCardProps> = ({ achievement, index }) => (
  <motion.div
    className="group perspective"
    data-aos="zoom-in-up"
    data-aos-delay={index * 120}
  >
    <div className="relative h-full w-full rounded-3xl border border-white/10 bg-transparent transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
      <div className="absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-4 rounded-3xl bg-white/80 p-6 text-center shadow-xl shadow-primary-500/10 backdrop-blur dark:bg-slate-900/70 [backface-visibility:hidden]">
        <img src={achievement.thumbnail} alt={achievement.title} className="h-20 w-20 rounded-2xl object-cover shadow-md" />
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-500/80 dark:text-primary-300/80">
            {achievement.year}
          </p>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{achievement.title}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-300">{achievement.issuer}</p>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300">{achievement.description}</p>
        <span className="rounded-full bg-primary-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-500 dark:bg-primary-400/10 dark:text-primary-200">
          Credential Highlight
        </span>
      </div>
      <div className="absolute inset-0 flex h-full w-full flex-col gap-3 rounded-3xl bg-gradient-to-br from-primary-500/90 via-secondary-500/80 to-cyan-400/80 p-6 text-left text-white shadow-xl shadow-primary-500/40 backdrop-blur [backface-visibility:hidden] [transform:rotateY(180deg)]">
        <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em]">
          <Award size={16} />
          Impact
        </div>
        <ul className="space-y-2 text-sm">
          {achievement.details.map((detail) => (
            <li
              key={detail}
              className={clsx(
                'rounded-2xl bg-white/10 px-4 py-2 text-white/90 shadow-sm shadow-black/10 backdrop-blur',
              )}
            >
              {detail}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </motion.div>
);

