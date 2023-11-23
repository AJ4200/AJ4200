import { motion } from "framer-motion";
import React from "react";

interface PageIndictorProps {
  route: string;
  TextColor: string;
}

const PageIndictor: React.FC<PageIndictorProps> = ({ route, TextColor }) => {
  return (
    <motion.div
      className="fixed bottom-0 pointer-events-none"
    >
      <span className={`${TextColor} text-center text-7xl w-full opacity-50`}>
        {route}
      </span>
    </motion.div>
  );
};

export default PageIndictor;


