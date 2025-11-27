"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  // Add state for mobile menu
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollToSection = (id) => {
    // If not on home page, navigate to home first
    if (window.location.pathname !== '/') {
      window.location.href = `/#${id}`;
      return;
    }
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    // close mobile menu after navigating (if open)
    setMobileOpen(false);
  };

  // Close on Escape and close on resize >= md
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false); // md breakpoint
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-[oklch(0.75_0.15_85)]/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-linear-to-br from-[oklch(0.75_0.15_85)] to-[oklch(0.65_0.13_85)] flex items-center justify-center">
              <span className="text-black font-black">SC</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-black text-[oklch(0.75_0.15_85)]">
                閃電四連編
              </span>
              <span className="text-xs text-foreground/70">
                SCIST x SCAICT 2026
              </span>
            </div>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
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
            <div className="relative group">
              <div className="absolute inset-0 bg-linear-to-r from-[oklch(0.75_0.15_85)] to-[oklch(0.8_0.18_85)] rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <Button
                className="relative bg-linear-to-r from-[oklch(0.75_0.15_85)] to-[oklch(0.8_0.18_85)] hover:from-[oklch(0.8_0.18_85)] hover:to-[oklch(0.75_0.15_85)] text-black rounded-full px-6 py-2 font-bold cursor-pointer transition-all transform hover:scale-105"
                onClick={() =>
                  window.open(
                    "https://forms.gle/vKVbDr45aDBkoM3i6",
                    "_blank"
                  )
                }
              >
                立即報名
              </Button>
            </div>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden">
            <button
              aria-controls="mobile-menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((s) => !s)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-[oklch(0.75_0.15_85)] hover:bg-card focus:outline-none border border-[oklch(0.75_0.15_85)]/30"
            >
              {/* icon: switch between hamburger and X */}
              {mobileOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-[oklch(0.75_0.15_85)]/20 bg-card/95 backdrop-blur-xl"
        >
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4">
            <button
              onClick={() => scrollToSection("course")}
              className="text-left text-foreground/80 hover:text-[oklch(0.75_0.15_85)] font-semibold transition-colors w-full py-2 px-4 rounded-lg hover:bg-background"
            >
              課程內容
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="text-left text-foreground/80 hover:text-[oklch(0.75_0.15_85)] font-semibold transition-colors w-full py-2 px-4 rounded-lg hover:bg-background"
            >
              報名資訊
            </button>
            <button
              onClick={() => scrollToSection("gallery")}
              className="text-left text-foreground/80 hover:text-[oklch(0.75_0.15_85)] font-semibold transition-colors w-full py-2 px-4 rounded-lg hover:bg-background"
            >
              過往紀錄
            </button>
            <button
              onClick={() => scrollToSection("team")}
              className="text-left text-foreground/80 hover:text-[oklch(0.75_0.15_85)] font-semibold transition-colors w-full py-2 px-4 rounded-lg hover:bg-background"
            >
              工作人員
            </button>
            <Button
              className="bg-linear-to-r from-[oklch(0.75_0.15_85)] to-[oklch(0.8_0.18_85)] hover:from-[oklch(0.8_0.18_85)] hover:to-[oklch(0.75_0.15_85)] text-black rounded-full px-6 py-3 font-bold cursor-pointer w-full transition-all"
              onClick={() =>
                window.open(
                  "https://forms.gle/vKVbDr45aDBkoM3i6",
                  "_blank"
                )
              }
            >
              立即報名
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
