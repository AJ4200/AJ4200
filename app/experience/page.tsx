"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin, Building, CheckCircle } from "lucide-react"
import { PageWrapper } from "@/components/page-wrapper"

export default function ExperiencePage() {
  const experiences = [
    {
      title: "Full Stack Developer",
      company: "NexGenix",
      period: "01/2025 – present",
      location: "Remote",
      description: [
        "Conduct client requirement analysis for .NET and PHP solutions, defining system architecture and database schemas",
        "Design responsive UI templates using HTML/CSS and implement dynamic views with Razor Pages (C#) and Blade (PHP)",
        "Develop full-stack applications using ASP.NET Core (C#) and Laravel (PHP) with MySQL/SQL Server",
        "Execute comprehensive testing with xUnit (C#) and PHPUnit (PHP), validating API endpoints and business logic",
        "Deploy containerized solutions via Docker on Azure (C#) and AWS (PHP), optimizing performance and scalability",
        "Maintain production systems by debugging C# services, optimizing PHP queries, and implementing hotfixes",
      ],
    },
    {
      title: "Full Stack Developer",
      company: "JEP Productions",
      period: "01/2023 – 01/2025",
      location: "Remote",
      description: [
        "Conducted client meetings to gather project requirements",
        "Designed user-friendly web interface mock-ups using base HTML and CSS",
        "Implemented mock-up designs with Next.js, ensuring simultaneous development of backend and frontend",
        "Conducted unit tests using Jest to guarantee the readiness of web/PWA apps for deployment",
        "Deployed all developed JEP products on Vercel, focusing on rendering and optimizing for SEO friendliness",
        "Maintained and debugged projects when issues arose",
      ],
    },
    {
      title: "IT Admin",
      company: "Maghawe Men's Residence",
      period: "01/2020 – 12/2023",
      location: "University of Johannesburg",
      description: [
        "Infrastructure Maintenance: Ensured the smooth operation of servers, routers, and Wi-Fi systems",
        "Troubleshooting and Issue Resolution: Promptly addressed server, router, or Wi-Fi issues",
        "Monitoring and Reporting: Monitored network performance and tracked connectivity issues",
        "Reduced system downtime by 40% through proactive maintenance and monitoring",
      ],
    },
    {
      title: "Web Developer",
      company: "Maghawe Men's Residence",
      period: "01/2022 – 06/2022",
      location: "University of Johannesburg",
      description: [
        "Designed and built a user-friendly web interface resulting in increased user adoption and engagement",
        "Improved user experience and higher submission rates through intuitive and accessible design",
        "Implemented secure authentication and authorization mechanisms",
        "Developed efficient issue tracking and management system for streamlined resolution",
      ],
    },
    {
      title: "Team Member",
      company: "KFC Modimolle",
      period: "04/2024 – present",
      location: "Modimolle",
      description: [
        "Prepare and cook KFC products according to brand standards and operational procedures",
        "Provide excellent customer service by assisting guests, taking orders accurately, and handling payments efficiently",
        "Maintain a clean, organized, and sanitary work environment",
        "Work collaboratively with the team and respond positively to coaching and feedback",
      ],
    },
  ]

  return (
    <PageWrapper>
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-cyan-900 to-teal-900 relative overflow-hidden pt-20">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 animate-pulse" />
          <div className="grid grid-cols-12 gap-4 h-full w-full">
            {[...Array(144)].map((_, i) => (
              <motion.div
                key={i}
                className="bg-white/5 border border-white/10"
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.05,
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Experience</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">My professional journey in software development</p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.2 }}
                className="mb-12"
              >
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{exp.title}</h3>
                      <div className="flex items-center gap-2 text-cyan-300 mb-2">
                        <Building size={16} />
                        <span className="font-semibold">{exp.company}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 text-gray-300 mb-2">
                        <Calendar size={16} />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <MapPin size={16} />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {exp.description.map((item, itemIndex) => (
                      <motion.div
                        key={itemIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.2 + itemIndex * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle size={16} className="text-green-400 mt-1 flex-shrink-0" />
                        <p className="text-gray-300">{item}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
