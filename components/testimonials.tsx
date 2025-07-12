"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Jaden Elijah",
    role: "CEO/Co-founder at JEP Productions",
    content:
      "Abel is an exceptional full-stack developer who consistently delivers high-quality solutions. His expertise in React, Next.js, and backend technologies made our projects successful. His attention to detail and problem-solving skills are outstanding.",
    rating: 5,
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Valiant Khoza",
    role: "Founder at NexGenix",
    content:
      "Working with Abel has been a game-changer for our development team. His proficiency in .NET, PHP, and cloud deployment helped us optimize our infrastructure by 40%. He's reliable, innovative, and always goes above and beyond.",
    rating: 5,
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Nkosini Ngwenya",
    role: "House Warden at UJ's Maqhawe Men's Residence",
    content:
      "Abel demonstrated exceptional technical leadership during his time as IT Admin. He reduced system downtime significantly and created user-friendly web interfaces that improved our operational efficiency. His communication skills are excellent.",
    rating: 5,
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Louise Cassim",
    role: "Residence Assistant at UJ's Maqhawe Men's Residence",
    content:
      "Abel's web development skills transformed our student management system. The interface he created was intuitive and significantly improved user engagement. His collaborative approach and technical expertise made the project a success.",
    rating: 5,
    image: "/placeholder.svg?height=60&width=60",
  },
]

export function Testimonials() {
  return (
    <section className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">What People Say</h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Testimonials from colleagues and clients I've worked with
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
          >
            <div className="flex items-center gap-1 mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} size={16} className="text-yellow-400 fill-current" />
              ))}
            </div>

            <div className="relative mb-6">
              <Quote size={24} className="text-white/30 absolute -top-2 -left-2" />
              <p className="text-gray-300 leading-relaxed pl-6">{testimonial.content}</p>
            </div>

            <div className="flex items-center gap-4">
              <img
                src={testimonial.image || "/placeholder.svg"}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold text-white">{testimonial.name}</h4>
                <p className="text-gray-400 text-sm">{testimonial.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
