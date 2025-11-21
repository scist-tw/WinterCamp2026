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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    isVisible && (
      <Button
        onClick={scrollToTop}
        size="icon"
        className="fixed bottom-8 right-8 rounded-full bg-foreground text-background hover:bg-foreground/90 w-12 h-12 shadow-lg cursor-pointer"
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-5 h-5" />
      </Button>
    )
  );
}
