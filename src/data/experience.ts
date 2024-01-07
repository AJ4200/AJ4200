interface WorkExperience {
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string; 
  description: string;
  responsibilities: string[];
}

const workExperienceData: WorkExperience[] = [
  {
    jobTitle: "Full Stack Developer",
    company: "Tech Co.",
    location: "Cityville, USA",
    startDate: "2020-01-01",
    endDate: "2022-06-30",
    description:
      "Worked on various web development projects using Next.js, TypeScript, and Tailwind CSS.",
    responsibilities: [
      "Developed and maintained frontend and backend components.",
      "Collaborated with cross-functional teams for project implementation.",
      "Optimized application performance and improved user experience.",
    ],
  },
  {
    jobTitle: "Senior Full Stack Developer",
    company: "Innovate Tech",
    location: "Techland, USA",
    startDate: "2022-07-01",
    endDate: "2023-12-31",
    description:
      "Led a team in developing cutting-edge applications using Next.js, TypeScript, and Tailwind CSS.",
    responsibilities: [
      "Designed and implemented scalable and maintainable solutions.",
      "Mentored junior developers in best practices and coding standards.",
      "Participated in code reviews and provided constructive feedback.",
    ],
  },
  {
    jobTitle: "Lead Software Engineer",
    company: "Future Solutions",
    location: "Digitopolis, USA",
    startDate: "2024-01-01",
    endDate: "2024-12-31", // Use optional chaining if the job is ongoing
    description:
      "Driving innovation and excellence in software development with a focus on Next.js, TypeScript, and Tailwind CSS.",
    responsibilities: [
      "Architecting robust and scalable solutions for complex requirements.",
      "Collaborating with stakeholders to gather and refine project requirements.",
      "Continuously researching and implementing the latest industry best practices.",
    ],
  },
  {
    jobTitle: "Freelance Full Stack Developer",
    company: "Self-Employed",
    location: "Remote",
    startDate: "2023-01-01",
    description:
      "Providing tailored web development solutions to clients using Next.js, TypeScript, and Tailwind CSS.",
    responsibilities: [
      "Working closely with clients to understand and fulfill their unique project needs.",
      "Delivering high-quality code on time and within budget.",
      "Ensuring optimal performance and responsiveness of client applications.",
    ],
  },
  // Add more work experiences as needed
];

export { workExperienceData };
export type { WorkExperience };
