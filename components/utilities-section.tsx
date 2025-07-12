"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Settings, Music, Video, Gamepad2, X } from "lucide-react"
import { usePathname } from "next/navigation"
import { MediaPlayer } from "./media-player"
import { GamePlayer } from "./game-player"

export function UtilitiesSection() {
  const [isOpen, setIsOpen] = useState(false)
  const [activePlayer, setActivePlayer] = useState<"audio" | "video" | "game" | null>(null)
  const pathname = usePathname()

  const getThemeColors = () => {
    switch (pathname) {
      case "/":
        return {
          primary: "from-purple-500 to-pink-500",
          secondary: "from-purple-900/80 to-pink-900/80",
          accent: "border-purple-500/30",
          bg: "bg-purple-900/20",
        }
      case "/about":
        return {
          primary: "from-orange-500 to-red-500",
          secondary: "from-orange-900/80 to-red-900/80",
          accent: "border-orange-500/30",
          bg: "bg-orange-900/20",
        }
      case "/experience":
        return {
          primary: "from-blue-500 to-cyan-500",
          secondary: "from-blue-900/80 to-cyan-900/80",
          accent: "border-blue-500/30",
          bg: "bg-blue-900/20",
        }
      case "/skills":
        return {
          primary: "from-green-500 to-emerald-500",
          secondary: "from-green-900/80 to-emerald-900/80",
          accent: "border-green-500/30",
          bg: "bg-green-900/20",
        }
      case "/projects":
        return {
          primary: "from-yellow-500 to-amber-500",
          secondary: "from-yellow-900/80 to-amber-900/80",
          accent: "border-yellow-500/30",
          bg: "bg-yellow-900/20",
        }
      case "/contact":
        return {
          primary: "from-indigo-500 to-purple-500",
          secondary: "from-indigo-900/80 to-purple-900/80",
          accent: "border-indigo-500/30",
          bg: "bg-indigo-900/20",
        }
      default:
        return {
          primary: "from-gray-500 to-gray-700",
          secondary: "from-gray-900/80 to-gray-700/80",
          accent: "border-gray-500/30",
          bg: "bg-gray-900/20",
        }
    }
  }

  const themeColors = getThemeColors()

  return (
    <>
      {/* Utilities Button */}
      <motion.div
        className="fixed bottom-6 left-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.button
          onClick={() => setIsOpen(true)}
          className={`w-16 h-16 bg-gradient-to-r ${themeColors.primary} rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          data-cursor="pointer"
        >
          <Settings size={24} className="text-white group-hover:rotate-90 transition-transform duration-300" />
        </motion.button>
      </motion.div>

      {/* Utilities Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -50, y: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: -50, y: 50 }}
            className="fixed bottom-6 left-6 z-50 w-80 bg-black/90 backdrop-blur-md rounded-xl border border-white/20 shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className={`bg-gradient-to-r ${themeColors.secondary} p-4 border-b ${themeColors.accent}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Settings size={20} className="text-white" />
                  <h3 className="font-bold text-white">Utilities</h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  data-cursor="pointer"
                >
                  <X size={16} className="text-white" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <motion.button
                onClick={() => setActivePlayer("audio")}
                className={`w-full flex items-center gap-4 p-4 bg-gradient-to-r ${themeColors.primary} rounded-lg hover:opacity-80 transition-opacity`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                data-cursor="pointer"
              >
                <Music size={24} className="text-white" />
                <div className="text-left">
                  <h4 className="font-semibold text-white">Audio Player</h4>
                  <p className="text-white/80 text-sm">Play background music</p>
                </div>
              </motion.button>

              <motion.button
                onClick={() => setActivePlayer("video")}
                className={`w-full flex items-center gap-4 p-4 bg-gradient-to-r ${themeColors.primary} rounded-lg hover:opacity-80 transition-opacity`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                data-cursor="pointer"
              >
                <Video size={24} className="text-white" />
                <div className="text-left">
                  <h4 className="font-semibold text-white">Video Player</h4>
                  <p className="text-white/80 text-sm">Watch portfolio demos</p>
                </div>
              </motion.button>

              <motion.button
                onClick={() => setActivePlayer("game")}
                className={`w-full flex items-center gap-4 p-4 bg-gradient-to-r ${themeColors.primary} rounded-lg hover:opacity-80 transition-opacity`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                data-cursor="pointer"
              >
                <Gamepad2 size={24} className="text-white" />
                <div className="text-left">
                  <h4 className="font-semibold text-white">Game Player</h4>
                  <p className="text-white/80 text-sm">Play classic games</p>
                </div>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Media Player Popups */}
      <AnimatePresence>
        {activePlayer === "audio" && (
          <MediaPlayer type="audio" onClose={() => setActivePlayer(null)} themeColors={themeColors} />
        )}
        {activePlayer === "video" && (
          <MediaPlayer type="video" onClose={() => setActivePlayer(null)} themeColors={themeColors} />
        )}
        {activePlayer === "game" && <GamePlayer onClose={() => setActivePlayer(null)} themeColors={themeColors} />}
      </AnimatePresence>
    </>
  )
}
