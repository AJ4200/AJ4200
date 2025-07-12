"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Download, Check, Loader2 } from "lucide-react"
import { usePathname } from "next/navigation"

export function ResumeDownload() {
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadComplete, setDownloadComplete] = useState(false)
  const pathname = usePathname()

  const getThemeColors = () => {
    switch (pathname) {
      case "/":
        return {
          primary: "from-purple-500 to-pink-500",
          secondary: "from-purple-900/80 to-pink-900/80",
          accent: "border-purple-500/30",
          glow: "shadow-purple-500/20",
          text: "text-purple-300",
        }
      case "/about":
        return {
          primary: "from-orange-500 to-red-500",
          secondary: "from-orange-900/80 to-red-900/80",
          accent: "border-orange-500/30",
          glow: "shadow-orange-500/20",
          text: "text-orange-300",
        }
      case "/experience":
        return {
          primary: "from-blue-500 to-cyan-500",
          secondary: "from-blue-900/80 to-cyan-900/80",
          accent: "border-blue-500/30",
          glow: "shadow-blue-500/20",
          text: "text-blue-300",
        }
      case "/skills":
        return {
          primary: "from-green-500 to-emerald-500",
          secondary: "from-green-900/80 to-emerald-900/80",
          accent: "border-green-500/30",
          glow: "shadow-green-500/20",
          text: "text-green-300",
        }
      case "/projects":
        return {
          primary: "from-yellow-500 to-amber-500",
          secondary: "from-yellow-900/80 to-amber-900/80",
          accent: "border-yellow-500/30",
          glow: "shadow-yellow-500/20",
          text: "text-yellow-300",
        }
      case "/contact":
        return {
          primary: "from-indigo-500 to-purple-500",
          secondary: "from-indigo-900/80 to-purple-900/80",
          accent: "border-indigo-500/30",
          glow: "shadow-indigo-500/20",
          text: "text-indigo-300",
        }
      default:
        return {
          primary: "from-gray-500 to-gray-700",
          secondary: "from-gray-900/80 to-gray-700/80",
          accent: "border-gray-500/30",
          glow: "shadow-gray-500/20",
          text: "text-gray-300",
        }
    }
  }

  const themeColors = getThemeColors()

  const resumeContent = `
═══════════════════════════════════════════════════════════════════════════════
                              ABEL MAJADIBODU
                           Full Stack Developer
═══════════════════════════════════════════════════════════════════════════════

CONTACT INFORMATION
───────────────────────────────────────────────────────────────────────────────
📧 Email:     abeljackson33@gmail.com
📱 Phone:     +27 626 775 823
📍 Location:  Modimolle, South Africa
🔗 GitHub:    github.com/AJ4200
🔗 LinkedIn:  linkedin.com/in/abel-majadibodu

PROFESSIONAL PROFILE
───────────────────────────────────────────────────────────────────────────────
Innovative Full-Stack Engineer with 5+ years of experience building end-to-end 
solutions across JavaScript (React/Next.js/Node), .NET, PHP (Laravel), and 
Python stacks. Expert in cloud deployment (AWS/Azure/Vercel/Docker), database 
architecture (SQL/NoSQL/Redis), and AI integration (OpenAI/HuggingFace). 

Proven track record in optimizing infrastructure (40%+ downtime reduction), 
developing testing frameworks (Jest/Mocha), and leading cross-functional teams.

PROFESSIONAL EXPERIENCE
───────────────────────────────────────────────────────────────────────────────

🏢 FULL STACK DEVELOPER | NexGenix                          01/2025 – Present
   Remote Position
   
   • Conduct client requirement analysis for .NET and PHP solutions, defining 
     system architecture and database schemas
   • Design responsive UI templates using HTML/CSS and implement dynamic views 
     with Razor Pages (C#) and Blade (PHP)
   • Develop full-stack applications using ASP.NET Core (C#) and Laravel (PHP) 
     with MySQL/SQL Server
   • Execute comprehensive testing with xUnit (C#) and PHPUnit (PHP), validating 
     API endpoints and business logic
   • Deploy containerized solutions via Docker on Azure (C#) and AWS (PHP), 
     optimizing performance and scalability
   • Maintain production systems by debugging C# services, optimizing PHP queries, 
     and implementing hotfixes

🏢 FULL STACK DEVELOPER | JEP Productions                   01/2023 – 01/2025
   Remote Position
   
   • Conducted client meetings to gather project requirements and translate 
     business needs into technical specifications
   • Designed user-friendly web interface mock-ups using base HTML and CSS, 
     ensuring optimal user experience
   • Implemented mock-up designs with Next.js, ensuring simultaneous development 
     of backend and frontend components
   • Conducted comprehensive unit tests using Jest to guarantee the readiness of 
     web/PWA apps for deployment
   • Deployed all developed JEP products on Vercel, focusing on rendering 
     optimization and SEO friendliness
   • Maintained and debugged projects when issues arose, ensuring 99% uptime

🏢 IT ADMINISTRATOR | Maghawe Men's Residence               01/2020 – 12/2023
   University of Johannesburg
   
   • Infrastructure Maintenance: Ensured smooth operation of servers, routers, 
     and Wi-Fi systems serving 500+ residents
   • Troubleshooting and Issue Resolution: Promptly addressed server, router, 
     and Wi-Fi issues with average resolution time of 2 hours
   • Monitoring and Reporting: Monitored network performance and tracked 
     connectivity issues using custom dashboards
   • Reduced system downtime by 40% through proactive maintenance and monitoring
   • Implemented security protocols and backup systems

🏢 WEB DEVELOPER | Maghawe Men's Residence                  01/2022 – 06/2022
   University of Johannesburg
   
   • Designed and built user-friendly web interface resulting in 60% increased 
     user adoption and engagement
   • Improved user experience and achieved 85% higher submission rates through 
     intuitive and accessible design
   • Implemented secure authentication and authorization mechanisms
   • Developed efficient issue tracking and management system for streamlined 
     resolution

🏢 TEAM MEMBER | KFC Modimolle                              04/2024 – Present
   Modimolle, South Africa
   
   • Prepare and cook KFC products according to brand standards and operational 
     procedures
   • Provide excellent customer service by assisting guests, taking orders 
     accurately, and handling payments efficiently
   • Maintain clean, organized, and sanitary work environment
   • Work collaboratively with team and respond positively to coaching and feedback

EDUCATION
───────────────────────────────────────────────────────────────────────────────
🎓 BSc in IT - Computer Science and Informatics
   University of Johannesburg | 3rd Year Completed
   
🎓 NSC Matric Certificate
   Solomon Mahlangu High School | 2018

TECHNICAL SKILLS
───────────────────────────────────────────────────────────────────────────────

Frontend Technologies:
• React.js, Next.js, TailwindCSS, Framer Motion
• HTML5, CSS3, JavaScript (ES6+), TypeScript
• Laravel Blade, Responsive Design

Backend Technologies:
• Node.js, Express.js, TypeScript
• Java Spring Boot, Ruby on Rails
• .NET Core, ASP.NET Core
• PHP Laravel, RESTful APIs

Databases:
• PostgreSQL, MongoDB, MySQL
• Redis, Database Design
• Query Optimization, Indexing

Cloud & DevOps:
• AWS (EC2, S3, Lambda), Azure
• Docker, Containerization
• Vercel, Render, CI/CD

Testing & Quality Assurance:
• Jest, Chai.js, Mocha.js
• PHPUnit, xUnit, Test-Driven Development
• Unit Testing, Integration Testing

AI & Machine Learning:
• OpenAI API, OpenAI Assistant API
• HuggingFace, LLM Studio
• GPT-4 Integration, Natural Language Processing

NOTABLE PROJECTS
───────────────────────────────────────────────────────────────────────────────

🚀 CommonFunLib.io                                          01/2023 – Present
   Java Library providing basic common functions like generators, hashers, and 
   convertors not available in JDK/JRE libraries. Open-source project with 
   Maven integration.

🚀 CodeShifter                                              03/2023 – Present
   AI-powered code programming language converter using GPT-4 API. Supports 
   wide range of programming languages with intelligent context understanding.

🚀 Portyfolio                                               04/2023 – Present
   Personal website and portfolio builder that visualizes resumes and presents 
   them in aesthetic settings. Built with React and Next.js.

🚀 H.D.F.Player                                             06/2023
   Web-based gaming emulator built for gaming experience without leaving browser. 
   Implemented using JavaScript and WebGL.

🚀 Tic-Tac-Two                                              09/2023 – Present
   Modern twist on classic Tic-Tac-Toe game transformed into dynamic online 
   multiplayer experience using WebSockets.

🚀 DiE-ALOUGE                                               10/2023
   Halloween-themed dialogue game powered by GPT-3.5 turbo model. Interactive 
   horror experience with AI-driven conversations.

🚀 Task.Me                                                  12/2023
   Task management system for families and colleagues. Features personalized 
   task assignment and progress tracking.

CERTIFICATIONS
───────────────────────────────────────────────────────────────────────────────
🏆 Introduction to Front-End Development | Meta | October 2023
🏆 Frontend Development Libraries | FreeCodeCamp | December 2023
🏆 Data Analysis with Python | IBM | March 2024
🏆 Programming with JavaScript | Meta | October 2023
🏆 Back End Development and APIs | FreeCodeCamp | January 2024
🏆 Quality Assurance | FreeCodeCamp | July 2024

SOFT SKILLS
───────────────────────────────────────────────────────────────────────────────
• Problem Solving & Critical Thinking
• Team Collaboration & Leadership
• Technical Communication
• Adaptability & Continuous Learning
• Time Management & Project Planning
• Creative Thinking & Innovation
• Attention to Detail

PROFESSIONAL REFERENCES
───────────────────────────────────────────────────────────────────────────────

👤 Nkosini Ngwenya
   House Warden (Acting) | UJ's Maqhawe Men's Residence
   📧 nlngwenya@uj.ac.za | 📱 011 559 4255

👤 Louise Cassim
   Residence Assistant | UJ's Maqhawe Men's Residence
   📧 louisecassim@gmail.com | 📱 011 559 3484

👤 Jaden Elijah
   CEO/Co-founder | JEP Productions
   📧 jadeelijah911@gmail.com | 📱 081 678 8897

👤 Valiant Khoza
   Founder | NexGenix
   📧 valiant@nexgx.co.za | 📱 071 586 7165

═══════════════════════════════════════════════════════════════════════════════
                    Thank you for considering my application!
                          Available for immediate start
═══════════════════════════════════════════════════════════════════════════════
`.trim()

  const handleDownload = async () => {
    setIsDownloading(true)
    setDownloadComplete(false)

    // Simulate download process
    await new Promise((resolve) => setTimeout(resolve, 1000))

    try {
      const element = document.createElement("a")
      const file = new Blob([resumeContent], { type: "text/plain;charset=utf-8" })
      element.href = URL.createObjectURL(file)
      element.download = "Abel_Majadibodu_Resume.txt"
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
      URL.revokeObjectURL(element.href)

      setDownloadComplete(true)
      setTimeout(() => {
        setDownloadComplete(false)
      }, 3000)
    } catch (error) {
      console.error("Download failed:", error)
    } finally {
      setIsDownloading(false)
    }
  }

  const getButtonIcon = () => {
    if (downloadComplete) return <Check size={20} className="text-white" />
    if (isDownloading) return <Loader2 size={20} className="text-white animate-spin" />
    return <Download size={20} className="text-white" />
  }

  const getButtonText = () => {
    if (downloadComplete) return "Downloaded!"
    if (isDownloading) return "Downloading..."
    return "Resume"
  }

  return (
    <motion.div
      className="fixed top-24 left-6 z-40"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
    >
      <motion.button
        onClick={handleDownload}
        disabled={isDownloading}
        className={`group relative overflow-hidden w-16 h-16 bg-gradient-to-r ${themeColors.primary} rounded-full shadow-lg ${themeColors.glow} hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center`}
        whileHover={{ scale: isDownloading ? 1 : 1.1 }}
        whileTap={{ scale: isDownloading ? 1 : 0.9 }}
        data-cursor="pointer"
        aria-label="Download Abel's resume"
        title="Download Resume"
      >
        {/* Background animation */}
        <motion.div
          className="absolute inset-0 bg-white/20 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />

        {/* Button content */}
        <div className="relative z-10 flex flex-col items-center">
          <motion.div animate={downloadComplete ? { rotate: [0, 360] } : {}} transition={{ duration: 0.5 }}>
            {getButtonIcon()}
          </motion.div>
        </div>

        {/* Success indicator */}
        {downloadComplete && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center"
          >
            <Check size={8} className="text-white" />
          </motion.div>
        )}

        {/* Ripple effect on click */}
        <motion.div
          className="absolute inset-0 bg-white/30 rounded-full"
          initial={{ scale: 0, opacity: 0 }}
          animate={isDownloading ? { scale: [0, 1.5], opacity: [0.5, 0] } : {}}
          transition={{ duration: 0.6, repeat: isDownloading ? Number.POSITIVE_INFINITY : 0 }}
        />
      </motion.button>

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, x: -10, scale: 0.8 }}
        whileHover={{ opacity: 1, x: 0, scale: 1 }}
        className="absolute left-full top-1/2 transform -translate-y-1/2 ml-3 px-3 py-2 bg-black/90 text-white responsive-text-xs rounded-lg whitespace-nowrap pointer-events-none"
      >
        Download Resume
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-black/90" />
      </motion.div>
    </motion.div>
  )
}
