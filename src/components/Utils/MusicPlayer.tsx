"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  FaBackward,
  FaForward,
  FaPause,
  FaPlay,
  FaStop,
  FaVolumeUp,
} from "react-icons/fa";
import playlist from "@/data/playlist";
import Bars from "./Bars";

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds)) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60);
  return `${minutes}:${String(remainder).padStart(2, "0")}`;
};

const MusicPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(65);

  const currentSong = playlist[currentSongIndex];

  const play = async () => {
    if (!audioRef.current) {
      return;
    }

    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const pause = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  const stop = () => {
    if (!audioRef.current) {
      return;
    }

    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const selectTrack = (index: number) => {
    setCurrentSongIndex(index);
    setCurrentTime(0);
  };

  const previous = () => {
    selectTrack(
      currentSongIndex === 0 ? playlist.length - 1 : currentSongIndex - 1,
    );
  };

  const next = () => {
    selectTrack((currentSongIndex + 1) % playlist.length);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    audio.load();
    audio.volume = volume / 100;
    if (isPlaying) {
      void audio.play();
    }
  }, [currentSongIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    const syncTime = () => setCurrentTime(audio.currentTime);
    const syncDuration = () => setDuration(audio.duration);
    const handleEnded = () => next();

    audio.addEventListener("timeupdate", syncTime);
    audio.addEventListener("loadedmetadata", syncDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", syncTime);
      audio.removeEventListener("loadedmetadata", syncDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentSongIndex]);

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <motion.div
      className="studio-player overflow-hidden border border-amber-300/20 bg-black/45 backdrop-blur-xl"
      initial={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.15 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <div className="grid lg:grid-cols-[minmax(20rem,0.8fr)_1.2fr]">
        <div className="relative flex min-h-[30rem] items-center justify-center overflow-hidden border-b border-white/10 p-8 lg:border-b-0 lg:border-r">
          <div
            className="absolute inset-0 scale-125 bg-cover bg-center opacity-20 blur-3xl"
            style={{ backgroundImage: `url("${currentSong.albumArt}")` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent" />

          <AnimatePresence mode="wait">
            <motion.div
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-square w-full max-w-sm"
              exit={{ opacity: 0, scale: 0.92 }}
              initial={{ opacity: 0, scale: 0.92 }}
              key={currentSong.url}
              transition={{
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 },
              }}
            >
              <div
                className={`about-record relative size-full overflow-hidden rounded-full border-[10px] border-black shadow-[0_25px_80px_rgba(0,0,0,0.75)] ${
                  isPlaying ? "is-playing" : ""
                }`}
              >
                <Image
                  alt={`${currentSong.title} artwork`}
                  className="h-full w-full object-cover"
                  fill
                  sizes="(min-width: 1024px) 30vw, 80vw"
                  src={currentSong.albumArt}
                />
                <div className="absolute inset-0 rounded-full bg-[repeating-radial-gradient(circle_at_center,transparent_0,transparent_5px,rgba(0,0,0,0.18)_6px,transparent_7px)]" />
                <div className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-black bg-amber-300">
                  <Bars isplaying={isPlaying} />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex flex-col justify-between p-5 sm:p-8">
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[0.58rem] uppercase tracking-[0.24em] text-amber-300">
                  Now spinning
                </span>
                <AnimatePresence mode="wait">
                  <motion.h3
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-3xl font-black uppercase text-white sm:text-5xl"
                    exit={{ opacity: 0, y: -8 }}
                    initial={{ opacity: 0, y: 8 }}
                    key={currentSong.title}
                  >
                    {currentSong.title}
                  </motion.h3>
                </AnimatePresence>
              </div>
              <span className="text-xs tracking-[0.2em] text-white/25">
                {String(currentSongIndex + 1).padStart(2, "0")} /{" "}
                {String(playlist.length).padStart(2, "0")}
              </span>
            </div>

            <div className="mt-8">
              <input
                aria-label="Track progress"
                className="studio-range"
                max="100"
                min="0"
                onChange={(event) => {
                  if (!audioRef.current || !duration) {
                    return;
                  }
                  audioRef.current.currentTime =
                    (Number(event.target.value) / 100) * duration;
                }}
                type="range"
                value={progress}
              />
              <div className="mt-2 flex justify-between text-[0.58rem] tracking-[0.16em] text-white/30">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button
                aria-label="Previous track"
                className="studio-control"
                onClick={previous}
                type="button"
              >
                <FaBackward />
              </button>
              <button
                aria-label={isPlaying ? "Pause" : "Play"}
                className="studio-control studio-control-primary"
                onClick={isPlaying ? pause : play}
                type="button"
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
              <button
                aria-label="Stop"
                className="studio-control"
                onClick={stop}
                type="button"
              >
                <FaStop />
              </button>
              <button
                aria-label="Next track"
                className="studio-control"
                onClick={next}
                type="button"
              >
                <FaForward />
              </button>

              <label className="ml-auto flex min-w-36 items-center gap-3 text-amber-300">
                <FaVolumeUp />
                <input
                  aria-label="Volume"
                  className="studio-range"
                  max="100"
                  min="0"
                  onChange={(event) => {
                    const nextVolume = Number(event.target.value);
                    setVolume(nextVolume);
                    if (audioRef.current) {
                      audioRef.current.volume = nextVolume / 100;
                    }
                  }}
                  type="range"
                  value={volume}
                />
              </label>
            </div>
          </div>

          <div className="mt-10">
            <span className="text-[0.58rem] uppercase tracking-[0.22em] text-white/30">
              Session playlist
            </span>
            <ol className="mt-3 divide-y divide-white/10 border-y border-white/10">
              {playlist.map((song, index) => (
                <li key={`${song.title}-${index}`}>
                  <button
                    className={`group grid w-full grid-cols-[2rem_1fr_auto] items-center gap-3 px-2 py-3 text-left transition ${
                      index === currentSongIndex
                        ? "bg-amber-300/10 text-amber-200"
                        : "text-white/45 hover:bg-white/[0.035] hover:text-white"
                    }`}
                    onClick={() => selectTrack(index)}
                    type="button"
                  >
                    <span className="text-[0.58rem] tracking-[0.15em]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-[0.12em]">
                      {song.title}
                    </span>
                    {index === currentSongIndex && (
                      <span className="text-[0.52rem] uppercase tracking-[0.14em]">
                        Active
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
      <audio ref={audioRef} preload="metadata" src={currentSong.url} />
    </motion.div>
  );
};

export default MusicPlayer;
