/**
 * ACM NMIET Official Five Domains Data
 * Authoritative single source of truth for the Five Official ACM NMIET Domains
 */

import technicalImg from '@/assets/domains/technical.jpg'
import managementImg from '@/assets/domains/management.jpg'
import designImg from '@/assets/domains/design.jpg'
import codingImg from '@/assets/domains/coding_community.jpg'
import researchImg from '@/assets/domains/research.jpg'

import technicalCard from '@/assets/domains/card_technical.png'
import managementCard from '@/assets/domains/card_management.png'
import designCard from '@/assets/domains/card_design.png'
import codingCard from '@/assets/domains/card_coding_community.png'
import researchCard from '@/assets/domains/card_research.png'

export interface DomainFocusArea {
  title: string
  icon: string
}

export interface DomainItem {
  id: string
  number: string
  name: string
  pillars: [string, string, string]
  tagline: string
  description: string
  detailedDescription: string
  theme: 'dark' | 'light'
  cardBg: string
  textColor: string
  subtextColor: string
  accentColor: string
  accentGlow: string
  borderColor: string
  badgeBg: string
  pillBg: string
  pillBorder?: string
  pillText: string
  image: string
  cardImage: string
  icon: string
  focusAreas: DomainFocusArea[]
}

export const domainsData: DomainItem[] = [
  {
    id: 'technical',
    number: '01',
    name: 'TECHNICAL',
    pillars: ['BUILD', 'LEARN', 'EXPLORE'],
    tagline: 'Build real-world solutions and explore emerging technologies.',
    description: 'Explore core technologies and build real-world solutions.',
    detailedDescription:
      'The computational heart of ACM NMIET. Master modern engineering stacks, explore artificial intelligence, deploy scalable cloud infrastructure, and safeguard distributed systems through hands-on technical labs and projects.',
    theme: 'dark',
    cardBg: '#061325',
    textColor: '#FFFFFF',
    subtextColor: 'rgba(255, 255, 255, 0.72)',
    accentColor: '#38BDF8',
    accentGlow: 'rgba(56, 189, 248, 0.35)',
    borderColor: 'rgba(56, 189, 248, 0.35)',
    badgeBg: 'rgba(56, 189, 248, 0.15)',
    pillBg: 'rgba(7, 27, 52, 0.85)',
    pillBorder: 'rgba(56, 189, 248, 0.45)',
    pillText: '#FFFFFF',
    image: technicalImg,
    cardImage: technicalCard,
    icon: 'Laptop',
    focusAreas: [
      { title: 'Web Technologies', icon: 'Globe' },
      { title: 'AI / Machine Learning', icon: 'Cpu' },
      { title: 'Cloud & DevOps', icon: 'Cloud' },
      { title: 'Cybersecurity', icon: 'Shield' },
    ],
  },
  {
    id: 'management',
    number: '02',
    name: 'MANAGEMENT',
    pillars: ['PLAN', 'ORGANIZE', 'COLLABORATE'],
    tagline: 'Plan, organize and make ideas happen.',
    description: 'Plan, organize and make ideas happen.',
    detailedDescription:
      'The operational engine driving our chapter. Lead flagship summits, coordinate community logistics, secure corporate sponsorships, and forge strategic partnerships across academic institutions and the global tech industry.',
    theme: 'light',
    cardBg: '#FFFDF9',
    textColor: '#92400E',
    subtextColor: '#536273',
    accentColor: '#D97706',
    accentGlow: 'rgba(217, 119, 6, 0.35)',
    borderColor: 'rgba(217, 119, 6, 0.35)',
    badgeBg: 'rgba(217, 119, 6, 0.12)',
    pillBg: '#D97706',
    pillBorder: '#D97706',
    pillText: '#FFFFFF',
    image: managementImg,
    cardImage: managementCard,
    icon: 'Users',
    focusAreas: [
      { title: 'Event Planning', icon: 'Calendar' },
      { title: 'Community Operations', icon: 'Briefcase' },
      { title: 'Finance & Sponsorship', icon: 'Coins' },
      { title: 'Outreach & Partnerships', icon: 'Handshake' },
    ],
  },
  {
    id: 'design',
    number: '03',
    name: 'DESIGN',
    pillars: ['CREATE', 'DESIGN', 'INSPIRE'],
    tagline: 'Create meaningful and impactful experiences.',
    description: 'Create meaningful and impactful experiences.',
    detailedDescription:
      'Where aesthetics intersect with human-computer interaction. Craft intuitive digital products, establish cohesive design systems, produce dynamic visual media, and articulate compelling brand narratives for our community.',
    theme: 'dark',
    cardBg: '#170A1A',
    textColor: '#FFFFFF',
    subtextColor: 'rgba(255, 255, 255, 0.72)',
    accentColor: '#EC4899',
    accentGlow: 'rgba(236, 72, 153, 0.35)',
    borderColor: 'rgba(236, 72, 153, 0.35)',
    badgeBg: 'rgba(236, 72, 153, 0.15)',
    pillBg: '#DB2777',
    pillBorder: '#DB2777',
    pillText: '#FFFFFF',
    image: designImg,
    cardImage: designCard,
    icon: 'Palette',
    focusAreas: [
      { title: 'UI/UX Design', icon: 'Layout' },
      { title: 'Graphic Design', icon: 'PenTool' },
      { title: 'Motion & Creative Media', icon: 'Video' },
      { title: 'Branding & Storytelling', icon: 'Sparkles' },
    ],
  },
  {
    id: 'coding-community',
    number: '04',
    name: 'CODING COMMUNITY',
    pillars: ['LEARN', 'PRACTICE', 'GROW'],
    tagline: 'Learn, practice and grow together.',
    description: 'Learn, practice and grow together.',
    detailedDescription:
      'The algorithmic arena for passionate problem solvers. Elevate your data structures and algorithms mastery, participate in competitive programming rounds, engage in peer coding circles, and contribute to open-source software.',
    theme: 'dark',
    cardBg: '#061812',
    textColor: '#FFFFFF',
    subtextColor: 'rgba(255, 255, 255, 0.72)',
    accentColor: '#34D399',
    accentGlow: 'rgba(52, 211, 153, 0.35)',
    borderColor: 'rgba(52, 211, 153, 0.35)',
    badgeBg: 'rgba(52, 211, 153, 0.15)',
    pillBg: '#059669',
    pillBorder: '#059669',
    pillText: '#FFFFFF',
    image: codingImg,
    cardImage: codingCard,
    icon: 'Terminal',
    focusAreas: [
      { title: 'DSA & Competitive Programming', icon: 'Terminal' },
      { title: 'Peer Learning Sessions', icon: 'Users' },
      { title: 'Code Labs & Contests', icon: 'Award' },
      { title: 'Open Source Contributions', icon: 'GitBranch' },
    ],
  },
  {
    id: 'research',
    number: '05',
    name: 'RESEARCH',
    pillars: ['EXPLORE', 'INNOVATE', 'CONTRIBUTE'],
    tagline: 'Explore, innovate and contribute to the future.',
    description: 'Explore, innovate and contribute to the future.',
    detailedDescription:
      'The knowledge frontier of computing science. Investigate emerging technological frontiers, author peer-reviewed conference publications, build functional prototypes, and engage in interdisciplinary research collaborations.',
    theme: 'light',
    cardBg: '#F8F6FD',
    textColor: '#4C1D95',
    subtextColor: '#536273',
    accentColor: '#7C3AED',
    accentGlow: 'rgba(124, 58, 237, 0.35)',
    borderColor: 'rgba(124, 58, 237, 0.35)',
    badgeBg: 'rgba(124, 58, 237, 0.12)',
    pillBg: '#7C3AED',
    pillBorder: '#7C3AED',
    pillText: '#FFFFFF',
    image: researchImg,
    cardImage: researchCard,
    icon: 'FlaskConical',
    focusAreas: [
      { title: 'Research Projects', icon: 'FileText' },
      { title: 'Technical Publications', icon: 'BookOpen' },
      { title: 'Innovation & Prototyping', icon: 'Lightbulb' },
      { title: 'Interdisciplinary Collaboration', icon: 'Network' },
    ],
  },
]
