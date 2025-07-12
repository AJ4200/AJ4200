"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Github, Linkedin, Send } from "lucide-react"
import Link from "next/link"
import { useLoading } from "@/contexts/loading-context"
import { PageWrapper } from "@/components/page-wrapper"

export default function ContactPage() {
  const { startUpdate, finishUpdate } = useLoading()

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "abeljackson33@gmail.com",
      href: "mailto:abeljackson33@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+27 626 775 823",
      href: "tel:+27626775823",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Modimolle, South Africa",
      href: "#",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "AJ4200",
      href: "https://github.com/AJ4200",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Abel Majadibodu",
      href: "#",
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    startUpdate("Sending message...")

    // Simulate form submission
    setTimeout(() => {
      finishUpdate()
      // You could show a success message here
    }, 2000)
  }

  return (
    <PageWrapper>
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden pt-20">
        {/* Ripple Effect Background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute border-2 border-white/20 rounded-full"
              style={{
                left: "50%",
                top: "50%",
                width: `${100 + i * 200}px`,
                height: `${100 + i * 200}px`,
                marginLeft: `${-50 - i * 100}px`,
                marginTop: `${-50 - i * 100}px`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.8,
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
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Get In Touch</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Ready to collaborate? Let's build something amazing together
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20">
                <h2 className="text-3xl font-bold text-white mb-6">Contact Information</h2>
                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        className="flex items-center gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group"
                        data-cursor="pointer"
                      >
                        <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg">
                          {item.icon && <item.icon size={20} className="text-white" />}
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">{item.label}</p>
                          <p className="text-white group-hover:text-indigo-300 transition-colors">{item.value}</p>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20"
              >
                <h3 className="text-2xl font-bold text-white mb-4">Let's Connect</h3>
                <p className="text-gray-300 mb-6">
                  I'm always open to discussing new opportunities, interesting projects, or just having a chat about
                  technology and innovation.
                </p>
                <div className="flex gap-4">
                  <Link
                    href="https://github.com/AJ4200"
                    className="p-3 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 rounded-lg transition-all transform hover:scale-105"
                    data-cursor="pointer"
                  >
                    <Github size={24} className="text-white" />
                  </Link>
                  <Link
                    href="#"
                    className="p-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-lg transition-all transform hover:scale-105"
                    data-cursor="pointer"
                  >
                    <Linkedin size={24} className="text-white" />
                  </Link>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20"
            >
              <h2 className="text-3xl font-bold text-white mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-white text-sm font-medium mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-white text-sm font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Project Collaboration"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-white text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <motion.button
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  data-cursor="pointer"
                >
                  <Send size={20} />
                  <span>Send Message</span>
                </motion.button>
              </form>
            </motion.div>
          </div>

          {/* References Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="mt-16 max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-white text-center mb-8">References</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-2">Nkosini Ngwenya</h3>
                <p className="text-gray-300 mb-2">House Warden (Acting)</p>
                <p className="text-gray-300 mb-2">UJ's MAQHAWE MEN'S RESIDENCE</p>
                <p className="text-gray-400 text-sm">nlngwenya@uj.ac.za</p>
                <p className="text-gray-400 text-sm">011 559 4255</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-2">Louise Cassim</h3>
                <p className="text-gray-300 mb-2">Residence Assistant</p>
                <p className="text-gray-300 mb-2">UJ's MAQHAWE MEN'S RESIDENCE</p>
                <p className="text-gray-400 text-sm">louisecassim@gmail.com</p>
                <p className="text-gray-400 text-sm">011 559 3484</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-2">Jaden Elijah</h3>
                <p className="text-gray-300 mb-2">CEO/Co-founder</p>
                <p className="text-gray-300 mb-2">JEP PRODUCTIONS</p>
                <p className="text-gray-400 text-sm">jadeelijah911@gmail.com</p>
                <p className="text-gray-400 text-sm">081 678 8897</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-2">Valiant Khoza</h3>
                <p className="text-gray-300 mb-2">Founder</p>
                <p className="text-gray-300 mb-2">NEXGENIX</p>
                <p className="text-gray-400 text-sm">valiant@nexgx.co.za</p>
                <p className="text-gray-400 text-sm">071 586 7165</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  )
}
