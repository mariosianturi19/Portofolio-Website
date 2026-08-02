"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import {
  SiFigma,
  SiFirebase,
  SiFramer,
  SiGit,
  SiJavascript,
  SiKotlin,
  SiMysql,
  SiNextdotjs,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si"
import { useLanguage } from "@/components/LanguageProvider"
import { skillGroups, type SkillGroup } from "@/data/skills"

const groupCodes: Record<SkillGroup["id"], string> = {
  frontend: "SK-01",
  integration: "SK-02",
  quality: "SK-03",
}

const toolkitLogos = [
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "Framer Motion", icon: SiFramer },
  { name: "JavaScript", icon: SiJavascript },
  { name: "Kotlin", icon: SiKotlin },
  { name: "Firebase", icon: SiFirebase },
  { name: "Python", icon: SiPython },
  { name: "Figma", icon: SiFigma },
  { name: "Git", icon: SiGit },
  { name: "MySQL", icon: SiMysql },
]

const EASE = [0.16, 1, 0.3, 1] as const

export default function Skills() {
  const { t } = useLanguage()

  return (
    <section id="skills" className="relative bg-background py-28 md:py-36">
      <div className="container-custom relative z-10">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-20 flex flex-wrap items-end justify-between gap-8"
        >
          <div>
            <p className="section-label mb-5">03 / {t.skills.badge}</p>
            <h2 className="font-display text-4xl font-extrabold uppercase tracking-tight md:text-5xl lg:text-6xl">
              {t.skills.title}
            </h2>
          </div>
          <p className="max-w-sm text-sm font-light leading-7 text-muted-foreground">
            Each capability is connected to project evidence you can inspect in the case studies.
          </p>
        </motion.div>

        {/* ── Groups ── */}
        <div className="space-y-20">
          {skillGroups.map((group) => (
            <motion.section
              key={group.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: EASE }}
              aria-labelledby={`skill-group-${group.id}`}
            >
              {/* Group header */}
              <div className="mb-10 grid gap-4 border-t border-border/10 pt-8 md:grid-cols-[auto_1fr_auto] md:items-baseline md:gap-10">
                <span className="font-mono text-xs tracking-[0.15em] text-primary">{groupCodes[group.id]}</span>
                <h3 id={`skill-group-${group.id}`} className="font-display text-2xl font-extrabold uppercase tracking-tight md:text-4xl">
                  {group.title}
                </h3>
                <p className="max-w-md text-sm font-light leading-7 text-muted-foreground">{group.description}</p>
              </div>

              {/* Skills grid */}
              <div className="grid gap-x-10 gap-y-12 lg:grid-cols-3">
                {group.skills.map((skill, skillIndex) => (
                  <motion.article
                    key={skill.name}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: skillIndex * 0.08, duration: 0.5, ease: EASE }}
                    className="border-t border-border/10 pt-6"
                  >
                    <h4 className="font-display text-xl font-bold uppercase tracking-tight">
                      {skill.name}
                    </h4>
                    <p className="mt-3 text-sm font-light leading-7 text-muted-foreground">{skill.summary}</p>

                    {/* Evidence — text links dengan arrow */}
                    <div className="mt-6 space-y-4">
                      {skill.evidence.map((item) => (
                        <a
                          key={`${skill.name}-${item.project}`}
                          href="#projects"
                          className="group/evidence block"
                        >
                          <span className="flex items-center justify-between gap-3">
                            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-primary">
                              {item.project}
                            </span>
                            <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground transition-all duration-300 group-hover/evidence:translate-x-0.5 group-hover/evidence:-translate-y-0.5 group-hover/evidence:text-primary" />
                          </span>
                          <span className="mt-1 block border-b border-border/10 pb-3 text-xs font-light leading-6 text-foreground/70 transition-colors group-hover/evidence:text-foreground">
                            {item.detail}
                          </span>
                        </a>
                      ))}
                    </div>

                    <p className="mt-5 font-mono text-[10px] uppercase leading-6 tracking-[0.1em] text-muted-foreground">
                      {skill.tools.join(" / ")}
                    </p>
                  </motion.article>
                ))}
              </div>
            </motion.section>
          ))}
        </div>
      </div>

      {/* ── Working toolkit marquee ── */}
      <div className="mt-24 border-y border-border/10 py-8">
        <div className="container-custom mb-6 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          Working toolkit
        </div>
        <div className="sr-only">
          {toolkitLogos.map((item) => <span key={item.name}>{item.name} </span>)}
        </div>
        <div aria-hidden="true" className="space-y-6">
          <LogoMarqueeRow logos={toolkitLogos.slice(0, 6)} duration={26} />
          <LogoMarqueeRow logos={toolkitLogos.slice(6)} duration={32} reverse />
        </div>
      </div>
    </section>
  )
}

function LogoMarqueeRow({
  logos,
  duration,
  reverse = false,
}: {
  logos: typeof toolkitLogos
  duration: number
  reverse?: boolean
}) {
  const repeatedLogos = [...logos, ...logos, ...logos, ...logos]

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent md:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent md:w-40" />
      <motion.div
        className="flex w-max gap-14 px-7 md:gap-20"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {repeatedLogos.map((item, index) => {
          const Icon = item.icon
          return (
            <span
              key={`${item.name}-${index}`}
              className="flex h-12 w-12 cursor-default items-center justify-center text-muted-foreground/40 transition-all duration-500 hover:text-foreground md:h-14 md:w-14"
            >
              <Icon className="h-9 w-9 md:h-11 md:w-11" />
            </span>
          )
        })}
      </motion.div>
    </div>
  )
}
