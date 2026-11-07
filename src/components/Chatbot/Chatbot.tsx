"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import AccessibilityToggle, {
  type ChatAccessibilitySettings,
} from "./AccessibilityToggle";
import Chat from "./Chat";
import FloatingBot from "./FloatingBot";

const defaultSettings: ChatAccessibilitySettings = {
  readableFont: false,
  largeText: false,
  highContrast: false,
  reduceMotion: false,
};

const Chatbot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [accessibilityOpen, setAccessibilityOpen] = useState(false);
  const [settings, setSettings] =
    useState<ChatAccessibilitySettings>(defaultSettings);
  const restoreFocus = useRef(false);
  const accessibilityRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  const launcherRef = useCallback((element: HTMLButtonElement | null) => {
    if (element && restoreFocus.current) {
      restoreFocus.current = false;
      element.focus();
    }
  }, []);

  const closeChat = useCallback(() => {
    restoreFocus.current = true;
    setOpen(false);
  }, []);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("nootbot-accessibility");
      if (saved) {
        setSettings({
          ...defaultSettings,
          ...(JSON.parse(saved) as Partial<ChatAccessibilitySettings>),
        });
      }
    } catch {
      try {
        window.localStorage.removeItem("nootbot-accessibility");
      } catch {
        // Storage may be blocked by the visitor's browser settings.
      }
    }
  }, []);

  const updateSettings = (next: ChatAccessibilitySettings) => {
    setSettings(next);
    try {
      window.localStorage.setItem("nootbot-accessibility", JSON.stringify(next));
    } catch {
      // The controls still work for this session when storage is unavailable.
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (accessibilityOpen) {
          setAccessibilityOpen(false);
          accessibilityRef.current?.focus();
        } else if (open) {
          closeChat();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, accessibilityOpen, closeChat]);

  return (
    <div className={`chatbot-root ${settings.reduceMotion ? "is-reduced-motion" : ""}`}>
      <AnimatePresence mode="wait">
        {open ? (
          <motion.div
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="chatbot-window"
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            key="chat"
            transition={{ duration: reduceMotion || settings.reduceMotion ? 0 : 0.2 }}
          >
            <Chat onClose={closeChat} settings={settings} />
          </motion.div>
        ) : (
          <motion.div
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="chatbot-launcher-wrap"
            exit={{ opacity: 0, scale: 0.9, y: 8 }}
            initial={{ opacity: 0, scale: 0.9, y: 8 }}
            key="launcher"
            transition={{ duration: reduceMotion || settings.reduceMotion ? 0 : 0.22 }}
          >
            <FloatingBot
              expanded={false}
              onClick={() => setOpen(true)}
              ref={launcherRef}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <AccessibilityToggle
        chatOpen={open}
        onChange={updateSettings}
        onOpenChange={setAccessibilityOpen}
        open={accessibilityOpen}
        settings={settings}
        triggerRef={accessibilityRef}
      />
    </div>
  );
};

export default Chatbot;
