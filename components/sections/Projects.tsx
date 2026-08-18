"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  Github, Users, Award, ExternalLink,
  X, ChevronLeft, ChevronRight, ArrowUpRight,
  Tag, Layers, CheckCircle2, CircleDot
} from "lucide-react"
import { useLenis } from "lenis/react"
import { useLanguage } from "@/components/LanguageProvider"
import { projectsData, Category, Project } from "@/data/projects"

const caseStudyPriority = [4, 2, 12, 9, 3]
const portfolioProjects = projectsData
  .filter((project) => project.featured && !project.image.startsWith("http"))
  .sort((a, b) => {
    const aPriority = caseStudyPriority.indexOf(a.id)
    const bPriority = caseStudyPriority.indexOf(b.id)
    if (aPriority === -1 && bPriority === -1) return a.id - b.id
    if (aPriority === -1) return 1
    if (bPriority === -1) return -1
    return aPriority - bPriority
  })

const EASE = [0.16, 1, 0.3, 1] as const

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function Projects() {
  const { t } = useLanguage()
  const lenis = useLenis()
  const [filter, setFilter]               = useState<Category>("All")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [hoveredProject, setHoveredProject]   = useState<Project | null>(null)
  const [pointerFine, setPointerFine] = useState(false)

  // Floating preview position (dengan lag)
  const previewRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: -400, y: -400, tx: -400, ty: -400 })

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)")
    const update = () => setPointerFine(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  useEffect(() => {
    if (!pointerFine) return
    let raf = 0
    const onMove = (e: MouseEvent) => {
      posRef.current.tx = e.clientX
      posRef.current.ty = e.clientY
    }
    const loop = () => {
      const p = posRef.current
      p.x += (p.tx - p.x) * 0.12
      p.y += (p.ty - p.y) * 0.12
      if (previewRef.current) {
        previewRef.current.style.left = `${p.x}px`
        previewRef.current.style.top = `${p.y}px`
      }
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(raf)
    }
  }, [pointerFine])

  const filteredProjects = filter === "All"
    ? portfolioProjects
    : portfolioProjects.filter((p) => p.category === filter)
  const filteredCaseStudies = filteredProjects.filter((project) => project.caseStudy)
  const filteredSupportingProjects = filteredProjects.filter((project) => !project.caseStudy)

  const categoryLabels = {
    Web: t.projects.web,
    Mobile: t.projects.mobile,
    Algorithm: t.projects.algorithm,
  }
  const categories: { id: Category; label: string }[] = [
    { id: "All", label: t.projects.all },
    ...(["Web", "Mobile", "Algorithm"] as const)
      .filter((category) => portfolioProjects.some((project) => project.category === category))
      .map((category) => ({ id: category, label: categoryLabels[category] })),
  ]

  // Body scroll lock saat modal terbuka.
  // Lenis membajak event wheel di window dan menggulirkan halaman secara programatik,
  // jadi `overflow: hidden` saja tidak cukup — instance-nya harus di-stop juga.
  useEffect(() => {
    if (!selectedProject) return

    const { body } = document
    const previousOverflow = body.style.overflow
    const previousPaddingRight = body.style.paddingRight
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

    lenis?.stop()
    body.style.overflow = "hidden"
    // Cegah layout shift saat scrollbar desktop menghilang.
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`
    body.dataset.projectModalOpen = "true"

    return () => {
      lenis?.start()
      body.style.overflow = previousOverflow
      body.style.paddingRight = previousPaddingRight
      delete body.dataset.projectModalOpen
    }
  }, [selectedProject, lenis])

  const globalIndexOf = (project: Project) => portfolioProjects.findIndex((p) => p.id === project.id)

  return (
    <section id="projects" className="relative bg-background py-20 sm:py-24 md:py-36">
      <div className="container-custom relative z-10">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-12 flex min-w-0 flex-col items-start gap-6 lg:mb-14 lg:flex-row lg:items-end lg:justify-between lg:gap-8"
        >
          <div className="w-full min-w-0 lg:w-auto">
            <p className="section-label mb-5">02 / {t.projects.badge}</p>
            <h2 className="min-w-0 break-normal font-display text-[clamp(1.75rem,8.5vw,3.75rem)] font-extrabold uppercase leading-[1.02] tracking-tight md:text-5xl lg:text-6xl">
              <span className="block sm:inline">{t.projects.title}</span>
              <sup className="mt-2 block align-top font-mono text-xs font-normal tracking-[0.12em] text-primary sm:ml-3 sm:mt-0 sm:inline-block sm:text-sm sm:tracking-[0.15em]">
                ({String(filteredCaseStudies.length).padStart(2, "0")})
              </sup>
            </h2>
          </div>
          <p className="max-w-sm text-sm font-light leading-7 text-muted-foreground">
            Open a project to inspect its role, engineering decisions, screenshots, and outcome.
          </p>
        </motion.div>

        {/* ── Filter — mono underline tabs ── */}
        <div className="mb-10 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[11px] uppercase tracking-[0.12em] sm:gap-7 sm:text-xs sm:tracking-[0.15em]">
          {categories.map((category) => {
            const isActive = filter === category.id
            return (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`relative flex min-h-11 items-center pb-1.5 pt-2 transition-colors duration-300 ${
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {category.label}
                {isActive && (
                  <motion.span
                    layoutId="projectFilterLine"
                    className="absolute inset-x-0 bottom-0 h-px bg-primary"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* ── Case studies — editorial rows ── */}
        {filteredCaseStudies.length > 0 && (
          <div className="mb-16 sm:mb-20 lg:mb-24">
            <div className="mb-4 flex items-baseline justify-between">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Selected work <span className="text-primary">— case studies</span>
              </p>
              <p className="hidden font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground sm:block">
                {String(filteredCaseStudies.length).padStart(2, "0")} entries
              </p>
            </div>
            <motion.div layout className="border-t border-border/10">
              <AnimatePresence mode="popLayout">
                {filteredCaseStudies.map((project) => (
                  <motion.div
                    layout
                    key={project.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CaseStudyRow
                      project={project}
                      index={globalIndexOf(project)}
                      onOpen={() => setSelectedProject(project)}
                      onHover={setHoveredProject}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        )}

        {/* ── More projects — grayscale grid ── */}
        {filteredSupportingProjects.length > 0 && (
          <div>
            <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Additional work <span className="text-primary">({String(filteredSupportingProjects.length).padStart(2, "0")})</span>
            </p>
            <motion.div layout className="grid gap-6 md:grid-cols-2">
              <AnimatePresence mode="popLayout">
                {filteredSupportingProjects.map((project) => (
                  <motion.div
                    layout
                    key={project.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    <SupportingCard project={project} onOpen={() => setSelectedProject(project)} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        )}

        {/* ── Empty state saat filter tidak ada hasil ── */}
        {filteredCaseStudies.length === 0 && filteredSupportingProjects.length === 0 && (
          <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 text-center">
            <p className="font-display text-2xl font-extrabold uppercase tracking-tight text-foreground/40 sm:text-3xl">
              No projects here yet
            </p>
            <p className="max-w-sm text-sm font-light leading-relaxed text-muted-foreground">
              No case studies in this category yet. Try another filter or explore all work.
            </p>
            <button
              onClick={() => setFilter("All")}
              className="mt-2 inline-flex min-h-11 items-center rounded-full border border-border/25 px-6 py-2.5 font-mono text-xs uppercase tracking-[0.12em] transition-all duration-300 hover:border-primary hover:text-primary"
            >
              Show all
            </button>
          </div>
        )}
      </div>

      {/* ── Floating preview (pointer-fine saja) ── */}
      {pointerFine && (
        <div
          ref={previewRef}
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-40 hidden lg:block"
        >
          <AnimatePresence>
            {hoveredProject && (
              <motion.div
                key={hoveredProject.id}
                initial={{ opacity: 0, scale: 0.85, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="relative aspect-video w-[340px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-border/15 shadow-2xl shadow-black/50"
              >
                <Image
                  src={hoveredProject.image || "/placeholder.svg"}
                  alt=""
                  fill
                  sizes="340px"
                  className={hoveredProject.imageFit === "contain" ? "bg-card object-contain p-4" : "object-cover"}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* ── Project Detail Modal ── */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onPrev={() => {
          const idx = globalIndexOf(selectedProject!)
          if (idx > 0) setSelectedProject(portfolioProjects[idx - 1])
        }}
        onNext={() => {
          const idx = globalIndexOf(selectedProject!)
          if (idx < portfolioProjects.length - 1) setSelectedProject(portfolioProjects[idx + 1])
        }}
        hasPrev={selectedProject ? globalIndexOf(selectedProject) > 0 : false}
        hasNext={selectedProject ? globalIndexOf(selectedProject) < portfolioProjects.length - 1 : false}
        index={selectedProject ? globalIndexOf(selectedProject) : 0}
        total={portfolioProjects.length}
      />
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CASE STUDY ROW — editorial list + spec line
// ─────────────────────────────────────────────────────────────────────────────
function CaseStudyRow({
  project,
  index,
  onOpen,
  onHover,
}: {
  project: Project
  index: number
  onOpen: () => void
  onHover: (p: Project | null) => void
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      onMouseEnter={() => onHover(project)}
      onMouseLeave={() => onHover(null)}
      className="group grid w-full min-w-0 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b border-border/10 py-5 text-left transition-all duration-300 sm:gap-5 sm:px-2 sm:py-7 sm:hover:pl-6 md:gap-8 md:py-8"
      aria-label={`Open details for ${project.title}`}
    >
      <span className="font-display text-xl font-extrabold text-foreground/20 transition-colors duration-300 group-hover:text-primary sm:text-2xl md:text-3xl">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="min-w-0">
        <span className="block break-words font-display text-lg font-bold uppercase leading-tight tracking-tight transition-colors duration-300 group-hover:text-primary sm:truncate sm:text-xl md:text-3xl">
          {project.title}
        </span>
        <span className="mt-2 block break-words font-mono text-[9px] uppercase leading-5 tracking-[0.08em] text-muted-foreground sm:text-[11px] sm:tracking-[0.1em]">
          <span className="text-foreground/80">{project.category}</span>
          <span className="mx-1.5 text-primary sm:mx-2.5">/</span>
          {project.tags.slice(0, 3).join(" · ")}
          {project.year && (
            <>
              <span className="mx-1.5 text-primary sm:mx-2.5">/</span>
              {project.year}
            </>
          )}
        </span>
      </span>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border/20 text-muted-foreground transition-all duration-300 group-hover:rotate-45 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
        <ArrowUpRight className="h-4 w-4" />
      </span>
    </button>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SUPPORTING CARD — grayscale → color on hover
// ─────────────────────────────────────────────────────────────────────────────
function SupportingCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group block w-full overflow-hidden rounded-2xl border border-border/10 text-left transition-colors duration-300 hover:border-primary/40"
      aria-label={`Open details for ${project.title}`}
    >
      <span className="relative block aspect-video overflow-hidden bg-muted">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={`grayscale transition-all duration-700 group-hover:scale-[1.04] group-hover:grayscale-0 ${
            project.imageFit === "contain" ? "bg-card object-contain p-4" : "object-cover"
          }`}
        />
      </span>
      <span className="flex min-w-0 items-center justify-between gap-4 px-4 py-4 sm:px-5">
        <span className="min-w-0">
          <span className="block break-words font-display text-base font-bold uppercase tracking-tight">{project.title}</span>
          <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
            {project.category} {project.year ? `· ${project.year}` : ""}
          </span>
        </span>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:text-primary" />
      </span>
    </button>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PROJECT MODAL — bottom sheet penuh, gallery + spec sheet + case study
// ─────────────────────────────────────────────────────────────────────────────
function ProjectModal({
  project,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  index,
  total,
}: {
  project: Project | null
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  hasPrev: boolean
  hasNext: boolean
  index: number
  total: number
}) {
  const [activeImg, setActiveImg]       = useState(0)
  const [imgDirection, setImgDirection] = useState(1)
  const contentRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previouslyFocusedRef = useRef<HTMLElement | null>(null)
  const isOpen = Boolean(project)

  useEffect(() => {
    setActiveImg(0)
    if (contentRef.current) contentRef.current.scrollTop = 0
  }, [project])

  // Focus management
  useEffect(() => {
    if (!isOpen) return
    previouslyFocusedRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null
    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus())
    return () => {
      window.cancelAnimationFrame(focusFrame)
      previouslyFocusedRef.current?.focus()
    }
  }, [isOpen])

  // Keyboard: Esc, arrows, focus trap
  useEffect(() => {
    if (!project) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); onClose() }
      if (e.key === "ArrowLeft" && hasPrev) onPrev()
      if (e.key === "ArrowRight" && hasNext) onNext()
      if (e.key === "Tab" && modalRef.current) {
        const focusableElements = Array.from(
          modalRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        )
        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault(); lastElement?.focus()
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault(); firstElement?.focus()
        }
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [project, onClose, onPrev, onNext, hasPrev, hasNext])

  const screenshots = project?.screenshots?.length
    ? project.screenshots
    : project
    ? [project.image]
    : []

  const goImg = (dir: 1 | -1) => {
    setImgDirection(dir)
    setActiveImg((prev) => (prev + dir + screenshots.length) % screenshots.length)
  }

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
            data-lenis-prevent
            className="fixed inset-0 z-[70] bg-background/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* ── Bottom sheet panel ── */}
          <motion.div
            ref={modalRef}
            key="modal"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            data-lenis-prevent
            className="fixed inset-0 z-[80] flex min-w-0 flex-col bg-card md:inset-x-0 md:bottom-0 md:top-20 md:rounded-t-2xl md:border-t md:border-border/15"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`project-title-${project.id}`}
            aria-describedby={`project-description-${project.id}`}
          >
            {/* ── TOP BAR ── */}
            <div className="flex flex-shrink-0 items-center justify-between gap-2 border-b border-border/10 px-3 py-3 sm:gap-3 sm:px-8 sm:py-4">
              <div className="flex min-w-0 items-center gap-2 font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground sm:gap-4 sm:text-[11px] sm:tracking-[0.15em]">
                <span className="shrink-0 text-primary">
                  Case study — {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
                <span className="hidden sm:inline">{project.category}</span>
                {project.year && <span className="hidden md:inline">{project.year}</span>}
                {project.isCapstone && (
                  <span className="hidden items-center gap-1.5 text-foreground sm:flex"><Award className="h-3.5 w-3.5 text-primary" />Capstone</span>
                )}
                {project.teamProject && (
                  <span className="hidden items-center gap-1.5 text-foreground sm:flex"><Users className="h-3.5 w-3.5 text-primary" />Team</span>
                )}
              </div>
              <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
                <button
                  onClick={onPrev}
                  disabled={!hasPrev}
                  className="flex h-11 w-11 items-center justify-center gap-1 rounded-full border border-border/20 font-mono text-[11px] uppercase tracking-[0.1em] transition-all hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-30 sm:w-auto sm:px-4"
                  aria-label="Previous project"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">Prev</span>
                </button>
                <button
                  onClick={onNext}
                  disabled={!hasNext}
                  className="flex h-11 w-11 items-center justify-center gap-1 rounded-full border border-border/20 font-mono text-[11px] uppercase tracking-[0.1em] transition-all hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-30 sm:w-auto sm:px-4"
                  aria-label="Next project"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button
                  ref={closeButtonRef}
                  onClick={onClose}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border/20 transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
                  aria-label="Close project details"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* ── SCROLLABLE BODY ── */}
            <div ref={contentRef} data-lenis-prevent className="min-h-0 flex-1 overscroll-contain overflow-y-auto">
              <div className="grid min-w-0 lg:grid-cols-[55%_45%]">

                {/* ── LEFT: gallery ── */}
                <div className="min-w-0 border-b border-border/10 lg:border-b-0 lg:border-r">
                  <div className="relative aspect-video overflow-hidden bg-muted">
                    <AnimatePresence initial={false} custom={imgDirection} mode="popLayout">
                      <motion.div
                        key={activeImg}
                        custom={imgDirection}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.35, ease: EASE }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={screenshots[activeImg] || "/placeholder.svg"}
                          alt={`${project.title} screenshot ${activeImg + 1}`}
                          fill
                          sizes="(max-width: 1024px) 100vw, 55vw"
                          className={project.imageFit === "contain" ? "bg-card object-contain" : "object-cover"}
                          priority
                        />
                      </motion.div>
                    </AnimatePresence>

                    {screenshots.length > 1 && (
                      <>
                        <button
                          onClick={() => goImg(-1)}
                          className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border/20 bg-background/80 backdrop-blur-sm transition-all hover:border-primary hover:text-primary sm:left-4"
                          aria-label="Previous screenshot"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => goImg(1)}
                          className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border/20 bg-background/80 backdrop-blur-sm transition-all hover:border-primary hover:text-primary sm:right-4"
                          aria-label="Next screenshot"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
                          {screenshots.map((_, i) => (
                            <button
                              key={i}
                              onClick={() => { setImgDirection(i > activeImg ? 1 : -1); setActiveImg(i) }}
                              className={`h-1.5 rounded-full transition-all duration-300 ${
                                i === activeImg ? "w-6 bg-primary" : "w-1.5 bg-foreground/30 hover:bg-foreground/60"
                              }`}
                              aria-label={`Show screenshot ${i + 1}`}
                            />
                          ))}
                        </div>
                      </>
                    )}

                    <div className="absolute right-4 top-4 z-10 rounded-full border border-border/15 bg-background/80 px-3 py-1 font-mono text-[10px] tracking-[0.1em] text-muted-foreground backdrop-blur-sm">
                      {activeImg + 1} / {screenshots.length}
                    </div>
                  </div>

                  {screenshots.length > 1 && (
                    <div className="flex gap-3 overflow-x-auto overscroll-x-contain p-3 sm:p-4">
                      {screenshots.map((src, i) => (
                        <button
                          key={i}
                          onClick={() => { setImgDirection(i > activeImg ? 1 : -1); setActiveImg(i) }}
                          className={`relative aspect-video w-24 flex-shrink-0 overflow-hidden rounded-lg border transition-all ${
                            i === activeImg ? "border-primary" : "border-border/10 opacity-50 hover:opacity-90"
                          }`}
                          aria-label={`Show screenshot ${i + 1}`}
                        >
                          <Image
                            src={src}
                            alt={`Thumb ${i + 1}`}
                            fill
                            sizes="96px"
                            className={project.imageFit === "contain" ? "bg-card object-contain" : "object-cover"}
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* ── RIGHT: details ── */}
                <div className="flex min-w-0 flex-col p-5 sm:p-8 lg:p-10">

                  <div className="mb-7">
                    <h3 id={`project-title-${project.id}`} className="mb-3 break-words font-display text-2xl font-extrabold uppercase leading-tight tracking-tight md:text-3xl lg:text-4xl">
                      {project.title}
                    </h3>
                    <p id={`project-description-${project.id}`} className="text-sm font-light leading-7 text-muted-foreground">
                      {project.longDescription || project.description}
                    </p>
                  </div>

                  {/* Spec sheet */}
                  {project.caseStudy && (
                    <div className="spec-sheet mb-8">
                      <div>
                        <span className="spec-key">Role</span>
                        <span className="spec-value">{project.caseStudy.role}</span>
                      </div>
                      <div>
                        <span className="spec-key">Stack</span>
                        <span className="spec-value">{project.tags.slice(0, 4).join(" · ")}</span>
                      </div>
                      {project.caseStudy.status && (
                        <div>
                          <span className="spec-key">Status</span>
                          <span className="spec-value inline-flex min-w-0 items-start gap-2">
                            <CircleDot className="h-3 w-3 text-primary" />
                            {project.caseStudy.status}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Case study blocks */}
                  {project.caseStudy && (
                    <div className="mb-8">
                      <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-primary">The Challenge</p>
                      <p className="mb-7 border-l border-primary/40 pl-4 text-sm font-light leading-7 text-foreground/85">
                        {project.caseStudy.challenge}
                      </p>

                      <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-primary">What I Delivered</p>
                      <ul className="mb-7 space-y-2.5">
                        {project.caseStudy.contributions.map((contribution) => (
                          <li key={contribution} className="flex items-start gap-2.5 text-sm font-light leading-7 text-foreground/85">
                            <CheckCircle2 className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                            <span>{contribution}</span>
                          </li>
                        ))}
                      </ul>

                      <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-primary">Engineering Decisions</p>
                      <ol className="mb-7 space-y-3">
                        {project.caseStudy.decisions.map((decision, i) => (
                          <li key={decision} className="grid grid-cols-[2rem_1fr] gap-2 text-sm font-light leading-7 text-foreground/80">
                            <span className="font-mono text-xs text-primary">{String(i + 1).padStart(2, "0")}</span>
                            <span>{decision}</span>
                          </li>
                        ))}
                      </ol>

                      <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-primary">Outcome</p>
                      <p className="border-l border-primary/40 pl-4 text-sm font-medium leading-7 text-foreground">
                        {project.caseStudy.outcome}
                      </p>
                    </div>
                  )}

                  {/* Highlights */}
                  {project.highlights && project.highlights.length > 0 && (
                    <div className="mb-7">
                      <h3 className="mb-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                        <Layers className="h-3.5 w-3.5" />
                        Key Highlights
                      </h3>
                      <ul className="space-y-2">
                        {project.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm font-light text-foreground/85">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tech stack */}
                  <div className="mb-8">
                    <h3 className="mb-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                      <Tag className="h-3.5 w-3.5" />
                      Tech Stack
                    </h3>
                    <p className="break-words font-mono text-xs leading-6 text-muted-foreground">
                      {project.tags.join(" / ")}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="mt-auto flex flex-col gap-3 border-t border-border/10 pt-6 sm:flex-row">
                    {project.github !== "#" ? (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-primary text-sm font-medium text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-8px_hsl(var(--primary)/0.45)]"
                      >
                        <Github className="h-4 w-4" />
                        View Repository
                        <ExternalLink className="h-3.5 w-3.5 opacity-60" />
                      </a>
                    ) : (
                      <div className="flex h-12 flex-1 cursor-not-allowed items-center justify-center gap-2 rounded-full border border-border/15 text-sm text-muted-foreground">
                        <Github className="h-4 w-4" />
                        Private Repository
                      </div>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-border/25 text-sm transition-all duration-300 hover:border-primary hover:text-primary"
                      >
                        {project.liveLabel ?? "Live Demo"}
                        <ArrowUpRight className="h-3.5 w-3.5" />
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
