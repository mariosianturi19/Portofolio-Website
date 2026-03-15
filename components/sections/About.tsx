"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { MoveRight, Code, Palette, Github, Award, Sparkles } from "lucide-react"
import { useLanguage } from "@/components/LanguageProvider"

export default function About() {
  const { t } = useLanguage() // Integrasi i18n untuk judul

  const skills = [
    "JavaScript", "TypeScript", "React", "Next.js", 
    "HTML5", "CSS3", "Tailwind CSS", "Framer Motion", 
    "React Native", "Git", "Figma"
  ]

  const features = [
    {
      icon: <Code className="h-6 w-6" />,
      title: "Frontend Development",
      description: "Building modern web applications with React & Next.js",
      gradient: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-500"
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "UI/UX Design",
      description: "Creating beautiful and intuitive user interfaces",
      gradient: "from-purple-500/20 to-pink-500/20",
      iconColor: "text-purple-500"
    },
    {
      icon: <Github className="h-6 w-6" />,
      title: "Open Source",
      description: "Contributing to projects and sharing code on GitHub",
      gradient: "from-foreground/10 to-foreground/5",
      iconColor: "text-foreground"
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Bangkit Graduate",
      description: "Google-backed program graduate specializing in Mobile Dev",
      gradient: "from-orange-500/20 to-red-500/20",
      iconColor: "text-orange-500"
    },
  ]

  // Variants untuk animasi Stagger yang sangat smooth
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0, filter: "blur(4px)" },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  }

  return (
    <section id="about" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Background Decorator */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
        
        {/* Menggunakan whileInView bawaan Framer Motion agar tidak perlu useInView hook tambahan */}
        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
          className="grid lg:grid-cols-12 gap-16 lg:gap-12 items-start"
        >
          
          {/* Kiri: Teks & Cerita (Sticky on Desktop) */}
          <motion.div variants={itemVariants} className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-muted/30 backdrop-blur-md text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>{t.about.badge}</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 tracking-tight leading-[1.1]">
              {t.about.title}
            </h2>

            <div className="w-20 h-1.5 bg-gradient-to-r from-primary to-blue-500 rounded-full mb-8"></div>

            <div className="space-y-6 text-lg text-muted-foreground/90 leading-relaxed font-medium">
              <p>
                Hello! I&apos;m Togar Anthony Mario Sianturi, a passionate{" "}
                <span className="text-foreground font-bold">Front-End Developer & Mobile App Creator</span> based in Semarang, Indonesia. I specialize in creating beautiful, responsive web applications and innovative mobile apps using modern JavaScript frameworks and native technologies.
              </p>
              <p>
                I&apos;m a proud graduate of the <span className="text-foreground font-bold">Bangkit Academy 2024</span>, Google&apos;s flagship program. Through this program, I enhanced my skills in Mobile Development and collaborated on innovative projects that solve real-world problems.
              </p>
              <p>
                Beyond my technical skills, I&apos;m actively involved in the tech community as a member of <span className="text-foreground font-bold">GDSC</span> and <span className="text-foreground font-bold">CERC</span> at Diponegoro University. These experiences have deepened my understanding of Google Technologies and software development practices.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-6">
              <a href="#projects" className="inline-flex items-center text-foreground font-semibold group hover:text-primary transition-colors">
                Check out my work
                <MoveRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-2" />
              </a>
              <a href="https://github.com/mariosianturi19" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-muted-foreground font-semibold group hover:text-foreground transition-colors">
                <Github className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                GitHub Profile
              </a>
            </div>
          </motion.div>

          {/* Kanan: Bento Grid Layout */}
          <motion.div variants={containerVariants} className="lg:col-span-7 flex flex-col gap-8">
            
            {/* Skills Section dalam satu Bento Card besar */}
            <motion.div variants={itemVariants} className="p-8 rounded-3xl bg-background/50 border border-border/50 backdrop-blur-xl hover:bg-muted/20 transition-colors shadow-sm">
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                Tech Stack & Tools
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Badge className="px-4 py-2 text-sm bg-foreground/5 hover:bg-primary/10 text-foreground hover:text-primary border-border/50 hover:border-primary/30 transition-all cursor-default font-medium">
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Features Bento Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  className="group relative overflow-hidden rounded-3xl border border-border/50 bg-background/50 backdrop-blur-xl p-6 hover:border-primary/30 transition-all duration-500 shadow-sm"
                >
                  {/* Efek Glow di dalam card yang muncul saat hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className={`p-3 rounded-2xl bg-background border border-border/50 w-fit mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500 ${feature.iconColor}`}>
                      {feature.icon}
                    </div>
                    <h3 className="font-bold text-xl mb-2 text-foreground group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground font-medium leading-relaxed mt-auto">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}