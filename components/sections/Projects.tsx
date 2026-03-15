// file: components/sections/Projects.tsx
"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import Tilt from "react-parallax-tilt"
import { Badge } from "@/components/ui/badge"
import { Github, Star, Users, Award, ExternalLink, Sparkles } from "lucide-react"
import { useLanguage } from "@/components/LanguageProvider"
// Import data yang sudah kita pisahkan
import { projectsData, Category } from "@/data/projects"

export default function Projects() {
  const { t } = useLanguage()
  const [filter, setFilter] = useState<Category>("All")

  const filteredProjects = filter === "All" ? projectsData : projectsData.filter((project) => project.category === filter)

  const categories = [
    { id: "All", label: t.projects.all },
    { id: "Web", label: t.projects.web },
    { id: "Mobile", label: t.projects.mobile },
    { id: "Algorithm", label: t.projects.algorithm }
  ]

  return (
    <section id="projects" className="py-24 md:py-32 bg-muted/20 relative overflow-hidden">
      
      {/* Background Ornaments */}
      <div className="absolute top-40 left-0 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-background/50 backdrop-blur-md text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>{t.projects.badge}</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">
            {t.projects.title}
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-primary to-blue-500 mx-auto rounded-full mb-8"></div>
        </motion.div>

        {/* Premium Filter Tabs with Sliding Active Indicator */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {categories.map((category) => {
            const isActive = filter === category.id
            return (
              <button
                key={category.id}
                onClick={() => setFilter(category.id as Category)}
                className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 ${
                  isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="projectFilterIndicator"
                    className="absolute inset-0 bg-primary rounded-full -z-10 shadow-md"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{category.label}</span>
              </button>
            )
          })}
        </div>

        {/* MASONRY / GRID LAYOUT DENGAN FLUID SHUFFLE */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="h-full"
              >
                {/* EFEK 3D TILT PADA KARTU */}
                <Tilt
                  tiltMaxAngleX={8}
                  tiltMaxAngleY={8}
                  perspective={1000}
                  scale={1.02}
                  transitionSpeed={2000}
                  gyroscope={true}
                  className="h-full"
                >
                  <div className="h-full flex flex-col group overflow-hidden rounded-3xl bg-background/60 backdrop-blur-xl border border-border/50 shadow-xl hover:shadow-primary/10 transition-shadow duration-500">
                    
                    {/* Image Container with Next.js Image Optimization */}
                    <div className="relative aspect-video overflow-hidden bg-muted">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80" />
                      <div className="absolute inset-0 bg-primary/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Floating Badges */}
                      <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                        {project.isCapstone && (
                          <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-none shadow-lg backdrop-blur-md">
                            <Award className="h-3 w-3 mr-1" />
                            Capstone
                          </Badge>
                        )}
                        {project.teamProject && (
                          <Badge className="bg-blue-500/90 text-white border-none shadow-lg backdrop-blur-md">
                            <Users className="h-3 w-3 mr-1" />
                            Team
                          </Badge>
                        )}
                      </div>
                      <div className="absolute top-4 right-4 z-10">
                        <Badge variant="outline" className="bg-background/80 backdrop-blur-md border-border/50 text-foreground">
                          {project.category}
                        </Badge>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex flex-col flex-grow p-6 z-20 -mt-6">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 flex items-start gap-2 mb-3">
                        {project.title}
                        {project.featured && (
                          <Star className="h-4 w-4 text-orange-500 fill-orange-500 flex-shrink-0 mt-1" />
                        )}
                      </h3>
                      
                      <p className="text-muted-foreground/90 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 text-xs font-medium rounded-md bg-foreground/5 text-foreground/80 border border-border/50"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Action Button */}
                      {project.github !== "#" ? (
                        <a 
                          href={project.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="mt-auto w-full inline-flex items-center justify-center gap-2 h-11 rounded-xl bg-foreground text-background font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-md group/btn"
                        >
                          <Github className="h-4 w-4 transition-transform group-hover/btn:scale-110" />
                          <span>View Repository</span>
                          <ExternalLink className="h-3 w-3 opacity-50 group-hover/btn:opacity-100" />
                        </a>
                      ) : (
                        <div className="mt-auto w-full inline-flex items-center justify-center gap-2 h-11 rounded-xl bg-muted/50 text-muted-foreground font-medium border border-border/50 cursor-not-allowed">
                          <Github className="h-4 w-4" />
                          <span>Private Repository</span>
                        </div>
                      )}
                    </div>

                  </div>
                </Tilt>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Clean Dashboard-like Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {[
            { value: "10+", label: "Total Projects" },
            { value: "15+", label: "Technologies" },
            { value: "1", label: "Capstone" },
            { value: "2+", label: "Years Active" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center p-6 rounded-3xl bg-background/40 border border-border/50 backdrop-blur-md shadow-sm">
              <div className="text-3xl font-black bg-gradient-to-br from-foreground to-foreground/50 bg-clip-text text-transparent mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-widest text-center">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}