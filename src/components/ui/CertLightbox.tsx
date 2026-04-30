import React, { useEffect } from 'react';
import type { Certificate } from '../../types/portfolio';
import { X, ExternalLink } from 'lucide-react';
import { useFocusTrap } from '../../hooks/useFocusTrap';

interface CertLightboxProps {
  cert: Certificate;
  onClose: () => void;
}

export default function CertLightbox({ cert, onClose }: CertLightboxProps) {
  const trapRef = useFocusTrap(true);
  const titleId = 'cert-lightbox-title';

  // Lock body scroll when open + ESC to close
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose}
      aria-hidden="true"
    >
      {/* Close button outside the dialog for quick access */}
      <button
        className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10"
        onClick={onClose}
        aria-label="Close certificate"
      >
        <X size={24} aria-hidden="true" />
      </button>

      <div
        ref={trapRef as React.RefObject<HTMLDivElement>}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative max-w-5xl w-full max-h-full bg-[#1A1F26] rounded-2xl border border-white/10 overflow-hidden flex flex-col md:flex-row shadow-2xl animate-in zoom-in-95 duration-400"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Certificate Image - Left/Top */}
        <div className="flex-1 bg-black p-4 flex items-center justify-center min-h-[300px]">
          <img
            src={cert.certificateImage}
            alt={`${cert.title} certificate`}
            className="max-w-full max-h-[70vh] object-contain rounded-lg"
          />
        </div>

        {/* Certificate Details - Right/Bottom */}
        <div className="w-full md:w-96 p-6 md:p-8 flex flex-col border-t md:border-t-0 md:border-l border-white/10 bg-gradient-to-b from-[#1A1F26] to-[#0F1419]">
          <div className="mb-8">
            <h2 id={titleId} className="text-2xl font-bold text-white mb-2 font-outfit">{cert.title}</h2>
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-[#9D4EDD]/20 text-[#9D4EDD] text-sm font-medium rounded-full">
                {cert.issuer}
              </span>
              <span className="text-gray-400 text-sm">{cert.date}</span>
            </div>

            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Description</h3>
            <p className="text-gray-300 leading-relaxed">
              {cert.description || 'Verified credential demonstrating completion of all required materials and practical assessments.'}
            </p>
          </div>

          <div className="mt-auto pt-6 border-t border-white/5 space-y-4">
            {cert.credentialUrl && cert.credentialUrl !== '#' && (
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-[#3A86FF] hover:bg-[#2a6fd9] text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <span>View Official Credential</span>
                <ExternalLink size={18} aria-hidden="true" />
              </a>
            )}

            <button
              onClick={onClose}
              className="w-full py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium transition-colors"
            >
              Close Window
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
