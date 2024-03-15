import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface SeekProgressBarProps {
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

const SeekProgressBar: React.FC<SeekProgressBarProps> = ({ audioRef }) => {
  const [progress, setProgress] = useState<number>(0);
  const [isSeeking, setIsSeeking] = useState<boolean>(false);

  useEffect(() => {
    const updateProgress = () => {
      console.log("Updating progress...");
      if (audioRef.current) {
        const percentage =
          (audioRef.current.currentTime / audioRef.current.duration) * 100;
        setProgress(percentage);
      }
    };

    const handleSeeking = () => {
      console.log("Seeking...");
      setIsSeeking(true);
    };

    const handleSeeked = () => {
      console.log("Seeked...");
      setIsSeeking(false);
    };

    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", updateProgress);
      audioRef.current.addEventListener("seeking", handleSeeking);
      audioRef.current.addEventListener("seeked", handleSeeked);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", updateProgress);
        audioRef.current.removeEventListener("seeking", handleSeeking);
        audioRef.current.removeEventListener("seeked", handleSeeked);
      }
    };
  }, [audioRef]);

  const handleSeek = (newProgress: number) => {
    if (audioRef.current) {
      const newTime = (newProgress / 100) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
    }
  };

  return (
    <div className="seek-progress-bar m-2 flex w-full items-center space-x-2 p-2 backdrop-blur-sm">
      <motion.div
        className="seek-bar flex h-4 w-full cursor-pointer items-center justify-center bg-red-500/20"
        onClick={(e) => {
          const newProgress =
            (e.nativeEvent.offsetX / e.currentTarget.offsetWidth) * 100;
          handleSeek(newProgress);
        }}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          className="seek-fill flex  h-2 justify-start bg-[var(--neon)]"
          style={{
            width: isSeeking ? "auto" : `${progress}%`,
            left: isSeeking ? "0" : "0%",
            right: isSeeking ? "0" : "auto",
            transition: isSeeking ? "none" : "width 0.3s ease-in-out",
          }}
        />
      </motion.div>
    </div>
  );
};

export default SeekProgressBar;
