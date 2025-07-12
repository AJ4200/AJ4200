"use client"

import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { useLoading } from "@/contexts/loading-context"

export function TopLineLoader() {
  const { isPageLoading, isUpdating, progress } = useLoading()
  const pathname = usePathname()

  const getThemeColors = () => {
    switch (pathname) {
      case "/":
        return {
          primary: "#8b5cf6", // purple-500
          secondary: "#ec4899", // pink-500
          glow: "0 0 20px rgba(139, 92, 246, 0.5)",
        }
      case "/about":
        return {
          primary: "#f97316", // orange-500
          secondary: "#ef4444", // red-500
          glow: "0 0 20px rgba(249, 115, 22, 0.5)",
        }
      case "/experience":
        return {
          primary: "#3b82f6", // blue-500
          secondary: "#06b6d4", // cyan-500
          glow: "0 0 20px rgba(59, 130, 246, 0.5)",
        }
      case "/skills":
        return {
          primary: "#10b981", // emerald-500
          secondary: "#22c55e", // green-500
          glow: "0 0 20px rgba(16, 185, 129, 0.5)",
        }
      case "/projects":
        return {
          primary: "#f59e0b", // amber-500
          secondary: "#eab308", // yellow-500
          glow: "0 0 20px rgba(245, 158, 11, 0.5)",
        }
      case "/contact":
        return {
          primary: "#6366f1", // indigo-500
          secondary: "#8b5cf6", // purple-500
          glow: "0 0 20px rgba(99, 102, 241, 0.5)",
        }
      default:
        return {
          primary: "#6b7280", // gray-500
          secondary: "#4b5563", // gray-600
          glow: "0 0 20px rgba(107, 114, 128, 0.5)",
        }
    }
  }

  const themeColors = getThemeColors()
  const isVisible = isPageLoading || isUpdating

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-[100] h-1"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={isPageLoading ? "Page loading progress" : "Update progress"}
        >
          {/* Background track */}
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

          {/* Progress bar */}
          <motion.div
            className="absolute top-0 left-0 h-full"
            style={{
              background: `linear-gradient(90deg, ${themeColors.primary}, ${themeColors.secondary})`,
              boxShadow: themeColors.glow,
            }}
            initial={{ width: "0%" }}
            animate={{
              width: `${progress}%`,
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              width: { duration: 0.3, ease: "easeOut" },
              opacity: { duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
            }}
          />

          {/* Shimmer effect */}
          <motion.div
            className="absolute top-0 left-0 h-full w-20 opacity-60"
            style={{
              background: `linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)`,
            }}
            animate={{
              x: ["-100px", "100vw"],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />

          {/* Pulsing dots at the end */}
          {progress < 100 && (
            <motion.div
              className="absolute top-1/2 transform -translate-y-1/2"
              style={{ left: `${progress}%` }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  background: themeColors.secondary,
                  boxShadow: `0 0 10px ${themeColors.secondary}`,
                }}
              />
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
