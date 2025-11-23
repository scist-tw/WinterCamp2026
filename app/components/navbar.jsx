"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  // Add state for mobile menu
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollToSection = (id) => {
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
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-md font-semibold text-gray-800">
            SCIST x SCAICT 2026 聯合寒訓
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("schedule")}
              className="text-gray-700 hover:text-blue-400 font-medium transition-colors cursor-pointer"
            >
              課程活動
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="text-gray-700 hover:text-blue-400 font-medium transition-colors cursor-pointer"
            >
              報名資訊
            </button>
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6 font-medium cursor-pointer"
              onClick={() =>
                window.open(
                  "https://docs.google.com/forms/d/e/1FAIpQLSeX88997wSKQ0K8wUMT4s4x3lprJeL_Jq2xO_jDmGvnq4mQPg/viewform",
                  "_blank"
                )
              }
            >
              立即報名
            </Button>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden">
            <button
              aria-controls="mobile-menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((s) => !s)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
              {/* icon: switch between hamburger and X */}
              {mobileOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
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
          className="md:hidden border-t border-gray-100 bg-white"
        >
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-3">
            <button
              onClick={() => scrollToSection("schedule")}
              className="text-left text-gray-700 hover:text-blue-400 font-medium transition-colors w-full"
            >
              課程活動
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="text-left text-gray-700 hover:text-blue-400 font-medium transition-colors w-full"
            >
              報名資訊
            </button>
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6 font-medium cursor-pointer w-full"
              onClick={() =>
                window.open(
                  "https://docs.google.com/forms/d/e/1FAIpQLSeX88997wSKQ0K8wUMT4s4x3lprJeL_Jq2xO_jDmGvnq4mQPg/viewform",
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
