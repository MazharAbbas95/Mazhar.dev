export interface ServiceItem {
  id: string;
  index: string;
  title: string;
  summary: string;
  capabilities: string[];
  focusLabel: string;
}

export interface VisionStage {
  id: string;
  step: string;
  label: string;
  stageType: 'Foundation' | 'Active Practice' | 'Exploring';
  detail: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'full-stack-development',
    index: '01',
    title: 'Full Stack Development',
    summary:
      'Building responsive, modern, user-friendly web interfaces using modern full stack technologies.',
    capabilities: ['React & Angular', 'MySQL', 'PostgreSQL', 'Node.js', 'Express.js', 'REST APIs', 'TypeScript'],
    focusLabel: 'Current Capability',
  },
  {
    id: 'software-development',
    index: '02',
    title: 'Software Development',
    summary:
      'Developing practical software solutions using programming languages and application development technologies.',
    capabilities: ['C / C++ / Python', 'REST API Integration', 'Qt Desktop Interfaces', 'Business & SaaS Logic'],
    focusLabel: 'Current Capability',
  },
  {
    id: 'data-analysis',
    index: '03',
    title: 'Data Analysis',
    summary:
      'Working with datasets, data processing, analysis, and visualization using Python-based tools.',
    capabilities: ['NumPy & Pandas', 'Matplotlib Visualizations', 'Linear Regression', 'Structured Insights'],
    focusLabel: 'Developing Capability',
  },
  {
    id: 'ai-ml-exploration',
    index: '04',
    title: 'AI and Machine Learning Exploration',
    summary:
      'Exploring machine learning concepts, predictive modeling, deep learning, and intelligent application development.',
    capabilities: ['Machine Learning Foundations', 'Deep Learning Concepts', 'Agentic AI Workflows', 'Data Science Pathway'],
    focusLabel: 'Learning & Exploration',
  },
];

export const VISION_STAGES: VisionStage[] = [
  {
    id: 'software-engineering',
    step: '01',
    label: 'Software Engineering',
    stageType: 'Foundation',
    detail: 'Production frontend engineering, practical business software, and CS fundamentals.',
  },
  {
    id: 'data-analysis',
    step: '02',
    label: 'Data Analysis',
    stageType: 'Active Practice',
    detail: 'Cleaning, exploring, and visualizing datasets with Python, NumPy, Pandas, and Matplotlib.',
  },
  {
    id: 'machine-learning',
    step: '03',
    label: 'Machine Learning',
    stageType: 'Exploring',
    detail: 'Studying predictive modeling, Linear Regression, and core supervised learning workflows.',
  },
  {
    id: 'deep-learning',
    step: '04',
    label: 'Deep Learning',
    stageType: 'Exploring',
    detail: 'Expanding understanding of neural architectures and representation learning.',
  },
  {
    id: 'agentic-ai',
    step: '05',
    label: 'Agentic AI',
    stageType: 'Exploring',
    detail: 'Investigating autonomous tool-using systems toward a career in Data Science & AI.',
  },
];
