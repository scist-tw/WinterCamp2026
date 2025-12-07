"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import Lenis from "@studio-freight/lenis"

const DISABLE_LENIS_PATHS = ["/gallery"]

export default function SmoothScroll({ children }) {
  const pathname = usePathname()
  const shouldDisableLenis = DISABLE_LENIS_PATHS.some(path => pathname?.startsWith(path))

  useEffect(() => {
    if (shouldDisableLenis) {
      return
    }

    // Delay initialization to improve initial load performance
    const initTimeout = setTimeout(() => {
      // Bind Lenis to the root wrapper we render so it controls the correct scroller.
      const rootEl = document.getElementById("__lenis-root") || document.documentElement

      // Disable native CSS smooth scrolling while Lenis is active to avoid double-smoothing.
      const prevScrollBehavior = document.documentElement.style.scrollBehavior
      document.documentElement.style.scrollBehavior = "auto"

      // Detect macOS for touch/trackpad tuning
      const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform)

      const lenis = new Lenis({
        el: rootEl,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        direction: "vertical",
        gestureDirection: "vertical",
        // Tune touch feel: keep it conservative on mac trackpads
        smoothTouch: true,
        touchMultiplier: isMac ? 1.1 : 1.6,
        lerp: 0.1,
      })

      // expose for global consumers (e.g., scroll helpers) so other components
      // can call `window.__lenis?.scrollTo(...)` when needed.
      try {
        window.__lenis = lenis
      } catch (e) {
        // ignore if not writable
      }

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
        // restore previous CSS scroll behavior
        document.documentElement.style.scrollBehavior = prevScrollBehavior || ""
        try {
          if (window.__lenis === lenis) delete window.__lenis
        } catch (e) {
          // ignore
        }
      }
    }, 100) // Delay 100ms to allow initial paint

    return () => clearTimeout(initTimeout)
  }, [shouldDisableLenis])

  return <div id="__lenis-root">{children}</div>
}
