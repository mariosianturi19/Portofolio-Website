"use client"

import { useEffect, useState } from "react"
import { ArrowRight, ChevronDown, Download } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Magnetic from "@/components/Magnetic"
import { useLanguage } from "@/components/LanguageProvider"

const MARQUEE_ITEMS = ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS", "Kotlin", "Firebase"]

export default function Hero() {
  const { t } = useLanguage()
  const [typedText, setTypedText] = useState("")

  useEffect(() => {
    const fullText = t.hero.role
    let index = 0
    setTypedText("")
    const intervalId = window.setInterval(() => {
      index += 1
      setTypedText(fullText.slice(0, index))
      if (index >= fullText.length) window.clearInterval(intervalId)
    }, 50)
    return () => window.clearInterval(intervalId)
  }, [t.hero.role])

  const lineVariants = {
    hidden: { y: "110%" },
    visible: (i: number) => ({
      y: 0,
      transition: { delay: 0.3 + i * 0.14, duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    }),
  }

  return (
    <section id="home" className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-background pb-24 pt-28">
      <div className="container-custom relative z-10">
        {/* Kicker */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
          className="section-label mb-8"
        >
          {t.hero.badge}
        </motion.p>

        {/* Headline — mask reveal per baris */}
        <h1 className="font-display text-[2.75rem] font-extrabold uppercase leading-[1.02] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
          <span className="block overflow-hidden">
            <motion.span custom={0} variants={lineVariants} initial="hidden" animate="visible" className="block">
              Frontend &amp;
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span custom={1} variants={lineVariants} initial="hidden" animate="visible" className="text-outline block">
              Full-Stack
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span custom={2} variants={lineVariants} initial="hidden" animate="visible" className="block">
              Developer
            </motion.span>
          </span>
        </h1>

        {/* Bottom row: spec sheet + deskripsi + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7, ease: "easeOut" }}
          className="mt-14 flex flex-wrap items-end justify-between gap-10"
        >
          {/* Spec sheet — pinjaman arah 2 */}
          <div className="spec-sheet">
            <div><span className="spec-key">Role</span><span className="spec-value">Frontend / Full-Stack</span></div>
            <div><span className="spec-key">Stack</span><span className="spec-value">React · Next.js · TS · Node</span></div>
            <div><span className="spec-key">Base</span><span className="spec-value">Jakarta, ID</span></div>
            <div>
              <span className="spec-key">Status</span>
              <span className="spec-value inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Open to roles
              </span>
            </div>
          </div>

          <p className="max-w-md text-base font-light leading-relaxed text-muted-foreground">
            {t.hero.description}
          </p>

          <div className="flex items-center gap-5">
            <Magnetic>
              <Button size="lg" className="group text-base" asChild>
                <a href="#projects" className="flex items-center">
                  {t.hero.viewProjects}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </Magnetic>
            <a
              href="/Togar-Anthony-Mario-Sianturi-CV.pdf"
              download
              className="group flex items-center gap-2 border-b border-border/30 pb-1 font-mono text-xs uppercase tracking-[0.12em] transition-colors hover:border-primary hover:text-primary"
            >
              <Download className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
              {t.hero.downloadCV}
            </a>
          </div>
        </motion.div>

        {/* Typed role — aksesibel (sr-only heading tetap ada) */}
        <h2 className="sr-only">{t.hero.role}</h2>
        <div aria-hidden="true" className="mt-10 h-6 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
          {typedText}
          <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} className="ml-1 text-primary">_</motion.span>
        </div>
      </div>

      {/* Marquee strip */}
      <div className="absolute inset-x-0 bottom-0 border-y border-border/10 py-4">
        <div className="flex w-max animate-marquee gap-12">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="flex items-center gap-12 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {item}
              <span className="text-primary">/</span>
            </span>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <motion.a
        href="#about"
        aria-label="Continue to profile"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-20 right-6 hidden flex-col items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-primary md:flex lg:right-12"
      >
        <span className="[writing-mode:vertical-lr]">Scroll</span>
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </motion.a>
    </section>
  )
}
