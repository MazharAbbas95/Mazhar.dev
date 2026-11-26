export interface AchievementItem {
  id: string;
  index: string;
  title: string;
  organizerOrVenue: string;
  highlight: string;
  description: string;
}

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'ai-seekho-2026',
    index: '01',
    title: 'AI Seekho 2026',
    organizerOrVenue: 'AI Competition · 2026',
    highlight: 'First Stage Winner · Final Stage Participant',
    description:
      'Participated in AI Seekho 2026, winning the first stage, advancing through the second stage, and competing in the final stage.',
  },
  {
    id: 'aspire-leadership-program',
    index: '02',
    title: 'Aspire Leadership Program',
    organizerOrVenue: 'Provided by Harvard University',
    highlight: 'Achieved Third Position',
    description:
      'Participated in the Aspire Leadership Program provided by Harvard University and achieved third position.',
  },
  {
    id: 'must-expo',
    index: '03',
    title: 'MUST Expo',
    organizerOrVenue: 'MUST University · Multan',
    highlight: 'Expo Participant',
    description:
      'Participated in MUST Expo held at MUST University, Multan, showcasing practical technology and development work.',
  },
  {
    id: 'loop-lab-competition',
    index: '04',
    title: 'Loop Lab Competition',
    organizerOrVenue: 'UMT University · Lahore',
    highlight: 'Competition Participant',
    description:
      'Participated in the Loop Lab competition hosted at UMT University, Lahore.',
  },
  {
    id: 'mnsuam-coding-competition',
    index: '05',
    title: 'University Coding Competition',
    organizerOrVenue: 'MNSUAM · Multan',
    highlight: 'Competition Participant',
    description:
      'Participated in a competitive coding event held at Muhammad Nawaz Sharif University of Agriculture, Multan.',
  },
];
