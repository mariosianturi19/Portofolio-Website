"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Github, Linkedin, Globe, X, ArrowUpRight, Moon, Sun, Monitor, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, useScroll, useMotionValueEvent, AnimatePresence, useSpring, useTransform } from "framer-motion"
import { useLanguage } from "@/components/LanguageProvider"
import { useTheme } from "next-themes"

// ── Icon untuk setiap section (ditampilkan di nav tooltip & mobile) ────────────
const SECTION_META: Record<string, { emoji: string; desc: string }> = {
  home:       { emoji: "🏠", desc: "Back to top"            },
  about:      { emoji: "👤", desc: "Who I am"               },
  projects:   { emoji: "🚀", desc: "What I've built"        },
  skills:     { emoji: "⚡", desc: "My tech stack"           },
  experience: { emoji: "💼", desc: "Work & Education"        },
  contact:    { emoji: "✉️", desc: "Get in touch"            },
}

// ─────────────────────────────────────────────────────────────────────────────
export default function Navbar() {
  const [isOpen,         setIsOpen]         = useState(false)
  const [isScrolled,     setIsScrolled]     = useState(false)
  const [activeSection,  setActiveSection]  = useState("home")
  const [hoveredLink,    setHoveredLink]    = useState<string | null>(null)
  const [mounted,        setMounted]        = useState(false)

  const { language, setLanguage, t } = useLanguage()
  const { theme, setTheme }          = useTheme()
  const { scrollY, scrollYProgress } = useScroll()

  // Scroll progress spring untuk bar tipis di atas
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 })

  // Suppress hydration mismatch untuk theme
  useEffect(() => { setMounted(true) }, [])

  // Floating pill trigger
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 60)
  })

  const navLinks = [
    { name: t.nav.home,       href: "#home"       },
    { name: t.nav.about,      href: "#about"      },
    { name: t.nav.projects,   href: "#projects"   },
    { name: t.nav.skills,     href: "#skills"     },
    { name: t.nav.experience, href: "#experience" },
    { name: t.nav.contact,    href: "#contact"    },
  ]

  // IntersectionObserver untuk active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    )
    navLinks.forEach(({ href }) => {
      const el = document.getElementById(href.substring(1))
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language])

  // Keyboard shortcut: Cmd/Ctrl + K → scroll to top (Easter egg)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  // Theme toggle cycle: light → dark → system
  const cycleTheme = () => {
    if (theme === "light")  setTheme("dark")
    else if (theme === "dark") setTheme("system")
    else setTheme("light")
  }

  const ThemeIcon = !mounted ? Monitor :
    theme === "dark" ? Moon : theme === "light" ? Sun : Monitor

  const activeMeta = SECTION_META[activeSection]

  return (
    <>
      {/* ── Scroll progress bar — paling tipis, paling atas ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-violet-500 to-cyan-400 origin-left z-[60]"
        style={{ scaleX }}
      />

      {/* ── Main header ── */}
      <motion.header
        className={cn(
          "fixed top-0 left-0 w-full z-50 flex justify-center transition-all duration-500",
          isScrolled ? "pt-5 px-4" : "pt-5 px-6 md:px-12"
        )}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className={cn(
            "flex justify-between items-center transition-all duration-500 w-full",
            isScrolled
              ? "max-w-5xl bg-background/75 backdrop-blur-xl border border-border/50 shadow-2xl shadow-black/5 rounded-2xl py-2.5 px-4"
              : "max-w-7xl bg-transparent py-2"
          )}
        >
          {/* ── Logo + active section tag ── */}
          <div className="flex items-center gap-3 min-w-0">
            <motion.a
              href="#home"
              className="font-black text-xl tracking-tight flex items-center gap-1.5 flex-shrink-0"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Animated logo mark */}
              <div className="relative w-7 h-7 flex items-center justify-center rounded-lg bg-primary/10 overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/40 to-violet-500/30"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  style={{ borderRadius: "30%" }}
                />
                <span className="relative z-10 text-primary font-black text-sm leading-none">M</span>
              </div>
              <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Sianturi
              </span>
            </motion.a>
          </div>

          {/* ── Desktop nav ── */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const id       = link.href.substring(1)
              const isActive = activeSection === id
              const meta     = SECTION_META[id]

              return (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => setHoveredLink(id)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <a
                    href={link.href}
                    className={cn(
                      "relative flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium rounded-xl transition-colors duration-200",
                      isActive
                        ? "text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="navActivePill"
                        className="absolute inset-0 bg-primary rounded-xl -z-10 shadow-lg shadow-primary/25"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    {!isActive && hoveredLink === id && (
                      <motion.div
                        layoutId="navHoverBg"
                        className="absolute inset-0 bg-muted/70 rounded-xl -z-10"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{link.name}</span>
                  </a>

                  {/* Floating tooltip with description */}
                  <AnimatePresence>
                    {hoveredLink === id && !isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.92 }}
                        animate={{ opacity: 1, y: 0, scale: 1    }}
                        exit={  { opacity: 0, y: 6, scale: 0.92 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 rounded-lg
                          bg-background border border-border/60 shadow-xl text-xs font-medium
                          text-muted-foreground whitespace-nowrap z-50 pointer-events-none"
                      >
                        <div className="flex items-center gap-1.5">
                          <span>{meta?.emoji}</span>
                          <span>{meta?.desc}</span>
                        </div>
                        {/* Arrow */}
                        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-background border-l border-t border-border/60" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </nav>

          {/* ── Desktop actions ── */}
          <div className="hidden md:flex items-center gap-1.5">

            {/* Social icons */}
            <div className="flex items-center gap-0.5 mr-1">
              {[
                { href: "https://github.com/mariosianturi19",                          icon: Github,   label: "GitHub"   },
                { href: "https://www.linkedin.com/in/togar-anthony-mario-sianturi/",   icon: Linkedin, label: "LinkedIn" },
              ].map(({ href, icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.92 }}
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>

            {/* Divider */}
            <div className="h-5 w-px bg-border/60 mx-1" />

            {/* Theme toggle — cycle dengan icon yang berubah */}
            <motion.button
              onClick={cycleTheme}
              className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={mounted ? theme : "monitor"}
                  initial={{ rotate: -30, opacity: 0, scale: 0.7 }}
                  animate={{ rotate: 0,   opacity: 1, scale: 1   }}
                  exit={  { rotate:  30, opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.2 }}
                >
                  <ThemeIcon className="h-4 w-4" />
                </motion.div>
              </AnimatePresence>
            </motion.button>

            {/* Language toggle — flip animation */}
            <motion.button
              onClick={() => setLanguage(language === "en" ? "id" : "en")}
              className="relative flex items-center gap-1.5 px-3 py-2 rounded-xl
                text-muted-foreground hover:text-foreground hover:bg-muted/70
                transition-colors text-xs font-bold tracking-wider overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle language"
            >
              <Globe className="h-3.5 w-3.5" />
              <AnimatePresence mode="wait">
                <motion.span
                  key={language}
                  initial={{ y: 8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={  { y:-8, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="block"
                >
                  {language === "en" ? "EN" : "ID"}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            {/* Divider */}
            <div className="h-5 w-px bg-border/60 mx-1" />

            {/* Contact CTA */}
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                asChild
                size="sm"
                className="relative rounded-xl px-5 py-2 h-9 text-sm font-semibold
                  bg-foreground text-background hover:bg-foreground/90
                  shadow-lg shadow-foreground/10 hover:shadow-foreground/20
                  transition-all duration-300 overflow-hidden group"
              >
                <a href="#contact" className="flex items-center gap-1.5">
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
                  <span className="relative z-10">Contact</span>
                  <ArrowUpRight className="h-3.5 w-3.5 relative z-10 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Button>
            </motion.div>
          </div>

          {/* ── Mobile hamburger ── */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <motion.button
                className="md:hidden relative w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-xl hover:bg-muted/70 transition-colors"
                whileTap={{ scale: 0.93 }}
                aria-label="Toggle menu"
              >
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0,   opacity: 1 }}
                      exit={  { rotate:  90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-5 w-5 text-foreground" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="open"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0,  opacity: 1 }}
                      exit={  { rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col gap-1.5 items-center"
                    >
                      <span className="w-5 h-0.5 bg-foreground rounded-full" />
                      <span className="w-4 h-0.5 bg-foreground/60 rounded-full self-end" />
                      <span className="w-5 h-0.5 bg-foreground rounded-full" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </SheetTrigger>

            {/* ── Mobile sheet ── */}
            <SheetContent
              side="right"
              className="w-[300px] sm:w-[360px] border-l border-border/50 bg-background/95 backdrop-blur-2xl p-0"
            >
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

              <div className="flex flex-col h-full">

                {/* Sheet header */}
                <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-border/40">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-black text-sm">M</span>
                    </div>
                    <span className="font-bold text-foreground">Mario Sianturi</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={cycleTheme}
                      className="p-2 rounded-xl hover:bg-muted/70 text-muted-foreground transition-colors"
                    >
                      <ThemeIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setLanguage(language === "en" ? "id" : "en")}
                      className="px-2.5 py-1.5 rounded-xl hover:bg-muted/70 text-xs font-bold text-muted-foreground transition-colors"
                    >
                      {language === "en" ? "EN" : "ID"}
                    </button>
                  </div>
                </div>

                {/* Nav links */}
                <nav className="flex flex-col gap-1 px-4 py-4 flex-1">
                  {navLinks.map((link, i) => {
                    const id       = link.href.substring(1)
                    const isActive = activeSection === id
                    const meta     = SECTION_META[id]

                    return (
                      <motion.a
                        key={link.name}
                        href={link.href}
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 * i, type: "spring", stiffness: 200, damping: 20 }}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200",
                          isActive
                            ? "bg-primary/10 border border-primary/20 text-primary"
                            : "hover:bg-muted/60 text-foreground/70 hover:text-foreground"
                        )}
                      >
                        <span className="text-xl">{meta?.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm">{link.name}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">{meta?.desc}</div>
                        </div>
                        {isActive && (
                          <motion.div
                            layoutId="mobileActiveIndicator"
                            className="w-1.5 h-1.5 rounded-full bg-primary"
                          />
                        )}
                      </motion.a>
                    )
                  })}
                </nav>

                {/* Sheet footer */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.4 }}
                  className="px-4 pb-6 pt-4 border-t border-border/40 space-y-4"
                >
                  {/* Social links */}
                  <div className="flex items-center gap-2">
                    {[
                      { href: "https://github.com/mariosianturi19",                        icon: Github,   label: "GitHub"   },
                      { href: "https://www.linkedin.com/in/togar-anthony-mario-sianturi/", icon: Linkedin, label: "LinkedIn" },
                    ].map(({ href, icon: Icon, label }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-muted/40 hover:bg-muted/70 border border-border/50 text-sm font-medium text-muted-foreground hover:text-foreground transition-all"
                      >
                        <Icon className="h-4 w-4" />
                        {label}
                      </a>
                    ))}
                  </div>

                  {/* Contact CTA */}
                  <Button
                    asChild
                    className="w-full h-12 rounded-2xl text-base font-semibold shadow-lg shadow-primary/20"
                  >
                    <a href="#contact" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2">
                      Contact Me
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </Button>
                </motion.div>

              </div>
            </SheetContent>
          </Sheet>

        </div>
      </motion.header>
    </>
  )
}