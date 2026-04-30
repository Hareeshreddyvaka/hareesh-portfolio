import React from 'react';
import { colors } from '../../config/colorConfig';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent';
  className?: string;
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const isAccent = variant === 'accent';
  
  return (
    <span 
      className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide backdrop-blur-md border ${
        isAccent 
          ? `bg-[${colors.accent3}]/20 text-[${colors.accent3}] border-[${colors.accent3}]/50` 
          : 'bg-white/5 text-gray-300 border-white/10'
      } ${className}`}
    >
      {children}
    </span>
  );
}
