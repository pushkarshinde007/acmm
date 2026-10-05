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
  nmiet: {
    number: '03',
    label: 'NMIET',
    sublabel: 'THE INNOVATION LANDMARK',
    headlineLine1: 'A PLACE TO LEARN.',
    headlineLine2: 'A PLACE TO CREATE.',
    paragraph:
      'NMIET provides the academic environment where curiosity, technical skills and creative thinking can grow into meaningful work.',
    concepts: [
      {
        number: '01',
        title: 'LEARNING',
        description: 'A space to develop strong technical foundations and explore new ideas.',
      },
      {
        number: '02',
        title: 'INNOVATION',
        description: 'An environment where experimentation can become projects, solutions and experiences.',
      },
      {
        number: '03',
        title: 'OPPORTUNITY',
        description: 'A platform to discover communities, challenges and possibilities beyond the classroom.',
      },
    ],
    cta: 'EXPLORE ACADEMIC PILLARS',
  },
  domains: {
    number: '04',
    label: 'DOMAINS',
    sublabel: 'THE INNOVATION DISTRICT',
    headlineLine1: 'FIVE PATHS.',
    headlineLine2: 'ONE COMMUNITY.',
    supportingText:
      'Explore the disciplines through which ACM NMIET students learn, create, compete and discover.',
    nexus: {
      title: 'THE KNOWLEDGE NEXUS',
      description: 'The architectural anchor connecting five interdisciplinary avenues of exploration.',
    },
    items: [
      {
        id: 'technology',
        number: '01',
        title: 'TECHNOLOGY',
        category: 'COMPUTATIONAL CORE',
        description:
          'Build with modern technologies, explore systems and turn technical ideas into working experiences.',
        metaphor:
          'Sculptural installation with geometric structures, blue nodes, and computational frameworks.',
        accentColor: '#1457A6',
        tag: 'SYSTEMS & AI',
      },
      {
        id: 'management',
        number: '02',
        title: 'MANAGEMENT',
        category: 'STRATEGY BRIDGE',
        description:
          'Develop leadership, strategy and the ability to turn ideas into organized action.',
        metaphor:
          'Architectural bridge and circular forum with connected meeting pathways and strategic spaces.',
        accentColor: '#2D75C9',
        tag: 'LEADERSHIP & OPERATIONS',
      },
      {
        id: 'design',
        number: '03',
        title: 'DESIGN',
        category: 'CREATIVE STUDIO',
        description:
          'Shape ideas through visual thinking, interaction and creative problem solving.',
        metaphor:
          'Open multi-level studio with sketch surfaces, architectural models, and creative exhibits.',
        accentColor: '#69BCE8',
        tag: 'UI/UX & CREATIVE',
      },
      {
        id: 'competitive-coding',
        number: '04',
        title: 'COMPETITIVE CODING',
        category: 'ALGORITHMIC ARENA',
        description:
          'Strengthen algorithmic thinking, speed and structured problem solving through challenges.',
        metaphor:
          'Stepped amphitheatre with geometric pathways, collaborative stations, and computational sculptures.',
        accentColor: '#0B2D55',
        tag: 'ALGORITHMS & PROBLEM SOLVING',
      },
      {
        id: 'research',
        number: '05',
        title: 'RESEARCH',
        category: 'KNOWLEDGE OBSERVATORY',
        description:
          'Explore questions deeply, experiment with ideas and turn curiosity into knowledge.',
        metaphor:
          'Elevated observatory with quiet research spaces, scientific displays, and glass laboratories.',
        accentColor: '#2D75C9',
        tag: 'DISCOVERY & PAPERS',
      },
    ],
  },
  navItems: [
    { label: 'Home', href: '#home', active: true },
    { label: 'About', href: '#about', active: false },
    { label: 'NMIET', href: '#nmiet', active: false },
    { label: 'Domains', href: '#domains', active: false },
    { label: 'Events', href: '#events', active: false },
    { label: 'Projects', href: '#projects', active: false },
    { label: 'Team', href: '#team', active: false },
    { label: 'Partners', href: '#partners', active: false },
    { label: 'Gallery', href: '#gallery', active: false },
    { label: 'Contact', href: '#contact', active: false },
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
    {
      index: 4,
      time: '6.0s – 8.0s',
      title: 'NMIET Innovation Landmark',
      description: 'Monumental academic structure revealed: vertical gardens, research labs, and library volume.',
    },
    {
      index: 5,
      time: '8.0s – 10.0s',
      title: 'The Innovation District',
      description: 'Five interactive domain installations unfold around the central Knowledge Nexus.',
    },
  ],
} as const
