"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Settings, Music, Video, Gamepad2, X } from "lucide-react"
import { usePathname } from "next/navigation"
import { AccessibleMediaPlayer } from "./accessible-media-player"
import { AccessibleGamePlayer } from "./accessible-game-player"

export function AccessibleUtilities() {
  const [isOpen, setIsOpen] = useState(false)
  const [activePlayer, setActivePlayer] = useState<"audio" | "video" | "game" | null>(null)
  const [focusedIndex, setFocusedIndex] = useState(0)
  const pathname = usePathname()
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([])
  const utilityButtonRef = useRef<HTMLButtonElement>(null)

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

  const utilities = [
    {
      id: "audio",
      icon: Music,
      title: "Audio Player",
      description: "Play background music",
      action: () => setActivePlayer("audio"),
    },
    {
      id: "video",
      icon: Video,
      title: "Video Player",
      description: "Watch portfolio demos",
      action: () => setActivePlayer("video"),
    },
    {
      id: "game",
      icon: Gamepad2,
      title: "Game Player",
      description: "Play classic games",
      action: () => setActivePlayer("game"),
    },
  ]

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case "Escape":
          setIsOpen(false)
          utilityButtonRef.current?.focus()
          break
        case "ArrowDown":
          e.preventDefault()
          setFocusedIndex((prev) => (prev + 1) % utilities.length)
          break
        case "ArrowUp":
          e.preventDefault()
          setFocusedIndex((prev) => (prev - 1 + utilities.length) % utilities.length)
          break
        case "Enter":
        case " ":
          e.preventDefault()
          buttonRefs.current[focusedIndex]?.click()
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, focusedIndex, utilities.length])

  // Focus management
  useEffect(() => {
    if (isOpen && buttonRefs.current[focusedIndex]) {
      buttonRefs.current[focusedIndex]?.focus()
    }
  }, [focusedIndex, isOpen])

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
          ref={utilityButtonRef}
          onClick={() => setIsOpen(true)}
          className={`w-16 h-16 bg-gradient-to-r ${themeColors.primary} rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          data-cursor="pointer"
          aria-label="Open utilities menu"
          aria-expanded={isOpen}
          aria-haspopup="menu"
        >
          <Settings
            size={24}
            className="text-white group-hover:rotate-90 transition-transform duration-300"
            aria-hidden="true"
          />
        </motion.button>
      </motion.div>

      {/* Utilities Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/20"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: -50, y: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: -50, y: 50 }}
              className="fixed bottom-6 left-6 z-50 w-80 bg-black/90 backdrop-blur-md rounded-xl border border-white/20 shadow-2xl overflow-hidden"
              role="menu"
              aria-label="Utilities menu"
            >
              {/* Header */}
              <div className={`bg-gradient-to-r ${themeColors.secondary} p-4 border-b ${themeColors.accent}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Settings size={20} className="text-white" aria-hidden="true" />
                    <h2 className="font-bold text-white responsive-text-lg">Utilities</h2>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent"
                    data-cursor="pointer"
                    aria-label="Close utilities menu"
                  >
                    <X size={16} className="text-white" aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4" role="none">
                {utilities.map((utility, index) => (
                  <motion.button
                    key={utility.id}
                    ref={(el) => (buttonRefs.current[index] = el)}
                    onClick={() => {
                      utility.action()
                      setIsOpen(false)
                    }}
                    className={`w-full flex items-center gap-4 p-4 bg-gradient-to-r ${themeColors.primary} rounded-lg hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent ${
                      focusedIndex === index ? "ring-2 ring-blue-500" : ""
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    data-cursor="pointer"
                    role="menuitem"
                    aria-describedby={`${utility.id}-description`}
                  >
                    <utility.icon size={24} className="text-white" aria-hidden="true" />
                    <div className="text-left">
                      <h3 className="font-semibold text-white responsive-text-base">{utility.title}</h3>
                      <p id={`${utility.id}-description`} className="text-white/80 responsive-text-sm">
                        {utility.description}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Media Player Popups */}
      <AnimatePresence>
        {activePlayer === "audio" && (
          <AccessibleMediaPlayer type="audio" onClose={() => setActivePlayer(null)} themeColors={themeColors} />
        )}
        {activePlayer === "video" && (
          <AccessibleMediaPlayer type="video" onClose={() => setActivePlayer(null)} themeColors={themeColors} />
        )}
        {activePlayer === "game" && (
          <AccessibleGamePlayer onClose={() => setActivePlayer(null)} themeColors={themeColors} />
        )}
      </AnimatePresence>
    </>
  )
}
