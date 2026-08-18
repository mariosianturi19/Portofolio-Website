"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { projectsData } from "@/data/projects"

const EASE = [0.16, 1, 0.3, 1] as const
const CURTAIN_EASE = [0.76, 0, 0.24, 1] as const

// Sinkron dengan data/projects.ts: urutan caseStudyPriority di Projects.tsx
const CASE_STUDY_PRIORITY = [4, 2, 12, 9, 3]
const FEATURED_WORK = CASE_STUDY_PRIORITY
  .map((id) => projectsData.find((p) => p.id === id)?.title.toUpperCase())
  .filter(Boolean)
  .slice(0, 5) as string[]

type Phase = "index" | "mark" | "exit" | "hidden"

export default function Preloader() {
  const [phase, setPhase] = useState<Phase>("index")

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("hidden")
      return
    }

    const root = document.documentElement
    const previousRootOverflow = root.style.overflow
    const previousRootOverscroll = root.style.overscrollBehavior
    const previousBodyOverflow = document.body.style.overflow

    root.style.overflow = "hidden"
    root.style.overscrollBehavior = "none"
    document.body.style.overflow = "hidden"

    const showMarkTimer = window.setTimeout(() => setPhase("mark"), 1200)
    const startExitTimer = window.setTimeout(() => setPhase("exit"), 1650)
    const restoreScroll = () => {
      root.style.overflow = previousRootOverflow
      root.style.overscrollBehavior = previousRootOverscroll
      document.body.style.overflow = previousBodyOverflow
    }

    const hideTimer = window.setTimeout(() => {
      restoreScroll()
      setPhase("hidden")
    }, 2450)

    return () => {
      window.clearTimeout(showMarkTimer)
      window.clearTimeout(startExitTimer)
      window.clearTimeout(hideTimer)
      restoreScroll()
    }
  }, [])

  if (phase === "hidden") return null

  const showingIndex = phase === "index"
  const showingMark = phase === "mark"
  const exiting = phase === "exit"

  return (
    <div
      className="fixed inset-0 z-[99999] min-h-[100dvh] overflow-hidden motion-reduce:hidden"
      aria-hidden="true"
      data-preloader="featured-work-index"
    >
      <motion.div
        className="absolute inset-x-0 top-0 z-10 h-1/2 bg-background"
        initial={{ y: 0 }}
        animate={exiting ? { y: "-100%" } : { y: 0 }}
        transition={{
          duration: 0.72,
          ease: CURTAIN_EASE,
          delay: exiting ? 0.04 : 0,
        }}
      />

      <motion.div
        className="absolute inset-x-0 bottom-0 z-10 h-1/2 bg-background"
        initial={{ y: 0 }}
        animate={exiting ? { y: "100%" } : { y: 0 }}
        transition={{
          duration: 0.72,
          ease: CURTAIN_EASE,
          delay: exiting ? 0.04 : 0,
        }}
      />

      <motion.div
        className="absolute inset-0 z-20 flex min-h-[100dvh] flex-col bg-background px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-[max(1.25rem,env(safe-area-inset-top))] sm:px-8 sm:pb-8 sm:pt-8 lg:px-12 lg:pb-10 lg:pt-10"
        animate={exiting ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      >
        <header className="flex items-start justify-between gap-1 sm:gap-6">
          <motion.p
            className="font-display text-sm font-extrabold uppercase tracking-[-0.02em] text-foreground sm:text-base"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: showingIndex ? 1 : 0, y: showingIndex ? 0 : -6 }}
            transition={{ duration: 0.48, ease: EASE }}
          >
            Mario.Sianturi
          </motion.p>

          <motion.p
            className="whitespace-nowrap text-right font-mono text-[9px] uppercase leading-relaxed tracking-[0.16em] text-muted-foreground sm:text-[10px] sm:tracking-[0.2em]"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: showingIndex ? 1 : 0, y: showingIndex ? 0 : -6 }}
            transition={{ duration: 0.48, delay: 0.06, ease: EASE }}
          >
            <span className="hidden min-[360px]:inline">Portfolio </span>Index
            <span className="ml-2 text-primary">/ 2026</span>
          </motion.p>
        </header>

        <main className="relative flex min-h-0 flex-1 items-center justify-center py-5 sm:py-8">
          <motion.section
            className="w-full max-w-5xl"
            initial={{ opacity: 1, scale: 1, y: 0 }}
            animate={
              showingIndex
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 0, scale: 0.9, y: -10 }
            }
            transition={{ duration: 0.42, ease: EASE }}
          >
            <motion.div
              className="mb-3 flex items-end justify-between gap-5 sm:mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary sm:text-xs sm:tracking-[0.22em]">
                Selected work
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:text-xs sm:tracking-[0.22em]">
                05 case studies
              </p>
            </motion.div>

            <div className="relative overflow-hidden border-b border-foreground/10">
              <motion.div
                className="pointer-events-none absolute inset-x-0 z-20 h-px bg-primary"
                initial={{ top: "0%", opacity: 0 }}
                animate={{ top: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 0.72,
                  delay: 0.4,
                  times: [0, 0.12, 0.88, 1],
                  ease: "linear",
                }}
              />

              <ol>
                {FEATURED_WORK.map((project, index) => (
                  <motion.li
                    key={project}
                    className="grid min-w-0 grid-cols-[2.5rem_minmax(0,1fr)] items-center border-t border-foreground/10 py-2.5 sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:py-3 lg:grid-cols-[6rem_minmax(0,1fr)]"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.52,
                      delay: 0.14 + index * 0.07,
                      ease: EASE,
                    }}
                  >
                    <motion.span
                      className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground sm:text-xs sm:tracking-[0.2em]"
                      animate={{
                        color: [
                          "hsl(var(--muted-foreground))",
                          "hsl(var(--primary))",
                          "hsl(var(--muted-foreground))",
                        ],
                      }}
                      transition={{
                        duration: 0.32,
                        delay: 0.46 + index * 0.105,
                        ease: "linear",
                      }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </motion.span>

                    <div className="overflow-hidden">
                      <motion.span
                        className="block truncate font-display text-[clamp(0.75rem,3.6vw,0.9rem)] font-extrabold uppercase leading-none tracking-[-0.025em] text-foreground sm:text-[clamp(1.5rem,3.2vw,2.6rem)]"
                        initial={{ y: "115%" }}
                        animate={{ y: 0 }}
                        transition={{
                          duration: 0.58,
                          delay: 0.16 + index * 0.07,
                          ease: EASE,
                        }}
                      >
                        {project}
                      </motion.span>
                    </div>
                  </motion.li>
                ))}
              </ol>
            </div>
          </motion.section>

          <motion.div
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.86 }}
            animate={
              showingMark
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: exiting ? 1.04 : 0.86 }
            }
            transition={{ duration: 0.44, ease: EASE }}
          >
            <div className="relative select-none text-center">
              <div className="overflow-hidden">
                <motion.p
                  className="font-display text-[clamp(4rem,18vw,10rem)] font-extrabold leading-[0.78] tracking-[-0.08em] text-foreground"
                  initial={{ y: "105%" }}
                  animate={{ y: showingMark ? 0 : "105%" }}
                  transition={{ duration: 0.48, ease: EASE }}
                >
                  MS<span className="text-primary">.</span>
                </motion.p>
              </div>
              <motion.p
                className="mt-5 font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground sm:text-[10px]"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: showingMark ? 1 : 0, y: showingMark ? 0 : 6 }}
                transition={{ duration: 0.32, delay: showingMark ? 0.12 : 0 }}
              >
                Software Engineer / Full-Stack Developer
              </motion.p>
            </div>
          </motion.div>
        </main>

        <motion.footer
          className="flex items-end justify-between gap-6 font-mono text-[9px] uppercase leading-relaxed tracking-[0.16em] text-muted-foreground sm:text-[10px] sm:tracking-[0.2em]"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: showingIndex ? 1 : 0, y: showingIndex ? 0 : 6 }}
          transition={{ duration: 0.42, delay: 0.16, ease: EASE }}
        >
          <span>Software Engineer / Full-Stack</span>
          <span className="text-right">Jakarta, ID</span>
        </motion.footer>
      </motion.div>
    </div>
  )
}
