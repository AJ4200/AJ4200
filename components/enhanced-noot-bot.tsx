"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, X, Minimize2, Maximize2, RefreshCw, MessageCircle, AlertCircle } from "lucide-react"
import { usePathname } from "next/navigation"
import { BotIcon } from "./bot-icon"

interface Message {
  id: string
  content: string
  isBot: boolean
  timestamp: Date
}

export function EnhancedNootBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hi there! 👋 I'm NootBot, your friendly AI assistant! I know everything about Abel Majadibodu - his skills, experience, projects, and background. What would you like to know about him?",
      isBot: true,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const abortControllerRef = useRef<AbortController | null>(null)
  const pathname = usePathname()

  const getThemeColors = () => {
    switch (pathname) {
      case "/":
        return {
          primary: "from-purple-500 to-pink-500",
          secondary: "from-purple-900/95 to-pink-900/95",
          accent: "border-purple-500/30",
          glow: "shadow-purple-500/20",
        }
      case "/about":
        return {
          primary: "from-orange-500 to-red-500",
          secondary: "from-orange-900/95 to-red-900/95",
          accent: "border-orange-500/30",
          glow: "shadow-orange-500/20",
        }
      case "/experience":
        return {
          primary: "from-blue-500 to-cyan-500",
          secondary: "from-blue-900/95 to-cyan-900/95",
          accent: "border-blue-500/30",
          glow: "shadow-blue-500/20",
        }
      case "/skills":
        return {
          primary: "from-green-500 to-emerald-500",
          secondary: "from-green-900/95 to-emerald-900/95",
          accent: "border-green-500/30",
          glow: "shadow-green-500/20",
        }
      case "/projects":
        return {
          primary: "from-yellow-500 to-amber-500",
          secondary: "from-yellow-900/95 to-amber-900/95",
          accent: "border-yellow-500/30",
          glow: "shadow-yellow-500/20",
        }
      case "/contact":
        return {
          primary: "from-indigo-500 to-purple-500",
          secondary: "from-indigo-900/95 to-purple-900/95",
          accent: "border-indigo-500/30",
          glow: "shadow-indigo-500/20",
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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus()
    }
  }, [isOpen, isMinimized])

  const handleSendMessage = useCallback(async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)
    setError(null)

    // Cancel any existing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController()

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage.content }),
        signal: abortControllerRef.current.signal,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`)
      }

      if (!data.success) {
        throw new Error(data.message || "Failed to get response")
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message || "I'm sorry, I couldn't process that request. Please try again!",
        isBot: true,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
      setRetryCount(0) // Reset retry count on success
    } catch (error: any) {
      if (error.name === "AbortError") {
        return // Request was cancelled, don't show error
      }

      console.error("Chat error:", error)
      setError(error.message || "Failed to get response")

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Sorry, I'm having trouble connecting right now. ${
          retryCount < 2 ? "Please try again!" : "Please check your connection and try again later."
        } 🤖💔`,
        isBot: true,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
      setRetryCount((prev) => prev + 1)
    } finally {
      setIsLoading(false)
      abortControllerRef.current = null
    }
  }, [inputValue, isLoading, retryCount])

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const clearChat = () => {
    setMessages([
      {
        id: "1",
        content:
          "Hi there! 👋 I'm NootBot, your friendly AI assistant! I know everything about Abel Majadibodu. What would you like to know?",
        isBot: true,
        timestamp: new Date(),
      },
    ])
    setError(null)
    setRetryCount(0)
  }

  const quickQuestions = [
    "Tell me about Abel's experience",
    "What are Abel's main skills?",
    "Show me Abel's projects",
    "How can I contact Abel?",
  ]

  return (
    <>
      {/* Floating Bot Icon */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
      >
        <motion.button
          onClick={() => setIsOpen(true)}
          className={`w-16 h-16 bg-gradient-to-r ${themeColors.primary} rounded-full shadow-lg ${themeColors.glow} hover:shadow-xl transition-all duration-300 flex items-center justify-center group relative overflow-hidden`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          data-cursor="pointer"
          aria-label="Open NootBot chat assistant"
        >
          <motion.div
            className="absolute inset-0 bg-white/20 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
          <div className="relative z-10">
            <BotIcon size={28} className="text-white" animate={true} />
          </div>
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
          />
        </motion.button>
      </motion.div>

      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 50, y: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 50, y: 50 }}
            className={`fixed bottom-6 right-6 z-50 ${
              isMinimized ? "w-80 h-16" : "w-96 h-[600px]"
            } bg-black/95 backdrop-blur-md rounded-xl border border-white/20 shadow-2xl ${themeColors.glow} overflow-hidden transition-all duration-300 flex flex-col`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="nootbot-title"
          >
            {/* Sticky Header */}
            <div
              className={`sticky top-0 z-10 bg-gradient-to-r ${themeColors.secondary} backdrop-blur-md p-4 border-b ${themeColors.accent}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <BotIcon size={24} className="text-white" animate={!isMinimized} />
                  <div>
                    <h3 id="nootbot-title" className="font-bold text-white responsive-text-base">
                      NootBot
                    </h3>
                    {!isMinimized && (
                      <p className="responsive-text-xs text-gray-300">
                        {isLoading ? "Thinking..." : error ? "Connection issue" : "Ask me about Abel!"}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!isMinimized && (
                    <button
                      onClick={clearChat}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                      data-cursor="pointer"
                      aria-label="Clear chat history"
                      title="Clear chat"
                    >
                      <RefreshCw size={16} className="text-white" />
                    </button>
                  )}
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    data-cursor="pointer"
                    aria-label={isMinimized ? "Maximize chat" : "Minimize chat"}
                  >
                    {isMinimized ? (
                      <Maximize2 size={16} className="text-white" />
                    ) : (
                      <Minimize2 size={16} className="text-white" />
                    )}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    data-cursor="pointer"
                    aria-label="Close chat"
                  >
                    <X size={16} className="text-white" />
                  </button>
                </div>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                    >
                      <div
                        className={`max-w-[85%] p-3 rounded-lg ${
                          message.isBot
                            ? "bg-white/10 text-white border border-white/10"
                            : `bg-gradient-to-r ${themeColors.primary} text-white shadow-lg`
                        }`}
                      >
                        {message.isBot && (
                          <div className="flex items-center gap-2 mb-2">
                            <BotIcon size={16} className="text-gray-300" />
                            <span className="responsive-text-xs text-gray-300 font-medium">NootBot</span>
                          </div>
                        )}
                        <p className="responsive-text-sm leading-relaxed">{message.content}</p>
                        <p className="responsive-text-xs opacity-70 mt-1">{message.timestamp.toLocaleTimeString()}</p>
                      </div>
                    </motion.div>
                  ))}

                  {isLoading && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                      <div className="bg-white/10 p-3 rounded-lg border border-white/10">
                        <div className="flex items-center gap-2 mb-2">
                          <BotIcon size={16} className="text-gray-300" animate={true} />
                          <span className="responsive-text-xs text-gray-300 font-medium">NootBot</span>
                        </div>
                        <div className="flex space-x-1">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              className="w-2 h-2 bg-white rounded-full"
                              animate={{ y: [0, -8, 0] }}
                              transition={{
                                duration: 0.6,
                                repeat: Number.POSITIVE_INFINITY,
                                delay: i * 0.2,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {error && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center">
                      <div className="bg-red-500/20 border border-red-500/30 text-red-300 p-3 rounded-lg responsive-text-sm flex items-center gap-2">
                        <AlertCircle size={16} />
                        <span>{error}</span>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Questions */}
                {messages.length === 1 && (
                  <div className="px-4 pb-2">
                    <p className="responsive-text-xs text-gray-400 mb-2">Quick questions:</p>
                    <div className="flex flex-wrap gap-2">
                      {quickQuestions.map((question, index) => (
                        <button
                          key={index}
                          onClick={() => setInputValue(question)}
                          className="responsive-text-xs px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                          data-cursor="pointer"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sticky Input */}
                <div className="sticky bottom-0 p-4 border-t border-white/10 bg-black/50 backdrop-blur-sm">
                  <div className="flex gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me about Abel..."
                      disabled={isLoading}
                      className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 transition-all responsive-text-sm"
                      data-cursor="text"
                      aria-label="Type your message to NootBot"
                    />
                    <motion.button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isLoading}
                      className={`p-2 bg-gradient-to-r ${themeColors.primary} rounded-lg hover:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      data-cursor="pointer"
                      aria-label="Send message"
                    >
                      <Send size={16} className="text-white" />
                    </motion.button>
                  </div>
                </div>
              </>
            )}

            {/* Minimized View */}
            {isMinimized && (
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <BotIcon size={20} className="text-white" />
                  <div>
                    <p className="text-white responsive-text-sm font-medium">NootBot</p>{" "}
                    <p className="text-white responsive-text-sm font-medium">NootBot</p>
                    <p className="text-gray-400 responsive-text-xs">
                      {isLoading ? "Thinking..." : `${messages.length} messages`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle size={16} className="text-white" />
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </>
  )
}
