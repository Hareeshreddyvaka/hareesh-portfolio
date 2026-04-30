import React from 'react';
import { ProgressBar } from './ProgressBar';

interface Skill {
  name: string;
  level: number;
}

interface SkillCategoryProps {
  category: string;
  skills: Skill[];
}

export function SkillCategory({ category, skills }: SkillCategoryProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
      <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
        <span className="w-2 h-6 bg-[#00D9FF] rounded-full mr-3"></span>
        {category}
      </h3>
      <div className="space-y-2">
        {skills.map((skill, idx) => (
          <ProgressBar key={idx} label={skill.name} percentage={skill.level} />
        ))}
      </div>
    </div>
  );
}
