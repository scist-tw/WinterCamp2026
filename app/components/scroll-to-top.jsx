'use client';

import { useEffect, useState, useRef } from 'react';
import { ChevronUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    // Cancel any ongoing scroll animation
    if (scrollTimeoutRef.current) {
      cancelAnimationFrame(scrollTimeoutRef.current);
      scrollTimeoutRef.current = null;
    }

    // Use Lenis for smooth scroll with page scrolling feel
    if (typeof window !== 'undefined' && window.__lenis?.scrollTo) {
      try {
        window.__lenis.scrollTo(0, { duration: 2 });
        return;
      } catch (e) {
        console.error('Lenis scroll failed:', e);
      }
    }

    // Fallback: native scroll
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <button
      ref={buttonRef}
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 p-3 bg-black/80 hover:bg-black text-[oklch(0.75_0.15_85)] rounded-full shadow-lg border border-[oklch(0.75_0.15_85)]/40 hover:border-[oklch(0.75_0.15_85)]/70 transition-all duration-150 hover:scale-110 active:scale-95"
      aria-label="回到頂端"
      type="button"
    >
      <ChevronUp size={20} strokeWidth={2.5} />
    </button>
  );
}
