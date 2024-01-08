import { useState } from "react";
import { workExperienceData } from "@/data/experience";
import React from "react";
import ExperienceCard from "./Experience/ExperienceCard";
import { FaDrupal } from "react-icons/fa";
import { motion } from "framer-motion";

const Experience: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % workExperienceData.length);
  };

  const goToPrevCard = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? workExperienceData.length - 1 : prevIndex - 1,
    );
  };

  return (
    <div className="w-full">
      <h2 className="c my-4 text-center text-2xl font-bold">
        Work Experience
      </h2>
      <div className="flex flex-row justify-between w-full">
        <ExperienceCard experience={workExperienceData[currentIndex]} />
        <div className="flex flex-col items-center justify-between backdrop-blur-sm border border-[var(--neon)]">
          <motion.button
            className="text-darkshadow px-4 py-2 text-6xl text-[var(--neon)]"
            onClick={goToPrevCard}
            whileHover={{ scale: 1.2 }}
            animate={{ scale: 1 }}
          >
            <FaDrupal />
          </motion.button>
          <div className="my-2 h-16 w-1 bg-[var(--neon)]"></div>
          <motion.button
            className="text-darkshadow rotate-180 px-4 py-2 text-6xl text-[var(--neon)]"
            onClick={goToNextCard}
            whileHover={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            initial={{rotate : "180deg"}}
          >
            <FaDrupal />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Experience;
