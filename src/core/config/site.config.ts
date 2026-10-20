/**
 * ACM NMIET Site Configuration — Exact Phase 1, Phase 2 & Phase 3 Specification
 */

export const siteConfig = {
  title: 'ACM NMIET — Beyond the Scroll',
  description: 'ACM NMIET Student Chapter — a journey through technology, creativity and community.',
  chapter: {
    name: 'ACM NMIET',
    subname: 'Student Chapter',
    institution: 'Nutan Maharashtra Institute of Engineering and Technology',
    eyebrow: 'ACM NMIET STUDENT CHAPTER',
  },
  hero: {
    eyebrow: 'ACM NMIET STUDENT CHAPTER',
    headlineLine1: 'BEYOND',
    headlineLine2: 'THE SCROLL.',
    subheading: 'A journey through technology, creativity and community.',
    supportingParagraph:
      'ACM NMIET is a student-driven community where ideas become skills, projects and experiences.',
    primaryCta: 'EXPLORE THE JOURNEY',
    secondaryCta: 'JOIN ACM',
    scrollIndicator: 'SCROLL TO BEGIN',
  },
  about: {
    label: 'ABOUT ACM NMIET',
    headlineLine1: 'A COMMUNITY',
    headlineLine2: 'THAT BUILDS',
    headlineLine3: 'TOMORROW.',
    statement: 'Where technology meets creativity, and students turn ideas into experiences.',
    description:
      'ACM NMIET Student Chapter is a student-driven community built around learning, experimentation, collaboration and creating meaningful technology experiences.',
    principles: [
      {
        number: '01',
        title: 'LEARN',
        description: 'Explore technologies, develop skills and learn from peers.',
      },
      {
        number: '02',
        title: 'BUILD',
        description: 'Turn ideas into projects, experiments and meaningful experiences.',
      },
      {
        number: '03',
        title: 'CONNECT',
        description: 'Collaborate with students, mentors and the wider technology community.',
      },
    ],
    primaryCta: 'EXPLORE ACM',
    secondaryCta: 'OUR COMMUNITY',
  },
  navItems: [
    { label: 'Home', href: '#home', active: true },
    { label: 'About', href: '#about', active: false },
  ],
  storyboard: [
    {
      index: 1,
      time: '0.0s – 2.0s',
      title: 'Hero Establishing',
      description: 'Wide panoramic establishing composition of NMIET campus and futuristic skyline.',
    },
    {
      index: 2,
      time: '2.0s – 4.0s',
      title: 'Student Begins Journey',
      description: 'Camera initiates tracking shot behind student facing campus architecture.',
    },
    {
      index: 3,
      time: '4.0s – 6.0s',
      title: 'The Community Atrium',
      description: 'Atrium opens with amphitheatre, water feature, digital globe, and student collaboration.',
    },
  ],
} as const
