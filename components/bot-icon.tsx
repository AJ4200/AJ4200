"use client"

import { motion } from "framer-motion"

interface BotIconProps {
  size?: number
  className?: string
  animate?: boolean
}

export function BotIcon({ size = 24, className = "", animate = false }: BotIconProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      animate={animate ? { rotate: [0, 5, -5, 0] } : {}}
      transition={animate ? { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" } : {}}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-current"
      >
        {/* Bot head */}
        <motion.rect
          x="6"
          y="4"
          width="12"
          height="10"
          rx="3"
          fill="currentColor"
          initial={animate ? { scale: 1 } : {}}
          animate={animate ? { scale: [1, 1.05, 1] } : {}}
          transition={animate ? { duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" } : {}}
        />

        {/* Bot antenna */}
        <motion.line
          x1="12"
          y1="4"
          x2="12"
          y2="2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          animate={animate ? { y1: [4, 3.5, 4] } : {}}
          transition={animate ? { duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" } : {}}
        />

        {/* Antenna tip */}
        <motion.circle
          cx="12"
          cy="2"
          r="1"
          fill="currentColor"
          animate={animate ? { scale: [1, 1.2, 1], opacity: [1, 0.8, 1] } : {}}
          transition={animate ? { duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" } : {}}
        />

        {/* Bot eyes */}
        <motion.circle
          cx="9"
          cy="8"
          r="1"
          fill="white"
          animate={animate ? { scale: [1, 0.8, 1] } : {}}
          transition={animate ? { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.2 } : {}}
        />
        <motion.circle
          cx="15"
          cy="8"
          r="1"
          fill="white"
          animate={animate ? { scale: [1, 0.8, 1] } : {}}
          transition={animate ? { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.2 } : {}}
        />

        {/* Bot mouth */}
        <motion.rect
          x="10"
          y="11"
          width="4"
          height="1"
          rx="0.5"
          fill="white"
          animate={animate ? { width: [4, 3, 4] } : {}}
          transition={animate ? { duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 } : {}}
        />

        {/* Bot body */}
        <motion.rect
          x="8"
          y="14"
          width="8"
          height="6"
          rx="2"
          fill="currentColor"
          animate={animate ? { y: [14, 13.5, 14] } : {}}
          transition={animate ? { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.3 } : {}}
        />

        {/* Bot arms */}
        <motion.rect
          x="4"
          y="16"
          width="3"
          height="2"
          rx="1"
          fill="currentColor"
          animate={animate ? { rotate: [0, 5, 0] } : {}}
          transition={animate ? { duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.8 } : {}}
        />
        <motion.rect
          x="17"
          y="16"
          width="3"
          height="2"
          rx="1"
          fill="currentColor"
          animate={animate ? { rotate: [0, -5, 0] } : {}}
          transition={animate ? { duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 } : {}}
        />

        {/* Bot legs */}
        <motion.rect
          x="9"
          y="20"
          width="2"
          height="2"
          rx="1"
          fill="currentColor"
          animate={animate ? { height: [2, 1.5, 2] } : {}}
          transition={animate ? { duration: 1.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1.2 } : {}}
        />
        <motion.rect
          x="13"
          y="20"
          width="2"
          height="2"
          rx="1"
          fill="currentColor"
          animate={animate ? { height: [2, 1.5, 2] } : {}}
          transition={animate ? { duration: 1.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1.4 } : {}}
        />

        {/* Power indicator */}
        <motion.circle
          cx="16"
          cy="6"
          r="0.5"
          fill="#00ff00"
          animate={animate ? { opacity: [1, 0.3, 1] } : {}}
          transition={animate ? { duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" } : {}}
        />
      </svg>
    </motion.div>
  )
}
