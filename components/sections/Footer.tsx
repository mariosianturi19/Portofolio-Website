"use client"

import { useState, useEffect } from "react"
import { Github, Linkedin, Mail, ArrowUp, Eye, MapPin } from "lucide-react"
import { motion } from "framer-motion"

export default function Footer() {
  const [visitorCount, setVisitorCount] = useState(0)

  useEffect(() => {
    // Visitor count logic
    const storedCount = localStorage.getItem('portfolioVisitorCount')
    const count = storedCount ? parseInt(storedCount) : 0
    const newCount = count + 1
    localStorage.setItem('portfolioVisitorCount', newCount.toString())
    setVisitorCount(newCount)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-background overflow-hidden pt-20 border-t border-border/40">
      
      {/* Premium Gradient Background Blur */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[300px] bg-primary/20 blur-[150px] rounded-t-[100%] pointer-events-none -z-10" />

      <div className="container mx-auto px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
        
        {/* Top Section: CTA & Links */}
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 md:mb-20">
          
          {/* Left: Bio & Status */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <a href="#home" className="flex items-center gap-2 font-bold text-2xl tracking-tight mb-4 group">
                <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
                  Mario
                </span>
                <span className="text-foreground">Sianturi</span>
              </a>
              <p className="text-muted-foreground/90 text-lg max-w-sm mb-8 leading-relaxed">
                Building beautiful, responsive, and highly interactive digital experiences from Indonesia to the world.
              </p>

              {/* Status Indicator */}
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-border/50 bg-muted/30 backdrop-blur-sm">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-sm font-medium text-foreground/80">Available for new opportunities</span>
              </div>
            </motion.div>
          </div>

          {/* Middle: Quick Links */}
          <div className="lg:col-span-4 flex flex-col md:items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="font-bold text-foreground mb-6 text-lg">Quick Links</h4>
              <ul className="space-y-4 text-muted-foreground/80 font-medium">
                {['Home', 'About', 'Projects', 'Skills', 'Experience'].map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase()}`} className="hover:text-primary hover:translate-x-1 inline-block transition-all duration-300">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Right: Socials & Action */}
          <div className="lg:col-span-3 flex flex-col md:items-end">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col md:items-end w-full"
            >
              <h4 className="font-bold text-foreground mb-6 text-lg">Socials</h4>
              <div className="flex gap-3 mb-10">
                {[
                  { icon: Github, href: "https://github.com/mariosianturi19", label: "GitHub" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/togar-anthony-mario-sianturi/", label: "LinkedIn" },
                  { icon: Mail, href: "mailto:19mariosianturi@gmail.com", label: "Email" }
                ].map((social, i) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="p-3 rounded-2xl bg-muted/50 border border-border/50 text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 hover:-translate-y-1 shadow-sm"
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>

              {/* Big Back to Top Button */}
              <button
                onClick={scrollToTop}
                className="group relative flex items-center justify-center w-16 h-16 rounded-full bg-foreground text-background hover:bg-primary hover:text-primary-foreground transition-all duration-500 shadow-xl overflow-hidden"
                aria-label="Scroll to top"
              >
                {/* Shimmer effect inside button */}
                <div className="absolute inset-0 -translate-y-full bg-gradient-to-b from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite] rotate-45" />
                <ArrowUp className="h-6 w-6 transition-transform duration-500 group-hover:-translate-y-12" />
                <ArrowUp className="h-6 w-6 absolute top-full transition-transform duration-500 group-hover:-translate-y-full" />
              </button>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar: Clean Stats & Copyright */}
        <div className="border-t border-border/50 py-8 flex flex-col md:flex-row items-center justify-between gap-6 text-sm font-medium text-muted-foreground">
          
          <div className="flex items-center gap-6">
            <p className="flex items-center gap-1.5 hover:text-foreground transition-colors cursor-default">
              © {currentYear} Mario Sianturi
            </p>
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted/50 border border-border/50">
              <Eye className="h-4 w-4 text-primary" />
              <span>{visitorCount.toLocaleString()} Visits</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-muted/50 border border-border/50">
              <MapPin className="h-4 w-4 text-primary" />
              <span>Semarang, Indonesia</span>
            </div>
          </div>
          
        </div>
      </div>
    </footer>
  )
}