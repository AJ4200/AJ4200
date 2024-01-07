import { WorkExperience } from "@/data/experience";
import React from "react";
import { FaMapMarkerAlt, FaRegClock, FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";

interface ExperienceCardProps {
  experience: WorkExperience;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience }) => {
  return (
    <motion.div
      className="m-1 border border-[var(--neon)] bg-gray-500/25 p-4 shadow-lg backdrop-blur-sm hover:bg-lime-600/50 hover:w-full transition-all duration-500"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h3 className="text-shadow-theme mb-2 text-lg font-semibold">
        <FaCheck className="mr-2 text-[var(--neon)]" />
        {experience.jobTitle}
      </h3>
      <p className="mb-2 text-sm">{experience.company}</p>
      <div className="mb-2 flex items-center text-xs">
        <FaMapMarkerAlt className="mr-1" />
        {`Location: ${experience.location}`}
      </div>
      <div className="mb-2 flex items-center text-xs">
        <FaRegClock className="mr-1" />
        {`Start Date: ${experience.startDate}`}
      </div>
      {experience.endDate && (
        <div className="mb-2 flex items-center text-xs">
          <FaRegClock className="mr-1" />
          {`End Date: ${experience.endDate}`}
        </div>
      )}
      <div className="experience-details">
        <p className="mb-2 text-sm">{experience.description}</p>
        <ul className="list-inside list-disc">
          {experience.responsibilities.map((responsibility, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="flex items-center text-xs"
            >
              <FaCheck className="mr-1" />
              {responsibility}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default ExperienceCard;
