"use client"

import { motion } from "framer-motion"
import { Code, Database, Cloud, TestTube, Cpu, Palette } from "lucide-react"
import { PageWrapper } from "@/components/page-wrapper"

export default function SkillsPage() {
  const skillCategories = [
    {
      title: "General Technologies",
      icon: Code,
      skills: ["HTML", "CSS", "JavaScript", "Python", "Java", "C#", "PHP"],
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Frontend Technologies",
      icon: Palette,
      skills: ["React.js", "Next.js", "TailwindCSS", "Framer Motion", "Laravel Blade"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Backend Technologies",
      icon: Cpu,
      skills: ["Node.js", "Express.js", "TypeScript", "Java Spring Boot", "Ruby on Rails", ".NET"],
      color: "from-purple-500 to-violet-500",
    },
    {
      title: "Databases",
      icon: Database,
      skills: ["PostgreSQL", "MongoDB", "MySQL", "Redis"],
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Cloud Technologies",
      icon: Cloud,
      skills: ["Vercel", "Docker", "AWS", "Azure", "Render"],
      color: "from-teal-500 to-cyan-500",
    },
    {
      title: "Testing Technologies",
      icon: TestTube,
      skills: ["Jest", "Chai.js", "Mocha.js", "PHPUnit", "xUnit"],
      color: "from-pink-500 to-rose-500",
    },
  ]

  const aiTechnologies = ["OpenAI API", "OpenAI Assistant API", "HuggingFace", "LLM Studio", "GPT-4 Integration"]

  const otherSkills = ["Sound Design", "Video Editing", "Game Design", "UI/UX Design", "Technical Writing"]

  return (
    <PageWrapper>
      <div className="min-h-screen bg-black relative overflow-hidden pt-20">
        {/* Matrix Background */}
        <div className="absolute inset-0 matrix-bg opacity-30" />

        {/* Falling Code Effect */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-green-400 font-mono text-sm opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                fontFamily: "monospace",
              }}
              animate={{
                y: ["-100vh", "100vh"],
              }}
              transition={{
                duration: 10 + Math.random() * 5,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 5,
                ease: "linear",
              }}
            >
              {Array.from({ length: 20 }, () => (Math.random() > 0.5 ? "1" : "0")).join("")}
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Skills</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">Technologies and tools I work with</p>
          </motion.div>

          {/* Main Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {skillCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${category.color}`}>
                    <category.icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{category.title}</h3>
                </div>
                <div className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 + skillIndex * 0.05 }}
                      className="flex items-center gap-2"
                    >
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      <span className="text-gray-300">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* AI Technologies Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-md rounded-xl p-8 border border-purple-500/30 mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-6 text-center">AI Technologies</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {aiTechnologies.map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg p-4 text-center font-semibold hover:scale-105 transition-transform"
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Other Skills */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20"
          >
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Other Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {otherSkills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 + index * 0.1 }}
                  className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-lg p-4 text-center font-semibold hover:scale-105 transition-transform"
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  )
}
