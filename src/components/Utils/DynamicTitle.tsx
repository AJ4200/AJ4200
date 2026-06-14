import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const titles = [
  "Software Engineer",
  "Frontend Developer",
  "UI Designer",
  "Full Stack Developer",
  "Game Developer",
  "Backend Developer",
  "AI Integration Builder",
];

const DynamicTitle: React.FC = () => {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCurrentTitleIndex((current) => (current + 1) % titles.length);
    }, 3200);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <span
      aria-live="polite"
      className="grid min-h-[1.2em] grid-cols-[1fr_auto] items-center gap-4 overflow-hidden"
    >
      <span className="relative block min-h-[1.2em] overflow-hidden">
        <AnimatePresence initial={false} mode="wait">
          <motion.span
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            className="absolute inset-x-0 top-0 block text-indigo-300"
            exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            key={titles[currentTitleIndex]}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            {titles[currentTitleIndex]}
          </motion.span>
        </AnimatePresence>
      </span>

      <span className="text-[0.6rem] font-normal tracking-[0.2em] text-white/35">
        {String(currentTitleIndex + 1).padStart(2, "0")} /{" "}
        {String(titles.length).padStart(2, "0")}
      </span>
    </span>
  );
};

export default DynamicTitle;
