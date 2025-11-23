"use client";

import Image from "next/image";
import { Facebook, Instagram, Mail } from "lucide-react";

export default function Footer() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-foreground text-background pt-16 pb-8 px-6 lg:px-12 border-t border-background/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* 主辦單位 */}
          <div className="flex flex-col items-center md:items-start gap-6">
            <h3 className="text-lg font-bold tracking-wider text-background/90">
              主辦單位
            </h3>
            <div className="flex gap-6">
              {/* SCIST */}
              <div className="flex flex-col gap-3 items-center">
                <a
                  href="https://scist.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative h-24 w-40 rounded-xl bg-background/5 flex items-center justify-center border border-background/10 overflow-hidden transition-all hover:border-background/40 hover:bg-background/10"
                >
                  <Image
                    src="/assets/images/Scist.png"
                    alt="SCIST"
                    width={110}
                    height={80}
                    className="object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                </a>
                <div className="text-xs text-background/60 text-center">
                  <span className="font-bold block text-background/80 mb-1">
                    SCIST
                  </span>
                  南臺灣學生資訊社群
                </div>
              </div>

              {/* SCAICT */}
              <div className="flex flex-col gap-3 items-center">
                <a
                  href="https://scaict.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative h-24 w-40 rounded-xl bg-background/5 flex items-center justify-center border border-background/10 overflow-hidden transition-all hover:border-background/40 hover:bg-background/10"
                >
                  <Image
                    src="/assets/images/scaict.png"
                    alt="SCAICT"
                    width={110}
                    height={80}
                    className="object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                </a>
                <div className="text-xs text-background/60 text-center">
                  <span className="font-bold block text-background/80 mb-1">
                    SCAICT
                  </span>
                  中部高中電資社團聯合會議
                </div>
              </div>
            </div>
          </div>

          {/* 網站導覽 */}
          <div className="flex flex-col items-start md:items-start gap-6">
            <h3 className="text-lg font-bold tracking-wider text-background/90">
              網站導覽
            </h3>
            <div className="flex flex-col gap-4 text-background/60 w-full">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="flex items-center gap-3 hover:text-background transition-colors group w-fit cursor-pointer"
              >
                <span className="h-px w-6 bg-background/20 group-hover:bg-background transition-all"></span>
                回到頂部
              </button>
              <button
                onClick={() => scrollToSection("schedule")}
                className="flex items-center gap-3 hover:text-background transition-colors group w-fit cursor-pointer"
              >
                <span className="h-px w-6 bg-background/20 group-hover:bg-background transition-all"></span>
                課程活動
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="flex items-center gap-3 hover:text-background transition-colors group w-fit cursor-pointer"
              >
                <span className="h-px w-6 bg-background/20 group-hover:bg-background transition-all"></span>
                報名資訊
              </button>
              <a
                href="mailto:contact@scist.org"
                className="flex items-center gap-3 hover:text-background transition-colors group w-fit cursor-pointer"
              >
                <span className="h-px w-6 bg-background/20 group-hover:bg-background transition-all"></span>
                聯絡我們
              </a>
            </div>
          </div>

          {/* 關於活動 */}
          <div className="flex flex-col items-start gap-6">
            <h3 className="text-lg font-bold tracking-wider text-background/90 text-left">
              關於活動
            </h3>
            <p className="text-background/60 text-sm leading-relaxed text-left">
              今年，SCIST 與 SCAICT 首度攜手合作，聯合策劃寒訓活動。
              {/* <br /> */}
              以「做一個自己的
              ChatGPT」為主題，透過程式設計、人工智慧和實作，激發高中生技術熱情，學習
              LLM
              核心原理，實際打造專屬的智慧助理。強調跨領域協作與問題解決能力的培養，讓參與者能在團隊合作中磨練領導與溝通技巧，為未來技術發展奠定扎實基礎。
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-linear-to-r from-transparent via-background/20 to-transparent my-8"></div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-background/40">
          <p>
            Copyright &copy; 2025-2026 SCIST x SCAICT | All rights reserved.
          </p>
          <p>
            Crafted by the SCIST x SCAICT 2026 Winter Camp 「閃電四連編」
            Organizing Team
          </p>
        </div>
      </div>
    </footer>
  );
}
