import React from 'react';
import { gradients } from '../../config/colorConfig';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
}

export function Card({ children, className = '', onClick, hoverEffect = true }: CardProps) {
  return (
    <div 
      onClick={onClick}
      className={`relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-300 ${
        hoverEffect ? 'hover:scale-[1.02] hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(0,0,0,0.5)] cursor-pointer group' : ''
      } ${className}`}
    >
      {/* Subtle hover gradient overlay */}
      {hoverEffect && (
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
          style={{ background: gradients.cardHover }}
        />
      )}
      
      {/* Content */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
}
