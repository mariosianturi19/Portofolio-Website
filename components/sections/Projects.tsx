"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import Tilt from "react-parallax-tilt"
import { Badge } from "@/components/ui/badge"
import {
  Github, Star, Users, Award, ExternalLink, Sparkles,
  X, ChevronLeft, ChevronRight, Play, ArrowUpRight,
  Calendar, Tag, Layers, CheckCircle2, Eye
} from "lucide-react"
import { useLanguage } from "@/components/LanguageProvider"
import { projectsData, Category, Project } from "@/data/projects"

// ─── Warna per kategori ───────────────────────────────────────────────────────
const categoryColor: Record<string, string> = {
  Web:       "from-blue-500/20 to-cyan-500/20 border-blue-500/20",
  Mobile:    "from-emerald-500/20 to-teal-500/20 border-emerald-500/20",
  Algorithm: "from-orange-500/20 to-amber-500/20 border-orange-500/20",
}
const categoryDot: Record<string, string> = {
  Web:       "bg-blue-500",
  Mobile:    "bg-emerald-500",
  Algorithm: "bg-orange-500",
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function Projects() {
  const { t } = useLanguage()
  const [filter, setFilter]               = useState<Category>("All")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const filteredProjects = filter === "All"
    ? projectsData
    : projectsData.filter((p) => p.category === filter)

  const categories = [
    { id: "All",       label: t.projects.all },
    { id: "Web",       label: t.projects.web },
    { id: "Mobile",    label: t.projects.mobile },
    { id: "Algorithm", label: t.projects.algorithm },
  ]

  // Body scroll lock saat modal terbuka
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [selectedProject])

  return (
    <section id="projects" className="py-24 md:py-32 bg-muted/20 relative overflow-hidden">

      {/* Background ornament */}
      <div className="absolute top-40 left-0 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-violet-500/3 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="container mx-auto px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">

        {/* ── Header ── */}
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
          <div className="w-20 h-1.5 bg-gradient-to-r from-primary to-blue-500 mx-auto rounded-full mb-8" />
          <p className="text-muted-foreground/80 max-w-xl mx-auto text-base md:text-lg">
            Click any card to explore details, screenshots, and highlights.
          </p>
        </motion.div>

        {/* ── Filter Tabs ── */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {categories.map((category) => {
            const isActive = filter === category.id
            return (
              <button
                key={category.id}
                onClick={() => setFilter(category.id as Category)}
                className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 ${
                  isActive
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
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

        {/* ── Grid ── */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.85, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1,  filter: "blur(0px)"  }}
                exit={  { opacity: 0, scale: 0.85, filter: "blur(10px)" }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="h-full"
              >
                <ProjectCard
                  project={project}
                  onOpen={() => setSelectedProject(project)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── Stats row ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {[
            { value: "13+", label: "Total Projects" },
            { value: "15+", label: "Technologies"   },
            { value: "1",   label: "Capstone"       },
            { value: "2+",  label: "Years Active"   },
          ].map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center p-6 rounded-3xl bg-background/40 border border-border/50 backdrop-blur-md shadow-sm"
            >
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

      {/* ── Project Detail Modal ── */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onPrev={() => {
          const idx = projectsData.findIndex(p => p.id === selectedProject?.id)
          if (idx > 0) setSelectedProject(projectsData[idx - 1])
        }}
        onNext={() => {
          const idx = projectsData.findIndex(p => p.id === selectedProject?.id)
          if (idx < projectsData.length - 1) setSelectedProject(projectsData[idx + 1])
        }}
        hasPrev={projectsData.findIndex(p => p.id === selectedProject?.id) > 0}
        hasNext={projectsData.findIndex(p => p.id === selectedProject?.id) < projectsData.length - 1}
      />
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PROJECT CARD  (dengan hover image zoom + shimmer overlay + "View Details" CTA)
// ─────────────────────────────────────────────────────────────────────────────
function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const imgRef    = useRef<HTMLDivElement>(null)

  return (
    <Tilt
      tiltMaxAngleX={6}
      tiltMaxAngleY={6}
      perspective={1000}
      scale={1.015}
      transitionSpeed={2500}
      gyroscope={true}
      className="h-full"
    >
      <motion.div
        className="h-full flex flex-col group overflow-hidden rounded-3xl bg-background/60 backdrop-blur-xl
          border border-border/50 shadow-xl hover:shadow-primary/10 hover:border-primary/20
          transition-all duration-500 cursor-pointer"
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        onClick={onOpen}
      >
        {/* ── Image area ── */}
        <div ref={imgRef} className="relative aspect-video overflow-hidden bg-muted flex-shrink-0">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80" />

          {/* Primary color overlay on hover */}
          <div className="absolute inset-0 bg-primary/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* "View Details" hover CTA — aparece desde abajo */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-background/90 backdrop-blur-sm border border-border/60 text-sm font-semibold shadow-xl">
              <Eye className="h-4 w-4 text-primary" />
              View Details
            </div>
          </motion.div>

          {/* Floating badges — top left */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
            {project.isCapstone && (
              <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-none shadow-lg backdrop-blur-md text-xs">
                <Award className="h-3 w-3 mr-1" /> Capstone
              </Badge>
            )}
            {project.teamProject && (
              <Badge className="bg-blue-500/90 text-white border-none shadow-lg backdrop-blur-md text-xs">
                <Users className="h-3 w-3 mr-1" /> Team
              </Badge>
            )}
          </div>

          {/* Category badge — top right */}
          <div className="absolute top-4 right-4 z-10">
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border backdrop-blur-md bg-background/80 ${categoryColor[project.category]}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${categoryDot[project.category]}`} />
              {project.category}
            </div>
          </div>

          {/* Year badge — bottom right */}
          {project.year && (
            <div className="absolute bottom-4 right-4 z-10">
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-background/80 backdrop-blur-md border border-border/50 text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {project.year}
              </div>
            </div>
          )}
        </div>

        {/* ── Content ── */}
        <div className="flex flex-col flex-grow p-5 z-20 -mt-4">
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 flex items-center gap-2 mb-2">
            {project.title}
            {project.featured && (
              <Star className="h-4 w-4 text-orange-500 fill-orange-500 flex-shrink-0" />
            )}
          </h3>

          <p className="text-muted-foreground/85 text-sm leading-relaxed mb-4 line-clamp-2 flex-grow">
            {project.description}
          </p>

          {/* Tags — max 4, resto truncado */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs font-medium rounded-md bg-foreground/5 text-foreground/70 border border-border/50"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="px-2 py-0.5 text-xs font-medium rounded-md bg-primary/10 text-primary border border-primary/20">
                +{project.tags.length - 4}
              </span>
            )}
          </div>

          {/* Footer — github link ó private */}
          <div className="mt-auto flex items-center justify-between gap-3">
            {project.github !== "#" ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-3.5 w-3.5" />
                Repository
                <ExternalLink className="h-3 w-3 opacity-50" />
              </a>
            ) : (
              <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground/50">
                <Github className="h-3.5 w-3.5" /> Private
              </span>
            )}

            <button
              onClick={onOpen}
              className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors group/link"
            >
              Details
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </Tilt>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PROJECT MODAL — Drawer dari bawah (mobile) / Center modal (desktop)
// Berisi: image gallery dengan slider, long description, highlights, tags, links
// ─────────────────────────────────────────────────────────────────────────────
function ProjectModal({
  project,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: {
  project: Project | null
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  hasPrev: boolean
  hasNext: boolean
}) {
  const [activeImg, setActiveImg]       = useState(0)
  const [imgDirection, setImgDirection] = useState(1) // 1 = forward, -1 = backward
  const contentRef = useRef<HTMLDivElement>(null)

  // Reset state saat project berganti
  useEffect(() => {
    setActiveImg(0)
    if (contentRef.current) contentRef.current.scrollTop = 0
  }, [project])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape")      onClose()
      if (e.key === "ArrowLeft"  && hasPrev) onPrev()
      if (e.key === "ArrowRight" && hasNext) onNext()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onClose, onPrev, onNext, hasPrev, hasNext])

  const screenshots = project?.screenshots?.length
    ? project.screenshots
    : project
    ? [project.image]
    : []

  const goImg = (dir: 1 | -1) => {
    setImgDirection(dir)
    setActiveImg((prev) => (prev + dir + screenshots.length) % screenshots.length)
  }

  // Variants untuk slide gallery
  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:  (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
  }

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* ── Backdrop ── */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* ── Panel ── */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 60, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={  { opacity: 0, y: 60, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 280, damping: 30 }}
            className="fixed inset-4 md:inset-8 lg:inset-12 xl:inset-16 z-50 flex flex-col
              rounded-3xl bg-background border border-border/60 shadow-2xl overflow-hidden max-h-[90vh] my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── TOP BAR ── */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border/50 flex-shrink-0 bg-background/95 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${categoryColor[project.category]}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${categoryDot[project.category]}`} />
                  {project.category}
                </div>
                {project.year && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {project.year}
                  </div>
                )}
                {project.isCapstone && (
                  <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-none text-xs">
                    <Award className="h-3 w-3 mr-1" /> Capstone
                  </Badge>
                )}
                {project.teamProject && (
                  <Badge className="bg-blue-500/90 text-white border-none text-xs">
                    <Users className="h-3 w-3 mr-1" /> Team
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                {/* Prev / Next project navigation */}
                <button
                  onClick={onPrev}
                  disabled={!hasPrev}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border border-border/50 hover:bg-muted/60 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                  Prev
                </button>
                <button
                  onClick={onNext}
                  disabled={!hasNext}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border border-border/50 hover:bg-muted/60 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  Next
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-muted/60 transition-colors ml-1"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* ── SCROLLABLE BODY ── */}
            <div ref={contentRef} className="flex-1 overflow-y-auto">
              <div className="flex flex-col lg:flex-row h-full">

                {/* ── LEFT: Image Gallery ── */}
                <div className="lg:w-[55%] flex-shrink-0 bg-muted/30">
                  {/* Main image slider */}
                  <div className="relative aspect-video overflow-hidden bg-muted">
                    <AnimatePresence initial={false} custom={imgDirection} mode="popLayout">
                      <motion.div
                        key={activeImg}
                        custom={imgDirection}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ type: "spring", stiffness: 280, damping: 30 }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={screenshots[activeImg] || "/placeholder.svg"}
                          alt={`${project.title} screenshot ${activeImg + 1}`}
                          fill
                          sizes="(max-width: 1024px) 100vw, 55vw"
                          className="object-cover"
                          priority
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Prev/Next arrows — solo si hay múltiples */}
                    {screenshots.length > 1 && (
                      <>
                        <button
                          onClick={() => goImg(-1)}
                          className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-background transition-all shadow-lg z-10"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => goImg(1)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-background transition-all shadow-lg z-10"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>

                        {/* Dot indicators */}
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                          {screenshots.map((_, i) => (
                            <button
                              key={i}
                              onClick={() => { setImgDirection(i > activeImg ? 1 : -1); setActiveImg(i) }}
                              className={`rounded-full transition-all duration-300 ${
                                i === activeImg
                                  ? "w-5 h-2 bg-primary"
                                  : "w-2 h-2 bg-background/60 hover:bg-background/90"
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}

                    {/* Counter */}
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs font-medium text-muted-foreground border border-border/50 z-10">
                      {activeImg + 1} / {screenshots.length}
                    </div>
                  </div>

                  {/* Thumbnail strip */}
                  {screenshots.length > 1 && (
                    <div className="flex gap-2 p-3 overflow-x-auto">
                      {screenshots.map((src, i) => (
                        <button
                          key={i}
                          onClick={() => { setImgDirection(i > activeImg ? 1 : -1); setActiveImg(i) }}
                          className={`relative flex-shrink-0 w-20 aspect-video rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                            i === activeImg ? "border-primary shadow-md shadow-primary/20" : "border-transparent opacity-60 hover:opacity-90"
                          }`}
                        >
                          <Image
                            src={src}
                            alt={`Thumb ${i + 1}`}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* ── RIGHT: Project Details ── */}
                <div className="lg:w-[45%] flex flex-col p-6 lg:p-8 overflow-y-auto">

                  {/* Title */}
                  <div className="mb-6">
                    <h2 className="text-2xl lg:text-3xl font-extrabold text-foreground mb-2 flex items-center gap-2 flex-wrap">
                      {project.title}
                      {project.featured && (
                        <Star className="h-5 w-5 text-orange-500 fill-orange-500 flex-shrink-0" />
                      )}
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {project.longDescription || project.description}
                    </p>
                  </div>

                  {/* Key Highlights */}
                  {project.highlights && project.highlights.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                        <Layers className="h-3.5 w-3.5" />
                        Key Highlights
                      </h3>
                      <ul className="space-y-2">
                        {project.highlights.map((h, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.05 * i, duration: 0.3 }}
                            className="flex items-start gap-2.5 text-sm text-foreground/85"
                          >
                            <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                            {h}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tech Stack */}
                  <div className="mb-6">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                      <Tag className="h-3.5 w-3.5" />
                      Tech Stack
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-xs font-medium rounded-lg bg-foreground/5 text-foreground/80 border border-border/50 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-colors cursor-default"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-auto flex flex-col sm:flex-row gap-3 pt-4 border-t border-border/40">
                    {project.github !== "#" ? (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 h-11 rounded-xl
                          bg-foreground text-background font-semibold text-sm
                          hover:bg-primary hover:text-primary-foreground
                          transition-all duration-300 shadow-md group/btn"
                      >
                        <Github className="h-4 w-4 transition-transform group-hover/btn:scale-110" />
                        View Repository
                        <ExternalLink className="h-3.5 w-3.5 opacity-60 group-hover/btn:opacity-100" />
                      </a>
                    ) : (
                      <div className="flex-1 flex items-center justify-center gap-2 h-11 rounded-xl
                        bg-muted/50 text-muted-foreground font-semibold text-sm border border-border/50 cursor-not-allowed">
                        <Github className="h-4 w-4" />
                        Private Repository
                      </div>
                    )}

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 h-11 rounded-xl
                          border border-border/60 bg-background/50 font-semibold text-sm
                          hover:bg-muted/60 hover:border-primary/30 transition-all duration-300 group/live"
                      >
                        <Play className="h-4 w-4 group-hover/live:text-primary transition-colors" />
                        Live Demo
                        <ArrowUpRight className="h-3.5 w-3.5 opacity-50 group-hover/live:opacity-100 group-hover/live:text-primary transition-all" />
                      </a>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}