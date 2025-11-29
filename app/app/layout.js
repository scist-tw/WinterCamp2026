import React from "react";
import "./globals.css";
import NavbarSwitcher from "@/components/navbar-switcher";
import RouteScrollTop from "@/components/route-scroll-top";
// Note: Google fonts fetching is disabled in this environment.
// Fallback to default system fonts to avoid network during build/dev.

export const metadata = {
  title: "SCIST x SCAICT 2026 聯合寒訓 - 閃電四連編",
  description: "SCIST x SCAICT 2026 聯合寒訓 - 閃電四連編。四天三夜密集訓練，從基礎到進階的完整資訊課程。",
  keywords: ["SCIST", "SCAICT", "寒訓", "資訊課程", "程式設計", "AI", "LLM", "Discord Bot", "雲端部署", "2026"],
  authors: [{ name: "SCIST x SCAICT" }],
  creator: "SCIST x SCAICT 2026 Winter Camp Organizing Team",
  publisher: "SCIST x SCAICT",
  metadataBase: new URL("https://scist.gonets.top"),
  openGraph: {
    title: "SCIST x SCAICT 2026 聯合寒訓 - 閃電四連編",
    description: "四天三夜密集訓練，從 LLM 基礎到雲端部署，打造專屬的 AI 應用。立即報名參加！",
    url: "https://scist.gonets.top",
    siteName: "SCIST x SCAICT 2026 聯合寒訓",
    locale: "zh_TW",
    type: "website",
    images: [
      {
        url: "/assets/images/winter.png",
        width: 1200,
        height: 630,
        alt: "SCIST x SCAICT 2026 聯合寒訓",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SCIST x SCAICT 2026 聯合寒訓 - 閃電四連編",
    description: "四天三夜密集訓練，從 LLM 基礎到雲端部署，打造專屬的 AI 應用。",
    images: ["/assets/images/winter.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/assets/images/winter.ico",
    apple: "/assets/images/winter.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW">
      <body className={`font-sans antialiased overscroll-none relative pt-20`}>
        <NavbarSwitcher />
        <RouteScrollTop />
        {children}
      </body>
    </html>
  );
}
