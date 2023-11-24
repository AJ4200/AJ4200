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
    image: "imgs/die.png",
    title: "Project 1",
    description: "Description for Project 1.",
    techStack: ["Tech1", "Tech2", "Tech3"],
    link: "https://project1.com",
    sourceCode: "https://github.com/yourusername/project1",
  },
  {
    image: "imgs/csb.png",
    title: "Project 2",
    description: "Description for Project 2.",
    techStack: ["Tech4", "Tech5", "Tech6"],
    link: "https://project2.com",
    sourceCode: "https://github.com/yourusername/project2",
  },
  {
    image: "imgs/gsw.png",
    title: "Project 2",
    description: "Description for Project 2.",
    techStack: ["Tech4", "Tech5", "Tech6"],
    link: "https://project2.com",
    sourceCode: "https://github.com/yourusername/project2",
  },
];

export default projects;
