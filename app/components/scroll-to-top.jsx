"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    // 平滑滾動到頂部，使用 requestAnimationFrame 實現更流暢的動畫
    const startPosition = window.scrollY;
    const startTime = performance.now();
    const duration = 1500; // 1.5 秒內滾動完成

    const easeInOutCubic = (t) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = easeInOutCubic(progress);

      window.scrollTo(0, startPosition * (1 - easeProgress));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    isVisible && (
      <div className="fixed bottom-8 right-8 z-[9999] animate-in fade-in duration-300">
        <div className="relative group">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.75_0.15_85)] to-[oklch(0.8_0.18_85)] rounded-full blur-md opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
          
          {/* Button */}
          <Button
            onClick={scrollToTop}
            size="icon"
            className="relative w-12 h-12 rounded-full bg-black hover:bg-black/90 text-[oklch(0.75_0.15_85)] shadow-lg cursor-pointer border border-[oklch(0.75_0.15_85)]/30 hover:border-[oklch(0.75_0.15_85)]/60 transition-all duration-300 transform hover:scale-110 active:scale-95"
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-5 h-5 transition-transform group-hover:-translate-y-1" />
          </Button>
        </div>
      </div>
    )
  );
}
