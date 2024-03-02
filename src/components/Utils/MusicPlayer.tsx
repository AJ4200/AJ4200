import React, { useState, useRef, useEffect } from "react";
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
import Bars from "./Bars";
import SeekProgressBar from "./SeekProgressBar";

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
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


  useEffect(() => {
    const handleSongEnded = () => {
      // Check if it's the last song
     
      if (currentSongIndex === playlist.length - 1) {
        // Stop playback when the last song ends
        handleStop();
      } else {
        // Load and play the next song
        handleNext();
      }
    };

    if (audioRef.current) {
      audioRef.current.addEventListener("ended", handleSongEnded);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", handleSongEnded);
      }
    };
  }, [audioRef, handleNext, handleStop, currentSongIndex, playlist]);

  return (
    <motion.div
      className="text-shadow flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <span className="w-full text-center text-4xl">Music Prod.</span>
      <div className="flex flex-row justify-between">
        <motion.div
          className="m-4 flex flex-col items-center rounded-md bg-black/20 p-4 shadow-2xl"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
        >
          <span className="text-darkoutline mb-2 text-xl text-slate-400">
            MPlayer
          </span>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative h-full w-max items-center" // Add relative positioning
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <Bars isplaying={isPlaying} />
            </div>

            <img
              className="w-40 shadow-2xl"
              src={currentSong?.albumArt}
              alt="Album Art"
            />
          </motion.div>

          <motion.span
            className="text-outline text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {currentSong?.title}
          </motion.span>
          <SeekProgressBar audioRef={audioRef} />
          <VolumeControl audioRef={audioRef} />
          <div className="text-darkoutline flex justify-center space-x-4 p-4 h-24">
            <motion.button
              className="border border-[var(--neon)] bg-blue-500/20 p-2 text-white"
              onClick={isPlaying ? handlePause : handlePlay}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isPlaying ? <FaPause /> : <FaPlay />}{" "}
              {isPlaying ? "Pause" : "Play"}
            </motion.button>
            <motion.button
              className="border border-[var(--neon)] bg-red-500/20 p-2 text-white"
              onClick={handleStop}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaStop /> Stop
            </motion.button>
            <motion.button
              className="border border-[var(--neon)] bg-yellow-500/20 p-4 text-white"
              onClick={handlePrevious}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaStepBackward /> Previous
            </motion.button>
            <motion.button
              className="border border-[var(--neon)] bg-purple-500/20 p-4 text-white"
              onClick={handleNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaStepForward /> Next
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          className="m-4 flex w-full flex-col items-center rounded-md bg-black/20 p-4 shadow-2xl"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
        >
          <span className="text-darkoutline text-xl text-slate-400">
            Playlist
          </span>
          <ul className="music-marker flex w-full flex-col items-center p-4">
            {playlist.map((song: Song, index: number) => (
              <AnimatePresence key={index}>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className={`music-marker w-4/5 p-[1px] text-center ${
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
      <audio ref={audioRef} src={currentSong?.url} autoPlay={true} />
    </motion.div>
  );
};

export default MusicPlayer;
