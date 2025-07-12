"use client"

import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { useLoading } from "@/contexts/loading-context"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"

export function PopoverLoader() {
  const { isUpdating, updateMessage, progress } = useLoading()
  const pathname = usePathname()

  const getThemeColors = () => {
    switch (pathname) {
      case "/":
        return {
          primary: "from-purple-500 to-pink-500",
          secondary: "from-purple-900/90 to-pink-900/90",
          accent: "border-purple-500/30",
          glow: "shadow-purple-500/20",
          text: "text-purple-300",
        }
      case "/about":
        return {
          primary: "from-orange-500 to-red-500",
          secondary: "from-orange-900/90 to-red-900/90",
          accent: "border-orange-500/30",
          glow: "shadow-orange-500/20",
          text: "text-orange-300",
        }
      case "/experience":
        return {
          primary: "from-blue-500 to-cyan-500",
          secondary: "from-blue-900/90 to-cyan-900/90",
          accent: "border-blue-500/30",
          glow: "shadow-blue-500/20",
          text: "text-blue-300",
        }
      case "/skills":
        return {
          primary: "from-green-500 to-emerald-500",
          secondary: "from-green-900/90 to-emerald-900/90",
          accent: "border-green-500/30",
          glow: "shadow-green-500/20",
          text: "text-green-300",
        }
      case "/projects":
        return {
          primary: "from-yellow-500 to-amber-500",
          secondary: "from-yellow-900/90 to-amber-900/90",
          accent: "border-yellow-500/30",
          glow: "shadow-yellow-500/20",
          text: "text-yellow-300",
        }
      case "/contact":
        return {
          primary: "from-indigo-500 to-purple-500",
          secondary: "from-indigo-900/90 to-purple-900/90",
          accent: "border-indigo-500/30",
          glow: "shadow-indigo-500/20",
          text: "text-indigo-300",
        }
      default:
        return {
          primary: "from-gray-500 to-gray-700",
          secondary: "from-gray-900/90 to-gray-700/90",
          accent: "border-gray-500/30",
          glow: "shadow-gray-500/20",
          text: "text-gray-300",
        }
    }
  }

  const themeColors = getThemeColors()

  const getStatusIcon = () => {
    if (progress === 100) {
      return <CheckCircle size={20} className="text-green-400" />
    }
    if (progress > 0 && progress < 100) {
      return <Loader2 size={20} className={`${themeColors.text} animate-spin`} />
    }
    return <AlertCircle size={20} className={themeColors.text} />
  }

  const getStatusMessage = () => {
    if (progress === 100) {
      return "Complete!"
    }
    return updateMessage
  }

  return (
    <AnimatePresence>
      {isUpdating && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/20 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Popover */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[95]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="loader-title"
            aria-describedby="loader-description"
          >
            <div
              className={`bg-gradient-to-br ${themeColors.secondary} backdrop-blur-md rounded-2xl border ${themeColors.accent} shadow-2xl ${themeColors.glow} p-8 min-w-[320px] max-w-md`}
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  animate={{
                    rotate: progress < 100 ? [0, 360] : 0,
                    scale: progress === 100 ? [1, 1.2, 1] : 1,
                  }}
                  transition={{
                    rotate: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                    scale: { duration: 0.5 },
                  }}
                >
                  {getStatusIcon()}
                </motion.div>
                <div className="flex-1">
                  <h3 id="loader-title" className="text-white font-semibold responsive-text-lg">
                    {getStatusMessage()}
                  </h3>
                  <p id="loader-description" className={`${themeColors.text} responsive-text-sm`}>
                    {progress === 100 ? "Update completed successfully" : "Please wait while we update the content"}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300 responsive-text-sm">Progress</span>
                  <span className={`${themeColors.text} responsive-text-sm font-medium`}>{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${themeColors.primary} rounded-full relative overflow-hidden`}
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    {/* Shimmer effect on progress bar */}
                    {progress < 100 && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        animate={{
                          x: ["-100%", "100%"],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                      />
                    )}
                  </motion.div>
                </div>
              </div>

              {/* Loading Animation */}
              <div className="flex items-center justify-center space-x-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className={`w-2 h-2 rounded-full bg-gradient-to-r ${themeColors.primary}`}
                    animate={
                      progress < 100
                        ? {
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 1, 0.5],
                          }
                        : { scale: 1, opacity: 0.5 }
                    }
                    transition={{
                      duration: 1.2,
                      repeat: progress < 100 ? Number.POSITIVE_INFINITY : 0,
                      delay: i * 0.2,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>

              {/* Additional Info */}
              {progress < 100 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-4 text-center"
                >
                  <p className="text-gray-400 responsive-text-xs">This may take a few moments...</p>
                </motion.div>
              )}

              {/* Success State */}
              {progress === 100 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-4 text-center"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: 2,
                    }}
                    className="text-green-400 text-2xl mb-2"
                  >
                    ✓
                  </motion.div>
                  <p className="text-green-300 responsive-text-sm font-medium">Update completed!</p>
                </motion.div>
              )}
            </div>

            {/* Floating particles around the loader */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-1 h-1 rounded-full bg-gradient-to-r ${themeColors.primary} opacity-60`}
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    x: [0, Math.random() * 20 - 10, 0],
                    opacity: [0.3, 0.8, 0.3],
                    scale: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: Math.random() * 2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
