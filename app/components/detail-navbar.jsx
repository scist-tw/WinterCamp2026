"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/logo";
import { safeWindowOpen } from "@/lib/security";

export default function DetailNavbar({ currentPage }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { name: "課程內容", href: "/course", key: "course" },
    { name: "報名資訊", href: "/pricing", key: "pricing" },
    { name: "過往紀錄", href: "/gallery", key: "gallery" },
    { name: "工作人員", href: "/team", key: "team" },
  ];

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
            <div className="relative group">
              <div className="absolute inset-0 bg-linear-to-r from-[oklch(0.75_0.15_85)] to-[oklch(0.8_0.18_85)] rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <Button
                className="relative bg-linear-to-r from-[oklch(0.75_0.15_85)] to-[oklch(0.8_0.18_85)] hover:from-[oklch(0.8_0.18_85)] hover:to-[oklch(0.75_0.15_85)] text-black rounded-full px-6 py-2 font-bold cursor-pointer transition-all transform hover:scale-105"
                onClick={() =>
                  safeWindowOpen("https://forms.gle/vKVbDr45aDBkoM3i6")
                }
              >
                立即報名
              </Button>
            </div>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
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
        <div className="md:hidden border-t border-[oklch(0.75_0.15_85)]/20 bg-card/95 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-left font-semibold transition-colors w-full py-2 px-4 rounded-lg hover:bg-background ${
                  currentPage === link.key
                    ? "text-[oklch(0.75_0.15_85)] bg-background"
                    : "text-foreground/80 hover:text-[oklch(0.75_0.15_85)]"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Button
              className="bg-linear-to-r from-[oklch(0.75_0.15_85)] to-[oklch(0.8_0.18_85)] hover:from-[oklch(0.8_0.18_85)] hover:to-[oklch(0.75_0.15_85)] text-black rounded-full px-6 py-3 font-bold cursor-pointer w-full transition-all mt-2"
              onClick={() => {
                safeWindowOpen("https://forms.gle/vKVbDr45aDBkoM3i6");
                setMobileOpen(false);
              }}
            >
              立即報名
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
