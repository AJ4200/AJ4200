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
      <span className="text-darkoutline text-end  text-2xl font-bold text-white/90">
        Favorite Game
      </span>
      <motion.img
        src="/imgs/370408.png"
        className="z-[99] mt-4 max-w-[80%] rounded-md text-center md:w-[60%]"
        alt="Favorite Game"
        whileHover={{ scale: 1.1 }}
      />
      <motion.span
        className="mt-4 text-indigo-500"
        variants={textVariants}
        whileHover="hover"
      >
        Check Out My Modpack{" "}
        <motion.a
          href="https://classic.minecraft.net"
          className="font-semibold text-indigo-300 underline"
          variants={linkVariants}
          whileHover="hover"
        >
          Here! <FaExternalLinkAlt className="ml-1 inline-block" />
        </motion.a>
      </motion.span>
    </motion.div>
  );
};

export default Game;
