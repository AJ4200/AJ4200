import { motion } from "framer-motion";
import React from "react";

interface PageIndictorProps {
  route: string;
  TextColor: string;
}

const PageIndictor: React.FC<PageIndictorProps> = ({ route, TextColor }) => {
  return (
    <motion.div
      className="fixed top-1/2"
    >
      <span className={`${TextColor} text-center text-8xl w-full`}>
        {route}
      </span>
    </motion.div>
  );
};

export default PageIndictor;


