"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward, Minimize2, X, Music, Video } from "lucide-react"

interface MediaPlayerProps {
  type: "audio" | "video"
  onClose: () => void
  themeColors: {
    primary: string
    secondary: string
    accent: string
    bg: string
  }
}

export function MediaPlayer({ type, onClose, themeColors }: MediaPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isMinimized, setIsMinimized] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)

  const mediaRef = useRef<HTMLAudioElement | HTMLVideoElement>(null)

  const tracks = [
    {
      name: type === "audio" ? "Background Music" : "Portfolio Demo",
      url: `/media/${type === "audio" ? "background.mp3" : "demo.mp4"}`,
    },
    {
      name: type === "audio" ? "Focus Music" : "Project Showcase",
      url: `/media/${type === "audio" ? "focus.mp3" : "showcase.mp4"}`,
    },
  ]

  useEffect(() => {
    const media = mediaRef.current
    if (!media) return

    const updateTime = () => setCurrentTime(media.currentTime)
    const updateDuration = () => setDuration(media.duration)
    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)

    media.addEventListener("timeupdate", updateTime)
    media.addEventListener("loadedmetadata", updateDuration)
    media.addEventListener("play", handlePlay)
    media.addEventListener("pause", handlePause)

    return () => {
      media.removeEventListener("timeupdate", updateTime)
      media.removeEventListener("loadedmetadata", updateDuration)
      media.removeEventListener("play", handlePlay)
      media.removeEventListener("pause", handlePause)
    }
  }, [currentTrack])

  const togglePlay = () => {
    const media = mediaRef.current
    if (!media) return
    isPlaying ? media.pause() : media.play()
  }

  const toggleMute = () => {
    const media = mediaRef.current
    if (!media) return
    media.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (newVolume: number) => {
    const media = mediaRef.current
    if (!media) return
    setVolume(newVolume)
    media.volume = newVolume
  }

  const handleSeek = (newTime: number) => {
    const media = mediaRef.current
    if (!media) return
    media.currentTime = newTime
    setCurrentTime(newTime)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        className={`${
          isMinimized ? "w-80 h-20" : type === "video" ? "w-[800px] h-[600px]" : "w-96 h-80"
        } bg-black/90 backdrop-blur-md rounded-xl border border-white/20 shadow-2xl overflow-hidden transition-all duration-300`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`bg-gradient-to-r ${themeColors.secondary} p-4 border-b ${themeColors.accent}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {type === "audio" ? (
                <Music size={20} className="text-white" />
              ) : (
                <Video size={20} className="text-white" />
              )}
              <div>
                <h3 className="font-bold text-white">{type === "audio" ? "Audio Player" : "Video Player"}</h3>
                {!isMinimized && <p className="text-xs text-gray-300">{tracks[currentTrack]?.name}</p>}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                data-cursor="pointer"
              >
                <Minimize2 size={16} className="text-white" />
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                data-cursor="pointer"
              >
                <X size={16} className="text-white" />
              </button>
            </div>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Media Content */}
            <div className="flex-1 flex items-center justify-center p-6">
              {type === "audio" ? (
                <div className="text-center">
                  <div
                    className={`w-48 h-48 bg-gradient-to-br ${themeColors.primary} rounded-full flex items-center justify-center mb-6 animate-pulse`}
                  >
                    <Music size={64} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{tracks[currentTrack]?.name}</h3>
                  <p className="text-gray-400">Now Playing</p>
                </div>
              ) : (
                <video
                  ref={mediaRef as React.RefObject<HTMLVideoElement>}
                  src={tracks[currentTrack]?.url}
                  className="w-full h-full object-contain rounded-lg"
                  controls
                />
              )}

              {type === "audio" && (
                <audio ref={mediaRef as React.RefObject<HTMLAudioElement>} src={tracks[currentTrack]?.url} />
              )}
            </div>

            {/* Controls */}
            <div className="p-6 border-t border-white/10">
              <div className="mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                  <span>{formatTime(currentTime)}</span>
                  <div className="flex-1 bg-white/20 rounded-full h-2 relative">
                    <div
                      className={`bg-gradient-to-r ${themeColors.primary} h-full rounded-full transition-all duration-300`}
                      style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                    />
                    <input
                      type="range"
                      min="0"
                      max={duration || 0}
                      value={currentTime}
                      onChange={(e) => handleSeek(Number.parseFloat(e.target.value))}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      data-cursor="pointer"
                    />
                  </div>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 mb-4">
                <button
                  onClick={() => setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length)}
                  className="p-3 hover:bg-white/10 rounded-full transition-colors"
                  data-cursor="pointer"
                >
                  <SkipBack size={20} className="text-white" />
                </button>

                <button
                  onClick={togglePlay}
                  className={`p-4 bg-gradient-to-r ${themeColors.primary} rounded-full hover:opacity-80 transition-opacity`}
                  data-cursor="pointer"
                >
                  {isPlaying ? <Pause size={24} className="text-white" /> : <Play size={24} className="text-white" />}
                </button>

                <button
                  onClick={() => setCurrentTrack((prev) => (prev + 1) % tracks.length)}
                  className="p-3 hover:bg-white/10 rounded-full transition-colors"
                  data-cursor="pointer"
                >
                  <SkipForward size={20} className="text-white" />
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={toggleMute}
                  className="p-2 hover:bg-white/10 rounded transition-colors"
                  data-cursor="pointer"
                >
                  {isMuted ? (
                    <VolumeX size={20} className="text-white" />
                  ) : (
                    <Volume2 size={20} className="text-white" />
                  )}
                </button>
                <div className="flex-1 bg-white/20 rounded-full h-2 relative">
                  <div
                    className={`bg-gradient-to-r ${themeColors.primary} h-full rounded-full transition-all duration-300`}
                    style={{ width: `${volume * 100}%` }}
                  />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={(e) => handleVolumeChange(Number.parseFloat(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    data-cursor="pointer"
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {isMinimized && (
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className={`p-2 bg-gradient-to-r ${themeColors.primary} rounded-full hover:opacity-80 transition-opacity`}
                data-cursor="pointer"
              >
                {isPlaying ? <Pause size={16} className="text-white" /> : <Play size={16} className="text-white" />}
              </button>
              <div>
                <p className="text-white text-sm font-medium">{tracks[currentTrack]?.name}</p>
                <p className="text-gray-400 text-xs">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </p>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
