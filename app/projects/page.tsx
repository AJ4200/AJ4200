"use client"

import { motion } from "framer-motion"
import { Github, ExternalLink, Calendar, Code, Gamepad2, Zap } from "lucide-react"
import Link from "next/link"
import { PageWrapper } from "@/components/page-wrapper"

export default function ProjectsPage() {
  const projects = [
    {
      title: "CommonFunLib.io",
      description:
        "Java Library that provides basic common functions like generators, hashers and convertors that are not available in jdk/jre libraries.",
      period: "01/2023 – present",
      technologies: ["Java", "Maven", "Open Source"],
      icon: Code,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "CodeShifter",
      description:
        "AI based code programming language converter. Powered by GPT-4 API so it supports a wide range of programming languages.",
      period: "03/2023 – present",
      technologies: ["GPT-4", "React", "Node.js", "AI"],
      icon: Zap,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Portyfolio",
      description:
        "Personal website and portfolio builder that visualizes resumes and presents them in an aesthetic setting.",
      period: "04/2023 – present",
      technologies: ["React", "Next.js", "TailwindCSS"],
      icon: Code,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "H.D.F.Player",
      description: "A web-based gaming emulator built for a gaming experience without leaving your browser.",
      period: "06/2023 – 06/2023",
      technologies: ["JavaScript", "WebGL", "Emulation"],
      icon: Gamepad2,
      color: "from-red-500 to-orange-500",
    },
    {
      title: "Mi.Projects",
      description:
        "React.js animations template that any developer, musician or photographer can use to showcase their projects.",
      period: "05/2023 – present",
      technologies: ["React", "Framer Motion", "Animations"],
      icon: Code,
      color: "from-yellow-500 to-amber-500",
    },
    {
      title: "TimeWhere",
      description: "A web application developed as part of a 4-hour front-end coding challenge.",
      period: "06/2023 – 06/2023",
      technologies: ["React", "CSS", "JavaScript"],
      icon: Code,
      color: "from-indigo-500 to-purple-500",
    },
    {
      title: "Tic-Tac-Two",
      description:
        "A modern twist on the classic Tic-Tac-Toe game that transforms a simple board game into a dynamic online multiplayer experience.",
      period: "09/2023 – present",
      technologies: ["React", "WebSockets", "Multiplayer"],
      icon: Gamepad2,
      color: "from-teal-500 to-cyan-500",
    },
    {
      title: "DiE-ALOUGE",
      description:
        "A Halloween-themed dialogue game powered by GPT-3.5 turbo model. Speak to it and don't let the SilentHarbinger lead you to death.",
      period: "10/2023",
      technologies: ["GPT-3.5", "React", "AI", "Game"],
      icon: Gamepad2,
      color: "from-gray-500 to-slate-500",
    },
    {
      title: "Task.Me",
      description:
        "A task management system for families and colleagues. Great way of assigning tasks catered towards the person.",
      period: "12/2023",
      technologies: ["React", "Node.js", "Database"],
      icon: Code,
      color: "from-rose-500 to-pink-500",
    },
  ]

  return (
    <PageWrapper>
      <div className="min-h-screen bg-gradient-to-br from-yellow-900 via-orange-900 to-red-900 relative overflow-hidden pt-20">
        {/* Animated Geometric Background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute border-2 border-white/20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${20 + Math.random() * 40}px`,
                height: `${20 + Math.random() * 40}px`,
                borderRadius: Math.random() > 0.5 ? "50%" : "0%",
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Projects</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">A showcase of my creative and technical endeavors</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="group"
              >
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${project.color}`}>
                      <project.icon size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  </div>

                  <p className="text-gray-300 mb-4 flex-grow">{project.description}</p>

                  <div className="flex items-center gap-2 text-gray-400 mb-4">
                    <Calendar size={16} />
                    <span className="text-sm">{project.period}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="px-3 py-1 bg-white/20 rounded-full text-sm text-white">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3 mt-auto">
                    <Link
                      href="https://github.com/AJ4200"
                      className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-white"
                      data-cursor="pointer"
                    >
                      <Github size={16} />
                      <span>Code</span>
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg transition-colors text-white"
                      data-cursor="pointer"
                    >
                      <ExternalLink size={16} />
                      <span>Live</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="text-center mt-16"
          >
            <Link
              href="https://github.com/AJ4200"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              data-cursor="pointer"
            >
              <Github size={20} />
              <span>View All Projects on GitHub</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  )
}
