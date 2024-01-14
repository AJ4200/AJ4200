// Data definition for a project
interface Project {
  image: string; // Path to the project image
  title: string;
  description: string;
  techStack: string[]; // Array of technologies used
  link: string; // Project link
  sourceCode: string; // Link to the source code
}

// Sample data for projects
const projects: Project[] = [
  {
    image: "/imgs/die.png",
    title: "DiE-ALOUGE",
    description:
      "Survive the harbinger of death in a halloween special developed by aj4200. powered by GPT-3.5 the travel will write in blood to the harbinger to try and survive his decptive ways that will lead  the traveler to death.",
    techStack: ["GPT3.5", "NextJS", "Prisma", "MongoDB"],
    link: "https://project1.com",
    sourceCode: "https://github.com/yourusername/project1",
  },
  {
    image: "/imgs/csb.png",
    title: "Code Shifter",
    description: "Description for Project 2.",
    techStack: ["NextJS", "GPT4", "Tailwind","CodeMirror"],
    link: "https://project2.com",
    sourceCode: "https://github.com/yourusername/project2",
  },
  {
    image: "/imgs/gsw.png",
    title: "GWS Inc.",
    description: "Description for Project 2.",
    techStack: ["Tech4", "Tech5", "Tech6"],
    link: "https://project2.com",
    sourceCode: "https://github.com/yourusername/project2",
  },
  {
    image: "/imgs/hdfplayer.png",
    title: "HDFPlayer",
    description: "Description for Project 2.",
    techStack: ["Tech4", "Tech5", "Tech6"],
    link: "https://project2.com",
    sourceCode: "https://github.com/yourusername/project2",
  },
  {
    image: "/imgs/ttp.png",
    title: "TicTacTwo",
    description: "Description for Project 2.",
    techStack: ["Tech4", "Tech5", "Tech6"],
    link: "https://project2.com",
    sourceCode: "https://github.com/yourusername/project2",
  },
  {
    image: "/imgs/Appoflex.png",
    title: "AppoFlex",
    description: "Description for Project 2.",
    techStack: ["Tech4", "Tech5", "Tech6"],
    link: "https://project2.com",
    sourceCode: "https://github.com/yourusername/project2",
  },
  {
    image: "/imgs/Portyfolio.png",
    title: "Portyfolio",
    description: "Description for Project 2.",
    techStack: ["Tech4", "Tech5", "Tech6"],
    link: "https://project2.com",
    sourceCode: "https://github.com/yourusername/project2",
  },
  {
    image: "/imgs/CommonFunLib.png",
    title: "CommonFunLib",
    description: "Description for Project 2.",
    techStack: ["Tech4", "Tech5", "Tech6"],
    link: "https://project2.com",
    sourceCode: "https://github.com/yourusername/project2",
  },
  {
    image: "/imgs/TeslaResume.png",
    title: "VK's Resume",
    description: "Description for Project 2.",
    techStack: ["Tech4", "Tech5", "Tech6"],
    link: "https://project2.com",
    sourceCode: "https://github.com/yourusername/project2",
  },
  {
    image: "/imgs/TimeWhere.png",
    title: "Time Where",
    description: "Description for Project 2.",
    techStack: ["Tech4", "Tech5", "Tech6"],
    link: "https://project2.com",
    sourceCode: "https://github.com/yourusername/project2",
  },
  {
    image: "/imgs/taskme.png",
    title: "Task.Me",
    description: "Description for Project 2.",
    techStack: ["Tech4", "Tech5", "Tech6"],
    link: "https://project2.com",
    sourceCode: "https://github.com/yourusername/project2",
  },
];

export default projects;
