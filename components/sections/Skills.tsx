"use client"

import { motion } from "framer-motion"
import { Code, Layout, Database, PaintBucket, Smartphone, Braces, Sparkles } from "lucide-react"
import { useLanguage } from "@/components/LanguageProvider"
// Import logo brand resmi dari react-icons/si (SimpleIcons)
import { 
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, 
  SiFramer, SiFirebase, SiPython, SiFigma, 
  SiGit, SiMysql, SiKotlin, SiJavascript 
} from "react-icons/si"

const skillCategories = [
  {
    title: "Frontend",
    description: "Modern web interfaces",
    icon: <Layout className="h-5 w-5" />,
    color: "from-blue-500 to-cyan-400",
    shadow: "shadow-blue-500/20",
    skills: [
      { name: "React.js", level: 95 },
      { name: "Next.js", level: 90 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 95 },
    ],
  },
  {
    title: "Mobile",
    description: "Cross-platform apps",
    icon: <Smartphone className="h-5 w-5" />,
    color: "from-emerald-500 to-teal-400",
    shadow: "shadow-emerald-500/20",
    skills: [
      { name: "React Native", level: 85 },
      { name: "Kotlin", level: 80 },
      { name: "Java", level: 75 },
      { name: "Android SDK", level: 75 },
    ],
  },
  {
    title: "Languages",
    description: "Programming languages",
    icon: <Code className="h-5 w-5" />,
    color: "from-orange-500 to-yellow-400",
    shadow: "shadow-orange-500/20",
    skills: [
      { name: "JavaScript", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Python", level: 80 },
      { name: "PHP", level: 85 },
    ],
  },
  {
    title: "Tools",
    description: "Development tools",
    icon: <Braces className="h-5 w-5" />,
    color: "from-purple-500 to-pink-400",
    shadow: "shadow-purple-500/20",
    skills: [
      { name: "Git & GitHub", level: 95 },
      { name: "VS Code", level: 95 },
      { name: "Webpack", level: 70 },
      { name: "Docker", level: 65 },
    ],
  },
  {
    title: "Design",
    description: "UI/UX Design",
    icon: <PaintBucket className="h-5 w-5" />,
    color: "from-rose-500 to-red-400",
    shadow: "shadow-rose-500/20",
    skills: [
      { name: "Responsive Design", level: 95 },
      { name: "Material Design", level: 85 },
      { name: "Figma", level: 85 },
    ],
  },
  {
    title: "Backend / Database",
    description: "Server & Data management",
    icon: <Database className="h-5 w-5" />,
    color: "from-indigo-500 to-blue-400",
    shadow: "shadow-indigo-500/20",
    skills: [
      { name: "Firebase", level: 85 },
      { name: "MySQL", level: 80 },
      { name: "RESTful APIs", level: 90 },
    ],
  },
]

// Data Marquee dengan Brand Color Hex Code untuk efek Hover
const marqueeTechs = [
  { name: "React", icon: SiReact, hoverColor: "group-hover:text-[#61DAFB]" },
  { name: "Next.js", icon: SiNextdotjs, hoverColor: "group-hover:text-foreground" },
  { name: "TypeScript", icon: SiTypescript, hoverColor: "group-hover:text-[#3178C6]" },
  { name: "Tailwind", icon: SiTailwindcss, hoverColor: "group-hover:text-[#06B6D4]" },
  { name: "Framer", icon: SiFramer, hoverColor: "group-hover:text-[#0055FF]" },
  { name: "JavaScript", icon: SiJavascript, hoverColor: "group-hover:text-[#F7DF1E]" },
  { name: "Kotlin", icon: SiKotlin, hoverColor: "group-hover:text-[#7F52FF]" },
  { name: "Firebase", icon: SiFirebase, hoverColor: "group-hover:text-[#FFCA28]" },
  { name: "Python", icon: SiPython, hoverColor: "group-hover:text-[#3776AB]" },
  { name: "Figma", icon: SiFigma, hoverColor: "group-hover:text-[#F24E1E]" },
  { name: "Git", icon: SiGit, hoverColor: "group-hover:text-[#F05032]" },
  { name: "MySQL", icon: SiMysql, hoverColor: "group-hover:text-[#4479A1]" },
]

export default function Skills() {
  const { t } = useLanguage()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  }

  return (
    <section id="skills" className="py-24 md:py-32 bg-background relative overflow-hidden">
      
      {/* Background Ornaments */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="container mx-auto px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
        
        {/* Header Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-20"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-background/50 backdrop-blur-md text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>{t.skills.badge}</span>
          </motion.div>
          
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">
            {t.skills.title}
          </motion.h2>
          
          <motion.div variants={itemVariants} className="w-20 h-1.5 bg-gradient-to-r from-primary to-blue-500 mx-auto rounded-full mb-8"></motion.div>
        </motion.div>

        {/* Skills Cards Grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto"
        >
          {skillCategories.map((category) => (
            <motion.div key={category.title} variants={itemVariants}>
              <div className="h-full relative group overflow-hidden rounded-3xl bg-background/40 backdrop-blur-xl border border-border/50 p-6 md:p-8 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1">
                
                {/* Subtle Gradient Glow inside Card */}
                <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-500`} />

                {/* Card Header */}
                <div className="flex items-center gap-4 mb-8 relative z-10">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br ${category.color} text-white shadow-lg ${category.shadow} group-hover:scale-110 transition-transform duration-500`}>
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-medium">
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* Progress Bars */}
                <div className="space-y-5 relative z-10">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name} className="group/skill">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold text-foreground/80 group-hover/skill:text-foreground transition-colors">
                          {skill.name}
                        </span>
                        <span className="text-xs font-bold text-muted-foreground group-hover/skill:text-primary transition-colors">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-muted/50 rounded-full h-2 overflow-hidden backdrop-blur-sm border border-border/50">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: "easeOut", delay: skillIndex * 0.15 }}
                          className={`h-full rounded-full bg-gradient-to-r ${category.color} relative`}
                        >
                          <div className="absolute inset-0 bg-white/20 w-full h-full [mask-image:linear-gradient(to_right,transparent,white,transparent)] animate-[shimmer_2s_infinite]" />
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
                
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* INFINITE BRAND LOGO MARQUEE */}
      <div className="mt-32 relative flex flex-col items-center justify-center overflow-hidden">
        {/* Fading Edges */}
        <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        
        <div className="flex items-center">
          <motion.div
            className="flex gap-12 md:gap-24 pr-12 md:pr-24"
            animate={{ x: [0, "-50%"] }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          >
            {/* Array digandakan 2x lipat agar scrollingnya seamless (tanpa putus) */}
            {[...marqueeTechs, ...marqueeTechs, ...marqueeTechs, ...marqueeTechs].map((tech, i) => (
              <div 
                key={i} 
                className={`group flex items-center gap-4 text-muted-foreground/30 transition-all duration-500 cursor-default ${tech.hoverColor}`}
              >
                <tech.icon className="w-16 h-16 md:w-24 md:h-24 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2 drop-shadow-sm" />
                
                {/* Teks Nama Teknologi Muncul Sebelah Logo Saat Di-Hover */}
                <span className="font-bold text-2xl md:text-4xl tracking-tight opacity-0 w-0 -ml-4 group-hover:w-auto group-hover:opacity-100 group-hover:ml-0 transition-all duration-500 overflow-hidden whitespace-nowrap">
                  {tech.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

    </section>
  )
}