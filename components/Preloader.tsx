"use client"

// ─────────────────────────────────────────────────────────────────────────────
// Preloader.tsx  —  "Cinematic Boot Sequence"
//
// Fase animasi:
//   0.0s  Boot: background grid berpendar, scan line turun
//   0.6s  Logo: SVG stroke draw "MS" monogram
//   1.2s  Tag cloud: tech labels bermunculan di posisi acak
//   1.8s  Counter: angka naik cepat 0→100
//   2.8s  100% moment: flash kecil + confetti burst
//   3.1s  Exit: dua curtain panel split (atas ↑, bawah ↓)
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useState, useRef, useCallback } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring, animate } from "framer-motion"

// ── Tech tags yang akan muncul di background ──────────────────────────────────
const TECH_TAGS = [
  "Next.js", "React", "TypeScript", "Tailwind",
  "Kotlin", "Firebase", "Python", "Figma",
  "Node.js", "Git", "REST API", "Android",
  "TensorFlow", "Framer Motion", "Vercel", "GCP",
]

// ── Posisi acak yang sudah di-pre-compute (menghindari re-render) ─────────────
const TAG_POSITIONS = [
  { x: 8,  y: 12 }, { x: 72, y: 8  }, { x: 18, y: 78 }, { x: 82, y: 72 },
  { x: 5,  y: 45 }, { x: 88, y: 35 }, { x: 35, y: 88 }, { x: 60, y: 92 },
  { x: 25, y: 22 }, { x: 65, y: 18 }, { x: 12, y: 60 }, { x: 78, y: 55 },
  { x: 42, y: 5  }, { x: 50, y: 82 }, { x: 3,  y: 30 }, { x: 93, y: 60 },
]

