import Project from "@/datadef/project";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FiGithub, FiExternalLink } from "react-icons/fi";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const techStackVariants = {
    hover: {
      scale: 1.1,
      transition: { duration: 0.3 },
      backgroundColor: "var(--transparent)",
    },
  };
  const iconVariants = {
    hover: {
      scale: 1.2,
      transition: { duration: 0.3 },
      color: "var(--neon)",
    },
  };
  return (
    <div className="fixed inset-0 z-10 flex h-full w-full items-center justify-center backdrop-blur ">
      <div className="w-[50%] ">
        <div className="border border-[var(--neon)] bg-lime-500/30 p-8 shadow-lg backdrop-blur-3xl">
          <div className="flex items-center justify-between">
            <h2 className="text-shadow-theme text-2xl font-bold">
              {project.title}
            </h2>
            <div className="flex space-x-1">
              <motion.a
                href={project.sourceCode}
                target="_blank"
                className="transition-colors"
                rel="noopener noreferrer"
                whileHover="hover"
                variants={iconVariants}
              >
                <FiGithub size={32} />
              </motion.a>
              <motion.a
                href={project.link}
                target="_blank"
                className="transition-colors"
                rel="noopener noreferrer"
                whileHover="hover"
                variants={iconVariants}
              >
                <FiExternalLink size={32} />
              </motion.a>
            </div>
            <ul className="ml-1 flex  w-full">
              {project.techStack.map((tech) => (
                <motion.li
                  className="lime-grad-bg transtion-colors mx-1 px-1 py-1 hover:bg-transparent "
                  key={tech}
                  whileHover="hover"
                  variants={techStackVariants}
                >
                  {tech}
                </motion.li>
              ))}
            </ul>
            <FaTimes
              onClick={onClose}
              className="absolute right-0 top-0  border-b border-l border-[var(--neon)] p-2 transition-all delay-75 hover:scale-110 hover:text-[var(--neon)] active:scale-75"
              size={40}
            />
          </div>
          <div className="mt-4">
            <p className="hover:bg-black hover:text-[var(--neon)]">
              {project.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
