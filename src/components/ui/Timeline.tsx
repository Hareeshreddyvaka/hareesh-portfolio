import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Rocket } from 'lucide-react';
import clsx from 'clsx';
import { TimelineItem } from '../../data/timeline';

type TimelineProps = {
  items: TimelineItem[];
};

const iconMap: Record<TimelineItem['type'], JSX.Element> = {
  education: <GraduationCap size={18} />,
  experience: <Briefcase size={18} />,
  project: <Rocket size={18} />,
};

export const Timeline: React.FC<TimelineProps> = ({ items }) => (
  <div className="relative mx-auto max-w-4xl">
    <div className="absolute left-5 top-0 hidden h-full w-px bg-gradient-to-b from-primary-500/20 via-primary-500/40 to-primary-500/20 md:block" />
    <div className="flex flex-col gap-10">
      {items.map((item, index) => (
        <motion.div
          key={`${item.organisation}-${item.period}`}
          className="relative flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/70 p-6 shadow-xl shadow-primary-500/10 backdrop-blur dark:bg-slate-900/60 md:ml-12"
          data-aos="fade-up"
          data-aos-delay={index * 100}
        >
          <div className="absolute -left-12 top-6 hidden h-6 w-6 rounded-full bg-gradient-to-r from-primary-500 via-secondary-500 to-cyan-400 md:flex md:items-center md:justify-center">
            <span className="h-2 w-2 rounded-full bg-white" />
          </div>
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-primary-500/80 dark:text-primary-300/70">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-500/10 text-primary-500 dark:bg-primary-400/10 dark:text-primary-300">
                {iconMap[item.type]}
              </span>
              {item.title}
            </div>
            <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {item.period}
            </span>
          </div>
          <div>
            <p className="text-lg font-semibold text-slate-900 dark:text-white">{item.organisation}</p>
            <p className="text-sm text-slate-500 dark:text-slate-300">{item.location}</p>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
          <ul className="flex list-disc flex-col gap-2 pl-5 text-sm text-slate-600 dark:text-slate-300">
            {item.achievements.map((achievement) => (
              <li key={achievement} className="marker:text-primary-500 dark:marker:text-primary-300">
                {achievement}
              </li>
            ))}
          </ul>
          <div
            className={clsx('absolute left-3 top-0 hidden h-full w-2 rounded-full md:block', {
              'bg-gradient-to-b from-primary-500/70 via-primary-500/40 to-transparent': index === 0,
              'bg-gradient-to-b from-transparent via-primary-500/40 to-transparent': index !== 0,
            })}
          />
        </motion.div>
      ))}
    </div>
  </div>
);

