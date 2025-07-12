"use client"

import { useEffect, useState, useMemo } from "react"
import { motion } from "framer-motion"

interface Particle {
  id: number
  x: number
  size: number
  color: string
  duration: number
  delay: number
}

export function OptimizedParticles({ count = 30 }: { count?: number }) {
  const [particles, setParticles] = useState<Particle[]>([])

  const colors = useMemo(() => ["#3b82f6", "#8b5cf6", "#06b6d4", "#f59e0b"], [])

  useEffect(() => {
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 3 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 5 + 8,
      delay: Math.random() * 3,
    }))
    setParticles(newParticles)
  }, [count, colors])

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full opacity-60"
          style={{
            left: `${particle.x}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
          }}
          animate={{
            y: ["100vh", "-100px"],
            opacity: [0, 1, 1, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}
