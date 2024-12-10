import { useMemo } from "react";

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  hiddenLink?: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Katy Lam",
    role: "Team Lead",
    bio: "",
    hiddenLink: "",
    image: "/assets/page_images/team-members/katy.png",
  },
  {
    name: "Arizza Cristobal",
    role: "Scrum Master",
    bio: "Click my name!",
    hiddenLink: "https://tracker.gg/valorant/profile/riot/rizzabears%23NA1/overview",
    image: "assets/page_images/team-members/arizza.png",
  },
  {
    name: "Kullathon “Mos” Sitthisarnwattanachai",
    role: "Git Master",
    bio: "I like Oreos and the United States Permanent Residence card.",
    hiddenLink: "https://www.uscis.gov/green-card",
    image: "assets/page_images/team-members/mos.png",
  },
  {
    name: "Arjun Singh Gill",
    role: "Back-end",
    bio: "",
    hiddenLink: "",
    image: "assets/page_images/team-members/arjun.jpg",
  },
  {
    name: "Matthew Weesner",
    role: "Back-end",
    bio: "",
    hiddenLink: "",
    image: "assets/page_images/team-members/matt.png",
  },
  {
    name: "Niko Galedo",
    role: "Front-end",
    bio: "",
    hiddenLink: "",
    image: "assets/page_images/team-members/niko.png",
  },
  {
    name: "Kevin Lam",
    role: "Front-end",
    bio: "erm what the sigma!",
    hiddenLink: "assets/images/team-members/amogus.png",
    image: "assets/page_images/team-members/kevin.png",
  },
];

export const useTeamAccordion = () => {
  return useMemo(() => teamMembers, []);
};
