"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

const team = [
  {
    name: "Henrique",
    role: "CEO & Founder",
    image: "https://cdn.gamma.app/33klz2ifj6dnjv0/c63b955f50464134b5c3d1098edc7e13/original/Foto-da-Equipe.jpg",
  },
  {
    name: "Antigravity AI",
    role: "CTO & Architect",
    image: "https://cdn.gamma.app/33klz2ifj6dnjv0/c63b955f50464134b5c3d1098edc7e13/original/Foto-da-Equipe.jpg",
  },
]

import { copywriting } from "@/config/copywriting"

export default function TeamSection() {
  const { team: content } = copywriting

  const images = [
    "https://cdn.gamma.app/33klz2ifj6dnjv0/c63b955f50464134b5c3d1098edc7e13/original/Foto-da-Equipe.jpg",
    "https://cdn.gamma.app/33klz2ifj6dnjv0/c63b955f50464134b5c3d1098edc7e13/original/Foto-da-Equipe.jpg",
  ]

  const team = content.members.map((member, i) => ({
    ...member,
    image: images[i],
  }))

  return (
    <section 
      id="team" 
      className="w-full py-24 md:py-32 relative overflow-hidden bg-background"
      aria-labelledby="team-heading"
      role="region"
    >
      <div className="container px-4 md:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
        >
          <Badge className="mb-6 rounded-none border-l-2 border-primary bg-transparent text-primary hover:bg-transparent px-3 py-1 text-xs font-mono tracking-widest uppercase">
            {content.badge}
          </Badge>
          <h2 id="team-heading" className="text-3xl md:text-5xl font-bold tracking-tight">{content.title}</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl font-light">
            {content.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 max-w-4xl mx-auto" role="list">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="group relative flex flex-col items-center"
              role="listitem"
            >
              <div className="relative mb-6 rounded-2xl overflow-hidden size-64 shadow-2xl transition-transform duration-500 group-hover:scale-105 border border-border/40 p-1 bg-gradient-to-tr from-muted/50 to-primary/5">
                <Image
                  src={member.image}
                  width={400}
                  height={400}
                  alt={member.name}
                  className="size-full object-cover rounded-xl filter grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                  <div className="h-0.5 w-8 bg-primary mb-2 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-1 tracking-tight">{member.name}</h3>
              <p className="text-primary font-medium text-sm tracking-wide uppercase">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
