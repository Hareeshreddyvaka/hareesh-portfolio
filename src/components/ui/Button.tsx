import React from 'react';
import { colors } from '../../config/colorConfig';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  let baseClasses = 'px-6 py-3 rounded-full font-medium transition-all duration-300 ease-out flex items-center justify-center ';
  
  if (variant === 'primary') {
    baseClasses += `bg-[${colors.accent2}] hover:bg-[${colors.accent1}] text-white shadow-lg hover:shadow-[0_0_15px_rgba(157,78,221,0.5)] transform hover:-translate-y-1`;
  } else if (variant === 'outline') {
    baseClasses += `border-2 border-[${colors.textSecondary}] text-[${colors.textPrimary}] hover:border-[${colors.accent3}] hover:text-[${colors.accent3}] bg-transparent`;
  } else {
    // secondary
    baseClasses += `bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm`;
  }

  return (
    <button className={`${baseClasses} ${className}`} {...props}>
      {children}
    </button>
  );
}
