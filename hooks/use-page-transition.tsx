"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { useLoading } from "@/contexts/loading-context"

export function usePageTransition() {
  const pathname = usePathname()
  const { setPageLoading, simulateProgress } = useLoading()

  useEffect(() => {
    // Start loading when pathname changes
    setPageLoading(true)

    // Simulate page loading progress
    const cleanup = simulateProgress(1500)

    // Cleanup function
    return () => {
      cleanup()
      setPageLoading(false)
    }
  }, [pathname, setPageLoading, simulateProgress])
}
