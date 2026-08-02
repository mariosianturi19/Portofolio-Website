"use client"

import { useEffect, useState } from "react"
import { ArrowUp, Eye, Github, Linkedin, Mail, MapPin } from "lucide-react"
import { motion } from "framer-motion"

export default function Footer() {
  const [visitorCount, setVisitorCount] = useState(0)

  useEffect(() => {
    const storedCount = localStorage.getItem("portfolioVisitorCount")
    const count = storedCount ? Number.parseInt(storedCount, 10) : 0
    const newCount = count + 1
    localStorage.setItem("portfolioVisitorCount", newCount.toString())
    setVisitorCount(newCount)
  }, [])

  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden border-t border-border/10 bg-background">
      <div className="container-custom relative z-10 pt-20">
        <div className="mb-16 grid gap-12 md:mb-20 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="lg:col-span-5">
            <h2 className="mb-4 font-display text-2xl font-extrabold tracking-tight">
              <a href="#home">MARIO<span className="text-primary">.</span>SIANTURI</a>
            </h2>
            <p className="mb-8 max-w-sm text-base font-light leading-relaxed text-muted-foreground">Frontend and Full-Stack Developer building responsive web applications around real operational workflows.</p>
            <p className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Available for developer opportunities
            </p>
          </motion.div>

          <motion.nav aria-label="Footer navigation" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="lg:col-span-4 lg:justify-self-center">
            <h3 className="mb-6 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Quick links</h3>
            <ul className="space-y-3">
              {["Home", "About", "Projects", "Skills", "Experience"].map((item, i) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="group inline-flex items-baseline gap-3 text-sm transition-colors duration-300 hover:text-primary">
                    <span className="font-mono text-[10px] text-primary/60">{String(i + 1).padStart(2, "0")}</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="flex flex-col lg:col-span-3 lg:items-end">
            <h3 className="mb-6 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Socials</h3>
            <div className="mb-10 flex gap-3">
              {[
                { icon: Github, href: "https://github.com/mariosianturi19", label: "GitHub" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/togar-anthony-mario-sianturi/", label: "LinkedIn" },
                { icon: Mail, href: "mailto:19mariosianturi@gmail.com", label: "Email" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border/20 text-muted-foreground transition-all duration-300 hover:border-primary hover:text-primary"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground transition-colors duration-300 hover:text-primary"
              aria-label="Back to top"
            >
              Back to top
              <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Name wall */}
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
          className="select-none text-center font-display text-[13.5vw] font-extrabold uppercase leading-[0.85] tracking-tight text-foreground/[0.07]"
        >
          Sianturi
        </motion.div>
      </div>

      <div className="border-t border-border/10">
        <div className="container-custom flex flex-col items-center justify-between gap-4 py-7 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground md:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <p>© {currentYear} Mario Sianturi</p>
            <span className="inline-flex items-center gap-1.5"><Eye className="h-3.5 w-3.5 text-primary/70" />{visitorCount.toLocaleString()} visits</span>
          </div>
          <span className="inline-flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-primary/70" />Jakarta, Indonesia</span>
        </div>
      </div>
    </footer>
  )
}
