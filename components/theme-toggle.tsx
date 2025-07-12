"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "./theme-provider"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  const getThemeColors = () => {
    switch (pathname) {
      case "/":
        return {
          primary: "from-purple-500 to-pink-500",
          glow: "shadow-purple-500/20",
        }
      case "/about":
        return {
          primary: "from-orange-500 to-red-500",
          glow: "shadow-orange-500/20",
        }
      case "/experience":
        return {
          primary: "from-blue-500 to-cyan-500",
          glow: "shadow-blue-500/20",
        }
      case "/skills":
        return {
          primary: "from-green-500 to-emerald-500",
          glow: "shadow-green-500/20",
        }
      case "/projects":
        return {
          primary: "from-yellow-500 to-amber-500",
          glow: "shadow-yellow-500/20",
        }
      case "/contact":
        return {
          primary: "from-indigo-500 to-purple-500",
          glow: "shadow-indigo-500/20",
        }
      default:
        return {
          primary: "from-gray-500 to-gray-700",
          glow: "shadow-gray-500/20",
        }
    }
  }

  const themeColors = getThemeColors()

  return (
    <motion.div
      className="fixed top-24 right-6 z-40"
      initial={{ scale: 0, rotate: 180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
    >
      <motion.button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className={`w-16 h-16 bg-gradient-to-r ${themeColors.primary} rounded-full shadow-lg ${themeColors.glow} hover:shadow-xl transition-all duration-300 flex items-center justify-center group relative overflow-hidden`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        data-cursor="pointer"
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        {/* Background animation */}
        <motion.div
          className="absolute inset-0 bg-white/20 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />

        {/* Icon with rotation animation */}
        <motion.div
          className="relative z-10"
          animate={{ rotate: theme === "light" ? 0 : 180 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {theme === "light" ? <Moon size={24} className="text-white" /> : <Sun size={24} className="text-white" />}
        </motion.div>

        {/* Tooltip */}
        <motion.div
          initial={{ opacity: 0, x: 10, scale: 0.8 }}
          whileHover={{ opacity: 1, x: 0, scale: 1 }}
          className="absolute right-full top-1/2 transform -translate-y-1/2 mr-3 px-3 py-2 bg-black/90 text-white responsive-text-xs rounded-lg whitespace-nowrap pointer-events-none"
        >
          {theme === "light" ? "Dark Mode" : "Light Mode"}
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1 w-0 h-0 border-t-4 border-b-4 border-l-4 border-transparent border-l-black/90" />
        </motion.div>
      </motion.button>
    </motion.div>
  )
}
