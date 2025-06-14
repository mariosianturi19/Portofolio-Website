"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Badge } from "@/components/ui/badge"
import { MoveRight, Code, Palette, Github, Award } from "lucide-react"

export default function About() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const skills = [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "HTML5",
    "CSS3",
    "Tailwind CSS",
    "Framer Motion",
    "React Native",
    "Git",
    "Figma",
  ]

  const features = [
    {
      icon: <Code className="h-6 w-6" />,
      title: "Frontend Development",
      description: "Building modern web applications with React & Next.js",
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "UI/UX Design",
      description: "Creating beautiful and intuitive user interfaces",
    },
    {
      icon: <Github className="h-6 w-6" />,
      title: "Open Source",
      description: "Contributing to projects and sharing code on GitHub",
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Bangkit Graduate",
      description: "Google-backed program graduate specializing in Mobile Development",
    },
  ]

  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              About Me
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-primary">01.</span> Get to know me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-blue-500 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl md:text-3xl font-bold mb-6">
                I'm a passionate Front-End Developer & Mobile App Creator building amazing digital experiences
              </h3>

              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Hello! I&apos;m Togar Anthony Mario Sianturi, a passionate{" "}
                  <strong className="text-primary">Front-End Developer & Mobile App Creator</strong> based in Semarang, Indonesia. I specialize
                  in creating beautiful, responsive web applications and innovative mobile apps using modern JavaScript frameworks
                  and native technologies.
                </p>
                <p>
                  I&apos;m a proud graduate of the <strong className="text-primary">Bangkit Academy 2024</strong>, Google&apos;s
                  flagship program for developing tech talents in Indonesia. Through this program, I enhanced my skills
                  in{" "}
                  <strong className="text-primary">Mobile Development</strong> and collaborated on innovative projects
                  that solve real-world problems.
                </p>
                <p>
                  Beyond my technical skills, I&apos;m actively involved in the tech community as a member of{" "}
                  <strong className="text-primary">Google Developer Student Clubs (GDSC)</strong> and{" "}
                  <strong className="text-primary">Computer Engineering Research Club (CERC)</strong> at Diponegoro University.
                  These experiences have strengthened my collaboration skills and deepened my understanding of Google Technologies
                  and software development practices.
                </p>
                <p>
                  My expertise lies in{" "}
                  <strong className="text-primary">React, Next.js, and TypeScript</strong>, with a strong focus on
                  creating seamless user experiences and pixel-perfect designs. I&apos;m passionate about writing clean,
                  maintainable code and staying up-to-date with the latest frontend technologies and best practices.
                </p>
                <p>
                  You can explore my projects and contributions on{" "}
                  <strong className="text-primary">GitHub</strong>, where I share my work and collaborate with the
                  developer community. I believe in continuous learning and knowledge sharing to grow together as developers.
                </p>
              </div>

              <div className="mt-8">
                <h4 className="text-xl font-semibold mb-4">Technologies I use for Web & Mobile Development:</h4>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Badge className="hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer">
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#projects"
                  className="inline-flex items-center text-primary hover:text-primary/80 font-medium group transition-colors"
                >
                  Check out my work
                  <MoveRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="https://github.com/mariosianturi19"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-muted-foreground hover:text-primary font-medium group transition-colors"
                >
                  <Github className="mr-2 h-4 w-4" />
                  GitHub Profile
                </a>
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants} className="relative">
              <div className="grid gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    className="glass rounded-xl p-6 card-hover"
                    initial={{ opacity: 0, x: 50 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`p-3 rounded-lg ${
                          feature.title === "Bangkit Graduate"
                            ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                            : feature.title === "Open Source"
                            ? "bg-gradient-to-r from-gray-700 to-gray-900 text-white"
                            : "bg-primary/10 text-primary"
                        }`}
                      >
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl"></div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
