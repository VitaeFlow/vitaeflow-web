export interface ProblemCard {
  icon: 'pdf' | 'json' | 'split';
  title: string;
  description: string;
}

export interface AudienceCard {
  tag: string;
  title: string;
  description: string;
}

export interface EcosystemItem {
  name: string;
  description: string;
  href: string;
  icon: 'spec' | 'sdk' | 'cli' | 'tools';
}

export const problemCards: ProblemCard[] = [
  {
    icon: 'pdf',
    title: 'PDFs are black boxes',
    description:
      'Recruiters love them, but software can only guess at the structure. Parsing a PDF is fragile, lossy, and never fully accurate.',
  },
  {
    icon: 'json',
    title: 'Structured formats go nowhere',
    description:
      'JSON Resume and similar standards exist, but nobody sends a .json to a hiring manager. They lack design and personality.',
  },
  {
    icon: 'split',
    title: 'Keeping two files in sync fails',
    description:
      'A polished PDF for humans and a separate data file for machines. They drift apart, and one source of truth beats two.',
  },
];

export const audienceCards: AudienceCard[] = [
  {
    tag: 'Candidates',
    title: 'Send one polished file',
    description:
      'Your resume stays beautiful for hiring managers. Structured data travels invisibly inside the same PDF — no extra work required.',
  },
  {
    tag: 'Developers',
    title: 'Build on a stable contract',
    description:
      'A typed JSON schema, a JavaScript SDK, and a CLI. Integrate resume parsing into your product with a few lines of code.',
  },
  {
    tag: 'Recruiters & ATS',
    title: 'Get reliable data, not guesses',
    description:
      'Instead of fragile text extraction, read typed fields directly from the file. Name, experience, skills — structured and consistent.',
  },
];

export const ecosystemItems: EcosystemItem[] = [
  {
    name: 'VitaeFlow Spec',
    description: 'The JSON schema that defines the resume format.',
    href: 'https://github.com/VitaeFlow/vitaeflow-spec',
    icon: 'spec',
  },
  {
    name: 'JavaScript SDK',
    description: 'Validate, embed, and extract in any JS/TS project.',
    href: 'https://github.com/VitaeFlow/vitaeflow-js',
    icon: 'sdk',
  },
  {
    name: 'CLI',
    description: 'Create and inspect VitaeFlow files from the terminal.',
    href: 'https://github.com/VitaeFlow/vitaeflow-cli',
    icon: 'cli',
  },
  {
    name: 'Online Tools',
    description: 'Enrich, inspect, and validate — right in your browser.',
    href: '/tools/',
    icon: 'tools',
  },
];
