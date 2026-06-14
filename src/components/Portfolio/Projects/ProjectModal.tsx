import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FaExternalLinkAlt, FaGithub, FaTimes } from "react-icons/fa";
import type Project from "@/datadef/project";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [isMounted, setIsMounted] = useState(false);
  const isLive = Boolean(project.link) && !project.link.includes("project2.com");
  const description = project.description.startsWith("Description for Project")
    ? "This build is part of the project archive. Its expanded case-study notes are still being prepared."
    : project.description;

  useEffect(() => {
    setIsMounted(true);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isMounted) {
    return null;
  }

  return createPortal(
    <motion.div
      animate={{ opacity: 1 }}
      aria-label={`${project.title} project details`}
      aria-modal="true"
      className="project-modal-backdrop"
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) {
          onClose();
        }
      }}
      role="dialog"
    >
      <motion.article
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="project-modal"
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ duration: 0.28 }}
      >
        <button
          aria-label="Close project details"
          autoFocus
          className="project-modal-close"
          onClick={onClose}
          type="button"
        >
          <FaTimes />
        </button>

        <div className="project-modal-image">
          <Image
            alt={`${project.title} preview`}
            className="object-cover"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            src={project.image}
          />
          <div />
        </div>

        <div className="project-modal-copy">
          <span>Project case file</span>
          <h2>{project.title}</h2>
          <p>{description}</p>
          <div className="project-tech">
            {project.techStack.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
          <div className="project-modal-links">
            {isLive && (
              <a href={project.link} rel="noopener noreferrer" target="_blank">
                <FaExternalLinkAlt />
                Launch project
              </a>
            )}
            {isLive && project.sourceCode && (
              <a
                href={project.sourceCode}
                rel="noopener noreferrer"
                target="_blank"
              >
                <FaGithub />
                View source
              </a>
            )}
          </div>
        </div>
      </motion.article>
    </motion.div>,
    document.body,
  );
};

export default ProjectModal;
