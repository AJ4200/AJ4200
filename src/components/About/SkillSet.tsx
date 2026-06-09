import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Skill {
  name: string;
  proficiency: number; // Use a value between 0 and 100 for the percentage
}

interface Skillset {
  title: string;
  skills: Skill[];
}

interface SkillsetSectionProps {
  skillsets: Skillset[];
}

const SkillsetSection: React.FC<SkillsetSectionProps> = ({ skillsets }) => {
   const renderRadialProgressBar = (percentage: number) => {
    const strokeWidth = 7;
    const radius = 13;
    const circumference = 2 * Math.PI * radius;

    const progress = circumference - (percentage / 100) * circumference;

    return (
      <motion.svg
        height="40"
        width="40"
        className="mr-2"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.circle
          strokeWidth={strokeWidth}
          fill="var(--neon)"
          r={radius}
          cx="20"
          cy="20"
          stroke="black"
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset: progress }}
        />
      </motion.svg>
    );
  };

  return (
    <motion.div
      className="w-full p-6 flex flex-col "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-2xl font-bold mb-4 text-right text-white text-darkshadow">Skillset</h2>
      <div className="flex items-stretch w-full">
        {skillsets.map((skillset, index) => (
          <AnimatePresence key={index}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="bg-red-950 p-4 rounded-md w-full m-1 hover:bg-red-950/70 transition-colors"
            >
              <h3 className="text-lg font-semibold mb-2 text-white/80 text-darkshadow text-center">{skillset.title}</h3>
              <ul className="list-disc list-inside">
                {skillset.skills.map((skill, skillIndex) => (
                  <motion.li
                    key={skillIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex items-center "
                  >
                    {renderRadialProgressBar(skill.proficiency)}
                    <div className="flex justify-between w-[85%] text-outline">
                      <span className="font-semibold">{skill.name}</span>
                      <span className="ml-1 text-black bg-[var(--neon)] rounded-full ">{`${skill.proficiency}%`}</span>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        ))}
      </div>
    </motion.div>
  );
};

export default SkillsetSection;
