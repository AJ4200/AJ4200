import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaExpandAlt } from "react-icons/fa";
import projects from "@/data/projects";
import ProjectContent from "./Projects/ProjectContent";
import ProjectModal from "./Projects/ProjectModal";

const Projects: React.FC = () => {
  const [currentProject, setCurrentProject] = useState(0);
  const [direction, setDirection] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const activeThumbnailRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    activeThumbnailRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [currentProject]);

  const selectProject = (index: number) => {
    setDirection(index > currentProject ? 1 : -1);
    setCurrentProject(index);
  };

  const moveProject = (step: number) => {
    setDirection(step);
    setCurrentProject(
      (current) => (current + step + projects.length) % projects.length,
    );
  };

  const project = projects[currentProject];
  const previousIndex =
    (currentProject - 1 + projects.length) % projects.length;
  const nextIndex = (currentProject + 1) % projects.length;

  return (
    <section className="py-14 lg:py-20">
      <div className="mb-10 grid gap-5 lg:grid-cols-[0.8fr_1fr] lg:items-end">
        <div>
          <span className="portfolio-kicker">01 / Selected builds</span>
          <h2 className="portfolio-section-title">
            Project
            <span>carousel.</span>
          </h2>
        </div>
        <div className="max-w-2xl lg:justify-self-end">
          <p className="text-sm leading-7 text-white/50">
            Products, experiments, utilities, and playful ideas. Move through
            the reel to see what each build was trying to solve and how it was
            put together.
          </p>
          <div className="mt-4 flex items-center gap-3 text-[0.58rem] uppercase tracking-[0.2em] text-lime-300">
            <span>{String(currentProject + 1).padStart(2, "0")}</span>
            <div className="h-px flex-1 bg-white/10">
              <motion.div
                animate={{
                  width: `${((currentProject + 1) / projects.length) * 100}%`,
                }}
                className="h-px bg-lime-300"
              />
            </div>
            <span>{String(projects.length).padStart(2, "0")}</span>
          </div>
        </div>
      </div>

      <div className="project-reel">
        <button
          aria-label={`View ${projects[previousIndex].title}`}
          className="project-peek project-peek-left"
          onClick={() => moveProject(-1)}
          type="button"
        >
          <Image
            alt=""
            className="object-cover"
            fill
            sizes="18vw"
            src={projects[previousIndex].image}
          />
          <span>{projects[previousIndex].title}</span>
        </button>

        <div className="project-feature">
          <AnimatePresence custom={direction} initial={false} mode="wait">
            <motion.article
              animate={{ opacity: 1, x: 0, scale: 1 }}
              className="project-slide"
              custom={direction}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.08}
              exit={{
                opacity: 0,
                x: direction > 0 ? -80 : 80,
                scale: 0.98,
              }}
              initial={{
                opacity: 0,
                x: direction > 0 ? 80 : -80,
                scale: 0.98,
              }}
              key={project.title}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) {
                  moveProject(1);
                } else if (info.offset.x > 60) {
                  moveProject(-1);
                }
              }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="project-visual group">
                <Image
                  alt={`${project.title} project preview`}
                  className="object-cover transition duration-700 group-hover:scale-[1.03]"
                  fill
                  priority={currentProject === 0}
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  src={project.image}
                />
                <div className="project-visual-shade" />
                <div className="project-visual-index">
                  <span>Case file</span>
                  <strong>{String(currentProject + 1).padStart(2, "0")}</strong>
                </div>
                <div className="project-visual-caption">
                  <span>Featured build</span>
                  <strong>{project.title}</strong>
                </div>
                <button
                  aria-label={`Open ${project.title} details`}
                  className="project-expand"
                  onClick={() => setShowModal(true)}
                  type="button"
                >
                  <FaExpandAlt />
                  Inspect
                </button>
              </div>

              <ProjectContent
                index={currentProject}
                onOpenDetails={() => setShowModal(true)}
                project={project}
                total={projects.length}
              />
            </motion.article>
          </AnimatePresence>

          <button
            aria-label="Previous project"
            className="project-arrow project-arrow-left"
            onClick={() => moveProject(-1)}
            type="button"
          >
            <FaArrowLeft />
          </button>
          <button
            aria-label="Next project"
            className="project-arrow project-arrow-right"
            onClick={() => moveProject(1)}
            type="button"
          >
            <FaArrowRight />
          </button>

          <div className="project-swipe-hint">
            <span>Drag or swipe</span>
            <i />
          </div>
        </div>

        <button
          aria-label={`View ${projects[nextIndex].title}`}
          className="project-peek project-peek-right"
          onClick={() => moveProject(1)}
          type="button"
        >
          <Image
            alt=""
            className="object-cover"
            fill
            sizes="18vw"
            src={projects[nextIndex].image}
          />
          <span>{projects[nextIndex].title}</span>
        </button>
      </div>

      <div className="project-thumbnails" aria-label="Choose a project">
        {projects.map((item, index) => (
          <button
            aria-label={`View ${item.title}`}
            aria-pressed={currentProject === index}
            className={currentProject === index ? "is-active" : ""}
            key={`${item.title}-${index}`}
            onClick={() => selectProject(index)}
            ref={currentProject === index ? activeThumbnailRef : undefined}
            type="button"
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <Image
              alt=""
              className="object-cover"
              fill
              sizes="100px"
              src={item.image}
            />
            <strong>{item.title}</strong>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {showModal && (
          <ProjectModal
            onClose={() => setShowModal(false)}
            project={project}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
