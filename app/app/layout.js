import React from "react";
import "./globals.css";
// Note: Google fonts fetching is disabled in this environment.
// Fallback to default system fonts to avoid network during build/dev.

export const metadata = {
  title: "SCIST x SCAICT 2026 聯合寒訓 - 閃電四連編",
  description: "SCIST x SCAICT 2026 聯合寒訓 - 閃電四連編。四天三夜密集訓練，從基礎到進階的完整資訊課程。",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW">
      <body className={`font-sans antialiased overscroll-none relative`}>
        {children}
      </body>
    </html>
  );
}
