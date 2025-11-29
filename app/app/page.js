"use client";

import { useEffect, useState, useMemo, lazy, Suspense } from "react";
import Hero from "@/components/hero";
import Intro from "@/components/intro";
import Course from "@/components/course";
import Pricing from "@/components/pricing";
import Gallery from "@/components/gallery";
import Team from "@/components/team";
import Info from "@/components/info";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import ScrollToTop from "@/components/scroll-to-top";
import StructuredData from "@/components/structured-data";
import EasterEggs from "@/components/easter-eggs";

// Helper function to generate random glows
const generateGlows = () => {
  return [
    {
      top: `${Math.random() * 80}%`,
      left: `${Math.random() * 80}%`,
      size: 420,
      opacity: 0.06,
      delay: '0s'
    },
    {
      top: `${Math.random() * 80}%`,
      left: `${Math.random() * 80}%`,
      size: 450,
      opacity: 0.055,
      delay: '3s'
    },
    {
      top: `${Math.random() * 80}%`,
      left: `${Math.random() * 80}%`,
      size: 400,
      opacity: 0.05,
      delay: '6s'
    }
  ];
};

export default function Home() {
  const [glows, setGlows] = useState([]);

  useEffect(() => {
    setGlows(generateGlows());

    // 每 20 秒隨機改變位置
    const interval = setInterval(() => {
      setGlows(generateGlows());
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      {/* Structured Data for SEO */}
      <StructuredData />

      {/* Easter Eggs */}
      <EasterEggs />

      {/* Global Background Decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {glows.map((glow, idx) => (
          <div
            key={idx}
            className="absolute rounded-full blur-3xl glow-float transition-all duration-[20000ms] ease-in-out"
            style={{
              top: glow.top,
              left: glow.left,
              width: `${glow.size}px`,
              height: `${glow.size}px`,
              backgroundColor: 'oklch(0.75 0.15 85)',
              opacity: glow.opacity,
              animationDelay: glow.delay
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Hero />
        <Intro />
        <Course />
        <Pricing />
        <Gallery />
        <Team />
        <Info />
        <Contact />
        <Footer />
        <ScrollToTop />
      </div>
    </div>
  );
}
