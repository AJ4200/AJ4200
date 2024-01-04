import { motion, useAnimation } from "framer-motion";
import React, { useEffect } from "react";

interface PageIndicatorProps {
  route: string;
  TextColor: string;
}

const PageIndicator: React.FC<PageIndicatorProps> = ({ route, TextColor }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      scale: 1,
      rotate: [0, -10, 10, -5, 5, 0],
      transition: { duration: 0.5 },
    });
  }, [controls]);

  return (
    <motion.div
      className="pointer-events-none fixed bottom-0"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={controls}
    >
      <span className={`${TextColor} w-full text-center text-7xl opacity-50`}>
        {route}
      </span>
    </motion.div>
  );
};

export default PageIndicator;
