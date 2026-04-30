import { useEffect, useRef, useState } from 'react';

interface SkillBarProps {
  name: string;
  level: number;
}

export default function SkillBar({ name, level }: SkillBarProps) {
  const [animated, setAnimated] = useState(false);
  const [count, setCount] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Use IntersectionObserver to trigger animation when visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated) {
          setAnimated(true);
          // Animate counter
          let frame = 0;
          const totalFrames = 40;
          const interval = setInterval(() => {
            frame++;
            const ease = 1 - Math.pow(1 - frame / totalFrames, 3);
            setCount(Math.round(ease * level));
            if (frame >= totalFrames) clearInterval(interval);
          }, 25);
        }
      },
      { threshold: 0.3 }
    );

    if (barRef.current) observer.observe(barRef.current);
    return () => observer.disconnect();
  }, [level, animated]);

  const getColor = (lvl: number) => {
    if (lvl >= 90) return 'from-[#9D4EDD] to-[#3A86FF]';
    if (lvl >= 80) return 'from-[#3A86FF] to-[#00D9FF]';
    return 'from-[#00D9FF] to-emerald-400';
  };

  return (
    <div ref={barRef} className="mb-3">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-white/70 text-sm font-medium">{name}</span>
        <span className="text-white/30 font-mono text-xs">{count}%</span>
      </div>
      <div className="h-1.5 w-full bg-white/[0.03] rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full bg-gradient-to-r ${getColor(level)} transition-all duration-1000 ease-out`}
          style={{ width: animated ? `${level}%` : '0%' }}
        />
      </div>
    </div>
  );
}
