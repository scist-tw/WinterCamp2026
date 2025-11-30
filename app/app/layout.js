import React from "react";
import "./globals.css";
import NavbarSwitcher from "@/components/navbar-switcher";
import RouteScrollTop from "@/components/route-scroll-top";
import SmoothScroll from "@/components/smooth-scroll";
// Note: Google fonts fetching is disabled in this environment.
// Fallback to default system fonts to avoid network during build/dev.

export const metadata = {
  title: "SCIST x SCAICT 2026 聯合寒訓 - 閃電四連編",
  description: "SCIST x SCAICT 2026 聯合寒訓 - 閃電四連編。四天三夜密集訓練，從基礎到進階的完整資訊課程。",
  icons: {
    icon: "/assets/images/winter.ico",
    apple: "/assets/images/winter.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW">
      <body className={`font-sans antialiased overscroll-none relative pt-20`}>
        <NavbarSwitcher />
        <RouteScrollTop />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
