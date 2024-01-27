import React, { useState } from "react";
import { FaFont } from "react-icons/fa";
import { motion } from "framer-motion";
import { getFont } from "@/lib/navbarUtils";

interface toggle
{ 
  route: string;
}

const AccessibilityToggle:React.FC<toggle> = ({route}) => {
  const [isSansMode, setIsSansMode] = useState(false);

  const toggleAccessibilityMode = () => {
    setIsSansMode((prevMode) => !prevMode);

    // Toggle the font family based on the current mode
    document.body.style.fontFamily = isSansMode ? getFont(route) : "sans-serif";
  };

  return (
    <motion.button
      onClick={toggleAccessibilityMode}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {isSansMode ? (
        <FaFont className="rounded-full backdrop-blur-lg shadow-xl border border-[var(--neon)] text-2xl  text-[var(--neon)]" />
      ) : (
        <FaFont className="text-2xl text-[var(--neon)]" />
      )}
    </motion.button>
  );
};

export default AccessibilityToggle;
