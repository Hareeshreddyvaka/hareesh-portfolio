export type TimelineItem = {
  title: string;
  organisation: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  type: 'education' | 'experience' | 'project';
};

export const timeline: TimelineItem[] = [
  {
    title: 'B.Tech Computer Science Engineering (AI & ML)',
    organisation: 'Vellore Institute of Technology, Chennai',
    location: 'Chennai, India',
    period: '2023 — 2027',
    description:
      'Specialized in machine learning, deep learning, and intelligent systems with a focus on production-ready AI solutions.',
    achievements: [
      
    ],
    type: 'education',
  },
  {
    title: 'Class 12 (Intermediate)',
    organisation: 'Narayana Junior College',
    location: 'Ongole, Andhra Pradesh',
    period: '2021 — 2023',
    description: 'Completed with 97.5% aggregate.',
    achievements: [],
    type: 'education',
  },
  {
    title: 'Class 10 (SSC)',
    organisation: 'Sri Surya Vidyaniketan',
    location: 'Ongole, Prakasam District',
    period: 'Completed 2021',
    description: 'Achieved 100% percentage.',
    achievements: [],
    type: 'education',
  },
  
];

