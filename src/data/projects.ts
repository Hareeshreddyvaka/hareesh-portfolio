import feedbackAnalyzer from '../assets/projects/feedback-analyzer.svg';
import bloodPortal from '../assets/projects/blood-portal.svg';
import faceShape from '../assets/projects/face-shape.svg';


export type ProjectLink = {
  label: 'View Live' | 'View Code';
  url: string;
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  links: ProjectLink[];
  impact: string;
};

export const projects: Project[] = [
  {
    slug: 'feedback-analyzer',
    title: 'Car Rental Customer Feedback Analyzer',
    description:
      'Leveraged IBM watsonx.ai to ingest unstructured customer feedback and transform it into actionable sentiment dashboards for operations teams.',
    image: feedbackAnalyzer,
    tags: ['AI', 'IBM watsonx.ai', 'Data Visualization', 'Automation'],
    impact: 'Reduced manual review time by 68% and uncovered critical service gaps within the first week of deployment.',
    links: [
      { label: 'View Live', url: 'https://watsonx.ibm.com/feedback-analyzer-demo' },
      { label: 'View Code', url: 'https://github.com/hareesh-vaka/feedback-analyzer' },
    ],
  },
  {
    slug: 'blood-donor-portal',
    title: 'Online Blood Donor & Emergency Request Portal',
    description:
      'End-to-end MERN stack platform connecting donors, hospitals, and ambulance services with live geolocation and SOS routing.',
    image: bloodPortal,
    tags: ['React', 'Node.js', 'Express', 'MongoDB'],
    impact: 'Onboarded 500+ donors during pilot run and enabled sub-5 minute matching for 87% of emergency requests.',
    links: [
      { label: 'View Live', url: 'https://hareesh.dev/blood-donor-portal' },
      { label: 'View Code', url: 'https://github.com/hareesh-vaka/blood-donor-portal' },
    ],
  },
  {
    slug: 'face-shape-hairstyle-recommendation',
    title: 'Face Shape Classification & Hairstyle Recommender',
    description:
      'Developed a deep learning system that classifies face shapes from images and provides personalized hairstyle recommendations using ResNet-based transfer learning.',
    image: faceShape,
    tags: ['Deep Learning', 'PyTorch', 'ResNet', 'OpenCV', 'Python'],
    impact: 'Engineered a ResNet-based classifier that outperforms baseline CNNs, delivering accurate face shape predictions and personalized hairstyle mapping for enhanced user profiling.',
    links: [
      { label: 'View Code', url: 'https://github.com/hareeshreddyvaka/Face-Shape-Hairstyle-Recommendation' },
    ],
  },

];

