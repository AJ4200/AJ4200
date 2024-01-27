import React, { useState } from "react";
import { motion } from "framer-motion";
import FloatingBot from "./FloatingBot";
import Chat from "./Chat";

const Chatbot: React.FC = () => {
  const [chatToggle, setChatToggle] = useState(false);

  const handleChatToggle = () => {
    setChatToggle(!chatToggle);
  };

  const botVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
    exit: { scale: 0, opacity: 0, transition: { duration: 0.5 } },
  };

  const chatVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
    exit: { scale: 0, opacity: 0, transition: { duration: 0.5 } },
  };

  return (
    <div>
      {chatToggle ? (
        <motion.div
          variants={chatVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Chat onClose={handleChatToggle} />
        </motion.div>
      ) : (
        <motion.div
          variants={botVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed bottom-4 right-4"
        >
          <FloatingBot onClick={handleChatToggle} />
        </motion.div>
      )}
    </div>
  );
};

export default Chatbot;
