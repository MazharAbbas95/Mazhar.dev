export interface ExperienceItem {
  id: string;
  index: string;
  organization: string;
  position: string;
  timeframe: string;
  isCurrent: boolean;
  description: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  semester: string;
  status: string;
  summary: string;
}

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'ahl-frontend',
    index: '01',
    organization: 'AHL Technologies',
    position: 'Frontend Developer',
    timeframe: 'Currently Working',
    isCurrent: true,
    description:
      'Currently working as a Frontend Developer, contributing to frontend development and modern user interface implementation.',
  },
  {
    id: 'ahl-research',
    index: '02',
    organization: 'AHL Technologies',
    position: 'Product Research Engineer',
    timeframe: 'Previous · Approx. 3–4 Months',
    isCurrent: false,
    description:
      'Worked in product research engineering, exploring product requirements, researching technical possibilities, and contributing to product-oriented problem analysis.',
  },
];

export const EDUCATION: EducationItem = {
  id: 'mnsuam-bscs',
  degree: 'Bachelor of Science in Computer Science (BSCS)',
  institution: 'Muhammad Nawaz Sharif University of Agriculture',
  location: 'Multan, Pakistan',
  semester: 'Fifth Semester',
  status: 'Currently Pursuing',
  summary:
    'Building a strong academic foundation in computer science, algorithms, software engineering, and data-driven computing while applying engineering principles in industry.',
};
