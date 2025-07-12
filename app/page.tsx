"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowDown, Github, Linkedin, Mail, MapPin, ExternalLink, Calendar, Code, Gamepad2, Zap } from "lucide-react"
import { OptimizedParticles } from "@/components/optimized-particles"
import { ProjectModal } from "@/components/project-modal"
import Link from "next/link"
import { PageWrapper } from "@/components/page-wrapper"
import { GitHubStats } from "@/components/github-stats"

const projects = [
  {
    id: "1",
    title: "CommonFunLib.io",
    description: "Java Library that provides basic common functions like generators, hashers and convertors.",
    longDescription:
      "A comprehensive Java library designed to fill the gaps in the standard JDK/JRE libraries. CommonFunLib.io provides essential utility functions for common programming tasks, including advanced generators, secure hashers, and versatile data convertors. Built with performance and reliability in mind, this open-source library has been adopted by numerous Java projects worldwide.",
    period: "01/2023 – present",
    technologies: ["Java", "Maven", "JUnit", "Open Source", "CI/CD"],
    githubUrl: "https://github.com/AJ4200",
    liveUrl: "https://github.com/AJ4200/CommonFunLib.io",
    imageUrl: "/placeholder.svg?height=300&width=500",
    features: [
      "Advanced data generators with customizable patterns",
      "Secure hashing algorithms with salt support",
      "Multi-format data convertors (JSON, XML, CSV)",
      "Thread-safe implementations",
      "Comprehensive unit test coverage",
      "Maven Central distribution",
    ],
    challenges: [
      "Ensuring thread safety across all utility functions",
      "Optimizing performance for large-scale data processing",
      "Maintaining backward compatibility across versions",
      "Creating comprehensive documentation and examples",
    ],
  },
  {
    id: "2",
    title: "CodeShifter",
    description: "AI based code programming language converter powered by GPT-4 API.",
    longDescription:
      "An intelligent code translation platform that leverages the power of GPT-4 to seamlessly convert code between different programming languages. CodeShifter understands context, maintains code structure, and preserves functionality while translating, making it an invaluable tool for developers working across multiple technology stacks.",
    period: "03/2023 – present",
    technologies: ["GPT-4", "React", "Node.js", "TypeScript", "AI", "REST API"],
    githubUrl: "https://github.com/AJ4200",
    liveUrl: "https://codeshifter-demo.vercel.app",
    imageUrl: "/placeholder.svg?height=300&width=500",
    features: [
      "Support for 20+ programming languages",
      "Context-aware code translation",
      "Syntax highlighting and error detection",
      "Real-time translation preview",
      "Code optimization suggestions",
      "Export functionality for multiple formats",
    ],
    challenges: [
      "Handling complex code structures and dependencies",
      "Maintaining code logic integrity during translation",
      "Optimizing API calls for cost-effectiveness",
      "Creating an intuitive user interface for developers",
    ],
  },
  {
    id: "3",
    title: "Portyfolio",
    description: "Personal website and portfolio builder that visualizes resumes in an aesthetic setting.",
    longDescription:
      "A modern portfolio builder that transforms traditional resumes into stunning, interactive web experiences. Portyfolio offers customizable templates, smooth animations, and responsive design to help professionals showcase their skills and experience in the most compelling way possible.",
    period: "04/2023 – present",
    technologies: ["React", "Next.js", "TailwindCSS", "Framer Motion", "TypeScript"],
    githubUrl: "https://github.com/AJ4200",
    liveUrl: "https://portyfolio-demo.vercel.app",
    imageUrl: "/placeholder.svg?height=300&width=500",
    features: [
      "Drag-and-drop portfolio builder",
      "Multiple professional templates",
      "Real-time preview and editing",
      "SEO optimization",
      "Mobile-responsive design",
      "PDF export functionality",
    ],
    challenges: [
      "Creating a flexible template system",
      "Implementing smooth animations without performance loss",
      "Ensuring cross-browser compatibility",
      "Building an intuitive drag-and-drop interface",
    ],
  },
  {
    id: "4",
    title: "H.D.F.Player",
    description: "A web-based gaming emulator built for a gaming experience without leaving your browser.",
    longDescription:
      "An innovative browser-based gaming platform that brings classic games to the web without requiring downloads or installations. H.D.F.Player uses advanced web technologies to emulate various gaming systems, providing a seamless gaming experience with save states, customizable controls, and social features.",
    period: "06/2023 – 06/2023",
    technologies: ["JavaScript", "WebGL", "WebAssembly", "Canvas API", "Emulation"],
    githubUrl: "https://github.com/AJ4200",
    liveUrl: "https://hdf-player-demo.vercel.app",
    imageUrl: "/placeholder.svg?height=300&width=500",
    features: [
      "Multiple gaming system support",
      "Save state functionality",
      "Customizable control mapping",
      "Full-screen gaming mode",
      "Audio and video synchronization",
      "Social sharing capabilities",
    ],
    challenges: [
      "Optimizing emulation performance in browsers",
      "Handling different ROM formats and compatibility",
      "Implementing accurate timing and synchronization",
      "Creating responsive touch controls for mobile",
    ],
  },
]

