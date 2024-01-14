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
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const selectProject = (index: number) => {
    setCurrentProject(index);
    setActiveProjectIndex(index);
  };

  return (
    <>
      <h1 className="text-shadow-theme my-4 text-center text-2xl font-bold">
        Projects Completed
      </h1>
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
        <div>
          <ul className="h-full w-full border border-[var(--neon)]">
            <li className="flex h-full w-full space-x-2">
              <div className="flex flex-col items-center">
                <Image
                  width={800}
                  height={600}
                  src={projects[currentProject].image}
                  alt={projects[currentProject].title}
                />
                <p className="text-darkshadow mt-4 flex h-full w-full items-center justify-center border border-[var(--neon)] bg-lime-500/50 text-5xl font-bold backdrop-blur-sm transition-colors hover:text-[var(--neon)]">
                  {projects[currentProject].title}
                </p>
              </div>

              <ProjectContent
                title={projects[currentProject].title}
                description={projects[currentProject].description}
                techStack={projects[currentProject].techStack as []}
                link={projects[currentProject].link}
                sourceCode={projects[currentProject].sourceCode}
              />
            </li>
          </ul>
          <div className="my-2 flex space-x-2 border border-[var(--neon)] bg-lime-500/50 backdrop-blur-sm">
            {projects.map((project, index) => (
              <motion.button
                key={index}
                className={classnames("border-4 border-transparent", {
                  "border-[var(--neon)]": index === activeProjectIndex,
                })}
                onClick={() => selectProject(index)}
                whileTap={{ scale: 0.8 }}
                whileHover={{
                  scale: 1.2,
                  opacity: 0.7,
                }}
              >
                <Image
                  width={64}
                  height={64}
                  src={project.image}
                  alt={project.title}
                />
              </motion.button>
            ))}
          </div>
        </div>
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
    </>
  );
};

export default Projects;
