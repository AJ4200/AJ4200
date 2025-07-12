"use client"
import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Play, RotateCcw, Maximize2, Minimize2, X, Gamepad2, Volume2, VolumeX } from "lucide-react"

interface GamePlayerProps {
  onClose: () => void
  themeColors: {
    primary: string
    secondary: string
    accent: string
    bg: string
  }
}

export function GamePlayer({ onClose, themeColors }: GamePlayerProps) {
  const [isMinimized, setIsMinimized] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [currentGame, setCurrentGame] = useState(0)
  const [isGameLoaded, setIsGameLoaded] = useState(false)
  const [gameVolume, setGameVolume] = useState(0.7)
  const [isGameMuted, setIsGameMuted] = useState(false)

  const gameRef = useRef<HTMLIFrameElement>(null)

  const games = [
    {
      name: "Fireboy and Watergirl",
      url: "https://www.coolmathgames.com/0-fireboy-and-watergirl-forest-temple/play",
      description: "Classic puzzle platformer game",
      thumbnail: "/placeholder.svg?height=120&width=200",
    },
    {
      name: "Chrome Dino",
      url: "https://chromedino.com/",
      description: "The classic offline Chrome game",
      thumbnail: "/placeholder.svg?height=120&width=200",
    },
    {
      name: "2048",
      url: "https://play2048.co/",
      description: "Number puzzle game",
      thumbnail: "/placeholder.svg?height=120&width=200",
    },
    {
      name: "Tetris",
      url: "https://tetris.com/play-tetris",
      description: "Classic block puzzle game",
      thumbnail: "/placeholder.svg?height=120&width=200",
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

  const restartGame = () => {
    if (gameRef.current) {
      gameRef.current.src = gameRef.current.src
      setIsGameLoaded(false)
    }
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const switchGame = (index: number) => {
    setCurrentGame(index)
    setIsGameLoaded(false)
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
    >
      <motion.div
        className={`${
          isMinimized ? "w-80 h-20" : isFullscreen ? "w-full h-full" : "w-[900px] h-[700px]"
        } bg-black/90 backdrop-blur-md rounded-xl border border-white/20 shadow-2xl overflow-hidden transition-all duration-300`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`bg-gradient-to-r ${themeColors.secondary} p-4 border-b ${themeColors.accent}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Gamepad2 size={20} className="text-white" />
              <div>
                <h3 className="font-bold text-white">Game Player</h3>
                {!isMinimized && (
                  <p className="text-xs text-gray-300">{games[currentGame]?.name || "No game selected"}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={restartGame}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                data-cursor="pointer"
                title="Restart Game"
              >
                <RotateCcw size={16} className="text-white" />
              </button>
              <button
                onClick={toggleFullscreen}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                data-cursor="pointer"
              >
                <Maximize2 size={16} className="text-white" />
              </button>
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
            {/* Game Selection */}
            {!isFullscreen && (
              <div className="p-4 border-b border-white/10">
                <div className="flex gap-2 overflow-x-auto">
                  {games.map((game, index) => (
                    <button
                      key={index}
                      onClick={() => switchGame(index)}
                      className={`flex-shrink-0 p-3 rounded-lg border transition-all ${
                        currentGame === index
                          ? `bg-gradient-to-r ${themeColors.primary} border-white/30`
                          : "bg-white/10 border-white/20 hover:bg-white/20"
                      }`}
                      data-cursor="pointer"
                    >
                      <div className="text-center">
                        <div className="w-16 h-10 bg-white/20 rounded mb-2 flex items-center justify-center">
                          <Gamepad2 size={16} className="text-white" />
                        </div>
                        <p className="text-xs text-white font-medium">{game.name}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Game Content */}
            <div className="flex-1 relative">
              {!isGameLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                  <div className="text-center">
                    <motion.div
                      className={`w-16 h-16 border-4 border-t-transparent rounded-full mb-4 mx-auto`}
                      style={{ borderColor: themeColors.primary.includes("purple") ? "#8b5cf6" : "#3b82f6" }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    />
                    <p className="text-white">Loading game...</p>
                  </div>
                </div>
              )}

              <iframe
                ref={gameRef}
                src={games[currentGame]?.url}
                className="w-full h-full border-0"
                title={games[currentGame]?.name}
                allow="fullscreen; gamepad; microphone; camera"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
              />
            </div>

            {/* Game Controls */}
            <div className="p-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={restartGame}
                    className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${themeColors.primary} rounded-lg hover:opacity-80 transition-opacity`}
                    data-cursor="pointer"
                  >
                    <RotateCcw size={16} className="text-white" />
                    <span className="text-white text-sm">Restart</span>
                  </button>

                  <div className="text-white text-sm">
                    <span className="text-gray-400">Playing:</span> {games[currentGame]?.name}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsGameMuted(!isGameMuted)}
                    className="p-2 hover:bg-white/10 rounded transition-colors"
                    data-cursor="pointer"
                  >
                    {isGameMuted ? (
                      <VolumeX size={20} className="text-white" />
                    ) : (
                      <Volume2 size={20} className="text-white" />
                    )}
                  </button>
                  <div className="flex items-center gap-2">
                    <span className="text-white text-sm">Volume</span>
                    <div className="w-20 bg-white/20 rounded-full h-2 relative">
                      <div
                        className={`bg-gradient-to-r ${themeColors.primary} h-full rounded-full transition-all duration-300`}
                        style={{ width: `${gameVolume * 100}%` }}
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
                      />
                    </div>
                  </div>
                </div>
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
                className={`p-2 bg-gradient-to-r ${themeColors.primary} rounded-full hover:opacity-80 transition-opacity`}
                data-cursor="pointer"
              >
                <Play size={16} className="text-white" />
              </button>
              <div>
                <p className="text-white text-sm font-medium">{games[currentGame]?.name}</p>
                <p className="text-gray-400 text-xs">Game Player</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Gamepad2 size={16} className="text-white" />
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
