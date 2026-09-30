// Central place for branding, links, navigation and categories.
// `id` must match the folder name inside /content.
export const siteConfig = {
  name: 'AlgoForge',
  logo: '/logo-mark.png', // file in frontend/public — replace to change the header/footer logo
  tagline: 'Build. Solve. Engineer.',
  description:
    'Master Data Structures & Algorithms, System Design, Artificial Intelligence, and Software Engineering through interactive, practical, and deep-dive technical explanations.',
  heroTag: 'SYSTEM_READY :: ACADEMY_SESSION_2026',

  youtube: 'https://youtube.com', // TODO: your channel URL
  github: 'https://github.com', // TODO: your GitHub URL
  newsletterUrl: '', // TODO: form-action URL from Buttondown / ConvertKit / Mailchimp etc. Empty = not connected yet.

  // Extra hero metrics. Leave empty until you have real numbers, e.g. { value: '12k', label: 'SUBSCRIBERS' }.
  // An automatic ARTICLES count (from /content) is always shown.
  metrics: [],

  navigation: [
    { label: '/learn', to: '/#explore' },
    { label: '/dsa', to: '/dsa' },
    { label: '/system-design', to: '/system-design' },
    { label: '/ai', to: '/ai' },
    { label: '/blog', to: '/blog' },
  ],

  categories: [
    {
      id: 'dsa', path: '/dsa', track: 'TRACK_01', icon: 'tree',
      title: 'DSA', filterLabel: 'DSA', cardLabel: 'DATA STRUCTURES',
      description: 'Algorithms, data structures & interview problems analyzed step-by-step with complexity bounds.',
    },
    {
      id: 'system-design', path: '/system-design', track: 'TRACK_02', icon: 'nodes',
      title: 'System Design', filterLabel: 'SYSTEM DESIGN', cardLabel: 'SYSTEM DESIGN',
      description: 'Design scalable distributed systems, microservices architectures, caching, and databases.',
    },
    {
      id: 'ai', path: '/ai', track: 'TRACK_03', icon: 'chip',
      title: 'AI', filterLabel: 'AI', cardLabel: 'ARTIFICIAL INTELLIGENCE',
      description: 'RAG pipelines, Large Language Models (LLMs), vector databases, and modern AI application concepts.',
    },
    {
      id: 'engineering', path: '/engineering', track: 'TRACK_04', icon: 'terminal',
      title: 'Engineering', filterLabel: 'ENGINEERING', cardLabel: 'ENGINEERING',
      description: 'Java, Spring Boot, database indexing, internals, clean code, and robust backend engineering.',
    },
  ],

  // Privacy/Terms links are omitted until those pages exist — add { label, href } entries here.
  footerLinks: [
    { label: 'GITHUB', key: 'github' },
    { label: 'YOUTUBE', key: 'youtube' },
  ],
};

export const categoryById = (id) => siteConfig.categories.find((c) => c.id === id);
