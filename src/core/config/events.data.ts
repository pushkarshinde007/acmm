export interface EventItem {
  id: string
  number: string
  title: string
  shortTitle: string
  date: string
  dateBadge: string
  time?: string
  venue: string
  mode: string
  category: 'WORKSHOP' | 'SEMINAR' | 'COMPETITION' | 'HANDS-ON SESSION' | 'ALUMNI TALK'
  categoryBadgeColor: string
  speaker?: {
    name: string
    role: string
    organization?: string
  }
  coordinators?: string[]
  organizedWith: string
  description: string
  detailedSummary: string
  highlights: string[]
  gallery: string[]
  coverImage: string
  discImage?: string
  hasCustomDiscArt?: boolean
  discPattern: 'sunburst' | 'rings' | 'halftone' | 'horizon' | 'stripes' | 'eclipse' | 'mosaic'
  palette: [string, string, string]
  participants?: string
  teams?: string
  winners?: {
    rank: string
    team: string
    members: string
    college: string
    prize: string
  }[]
}

export const eventsData: EventItem[] = [
  {
    id: 'canva-workshop',
    number: '01',
    title: 'Design With Canva Workshop',
    shortTitle: 'Design With Canva',
    date: '13th January 2026',
    dateBadge: '13 JAN',
    time: '2:00 PM onwards',
    venue: 'Computer Center Lab 12, NMIET',
    mode: 'Offline',
    category: 'WORKSHOP',
    categoryBadgeColor: '#7C3AED', // Vibrant Purple / Violet
    speaker: {
      name: 'Mr. Vinodkumar Pawar',
      role: 'Creative Designer & Visual Mentor',
    },
    organizedWith: 'Art Circle Club & NMIET ACM Student Chapter',
    coordinators: ['Dr. Priyanka Halle', 'Prof. Nishant Parashar'],
    description:
      'A hands-on workshop introducing students to the fundamentals of graphic design, creative typography, and visual content creation.',
    detailedSummary:
      "The Canva Workshop was successfully organized and conducted in the college with the aim of introducing students to the fundamentals of graphic design and visual content creation. The session focused on hands-on learning, where participants explored Canva's interface, templates, design tools, and real-world use cases such as posters, presentations, social media creatives, and resumes. Registration for the workshop was kept free to encourage maximum participation from students across all engineering and management programmes.",
    highlights: [
      'Hands-on exploration of Canva interface, tools, and layout grids',
      'Designing professional resumes, technical posters, and project presentations',
      'Free registration for all engineering and management students',
      'Interactive visual feedback and design critique from mentor Mr. Vinodkumar Pawar',
    ],
    gallery: [
      '/assets/events/extracted_11.jpg',
      '/assets/events/extracted_12.jpg',
      '/assets/events/extracted_02.jpg',
      '/assets/events/extracted_01.jpg',
    ],
    coverImage: '/assets/events/extracted_11.jpg',
    discImage: '/assets/events/canva_disc_poster.jpg',
    hasCustomDiscArt: true,
    discPattern: 'mosaic',
    palette: ['#071B34', '#7C3AED', '#DDD6FE'],
  },
  {
    id: 'inauguration',
    number: '02',
    title: 'Inauguration of ACM NMIET Student Chapter',
    shortTitle: 'ACM NMIET Inauguration',
    date: 'Wednesday, 4th February 2026',
    dateBadge: '04 FEB',
    time: '10:00 AM onwards',
    venue: 'A-Wing Auditorium, NMIET',
    mode: 'Offline',
    category: 'SEMINAR',
    categoryBadgeColor: '#1764BD', // Cobalt Blue
    speaker: {
      name: 'Prof. Rahul Pitale',
      role: 'ACM India Memberships & Chapters Committee',
      organization: 'ACM India',
    },
    organizedWith: 'ACES (Association of Computer Engineering Students)',
    coordinators: ['Dr. Priyanka Halle', 'Dr. Rahul Patil (HoD)', 'Dr. Pramod Patil (Director)'],
    description:
      'The grand formal inauguration ceremony marking the establishment of the ACM NMIET Student Chapter with keynote by ACM India leadership.',
    detailedSummary:
      'The ACM NMIET Student Chapter was officially inaugurated with a power-packed launch day organized in collaboration with ACES. The day was structured around three key components: the formal ACM Inauguration ceremony, an Expert Guidance Session, and the "Clash of Minds" competitive debate event, marking the beginning of a global tech journey for the department. A special guest lecture titled "From Excellence to Impact: Journey for India\'s Premier ACM Student Chapter" was delivered by Prof. Rahul Pitale of the ACM India Memberships & Chapters Committee, who guided students on building an impactful and sustainable student chapter.',
    highlights: [
      'Official inauguration of ACM NMIET Student Chapter and ACES collaboration',
      'Keynote Address: "From Excellence to Impact: Journey for India\'s Premier ACM Student Chapter" by Prof. Rahul Pitale',
      'Clash of Minds – Inter-college competitive debate event launch',
      'Interaction with faculty, leadership, students and chapter office bearers',
      'Establishment of global computing research and peer-mentorship pathways',
    ],
    gallery: [
      '/assets/events/extracted_13.jpg',
      '/assets/events/extracted_14.jpg',
      '/assets/events/extracted_15.jpg',
      '/assets/events/extracted_01.jpg',
    ],
    coverImage: '/assets/events/extracted_13.jpg',
    discImage: '/assets/events/inauguration_disc_poster.jpg',
    hasCustomDiscArt: true,
    discPattern: 'sunburst',
    palette: ['#071B34', '#1764BD', '#38BDF8'],
  },
  {
    id: 'clash-of-minds',
    number: '03',
    title: 'Debate Competition – Clash of Minds',
    shortTitle: 'Clash of Minds Debate',
    date: '4th February 2026',
    dateBadge: '04 FEB',
    time: '1:30 PM onwards',
    venue: 'A-Wing Auditorium, NMIET',
    mode: 'Offline',
    category: 'COMPETITION',
    categoryBadgeColor: '#EA580C', // Vibrant Orange
    organizedWith: 'ACM NMIET Student Chapter & Department of Computer Engineering',
    coordinators: ['Dr. Priyanka Halle', 'Prof. Nishant Parashar'],
    description:
      'An intellectual debate competition on contemporary themes in Artificial Intelligence, Data Ethics, and Economic Development.',
    detailedSummary:
      "The Department, under the banner of ACM, organized a Debate Competition on 4th February 2026, focusing on contemporary and thought-provoking themes related to Artificial Intelligence, Data Science, and Economic Development. The event provided students with a platform to express their perspectives, exchange ideas, and engage in meaningful discussions on the impact of emerging technologies on society and the economy. The competition encouraged participants to develop critical thinking, effective communication, research, and analytical skills.",
    highlights: [
      'Rigorous debates on ethical AI, data governance, and automated economies',
      'Fostered critical thinking, analytical logic, and respectful academic argumentation',
      'Evaluated by faculty panel on structured evidence, rebuttal, and articulation',
      'Multi-round tournament with audience engagement and active Q&A',
    ],
    gallery: [
      '/assets/events/extracted_16.jpg',
      '/assets/events/extracted_03.jpg',
      '/assets/events/extracted_15.jpg',
      '/assets/events/extracted_14.jpg',
    ],
    coverImage: '/assets/events/extracted_16.jpg',
    discImage: '/assets/events/clash_of_minds_disc_poster.jpg',
    hasCustomDiscArt: true,
    discPattern: 'eclipse',
    palette: ['#071B34', '#EA580C', '#FED7AA'],
  },
  {
    id: 'deploy-gke',
    number: '04',
    title: 'Session on How to Deploy Microservices Application on GKE',
    shortTitle: 'Deploy on GKE',
    date: 'Friday, 13th February 2026',
    dateBadge: '13 FEB',
    time: '7:00 PM',
    venue: 'Online (Google Meet)',
    mode: 'Online',
    category: 'WORKSHOP',
    categoryBadgeColor: '#059669', // Emerald Green matching GKE artwork
    speaker: {
      name: 'Mr. Sanket Bisne',
      role: 'Google Developer Expert (GDE)',
      organization: 'Google Developer Experts',
    },
    organizedWith: 'Department of Computer Engineering, NMIET',
    coordinators: ['Dr. Priyanka Halle', 'Prof. Vaishali Dhawas', 'Dr. Rahul Patil'],
    description:
      'A practical hands-on session on architecting, containerizing, and deploying microservices on Google Kubernetes Engine.',
    detailedSummary:
      'The Department of Computer Engineering, NMIET, successfully organized a Hands-On Session on "How to Deploy Microservices Application on Google Kubernetes Engine (GKE)". The session focused on providing participants with practical exposure to deploying and managing microservices using modern cloud-native technologies. Conducted by Mr. Sanket Bisne, a Google Developer Expert, who guided participants through real-world deployment workflows, best practices, and industry-relevant use cases.',
    highlights: [
      'Comprehensive introduction to Cloud-Native Microservices Architecture',
      'Live Hands-on Deployment walkthrough on Google Kubernetes Engine (GKE)',
      'Real-world CI/CD containerization best practices, cluster scaling, and ingress routing',
      'Interactive Q&A session with Google Developer Expert Sanket Bisne',
    ],
    gallery: [
      '/assets/events/extracted_17.jpg',
      '/assets/events/extracted_10.jpg',
      '/assets/events/extracted_07.jpg',
      '/assets/events/extracted_05.jpg',
    ],
    coverImage: '/assets/events/extracted_17.jpg',
    discImage: '/assets/events/gke_disc_poster.jpg',
    hasCustomDiscArt: true,
    discPattern: 'rings',
    palette: ['#071B34', '#059669', '#A7F3D0'],
  },
  {
    id: 'cloudcraft',
    number: '05',
    title: 'Hands-on Session: CloudCraft – Hands-on to Career',
    shortTitle: 'CloudCraft Career Session',
    date: 'Thursday, 5th March 2026',
    dateBadge: '05 MAR',
    time: '6:30 PM',
    venue: 'Online (Google Meet)',
    mode: 'Online',
    category: 'HANDS-ON SESSION',
    categoryBadgeColor: '#E11D48', // Vibrant Crimson / Rose Red matching CloudCraft artwork
    speaker: {
      name: 'Mr. Mayuresh Muluk',
      role: 'AWS Cloud Captain & President, AWS Cloud Club PICT',
      organization: 'AWS Cloud Club',
    },
    organizedWith: 'Department of Computer Engineering, NMIET, in association with ACES',
    coordinators: ['Prof. Nishant Parashar', 'Dr. Priyanka Halle', 'Dr. Rahul Patil'],
    description:
      'An industry session guiding students through AWS cloud workflows, practical architecture, and career paths in cloud engineering.',
    detailedSummary:
      'The Department of Computer Engineering, NMIET, in association with ACES, organized a hands-on session titled "CloudCraft: Hands-on to Career", conducted online via Google Meet. The session was designed to give students practical, guided exposure to cloud computing concepts and tools, while also mapping out how such hands-on skills translate into career opportunities in the cloud domain. Led by AWS Cloud Captain Mayuresh Muluk, sharing insights from the AWS community.',
    highlights: [
      'Hands-on roadmap: EC2, S3, IAM policies, and cloud infrastructure management',
      'Strategic guidance for AWS Cloud Practitioner & Solutions Architect certifications',
      'Real-world cloud workflows and tips on building collegiate tech communities',
      'Speaker insights from AWS Cloud Captain Mayuresh Muluk',
    ],
    gallery: [
      '/assets/events/extracted_18.jpg',
      '/assets/events/extracted_08.jpg',
      '/assets/events/extracted_05.jpg',
      '/assets/events/extracted_07.jpg',
    ],
    coverImage: '/assets/events/extracted_18.jpg',
    discImage: '/assets/events/cloudcraft_disc_poster.jpg',
    hasCustomDiscArt: true,
    discPattern: 'horizon',
    palette: ['#071B34', '#E11D48', '#FECDD3'],
  },
  {
    id: 'power-bi',
    number: '06',
    title: 'Alumni Talk Series (Session 1): Power BI – Transforming Data into Insights',
    shortTitle: 'Power BI: Data to Insights',
    date: 'Friday, 6th March 2026',
    dateBadge: '06 MAR',
    time: '7:00 PM',
    venue: 'Online (Google Meet)',
    mode: 'Online',
    category: 'ALUMNI TALK',
    categoryBadgeColor: '#EAB308', // Power BI Golden Yellow
    speaker: {
      name: 'Ms. Nidhi Badwe',
      role: 'Technical Solution Consultant',
      organization: 'Hewlett Packard Enterprise (HPE)',
    },
    organizedWith: 'Department of Computer Engineering, NMIET, in association with ACES',
    coordinators: ['Prof. Rupali Kaldoke', 'Prof. Kavyashree H.N.'],
    description:
      'Opening session of Anubhav Sampada alumni series on data modeling, DAX queries, and enterprise dashboarding in Power BI.',
    detailedSummary:
      'As the opening session of "अनुभव संपदा" (Anubhav Sampada) – an Alumni Talk Series initiated by the Department of Computer Engineering – the chapter hosted a talk on "Power BI: Transforming Data into Insights", conducted online for students across all years. The session was delivered by alumna Ms. Nidhi Badwe, currently a Technical Solution Consultant at Hewlett Packard Enterprise (HPE), who shared her professional experience with data visualization and business intelligence tools.',
    highlights: [
      'Inaugural session of the "अनुभव संपदा" (Anubhav Sampada) Department Alumni Talk Series',
      'End-to-end data pipelines: ETL, data modeling, DAX calculations, and interactive dashboards',
      'Industry perspective on transforming unstructured data into executive decision metrics',
      'Career advice and tech transition insights from HPE Technical Solution Consultant Nidhi Badwe',
    ],
    gallery: [
      '/assets/events/extracted_19.jpg',
      '/assets/events/extracted_09.jpg',
      '/assets/events/extracted_04.jpg',
      '/assets/events/extracted_06.jpg',
    ],
    coverImage: '/assets/events/extracted_19.jpg',
    discImage: '/assets/events/powerbi_disc_poster.jpg',
    hasCustomDiscArt: true,
    discPattern: 'halftone',
    palette: ['#071B34', '#EAB308', '#FEF08A'],
  },
  {
    id: 'agile-talk',
    number: '07',
    title: 'Alumni Talk Series (Session 2): Agile – Shaping Modern Software Development',
    shortTitle: 'Agile in Modern Software',
    date: 'Saturday, 7th March 2026',
    dateBadge: '07 MAR',
    time: '6:00 PM',
    venue: 'Online (Google Meet)',
    mode: 'Online',
    category: 'ALUMNI TALK',
    categoryBadgeColor: '#0D9488', // Teal / Dark Cyan matching Agile artwork
    speaker: {
      name: 'Mr. Harshal Chavan',
      role: 'Software Engineer',
      organization: 'Equifax',
    },
    organizedWith: 'Department of Computer Engineering, NMIET, in association with ACES',
    coordinators: ['Prof. Rupali Kaldoke', 'Prof. Kirti Borhade'],
    description:
      'Second session of Anubhav Sampada exploring real-world Scrum sprints, collaborative development, and Agile culture at enterprise scale.',
    detailedSummary:
      'Continuing the "अनुभव संपदा" (Anubhav Sampada) Alumni Talk Series, the second session focused on "Agile: Shaping Modern Software Development", conducted online for the department\'s students. The talk was delivered by alumnus Mr. Harshal Chavan, a Software Engineer at Equifax, who shared how Agile methodologies are applied in real-world software teams, covering iterative development, collaboration practices, and how Agile thinking has come to shape modern software engineering culture.',
    highlights: [
      'Deep dive into Scrum ceremonies, user stories, retrospectives, and velocity metrics',
      'Real-world implementation of Agile software engineering in enterprise environments (Equifax)',
      'Cross-functional team collaboration, peer code reviews, and continuous delivery',
      'Direct alumni mentorship for 2nd, 3rd, and 4th-year computer engineering undergraduates',
    ],
    gallery: [
      '/assets/events/extracted_20.jpg',
      '/assets/events/extracted_06.jpg',
      '/assets/events/extracted_02.jpg',
      '/assets/events/extracted_09.jpg',
    ],
    coverImage: '/assets/events/extracted_20.jpg',
    discImage: '/assets/events/agile_disc_poster.jpg',
    hasCustomDiscArt: true,
    discPattern: 'stripes',
    palette: ['#071B34', '#0D9488', '#99F6E4'],
  },
  {
    id: 'backforge',
    number: '08',
    title: 'BackForge: Build the Brain Behind the Web',
    shortTitle: 'BackForge 2026',
    date: 'Friday, 17th April 2026',
    dateBadge: '17 APR',
    time: '8:30 AM onwards',
    venue: 'Auditorium (A-Wing) & Computing Labs, NMIET',
    mode: 'Offline (Inter-College)',
    category: 'COMPETITION',
    categoryBadgeColor: '#DB2777', // Vibrant Fuchsia / Hot Magenta matching BackForge artwork
    organizedWith: 'ACM NMIET Student Chapter & ACES',
    coordinators: ['Dr. Priyanka Halle', 'Prof. Nishant Parashar', 'Prof. Prachi Waghmare'],
    participants: '150 Students (53 Teams)',
    teams: '53 Teams from Pune Region',
    description:
      'Flagship inter-college backend engineering competition where 53 teams built dynamic backend architectures and APIs for pre-provided frontends.',
    detailedSummary:
      'The primary objective of BackForge was to challenge students to transition from static web design to dynamic backend development. The competition aimed to provide a realistic industry environment where participants could convert pre-built frontends into fully functional products. The execution was divided across several industry-oriented domains, including EdTech, FinTech, Agritech, Healthcare and Management tracks, where 53 teams competed for technical excellence. Following a rigorous Round 1 evaluation, top-performing teams such as Apex, Gear5th Coder, DevCore, and Data Dominators were shortlisted for the final implementation phase.',
    highlights: [
      '150 students across 53 competitive teams from premier Pune engineering institutes',
      '5 industry tracks: EdTech, FinTech, Agritech, Healthcare, and Management',
      'Judged by R&D Head Prof. Vilas Deotare and senior Computer Engineering professors',
      'Over ₹15,000+ cash prize pool and corporate goodies awarded to top technical architects',
    ],
    winners: [
      {
        rank: '1st Place (₹7,000)',
        team: 'Team DevCore',
        members: 'Prem Borde, Sujal Memane, Chhaya Dhanokar',
        college: 'NMIET',
        prize: '₹7,000',
      },
      {
        rank: '2nd Place (₹5,000)',
        team: 'Team Pixel Troop',
        members: 'Ashwin Dhanawade, Siddhant Choudhar',
        college: 'VIT Pune',
        prize: '₹5,000',
      },
      {
        rank: '3rd Place (₹3,000)',
        team: 'Team Stack Mate',
        members: 'Ashank Kanade, Akshada Sangale',
        college: 'NMIET',
        prize: '₹3,000',
      },
      {
        rank: 'Best Feature Implementation',
        team: 'Team Gear5th Coders',
        members: 'Dhiraj Zingare, Shivam Khade, Dipak Pote',
        college: 'MIT Alandi',
        prize: 'Goodies & Certificates',
      },
      {
        rank: 'Best Database Schema',
        team: 'Team Kafka',
        members: 'Darshan Choudhary, Sayali Mane',
        college: 'Govt. Polytechnic Pune',
        prize: 'Goodies & Certificates',
      },
    ],
    gallery: [
      '/assets/events/extracted_21.jpg',
      '/assets/events/extracted_22.jpg',
      '/assets/events/extracted_14.jpg',
      '/assets/events/extracted_13.jpg',
    ],
    coverImage: '/assets/events/extracted_21.jpg',
    discImage: '/assets/events/backforge_disc_poster.jpg',
    hasCustomDiscArt: true,
    discPattern: 'sunburst',
    palette: ['#071B34', '#DB2777', '#FCE7F3'],
  },
]
