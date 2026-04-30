import { usePortfolioData } from '../../hooks/usePortfolioData';

export default function Footer() {
  const { data } = usePortfolioData();
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#0a0d10] py-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="text-gray-500 text-sm font-inter">
          &copy; {year} {data?.personal.name}. All rights reserved.
        </div>

        <div className="text-sm font-inter text-gray-600">
          Built with <span className="text-[#3A86FF]">Three.js</span> + <span className="text-[#00D9FF]">React</span> + <span className="text-[#9D4EDD]">GSAP</span>
        </div>

        {data?.personal.social && (
          <div className="flex gap-4 items-center">
            {data.personal.social.github && (
              <a href={data.personal.social.github} className="text-gray-500 hover:text-white transition-colors text-sm">
                GitHub
              </a>
            )}
            {data.personal.social.linkedin && (
              <a href={data.personal.social.linkedin} className="text-gray-500 hover:text-white transition-colors text-sm">
                LinkedIn
              </a>
            )}
          </div>
        )}
      </div>
    </footer>
  );
}
