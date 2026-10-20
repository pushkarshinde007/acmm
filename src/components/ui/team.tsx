"use client";
import { ExternalLink, Handshake } from "lucide-react";
import { Marquee } from "@/components/ui/marquee";

// Import All 11 Official Partner Banner Graphics
import gitBanner from "@/assets/partners/git_banner.png";
import meetupBanner from "@/assets/partners/meetup_banner.png";
import pocketfmBanner from "@/assets/partners/pocketfm_banner.png";
import slanglabsBanner from "@/assets/partners/slanglabs_banner.png";
import wisperflowBanner from "@/assets/partners/wisperflow_banner.png";
import invoiceflowBanner from "@/assets/partners/invoiceflow_banner.png";
import quintoxaBanner from "@/assets/partners/quintoxa_banner.png";
import intelBanner from "@/assets/partners/intel_banner.png";
import hasuraBanner from "@/assets/partners/hasura_banner.png";
import urbanmonkeyBanner from "@/assets/partners/urbanmonkey_banner.png";
import awsBanner from "@/assets/partners/aws_banner.png";

export interface PartnerItem {
  id: string;
  name: string;
  role: string;
  category: string;
  image: string;
  website: string;
  accentColor: string;
}

export const partnersData: PartnerItem[] = [
  {
    id: "git",
    name: "Git",
    role: "Distributed Version Control for Everyone",
    category: "Version Control",
    image: gitBanner,
    website: "https://git-scm.com/",
    accentColor: "#F05032",
  },
  {
    id: "meetup",
    name: "Meetup",
    role: "The People Platform for Real-World Connections",
    category: "Developer Community",
    image: meetupBanner,
    website: "https://www.meetup.com/",
    accentColor: "#F64060",
  },
  {
    id: "pocketfm",
    name: "Pocket FM",
    role: "Audio Series · Podcasts · Stories",
    category: "Digital Media",
    image: pocketfmBanner,
    website: "https://pocketfm.com/",
    accentColor: "#E50914",
  },
  {
    id: "slanglabs",
    name: "Slang Labs",
    role: "Build Multilingual AI Agents",
    category: "Voice AI",
    image: slanglabsBanner,
    website: "https://slanglabs.in/",
    accentColor: "#00D2FF",
  },
  {
    id: "wisperflow",
    name: "Wispr Flow",
    role: "Transcribe · Summarize · Automate",
    category: "Speech AI",
    image: wisperflowBanner,
    website: "https://wisprflow.ai/",
    accentColor: "#8B5CF6",
  },
  {
    id: "invoiceflow",
    name: "Invoice Flow",
    role: "Create · Manage · Get Paid · Smarter Invoicing",
    category: "FinTech Workflow",
    image: invoiceflowBanner,
    website: "https://invoiceflow.com/",
    accentColor: "#10B981",
  },
  {
    id: "quintoxa",
    name: "Quintoxa",
    role: "Build · Innovate · Scale",
    category: "Enterprise Cloud",
    image: quintoxaBanner,
    website: "https://quintoxa.com/",
    accentColor: "#6366F1",
  },
  {
    id: "intel",
    name: "Intel",
    role: "Powering a More Open World",
    category: "Hardware & HPC",
    image: intelBanner,
    website: "https://www.intel.com/",
    accentColor: "#00C7FD",
  },
  {
    id: "hasura",
    name: "Hasura",
    role: "The GraphQL Engine for Your Data",
    category: "Data & APIs",
    image: hasuraBanner,
    website: "https://hasura.io/",
    accentColor: "#1EB4D4",
  },
  {
    id: "urbanmonkey",
    name: "Urban Monkey",
    role: "Always in Play · Streetwear & Creative Culture",
    category: "Merch & Culture",
    image: urbanmonkeyBanner,
    website: "https://www.urbanmonkey.com/",
    accentColor: "#111111",
  },
  {
    id: "aws",
    name: "AWS",
    role: "Build Without Limits · Cloud Computing",
    category: "Cloud Infrastructure",
    image: awsBanner,
    website: "https://aws.amazon.com/",
    accentColor: "#FF9900",
  },
];

