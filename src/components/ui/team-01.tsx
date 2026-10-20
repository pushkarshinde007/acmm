"use client";
import { Badge } from "@/components/ui/badge";
import { Globe } from "lucide-react";
import { motion } from "framer-motion";

import member01 from "@/assets/team/member_01.jpg";
import member02 from "@/assets/team/member_02.jpg";
import member03 from "@/assets/team/member_03.jpg";
import member04 from "@/assets/team/member_04.jpg";

const LinkedinIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip-linkedin-team01)">
      <path
        d="M13.633 13.633h-2.37V9.92c0-.885-.017-2.025-1.234-2.025-1.235 0-1.424.965-1.424 1.96v3.778h-2.37V5.998H8.51v1.043h.031a2.5 2.5 0 0 1 2.246-1.233c2.403 0 2.846 1.58 2.846 3.637zM3.56 4.954a1.376 1.376 0 1 1 0-2.751 1.376 1.376 0 0 1 0 2.751m1.185 8.679H2.372V5.998h2.373zM14.815.001H1.18A1.17 1.17 0 0 0 0 1.154v13.691A1.17 1.17 0 0 0 1.18 16h13.635A1.17 1.17 0 0 0 16 14.845V1.153A1.17 1.17 0 0 0 14.815 0"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="clip-linkedin-team01">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export type TeamMember = {
  name: string;
  role: string;
  image: string;
  socials: {
    website: string;
    linkedin: string;
  };
};

export const defaultTeamData: TeamMember[] = [
  {
    name: "Pushkar Shinde",
    role: "Chapter Lead & Webmaster",
    image: member01,
    socials: {
      website: "#",
      linkedin: "#",
    },
  },
  {
    name: "Omkar Kadam",
    role: "Technical Head & Lead Architect",
    image: member02,
    socials: {
      website: "#",
      linkedin: "#",
    },
  },
  {
    name: "Yash Patil",
    role: "Vice Chair & Operations Lead",
    image: member03,
    socials: {
      website: "#",
      linkedin: "#",
    },
  },
  {
    name: "Tushar Kumar",
    role: "Design Lead & Community Manager",
    image: member04,
    socials: {
      website: "#",
      linkedin: "#",
    },
  },
];

interface TeamProps {
  id?: string;
  className?: string;
  badgeText?: string;
  title?: string;
  members?: TeamMember[];
}

export const Team = ({
  id = "team",
  className = "",
  badgeText = "Team",
  title = "Meet the creative minds behind our success",
  members = defaultTeamData,
}: TeamProps) => {
  return (
    <section id={id} className={`scroll-mt-16 w-full bg-[#FAF7EF] ${className}`}>
      <div className="lg:py-20 sm:py-16 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-16 flex flex-col items-center justify-center gap-8 md:gap-14">
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className="max-w-xl mx-auto flex flex-col items-center justify-center text-center gap-3.5"
          >
            <Badge
              variant="outline"
              className="px-3 py-1 h-auto text-xs font-mono font-bold uppercase tracking-wider text-[#1457A6] border-[#1457A6]/30 bg-[#1457A6]/5"
            >
              {badgeText}
            </Badge>
            <h2 className="text-3xl md:text-5xl font-display font-black text-[#071B34] tracking-tight">
              {title}
            </h2>
            <p className="text-sm sm:text-base text-[#536273] font-medium max-w-md">
              ACM NMIET Student Chapter office bearers, student leaders, and mentors dedicated to advancing computing innovation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 w-full">
            {members?.map((value, index) => {
              return (
                <motion.div
                  key={index}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.1,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  }}
                  className="group flex flex-col items-center justify-center gap-4 bg-white p-4 rounded-2xl border border-[#071B34]/10 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="w-full aspect-[3/4] rounded-xl overflow-hidden bg-[#071B34]/5 shadow-inner">
                    <img
                      className="w-full h-full object-cover object-top group-hover:scale-105 group-hover:grayscale transition-all duration-500"
                      src={value.image}
                      alt={value.name}
                      loading="lazy"
                    />
                  </div>
                  <div className="w-full flex flex-col gap-3 items-center justify-center text-center">
                    <div className="flex flex-col items-center justify-center gap-1">
                      <h3 className="text-xl font-display font-bold text-[#071B34]">
                        {value.name}
                      </h3>
                      <p className="text-xs sm:text-sm font-medium text-[#536273]">
                        {value.role}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={value.socials.website}
                        className="p-2 text-[#536273] hover:text-[#1457A6] hover:bg-[#1457A6]/10 rounded-full transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${value.name} Website`}
                      >
                        <Globe size={16} />
                      </a>
                      <a
                        href={value.socials.linkedin}
                        className="p-2 text-[#536273] hover:text-[#1457A6] hover:bg-[#1457A6]/10 rounded-full transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${value.name} LinkedIn`}
                      >
                        <LinkedinIcon size={16} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
