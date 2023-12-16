import React from "react";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";

interface ProjectContentProps {
  title: string;
  description: string;
  techStack: string[];
  link: string;
  sourceCode: string;
}

const ProjectContent: React.FC<ProjectContentProps> = ({
  title,
  description,
  link,
  sourceCode,
  techStack,
}) => {
  const iconVariants = {
    hover: { scale: 1.2, transition: { duration: 0.3 }, color: "var(--neon)" },
  };

  const buttonVariants = {
    hover: { scale: 1.1, transition: { duration: 0.3 } },
  };

  const techStackVariants = {
    hover: { scale: 1.1, transition: { duration: 0.3 }, backgroundColor :"var(--transparent)"},
  };
  const descriptionVariants = {
    hover: {
      scale: 1.1,
      transition: { duration: 0.3 },
      backgroundColor: "black",
    },
  };
  return (
    <section className="flex flex-col justify-between bg-lime-500/25 backdrop-blur-md w-full text-darkshadow">
      <div>
          <div className="flex mx-4 mt-4 mb-1 justify-between">
        <h1 className="text-2xl font-bold transition-colors hover:text-[var(--neon)] text-darkshadow ">
          {title}
        </h1>
        <div className="flex space-x-1">
          <motion.a
            href={sourceCode}
            target="_blank"
            className="transition-colors"
            rel="noopener noreferrer"
            whileHover="hover"
            variants={iconVariants}
          >
            <FiGithub size={24} />
          </motion.a>
          <motion.a
            href={link}
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
      <ul className="flex w-[50%] ml-1">
        {techStack.map((tech) => (
          <motion.li
            className="lime-grad-bg mx-1 px-1 py-1 transtion-colors hover:bg-transparent"
            key={tech}
            whileHover="hover"
            variants={techStackVariants}
          >
            {tech}
          </motion.li>
        ))}
      </ul>
      <motion.p
        className="transition-colors hover:text-[var(--neon)] text-sm flex-wrap m-2"
        whileHover="hover"
        variants={descriptionVariants}
      >
        {description}
      </motion.p>
      </div>
      <motion.button
        className="lime-grad-bg"
        whileHover="hover"
        variants={buttonVariants}
      >
        More Details
      </motion.button>
    </section>
  );
};

export default ProjectContent;
