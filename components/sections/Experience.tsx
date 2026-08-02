"use client"

import { useState, type ReactNode } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Award, Briefcase, Building2, Calendar, GraduationCap, MapPin } from "lucide-react"
import { useLanguage } from "@/components/LanguageProvider"
import { certificatesData, educationData, experiencesData, organizationsData, type TimelineItem } from "@/data/experience"

type TabCategory = "Experience" | "Education" | "Organizations" | "Certificates"

const EASE = [0.16, 1, 0.3, 1] as const

export default function Experience() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState<TabCategory>("Experience")
  const tabs: { id: TabCategory; label: string; icon: ReactNode }[] = [
    { id: "Experience", label: "Experience", icon: <Briefcase className="h-4 w-4" /> },
    { id: "Education", label: "Education", icon: <GraduationCap className="h-4 w-4" /> },
    { id: "Organizations", label: "Organization", icon: <Building2 className="h-4 w-4" /> },
    { id: "Certificates", label: "Certificates", icon: <Award className="h-4 w-4" /> },
  ]

  const TimelineLayout = ({ data }: { data: TimelineItem[] }) => (
    <div className="relative mt-10 min-w-0 pl-7 sm:mt-12 sm:pl-8 md:mt-14 md:pl-12">
      {/* Garis sumbu waktu */}
      <div className="absolute bottom-4 left-[5px] top-4 w-px bg-border/15 md:left-[7px]" aria-hidden="true" />
      {data.map((item, index) => (
        <motion.article
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: index * 0.07 }}
          className="group relative mb-10 min-w-0 sm:mb-12"
        >
          {/* Node */}
          <span
            className="absolute -left-7 top-2 h-3 w-3 rounded-full border-2 border-background bg-muted-foreground/50 transition-colors duration-300 group-hover:bg-primary sm:-left-8 md:-left-12"
            aria-hidden="true"
          />

          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-10">
            <div className="min-w-0">
              <h3 className="break-words font-display text-xl font-extrabold uppercase leading-tight tracking-tight transition-colors duration-300 group-hover:text-primary sm:text-2xl md:text-3xl">
                {item.title}
              </h3>
              <p className="mt-1.5 break-words text-sm font-medium leading-6 text-foreground/80 sm:text-base">{item.company}</p>
            </div>
            <div className="shrink-0 font-mono text-[11px] uppercase leading-6 tracking-[0.12em] text-muted-foreground md:text-right">
              <p className={item.isBangkit ? "text-primary" : "text-foreground/70"}>{item.type}</p>
              <p className="mt-1.5 flex min-w-0 items-start gap-2 md:justify-end">
                <Calendar className="mt-1 h-3.5 w-3.5 shrink-0" /><span className="break-words">{item.period}</span>
              </p>
            </div>
          </div>

          <p className="mt-3 flex min-w-0 items-start gap-2 font-mono text-[10px] uppercase leading-5 tracking-[0.1em] text-muted-foreground sm:text-[11px] sm:tracking-[0.12em]">
            <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" /><span className="break-words">{item.location}</span>
          </p>
          <p className="mt-4 max-w-[72ch] text-sm font-light leading-8 text-muted-foreground md:text-base">{item.description}</p>

          {item.achievements && item.achievements.length > 0 && (
            <ul className="mt-6 max-w-[76ch] border-t border-border/10">
              {item.achievements.map((achievement) => (
                <li key={achievement} className="border-b border-border/10 py-3 text-sm font-light leading-7 text-foreground/80">
                  {achievement}
                </li>
              ))}
            </ul>
          )}

          <p className="mt-5 break-words font-mono text-[10px] uppercase leading-6 tracking-[0.08em] text-muted-foreground sm:tracking-[0.1em]">
            {item.skills.join(" / ")}
          </p>
        </motion.article>
      ))}
    </div>
  )

  return (
    <section id="experience" className="relative bg-background py-20 sm:py-24 md:py-36">
      <div className="container-custom relative z-10">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-10 flex min-w-0 flex-col items-start gap-6 sm:mb-12 lg:flex-row lg:items-end lg:justify-between lg:gap-8"
        >
          <div className="w-full min-w-0 lg:w-auto">
            <p className="section-label mb-5">04 / {t.experience.badge}</p>
            <h2 className="break-normal font-display text-[clamp(1.65rem,8vw,3.75rem)] font-extrabold uppercase leading-[1.02] tracking-tight md:text-5xl lg:text-6xl">
              {t.experience.title}
            </h2>
          </div>
        </motion.div>

        {/* ── Tabs — teks besar dengan underline ── */}
        <div className="grid min-w-0 grid-cols-2 gap-x-3 border-b border-border/10 sm:gap-x-6 md:flex md:flex-wrap md:gap-x-8 md:gap-y-3" role="tablist" aria-label="Experience categories">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex min-h-11 min-w-0 items-center justify-start gap-2 py-3 text-left font-display text-[13px] font-bold uppercase leading-tight tracking-tight transition-colors duration-300 sm:text-sm md:pb-4 md:pt-0 md:text-xl ${
                  isActive ? "text-foreground" : "text-foreground/35 hover:text-foreground/70"
                }`}
              >
                {tab.icon}
                {tab.label}
                {isActive && (
                  <motion.span
                    layoutId="experience-tab-line"
                    className="absolute inset-x-0 bottom-0 h-0.5 bg-primary"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
              </button>
            )
          })}
        </div>

        <div className="mx-auto min-h-[30rem] min-w-0 max-w-5xl sm:min-h-[36rem]">
          <AnimatePresence mode="wait">
            {activeTab === "Experience" && <motion.div key="exp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><TimelineLayout data={experiencesData} /></motion.div>}
            {activeTab === "Education" && <motion.div key="edu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><TimelineLayout data={educationData} /></motion.div>}
            {activeTab === "Organizations" && <motion.div key="org" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><TimelineLayout data={organizationsData} /></motion.div>}
            {activeTab === "Certificates" && (
              <motion.div key="cert" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-10 grid min-w-0 gap-x-10 gap-y-8 sm:mt-14 sm:grid-cols-2 sm:gap-y-10">
                {certificatesData.map((cert, index) => (
                  <motion.article
                    key={cert.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.06, duration: 0.5, ease: EASE }}
                    className="group min-w-0 border-t border-border/10 pt-6"
                  >
                    <div className="flex items-start justify-between gap-5">
                      <span className="text-muted-foreground transition-colors duration-300 group-hover:text-primary">{cert.icon}</span>
                      <span className="font-mono text-[11px] tracking-[0.12em] text-muted-foreground">{cert.year}</span>
                    </div>
                    <h3 className="mt-5 break-words font-display text-xl font-bold uppercase leading-snug tracking-tight transition-colors duration-300 group-hover:text-primary">
                      {cert.name}
                    </h3>
                    <p className="mt-3 flex min-w-0 items-start gap-2 font-mono text-[10px] uppercase leading-5 tracking-[0.1em] text-muted-foreground sm:text-[11px] sm:tracking-[0.12em]">
                      <Award className="mt-0.5 h-3.5 w-3.5 shrink-0" /><span className="break-words">{cert.issuer}</span>
                    </p>
                  </motion.article>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
