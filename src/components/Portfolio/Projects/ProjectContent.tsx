import { FaArrowRight, FaGithub, FaGlobe } from "react-icons/fa";
import type Project from "@/datadef/project";

interface ProjectContentProps {
  project: Project;
  index: number;
  total: number;
  onOpenDetails: () => void;
}

const hasLiveProject = (link: string) =>
  Boolean(link) && !link.includes("project2.com");

const projectDescription = (description: string) =>
  description.startsWith("Description for Project")
    ? "This build is part of the project archive. Its expanded case-study notes are still being prepared."
    : description;

const ProjectContent: React.FC<ProjectContentProps> = ({
  project,
  index,
  total,
  onOpenDetails,
}) => {
  const isLive = hasLiveProject(project.link);

  return (
    <div className="project-content">
      <div className="project-content-body">
        <div className="project-content-meta">
          <span className="text-[0.58rem] uppercase tracking-[0.22em] text-lime-300">
            Project {String(index + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </span>
          <span
            className={`project-status ${isLive ? "is-live" : "is-archive"}`}
          >
            {isLive ? "Live build" : "Archive entry"}
          </span>
        </div>

        <h3>{project.title}</h3>
        <p>{projectDescription(project.description)}</p>

        <div className="project-tech">
          {project.techStack.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
      </div>

      <div className="project-actions">
        {isLive ? (
          <a href={project.link} rel="noopener noreferrer" target="_blank">
            <FaGlobe />
            Open project
          </a>
        ) : (
          <span className="project-action-muted">
            <FaGlobe />
            Preview unavailable
          </span>
        )}
        {isLive && project.sourceCode && (
          <a
            className="project-action-secondary"
            href={project.sourceCode}
            rel="noopener noreferrer"
            target="_blank"
          >
            <FaGithub />
            Source
          </a>
        )}
        <button onClick={onOpenDetails} type="button">
          Full case file
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default ProjectContent;
