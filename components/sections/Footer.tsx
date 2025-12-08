"use client"

import { useState, useEffect } from "react"
import { Github, Linkedin, Mail, ArrowUp, Eye } from "lucide-react"
import { motion } from "framer-motion"

export default function Footer() {
  const [visitorCount, setVisitorCount] = useState(0)

  useEffect(() => {
    // Get visitor count from localStorage
    const storedCount = localStorage.getItem('portfolioVisitorCount')
    const count = storedCount ? parseInt(storedCount) : 0
    
    // Increment visitor count (simple implementation)
    const newCount = count + 1
    localStorage.setItem('portfolioVisitorCount', newCount.toString())
    setVisitorCount(newCount)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted/30 py-12">
      <div className="container mx-auto px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="grid md:grid-cols-3 gap-8 items-center max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <a href="#home" className="font-bold text-xl">
              <span className="text-foreground">Mario Sianturi</span>
            </a>
            <p className="text-muted-foreground mt-2">Front-End Developer & Mobile App Creator</p>
          </motion.div>

          <motion.div
            className="flex justify-center space-x-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <motion.a
              href="https://github.com/mariosianturi19"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary/10 hover:bg-primary/20 p-3 rounded-lg text-primary transition-colors group"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github className="h-5 w-5 transition-transform group-hover:scale-110" />
              <span className="sr-only">GitHub</span>
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/togar-anthony-mario-sianturi/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary/10 hover:bg-primary/20 p-3 rounded-lg text-primary transition-colors group"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Linkedin className="h-5 w-5 transition-transform group-hover:scale-110" />
              <span className="sr-only">LinkedIn</span>
            </motion.a>
            <motion.a
              href="mailto:19mariosianturi@gmail.com"
              className="bg-primary/10 hover:bg-primary/20 p-3 rounded-lg text-primary transition-colors group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Mail className="h-5 w-5 transition-transform group-hover:scale-110" />
              <span className="sr-only">Email</span>
            </motion.a>
          </motion.div>

          <motion.div
            className="flex justify-end"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
              aria-label="Scroll to top"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              <span className="text-sm">Back to top</span>
              <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-1" />
            </motion.button>
          </motion.div>
        </div>

        <motion.div
          className="border-t border-border mt-8 pt-8 text-center text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="flex items-center gap-2 text-sm">
              <Eye className="h-4 w-4" />
              <span>{visitorCount.toLocaleString()} visits</span>
            </div>
          </div>
          <p className="flex items-center justify-center gap-2 text-sm">
            © {currentYear} Togar Anthony Mario Sianturi. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
