export const scrollZones = {
  hero: { start: 0, end: 0.25 },
  projects: { start: 0.25, end: 0.50 },
  skills: { start: 0.50, end: 0.75 },
  certifications: { start: 0.75, end: 1.0 },
};

export type SectionName = keyof typeof scrollZones;
