export type ProjectFilterCategory =
  | 'All'
  | 'Web Development'
  | 'SaaS'
  | 'Business Software'
  | 'AI & Data';

export interface ProjectItem {
  id: string;
  index: string;
  name: string;
  categoryLabel: string;
  filterCategories: Exclude<ProjectFilterCategory, 'All'>[];
  description: string;
  liveUrl?: string;
  githubUrl?: string;
  featuredBadge?: string;
  architectureNote?: string;
  domainLabel: string;
  accentTone: 'violet' | 'indigo' | 'emerald' | 'amber';
  imageSrc: string;
}

export const PROJECT_FILTERS: ProjectFilterCategory[] = [
  'All',
  'Web Development',
  'SaaS',
  'Business Software',
  'AI & Data',
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'madad-logistic-container-services',
    index: '01',
    name: 'Madad Logistic Container Services',
    categoryLabel: 'Transport Management System / Logistics Software',
    filterCategories: ['Business Software', 'Web Development'],
    description:
      'A digital logistics and transportation platform designed to support transport business operations and provide an organized online experience.',
    liveUrl: 'https://madad-logistic-container-services-eta.vercel.app',
    featuredBadge: 'Key Business Software',
    architectureNote: 'Operations-focused transport management web platform built for structured logistics workflows.',
    domainLabel: 'madad-logistic-container-services-eta.vercel.app',
    accentTone: 'violet',
    imageSrc: '/images/projects/madad-logistic.svg',
  },
  {
    id: 'byflow',
    index: '02',
    name: 'Byflow — Multi-Tenant Auto Repair Platform',
    categoryLabel: 'SaaS / Multi-Tenant Platform',
    filterCategories: ['SaaS', 'Web Development', 'Business Software'],
    description:
      'A multi-tenant automotive repair platform concept designed to support digital operations for auto repair businesses.',
    liveUrl: 'https://byflow-lilac.vercel.app/',
    featuredBadge: 'Multi-Tenant Architecture',
    architectureNote: 'Designed around multi-tenant software architecture separating independent auto repair business workspaces.',
    domainLabel: 'byflow-ilac.vercel.app',
    accentTone: 'indigo',
    imageSrc: '/images/projects/byflow.svg',
  },
  {
    id: 'ali-imran-goods-transport',
    index: '03',
    name: 'Ali Imran Goods Transport Network',
    categoryLabel: 'Business Website / Transportation',
    filterCategories: ['Web Development', 'Business Software'],
    description:
      'A digital platform for a goods transportation business, presenting its transportation services and business identity online.',
    liveUrl: 'https://aliimrangoodstransportnetwork.com/',
    domainLabel: 'aliimrangoodstransportnetwork.com',
    accentTone: 'violet',
    imageSrc: '/images/projects/ali-imran.svg',
  },
  {
    id: 'kavumi-matcha',
    index: '04',
    name: 'Kavumi Matcha',
    categoryLabel: 'Premium Brand / E-commerce',
    filterCategories: ['Web Development'],
    description:
      'A premium digital brand experience for a matcha business, focusing on modern presentation and e-commerce-oriented design.',
    liveUrl: 'https://kavumi-matcha.vercel.app/',
    domainLabel: 'kavumi-matcha.vercel.app',
    accentTone: 'emerald',
    imageSrc: '/images/projects/kavumi-matcha.svg',
  },
  {
    id: 'edu-match-pro',
    index: '05',
    name: 'Edu Match Pro',
    categoryLabel: 'Education Technology',
    filterCategories: ['Web Development', 'SaaS'],
    description:
      'An educational and career preparation platform designed to support students in exploring learning opportunities and preparing for academic pathways.',
    liveUrl: 'https://edu-match-pro.vercel.app/',
    domainLabel: 'edu-match-pro.vercel.app',
    accentTone: 'indigo',
    imageSrc: '/images/projects/edu-match.svg',
  },
  {
    id: 'neon-invaders-synth-player',
    index: '06',
    name: 'Neon Invaders Synth Player',
    categoryLabel: 'Interactive Digital Application',
    filterCategories: ['Web Development'],
    description:
      'A visually distinctive neon-inspired digital project combining an interactive interface with a futuristic aesthetic.',
    liveUrl: 'https://neon-invaders-synth-player.vercel.app/',
    domainLabel: 'neon-invaders-synth-player.vercel.app',
    accentTone: 'violet',
    imageSrc: '/images/projects/neon-invaders.svg',
  },
  {
    id: 'learn-matrix',
    index: '07',
    name: 'Learn Matrix',
    categoryLabel: 'Educational Software',
    filterCategories: ['Web Development'],
    description:
      'A learning-focused software project designed around an organized digital learning experience.',
    githubUrl: 'https://github.com/webiiix/Learn-Matrix',
    domainLabel: 'github.com/webiiix/Learn-Matrix',
    accentTone: 'indigo',
    imageSrc: '/images/projects/learn-matrix.svg',
  },
  {
    id: 'flow-logistics-services',
    index: '08',
    name: 'Flow Logistics Services',
    categoryLabel: 'Logistics / Business Platform',
    filterCategories: ['Business Software', 'Web Development'],
    description:
      'A logistics-oriented digital platform presenting transportation and business services.',
    liveUrl: 'https://flow-logistics-services.vercel.app/',
    domainLabel: 'flow-logistics-services.vercel.app',
    accentTone: 'violet',
    imageSrc: '/images/projects/flow-logistics.svg',
  },
  {
    id: 'resilinet-ai',
    index: '09',
    name: 'ResiliNet AI',
    categoryLabel: 'Artificial Intelligence / Disaster Awareness',
    filterCategories: ['AI & Data'],
    description:
      'An AI-focused disaster awareness and response application.',
    architectureNote: 'AI-oriented disaster awareness project. Public deployment URL is not published.',
    domainLabel: 'AI Research & Development',
    accentTone: 'amber',
    imageSrc: '/images/projects/resilinet-ai.svg',
  },
  {
    id: 'goods-transport-custom-software',
    index: '10',
    name: 'Goods Transport Custom Software',
    categoryLabel: 'Custom Business Software / Transportation Management',
    filterCategories: ['Business Software'],
    description:
      'Custom software developed around goods transportation business operations.',
    architectureNote: 'Private custom business software built for internal goods transport workflows.',
    domainLabel: 'Custom Operations Software',
    accentTone: 'indigo',
    imageSrc: '/images/projects/goods-transport-software.svg',
  },
];