export default function HomePage() {
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects-section")
    if (projectsSection) {
      projectsSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  const openProjectModal = (project: (typeof projects)[0]) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeProjectModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedProject(null), 300)
  }

  return (
    <PageWrapper>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 relative overflow-hidden">
        <OptimizedParticles count={40} />

        {/* Hero Section */}
        <section className="relative z-10 flex items-center justify-center min-h-screen px-6">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <motion.h1
                className="responsive-text-6xl md:responsive-text-8xl font-bold text-white mb-4"
                animate={{
                  textShadow: ["0 0 20px #3b82f6", "0 0 40px #8b5cf6", "0 0 20px #3b82f6"],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                Abel Majadibodu
              </motion.h1>
              <motion.p
                className="responsive-text-xl md:responsive-text-2xl text-gray-300 mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Full Stack Developer
              </motion.p>
              <motion.div
                className="flex items-center justify-center gap-2 text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <MapPin size={16} aria-hidden="true" />
                <span className="responsive-text-base">Modimolle, South Africa</span>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="mb-8"
            >
              <p className="responsive-text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Innovative Full-Stack Engineer with 5+ years of experience building end-to-end solutions across
                JavaScript, .NET, PHP, and Python stacks. Expert in cloud deployment and AI integration.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="flex items-center justify-center gap-6 mb-12"
              role="list"
              aria-label="Social media links"
            >
              <Link
                href="https://github.com/AJ4200"
                className="text-white hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent rounded-lg p-2"
                data-cursor="pointer"
                aria-label="Visit Abel's GitHub profile"
                role="listitem"
              >
                <Github size={24} aria-hidden="true" />
              </Link>
              <Link
                href="#"
                className="text-white hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent rounded-lg p-2"
                data-cursor="pointer"
                aria-label="Visit Abel's LinkedIn profile"
                role="listitem"
              >
                <Linkedin size={24} aria-hidden="true" />
              </Link>
              <Link
                href="mailto:abeljackson33@gmail.com"
                className="text-white hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent rounded-lg p-2"
                data-cursor="pointer"
                aria-label="Send email to Abel"
                role="listitem"
              >
                <Mail size={24} aria-hidden="true" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                href="/projects"
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 animate-pulse-glow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent responsive-text-base font-semibold"
                data-cursor="pointer"
              >
                View My Work
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent responsive-text-base font-semibold"
                data-cursor="pointer"
              >
                Get In Touch
              </Link>
            </motion.div>
          </div>

          {/* Interactive Arrow */}
          <motion.button
            onClick={scrollToProjects}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white hover:text-purple-400 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-full p-4 group"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            data-cursor="pointer"
            aria-label="Scroll to projects section"
          >
            <motion.div
              className="relative"
              whileHover={{
                boxShadow: "0 0 20px rgba(139, 92, 246, 0.5)",
                background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(236, 72, 153, 0.2))",
              }}
              className="rounded-full p-2"
            >
              <ArrowDown size={24} />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-purple-500 opacity-0 group-hover:opacity-100"
                animate={{ scale: [1, 1.5, 1], opacity: [0, 0.5, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              />
            </motion.div>
          </motion.button>
        </section>

        {/* Featured Projects Section */}
        <section id="projects-section" className="relative z-10 py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="responsive-text-4xl md:responsive-text-5xl font-bold text-white mb-4">
                Featured Projects
              </h2>
              <p className="responsive-text-xl text-gray-300 max-w-2xl mx-auto">
                A showcase of my latest work and creative endeavors
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="group cursor-pointer"
                  onClick={() => openProjectModal(project)}
                  data-cursor="pointer"
                >
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                        {project.title.includes("Java") && <Code size={24} className="text-white" />}
                        {project.title.includes("AI") && <Zap size={24} className="text-white" />}
                        {project.title.includes("Portfolio") && <Code size={24} className="text-white" />}
                        {project.title.includes("Player") && <Gamepad2 size={24} className="text-white" />}
                      </div>
                      <h3 className="responsive-text-xl font-bold text-white">{project.title}</h3>
                    </div>

                    <p className="text-gray-300 mb-4 flex-grow">{project.description}</p>

                    <div className="flex items-center gap-2 text-gray-400 mb-4">
                      <Calendar size={16} />
                      <span className="responsive-text-sm">{project.period}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-white/20 rounded-full responsive-text-sm text-white"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-3 py-1 bg-white/20 rounded-full responsive-text-sm text-white">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="flex gap-3 mt-auto">
                      <div className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-lg text-white responsive-text-sm">
                        <Github size={16} />
                        <span>Code</span>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white responsive-text-sm">
                        <ExternalLink size={16} />
                        <span>Live Demo</span>
                      </div>
                    </div>

                    {/* Hover Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      initial={false}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-center mt-12"
            >
              <Link
                href="/projects"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                data-cursor="pointer"
              >
                <span>View All Projects</span>
                <ArrowDown className="rotate-[-90deg]" size={20} />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Add GitHub Stats Section */}
        <GitHubStats />

        {/* Project Modal */}
        <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={closeProjectModal} />
      </div>
    </PageWrapper>
  )
}
