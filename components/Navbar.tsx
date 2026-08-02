"use client"

import { useEffect, useState } from "react"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion"
import { useLanguage } from "@/components/LanguageProvider"
import { cn } from "@/lib/utils"

const NAV_SECTION_IDS = ["home", "about", "projects", "skills", "experience", "contact"]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const { t } = useLanguage()
  const { scrollY, scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 })

  useMotionValueEvent(scrollY, "change", (latest) => setIsScrolled(latest > 80))

  const navLinks = [
    { name: t.nav.home, href: "#home" },
    { name: t.nav.about, href: "#about" },
    { name: t.nav.projects, href: "#projects" },
    { name: t.nav.skills, href: "#skills" },
    { name: t.nav.experience, href: "#experience" },
    { name: t.nav.contact, href: "#contact" },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActiveSection(entry.target.id)),
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    )
    NAV_SECTION_IDS.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })
    return () => observer.disconnect()
  }, [])

  // Lock scroll saat overlay mobile terbuka
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  return (
    <>
      {/* Scroll progress — garis lime tipis */}
      <motion.div
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-primary"
        style={{ scaleX }}
      />

      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          isScrolled && "border-b border-border/10 bg-background/80 backdrop-blur-xl",
        )}
      >
        <div className="container-custom flex items-center justify-between py-5">
          <a href="#home" className="font-display text-base font-extrabold tracking-tight sm:text-lg">
            MARIO<span className="text-primary">.</span>SIANTURI
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
            {navLinks.map((link, i) => {
              const isActive = activeSection === link.href.slice(1)
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "relative px-3.5 py-2 font-mono text-xs uppercase tracking-[0.12em] transition-colors duration-300",
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <span className="mr-1.5 text-[10px] text-primary">{String(i + 1).padStart(2, "0")} /</span>
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="navUnderline"
                      className="absolute inset-x-3 -bottom-0.5 h-px bg-primary"
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                </a>
              )
            })}
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Open to work
            </span>
            <a
              href="#contact"
              className="group flex items-center gap-1.5 rounded-full border border-border/25 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.12em] transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground"
            >
              Contact
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="flex h-11 w-11 items-center justify-center lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </motion.header>

      {/* ── Mobile full-screen overlay ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] flex flex-col bg-background lg:hidden"
          >
            <div className="container-custom flex items-center justify-between py-5">
              <span className="font-display text-base font-extrabold tracking-tight">
                MARIO<span className="text-primary">.</span>SIANTURI
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-11 w-11 items-center justify-center"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="container-custom flex flex-1 flex-col justify-center gap-2" aria-label="Mobile navigation">
              {navLinks.map((link, index) => {
                const active = activeSection === link.href.slice(1)
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 * index, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "group flex items-baseline gap-4 border-b border-border/10 py-4",
                      active ? "text-primary" : "text-foreground",
                    )}
                  >
                    <span className="font-mono text-xs text-primary">{String(index + 1).padStart(2, "0")}</span>
                    <span className="font-display text-3xl font-extrabold uppercase tracking-tight transition-transform duration-300 group-hover:translate-x-2">
                      {link.name}
                    </span>
                  </motion.a>
                )
              })}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="container-custom flex items-center justify-between py-6 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground"
            >
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Open to work
              </span>
              <span>Jakarta, ID</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
