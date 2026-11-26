export interface SkillCategory {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  statusLabel: string;
  isExploring: boolean;
  items: string[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'frontend',
    index: '01',
    title: 'Frontend Development',
    subtitle: 'Building responsive, accessible interfaces for modern web applications.',
    statusLabel: 'Core Practice',
    isExploring: false,
    items: ['HTML', 'CSS', 'JavaScript', 'React', 'Angular'],
  },
  {
    id: 'programming-backend',
    index: '02',
    title: 'Programming and Backend',
    subtitle: 'Application logic, desktop interfaces, APIs, and foundational computer science.',
    statusLabel: 'Core Practice',
    isExploring: false,
    items: ['C', 'C++', 'Python', 'REST APIs', 'Data Structures and Algorithms', 'Qt'],
  },
  {
    id: 'data-science',
    index: '03',
    title: 'Data Science and Data Analysis',
    subtitle: 'Working with structured datasets, statistical modeling, and visual exploration.',
    statusLabel: 'Active Foundation',
    isExploring: false,
    items: ['NumPy', 'Pandas', 'Matplotlib', 'Linear Regression', 'Data Analysis'],
  },
  {
    id: 'artificial-intelligence',
    index: '04',
    title: 'Artificial Intelligence',
    subtitle: 'Expanding technical depth into intelligent systems and modern AI architectures.',
    statusLabel: 'Currently Learning & Exploring',
    isExploring: true,
    items: ['Deep Learning', 'Advanced AI', 'Agentic AI', 'Data Science'],
  },
];
