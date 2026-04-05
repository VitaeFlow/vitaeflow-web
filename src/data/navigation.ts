export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
  cta?: boolean;
}

export const primaryNav: NavLink[] = [
  { label: 'Tools', href: '/tools/' },
  { label: 'GitHub', href: 'https://github.com/VitaeFlow', external: true },
  { label: 'Getting Started', href: '/docs/', cta: true },
];
