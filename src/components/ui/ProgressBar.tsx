import React, { useEffect, useState, useRef } from 'react';
import { gradients } from '../../config/colorConfig';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface ProgressBarProps {
  label: string;
  percentage: number;
}

export function ProgressBar({ label, percentage }: ProgressBarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(containerRef, { threshold: 0.5 }, true);
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    
    // Animate counter and bar width after becoming visible
    const duration = 1500; // 1.5s
    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // ease-out-quad
      const easeProgress = progress * (2 - progress);
      
      setCurrentValue(Math.floor(easeProgress * percentage));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isVisible, percentage]);

  return (
    <div className="w-full mb-6" ref={containerRef}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-gray-200">{label}</span>
        <span className="text-xs text-gray-400 font-mono">{currentValue}%</span>
      </div>
      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full transition-all duration-[1.5s] ease-out"
          style={{ 
            width: `${isVisible ? percentage : 0}%`,
            background: gradients.skillBar
          }}
        />
      </div>
    </div>
  );
}
