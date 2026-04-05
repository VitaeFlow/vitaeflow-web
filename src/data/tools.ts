export interface ToolStep {
  n: string;
  title: string;
  desc: string;
}

export interface ToolCard {
  name: string;
  description: string;
  href: string;
  icon: string;
  featured?: boolean;
}

export interface DevToolCard {
  name: string;
  description: string;
  href: string;
  badge: string;
}

export const toolSteps: ToolStep[] = [
  { n: '1', title: 'Enrich your PDF', desc: 'Upload your existing resume PDF and fill in structured data through a guided form. Download a .vf.pdf file.' },
  { n: '2', title: 'Inspect the result', desc: 'Drop the enriched PDF to verify the embedded data was written correctly. See profile, sections, and metadata at a glance.' },
  { n: '3', title: 'Validate the JSON', desc: 'Paste or edit the raw JSON to check it against the VitaeFlow schema. Catch errors before sharing your resume.' },
];

export const toolCards: ToolCard[] = [
  {
    name: 'Enrich',
    description: 'Upload a plain PDF, fill in your resume data through a guided form, and download an enriched <code class="rounded bg-ink/6 px-1.5 py-0.5 text-xs">.vf.pdf</code> file.',
    href: '/tools/enrich/',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>`,
    featured: true,
  },
  {
    name: 'Inspect',
    description: 'Drop a PDF to detect whether it contains VitaeFlow data. See the profile, sections, and raw JSON.',
    href: '/tools/inspect/',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  },
  {
    name: 'Validate',
    description: 'Paste or edit VitaeFlow JSON and validate it against the schema in real time. Strict or tolerant mode.',
    href: '/tools/validate/',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  },
];

export const devToolCards: DevToolCard[] = [
  {
    name: 'VitaeFlow CLI',
    description: 'Create, validate, embed, and extract VitaeFlow resumes from the terminal.',
    href: 'https://github.com/VitaeFlow/vitaeflow-cli',
    badge: '$_',
  },
  {
    name: 'JavaScript SDK',
    description: 'Validate, embed, and extract VitaeFlow data in any JavaScript or TypeScript project.',
    href: 'https://github.com/VitaeFlow/vitaeflow-js',
    badge: 'JS',
  },
];
