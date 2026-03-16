"use client"

// ScrollProgress.tsx
// Komponen ini menampilkan:
// 1. Dot indicators di sisi kanan layar — menunjukkan posisi scroll
//    dan bisa diklik untuk navigasi ke section
// 2. Progress bar tipis di atas sudah dipindahkan ke Navbar.tsx

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const SECTIONS = [
  { id: "home",       label: "Home"       },
  { id: "about",      label: "About"      },
  { id: "projects",   label: "Projects"   },
  { id: "skills",     label: "Skills"     },
  { id: "experience", label: "Experience" },
  { id: "contact",    label: "Contact"    },
]

export default function ScrollProgress() {
  const [activeSection,  setActiveSection]  = useState("home")
  const [isVisible,      setIsVisible]      = useState(false)
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)

  // Baru muncul setelah 200px scroll
  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > 200)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Track active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    )
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0  }}
          exit={  { opacity: 0, x: 20  }}
          transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
          className="fixed right-5 top-1/2 -translate-y-1/2 z-40 flex flex-col items-end gap-2.5 hidden lg:flex"
        >
          {SECTIONS.map((section, i) => {
            const isActive  = activeSection === section.id
            const isHovered = hoveredSection === section.id

            return (
              <div
                key={section.id}
                className="relative flex items-center justify-end gap-2 cursor-pointer"
                onMouseEnter={() => setHoveredSection(section.id)}
                onMouseLeave={() => setHoveredSection(null)}
                onClick={() => scrollTo(section.id)}
              >
                {/* Label tooltip — muncul saat hover */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.span
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={  { opacity: 0, x: 8 }}
                      transition={{ duration: 0.15 }}
                      className="text-xs font-semibold text-foreground bg-background/90 backdrop-blur-sm
                        border border-border/60 px-2.5 py-1 rounded-lg shadow-lg whitespace-nowrap"
                    >
                      {section.label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Dot */}
                <motion.div
                  className={cn(
                    "rounded-full transition-colors duration-300",
                    isActive
                      ? "bg-primary shadow-lg shadow-primary/40"
                      : isHovered
                      ? "bg-foreground/50"
                      : "bg-foreground/20 hover:bg-foreground/40"
                  )}
                  animate={{
                    width:  isActive ? 20 : isHovered ? 10 : 6,
                    height: isActive ? 6  : 6,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                />
              </div>
            )
          })}
        </motion.div>
      )}
    </AnimatePresence>
  )
}