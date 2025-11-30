"use client";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Logo from "@/components/logo";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef(null);

  const scrollToSection = (id) => {
    if (typeof window === "undefined") return;
    if (window.location.pathname !== "/") {
      window.location.href = `/#${id}`;
      return;
    }
    const element = document.getElementById(id);
    if (!element) return;
    // More advanced smooth scroll with easing and offset
    const navOffset = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--nav-height")) || 72;
    smoothScrollTo(element, { duration: 700, offset: navOffset });
    setMobileOpen(false);
  };

  // Smooth scroll helper (requestAnimationFrame + easing)
  function smoothScrollTo(target, { duration = 600, offset = 0 } = {}) {
    const startY = window.scrollY || window.pageYOffset;
    const targetRect = target.getBoundingClientRect();
    const targetY = startY + targetRect.top - offset;
    const distance = targetY - startY;
    let startTime = null;

    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutCubic(progress);
      window.scrollTo(0, Math.round(startY + distance * eased));
      if (elapsed < duration) {
        window.requestAnimationFrame(step);
      }
    }

    window.requestAnimationFrame(step);
  }

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    const onScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    // Update CSS var for nav height so `scroll-padding-top` is accurate
    const updateNavHeight = () => {
      const h = navRef.current?.offsetHeight || 72;
      document.documentElement.style.setProperty("--nav-height", `${h}px`);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", updateNavHeight);
    // initial set
    updateNavHeight();
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateNavHeight);
    };
  }, []);

  return (
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/40 backdrop-blur-xl border-b border-[oklch(0.75_0.15_85)]/20 shadow-lg rounded-2xl mx-6 lg:mx-20 mt-2"
          : "bg-background/80 backdrop-blur-xl border-b border-[oklch(0.75_0.15_85)]/20"
      }`}
    >
      <div className="max-w-8xl mx-auto px-6 lg:px-12 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Logo />
          </Link>

          <div className="hidden md:flex items-center gap-5">
            <button
              onClick={() => scrollToSection("course")}
              className="text-foreground/80 hover:text-[oklch(0.75_0.15_85)] font-semibold transition-all cursor-pointer relative group"
            >
              課程內容
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[oklch(0.75_0.15_85)] group-hover:w-full transition-all"></span>
            </button>

            <button
              onClick={() => scrollToSection("pricing")}
              className="text-foreground/80 hover:text-[oklch(0.75_0.15_85)] font-semibold transition-all cursor-pointer relative group"
            >
              報名資訊
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[oklch(0.75_0.15_85)] group-hover:w-full transition-all"></span>
            </button>

            <button
              onClick={() => scrollToSection("gallery")}
              className="text-foreground/80 hover:text-[oklch(0.75_0.15_85)] font-semibold transition-all cursor-pointer relative group"
            >
              過往紀錄
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[oklch(0.75_0.15_85)] group-hover:w-full transition-all"></span>
            </button>

            <button
              onClick={() => scrollToSection("team")}
              className="text-foreground/80 hover:text-[oklch(0.75_0.15_85)] font-semibold transition-all cursor-pointer relative group"
            >
              工作人員
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[oklch(0.75_0.15_85)] group-hover:w-full transition-all"></span>
            </button>

            <div className="relative group">
              <div className="absolute inset-0 bg-linear-to-r from-[oklch(0.75_0.15_85)] to-[oklch(0.8_0.18_85)] rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <Button
                className="relative bg-linear-to-r from-[oklch(0.75_0.15_85)] to-[oklch(0.8_0.18_85)] hover:from-[oklch(0.8_0.18_85)] hover:to-[oklch(0.75_0.15_85)] text-black rounded-full px-6 py-2 font-bold cursor-pointer transition-all transform hover:scale-105"
                onClick={() => window.open("https://forms.gle/vKVbDr45aDBkoM3i6", "_blank")}
              >
                立即報名
              </Button>
            </div>
          </div>

          <div className="md:hidden">
            <button
              aria-label={mobileOpen ? "關閉選單" : "開啟選單"}
              aria-controls="mobile-menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((s) => !s)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-[oklch(0.75_0.15_85)] hover:bg-card focus:outline-none border border-[oklch(0.75_0.15_85)]/30"
            >
              {mobileOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div id="mobile-menu" className="md:hidden border-t border-[oklch(0.75_0.15_85)]/20 bg-card/95 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4">
            <button onClick={() => scrollToSection("course")} className="text-left text-foreground/80 hover:text-[oklch(0.75_0.15_85)] font-semibold transition-colors w-full py-2 px-4 rounded-lg hover:bg-background">課程內容</button>
            <button onClick={() => scrollToSection("pricing")} className="text-left text-foreground/80 hover:text-[oklch(0.75_0.15_85)] font-semibold transition-colors w-full py-2 px-4 rounded-lg hover:bg-background">報名資訊</button>
            <button onClick={() => scrollToSection("gallery")} className="text-left text-foreground/80 hover:text-[oklch(0.75_0.15_85)] font-semibold transition-colors w-full py-2 px-4 rounded-lg hover:bg-background">過往紀錄</button>
            <button onClick={() => scrollToSection("team")} className="text-left text-foreground/80 hover:text-[oklch(0.75_0.15_85)] font-semibold transition-colors w-full py-2 px-4 rounded-lg hover:bg-background">工作人員</button>
            <Button className="bg-linear-to-r from-[oklch(0.75_0.15_85)] to-[oklch(0.8_0.18_85)] hover:from-[oklch(0.8_0.18_85)] hover:to-[oklch(0.75_0.15_85)] text-black rounded-full px-6 py-3 font-bold cursor-pointer w-full transition-all" onClick={() => window.open("https://forms.gle/vKVbDr45aDBkoM3i6", "_blank")}>立即報名</Button>
          </div>
        </div>
      )}
    </nav>
  );
}
