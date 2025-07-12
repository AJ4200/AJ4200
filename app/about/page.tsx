"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin, Phone, Mail, Award, Book, Star, Quote } from "lucide-react"
import { PageWrapper } from "@/components/page-wrapper"

export default function AboutPage() {
  const skills = [
    "Problem Solving",
    "Team Collaboration",
    "Technical Communication",
    "Adaptability",
    "Time Management",
    "Creative Thinking",
    "Leadership",
  ]

  const certifications = [
    { name: "Introduction to Front-End Development", issuer: "Meta", date: "Oct 2023" },
    { name: "Frontend Development Libraries", issuer: "FreeCodeCamp", date: "Dec 2023" },
    { name: "Data Analysis with Python", issuer: "IBM", date: "Mar 2024" },
    { name: "Programming with JavaScript", issuer: "Meta", date: "Oct 2023" },
    { name: "Back End Development and APIs", issuer: "FreeCodeCamp", date: "Jan 2024" },
    { name: "Quality Assurance", issuer: "FreeCodeCamp", date: "Jul 2024" },
  ]

  const testimonials = [
    {
      name: "Jaden Elijah",
      role: "CEO/Co-founder at JEP Productions",
      content:
        "Abel is an exceptional full-stack developer who consistently delivers high-quality solutions. His expertise in React, Next.js, and backend technologies made our projects successful.",
      rating: 5,
    },
    {
      name: "Valiant Khoza",
      role: "Founder at NexGenix",
      content:
        "Working with Abel has been a game-changer for our development team. His proficiency in .NET, PHP, and cloud deployment helped us optimize our infrastructure by 40%.",
      rating: 5,
    },
    {
      name: "Nkosini Ngwenya",
      role: "House Warden at UJ's Maqhawe Men's Residence",
      content:
        "Abel demonstrated exceptional technical leadership during his time as IT Admin. He reduced system downtime significantly and created user-friendly web interfaces.",
      rating: 5,
    },
    {
      name: "Louise Cassim",
      role: "Residence Assistant at UJ's Maqhawe Men's Residence",
      content:
        "Abel's web development skills transformed our student management system. The interface he created was intuitive and significantly improved user engagement.",
      rating: 5,
    },
  ]

  return (
    <PageWrapper>
      <div className="min-h-screen bg-gradient-to-br from-orange-900 via-red-900 to-pink-900 relative overflow-hidden pt-20">
        {/* Floating Elements Background */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 bg-white/10 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <main id="main-content" className="relative z-10 container mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="responsive-text-5xl md:responsive-text-6xl font-bold text-white mb-4">About Me</h1>
            <p className="responsive-text-xl text-gray-300 max-w-2xl mx-auto">Get to know the person behind the code</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Personal Info */}
            <motion.section
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20"
              aria-labelledby="personal-info-heading"
            >
              <h2 id="personal-info-heading" className="responsive-text-3xl font-bold text-white mb-6">
                Personal Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-300">
                  <Calendar size={20} aria-hidden="true" />
                  <span className="responsive-text-base">Born April 24, 1999</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin size={20} aria-hidden="true" />
                  <span className="responsive-text-base">Modimolle, South Africa</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Phone size={20} aria-hidden="true" />
                  <span className="responsive-text-base">+27 626 775 823</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Mail size={20} aria-hidden="true" />
                  <span className="responsive-text-base">abeljackson33@gmail.com</span>
                </div>
              </div>
            </motion.section>

            {/* Profile Summary */}
            <motion.section
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20"
              aria-labelledby="profile-heading"
            >
              <h2 id="profile-heading" className="responsive-text-3xl font-bold text-white mb-6">
                Profile
              </h2>
              <p className="text-gray-300 leading-relaxed responsive-text-base">
                Innovative Full-Stack Engineer with 5+ years of experience building end-to-end solutions across
                JavaScript (React/Next.js/Node), .NET, PHP (Laravel), and Python stacks. Expert in cloud deployment
                (AWS/Azure/Vercel/Docker), database architecture (SQL/NoSQL/Redis), and AI integration
                (OpenAI/HuggingFace). Proven track record in optimizing infrastructure, developing testing frameworks,
                and leading cross-functional teams.
              </p>
            </motion.section>
          </div>

          {/* Education */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 mb-16"
            aria-labelledby="education-heading"
          >
            <h2
              id="education-heading"
              className="responsive-text-3xl font-bold text-white mb-6 flex items-center gap-3"
            >
              <Book size={28} aria-hidden="true" />
              Education
            </h2>
            <div className="space-y-6">
              <div className="border-l-4 border-orange-500 pl-6">
                <h3 className="responsive-text-xl font-semibold text-white">
                  BSc in IT - Computer Science and Informatics
                </h3>
                <p className="text-gray-300 responsive-text-base">University of Johannesburg</p>
                <p className="text-gray-400 responsive-text-sm">3rd year completed</p>
              </div>
              <div className="border-l-4 border-orange-500 pl-6">
                <h3 className="responsive-text-xl font-semibold text-white">NSC Matric</h3>
                <p className="text-gray-300 responsive-text-base">Solomon Mahlangu High School</p>
                <p className="text-gray-400 responsive-text-sm">2018</p>
              </div>
            </div>
          </motion.section>

          {/* Certifications */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 mb-16"
            aria-labelledby="certifications-heading"
          >
            <h2
              id="certifications-heading"
              className="responsive-text-3xl font-bold text-white mb-6 flex items-center gap-3"
            >
              <Award size={28} aria-hidden="true" />
              Certifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="bg-white/5 rounded-lg p-4 border border-white/10"
                >
                  <h3 className="font-semibold text-white mb-2 responsive-text-base">{cert.name}</h3>
                  <p className="text-gray-300 responsive-text-sm">{cert.issuer}</p>
                  <p className="text-gray-400 responsive-text-sm">{cert.date}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Soft Skills */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 mb-16"
            aria-labelledby="soft-skills-heading"
          >
            <h2 id="soft-skills-heading" className="responsive-text-3xl font-bold text-white mb-6">
              Soft Skills
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 + index * 0.1 }}
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg p-3 text-center font-semibold responsive-text-sm"
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Testimonials Section */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-16"
            aria-labelledby="testimonials-heading"
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2
                id="testimonials-heading"
                className="responsive-text-4xl md:responsive-text-5xl font-bold text-white mb-4"
              >
                What People Say
              </h2>
              <p className="responsive-text-xl text-gray-300 max-w-2xl mx-auto">
                Testimonials from colleagues and clients I've worked with
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
                >
                  <div
                    className="flex items-center gap-1 mb-4"
                    role="img"
                    aria-label={`${testimonial.rating} out of 5 stars`}
                  >
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-400 fill-current" aria-hidden="true" />
                    ))}
                  </div>

                  <div className="relative mb-6">
                    <Quote size={24} className="text-white/30 absolute -top-2 -left-2" aria-hidden="true" />
                    <blockquote className="text-gray-300 leading-relaxed pl-6 responsive-text-base">
                      {testimonial.content}
                    </blockquote>
                  </div>

                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center"
                      role="img"
                      aria-label={`${testimonial.name}'s avatar`}
                    >
                      <span className="text-white font-bold responsive-text-base" aria-hidden="true">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white responsive-text-base">{testimonial.name}</h3>
                      <p className="text-gray-400 responsive-text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.section>
        </main>
      </div>
    </PageWrapper>
  )
}
