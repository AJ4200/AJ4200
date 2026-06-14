import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaArrowDown, FaBriefcase, FaMapMarkerAlt } from "react-icons/fa";
import { workExperienceData } from "@/data/experience";
import ExperienceCard from "./Experience/ExperienceCard";

const yearFromDate = (date: string) => date.slice(0, 4);

const experiences = [...workExperienceData].sort((a, b) =>
  b.startDate.localeCompare(a.startDate),
);

const Experience: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <section className="py-14 lg:py-20">
      <div className="mb-12 grid gap-5 lg:grid-cols-[0.8fr_1fr] lg:items-end">
        <div>
          <span className="portfolio-kicker">02 / Career record</span>
          <h2 className="portfolio-section-title">
            Experience
            <span>timeline.</span>
          </h2>
        </div>
        <p className="max-w-2xl text-sm leading-7 text-white/50 lg:justify-self-end">
          A chronological map of roles, responsibilities, and the progression
          from implementation toward ownership. Select any milestone to open
          its full work record.
        </p>
      </div>

      <div className="experience-layout">
        <div aria-label="Career milestones" className="experience-timeline">
          {experiences.map((experience, index) => {
            const isActive = currentIndex === index;

            return (
              <motion.button
                aria-pressed={isActive}
                className={isActive ? "is-active" : ""}
                key={`${experience.company}-${experience.startDate}`}
                onClick={() => setCurrentIndex(index)}
                type="button"
                whileHover={{ x: 4 }}
              >
                <span className="experience-node">
                  <i />
                </span>
                <span className="experience-year">
                  {yearFromDate(experience.startDate)}
                </span>
                <span className="experience-summary">
                  <strong>{experience.jobTitle}</strong>
                  <small>{experience.company}</small>
                </span>
                <FaArrowDown />
              </motion.button>
            );
          })}
        </div>

        <div className="experience-dossier">
          <div className="experience-dossier-topline">
            <span>
              <FaBriefcase />
              Role dossier
            </span>
            <span>
              <FaMapMarkerAlt />
              {experiences[currentIndex].location}
            </span>
          </div>
          <AnimatePresence mode="wait">
            <ExperienceCard
              experience={experiences[currentIndex]}
              key={`${experiences[currentIndex].company}-${currentIndex}`}
              number={currentIndex + 1}
              total={experiences.length}
            />
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Experience;
