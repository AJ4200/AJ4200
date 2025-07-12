"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { RotateCcw, Maximize2, Minimize2, X, Gamepad2, Volume2, VolumeX } from "lucide-react"
import { useLoading } from "@/contexts/loading-context"

interface AccessibleGamePlayerProps {
  onClose: () => void
  themeColors: {
    primary: string
    secondary: string
    accent: string
    bg: string
  }
}

export function AccessibleGamePlayer({ onClose, themeColors }: AccessibleGamePlayerProps) {
  const [isMinimized, setIsMinimized] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [currentGame, setCurrentGame] = useState(0)
  const [isGameLoaded, setIsGameLoaded] = useState(false)
  const [gameVolume, setGameVolume] = useState(0.7)
  const [isGameMuted, setIsGameMuted] = useState(false)

  const gameRef = useRef<HTMLIFrameElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const { startUpdate, finishUpdate } = useLoading()

  const games = [
    {
      name: "Fireboy and Watergirl",
      url: "https://www.coolmathgames.com/0-fireboy-and-watergirl-forest-temple/play",
      description: "Classic puzzle platformer game where you control two characters",
      controls: "Arrow keys to move, collect gems and reach the exit",
    },
    {
      name: "Chrome Dino",
      url: "https://chromedino.com/",
      description: "The classic offline Chrome dinosaur game",
      controls: "Spacebar to jump, avoid obstacles",
    },
    {
      name: "2048",
      url: "https://play2048.co/",
      description: "Number puzzle game - combine tiles to reach 2048",
      controls: "Arrow keys to move tiles, combine matching numbers",
    },
    {
      name: "Tetris",
      url: "https://tetris.com/play-tetris",
      description: "Classic block puzzle game",
      controls: "Arrow keys to move and rotate pieces",
    },
  ]

  useEffect(() => {
    const handleGameLoad = () => {
      setIsGameLoaded(true)
    }

    const iframe = gameRef.current
    if (iframe) {
      iframe.addEventListener("load", handleGameLoad)
      return () => iframe.removeEventListener("load", handleGameLoad)
    }
  }, [currentGame])

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
        case "r":
        case "R":
          e.preventDefault()
          restartGame()
          break
        case "f":
        case "F":
          e.preventDefault()
          toggleFullscreen()
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  const restartGame = () => {
    if (gameRef.current) {
      startUpdate("Restarting game...")
      gameRef.current.src = gameRef.current.src
      setIsGameLoaded(false)
      setTimeout(() => {
        finishUpdate()
      }, 1500)
    }
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const switchGame = (index: number) => {
    startUpdate(`Loading ${games[index]?.name}...`)
    setCurrentGame(index)
    setIsGameLoaded(false)
    setTimeout(() => {
      finishUpdate()
    }, 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
        isFullscreen ? "bg-black" : "bg-black/50 backdrop-blur-sm"
      }`}
      onClick={(e) => e.target === e.currentTarget && !isFullscreen && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="game-player-title"
    >
      <motion.div
        ref={containerRef}
        className={`${
          isMinimized ? "w-80 h-20" : isFullscreen ? "w-full h-full" : "w-[900px] h-[700px]"
        } bg-black/90 backdrop-blur-md rounded-xl border border-white/20 shadow-2xl overflow-hidden transition-all duration-300`}
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        {/* Header */}
        <div className={`bg-gradient-to-r ${themeColors.secondary} p-4 border-b ${themeColors.accent}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Gamepad2 size={20} className="text-white" aria-hidden="true" />
              <div>
                <h2 id="game-player-title" className="font-bold text-white responsive-text-lg">
                  Game Player
                </h2>
                {!isMinimized && <p className="responsive-text-sm text-gray-300">{games[currentGame]?.name}</p>}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={restartGame}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                data-cursor="pointer"
                aria-label="Restart game (R key)"
                title="Restart Game"
              >
                <RotateCcw size={16} className="text-white" aria-hidden="true" />
              </button>
              <button
                onClick={toggleFullscreen}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                data-cursor="pointer"
                aria-label="Toggle fullscreen (F key)"
              >
                <Maximize2 size={16} className="text-white" aria-hidden="true" />
              </button>
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
                aria-label="Close game player (Escape key)"
              >
                <X size={16} className="text-white" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Game Selection */}
            {!isFullscreen && (
              <div className="p-4 border-b border-white/10">
                <h3 className="responsive-text-base text-white mb-3 font-semibold">Select a Game:</h3>
                <div className="flex gap-2 overflow-x-auto" role="tablist" aria-label="Game selection">
                  {games.map((game, index) => (
                    <button
                      key={index}
                      onClick={() => switchGame(index)}
                      className={`flex-shrink-0 p-3 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        currentGame === index
                          ? `bg-gradient-to-r ${themeColors.primary} border-white/30`
                          : "bg-white/10 border-white/20 hover:bg-white/20"
                      }`}
                      data-cursor="pointer"
                      role="tab"
                      aria-selected={currentGame === index}
                      aria-controls="game-content"
                      aria-describedby={`game-${index}-description`}
                    >
                      <div className="text-center">
                        <div className="w-16 h-10 bg-white/20 rounded mb-2 flex items-center justify-center">
                          <Gamepad2 size={16} className="text-white" aria-hidden="true" />
                        </div>
                        <p className="responsive-text-xs text-white font-medium">{game.name}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Game Content */}
            <div className="flex-1 relative" id="game-content" role="tabpanel">
              {!isGameLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                  <div className="text-center">
                    <motion.div
                      className={`w-16 h-16 border-4 border-t-transparent rounded-full mb-4 mx-auto`}
                      style={{ borderColor: themeColors.primary.includes("purple") ? "#8b5cf6" : "#3b82f6" }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      aria-hidden="true"
                    />
                    <p className="text-white responsive-text-base">Loading game...</p>
                    <div className="sr-only" aria-live="polite">
                      Loading {games[currentGame]?.name}
                    </div>
                  </div>
                </div>
              )}

              <iframe
                ref={gameRef}
                src={games[currentGame]?.url}
                className="w-full h-full border-0"
                title={`${games[currentGame]?.name} - ${games[currentGame]?.description}`}
                allow="fullscreen; gamepad; microphone; camera"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
                aria-describedby={`game-${currentGame}-description`}
              />
            </div>

            {/* Game Info and Controls */}
            <div className="p-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={restartGame}
                    className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${themeColors.primary} rounded-lg hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    data-cursor="pointer"
                    aria-label="Restart current game"
                  >
                    <RotateCcw size={16} className="text-white" aria-hidden="true" />
                    <span className="text-white responsive-text-sm">Restart</span>
                  </button>

                  <div className="text-white responsive-text-sm">
                    <span className="text-gray-400">Playing:</span> {games[currentGame]?.name}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsGameMuted(!isGameMuted)}
                    className="p-2 hover:bg-white/10 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    data-cursor="pointer"
                    aria-label={isGameMuted ? "Unmute game" : "Mute game"}
                  >
                    {isGameMuted ? (
                      <VolumeX size={20} className="text-white" aria-hidden="true" />
                    ) : (
                      <Volume2 size={20} className="text-white" aria-hidden="true" />
                    )}
                  </button>
                  <div className="flex items-center gap-2">
                    <span className="text-white responsive-text-sm">Volume</span>
                    <div className="w-20 bg-white/20 rounded-full h-2 relative">
                      <div
                        className={`bg-gradient-to-r ${themeColors.primary} h-full rounded-full transition-all duration-300`}
                        style={{ width: `${gameVolume * 100}%` }}
                        role="progressbar"
                        aria-valuenow={gameVolume}
                        aria-valuemin={0}
                        aria-valuemax={1}
                        aria-label="Game volume level"
                      />
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={gameVolume}
                        onChange={(e) => setGameVolume(Number.parseFloat(e.target.value))}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        data-cursor="pointer"
                        aria-label="Adjust game volume"
                      />
                    </div>
                    <span className="responsive-text-sm text-gray-400 w-8">{Math.round(gameVolume * 100)}</span>
                  </div>
                </div>
              </div>

              {/* Game Description and Controls */}
              <div className="mt-4 space-y-2">
                <div id={`game-${currentGame}-description`} className="text-gray-300 responsive-text-sm">
                  <strong>About:</strong> {games[currentGame]?.description}
                </div>
                <div className="text-gray-300 responsive-text-sm">
                  <strong>Controls:</strong> {games[currentGame]?.controls}
                </div>
              </div>

              {/* Keyboard shortcuts info */}
              <div className="mt-4">
                <details className="text-gray-400 responsive-text-xs">
                  <summary className="cursor-pointer hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">
                    Keyboard shortcuts
                  </summary>
                  <div className="mt-2 space-y-1">
                    <p>R: Restart game</p>
                    <p>F: Toggle fullscreen</p>
                    <p>Esc: Close game player</p>
                  </div>
                </details>
              </div>
            </div>
          </>
        )}

        {/* Minimized Controls */}
        {isMinimized && (
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <button
                onClick={restartGame}
                className={`p-2 bg-gradient-to-r ${themeColors.primary} rounded-full hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500`}
                data-cursor="pointer"
                aria-label="Restart game"
              >
                <RotateCcw size={16} className="text-white" aria-hidden="true" />
              </button>
              <div>
                <p className="text-white responsive-text-sm font-medium">{games[currentGame]?.name}</p>
                <p className="text-gray-400 responsive-text-xs">Game Player</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Gamepad2 size={16} className="text-white" aria-hidden="true" />
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
