"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Chat from "./Chat";
import FloatingBot from "./FloatingBot";

const Chatbot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const closeChat = () => {
    setOpen(false);
    window.setTimeout(() => triggerRef.current?.focus(), 0);
  };

  return (
    <div className="chatbot-root">
      <AnimatePresence mode="wait">
        {open ? (
          <motion.div
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="chatbot-window"
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            key="chat"
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
          >
            <Chat onClose={closeChat} />
          </motion.div>
        ) : (
          <motion.div
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="chatbot-launcher-wrap"
            exit={{ opacity: 0, scale: 0.9, y: 8 }}
            initial={{ opacity: 0, scale: 0.9, y: 8 }}
            key="launcher"
            transition={{ duration: reduceMotion ? 0 : 0.22 }}
          >
            <FloatingBot
              expanded={false}
              onClick={() => setOpen(true)}
              ref={triggerRef}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;
