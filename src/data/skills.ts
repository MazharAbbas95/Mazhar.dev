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
    id: 'full-stack-development',
    index: '01',
    title: 'Full Stack Development',
    subtitle: 'Building responsive, modern, user-friendly web interfaces using modern full stack technologies.',
    statusLabel: 'Core Practice',
    isExploring: false,
    items: ['HTML', 'CSS', 'JavaScript', 'React', 'Angular', 'TypeScript', 'MySQL', 'PostgreSQL', 'Node.js', 'Express.js', 'REST APIs', 'TypeScript'],
  },
  {
    id: 'programming',
    index: '02',
    title: 'Programming Languages & Frameworks',
    subtitle: 'Application logic, desktop interfaces, APIs, and foundational computer science.',
    statusLabel: 'Core Practice',
    isExploring: false,
    items: ['C', 'C++', 'Python', 'Data Structures and Algorithms', 'Qt', 'React', 'Angular',],
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
