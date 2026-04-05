import type { Resume } from '@vitaeflow/sdk';

export const sampleResume: Resume = {
  version: '0.1',
  profile: 'standard',
  lang: 'en',
  basics: {
    givenName: 'Marie',
    familyName: 'Laurent',
    headline: 'Full Stack Developer',
    email: 'marie.laurent@example.com',
    phone: '+33612345678',
    url: 'https://marielaurent.dev',
    summary: 'Passionate developer with 5+ years of experience building web applications.',
    location: {
      city: 'Lyon',
      region: 'Auvergne-Rhone-Alpes',
      countryCode: 'FR',
    },
  },
  work: [
    {
      organization: 'TechCorp',
      position: 'Senior Developer',
      startDate: '2021-03',
      type: 'employment',
      remote: 'hybrid',
      summary: 'Leading a cross-functional team building internal tools.',
      highlights: ['Led migration to TypeScript', 'Reduced build times by 40%'],
    },
    {
      organization: 'StartupIO',
      position: 'Frontend Developer',
      startDate: '2018-09',
      endDate: '2021-02',
      type: 'employment',
      remote: 'onsite',
    },
  ],
  education: [
    {
      institution: 'INSA Lyon',
      area: 'Computer Science',
      studyType: 'Master',
      startDate: '2013-09',
      endDate: '2018-06',
      score: 'Mention Bien',
    },
  ],
  skills: [
    {
      category: 'Languages',
      items: [
        { name: 'TypeScript', level: 'expert' },
        { name: 'Python', level: 'advanced' },
        { name: 'Go', level: 'intermediate' },
      ],
    },
    {
      category: 'Frameworks',
      items: [
        { name: 'React', level: 'expert' },
        { name: 'Astro', level: 'advanced' },
      ],
    },
  ],
  languages: [
    { language: 'French', fluency: 'native', code: 'fr' },
    { language: 'English', fluency: 'C1', code: 'en' },
  ],
};
