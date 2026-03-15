// file: components/sections/Experience.tsx
"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Tilt from "react-parallax-tilt"
import { Badge } from "@/components/ui/badge"
import { Briefcase, GraduationCap, Award, MapPin, Calendar, Sparkles, Building2 } from "lucide-react"
import { useLanguage } from "@/components/LanguageProvider"

// Import data dan type yang sudah dipisahkan
import { 
    experiencesData, 
    educationData, 
    organizationsData, 
    certificatesData,
    TimelineItem
} from "@/data/experience"

type TabCategory = "Experience" | "Education" | "Organizations" | "Certificates"

export default function Experience() {
    const { t } = useLanguage()
    const [activeTab, setActiveTab] = useState<TabCategory>("Experience")

    const tabs: { id: TabCategory; label: string; icon: React.ReactNode }[] = [
        { id: "Experience", label: "Experience", icon: <Briefcase className="w-4 h-4" /> },
        { id: "Education", label: "Education", icon: <GraduationCap className="w-4 h-4" /> },
        { id: "Organizations", label: "Organization", icon: <Building2 className="w-4 h-4" /> },
        { id: "Certificates", label: "Certificates", icon: <Award className="w-4 h-4" /> },
    ]

    // Template for Timeline (Experience, Education, Organization)
    // Sekarang menggunakan type TimelineItem[] bukan any[]
    const TimelineLayout = ({ data }: { data: TimelineItem[] }) => (
        <div className="relative border-l-2 border-border/50 ml-4 md:ml-6 mt-8">
            {data.map((item, index) => (
                <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 100 }}
                    className="mb-12 ml-8 md:ml-12 relative group"
                >
                    {/* Glowing Timeline Node */}
                    <div className="absolute -left-[42px] md:-left-[58px] top-1.5 w-5 h-5 rounded-full bg-background border-[3px] border-primary/40 group-hover:border-primary group-hover:scale-125 transition-all duration-300 z-10 flex items-center justify-center shadow-[0_0_10px_rgba(var(--primary),0.2)] group-hover:shadow-[0_0_20px_rgba(var(--primary),0.6)]">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    </div>

                    {/* Timeline Card */}
                    <div className={`relative p-6 md:p-8 rounded-3xl bg-background/40 backdrop-blur-xl border border-border/50 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden ${item.isBangkit ? 'hover:border-orange-500/50' : 'hover:border-primary/30'}`}>
                        {/* Subtle Background Glow on Hover */}
                        <div className={`absolute -top-24 -right-24 w-48 h-48 opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-500 ${item.isBangkit ? 'bg-orange-500' : 'bg-primary'}`} />

                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4 relative z-10">
                            <div>
                                <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                                    {item.title}
                                </h3>
                                <div className="text-lg font-semibold text-foreground/80 mt-1">
                                    {item.company}
                                </div>
                            </div>
                            <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
                                <Badge variant={item.isBangkit ? "default" : "secondary"} className={item.isBangkit ? "bg-gradient-to-r from-orange-500 to-red-500 text-white border-none" : ""}>
                                    {item.type}
                                </Badge>
                                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {item.period}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-6 relative z-10">
                            <MapPin className="w-4 h-4 text-primary/70" />
                            {item.location}
                        </div>

                        <p className="text-muted-foreground/90 leading-relaxed mb-6 relative z-10">
                            {item.description}
                        </p>

                        <div className="flex flex-wrap gap-2 relative z-10">
                            {item.skills.map((skill: string) => (
                                <Badge key={skill} variant="outline" className="bg-background/50 text-foreground/80 border-border/60 hover:border-primary/50 hover:bg-primary/5 transition-colors">
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    )

    return (
        <section id="experience" className="py-24 md:py-32 bg-muted/20 relative overflow-hidden">
            {/* Background Decorators */}
            <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" />
            <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

            <div className="container mx-auto px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
                
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-background/50 backdrop-blur-md text-sm font-medium mb-6">
                        <Sparkles className="h-4 w-4 text-primary" />
                        <span>{t.experience.badge}</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">
                        {t.experience.title}
                    </h2>
                    <div className="w-20 h-1.5 bg-gradient-to-r from-primary to-blue-500 mx-auto rounded-full"></div>
                </motion.div>

                {/* Elegant Interactive Tabs */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab.id
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`relative px-5 md:px-6 py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300 flex items-center gap-2 ${
                                    isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                }`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="expTabIndicator"
                                        className="absolute inset-0 bg-primary rounded-full -z-10 shadow-lg shadow-primary/20"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10 flex items-center gap-2">
                                    {tab.icon}
                                    {tab.label}
                                </span>
                            </button>
                        )
                    })}
                </div>

                {/* Tab Content with Fluid Transition */}
                <div className="max-w-4xl mx-auto min-h-[600px]">
                    <AnimatePresence mode="wait">
                        {activeTab === "Experience" && (
                            <motion.div key="exp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <TimelineLayout data={experiencesData} />
                            </motion.div>
                        )}
                        {activeTab === "Education" && (
                            <motion.div key="edu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <TimelineLayout data={educationData} />
                            </motion.div>
                        )}
                        {activeTab === "Organizations" && (
                            <motion.div key="org" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <TimelineLayout data={organizationsData} />
                            </motion.div>
                        )}
                        
                        {/* 3D Holographic Grid for Certificates */}
                        {activeTab === "Certificates" && (
                            <motion.div 
                                key="cert"
                                initial={{ opacity: 0, y: 20 }} 
                                animate={{ opacity: 1, y: 0 }} 
                                exit={{ opacity: 0, y: -20 }}
                                className="grid sm:grid-cols-2 gap-6 mt-8"
                            >
                                {certificatesData.map((cert, index) => (
                                    <motion.div
                                        key={cert.id}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <Tilt
                                            tiltMaxAngleX={10}
                                            tiltMaxAngleY={10}
                                            perspective={1000}
                                            scale={1.02}
                                            transitionSpeed={2000}
                                            glareEnable={true}
                                            glareMaxOpacity={0.15}
                                            glareColor="hsl(var(--primary))"
                                            glarePosition="all"
                                            className="h-full rounded-3xl"
                                        >
                                            <div className="h-full p-8 rounded-3xl bg-background/60 backdrop-blur-xl border border-border/50 shadow-xl hover:border-primary/50 transition-colors duration-500 group flex flex-col justify-between">
                                                <div className="flex justify-between items-start mb-6">
                                                    <div className="p-4 rounded-2xl bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                                                        {cert.icon}
                                                    </div>
                                                    <Badge variant="outline" className="bg-background font-mono shadow-sm">
                                                        {cert.year}
                                                    </Badge>
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-xl leading-tight mb-2 text-foreground group-hover:text-primary transition-colors">
                                                        {cert.name}
                                                    </h4>
                                                    <p className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                                                        <Award className="w-4 h-4" />
                                                        {cert.issuer}
                                                    </p>
                                                </div>
                                            </div>
                                        </Tilt>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </div>
        </section>
    )
}