export const SITE = {
  name: 'Arsovo',
  title: 'Arsovo — Hands-on AI Coding Tools Playbook',
  description:
    'In-depth reviews, comparisons, and practical configurations for AI coding tools like Cursor, Claude Code, GitHub Copilot, and more — from a developer who actually uses them daily.',
  url: 'https://arsovo.com',
  author: 'Arsovo',
  twitter: '@arsovo',
  locale: 'en',
} as const;

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/blog/', label: 'Blog' },
  { href: '/tags/', label: 'Tags' },
  { href: '/about/', label: 'About' },
  { href: '/contact/', label: 'Contact' },
] as const;
