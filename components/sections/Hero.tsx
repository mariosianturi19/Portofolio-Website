"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, Github, ArrowRight, Sparkles, Code2, Rocket, Terminal } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/components/LanguageProvider"

export default function Hero() {
  const { t } = useLanguage()
  const [typedText, setTypedText] = useState("")
  
  // Typewriter effect
  useEffect(() => {
    const fullText = t.hero.role
    let index = 0
    setTypedText("")

    const intervalId = setInterval(() => {
      setTypedText(fullText.substring(0, index))
      index++
      if (index > fullText.length) {
        clearInterval(intervalId)
      }
    }, 50)

    return () => clearInterval(intervalId)
  }, [t.hero.role])

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0, filter: "blur(5px)" },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 120, damping: 20 },
    },
  }

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden pt-24 md:pt-32 bg-background">
      
      {/* --- BACKGROUND EFFECTS TWEAKED FOR LIGHT & DARK MODE --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex justify-center">
        {/* Grid Pattern: Lebih tebal di Light Mode (#8080801a) dan tipis di Dark Mode (#8080800a) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] md:bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        
        {/* Animated Spotlight 1 (Primary Color) */}
        <motion.div 
          initial={{ opacity: 0, y: -150, x: -50 }}
          animate={{ opacity: 1, y: -50, x: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
          // mix-blend-multiply untuk Light Mode, mix-blend-screen untuk Dark Mode
          className="absolute top-0 w-[70vw] max-w-[700px] h-[400px] bg-primary/25 dark:bg-primary/20 rounded-full blur-[80px] md:blur-[120px] mix-blend-multiply dark:mix-blend-screen"
        />
        
        {/* Animated Spotlight 2 (Accent/Blue Color) - Memberikan "Nyawa" tambahan di Light Mode */}
        <motion.div 
          initial={{ opacity: 0, y: -150, x: 50 }}
          animate={{ opacity: 1, y: -30, x: 0 }}
          transition={{ duration: 2.5, ease: "easeOut", delay: 0.2 }}
          className="absolute top-10 right-[10vw] w-[50vw] max-w-[500px] h-[350px] bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-[80px] md:blur-[120px] mix-blend-multiply dark:mix-blend-screen"
        />
      </div>

      <div className="container mx-auto px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-5xl mx-auto flex flex-col items-center"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="relative inline-flex items-center gap-2 px-5 py-2 rounded-full border border-border/60 bg-background/50 backdrop-blur-md text-sm font-medium overflow-hidden group shadow-sm">
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite] z-0" />
              <Sparkles className="h-4 w-4 text-primary relative z-10" />
              <span className="relative z-10 text-foreground/80 group-hover:text-foreground transition-colors">
                Bangkit Academy 2024 Graduate
              </span>
            </div>
          </motion.div>

          {/* Grand Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-6 tracking-tight leading-[1.05]"
          >
            <span className="block text-foreground/90">{t.hero.greeting.replace("Mario Sianturi", "")}</span>
            <span className="relative inline-block mt-1">
              <span className="bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-transparent">
                Mario Sianturi
              </span>
              {/* Garis bawah bercahaya - Opacity dinaikkan agar terlihat di Light Mode */}
              <motion.div 
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.8, duration: 1, type: "spring" }}
                className="absolute -bottom-2 left-0 right-0 h-[4px] bg-gradient-to-r from-transparent via-primary to-transparent rounded-full opacity-100 dark:opacity-70 blur-[1px]"
              />
            </span>
          </motion.h1>

          {/* Animated Typed Subtitle */}
          <motion.div variants={itemVariants} className="h-10 md:h-14 mb-8 mt-4">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-muted-foreground flex items-center justify-center">
              <Terminal className="h-5 w-5 mr-3 text-primary/80 hidden sm:block" />
              {typedText}
              <motion.span 
                animate={{ opacity: [1, 0] }} 
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                className="text-primary inline-block w-2 ml-1"
              >
                _
              </motion.span>
            </h2>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-muted-foreground/90 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            {t.hero.description.split("Diponegoro University").map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && <span className="text-foreground font-semibold border-b-2 border-primary/30 pb-0.5 hover:border-primary transition-colors cursor-default">Diponegoro University</span>}
              </span>
            ))}
          </motion.p>

          {/* Call to Actions */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-20 w-full sm:w-auto">
            <Button className="group relative h-14 px-8 text-base rounded-full bg-foreground text-background hover:bg-foreground/90 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-primary/25" asChild>
              <a href="#projects" className="flex items-center">
                <span className="relative z-10 flex items-center font-medium">
                  {t.hero.viewProjects}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1.5" />
                </span>
              </a>
            </Button>
            
            <Button variant="outline" className="group h-14 px-8 text-base rounded-full border-border/80 bg-background/50 backdrop-blur-md hover:bg-muted/80 hover:border-foreground/30 transition-all duration-300 font-medium" asChild>
              <a href="https://github.com/mariosianturi19" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                {t.hero.github}
              </a>
            </Button>
          </motion.div>

          {/* Clean Stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-3xl mx-auto pt-8 border-t border-border/40">
            {[
              { icon: Code2, value: "10+", label: "GitHub Repos" },
              { icon: Sparkles, value: "2024", label: "Bangkit Graduate" },
              { icon: Rocket, value: "2+", label: "Years Experience" }
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -5 }}
                className="flex flex-col items-center justify-center p-4 transition-all cursor-default group rounded-2xl hover:bg-muted/30 dark:hover:bg-muted/10"
              >
                <div className="text-4xl md:text-5xl font-black text-foreground mb-3 tracking-tighter group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-blue-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 drop-shadow-sm">
                  {stat.value}
                </div>
                <div className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  <stat.icon className="h-4 w-4 text-primary/80" />
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 1.5, duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <a href="#about" aria-label="Scroll down" className="flex flex-col items-center gap-3 opacity-60 hover:opacity-100 transition-opacity">
          <div className="w-[1.5px] h-12 bg-gradient-to-b from-transparent via-foreground/60 to-transparent" />
          <ChevronDown className="h-5 w-5 text-foreground" />
        </a>
      </motion.div>
    </section>
  )
}