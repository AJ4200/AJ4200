import Project from "@/datadef/project";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  return (
    <div className="fixed inset-0 z-10 flex h-full w-full items-center justify-center bg-lime-500/25 ">
      <div className="w-[50%] translate-x-[-50%]">
        <img src={project.image} className=" aspect-video" />
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">{project.title}</h2>

            <FaTimes onClick={onClose} className="lime-shadow" />
          </div>
          <div className="mt-4">
            <p className="text-gray-700">{project.description}</p>
            <ul className="mt-4 space-y-2">
              {project.techStack.map((tech: any, index: number) => (
                <li key={index} className="flex items-center space-x-2">
                  <span className="text-gray-600">{tech.name}</span>
                  <span className="text-gray-500">{tech.version}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Visit Website
              </a>
              {project.sourceCode && (
                <a
                  href={project.sourceCode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-4 text-blue-600 hover:underline"
                >
                  Source Code
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
