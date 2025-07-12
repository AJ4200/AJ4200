"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)
    const handleMouseOut = () => setIsVisible(false)

    window.addEventListener("mousemove", updateMousePosition)
    window.addEventListener("mouseout", handleMouseOut)

    // Update selector to include all interactive elements and modal content
    const interactiveElements = document.querySelectorAll(
      'a, button, input, textarea, select, [data-cursor="pointer"], [data-cursor="text"], [role="button"], [role="link"], [role="menuitem"], [role="tab"], [role="option"]',
    )

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter)
      el.addEventListener("mouseleave", handleMouseLeave)
    })

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
      window.removeEventListener("mouseout", handleMouseOut)
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter)
        el.removeEventListener("mouseleave", handleMouseLeave)
      })
    }
  }, [pathname])

  const getCursorStyle = () => {
    switch (pathname) {
      case "/":
        return "bg-gradient-to-r from-purple-500 to-pink-500"
      case "/about":
        return "bg-gradient-to-r from-orange-500 to-red-500"
      case "/experience":
        return "bg-gradient-to-r from-blue-500 to-cyan-500"
      case "/skills":
        return "bg-gradient-to-r from-green-500 to-emerald-500"
      case "/projects":
        return "bg-gradient-to-r from-yellow-500 to-amber-500"
      case "/contact":
        return "bg-gradient-to-r from-indigo-500 to-purple-500"
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-700"
    }
  }

  if (!isVisible) return null

  return (
    <motion.div
      className={`fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none mix-blend-difference ${getCursorStyle()}`}
      style={{
        zIndex: 9999, // Ensure cursor is always on top
        willChange: "transform",
      }}
      animate={{
        x: mousePosition.x - 8,
        y: mousePosition.y - 8,
        scale: isHovering ? 2 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 28,
        mass: 0.5,
      }}
    >
      {/* Inner dot for better visibility */}
      <motion.div
        className="absolute inset-1 bg-white rounded-full opacity-80"
        animate={{
          scale: isHovering ? 0.3 : 0.5,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
      />

      {/* Outer ring for hover state */}
      {isHovering && (
        <motion.div
          className="absolute -inset-2 border-2 border-white rounded-full opacity-50"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
        />
      )}
    </motion.div>
  )
}
