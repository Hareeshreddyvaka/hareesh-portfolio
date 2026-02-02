export type SkillCategory = {
  title: string;
  description: string;
  icon: string;
  items: {
    name: string;
    level: 'Advanced' | 'Intermediate' | 'Learning';
    confidence: number;
    blurb?: string;
  }[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: 'Languages',
    description: 'Crafting production-grade solutions across compiled and interpreted ecosystems.',
    icon: 'Languages',
    items: [
      { name: 'Python', level: 'Advanced', confidence: 92, blurb: 'AI pipelines, data wrangling, automation.' },
      { name: 'C++', level: 'Advanced', confidence: 86, blurb: 'High-performance algorithms and DS implementations.' },
      { name: 'Java', level: 'Intermediate', confidence: 78, blurb: 'Enterprise APIs and solid OOP fundamentals.' },
      { name: 'JavaScript', level: 'Advanced', confidence: 88, blurb: 'Full-stack web applications with modern tooling.' },
      { name: 'C', level: 'Intermediate', confidence: 74, blurb: 'Systems programming and embedded coursework.' },
    ],
  },
  {
    title: 'Frameworks',
    description: 'Scaling frontend and backend systems, from UI to ML workloads.',
    icon: 'Frameworks',
    items: [
      { name: 'React', level: 'Advanced', confidence: 90, blurb: 'Interactive, accessible SPAs with Vite and Tailwind.' },
      { name: 'Node.js', level: 'Advanced', confidence: 84, blurb: 'Serverless APIs, orchestration, and microservices.' },
      { name: 'Express', level: 'Advanced', confidence: 82, blurb: 'RESTful APIs with robust validation and auth.' },
      { name: 'TensorFlow', level: 'Intermediate', confidence: 76, blurb: 'Model training, evaluation, and deployment pipelines.' },
    ],
  },
  {
    title: 'Tools',
    description: 'Reliable tooling for collaboration, experimentation, and shipping quickly.',
    icon: 'Tools',
    items: [
      { name: 'Git & GitHub', level: 'Advanced', confidence: 93, blurb: 'Team workflows, PR automation, release strategies.' },
      { name: 'VS Code', level: 'Advanced', confidence: 88, blurb: 'Customized environment for rapid iteration.' },
      { name: 'IBM watsonx.ai', level: 'Intermediate', confidence: 80, blurb: 'Enterprise AI experimentation and deployment.' },
      { name: 'Vite', level: 'Advanced', confidence: 85, blurb: 'Lightning-fast dev experiences and optimized bundles.' },
      { name: 'Linux', level: 'Advanced', confidence: 87, blurb: 'Daily driver for development and deployment.' },
    ],
  },
];

