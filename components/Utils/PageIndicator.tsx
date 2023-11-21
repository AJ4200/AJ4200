import { motion } from "framer-motion";
import React from "react";

interface PageIndictorProps {
  route: string;
  bgcolor: string;
}

const PageIndictor: React.FC<PageIndictorProps> = ({ route, bgcolor }) => {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      className="fixed w-full h-full"
      style={{ backgroundColor: bgcolor }}
    >
      <span className="text-center text-5xl">{route}</span>
    </motion.div>
  );
};
