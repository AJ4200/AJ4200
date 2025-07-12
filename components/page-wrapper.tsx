"use client"

import type React from "react"
import { motion } from "framer-motion"

interface PageWrapperProps {
  children: React.ReactNode
  className?: string
}

export function PageWrapper({ children, className = "" }: PageWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`min-h-screen flex flex-col ${className}`}
    >
      {/* Main content area with proper spacing */}
      <main className="flex-1 pb-20">{children}</main>
    </motion.div>
  )
}
