interface WorkExperience {
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string; // Use optional chaining if the job is ongoing
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
  // Add more work experiences as needed
];

export { workExperienceData };
export type { WorkExperience };
