"use client"

// CustomCursor.tsx — lime dot yang mengikuti kursor dengan lag halus.
// Aktif hanya di perangkat pointer-fine dan tanpa prefers-reduced-motion.
// Membesar saat hover di atas elemen interaktif (a, button, [data-cursor]).

import { useEffect, useRef, useState } from "react"

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)")
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setEnabled(fine.matches && !reduced.matches)
    update()
    fine.addEventListener("change", update)
    reduced.addEventListener("change", update)
    return () => {
      fine.removeEventListener("change", update)
      reduced.removeEventListener("change", update)
    }
  }, [])

  useEffect(() => {
    if (!enabled) return

    document.body.classList.add("custom-cursor")

    let x = -100, y = -100, tx = -100, ty = -100
    let raf = 0
    const dot = dotRef.current

    const onMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY }
    const loop = () => {
      x += (tx - x) * 0.2
      y += (ty - y) * 0.2
      if (dot) {
        dot.style.left = `${x}px`
        dot.style.top = `${y}px`
      }
      raf = requestAnimationFrame(loop)
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const interactive = target.closest("a, button, [role='button'], [data-cursor]")
      dot?.classList.toggle("cursor-grow", Boolean(interactive))
    }

    window.addEventListener("mousemove", onMove, { passive: true })
    window.addEventListener("mouseover", onOver, { passive: true })
    raf = requestAnimationFrame(loop)

    return () => {
      document.body.classList.remove("custom-cursor")
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseover", onOver)
      cancelAnimationFrame(raf)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[999] h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary mix-blend-difference transition-[width,height] duration-200 [&.cursor-grow]:h-12 [&.cursor-grow]:w-12"
    />
  )
}
