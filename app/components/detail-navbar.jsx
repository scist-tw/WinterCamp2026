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
    { name: "錄取名單", href: "/pricing", key: "list" },
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
      className={`fixed top-0 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/50 backdrop-blur-2xl border border-[oklch(0.75_0.15_85)]/30 shadow-2xl shadow-[oklch(0.75_0.15_85)]/10 rounded-full w-[96%] lg:w-[90%] mt-4"
          : "bg-background/60 backdrop-blur-xl border border-[oklch(0.75_0.15_85)]/20 w-full rounded-b-3xl"
      }`}
    >
      <div className="max-w-full mx-auto px-8 lg:px-24 py-3 lg:py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-all duration-200 group">
            <div className="group-hover:scale-110 transition-transform duration-200">
              <Logo />
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className={`text-sm lg:text-base font-semibold transition-all cursor-pointer relative group ${
                  currentPage === link.key
                    ? "text-[oklch(0.75_0.15_85)]"
                    : "text-foreground/70 hover:text-[oklch(0.75_0.15_85)]"
                }`}
              >
                <span className="relative z-10">{link.name}</span>
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[oklch(0.75_0.15_85)] to-transparent transition-all duration-300 rounded-full ${
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
        <div ref={menuRef} className="relative z-50 md:hidden border-t border-[oklch(0.75_0.15_85)]/20 bg-card/95 backdrop-blur-xl" style={{ animation: isClosing ? "mobileMenuOut 200ms ease-in forwards" : "mobileMenuIn 200ms ease-out" }}>
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                onClick={() => closeMenu()}
                className={`text-left font-semibold transition-colors w-full py-2 px-4 rounded-lg ${
                  currentPage === link.key
                    ? "text-[oklch(0.75_0.15_85)] bg-background"
                    : "text-foreground/80 hover:text-[oklch(0.75_0.15_85)] hover:bg-background"
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
