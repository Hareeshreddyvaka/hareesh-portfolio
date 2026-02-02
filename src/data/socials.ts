export type SocialLink = {
  name: 'GitHub' | 'LinkedIn' | 'Email' | 'Twitter';
  url: string;
  handle: string;
};

export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/Hareeshreddyvaka',
    handle: '@Hareeshreddyvaka',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/hareesh-reddy-vaka',
    handle: 'linkedin.com/in/hareesh-reddy-vaka',
  },
  {
    name: 'Email',
    url: 'mailto:vakahareesh.reddy2023@vitstudent.ac.in',
    handle: 'vakahareesh.reddy2023@vitstudent.ac.in',
  },
  {
    name: 'Twitter',
    url: 'https://x.com/HareeshVaka',
    handle: '@HareeshVaka',
  },
];