// ─────────────────────────────────────────────────────────────────────────────
export default function Preloader() {
  const [phase,     setPhase]     = useState<"loading" | "done" | "hidden">("loading")
  const [count,     setCount]     = useState(0)
  const [tagsMask,  setTagsMask]  = useState<boolean[]>(new Array(TECH_TAGS.length).fill(false))
  const [flashDone, setFlashDone] = useState(false)
  const confettiFired = useRef(false)
  const containerRef  = useRef<HTMLDivElement>(null)

  // ── Lock scroll ──────────────────────────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [])

  // ── Sequenced animation timeline ─────────────────────────────────────────────
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []

    // Phase 1: Tech tags bermunculan satu per satu
    TECH_TAGS.forEach((_, i) => {
      timers.push(setTimeout(() => {
        setTagsMask(prev => {
          const next = [...prev]
          next[i] = true
          return next
        })
      }, 400 + i * 90))
    })

    // Phase 2: Counter naik 0 → 100 dalam 900ms (mulai di 1.2s)
    timers.push(setTimeout(() => {
      let start: number | null = null
      const duration = 900

      const step = (timestamp: number) => {
        if (!start) start = timestamp
        const progress = Math.min((timestamp - start) / duration, 1)
        // Ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3)
        setCount(Math.round(eased * 100))
        if (progress < 1) requestAnimationFrame(step)
        else {
          // Flash moment
          setFlashDone(true)
          // Confetti
          fireConfetti()
          // Trigger exit
          timers.push(setTimeout(() => setPhase("done"), 400))
          // Remove from DOM
          timers.push(setTimeout(() => setPhase("hidden"), 1800))
        }
      }
      requestAnimationFrame(step)
    }, 1200))

    return () => timers.forEach(clearTimeout)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ── Confetti burst (canvas-confetti, lazy-loaded) ────────────────────────────
  const fireConfetti = useCallback(async () => {
    if (confettiFired.current) return
    confettiFired.current = true
    try {
      const confetti = (await import("canvas-confetti")).default
      // Dua burst dari kiri dan kanan bawah
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { x: 0.3, y: 0.6 },
        colors: ["#6366f1", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b"],
        gravity: 0.8,
        scalar: 0.9,
        ticks: 80,
      })
      setTimeout(() => {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { x: 0.7, y: 0.6 },
          colors: ["#6366f1", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b"],
          gravity: 0.8,
          scalar: 0.9,
          ticks: 80,
        })
      }, 120)
    } catch {
      // Graceful fallback — confetti gagal tidak masalah
    }
  }, [])

  if (phase === "hidden") return null

  return (
    <AnimatePresence>
      {(phase === "loading" || phase === "done") && (
        <div
          ref={containerRef}
          className="fixed inset-0 z-[99999] overflow-hidden"
          aria-hidden="true"
        >

          {/* ── CURTAIN TOP ── */}
          <motion.div
            className="absolute inset-x-0 top-0 bg-[#030712] origin-top"
            initial={{ height: "100%" }}
            animate={phase === "done" ? { height: "0%" } : { height: "50%" }}
            transition={
              phase === "done"
                ? { duration: 1.0, ease: [0.76, 0, 0.24, 1], delay: 0.05 }
                : { duration: 0 }
            }
          />

          {/* ── CURTAIN BOTTOM ── */}
          <motion.div
            className="absolute inset-x-0 bottom-0 bg-[#030712] origin-bottom"
            initial={{ height: "100%" }}
            animate={phase === "done" ? { height: "0%" } : { height: "50%" }}
            transition={
              phase === "done"
                ? { duration: 1.0, ease: [0.76, 0, 0.24, 1], delay: 0.0 }
                : { duration: 0 }
            }
          />

          {/* ── MAIN STAGE — dark bg yang akan ter-split ── */}
          <motion.div
            className="absolute inset-0 bg-[#030712] flex items-center justify-center"
            animate={phase === "done" ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.7 }}
          >

            {/* ── Background: animated grid ── */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `
                  linear-gradient(to right, #6366f1 1px, transparent 1px),
                  linear-gradient(to bottom, #6366f1 1px, transparent 1px)
                `,
                backgroundSize: "48px 48px",
              }}
            />

            {/* ── Scan line effect ── */}
            <motion.div
              className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent pointer-events-none"
              initial={{ top: "-2px", opacity: 0 }}
              animate={{ top: ["0%", "100%"], opacity: [0, 0.6, 0.6, 0] }}
              transition={{ duration: 1.2, ease: "easeInOut", delay: 0.1 }}
            />

            {/* ── Radial glow center ── */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{
                background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(99,102,241,0.08) 0%, transparent 70%)",
              }}
            />

            {/* ── Tech tags floating in background ── */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {TECH_TAGS.map((tag, i) => (
                <motion.span
                  key={tag}
                  className="absolute text-xs font-mono font-semibold text-primary/25 tracking-wider"
                  style={{
                    left:  `${TAG_POSITIONS[i]?.x ?? 50}%`,
                    top:   `${TAG_POSITIONS[i]?.y ?? 50}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  initial={{ opacity: 0, scale: 0.6, filter: "blur(4px)" }}
                  animate={tagsMask[i]
                    ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                    : { opacity: 0, scale: 0.6, filter: "blur(4px)" }
                  }
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            {/* ── Flash overlay saat 100% ── */}
            <AnimatePresence>
              {flashDone && (
                <motion.div
                  className="absolute inset-0 bg-white pointer-events-none"
                  initial={{ opacity: 0.25 }}
                  animate={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              )}
            </AnimatePresence>

            {/* ── CENTER CONTENT ── */}
            <div className="relative flex flex-col items-center gap-10 z-10 select-none">

              {/* Monogram SVG dengan stroke draw animation */}
              <motion.div
                className="relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.5 }}
              >
                {/* Outer ring yang berputar */}
                <motion.svg
                  viewBox="0 0 120 120"
                  className="absolute -inset-4 w-[calc(100%+2rem)] h-[calc(100%+2rem)]"
                  style={{ top: "-1rem", left: "-1rem" }}
                >
                  <motion.circle
                    cx="60" cy="60" r="56"
                    fill="none"
                    stroke="url(#ringGrad)"
                    strokeWidth="0.8"
                    strokeLinecap="round"
                    strokeDasharray="352"
                    initial={{ strokeDashoffset: 352, rotate: -90 }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: 1.4, ease: "easeInOut", delay: 0.6 }}
                    style={{ transformOrigin: "60px 60px" }}
                  />
                  <defs>
                    <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%"   stopColor="#6366f1" stopOpacity="0.8" />
                      <stop offset="50%"  stopColor="#8b5cf6" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.4" />
                    </linearGradient>
                  </defs>
                </motion.svg>

                {/* Inner container */}
                <div className="relative w-24 h-24 md:w-28 md:h-28 flex items-center justify-center">
                  {/* Glow */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.4, 0.2] }}
                    transition={{ duration: 1.2, delay: 0.8, times: [0, 0.5, 1] }}
                    style={{
                      background: "radial-gradient(circle, rgba(99,102,241,0.5) 0%, transparent 70%)",
                      filter: "blur(12px)",
                    }}
                  />

                  {/* MS Monogram SVG — stroke draw */}
                  <svg viewBox="0 0 80 60" className="w-16 h-12 md:w-20 md:h-14 relative z-10">
                    {/* M */}
                    <motion.path
                      d="M 4 48 L 4 12 L 20 36 L 36 12 L 36 48"
                      fill="none"
                      stroke="white"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.9, ease: "easeInOut", delay: 0.7 }}
                    />
                    {/* S */}
                    <motion.path
                      d="M 76 16 C 76 16 60 8 52 16 C 44 24 76 36 68 44 C 60 52 44 44 44 44"
                      fill="none"
                      stroke="url(#sGrad)"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.9, ease: "easeInOut", delay: 1.0 }}
                    />
                    <defs>
                      <linearGradient id="sGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%"   stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </motion.div>

              {/* Name + title */}
              <motion.div
                className="flex flex-col items-center gap-1.5"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.1, ease: "easeOut" }}
              >
                <span className="text-white text-2xl md:text-3xl font-black tracking-[-0.02em]">
                  Mario Sianturi
                </span>
                <span className="text-primary/70 text-xs font-mono tracking-[0.25em] uppercase">
                  Web Developer
                </span>
              </motion.div>

              {/* Progress area */}
              <motion.div
                className="flex flex-col items-center gap-3 w-64 md:w-80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.15 }}
              >
                {/* Progress track */}
                <div className="relative w-full h-[3px] bg-white/5 rounded-full overflow-hidden">
                  {/* Background shimmer */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                  {/* Progress fill */}
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{
                      width: `${count}%`,
                      background: "linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4)",
                    }}
                    transition={{ duration: 0.05 }}
                  />
                  {/* Leading glow dot */}
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full shadow-lg"
                    style={{
                      left: `calc(${count}% - 4px)`,
                      background: "#6366f1",
                      boxShadow: "0 0 8px 2px rgba(99,102,241,0.8)",
                    }}
                    transition={{ duration: 0.05 }}
                  />
                </div>

                {/* Counter row */}
                <div className="flex items-baseline gap-2">
                  {/* Large percentage number */}
                  <motion.span
                    className="font-black font-mono leading-none"
                    style={{
                      fontSize: "clamp(2.5rem, 6vw, 4rem)",
                      backgroundImage: count === 100
                        ? "linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4)"
                        : "linear-gradient(135deg, #ffffff, #ffffff)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      transition: "background-image 0.3s ease",
                    }}
                  >
                    {count.toString().padStart(2, "0")}
                  </motion.span>
                  <span
                    className="text-lg font-mono font-bold"
                    style={{
                      color: count === 100 ? "#6366f1" : "rgba(255,255,255,0.4)",
                      transition: "color 0.3s ease",
                    }}
                  >
                    %
                  </span>
                </div>

                {/* Status text */}
                <StatusText count={count} />
              </motion.div>

            </div>

            {/* ── Corner decorations ── */}
            <CornerDeco position="top-left"     />
            <CornerDeco position="top-right"    />
            <CornerDeco position="bottom-left"  />
            <CornerDeco position="bottom-right" />

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// STATUS TEXT — berubah seiring progress
// ─────────────────────────────────────────────────────────────────────────────
function StatusText({ count }: { count: number }) {
  const messages = [
    { threshold: 0,   text: "Initializing..."          },
    { threshold: 20,  text: "Loading assets..."        },
    { threshold: 45,  text: "Building components..."   },
    { threshold: 70,  text: "Applying styles..."       },
    { threshold: 90,  text: "Almost ready..."          },
    { threshold: 100, text: "Welcome! 🚀"             },
  ]

  const current = messages.filter(m => count >= m.threshold).at(-1)!

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={current.text}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.2 }}
        className="text-xs font-mono tracking-widest uppercase"
        style={{ color: count === 100 ? "#6366f1" : "rgba(255,255,255,0.3)" }}
      >
        {current.text}
      </motion.span>
    </AnimatePresence>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CORNER DECORATIONS — L-shaped brackets di 4 sudut
// ─────────────────────────────────────────────────────────────────────────────
function CornerDeco({ position }: {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right"
}) {
  const isTop    = position.startsWith("top")
  const isLeft   = position.endsWith("left")

  const wrapStyle: React.CSSProperties = {
    position: "absolute",
    top:    isTop    ? "1.5rem" : "auto",
    bottom: !isTop   ? "1.5rem" : "auto",
    left:   isLeft   ? "1.5rem" : "auto",
    right:  !isLeft  ? "1.5rem" : "auto",
  }

  const hLine: React.CSSProperties = {
    width:  "28px",
    height: "1.5px",
    background: "rgba(99,102,241,0.4)",
    position: "absolute",
    top:    isTop  ? 0 : "auto",
    bottom: !isTop ? 0 : "auto",
    left:   isLeft ? 0 : "auto",
    right:  !isLeft? 0 : "auto",
  }

  const vLine: React.CSSProperties = {
    width:  "1.5px",
    height: "28px",
    background: "rgba(99,102,241,0.4)",
    position: "absolute",
    top:    isTop  ? 0 : "auto",
    bottom: !isTop ? 0 : "auto",
    left:   isLeft ? 0 : "auto",
    right:  !isLeft? 0 : "auto",
  }

  const dot: React.CSSProperties = {
    width:  "4px",
    height: "4px",
    borderRadius: "50%",
    background: "rgba(99,102,241,0.7)",
    position: "absolute",
    top:    isTop  ? 0 : "auto",
    bottom: !isTop ? 0 : "auto",
    left:   isLeft ? 0 : "auto",
    right:  !isLeft? 0 : "auto",
    transform: "translate(-50%, -50%)",
    ...(isTop  && isLeft  ? { top: "0",      left:  "0"     } : {}),
    ...(isTop  && !isLeft ? { top: "0",      right: "0",  left: "auto", transform: "translate(50%, -50%)" } : {}),
    ...(!isTop && isLeft  ? { bottom: "0",   left:  "0",  top: "auto",  transform: "translate(-50%, 50%)" } : {}),
    ...(!isTop && !isLeft ? { bottom: "0",   right: "0",  top: "auto",  left: "auto", transform: "translate(50%, 50%)" } : {}),
  }

  return (
    <motion.div
      style={{ ...wrapStyle, position: "absolute", width: "28px", height: "28px" }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div style={hLine} />
      <div style={vLine} />
      <div style={dot}   />
    </motion.div>
  )
}