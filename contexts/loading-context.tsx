"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"

interface LoadingState {
  isPageLoading: boolean
  isUpdating: boolean
  updateMessage: string
  progress: number
}

interface LoadingContextType extends LoadingState {
  setPageLoading: (loading: boolean) => void
  setUpdating: (updating: boolean, message?: string) => void
  setProgress: (progress: number) => void
  startUpdate: (message?: string) => void
  finishUpdate: () => void
  simulateProgress: (duration?: number) => void
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isPageLoading: false,
    isUpdating: false,
    updateMessage: "Updating...",
    progress: 0,
  })

  const setPageLoading = useCallback((loading: boolean) => {
    setLoadingState((prev) => ({ ...prev, isPageLoading: loading }))
  }, [])

  const setUpdating = useCallback((updating: boolean, message = "Updating...") => {
    setLoadingState((prev) => ({
      ...prev,
      isUpdating: updating,
      updateMessage: message,
      progress: updating ? 0 : 100,
    }))
  }, [])

  const setProgress = useCallback((progress: number) => {
    setLoadingState((prev) => ({ ...prev, progress: Math.min(100, Math.max(0, progress)) }))
  }, [])

  const startUpdate = useCallback((message = "Updating...") => {
    setLoadingState((prev) => ({
      ...prev,
      isUpdating: true,
      updateMessage: message,
      progress: 0,
    }))
  }, [])

  const finishUpdate = useCallback(() => {
    setLoadingState((prev) => ({ ...prev, progress: 100 }))
    setTimeout(() => {
      setLoadingState((prev) => ({ ...prev, isUpdating: false, progress: 0 }))
    }, 500)
  }, [])

  const simulateProgress = useCallback(
    (duration = 2000) => {
      const steps = 50
      const stepDuration = duration / steps
      let currentStep = 0

      const interval = setInterval(() => {
        currentStep++
        const progress = (currentStep / steps) * 100
        setProgress(progress)

        if (currentStep >= steps) {
          clearInterval(interval)
          finishUpdate()
        }
      }, stepDuration)

      return () => clearInterval(interval)
    },
    [setProgress, finishUpdate],
  )

  const value: LoadingContextType = {
    ...loadingState,
    setPageLoading,
    setUpdating,
    setProgress,
    startUpdate,
    finishUpdate,
    simulateProgress,
  }

  return <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
}

export function useLoading() {
  const context = useContext(LoadingContext)
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider")
  }
  return context
}
