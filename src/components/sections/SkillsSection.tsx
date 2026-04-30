import { usePortfolioData } from '../../hooks/usePortfolioData';
import SkillBar from '../ui/SkillBar';

export default function SkillsSection() {
  const { data, isLoading } = usePortfolioData();

  if (isLoading || !data) return null;

  return (
    <section 
      id="skills-section"
      className="relative w-full min-h-[100vh] py-32 pointer-events-auto bg-[#0F1419] flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="mb-20 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-outfit">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3A86FF] to-[#00D9FF]">Proficiency</span>
          </h2>
          <p className="text-xl text-gray-400 font-inter max-w-2xl mx-auto">
            Tools and technologies I use to build robust machine learning pipelines and the applications that serve them.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {data.skills.map((category) => (
            <div key={category.category} className="flex flex-col">
              <h3 className="text-xl font-bold text-white mb-6 font-outfit pb-4 border-b border-white/10 uppercase tracking-widest text-[#00D9FF]">
                {category.category}
              </h3>
              <div className="flex flex-col gap-2">
                {category.items.map((skill) => (
                  <SkillBar key={skill.name} name={skill.name} level={skill.level} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
