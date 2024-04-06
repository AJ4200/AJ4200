// VolumeControl.tsx
import React, { useState, useRef } from "react";
import { FaVolumeUp, FaVolumeDown, FaVolumeOff } from "react-icons/fa";
import { motion } from "framer-motion";

interface VolumeControlProps {
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

const VolumeControl: React.FC<VolumeControlProps> = ({ audioRef }) => {
  const [volume, setVolume] = useState<number>(50);
  const [mute, setMute] = useState(false);

  const handleMute = () => {
    setMute(!mute);
    if (audioRef.current) {
      audioRef.current.muted = mute;
    }
  };
  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  const getVolumeColor = () => {
    return volume > 70
      ? "text-green-500 transition-colors"
      : volume > 30
        ? "text-yellow-500 transition-colors"
        : volume > 0
          ? "text-red-500 transition-colors"
          : "text-gray-500 transition-colors";
  };

  return (
    <div
      className={`volume-control m-1 flex items-center space-x-2 p-2 backdrop-blur-sm  ${getVolumeColor()}`}
    >
      <div className="relative">
        <motion.div
          className="volume-knob flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-red-500/20"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            onClick={handleMute}
            className="inner-knob h-6 w-6 rounded-full bg-white"
            style={{
              background: `conic-gradient(var(--neon) ${volume}%, transparent ${volume}%)`,
              transition: "background 0.3s ease-in-out",
            }}
          ></motion.div>
        </motion.div>
      </div>

      {volume >= 0 && (
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => handleVolumeChange(Number(e.target.value))}
          className={`volume-slider ${getVolumeColor()}`}
        />
      )}

      {volume > 70 ? (
        <FaVolumeUp className={getVolumeColor()} />
      ) : volume > 30 ? (
        <FaVolumeDown className={getVolumeColor()} />
      ) : volume > 0 ? (
        <FaVolumeDown className={getVolumeColor()} />
      ) : (
        <FaVolumeOff className={getVolumeColor()} />
      )}
    </div>
  );
};

export default VolumeControl;
