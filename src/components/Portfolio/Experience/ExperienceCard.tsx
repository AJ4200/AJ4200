import { motion } from "framer-motion";
import {
  FaBuilding,
  FaCalendarAlt,
  FaCheck,
  FaMapMarkerAlt,
} from "react-icons/fa";
import type { WorkExperience } from "@/data/experience";

interface ExperienceCardProps {
  experience: WorkExperience;
  number: number;
  total: number;
}

const formatDate = (value?: string) => {
  if (!value) {
    return "Present";
  }

  const [year, month] = value.split("-");
  const date = new Date(Number(year), Number(month) - 1);
  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
  }).format(date);
};

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  experience,
  number,
  total,
}) => {
  return (
    <motion.article
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      initial={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.3 }}
    >
      <div className="experience-card-index">
        <span>Record</span>
        <strong>
          {String(number).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </strong>
      </div>

      <h3>{experience.jobTitle}</h3>
      <div className="experience-meta">
        <span>
          <FaBuilding />
          {experience.company}
        </span>
        <span>
          <FaMapMarkerAlt />
          {experience.location}
        </span>
        <span>
          <FaCalendarAlt />
          {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
        </span>
      </div>

      <p className="experience-description">{experience.description}</p>

      <div className="experience-responsibilities">
        <span>Selected responsibilities</span>
        <ul>
          {experience.responsibilities.map((responsibility, index) => (
            <motion.li
              animate={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -12 }}
              key={responsibility}
              transition={{ delay: 0.08 + index * 0.06 }}
            >
              <FaCheck />
              {responsibility}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
};

export default ExperienceCard;
