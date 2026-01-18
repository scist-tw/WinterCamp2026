"use client";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Logo from "@/components/logo";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef(null);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);
  const [isClosing, setIsClosing] = useState(false);

  const closeMenu = () => {
    if (!mobileOpen) return;
    setIsClosing(true);
    setTimeout(() => {
      setMobileOpen(false);
      setIsClosing(false);
    }, 200);
  };

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
    closeMenu();
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
      if (e.key === "Escape") closeMenu();
    };
    const onResize = () => {
      if (window.innerWidth >= 768) closeMenu();
    };
    const onScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    // Update CSS var for nav height so `scroll-padding-top` is accurate
    const updateNavHeight = () => {
      const h = navRef.current?.offsetHeight || 72;
      document.documentElement.style.setProperty("--nav-height", `${h}px`);
    };
    const onDocClick = (e) => {
      if (!mobileOpen) return;
      const menuEl = menuRef.current;
      const toggleEl = toggleRef.current;
      if (menuEl && menuEl.contains(e.target)) return;
      if (toggleEl && toggleEl.contains(e.target)) return;
      closeMenu();
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", updateNavHeight);
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("touchstart", onDocClick, { passive: true });
    // initial set
    updateNavHeight();
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateNavHeight);
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("touchstart", onDocClick);
    };
  }, []);

  return (
      <nav
        ref={navRef}
        className={`fixed top-0 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/50 backdrop-blur-2xl border border-[oklch(0.75_0.15_85)]/30 shadow-2xl shadow-[oklch(0.75_0.15_85)]/10 rounded-2xl w-[96%] lg:w-[90%] mt-4"
          : "bg-background/60 backdrop-blur-xl border border-[oklch(0.75_0.15_85)]/20 w-full rounded-b-2xl"
      } ${mobileOpen && !isScrolled ? "rounded-2xl" : ""}`}
    >
      <div className="max-w-full mx-auto px-8 lg:px-24 py-3 lg:py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-all duration-200 group">
            <div className="group-hover:scale-110 transition-transform duration-200">
              <Logo />
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("course")}
              className="text-sm lg:text-base text-foreground/70 hover:text-[oklch(0.75_0.15_85)] font-semibold transition-all cursor-pointer relative group"
            >
              <span className="relative z-10">課程內容</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[oklch(0.75_0.15_85)] to-transparent group-hover:w-full transition-all duration-300 rounded-full"></span>
            </button>

            <button
              onClick={() => scrollToSection("pricing")}
              className="text-sm lg:text-base text-foreground/70 hover:text-[oklch(0.75_0.15_85)] font-semibold transition-all cursor-pointer relative group"
            >
              <span className="relative z-10">錄取名單</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[oklch(0.75_0.15_85)] to-transparent group-hover:w-full transition-all duration-300 rounded-full"></span>
            </button>

            <button
              onClick={() => scrollToSection("gallery")}
              className="text-sm lg:text-base text-foreground/70 hover:text-[oklch(0.75_0.15_85)] font-semibold transition-all cursor-pointer relative group"
            >
              <span className="relative z-10">過往紀錄</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[oklch(0.75_0.15_85)] to-transparent group-hover:w-full transition-all duration-300 rounded-full"></span>
            </button>

            <button
              onClick={() => scrollToSection("team")}
              className="text-sm lg:text-base text-foreground/70 hover:text-[oklch(0.75_0.15_85)] font-semibold transition-all cursor-pointer relative group"
            >
              <span className="relative z-10">工作人員</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[oklch(0.75_0.15_85)] to-transparent group-hover:w-full transition-all duration-300 rounded-full"></span>
            </button>
          </div>

          <div className="md:hidden">
            <button
              ref={toggleRef}
              aria-label={mobileOpen ? "關閉選單" : "開啟選單"}
              aria-controls="mobile-menu"
              aria-expanded={mobileOpen}
              onClick={() => (mobileOpen ? closeMenu() : setMobileOpen(true))}
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
        <>
          {/* Backdrop overlay to close on outside click */}
          <div
            className="fixed inset-0 z-40 md:hidden bg-black/30"
            aria-hidden
            onClick={closeMenu}
            style={{ animation: isClosing ? "fadeOut 200ms ease-in forwards" : "fadeIn 200ms ease-out" }}
          />
        </>
      )}

      {mobileOpen && (
        <div
          id="mobile-menu"
          ref={menuRef}
          className="md:hidden border-t border-[oklch(0.75_0.15_85)]/20"
          style={{ animation: isClosing ? "mobileMenuOut 200ms ease-in forwards" : "mobileMenuIn 200ms ease-out" }}
        >
          <div className="w-full px-4 py-6 flex flex-col gap-4">
            <button onClick={() => scrollToSection("course")} className="text-left text-foreground/80 hover:text-[oklch(0.75_0.15_85)] font-semibold transition-colors w-full py-2 px-4 rounded-lg hover:bg-background">課程內容</button>
            <button onClick={() => scrollToSection("pricing")} className="text-left text-foreground/80 hover:text-[oklch(0.75_0.15_85)] font-semibold transition-colors w-full py-2 px-4 rounded-lg hover:bg-background">錄取名單</button>
            <button onClick={() => scrollToSection("gallery")} className="text-left text-foreground/80 hover:text-[oklch(0.75_0.15_85)] font-semibold transition-colors w-full py-2 px-4 rounded-lg hover:bg-background">過往紀錄</button>
            <button onClick={() => scrollToSection("team")} className="text-left text-foreground/80 hover:text-[oklch(0.75_0.15_85)] font-semibold transition-colors w-full py-2 px-4 rounded-lg hover:bg-background">工作人員</button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes mobileMenuIn {
          0% { transform: translateY(-8px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes mobileMenuOut {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-8px); opacity: 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
      `}</style>
    </nav>
  );
}
