"use client"

import { motion } from "framer-motion"
import { Download, Github, MoveRight } from "lucide-react"
import { useLanguage } from "@/components/LanguageProvider"

const SKILLS = [
  "JavaScript", "TypeScript", "React.js", "Next.js", "REST APIs", "MySQL",
  "HTML5", "CSS3", "Tailwind CSS", "Git", "Responsive Design", "PWA",
]

const FEATURES = [
  { code: "F-01", title: "Frontend Development", description: "Responsive, accessible interfaces with React, Next.js, and TypeScript." },
  { code: "F-02", title: "Full-Stack Web Applications", description: "Application workflows spanning APIs, data handling, authentication, and integrations." },
  { code: "F-03", title: "Application Engineering", description: "Translate operational requirements into maintainable application flows, validation, and user feedback." },
  { code: "F-04", title: "Industry Experience", description: "Front-End Developer internships at Telkomsel and Klik Digital Sinergi." },
]

export default function About() {
  const { t } = useLanguage()

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    }),
  }

  return (
    <section id="about" className="relative bg-background py-20 sm:py-24 md:py-36">
      <div className="container-custom">
        <div className="grid min-w-0 items-start gap-14 lg:grid-cols-12 lg:gap-14">
          {/* ── Kiri: sticky header + narasi ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:sticky lg:top-32 lg:col-span-6"
          >
            <p className="section-label mb-6">01 / {t.about.badge}</p>
            <h2 className="mb-8 break-words font-display text-[clamp(2.25rem,10vw,3.75rem)] font-extrabold uppercase leading-[1.02] tracking-tight sm:mb-10 md:text-5xl lg:text-6xl">
              {t.about.title}
            </h2>

            <div className="space-y-5 text-base font-light leading-7 text-muted-foreground sm:space-y-6 sm:leading-8 md:text-lg">
              <p>
                I&apos;m Togar Anthony Mario Sianturi, a <strong className="font-medium text-foreground">Computer Engineering graduate awaiting commencement</strong> and a Software Engineer focused on web applications. I build responsive interfaces and full-stack workflows using React, Next.js, TypeScript, REST APIs, and MySQL.
              </p>
              <p>
                During Front-End Developer internships at <strong className="font-medium text-foreground">Telkomsel</strong> and <strong className="font-medium text-foreground">PT. Klik Digital Sinergi</strong>, I worked on an outlet-recognition application and internal operational interfaces for correspondence, companies, employees, and employment contracts.
              </p>
              <p>
                My portfolio includes role-based campus safety, internal operations, automotive financing, and data-driven web applications. I enjoy turning real workflows into clear interfaces, reliable integrations, and practical user experiences.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 sm:mt-10">
              <a href="#projects" className="group inline-flex items-center border-b border-border/30 py-2.5 font-mono text-xs uppercase tracking-[0.12em] transition-colors hover:border-primary hover:text-primary">
                Check out my work <MoveRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
              </a>
              <a href="https://github.com/mariosianturi19" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center py-2.5 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground">
                <Github className="mr-2 h-4 w-4" />GitHub
              </a>
              <a href="/CV_Togar Anthony Mario Sianturi.pdf" download className="group inline-flex items-center py-2.5 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground">
                <Download className="mr-2 h-4 w-4 transition-transform group-hover:translate-y-0.5" />CV
              </a>
            </div>
          </motion.div>

          {/* ── Kanan: tech list editorial + feature rows ── */}
          <div className="lg:col-span-6">
            {/* Tech stack — list bernomor */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="mb-12 sm:mb-14"
            >
              <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Tech stack &amp; tools <span className="text-primary">({String(SKILLS.length).padStart(2, "0")})</span>
              </p>
              <ul className="border-t border-border/10">
                {SKILLS.map((skill, i) => (
                  <motion.li
                    key={skill}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04, duration: 0.4, ease: "easeOut" }}
                    className="group flex min-w-0 items-baseline gap-3 border-b border-border/10 py-3 transition-all duration-300 hover:pl-2 sm:gap-4 sm:hover:pl-3"
                  >
                    <span className="font-mono text-[10px] text-primary/60 transition-colors group-hover:text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 break-words font-display text-lg font-bold uppercase tracking-tight text-foreground/80 transition-colors group-hover:text-foreground md:text-xl">
                      {skill}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Feature rows */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">What I do</p>
              <div className="border-t border-border/10">
                {FEATURES.map((feature, i) => (
                  <motion.div
                    key={feature.code}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="group grid gap-2 border-b border-border/10 py-6 transition-colors duration-300 hover:bg-muted/30 sm:grid-cols-[70px_1fr] sm:gap-6 sm:px-4"
                  >
                    <span className="font-mono text-xs text-primary">{feature.code}</span>
                    <div>
                      <h3 className="font-display text-xl font-bold uppercase tracking-tight transition-colors group-hover:text-primary md:text-2xl">
                        {feature.title}
                      </h3>
                      <p className="mt-2 max-w-[52ch] text-sm font-light leading-7 text-muted-foreground">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
