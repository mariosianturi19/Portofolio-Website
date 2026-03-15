// file: components/Preloader.tsx
"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true)
  const [count, setCount] = useState(0)

  useEffect(() => {
    // Animasi persentase angka dari 0 ke 100
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsLoading(false), 500) // Beri jeda sebentar di 100%
          return 100
        }
        return prev + 2 // Kecepatan hitungan
      })
    }, 20)

    // Mengunci scroll saat preloader aktif
    if (isLoading) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      clearInterval(interval)
      document.body.style.overflow = "auto"
    }
  }, [isLoading])

  if (!isLoading) return null

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: "-100%" }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 2.2 }} // Premium Ease Curve
      className="fixed inset-0 z-[99999] bg-background flex flex-col items-center justify-center"
    >
      <div className="flex flex-col items-center justify-center gap-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground flex items-center gap-3"
        >
          Mario Sianturi
          <span className="text-primary">.</span>
        </motion.div>
        
        {/* Loading Bar */}
        <div className="w-48 h-[2px] bg-border overflow-hidden relative">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-primary"
            initial={{ width: "0%" }}
            animate={{ width: `${count}%` }}
            transition={{ ease: "linear", duration: 0.1 }}
          />
        </div>

        {/* Persentase */}
        <motion.div 
          className="text-sm font-medium text-muted-foreground font-mono"
        >
          {Math.min(count, 100)}%
        </motion.div>
      </div>
    </motion.div>
  )
}