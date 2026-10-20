/**
 * ACM NMIET Site Configuration — Master About Page Specification
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
    eyebrow: '02 • ABOUT ACM NMIET',
    headlineLine1: 'A COMMUNITY',
    headlineLine2: 'THAT BUILDS',
    headlineAccent: 'BEYOND.',
    description:
      'ACM NMIET is a student-driven community of curious minds, builders, and problem-solvers, united by a shared passion for technology, creativity, and real-world impact.',
    pillars: [
      {
        id: 'learn',
        title: 'LEARN',
        description: 'From peers, mentors and industry experts',
        icon: 'GraduationCap',
      },
      {
        id: 'build',
        title: 'BUILD',
        description: 'Projects, products and real solutions',
        icon: 'Hammer',
      },
      {
        id: 'collaborate',
        title: 'COLLABORATE',
        description: 'With a like-minded community',
        icon: 'Users',
      },
      {
        id: 'grow',
        title: 'GROW',
        description: 'Your skills, network and opportunities',
        icon: 'Rocket',
      },
    ],
    primaryCta: 'OUR JOURNEY →',
    secondaryCta: 'MEET THE TEAM',
  },
  story: {
    label: 'OUR STORY',
    description:
      'The ACM Student Chapter at NMIET was founded with a vision to create a thriving tech community on campus. From hosting technical events to building impactful projects, we aim to empower students to explore, learn, and innovate beyond the curriculum.',
    milestones: [
      {
        year: '2022',
        title: 'Chapter Established',
        icon: 'Flag',
      },
      {
        year: '2023',
        title: 'First Major Tech Event',
        icon: 'Users',
      },
      {
        year: '2024',
        title: 'Community Growth',
        icon: 'Box',
      },
      {
        year: '2025',
        title: 'More Impact & Opportunities',
        icon: 'Trophy',
      },
    ],
    mission: {
      label: 'OUR MISSION',
      statement: 'To inspire, enable, and empower students to build technology for a better tomorrow.',
    },
  },
  worldwide: {
    headingPrefix: 'ACM',
    headingAccent: 'WORLDWIDE',
    subtitle: 'A GLOBAL COMMUNITY. A BIGGER IMPACT.',
    description:
      "The Association for Computing Machinery (ACM) is the world's largest educational and scientific computing society, uniting computing educators, researchers, professionals, and students to inspire dialogue, share resources, and address the field's challenges.",
    cta: 'ABOUT ACM →',
    ctaUrl: 'https://www.acm.org/',
    stats: [
      {
        value: '100K+',
        label: 'Global Members',
        icon: 'Users',
      },
      {
        value: '200+',
        label: 'Countries',
        icon: 'Globe',
      },
      {
        value: '50+',
        label: 'Special Interest Groups',
        icon: 'Layers',
      },
      {
        value: '2,800+',
        label: 'Chapters Worldwide',
        icon: 'Landmark',
      },
    ],
    leadership: {
      heading: 'ACM GLOBAL LEADERSHIP',
      viewAllText: 'View All →',
      viewAllUrl: 'https://www.acm.org/about-acm/acm-leadership',
      members: [
        {
          name: 'Yelena Yesha',
          role: 'ACM President',
          term: '2024 – 2026',
          image: '/assets/about/yelena_yesha.jpg',
        },
        {
          name: 'Marcelo Viana',
          role: 'ACM President-Elect',
          term: '2024 – 2026',
          image: '/assets/about/marcelo_viana.jpg',
        },
        {
          name: 'Yannis Ioannidis',
          role: 'ACM Past President',
          term: '2022 – 2024',
          image: '/assets/about/yannis_ioannidis.jpg',
        },
        {
          name: 'Rachana Anandan',
          role: 'ACM CEO',
          term: 'Since 2020',
          image: '/assets/about/rachana_anandan.jpg',
        },
      ],
    },
  },
  whatWeDo: {
    heading: 'WHAT WE DO',
    exploreMoreText: 'Explore More →',
    exploreMoreUrl: '#events',
    cards: [
      {
        id: 'events',
        title: 'EVENTS',
        description: 'Workshops, Hackathons, Talks & Technical Sessions',
        image: '/assets/about/what_events.jpg',
        icon: 'Calendar',
      },
      {
        id: 'projects',
        title: 'PROJECTS',
        description: 'Build real-world solutions and open-source contributions',
        image: '/assets/about/what_projects.jpg',
        icon: 'Laptop',
      },
      {
        id: 'mentorship',
        title: 'MENTORSHIP',
        description: 'Guidance from industry experts and alumni',
        image: '/assets/about/what_mentorship.jpg',
        icon: 'GraduationCap',
      },
      {
        id: 'community',
        title: 'COMMUNITY',
        description: 'A vibrant network of learners, builders and creators',
        image: '/assets/about/what_community.jpg',
        icon: 'Users',
      },
      {
        id: 'opportunities',
        title: 'OPPORTUNITIES',
        description: 'Internships, research and industry connections',
        image: '/assets/about/what_opportunities.jpg',
        icon: 'Briefcase',
      },
    ],
  },
  navItems: [
    { label: 'Home', href: '#home', active: true },
    { label: 'About NMIET', href: '#about', active: false },
    { label: 'Domains', href: '#domains', active: false },
    { label: 'Events', href: '#events', active: false },
    { label: 'Team', href: '#team', active: false },
    { label: 'Partners', href: '#partners', active: false },
    { label: 'Gallery', href: '#gallery', active: false },
    { label: 'Contact', href: '#contact', active: false },
  ],
} as const
