"use client"

import { useEffect } from "react"
import Lenis from "@studio-freight/lenis"

export default function SmoothScroll({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      direction: "vertical",
      gestureDirection: "vertical",
      smoothTouch: true,
      touchMultiplier: 2,
      lerp: 0.1,
    })

    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      try {
        lenis.destroy()
      } catch (e) {
        // ignore
      }
    }
  }, [])

  return <div id="__lenis-root">{children}</div>
}
