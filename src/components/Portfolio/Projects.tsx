import React, { useEffect, useState } from "react";
import Splide from "@splidejs/splide";
import projects from "../../data/projects";
import ProjectContent from "./Projects/ProjectContent";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import classnames from "classnames";

const Projects: React.FC = () => {
  const [currentProject, setCurrentProject] = useState(0);

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <div className="flex h-[50vh] w-[80%] flex-row justify-center space-x-4">
      <motion.button
        className={classnames(
          "bg-lime-500/50 text-[var(--neon)] backdrop-blur-sm",
          " border border-[var(--neon)] p-5 transition-colors delay-100 hover:bg-[var(--neon)]",
        )}
        onClick={prevProject}
        whileTap={{ scale: 0.8 }}
        whileHover={{
          scale: 1.2,
          opacity: 0.7,
        }}
      >
        <FaChevronLeft />
      </motion.button>
      <ul className="h-full border border-[var(--neon)] w-full">
        <li className="flex h-full space-x-2">
          <Image
            width={400}
            height={300}
            src={projects[currentProject].image}
            alt={projects[currentProject].title}
          />
          <ProjectContent
            title={projects[currentProject].title}
            description={projects[currentProject].description}
            techStack={projects[currentProject].techStack as []}
            link={projects[currentProject].link}
            sourceCode={projects[currentProject].sourceCode}
          />
        </li>
      </ul>
      <motion.button
        className={classnames(
          "bg-lime-500/50  text-[var(--neon)] backdrop-blur-sm",
          " border border-[var(--neon)] p-5 transition-colors delay-100 hover:bg-[var(--neon)]",
        )}
        onClick={nextProject}
        whileTap={{ scale: 0.8 }}
        whileHover={{
          scale: 1.2,
          opacity: 0.7,
        }}
      >
        <FaChevronRight />
      </motion.button>
    </div>
  );
};

export default Projects;
