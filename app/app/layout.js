import React from "react";
import "./globals.css";
import ClientWrapper from "@/components/client-wrapper";

export const metadata = {
  title: "SCIST x SCAICT 2026 聯合寒訓 - 閃電四連編",
  description: "SCIST x SCAICT 2026 聯合寒訓 - 閃電四連編。四天三夜密集訓練，從基礎到進階的完整資訊課程。2026年2月5日至8日於國立成功大學舉辦。",
  icons: {
    icon: "/assets/images/winter.ico",
    apple: "/assets/images/winter.webp",
  },
  charset: "utf-8",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW">
      <head>
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://font.emtech.cc" crossOrigin="anonymous" />
        
      </head>
      <body className={`antialiased overscroll-none relative pt-20 font-zh`}>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
