"use client"

// Magnetic.tsx — wrapper yang membuat anaknya "tertarik" ke kursor.
// Aktif hanya di pointer-fine; di touch tidak berpengaruh.

import { useRef, type ReactNode } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"

export default function Magnetic({
  children,
  strength = 0.25,
  className,
}: {
  children: ReactNode
  strength?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 })

  const onMove = (e: React.MouseEvent) => {
    if (!window.matchMedia("(pointer: fine)").matches) return
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left - rect.width / 2) * strength)
    y.set((e.clientY - rect.top - rect.height / 2) * strength)
  }
  const onLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn("inline-block", className)}
      style={{ x: sx, y: sy }}
    >
      {children}
    </motion.div>
  )
}
