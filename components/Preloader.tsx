"use client"

// ─────────────────────────────────────────────────────────────────────────────
// Preloader.tsx — "Cinematic Boot" (dark editorial)
//
//   0.0s  Layar ink, tech labels mono muncul stagger
//   0.3s  Monogram MS. reveal
//   1.0s  Counter mono 0→100 + garis progress lime tipis
//   100%  Panel slide-up menghilang
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

const TECH_TAGS = [
  "Next.js", "React", "TypeScript", "Tailwind",
  "Kotlin", "Firebase", "Python", "Figma",
  "Node.js", "Git", "REST API", "PostgreSQL",
]

const TAG_POSITIONS = [
  { x: 10, y: 14 }, { x: 74, y: 10 }, { x: 16, y: 80 }, { x: 84, y: 74 },
  { x: 6,  y: 46 }, { x: 90, y: 36 }, { x: 34, y: 90 }, { x: 62, y: 92 },
  { x: 26, y: 24 }, { x: 66, y: 20 }, { x: 12, y: 62 }, { x: 80, y: 56 },
]

export default function Preloader() {
  const [phase, setPhase]   = useState<"loading" | "done" | "hidden">("loading")
  const [count, setCount]   = useState(0)
  const [tagsMask, setTagsMask] = useState<boolean[]>(new Array(TECH_TAGS.length).fill(false))
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  // prefers-reduced-motion: skip preloader
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (mq.matches) {
      setPhase("hidden")
      document.body.style.overflow = ""
    }
  }, [])

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [])

  useEffect(() => {
    const timers = timersRef.current

    TECH_TAGS.forEach((_, i) => {
      timers.push(setTimeout(() => {
        setTagsMask(prev => {
          const next = [...prev]
          next[i] = true
          return next
        })
      }, 300 + i * 70))
    })

    timers.push(setTimeout(() => {
      let start: number | null = null
      const duration = 1000
      const step = (timestamp: number) => {
        if (!start) start = timestamp
        const progress = Math.min((timestamp - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setCount(Math.round(eased * 100))
        if (progress < 1) requestAnimationFrame(step)
        else {
          timers.push(setTimeout(() => setPhase("done"), 350))
          timers.push(setTimeout(() => setPhase("hidden"), 1400))
        }
      }
      requestAnimationFrame(step)
    }, 1100))

    return () => timers.forEach(clearTimeout)
  }, [])

  if (phase === "hidden") return null

  return (
    <AnimatePresence>
      {(phase === "loading" || phase === "done") && (
        <motion.div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-background"
          aria-hidden="true"
          exit={{ y: "-100%" }}
          animate={phase === "done" ? { y: "-100%" } : { y: 0 }}
          transition={phase === "done" ? { duration: 0.8, ease: [0.76, 0, 0.24, 1] } : { duration: 0 }}
        >
          {/* Tech labels mono */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {TECH_TAGS.map((tag, i) => (
              <motion.span
                key={tag}
                className="absolute font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground/40"
                style={{
                  left: `${TAG_POSITIONS[i]?.x ?? 50}%`,
                  top: `${TAG_POSITIONS[i]?.y ?? 50}%`,
                  transform: "translate(-50%, -50%)",
                }}
                initial={{ opacity: 0 }}
                animate={tagsMask[i] ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {tag}
              </motion.span>
            ))}
          </div>

          {/* Center content */}
          <div className="relative z-10 flex select-none flex-col items-center gap-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl font-extrabold tracking-tight md:text-6xl"
            >
              MS<span className="text-primary">.</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="flex w-64 flex-col items-center gap-4 md:w-80"
            >
              {/* Progress line */}
              <div className="relative h-px w-full bg-border/15">
                <div
                  className="absolute inset-y-0 left-0 bg-primary"
                  style={{ width: `${count}%` }}
                />
              </div>

              <div className="flex w-full items-baseline justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  {count === 100 ? "Welcome" : "Loading"}
                </span>
                <span className="font-mono text-2xl font-bold text-foreground">
                  {count.toString().padStart(3, "0")}
                  <span className="ml-1 text-sm text-primary">%</span>
                </span>
              </div>
            </motion.div>
          </div>

          {/* Corner labels */}
          <span className="absolute left-6 top-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50">
            Portfolio v2.0
          </span>
          <span className="absolute bottom-6 right-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50">
            Jakarta, ID
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
