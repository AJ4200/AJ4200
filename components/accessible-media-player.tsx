"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward, Minimize2, X, Music, Video } from "lucide-react"
import { useLoading } from "@/contexts/loading-context"

interface AccessibleMediaPlayerProps {
  type: "audio" | "video"
  onClose: () => void
  themeColors: {
    primary: string
    secondary: string
    accent: string
    bg: string
  }
}

export function AccessibleMediaPlayer({ type, onClose, themeColors }: AccessibleMediaPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isMinimized, setIsMinimized] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)

  const mediaRef = useRef<HTMLAudioElement | HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const { startUpdate, finishUpdate } = useLoading()

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

  // Focus management
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus()
    }
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose()
          break
        case " ":
          e.preventDefault()
          togglePlay()
          break
        case "ArrowLeft":
          e.preventDefault()
          handleSeek(Math.max(0, currentTime - 10))
          break
        case "ArrowRight":
          e.preventDefault()
          handleSeek(Math.min(duration, currentTime + 10))
          break
        case "ArrowUp":
          e.preventDefault()
          handleVolumeChange(Math.min(1, volume + 0.1))
          break
        case "ArrowDown":
          e.preventDefault()
          handleVolumeChange(Math.max(0, volume - 0.1))
          break
        case "m":
        case "M":
          e.preventDefault()
          toggleMute()
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [currentTime, duration, volume])

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

  const switchTrack = (index: number) => {
    startUpdate(`Loading ${tracks[index]?.name}...`)
    setCurrentTrack(index)
    setTimeout(() => {
      finishUpdate()
    }, 1000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="media-player-title"
    >
      <motion.div
        ref={containerRef}
        className={`${
          isMinimized ? "w-80 h-20" : type === "video" ? "w-[800px] h-[600px]" : "w-96 h-80"
        } bg-black/90 backdrop-blur-md rounded-xl border border-white/20 shadow-2xl overflow-hidden transition-all duration-300`}
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        {/* Header */}
        <div className={`bg-gradient-to-r ${themeColors.secondary} p-4 border-b ${themeColors.accent}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {type === "audio" ? (
                <Music size={20} className="text-white" aria-hidden="true" />
              ) : (
                <Video size={20} className="text-white" aria-hidden="true" />
              )}
              <div>
                <h2 id="media-player-title" className="font-bold text-white responsive-text-lg">
                  {type === "audio" ? "Audio Player" : "Video Player"}
                </h2>
                {!isMinimized && <p className="responsive-text-sm text-gray-300">{tracks[currentTrack]?.name}</p>}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                data-cursor="pointer"
                aria-label={isMinimized ? "Maximize player" : "Minimize player"}
              >
                <Minimize2 size={16} className="text-white" aria-hidden="true" />
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                data-cursor="pointer"
                aria-label="Close player"
              >
                <X size={16} className="text-white" aria-hidden="true" />
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
                    role="img"
                    aria-label="Audio visualization"
                  >
                    <Music size={64} className="text-white" aria-hidden="true" />
                  </div>
                  <h3 className="responsive-text-xl font-bold text-white mb-2">{tracks[currentTrack]?.name}</h3>
                  <p className="text-gray-400 responsive-text-base">Now Playing</p>
                </div>
              ) : (
                <video
                  ref={mediaRef as React.RefObject<HTMLVideoElement>}
                  src={tracks[currentTrack]?.url}
                  className="w-full h-full object-contain rounded-lg"
                  aria-label={`Video: ${tracks[currentTrack]?.name}`}
                />
              )}

              {type === "audio" && (
                <audio
                  ref={mediaRef as React.RefObject<HTMLAudioElement>}
                  src={tracks[currentTrack]?.url}
                  aria-label={`Audio: ${tracks[currentTrack]?.name}`}
                />
              )}
            </div>

            {/* Controls */}
            <div className="p-6 border-t border-white/10">
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center gap-2 responsive-text-sm text-gray-400 mb-2">
                  <span aria-label={`Current time: ${formatTime(currentTime)}`}>{formatTime(currentTime)}</span>
                  <div className="flex-1 bg-white/20 rounded-full h-2 relative">
                    <div
                      className={`bg-gradient-to-r ${themeColors.primary} h-full rounded-full transition-all duration-300`}
                      style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                      role="progressbar"
                      aria-valuenow={currentTime}
                      aria-valuemin={0}
                      aria-valuemax={duration}
                      aria-label="Playback progress"
                    />
                    <input
                      type="range"
                      min="0"
                      max={duration || 0}
                      value={currentTime}
                      onChange={(e) => handleSeek(Number.parseFloat(e.target.value))}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      data-cursor="pointer"
                      aria-label="Seek to position"
                    />
                  </div>
                  <span aria-label={`Total duration: ${formatTime(duration)}`}>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-center gap-4 mb-4" role="group" aria-label="Media controls">
                <button
                  onClick={() => switchTrack((currentTrack - 1 + tracks.length) % tracks.length)}
                  className="p-3 hover:bg-white/10 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  data-cursor="pointer"
                  aria-label="Previous track"
                >
                  <SkipBack size={20} className="text-white" aria-hidden="true" />
                </button>

                <button
                  onClick={togglePlay}
                  className={`p-4 bg-gradient-to-r ${themeColors.primary} rounded-full hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  data-cursor="pointer"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <Pause size={24} className="text-white" aria-hidden="true" />
                  ) : (
                    <Play size={24} className="text-white" aria-hidden="true" />
                  )}
                </button>

                <button
                  onClick={() => switchTrack((currentTrack + 1) % tracks.length)}
                  className="p-3 hover:bg-white/10 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  data-cursor="pointer"
                  aria-label="Next track"
                >
                  <SkipForward size={20} className="text-white" aria-hidden="true" />
                </button>
              </div>

              {/* Volume Control */}
              <div className="flex items-center gap-3" role="group" aria-label="Volume controls">
                <button
                  onClick={toggleMute}
                  className="p-2 hover:bg-white/10 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  data-cursor="pointer"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? (
                    <VolumeX size={20} className="text-white" aria-hidden="true" />
                  ) : (
                    <Volume2 size={20} className="text-white" aria-hidden="true" />
                  )}
                </button>
                <div className="flex-1 bg-white/20 rounded-full h-2 relative">
                  <div
                    className={`bg-gradient-to-r ${themeColors.primary} h-full rounded-full transition-all duration-300`}
                    style={{ width: `${volume * 100}%` }}
                    role="progressbar"
                    aria-valuenow={volume}
                    aria-valuemin={0}
                    aria-valuemax={1}
                    aria-label="Volume level"
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
                    aria-label="Adjust volume"
                  />
                </div>
                <span className="responsive-text-sm text-gray-400 w-8">{Math.round(volume * 100)}</span>
              </div>
            </div>

            {/* Keyboard shortcuts info */}
            <div className="px-6 pb-4">
              <details className="text-gray-400 responsive-text-xs">
                <summary className="cursor-pointer hover:text-white transition-colors">Keyboard shortcuts</summary>
                <div className="mt-2 space-y-1">
                  <p>Space: Play/Pause</p>
                  <p>← →: Seek backward/forward 10s</p>
                  <p>↑ ↓: Volume up/down</p>
                  <p>M: Mute/Unmute</p>
                  <p>Esc: Close player</p>
                </div>
              </details>
            </div>
          </>
        )}

        {/* Minimized View */}
        {isMinimized && (
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className={`p-2 bg-gradient-to-r ${themeColors.primary} rounded-full hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500`}
                data-cursor="pointer"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause size={16} className="text-white" aria-hidden="true" />
                ) : (
                  <Play size={16} className="text-white" aria-hidden="true" />
                )}
              </button>
              <div>
                <p className="text-white responsive-text-sm font-medium">{tracks[currentTrack]?.name}</p>
                <p className="text-gray-400 responsive-text-xs">
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
