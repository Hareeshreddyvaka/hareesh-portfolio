export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  email: string;
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export interface Education {
  school: string;
  degree: string;
  specialization?: string;
  startYear: number;
  endYear: number;
  cgpa?: number;
  credits?: number;
  semester?: string;
}

export type ProjectDetails = { [key: string]: JsonValue };

export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  image?: string;
  tags: string[];
  technologies: string[];
  liveLink?: string;
  githubLink?: string;
  featured: boolean;
  details?: ProjectDetails;
}

export interface Skill {
  name: string;
  level: number; // 0-100
}

export interface SkillCategory {
  category: string;
  items: Skill[];
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  certificateImage: string;
  credentialUrl?: string;
  description?: string;
}

export interface PortfolioData {
  personal: PersonalInfo;
  education: Education;
  projects: Project[];
  skills: SkillCategory[];
  certifications: Certificate[];
}
