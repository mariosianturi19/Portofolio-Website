"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Github, Linkedin, Menu, Globe } from "lucide-react"
import { cn } from "@/lib/utils"
import ThemeToggle from "@/components/ThemeToggle"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { useLanguage } from "@/components/LanguageProvider"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  
  const { language, setLanguage, t } = useLanguage()
  const { scrollY } = useScroll()

  // Elegant floating effect trigger
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50)
  })

  const navLinks = [
    { name: t.nav.home, href: "#home" },
    { name: t.nav.about, href: "#about" },
    { name: t.nav.projects, href: "#projects" },
    { name: t.nav.skills, href: "#skills" },
    { name: t.nav.experience, href: "#experience" },
    { name: t.nav.contact, href: "#contact" },
  ]

  // Performance Fix: Using IntersectionObserver instead of getBoundingClientRect on scroll
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px", // Trigger when section is in the middle of viewport
      threshold: 0,
    }

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // Observe all sections
    navLinks.forEach((link) => {
      const element = document.getElementById(link.href.substring(1))
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]) // Re-run if language changes because navLinks change

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 w-full z-50 flex justify-center transition-all duration-500",
        isScrolled ? "pt-4 px-4" : "pt-6 px-6 md:px-12"
      )}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // Premium ease curve
    >
      <div 
        className={cn(
          "flex justify-between items-center transition-all duration-500 w-full",
          isScrolled 
            ? "max-w-5xl bg-background/70 backdrop-blur-lg border border-border/50 shadow-xl rounded-full py-3 px-6" 
            : "max-w-7xl bg-transparent py-2"
        )}
      >
        {/* Logo */}
        <motion.a 
          href="#home" 
          className="font-bold text-xl tracking-tight flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            M<span className="hidden sm:inline">ario</span>
          </span>
          <span className="text-foreground">Sianturi</span>
        </motion.a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1)
            return (
              <a
                key={link.name}
                href={link.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors rounded-full hover:text-foreground",
                  isActive ? "text-primary-foreground" : "text-muted-foreground"
                )}
              >
                {/* Elegant active pill background */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-primary rounded-full -z-10 shadow-md"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            )
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-3">
          <div className="flex items-center space-x-1 border-r border-border/50 pr-3 mr-1">
            <motion.a
              href="https://github.com/mariosianturi19"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-all"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/togar-anthony-mario-sianturi/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-all"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Linkedin className="h-4 w-4" />
              <span className="sr-only">LinkedIn</span>
            </motion.a>
          </div>

          <ThemeToggle />
          
          <motion.button
            onClick={() => setLanguage(language === "en" ? "id" : "en")}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full hover:bg-muted border border-transparent hover:border-border transition-all text-muted-foreground hover:text-foreground text-sm font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle language"
          >
            <Globe className="h-4 w-4" />
            <span>{language === "en" ? "EN" : "ID"}</span>
          </motion.button>

          <Button asChild className="rounded-full px-6 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">
            <a href="#contact">Contact</a>
          </Button>
        </div>

        {/* Mobile Menu Trigger */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden rounded-full">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          
          <SheetContent side="right" className="w-[300px] sm:w-[400px] border-l-border/50 bg-background/95 backdrop-blur-xl">
            {/* Added Title for Screen Readers (Accessibility Requirement) */}
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            
            <div className="flex flex-col h-full pt-12 pb-6">
              <div className="flex flex-col space-y-2 mb-auto">
                {navLinks.map((link, i) => (
                  <motion.a
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i, duration: 0.4 }}
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "text-2xl font-semibold px-4 py-3 rounded-2xl transition-all",
                      activeSection === link.href.substring(1) 
                        ? "bg-primary/10 text-primary pl-6" 
                        : "hover:bg-muted hover:pl-6 text-foreground/80 hover:text-foreground"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>

              {/* Mobile Footer Actions */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="flex flex-col gap-6 pt-6 border-t border-border/50"
              >
                <div className="flex items-center justify-between px-4">
                  <div className="flex gap-4">
                    <a href="https://github.com/mariosianturi19" target="_blank" rel="noopener noreferrer" className="p-3 bg-muted rounded-full text-foreground/80 hover:text-foreground hover:bg-primary/20 transition-all">
                      <Github className="h-5 w-5" />
                    </a>
                    <a href="https://www.linkedin.com/in/togar-anthony-mario-sianturi/" target="_blank" rel="noopener noreferrer" className="p-3 bg-muted rounded-full text-foreground/80 hover:text-foreground hover:bg-primary/20 transition-all">
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </div>
                  <div className="flex gap-2">
                    <ThemeToggle />
                    <button
                      onClick={() => setLanguage(language === "en" ? "id" : "en")}
                      className="p-3 bg-muted rounded-full text-foreground/80 hover:text-foreground hover:bg-primary/20 transition-all"
                      aria-label="Toggle language"
                    >
                      <Globe className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <Button asChild className="w-full rounded-2xl py-6 text-lg shadow-lg shadow-primary/25">
                  <a href="#contact" onClick={() => setIsOpen(false)}>Contact Me</a>
                </Button>
              </motion.div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  )
}