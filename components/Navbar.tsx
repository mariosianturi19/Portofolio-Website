"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Github, Linkedin, Menu, Globe } from "lucide-react"
import { cn } from "@/lib/utils"
import ThemeToggle from "@/components/ThemeToggle"
import { motion } from "framer-motion"
import { useLanguage } from "@/components/LanguageProvider"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const { language, setLanguage, t } = useLanguage()

  const navLinks = [
    { name: t.nav.home, href: "#home" },
    { name: t.nav.about, href: "#about" },
    { name: t.nav.projects, href: "#projects" },
    { name: t.nav.skills, href: "#skills" },
    { name: t.nav.experience, href: "#experience" },
    { name: t.nav.contact, href: "#contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      // Update active section based on scroll position
      const sections = navLinks.map((link) => link.href.substring(1))
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })

      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        scrolled ? "glass py-4" : "bg-transparent py-6",
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 flex justify-between items-center">
        <motion.a href="#home" className="font-bold text-xl" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <span className="text-foreground">Mario Sianturi</span>
        </motion.a>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              className={cn(
                "text-muted-foreground hover:text-foreground transition-colors duration-200 relative",
                activeSection === link.href.substring(1) && "text-primary",
              )}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -2 }}
            >
              {link.name}
              {activeSection === link.href.substring(1) && (
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
                  layoutId="activeSection"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </motion.a>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <motion.a
            href="https://github.com/mariosianturi19"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/togar-anthony-mario-sianturi/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </motion.a>
          <ThemeToggle />
          <motion.button
            onClick={() => setLanguage(language === "en" ? "id" : "en")}
            className="flex items-center gap-1 p-2 rounded-lg hover:bg-primary/10 transition-colors text-muted-foreground hover:text-foreground"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle language"
            title={`Switch to ${language === "en" ? "Bahasa Indonesia" : "English"}`}
          >
            <Globe className="h-5 w-5" />
            <span className="text-xs font-medium">{language === "en" ? "EN" : "ID"}</span>
          </motion.button>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button asChild>
              <a href="#contact">Contact Me</a>
            </Button>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col h-full justify-center items-center space-y-8 p-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-2xl font-medium hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="flex space-x-6 mt-8">
                <a
                  href="https://github.com/mariosianturi19"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  <Github className="h-6 w-6" />
                </a>
                <a
                  href="https://www.linkedin.com/in/togar-anthony-mario-sianturi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
                <ThemeToggle />
                <button
                  onClick={() => setLanguage(language === "en" ? "id" : "en")}
                  className="flex items-center gap-1 p-2 rounded-lg hover:bg-primary/10 transition-colors text-muted-foreground hover:text-foreground"
                  aria-label="Toggle language"
                >
                  <Globe className="h-6 w-6" />
                </button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  )
}
