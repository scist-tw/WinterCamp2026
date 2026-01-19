"use client";

import dynamic from "next/dynamic";
import NavbarSwitcher from "@/components/navbar-switcher";
import RouteScrollTop from "@/components/route-scroll-top";
import SmoothScroll from "@/components/smooth-scroll";
import LoadingScreen from "@/components/loading-screen";
import InAppBrowserNotice from "@/components/in-app-browser-notice";

// Lazy load AnimatedGlow to improve initial load performance
const AnimatedGlow = dynamic(() => import("@/components/animated-glow"), {
  ssr: false,
});

export default function ClientWrapper({ children }) {
  return (
    <>
      <LoadingScreen />
      <AnimatedGlow />
      <InAppBrowserNotice />
      <div className="relative z-10">
        <NavbarSwitcher />
        <RouteScrollTop />
        <SmoothScroll>{children}</SmoothScroll>
      </div>
    </>
  );
}
