import React from "react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";

const Game: React.FC = () => {
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
  };

  const textVariants = {
    hover: { scale: 1.1, transition: { duration: 0.3 } },
  };

  const linkVariants = {
    hover: { color: "#FF9900", transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
          variants={containerVariants}
          className="mx-4 flex flex-col items-center"
    >
      <span className="font-bold text-white/90  text-darkoutline text-2xl text-end">
        Favorite Game
      </span>
      <motion.img
        src="/imgs/370408.png"
        className="mt-4 text-center rounded-md md:w-[60%] max-w-[80%] z-[99]"
        alt="Favorite Game"
        whileHover={{ scale: 1.1 }}
      />
      <motion.span
        className="text-indigo-500 mt-4"
        variants={textVariants}
        whileHover="hover"
      >
        Check Out My Modpack{" "}
        <motion.a
          href="#"
          className="text-indigo-300 underline font-semibold"
          variants={linkVariants}
          whileHover="hover"
        >
          Here! <FaExternalLinkAlt className="inline-block ml-1" />
        </motion.a>
      </motion.span>
    </motion.div>
  );
};

export default Game;
