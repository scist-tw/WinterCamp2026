"use client";

import dynamic from "next/dynamic";
import NavbarSwitcher from "@/components/navbar-switcher";
import RouteScrollTop from "@/components/route-scroll-top";
import SmoothScroll from "@/components/smooth-scroll";

// Lazy load AnimatedGlow to improve initial load performance
const AnimatedGlow = dynamic(() => import("@/components/animated-glow"), {
  ssr: false,
});

export default function ClientWrapper({ children }) {
  return (
    <>
      <AnimatedGlow />
      <div className="relative z-10">
        <NavbarSwitcher />
        <RouteScrollTop />
        <SmoothScroll>{children}</SmoothScroll>
      </div>
    </>
  );
}
