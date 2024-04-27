import { motion } from "framer-motion";
import React, { ReactNode } from "react";

interface ClickAnimationProps {
}

const ClickAnimation: React.FC<ClickAnimationProps> = ({ ...props }) => {
  return (
    <motion.div whileTap={{ scale: 1.1 }} {...props}/>

  );
};
export default ClickAnimation;
