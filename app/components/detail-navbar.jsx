"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/logo";

export default function DetailNavbar({ currentPage }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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

  const navLinks = [
    { name: "課程內容", href: "/course", key: "course" },
    { name: "錄取名單", href: "/list", key: "list" },
    { name: "過往紀錄", href: "/gallery", key: "gallery" },
    { name: "工作人員", href: "/team", key: "team" },
  ];

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    const onDocClick = (e) => {
      if (!mobileOpen) return;
      if (menuRef.current && menuRef.current.contains(e.target)) return;
      if (toggleRef.current && toggleRef.current.contains(e.target)) return;
      closeMenu();
    };
    window.addEventListener("scroll", onScroll);
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("touchstart", onDocClick, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("touchstart", onDocClick);
    };
  }, [mobileOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/40 backdrop-blur-xl border-b border-[oklch(0.75_0.15_85)]/20 shadow-lg rounded-b-2xl mx-4 lg:mx-6 mt-2"
          : "bg-background/80 backdrop-blur-xl border-b border-[oklch(0.75_0.15_85)]/20"
      }`}
    >
      <div className="w-full px-6 lg:px-20 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Logo />
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className={`font-semibold transition-all cursor-pointer relative group ${
                  currentPage === link.key
                    ? "text-[oklch(0.75_0.15_85)]"
                    : "text-foreground/80 hover:text-[oklch(0.75_0.15_85)]"
                }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-[oklch(0.75_0.15_85)] transition-all ${
                    currentPage === link.key ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </Link>
            ))}
          </div>

          <button
            ref={toggleRef}
            onClick={() => (mobileOpen ? closeMenu() : setMobileOpen(true))}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-[oklch(0.75_0.15_85)] hover:bg-card focus:outline-none border border-[oklch(0.75_0.15_85)]/30"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-6 w-6" strokeWidth="2.5" />
            ) : (
              <Menu className="h-6 w-6" strokeWidth="2.5" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <>
        <div
          className="fixed inset-0 z-40 md:hidden bg-black/30"
          aria-hidden
          onClick={closeMenu}
          style={{ animation: isClosing ? "fadeOut 200ms ease-in forwards" : "fadeIn 200ms ease-out" }}
        />
        <div ref={menuRef} className="relative z-50 md:hidden border-t border-[oklch(0.75_0.15_85)]/20 bg-card/95 backdrop-blur-xl rounded-b-2xl" style={{ animation: isClosing ? "mobileMenuOut 200ms ease-in forwards" : "mobileMenuIn 200ms ease-out" }}>
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                onClick={() => closeMenu()}
                className={`text-left font-semibold transition-colors w-full py-2 px-4 rounded-lg hover:bg-background ${
                  currentPage === link.key
                    ? "text-[oklch(0.75_0.15_85)] bg-background"
                    : "text-foreground/80 hover:text-[oklch(0.75_0.15_85)]"
                }`}
              >
                {link.name}
              </Link>
            ))}

          </div>
        </div>
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
        </>
      )}
    </nav>
  );
}
