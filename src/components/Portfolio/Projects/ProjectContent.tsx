import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import Project from "@/datadef/project";
import ProjectModal from "./ProjectModal";

interface ProjectContentProps {
  project: Project;
}

const ProjectContent: React.FC<ProjectContentProps> = ({ project }) => {
  const iconVariants = {
    hover: { scale: 1.2, transition: { duration: 0.3 }, color: "var(--neon)" },
  };

  const buttonVariants = {
    hover: { scale: 1.1, transition: { duration: 0.3 } },
  };

  const techStackVariants = {
    hover: {
      scale: 1.1,
      transition: { duration: 0.3 },
      backgroundColor: "var(--transparent)",
    },
  };
  const descriptionVariants = {
    hover: {
      scale: 1.1,
      transition: { duration: 0.3 },
      backgroundColor: "black",
    },
  };
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <>
      {" "}
      <section className="text-darkshadow flex w-full flex-col justify-between border border-[var(--neon)] bg-lime-500/25 backdrop-blur-md">
        <div>
          <div className="mx-4 mb-1 mt-4 flex justify-between ">
            <div className="overflow-hidden ">
              {" "}
              <ul className="scrolling-text ml-1 flex  w-full">
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
            </div>
            <div className="flex space-x-1">
              <motion.a
                href={project.sourceCode}
                target="_blank"
                className="transition-colors"
                rel="noopener noreferrer"
                whileHover="hover"
                variants={iconVariants}
              >
                <FiGithub size={24} />
              </motion.a>
              <motion.a
                href={project.link}
                target="_blank"
                className="transition-colors"
                rel="noopener noreferrer"
                whileHover="hover"
                variants={iconVariants}
              >
                <FiExternalLink size={24} />
              </motion.a>
            </div>
          </div>

          <motion.p
            className="m-2 line-clamp-[10] flex-wrap text-sm transition-colors hover:line-clamp-none hover:text-[var(--neon)]"
            whileHover="hover"
            variants={descriptionVariants}
          >
            {project.description}
          </motion.p>
        </div>
        <motion.button
          className="lime-grad-bg"
          whileHover="hover"
          variants={buttonVariants}
          onClick={openModal}
        >
          More Details
        </motion.button>
      </section>{" "}
      {showModal && <ProjectModal project={project} onClose={closeModal} />}
    </>
  );
};

export default ProjectContent;
