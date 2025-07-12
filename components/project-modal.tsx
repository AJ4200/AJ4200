"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Github, ExternalLink, RefreshCw, Globe, Lock, Maximize2, Minimize2 } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  technologies: string[]
  githubUrl: string
  liveUrl: string
  imageUrl: string
  features: string[]
  challenges: string[]
  period: string
}

interface ProjectModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isBrowserMinimized, setIsBrowserMinimized] = useState(false)
  const [currentUrl, setCurrentUrl] = useState("")
  const [isSecure, setIsSecure] = useState(true)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    if (project && isOpen) {
      setCurrentUrl(project.liveUrl)
      setIsSecure(project.liveUrl.startsWith("https://"))
      setIsLoading(true)
    }
  }, [project, isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen, onClose])

  const getThemeColors = () => {
    switch (pathname) {
      case "/":
        return {
          primary: "from-purple-500 to-pink-500",
          secondary: "from-purple-900/95 to-pink-900/95",
          accent: "border-purple-500/30",
          glow: "shadow-purple-500/20",
        }
      case "/projects":
        return {
          primary: "from-yellow-500 to-amber-500",
          secondary: "from-yellow-900/95 to-amber-900/95",
          accent: "border-yellow-500/30",
          glow: "shadow-yellow-500/20",
        }
      default:
        return {
          primary: "from-gray-500 to-gray-700",
          secondary: "from-gray-900/95 to-gray-700/95",
          accent: "border-gray-500/30",
          glow: "shadow-gray-500/20",
        }
    }
  }

  const themeColors = getThemeColors()

  const handleIframeLoad = () => {
    setIsLoading(false)
  }

  const refreshBrowser = () => {
    if (iframeRef.current) {
      setIsLoading(true)
      iframeRef.current.src = iframeRef.current.src
    }
  }

  if (!project) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="fixed inset-4 z-50 bg-black/95 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              className={`sticky top-0 z-10 bg-gradient-to-r ${themeColors.secondary} backdrop-blur-md p-6 border-b ${themeColors.accent}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="responsive-text-2xl font-bold text-white mb-2">{project.title}</h2>
                  <p className="text-gray-300 responsive-text-base">{project.description}</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-3 hover:bg-white/10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Close modal"
                >
                  <X size={24} className="text-white" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
              {/* Mini Browser */}
              <div
                className={`${isBrowserMinimized ? "h-16" : "h-1/2 lg:h-full"} lg:w-2/3 border-b lg:border-b-0 lg:border-r border-white/20 flex flex-col transition-all duration-300`}
              >
                {/* Browser Header */}
                <div className="bg-gray-800 p-3 border-b border-gray-700 flex items-center gap-3">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>

                  <div className="flex-1 flex items-center gap-2">
                    <button
                      onClick={refreshBrowser}
                      className="p-1 hover:bg-gray-700 rounded transition-colors"
                      aria-label="Refresh"
                    >
                      <RefreshCw size={14} className="text-gray-400" />
                    </button>

                    <div className="flex-1 bg-gray-700 rounded px-3 py-1 flex items-center gap-2">
                      {isSecure ? (
                        <Lock size={12} className="text-green-400" />
                      ) : (
                        <Globe size={12} className="text-gray-400" />
                      )}
                      <span className="text-gray-300 responsive-text-xs truncate">{currentUrl}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsBrowserMinimized(!isBrowserMinimized)}
                    className="p-1 hover:bg-gray-700 rounded transition-colors lg:hidden"
                    aria-label={isBrowserMinimized ? "Maximize browser" : "Minimize browser"}
                  >
                    {isBrowserMinimized ? (
                      <Maximize2 size={14} className="text-gray-400" />
                    ) : (
                      <Minimize2 size={14} className="text-gray-400" />
                    )}
                  </button>
                </div>

                {/* Browser Content */}
                {!isBrowserMinimized && (
                  <div className="flex-1 relative bg-white">
                    {isLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                        <div className="text-center">
                          <motion.div
                            className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          />
                          <p className="text-gray-600 responsive-text-sm">Loading project...</p>
                        </div>
                      </div>
                    )}

                    <iframe
                      ref={iframeRef}
                      src={project.liveUrl}
                      className="w-full h-full border-0"
                      title={`${project.title} - Live Preview`}
                      onLoad={handleIframeLoad}
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
                    />
                  </div>
                )}
              </div>

              {/* Project Details */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Project Info */}
                <div>
                  <h3 className="responsive-text-lg font-semibold text-white mb-3">About This Project</h3>
                  <p className="text-gray-300 responsive-text-base leading-relaxed mb-4">{project.longDescription}</p>
                  <div className="flex items-center gap-2 text-gray-400 responsive-text-sm">
                    <span>Development Period:</span>
                    <span className="text-white">{project.period}</span>
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <h3 className="responsive-text-lg font-semibold text-white mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className={`px-3 py-1 bg-gradient-to-r ${themeColors.primary} text-white rounded-full responsive-text-sm font-medium`}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Key Features */}
                <div>
                  <h3 className="responsive-text-lg font-semibold text-white mb-3">Key Features</h3>
                  <ul className="space-y-2">
                    {project.features.map((feature, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 text-gray-300 responsive-text-sm"
                      >
                        <div
                          className={`w-2 h-2 bg-gradient-to-r ${themeColors.primary} rounded-full mt-2 flex-shrink-0`}
                        />
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Challenges & Solutions */}
                <div>
                  <h3 className="responsive-text-lg font-semibold text-white mb-3">Challenges & Solutions</h3>
                  <ul className="space-y-2">
                    {project.challenges.map((challenge, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 text-gray-300 responsive-text-sm"
                      >
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                        <span>{challenge}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <Github size={20} />
                    <span className="responsive-text-sm font-medium">View Code</span>
                  </Link>

                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r ${themeColors.primary} hover:opacity-80 text-white rounded-lg transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    <ExternalLink size={20} />
                    <span className="responsive-text-sm font-medium">Visit Live Site</span>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
