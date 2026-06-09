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
      { name: "Vercel", proficiency: 70 },
      { name: "TailwindCSS", proficiency: 80 },
      { name: "Framer-motion", proficiency: 75 },
    ],
  },
  {
    title: "Backend Technologies",
    skills: [
      { name: "Node.js", proficiency: 85 },
      { name: "Express", proficiency: 75 },
      { name: "Ruby on Rails", proficiency: 60 },
      { name: "Java Spring", proficiency: 80 },
      { name: "MongoDB", proficiency: 70 },
      { name: "PostgreSQL", proficiency: 90 },
    ],
  },
  {
    title: "Other Skills",
    skills: [
      { name: "Git", proficiency: 95 },
      { name: "Docker", proficiency: 70 },
      { name: "Modding", proficiency: 80 },
      { name: "AI Intergration", proficiency: 90 },
      { name: "PyScripting", proficiency: 70 },
    ],
  },
];

const bioData: BioData = {
  name: "Abel Majadibodu",
  age: 24,
  occupation: "Software Engineer",
  description:
    "I love coding and creating cool web apps, and I dabble in some hobbies on the side too.",
  imageUrl:
    "https://lh3.googleusercontent.com/a/ACg8ocId0xAQI199zuW2rcB1ssJXKWb44O8hlpAu5yF-8xUB114vPUd4UA=s288-c-no",
  hobbies: ["Coding", "Production", "Gaming"],
  socialLinks: {
    linkedin: "https://www.linkedin.com/in/abel-majadibodu-5a0583193",
    github: "https://github.com/aj4200",
  },
  email: "abeljackson33@gmail.com",
};

export { bioData, skillsets };
