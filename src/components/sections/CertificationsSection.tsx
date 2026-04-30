import { useState } from 'react';
import { usePortfolioData } from '../../hooks/usePortfolioData';
import CertCard from '../ui/CertCard';
import CertLightbox from '../ui/CertLightbox';
import type { Certificate } from '../../types/portfolio';

export default function CertificationsSection() {
  const { data, isLoading } = usePortfolioData();
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  if (isLoading || !data) return null;

  return (
    <>
      <section 
        id="certifications-section"
        className="relative w-full min-h-[100vh] py-32 pointer-events-auto bg-gradient-to-t from-black via-[#0F1419] to-[#0F1419] flex flex-col justify-center"
      >
        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
          <div className="mb-20 text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-outfit">
              Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9D4EDD] via-[#3A86FF] to-[#00D9FF]">Certifications</span>
            </h2>
            <p className="text-xl text-gray-400 font-inter max-w-2xl mx-auto">
              Verified credentials demonstrating continuous learning in AI architectures and full-stack ecosystems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {data.certifications.map((cert) => (
              <CertCard 
                key={cert.id} 
                cert={cert} 
                onOpenLightbox={() => setSelectedCert(cert)} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Put lightbox outside section flow so it maps over full view */}
      {selectedCert && (
        <CertLightbox cert={selectedCert} onClose={() => setSelectedCert(null)} />
      )}
    </>
  );
}
