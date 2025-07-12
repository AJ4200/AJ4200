"use client"

import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Github, Linkedin, Mail, Phone, MapPin, Heart, Code, Coffee } from "lucide-react"

export function DynamicFooter() {
  const pathname = usePathname()

  const getThemeColors = () => {
    switch (pathname) {
      case "/":
        return {
          primary: "from-purple-500 to-pink-500",
          secondary: "from-purple-900/90 to-pink-900/90",
          accent: "border-purple-500/30",
          bg: "bg-purple-900/10",
        }
      case "/about":
        return {
          primary: "from-orange-500 to-red-500",
          secondary: "from-orange-900/90 to-red-900/90",
          accent: "border-orange-500/30",
          bg: "bg-orange-900/10",
        }
      case "/experience":
        return {
          primary: "from-blue-500 to-cyan-500",
          secondary: "from-blue-900/90 to-cyan-900/90",
          accent: "border-blue-500/30",
          bg: "bg-blue-900/10",
        }
      case "/skills":
        return {
          primary: "from-green-500 to-emerald-500",
          secondary: "from-green-900/90 to-emerald-900/90",
          accent: "border-green-500/30",
          bg: "bg-green-900/10",
        }
      case "/projects":
        return {
          primary: "from-yellow-500 to-amber-500",
          secondary: "from-yellow-900/90 to-amber-900/90",
          accent: "border-yellow-500/30",
          bg: "bg-yellow-900/10",
        }
      case "/contact":
        return {
          primary: "from-indigo-500 to-purple-500",
          secondary: "from-indigo-900/90 to-purple-900/90",
          accent: "border-indigo-500/30",
          bg: "bg-indigo-900/10",
        }
      default:
        return {
          primary: "from-gray-500 to-gray-700",
          secondary: "from-gray-900/90 to-gray-700/90",
          accent: "border-gray-500/30",
          bg: "bg-gray-900/10",
        }
    }
  }

  const themeColors = getThemeColors()

  const socialLinks = [
    {
      href: "https://github.com/AJ4200",
      icon: Github,
      label: "GitHub",
      color: "hover:text-gray-400",
    },
    {
      href: "#",
      icon: Linkedin,
      label: "LinkedIn",
      color: "hover:text-blue-400",
    },
    {
      href: "mailto:abeljackson33@gmail.com",
      icon: Mail,
      label: "Email",
      color: "hover:text-green-400",
    },
  ]

  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/experience", label: "Experience" },
    { href: "/skills", label: "Skills" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <footer
      className={`relative bg-gradient-to-t ${themeColors.secondary} backdrop-blur-md border-t ${themeColors.accent}`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 bg-gradient-to-r ${themeColors.primary} rounded-full opacity-30`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <Link
              href="/"
              className="inline-block mb-4 responsive-text-2xl font-bold text-white hover:scale-105 transition-transform duration-300"
            >
              <span className={`bg-gradient-to-r ${themeColors.primary} bg-clip-text text-transparent`}>
                Abel Majadibodu
              </span>
            </Link>
            <p className="text-gray-300 responsive-text-base leading-relaxed mb-6 max-w-md">
              Innovative Full-Stack Engineer passionate about creating exceptional digital experiences. Specializing in
              modern web technologies and AI integration.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin size={16} className={`text-gradient bg-gradient-to-r ${themeColors.primary}`} />
                <span className="responsive-text-sm">Modimolle, South Africa</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone size={16} className={`text-gradient bg-gradient-to-r ${themeColors.primary}`} />
                <span className="responsive-text-sm">+27 626 775 823</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Mail size={16} className={`text-gradient bg-gradient-to-r ${themeColors.primary}`} />
                <span className="responsive-text-sm">abeljackson33@gmail.com</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className={`p-3 bg-white/10 rounded-lg text-white ${social.color} transition-all duration-300 hover:scale-110 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  data-cursor="pointer"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="responsive-text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className={`text-gray-300 hover:text-white transition-colors duration-300 responsive-text-sm block py-1 hover:translate-x-2 transform transition-transform ${
                      pathname === link.href ? `text-gradient bg-gradient-to-r ${themeColors.primary} font-medium` : ""
                    }`}
                    data-cursor="pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Skills Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="responsive-text-lg font-semibold text-white mb-4">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {["React", "Next.js", "Node.js", ".NET", "PHP", "Python", "AWS", "Docker"].map((tech, index) => (
                <motion.span
                  key={index}
                  className={`px-3 py-1 bg-gradient-to-r ${themeColors.primary} text-white rounded-full responsive-text-xs font-medium`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className={`mt-12 pt-8 border-t ${themeColors.accent} flex flex-col md:flex-row justify-between items-center gap-4`}
        >
          <div className="flex items-center gap-2 text-gray-300 responsive-text-sm">
            <span>© {new Date().getFullYear()} Abel Majadibodu. Made with</span>
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}>
              <Heart size={16} className="text-red-400 fill-current" />
            </motion.div>
            <span>and</span>
            <Coffee size={16} className="text-amber-400" />
          </div>

          <div className="flex items-center gap-4 text-gray-400 responsive-text-sm">
            <div className="flex items-center gap-2">
              <Code size={16} />
              <span>Built with Next.js & Tailwind CSS</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
