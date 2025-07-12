"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Home, User, Briefcase, Code, FolderOpen, Mail } from "lucide-react"

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: User },
  { href: "/experience", label: "Experience", icon: Briefcase },
  { href: "/skills", label: "Skills", icon: Code },
  { href: "/projects", label: "Projects", icon: FolderOpen },
  { href: "/contact", label: "Contact", icon: Mail },
]

export function StickyHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen])

  const getThemeColors = () => {
    switch (pathname) {
      case "/":
        return {
          primary: "from-purple-500 to-pink-500",
          secondary: "from-purple-900/90 to-pink-900/90",
          accent: "border-purple-500/30",
          bg: "bg-purple-900/20",
        }
      case "/about":
        return {
          primary: "from-orange-500 to-red-500",
          secondary: "from-orange-900/90 to-red-900/90",
          accent: "border-orange-500/30",
          bg: "bg-orange-900/20",
        }
      case "/experience":
        return {
          primary: "from-blue-500 to-cyan-500",
          secondary: "from-blue-900/90 to-cyan-900/90",
          accent: "border-blue-500/30",
          bg: "bg-blue-900/20",
        }
      case "/skills":
        return {
          primary: "from-green-500 to-emerald-500",
          secondary: "from-green-900/90 to-emerald-900/90",
          accent: "border-green-500/30",
          bg: "bg-green-900/20",
        }
      case "/projects":
        return {
          primary: "from-yellow-500 to-amber-500",
          secondary: "from-yellow-900/90 to-amber-900/90",
          accent: "border-yellow-500/30",
          bg: "bg-yellow-900/20",
        }
      case "/contact":
        return {
          primary: "from-indigo-500 to-purple-500",
          secondary: "from-indigo-900/90 to-purple-900/90",
          accent: "border-indigo-500/30",
          bg: "bg-indigo-900/20",
        }
      default:
        return {
          primary: "from-gray-500 to-gray-700",
          secondary: "from-gray-900/90 to-gray-700/90",
          accent: "border-gray-500/30",
          bg: "bg-gray-900/20",
        }
    }
  }

  const themeColors = getThemeColors()

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? `bg-gradient-to-r ${themeColors.secondary} backdrop-blur-md border-b ${themeColors.accent} shadow-lg`
            : "bg-black/20 backdrop-blur-sm border-b border-white/10"
        }`}
        role="banner"
        aria-label="Main navigation"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="responsive-text-2xl font-bold text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent rounded-lg px-2 py-1 transition-all duration-300 hover:scale-105"
              aria-label="Abel Majadibodu - Home"
            >
              <motion.span
                className={isScrolled ? `bg-gradient-to-r ${themeColors.primary} bg-clip-text text-transparent` : ""}
                animate={isScrolled ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                Abel M.
              </motion.span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8" role="menubar">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative text-white hover:text-blue-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent rounded-lg ${
                    pathname === item.href ? "text-blue-400" : ""
                  }`}
                  role="menuitem"
                  aria-current={pathname === item.href ? "page" : undefined}
                  data-cursor="pointer"
                >
                  {pathname === item.href && (
                    <motion.div
                      layoutId="activeNav"
                      className={`absolute inset-0 bg-gradient-to-r ${themeColors.primary} opacity-20 rounded-lg -z-10`}
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 px-3 py-2 block responsive-text-base font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent rounded-lg p-2 transition-all duration-300"
              data-cursor="pointer"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 md:hidden"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            <motion.nav
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`fixed inset-y-0 right-0 z-50 w-64 bg-gradient-to-b ${themeColors.secondary} backdrop-blur-md md:hidden border-l ${themeColors.accent}`}
              id="mobile-menu"
              role="menu"
              aria-label="Mobile navigation menu"
            >
              <div className="flex flex-col h-full pt-20 px-6">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center space-x-3 responsive-text-lg font-semibold py-4 px-3 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent ${
                        pathname === item.href
                          ? `text-blue-400 bg-gradient-to-r ${themeColors.primary} bg-opacity-20`
                          : "text-white hover:text-blue-400 hover:bg-white/5"
                      }`}
                      data-cursor="pointer"
                      role="menuitem"
                      aria-current={pathname === item.href ? "page" : undefined}
                    >
                      <item.icon size={24} aria-hidden="true" />
                      <span>{item.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
