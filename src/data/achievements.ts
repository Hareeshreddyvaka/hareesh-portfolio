import certificateImg from '../assets/ibm-genai-cert.png';

export type Achievement = {
  title: string;
  issuer: string;
  year: string;
  thumbnail: string;
  description: string;
  details: string[];
};

export const achievements: Achievement[] = [
  {
    title: 'Gen AI Using IBM Watsonx',
    issuer: 'IBM',
    year: '2025',
    thumbnail: certificateImg,
    description: 'Mastered the fundamentals of Generative AI and IBM Watsonx platform for building enterprise-grade AI applications.',
    details: [
      'Generative AI Models',
      'Prompt Engineering',
      'IBM Watsonx Platform'
    ],
  },
];


