"use client";

import Image from "next/image";
import { Facebook, Instagram, Mail } from "lucide-react";

export default function Footer() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-card/50 backdrop-blur-sm text-foreground pt-16 pb-8 px-6 lg:px-12 border-t border-[oklch(0.75_0.15_85)]/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* 主辦單位 */}
          <div className="flex flex-col items-center md:items-start gap-6">
            <h3 className="text-lg font-bold tracking-wider text-[oklch(0.75_0.15_85)]">
              主辦單位
            </h3>
            <div className="flex gap-6">
              {/* SCIST */}
              <div className="flex flex-col gap-3 items-center">
                <a
                  href="https://scist.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative h-24 w-40 rounded-xl bg-muted/30 flex items-center justify-center border border-foreground/10 overflow-hidden transition-all hover:border-[oklch(0.75_0.15_85)]/40 hover:bg-muted/50"
                >
                  <Image
                    src="/assets/images/scist.png"
                    alt="SCIST"
                    width={110}
                    height={80}
                    className="object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                </a>
                <div className="text-xs text-foreground/60 text-center">
                  <span className="font-bold block text-foreground/90 mb-1">
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
                  className="group relative h-24 w-40 rounded-xl bg-muted/30 flex items-center justify-center border border-foreground/10 overflow-hidden transition-all hover:border-[oklch(0.75_0.15_85)]/40 hover:bg-muted/50"
                >
                  <Image
                    src="/assets/images/scaict.png"
                    alt="SCAICT"
                    width={110}
                    height={80}
                    className="object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                </a>
                <div className="text-xs text-foreground/60 text-center">
                  <span className="font-bold block text-foreground/90 mb-1">
                    SCAICT
                  </span>
                  中部高中電資社團聯合會議
                </div>
              </div>
            </div>
          </div>

          {/* 網站導覽 */}
          <div className="flex flex-col items-start md:items-start gap-6">
            <h3 className="text-lg font-bold tracking-wider text-[oklch(0.75_0.15_85)]">
              網站導覽
            </h3>
            <div className="flex flex-col gap-4 text-foreground/70 w-full">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="flex items-center gap-3 hover:text-[oklch(0.75_0.15_85)] transition-colors group w-fit cursor-pointer"
              >
                <span className="h-px w-6 bg-foreground/20 group-hover:bg-[oklch(0.75_0.15_85)] transition-all"></span>
                回到頂部
              </button>
              <button
                onClick={() => scrollToSection("course")}
                className="flex items-center gap-3 hover:text-[oklch(0.75_0.15_85)] transition-colors group w-fit cursor-pointer"
              >
                <span className="h-px w-6 bg-foreground/20 group-hover:bg-[oklch(0.75_0.15_85)] transition-all"></span>
                課程內容
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="flex items-center gap-3 hover:text-[oklch(0.75_0.15_85)] transition-colors group w-fit cursor-pointer"
              >
                <span className="h-px w-6 bg-foreground/20 group-hover:bg-[oklch(0.75_0.15_85)] transition-all"></span>
                報名資訊
              </button>
              <a
                href="mailto:contact@scist.org"
                className="flex items-center gap-3 hover:text-[oklch(0.75_0.15_85)] transition-colors group w-fit cursor-pointer"
              >
                <span className="h-px w-6 bg-foreground/20 group-hover:bg-[oklch(0.75_0.15_85)] transition-all"></span>
                聯絡我們
              </a>
            </div>
          </div>

          {/* 關於活動 */}
          <div className="flex flex-col items-start gap-6">
            <h3 className="text-lg font-bold tracking-wider text-[oklch(0.75_0.15_85)] text-left">
              關於活動
            </h3>
            <p className="text-foreground/70 text-sm leading-relaxed text-left">
              今年，SCIST 與 SCAICT 攜手合作，聯合策劃寒訓活動。
              以「把事情做好」為核心，聚焦產品規劃、介面設計與部署維運，
              以實作與協作為主，不強行堆砌流行術語，追求可用、可維護、可持續。
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-linear-to-r from-transparent via-[oklch(0.75_0.15_85)]/20 to-transparent my-8"></div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-foreground/50">
          <p>
            Copyright &copy; 2025-2026 SCIST x SCAICT | All rights reserved.
          </p>
          <p>
            Crafted by SCIST x SCAICT 2026 Winter Camp Organizing Team
          </p>
        </div>
      </div>
    </footer>
  );
}
