"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useLoading } from "@/contexts/loading-context"
import { Play, RefreshCw, Download, Upload, Settings } from "lucide-react"

export function LoaderDemo() {
  const { startUpdate, simulateProgress, setUpdating } = useLoading()
  const [isVisible, setIsVisible] = useState(false)

  const demoActions = [
    {
      label: "Simulate Page Load",
      icon: RefreshCw,
      action: () => simulateProgress(2000),
      description: "Test the top-line loader",
    },
    {
      label: "Update Content",
      icon: Download,
      action: () => {
        startUpdate("Updating content...")
        simulateProgress(3000)
      },
      description: "Test content update with popover",
    },
    {
      label: "Upload Files",
      icon: Upload,
      action: () => {
        startUpdate("Uploading files...")
        simulateProgress(4000)
      },
      description: "Simulate file upload process",
    },
    {
      label: "Save Settings",
      icon: Settings,
      action: () => {
        startUpdate("Saving settings...")
        simulateProgress(1500)
      },
      description: "Test settings save operation",
    },
  ]

  return (
    <>
      {/* Demo Toggle Button */}
      <motion.button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-24 right-6 z-50 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        data-cursor="pointer"
        aria-label="Toggle loader demo"
      >
        <Play size={16} className="text-white" />
      </motion.button>

      {/* Demo Panel */}
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.8, x: 50 }}
          className="fixed bottom-24 right-20 z-50 w-80 bg-black/90 backdrop-blur-md rounded-xl border border-white/20 shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-900/80 to-purple-900/80 p-4 border-b border-white/10">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white responsive-text-lg">Loader Demo</h3>
              <button
                onClick={() => setIsVisible(false)}
                className="text-white hover:text-gray-300 transition-colors"
                aria-label="Close demo panel"
              >
                ×
              </button>
            </div>
          </div>

          {/* Demo Actions */}
          <div className="p-4 space-y-3">
            {demoActions.map((action, index) => (
              <motion.button
                key={index}
                onClick={action.action}
                className="w-full flex items-center gap-3 p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-left"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                data-cursor="pointer"
              >
                <action.icon size={20} className="text-blue-400" />
                <div>
                  <p className="text-white font-medium responsive-text-sm">{action.label}</p>
                  <p className="text-gray-400 responsive-text-xs">{action.description}</p>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Instructions */}
          <div className="p-4 border-t border-white/10">
            <p className="text-gray-400 responsive-text-xs text-center">
              Click any action above to test the loading system
            </p>
          </div>
        </motion.div>
      )}
    </>
  )
}