interface PartnersProps {
  id?: string;
  className?: string;
  partners?: PartnerItem[];
}

export default function PartnersComponent({
  id = "partners",
  className = "",
  partners = partnersData,
}: PartnersProps) {
  // Split into two complementary rows for dynamic dual-direction marquee
  const row1 = partners.slice(0, 6);
  const row2 = partners.slice(5).concat(partners.slice(0, 2));

  return (
    <section
      id={id}
      className={`relative w-full overflow-hidden bg-[#FAF7EF] py-16 md:py-24 border-t border-[#071B34]/10 scroll-mt-16 ${className}`}
    >
      {/* Background Architectural Accent Lines */}
      <div className="pointer-events-none select-none">
        <svg
          className="absolute right-0 bottom-0 text-[#071B34]/5"
          fill="none"
          height="154"
          viewBox="0 0 460 154"
          width="460"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_494_1104_partners)">
            <path
              d="M-87.463 458.432C-102.118 348.092 -77.3418 238.841 -15.0744 188.274C57.4129 129.408 180.708 150.071 351.748 341.128C278.246 -374.233 633.954 380.602 548.123 42.7707"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="40"
            />
          </g>
          <defs>
            <clipPath id="clip0_494_1104_partners">
              <rect fill="white" height="154" width="460" />
            </clipPath>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header Block */}
        <div className="mx-auto mb-14 sm:mb-16 flex max-w-4xl flex-col items-center px-4 sm:px-6 text-center lg:px-0">
          <div className="mb-4 sm:mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1457A6] text-white shadow-md shadow-[#1457A6]/20">
            <Handshake size={24} />
          </div>

          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#1457A6] mb-2">
            OFFICIAL ECOSYSTEM
          </span>

          <h2 className="relative mb-4 font-display font-black text-3xl text-[#071B34] tracking-tight sm:text-5xl">
            Industry & Ecosystem Partners
            <svg
              className="absolute -top-3 -right-6 -z-10 w-20 text-[#1457A6]/10"
              fill="currentColor"
              height="86"
              viewBox="0 0 108 86"
              width="108"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M38.8484 16.236L15 43.5793L78.2688 15L18.1218 71L93 34.1172L70.2047 65.2739"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="28"
              />
            </svg>
          </h2>

          <p className="max-w-2xl text-sm sm:text-base text-[#536273] font-medium leading-relaxed">
            Collaborating with global tech pioneers, open-source communities, and enterprise leaders to power hackathons, cloud labs, and hands-on career growth.
          </p>
        </div>

        {/* Dual-Direction Dynamic Marquee Wall */}
        <div className="relative w-full space-y-4 sm:space-y-6">
          {/* Left & Right Gradient Masks */}
          <div className="pointer-events-none absolute top-0 left-0 z-20 h-full w-20 sm:w-36 bg-gradient-to-r from-[#FAF7EF] via-[#FAF7EF]/80 to-transparent" />
          <div className="pointer-events-none absolute top-0 right-0 z-20 h-full w-20 sm:w-36 bg-gradient-to-l from-[#FAF7EF] via-[#FAF7EF]/80 to-transparent" />

          {/* Row 1: Forward Marquee */}
          <Marquee className="[--gap:1.5rem]" pauseOnHover>
            {row1.map((partner) => (
              <a
                key={`row1-${partner.id}`}
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                title={`Visit ${partner.name} official website`}
                className="group flex w-[330px] sm:w-[410px] shrink-0 flex-col rounded-2xl bg-white p-2.5 sm:p-3 border border-[#071B34]/10 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 focus:outline-none focus:ring-2 focus:ring-[#1457A6]"
              >
                {/* Official Banner Container */}
                <div className="relative h-[92px] sm:h-[105px] w-full overflow-hidden rounded-xl bg-[#071B34]/5 shadow-inner">
                  <img
                    alt={`${partner.name} Official Banner`}
                    src={partner.image}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  {/* Category Pill Tag */}
                  <div className="absolute top-2 right-2 bg-black/75 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10 text-[9px] font-mono font-bold text-white tracking-wider">
                    {partner.category}
                  </div>
                </div>

                {/* Bottom Info Bar with Live External Redirect Indicator */}
                <div className="w-full pt-2.5 pb-0.5 px-1 flex items-center justify-between">
                  <div className="flex flex-col text-left">
                    <h3 className="font-display font-bold text-sm sm:text-base text-[#071B34] group-hover:text-[#1457A6] transition-colors flex items-center gap-1.5">
                      {partner.name}
                      <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#1457A6]" />
                    </h3>
                    <p className="text-[11px] sm:text-xs font-medium text-[#536273] line-clamp-1">
                      {partner.role}
                    </p>
                  </div>

                  <span className="shrink-0 text-[11px] font-mono font-bold text-[#1457A6] group-hover:underline">
                    Visit ↗
                  </span>
                </div>
              </a>
            ))}
          </Marquee>

          {/* Row 2: Reverse Marquee */}
          <Marquee className="[--gap:1.5rem]" reverse pauseOnHover>
            {row2.map((partner) => (
              <a
                key={`row2-${partner.id}`}
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                title={`Visit ${partner.name} official website`}
                className="group flex w-[330px] sm:w-[410px] shrink-0 flex-col rounded-2xl bg-white p-2.5 sm:p-3 border border-[#071B34]/10 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 focus:outline-none focus:ring-2 focus:ring-[#1457A6]"
              >
                {/* Official Banner Container */}
                <div className="relative h-[92px] sm:h-[105px] w-full overflow-hidden rounded-xl bg-[#071B34]/5 shadow-inner">
                  <img
                    alt={`${partner.name} Official Banner`}
                    src={partner.image}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  {/* Category Pill Tag */}
                  <div className="absolute top-2 right-2 bg-black/75 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10 text-[9px] font-mono font-bold text-white tracking-wider">
                    {partner.category}
                  </div>
                </div>

                {/* Bottom Info Bar with Live External Redirect Indicator */}
                <div className="w-full pt-2.5 pb-0.5 px-1 flex items-center justify-between">
                  <div className="flex flex-col text-left">
                    <h3 className="font-display font-bold text-sm sm:text-base text-[#071B34] group-hover:text-[#1457A6] transition-colors flex items-center gap-1.5">
                      {partner.name}
                      <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#1457A6]" />
                    </h3>
                    <p className="text-[11px] sm:text-xs font-medium text-[#536273] line-clamp-1">
                      {partner.role}
                    </p>
                  </div>

                  <span className="shrink-0 text-[11px] font-mono font-bold text-[#1457A6] group-hover:underline">
                    Visit ↗
                  </span>
                </div>
              </a>
            ))}
          </Marquee>
        </div>

        {/* Partnership Endorsement Statement */}
        <div className="mx-auto mt-16 sm:mt-20 max-w-3xl px-4 sm:px-6 text-center lg:px-0">
          <p className="mb-6 font-display font-bold text-base sm:text-lg text-[#071B34] leading-relaxed">
            “Our strategic partnerships with global tech leaders and developer platforms provide our students with industry-standard cloud resources, direct mentorship, and inter-collegiate technical exposure.”
          </p>
          <div className="flex flex-col items-center gap-2">
            <span className="font-display font-bold text-sm text-[#071B34]">
              Dr. Priyanka Halle
            </span>
            <span className="text-xs font-mono uppercase tracking-wider text-[#536273]">
              Faculty Sponsor · ACM NMIET Student Chapter
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
