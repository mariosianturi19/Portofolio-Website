"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Sparkles, BarChart3, Layers } from "lucide-react"
import { useLanguage } from "@/components/LanguageProvider"
import { skillCategories, marqueeTechs } from "@/data/skills"

// ── Color map per kategori (untuk radial & globe) ─────────────────────────────
const categoryAccent: Record<string, string> = {
  Frontend:           "#3b82f6",
  Mobile:             "#10b981",
  Languages:          "#f97316",
  Tools:              "#a855f7",
  Design:             "#f43f5e",
  "Backend / Database": "#6366f1",
}

// ── Tab definitions ───────────────────────────────────────────────────────────
type ViewMode = "radial" | "radar"
const TABS: { id: ViewMode; label: string; icon: React.ReactNode }[] = [
  { id: "radial", label: "Radial",  icon: <Layers   className="h-4 w-4" /> },
  { id: "radar",  label: "Radar",   icon: <BarChart3 className="h-4 w-4" /> },
]

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function Skills() {
  const { t }           = useLanguage()
  const [view, setView] = useState<ViewMode>("radial")
  const [activeCategory, setActiveCategory] = useState(0)

  const containerVariants = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  }
  const itemVariants = {
    hidden:  { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20 } },
  }

  return (
    <section id="skills" className="py-24 md:py-32 bg-background relative overflow-hidden">

      {/* Background blobs */}
      <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-violet-500/3 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="container mx-auto px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">

        {/* ── Header ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-background/50 backdrop-blur-md text-sm font-medium mb-6"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span>{t.skills.badge}</span>
          </motion.div>

          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">
            {t.skills.title}
          </motion.h2>

          <motion.div variants={itemVariants} className="w-20 h-1.5 bg-gradient-to-r from-primary to-blue-500 mx-auto rounded-full mb-10" />

          {/* View Toggle Tabs */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-1.5 p-1.5 rounded-2xl bg-muted/40 border border-border/50 backdrop-blur-sm">
            {TABS.map((tab) => {
              const isActive = view === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setView(tab.id)}
                  className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200 ${
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="skillTabBg"
                      className="absolute inset-0 bg-background border border-border/50 rounded-xl shadow-sm -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                  {tab.icon}
                  {tab.label}
                </button>
              )
            })}
          </motion.div>
        </motion.div>

        {/* ── View Content ── */}
        <AnimatePresence mode="wait">
          {view === "radial" && (
            <motion.div
              key="radial"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <RadialView activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
            </motion.div>
          )}

          {view === "radar" && (
            <motion.div
              key="radar"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <RadarView />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Dual Marquee ── */}
      <DualMarquee />
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// RADIAL VIEW — kartu dengan circular progress + skill list
// ─────────────────────────────────────────────────────────────────────────────
function RadialView({
  activeCategory,
  setActiveCategory,
}: {
  activeCategory: number
  setActiveCategory: (i: number) => void
}) {
  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">

      {/* Left: Category selector */}
      <div className="lg:w-64 flex-shrink-0 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
        {skillCategories.map((cat, i) => {
          const isActive = activeCategory === i
          const accent   = categoryAccent[cat.title] ?? "#6366f1"
          return (
            <motion.button
              key={cat.title}
              onClick={() => setActiveCategory(i)}
              whileHover={{ x: isActive ? 0 : 4 }}
              className={`flex-shrink-0 flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all duration-300 border ${
                isActive
                  ? "bg-background border-border/80 shadow-lg"
                  : "bg-muted/20 border-transparent hover:bg-muted/40 hover:border-border/50"
              }`}
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-md flex-shrink-0"
                style={{ background: `linear-gradient(135deg, ${accent}cc, ${accent}88)` }}
              >
                {cat.icon}
              </div>
              <div className="text-left min-w-0">
                <div className={`text-sm font-semibold truncate ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                  {cat.title}
                </div>
                <div className="text-xs text-muted-foreground/70 truncate">{cat.description}</div>
              </div>
            </motion.button>
          )
        })}
      </div>

      {/* Right: Skill cards grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="flex-1 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4"
        >
          {skillCategories[activeCategory].skills.map((skill, i) => (
            <RadialSkillCard
              key={skill.name}
              skill={skill}
              color={skillCategories[activeCategory].color}
              accent={categoryAccent[skillCategories[activeCategory].title] ?? "#6366f1"}
              delay={i * 0.06}
            />
          ))}

          {/* Category overview card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: skillCategories[activeCategory].skills.length * 0.06 + 0.1 }}
            className={`col-span-2 md:col-span-4 relative overflow-hidden rounded-3xl bg-background/40 backdrop-blur-xl border border-border/50 p-6`}
          >
            <div
              className="absolute inset-0 opacity-5"
              style={{ background: `radial-gradient(ellipse at top left, ${categoryAccent[skillCategories[activeCategory].title]}, transparent)` }}
            />
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
                  {skillCategories[activeCategory].title} · Average proficiency
                </div>
                <div className="text-4xl font-black text-foreground">
                  {Math.round(
                    skillCategories[activeCategory].skills.reduce((a, s) => a + s.level, 0) /
                    skillCategories[activeCategory].skills.length
                  )}%
                </div>
              </div>
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-xl"
                style={{ background: `linear-gradient(135deg, ${categoryAccent[skillCategories[activeCategory].title]}cc, ${categoryAccent[skillCategories[activeCategory].title]}66)` }}
              >
                <span className="text-2xl">{skillCategories[activeCategory].skills.length}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// ─── Single radial skill card ─────────────────────────────────────────────────
function RadialSkillCard({
  skill,
  color,
  accent,
  delay,
}: {
  skill: { name: string; level: number }
  color: string
  accent: string
  delay: number
}) {
  const ref         = useRef<HTMLDivElement>(null)
  const inView      = useInView(ref, { once: true, margin: "-40px" })
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    if (inView && !animated) {
      const t = setTimeout(() => setAnimated(true), delay * 1000)
      return () => clearTimeout(t)
    }
  }, [inView, animated, delay])

  // SVG circle math
  const R          = 42
  const CIRCUMF    = 2 * Math.PI * R
  const progress   = animated ? skill.level / 100 : 0
  const dashOffset = CIRCUMF * (1 - progress)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={{ opacity: 1, scale: 1,    y: 0  }}
      transition={{ delay, type: "spring", stiffness: 120, damping: 18 }}
      whileHover={{ y: -4, scale: 1.03 }}
      className="group relative overflow-hidden rounded-3xl bg-background/50 backdrop-blur-xl border border-border/50
        hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 p-5
        flex flex-col items-center text-center cursor-default"
    >
      {/* Glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500 rounded-3xl"
        style={{ background: `radial-gradient(ellipse at center, ${accent}, transparent)` }}
      />

      {/* Circular progress SVG */}
      <div className="relative w-28 h-28 mb-4">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          {/* Track */}
          <circle
            cx="50" cy="50" r={R}
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            className="text-muted/40"
          />
          {/* Progress arc */}
          <motion.circle
            cx="50" cy="50" r={R}
            fill="none"
            stroke={accent}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={CIRCUMF}
            initial={{ strokeDashoffset: CIRCUMF }}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ duration: 1.4, ease: "easeOut", delay }}
          />
        </svg>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-2xl font-black text-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.4 }}
          >
            {animated ? skill.level : 0}
          </motion.span>
          <span className="text-xs text-muted-foreground font-medium">%</span>
        </div>

        {/* Glow ring */}
        <div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl"
          style={{ background: accent }}
        />
      </div>

      <div className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
        {skill.name}
      </div>

      {/* Level label */}
      <div className="mt-1 text-xs font-medium text-muted-foreground">
        {skill.level >= 90 ? "Expert" : skill.level >= 75 ? "Advanced" : skill.level >= 60 ? "Intermediate" : "Learning"}
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// RADAR VIEW — SVG spider/radar chart pure, tidak perlu library
// ─────────────────────────────────────────────────────────────────────────────
function RadarView() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-50px" })

  // Data: average per kategori
  const radarData = skillCategories.map((cat) => ({
    label:  cat.title,
    value:  Math.round(cat.skills.reduce((a, s) => a + s.level, 0) / cat.skills.length),
    accent: categoryAccent[cat.title] ?? "#6366f1",
  }))

  const N     = radarData.length
  const CX    = 200
  const CY    = 200
  const RMAX  = 150
  const RINGS = [20, 40, 60, 80, 100]

  // Posisi sudut tiap axis
  const angleFor = (i: number) => (i * 2 * Math.PI) / N - Math.PI / 2

  // Konversi value (0–100) ke koordinat x,y
  const toXY = (i: number, val: number) => {
    const r = (val / 100) * RMAX
    const a = angleFor(i)
    return { x: CX + r * Math.cos(a), y: CY + r * Math.sin(a) }
  }

  // Polygon vertices
  const points = radarData.map((d, i) => toXY(i, d.value))
  const polyStr = points.map((p) => `${p.x},${p.y}`).join(" ")

  return (
    <div ref={ref} className="max-w-5xl mx-auto">
      <div className="flex flex-col lg:flex-row items-center gap-12">

        {/* SVG Radar */}
        <div className="relative flex-shrink-0">
          <svg viewBox="0 0 400 400" className="w-full max-w-[420px]">

            {/* Ring circles */}
            {RINGS.map((r) => (
              <circle
                key={r}
                cx={CX} cy={CY}
                r={(r / 100) * RMAX}
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-border/50"
              />
            ))}

            {/* Ring labels */}
            {RINGS.map((r) => (
              <text
                key={r}
                x={CX + 4}
                y={CY - (r / 100) * RMAX + 4}
                fontSize="8"
                fill="currentColor"
                className="text-muted-foreground/50"
              >
                {r}
              </text>
            ))}

            {/* Axis lines */}
            {radarData.map((_, i) => {
              const end = toXY(i, 100)
              return (
                <line
                  key={i}
                  x1={CX} y1={CY}
                  x2={end.x} y2={end.y}
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-border/50"
                />
              )
            })}

            {/* Filled polygon */}
            {inView && (
              <motion.polygon
                points={polyStr}
                fill="hsl(var(--primary))"
                fillOpacity={0.12}
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                strokeLinejoin="round"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                style={{ transformOrigin: `${CX}px ${CY}px` }}
              />
            )}

            {/* Vertex dots + colored per category */}
            {radarData.map((d, i) => {
              const pos = toXY(i, d.value)
              return (
                <motion.circle
                  key={d.label}
                  cx={pos.x}
                  cy={pos.y}
                  r={5}
                  fill={d.accent}
                  stroke="hsl(var(--background))"
                  strokeWidth="2"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6 + i * 0.08, type: "spring", stiffness: 200 }}
                  style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
                />
              )
            })}

            {/* Axis labels */}
            {radarData.map((d, i) => {
              const a    = angleFor(i)
              const dist = RMAX + 26
              const lx   = CX + dist * Math.cos(a)
              const ly   = CY + dist * Math.sin(a)
              const anchor =
                Math.abs(Math.cos(a)) < 0.1 ? "middle" :
                Math.cos(a) > 0 ? "start" : "end"

              return (
                <text
                  key={d.label}
                  x={lx}
                  y={ly + 4}
                  textAnchor={anchor}
                  fontSize="11"
                  fontWeight="600"
                  fill={d.accent}
                >
                  {d.label}
                </text>
              )
            })}
          </svg>
        </div>

        {/* Right: Stats list */}
        <div className="flex-1 space-y-3 w-full max-w-sm">
          <h3 className="text-lg font-bold text-foreground mb-5">Category Breakdown</h3>
          {radarData.map((d, i) => (
            <motion.div
              key={d.label}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.08, type: "spring", stiffness: 120 }}
              className="group flex items-center gap-4"
            >
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: d.accent }} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-foreground/85 truncate">{d.label}</span>
                  <span className="text-sm font-bold ml-2" style={{ color: d.accent }}>{d.value}%</span>
                </div>
                {/* Thin progress bar */}
                <div className="w-full h-1.5 bg-muted/50 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: d.accent }}
                    initial={{ width: 0 }}
                    animate={{ width: inView ? `${d.value}%` : 0 }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 + i * 0.08 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// DUAL MARQUEE — dua baris berlawanan arah
// ─────────────────────────────────────────────────────────────────────────────
function DualMarquee() {
  // Split tech menjadi 2 grup
  const half     = Math.ceil(marqueeTechs.length / 2)
  const rowTop   = marqueeTechs.slice(0, half)
  const rowBot   = marqueeTechs.slice(half)

  return (
    <div className="mt-28 space-y-6">
      {/* Row 1 — kiri ke kanan */}
      <MarqueeRow techs={rowTop} direction="left" speed={30} />
      {/* Row 2 — kanan ke kiri */}
      <MarqueeRow techs={rowBot} direction="right" speed={38} />
    </div>
  )
}

function MarqueeRow({
  techs,
  direction,
  speed,
}: {
  techs: typeof marqueeTechs
  direction: "left" | "right"
  speed: number
}) {
  // Duplicate 4x untuk seamless scroll
  const items = [...techs, ...techs, ...techs, ...techs]
  const animX = direction === "left" ? [0, "-50%"] : ["-50%", 0]

  return (
    <div className="relative overflow-hidden">
      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-10 md:gap-16"
        animate={{ x: animX }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        style={{ width: "max-content" }}
      >
        {items.map((tech, i) => (
          <div
            key={i}
            className={`group flex items-center gap-3 text-muted-foreground/25 transition-all duration-500 cursor-default ${tech.hoverColor}`}
          >
            <tech.icon className="w-10 h-10 md:w-14 md:h-14 transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-1.5" />
            <span className="font-bold text-lg md:text-2xl tracking-tight opacity-0 max-w-0 overflow-hidden group-hover:opacity-100 group-hover:max-w-[120px] transition-all duration-500 whitespace-nowrap">
              {tech.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}