import React, { useState, useRef } from "react";
import {
  FaPlay,
  FaPause,
  FaStop,
  FaStepBackward,
  FaStepForward,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import VolumeControl from "./Knob";
import playlist, { Song } from "@/data/playlist";

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentSong = playlist[currentSongIndex];

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const handlePrevious = () => {
    const newIndex =
      currentSongIndex - 1 < 0 ? playlist.length - 1 : currentSongIndex - 1;
    setCurrentSongIndex(newIndex);
    if (audioRef.current) {
      audioRef.current.src = playlist[newIndex].url;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  };

  const handleNext = () => {
    const newIndex = (currentSongIndex + 1) % playlist.length;
    setCurrentSongIndex(newIndex);
    if (audioRef.current) {
      audioRef.current.src = playlist[newIndex].url;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  };

  const handlePlaylistItemClick = (index: number) => {
    setCurrentSongIndex(index);
    if (audioRef.current) {
      audioRef.current.src = playlist[index].url;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  };

  return (
    <motion.div
      className="text-shadow flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <span className="mb-4 w-full text-center text-4xl">Music Prod.</span>
      <div className="flex flex-row justify-between">
        <motion.div
          className="m-4 flex flex-col items-center bg-black/20 p-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
        >
          <span className="text-darkoutline text-xl text-slate-400">
            MPlayer
          </span>
          <img
            className="w-40 shadow-2xl"
            src={currentSong?.albumArt}
            alt="Album Art"
          />
          <span className="text-outline text-lg">{currentSong?.title}</span>
          <VolumeControl audioRef={audioRef} />
          <div
            className="text-darkoutline flex justify-center space-x-4 p-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              className="border border-[var(--neon)] bg-blue-500/20 p-2 text-white"
              onClick={isPlaying ? handlePause : handlePlay}
            >
              {isPlaying ? <FaPause /> : <FaPlay />}{" "}
              {isPlaying ? "Pause" : "Play"}
            </button>
            <button
              className="border border-[var(--neon)] bg-red-500/20 p-2 text-white"
              onClick={handleStop}
            >
              <FaStop /> Stop
            </button>
            <button
              className="border border-[var(--neon)] bg-yellow-500/20 p-4 text-white"
              onClick={handlePrevious}
            >
              <FaStepBackward /> Previous
            </button>
            <button
              className="border border-[var(--neon)] bg-purple-500/20 p-4 text-white"
              onClick={handleNext}
            >
              <FaStepForward /> Next
            </button>
          </div>
        </motion.div>

        <motion.div
          className="m-4 flex w-full flex-col items-center bg-black/20 p-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
        >
          <span className="text-darkoutline text-xl text-slate-400">
            Playlist
          </span>
          <ul className="playlist music-marker p-4">
            {playlist.map((song: Song, index: number) => (
              <AnimatePresence key={index}>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className={`music-marker p-[1px] ${
                    index === currentSongIndex ? "bg-[var(--neon)]" : ""
                  }`}
                  onClick={() => handlePlaylistItemClick(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {song.title}
                </motion.li>
              </AnimatePresence>
            ))}
          </ul>
        </motion.div>
      </div>
      <audio ref={audioRef} src={currentSong?.url} />
    </motion.div>
  );
};

export default MusicPlayer;
