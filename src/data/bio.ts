export interface SocialLinks {
  linkedin?: string;
  github?: string;
}

export interface Skill {
  name: string;
  proficiency: number;
}

export interface Skillset {
  title: string;
  skills: Skill[];
}

export interface BioData {
  name: string;
  age: number;
  occupation: string;
  description: string;
  imageUrl: string;
  hobbies: string[];
  socialLinks: SocialLinks;
  email: string;
}

const skillsets: Skillset[] = [
  {
    title: "Frontend Technologies",
    skills: [
      { name: "React", proficiency: 90 },
      { name: "Next.js", proficiency: 80 },
      // Add other frontend skills with proficiency percentages
    ],
  },
  {
    title: "Backend Technologies",
    skills: [
      { name: "Node.js", proficiency: 85 },
      { name: "Express", proficiency: 75 },
      // Add other backend skills with proficiency percentages
    ],
  },
  {
    title: "Other Skills",
    skills: [
      { name: "Git", proficiency: 95 },
      { name: "Docker", proficiency: 70 },
      // Add other skills with proficiency percentages
    ],
  },
];

const bioData: BioData = {
  name: "Abel Majadibodu",
  age: 24,
  occupation: "Full Stack Developer",
  description: "Passionate about coding and creating awesome web applications.",
  imageUrl:
    "https://media.licdn.com/dms/image/D4D03AQEMxn0mchBygw/profile-displayphoto-shrink_800_800/0/1675420423236?e=1707350400&v=beta&t=iYRT7EsVckdoic7bUIfZE_7flt0vE-fRBRCYjm872Po",
  hobbies: ["Coding", "Reading", "Gaming"],
  socialLinks: {
    linkedin: "https://www.linkedin.com/in/abel-majadibodu-5a0583193",
    github: "https://github.com/aj4200",
  },
  email: "abeljackson33@gmail.com",
};

export { bioData, skillsets };
