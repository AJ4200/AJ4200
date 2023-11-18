import React, { useEffect } from "react";
import { motion } from "framer-motion";

const titles = [
  "Software Engineer",
  "Frontend Developer",
  "UI Designer",
  "Full Stack Developer",
  "Game Developer"
];

const DynamicTitle: React.FC = () => {
  const [currentTitleIndex, setCurrentTitleIndex] = React.useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 7000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <motion.span
      key={currentTitleIndex} // Add this line
      animate={{
        opacity: [0, 1, 1, 0],
        transition: { duration: 7, ease: "easeInOut" },
      }}
          initial={{ opacity: 0 }}
    
    >
      {titles[currentTitleIndex]}
    </motion.span>
  );
};

export default DynamicTitle;
