import { useState } from 'react';
import type { Certificate } from '../../types/portfolio';
import { ExternalLink, Maximize2 } from 'lucide-react';

interface CertCardProps {
  cert: Certificate;
  onOpenLightbox: () => void;
}

export default function CertCard({ cert, onOpenLightbox }: CertCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="cert-card relative w-full aspect-[4/3] perspective-1000 group cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={onOpenLightbox}
    >
      <div 
        className="w-full h-full relative transition-transform duration-700 preserve-3d"
        style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        {/* FRONT */}
        <div className="absolute inset-0 backface-hidden bg-[#1A1F26] rounded-2xl border border-white/10 overflow-hidden shadow-[0_0_20px_rgba(157,78,221,0.2)] group-hover:shadow-[0_0_30px_rgba(157,78,221,0.4)] transition-shadow">
          <img 
            src={cert.certificateImage} 
            alt={cert.title}
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1419]/80 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
            <h4 className="text-white font-outfit font-semibold text-lg">{cert.title}</h4>
            <Maximize2 size={20} className="text-white/50 group-hover:text-white transition-colors" />
          </div>
        </div>

        {/* BACK */}
        <div 
          className="absolute inset-0 backface-hidden bg-gradient-to-br from-[#1A1F26] to-[#0F1419] rounded-2xl border border-[#9D4EDD]/30 p-6 flex flex-col justify-center items-center text-center shadow-[0_0_40px_rgba(157,78,221,0.15)]"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="w-12 h-12 rounded-full bg-[#9D4EDD]/20 flex items-center justify-center mb-4 border border-[#9D4EDD]/50">
            <span className="text-xl font-bold text-[#9D4EDD]">
              {cert.issuer.charAt(0)}
            </span>
          </div>
          
          <h3 className="text-xl font-bold text-white mb-2">{cert.title}</h3>
          <p className="text-[#3A86FF] font-medium mb-1">{cert.issuer}</p>
          <p className="text-gray-400 text-sm mb-4">{cert.date}</p>
          
          <p className="text-gray-300 text-sm mb-6 line-clamp-3">
            {cert.description}
          </p>

          {cert.credentialUrl && cert.credentialUrl !== '#' && (
            <a 
              href={cert.credentialUrl}
              target="_blank"
              onClick={(e) => e.stopPropagation()} // don't open lightbox
              rel="noopener noreferrer"
              className="mt-auto px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full flex items-center gap-2 text-sm text-white transition-all hover:scale-105"
            >
              <span>Verify Credential</span>
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>
      
      {/* Required CSS for 3D flip (can be in global css, injected here for portability) */}
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
      `}</style>
    </div>
  );
}
