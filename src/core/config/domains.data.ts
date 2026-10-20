/**
 * ACM NMIET Official Five Domains Data
 * Authoritative single source of truth for the Five Official ACM NMIET Domains
 */

import technicalImg from '@/assets/domains/technical.jpg'
import managementImg from '@/assets/domains/management.jpg'
import designImg from '@/assets/domains/design.jpg'
import codingImg from '@/assets/domains/coding_community.jpg'
import researchImg from '@/assets/domains/research.jpg'

export interface DomainFocusArea {
  title: string
  icon: string
}

export interface DomainItem {
  id: string
  number: string
  name: string
  tagline: string
  description: string
  detailedDescription: string
  accentColor: string
  accentGlow: string
  borderColor: string
  badgeBg: string
  image: string
  icon: string
  focusAreas: DomainFocusArea[]
}

export const domainsData: DomainItem[] = [
  {
    id: 'technical',
    number: '01',
    name: 'TECHNICAL',
    tagline: 'Build real-world solutions and explore emerging technologies.',
    description: 'Explore core technologies and build real-world solutions.',
    detailedDescription:
      'The computational heart of ACM NMIET. Master modern engineering stacks, explore artificial intelligence, deploy scalable cloud infrastructure, and safeguard distributed systems through hands-on technical labs and projects.',
    accentColor: '#1764BD',
    accentGlow: 'rgba(23, 100, 189, 0.45)',
    borderColor: 'rgba(23, 100, 189, 0.5)',
    badgeBg: 'rgba(23, 100, 189, 0.1)',
    image: technicalImg,
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
    tagline: 'Plan, organize and make ideas happen.',
    description: 'Plan, organize and make ideas happen.',
    detailedDescription:
      'The operational engine driving our chapter. Lead flagship summits, coordinate community logistics, secure corporate sponsorships, and forge strategic partnerships across academic institutions and the global tech industry.',
    accentColor: '#D97706',
    accentGlow: 'rgba(217, 119, 6, 0.45)',
    borderColor: 'rgba(217, 119, 6, 0.5)',
    badgeBg: 'rgba(217, 119, 6, 0.1)',
    image: managementImg,
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
    tagline: 'Create meaningful and impactful experiences.',
    description: 'Create meaningful and impactful experiences.',
    detailedDescription:
      'Where aesthetics intersect with human-computer interaction. Craft intuitive digital products, establish cohesive design systems, produce dynamic visual media, and articulate compelling brand narratives for our community.',
    accentColor: '#EC4899',
    accentGlow: 'rgba(236, 72, 153, 0.45)',
    borderColor: 'rgba(236, 72, 153, 0.5)',
    badgeBg: 'rgba(236, 72, 153, 0.1)',
    image: designImg,
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
    tagline: 'Learn, practice and grow together.',
    description: 'Learn, practice and grow together.',
    detailedDescription:
      'The algorithmic arena for passionate problem solvers. Elevate your data structures and algorithms mastery, participate in competitive programming rounds, engage in peer coding circles, and contribute to open-source software.',
    accentColor: '#10B981',
    accentGlow: 'rgba(16, 185, 129, 0.45)',
    borderColor: 'rgba(16, 185, 129, 0.5)',
    badgeBg: 'rgba(16, 185, 129, 0.1)',
    image: codingImg,
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
    tagline: 'Explore, innovate and contribute to the future.',
    description: 'Explore, innovate and contribute to the future.',
    detailedDescription:
      'The knowledge frontier of computing science. Investigate emerging technological frontiers, author peer-reviewed conference publications, build functional prototypes, and engage in interdisciplinary research collaborations.',
    accentColor: '#8B5CF6',
    accentGlow: 'rgba(139, 92, 246, 0.45)',
    borderColor: 'rgba(139, 92, 246, 0.5)',
    badgeBg: 'rgba(139, 92, 246, 0.1)',
    image: researchImg,
    icon: 'FlaskConical',
    focusAreas: [
      { title: 'Research Projects', icon: 'FileText' },
      { title: 'Technical Publications', icon: 'BookOpen' },
      { title: 'Innovation & Prototyping', icon: 'Lightbulb' },
      { title: 'Interdisciplinary Collaboration', icon: 'Network' },
    ],
  },
]
