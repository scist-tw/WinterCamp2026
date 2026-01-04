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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* 合作單位 */}
          <div className="flex flex-col md:flex-row items-start gap-3">
            {/* 主辦單位 */}
            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-bold tracking-wider text-[oklch(0.75_0.15_85)]">
                主辦單位
              </h3>
              <div className="flex gap-3">
              {/* SCIST */}
              <div className="flex flex-col gap-3 items-center">
                <a
                  href="https://scist.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative h-24 w-36 rounded-xl bg-muted/30 flex items-center justify-center border border-foreground/10 overflow-hidden transition-all hover:border-[oklch(0.75_0.15_85)]/40 hover:bg-muted/50"
                >
                  <Image
                    src="/assets/images/scist.webp"
                    alt="SCIST"
                    width={110}
                    height={80}
                    className="object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                    unoptimized
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
                  className="group relative h-24 w-36 rounded-xl bg-muted/30 flex items-center justify-center border border-foreground/10 overflow-hidden transition-all hover:border-[oklch(0.75_0.15_85)]/40 hover:bg-muted/50"
                >
                  <Image
                    src="/assets/images/scaict.webp"
                    alt="SCAICT"
                    width={110}
                    height={80}
                    className="object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                    unoptimized
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

            {/* 協辦單位 */}
            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-bold tracking-wider text-[oklch(0.75_0.15_85)]">
                協辦單位
              </h3>
              <div className="flex gap-3">
                {/* NCKUEE */}
                <div className="flex flex-col gap-3 items-center">
                  <a
                    href="https://www.ee.ncku.edu.tw/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative h-24 w-36 rounded-xl bg-muted/30 flex items-center justify-center border border-foreground/10 overflow-hidden transition-all hover:border-[oklch(0.75_0.15_85)]/40 hover:bg-muted/50"
                  >
                    <Image
                      src="/assets/images/nckuee.png"
                      alt="NCKUEE"
                      width={110}
                      height={80}
                      className="object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                      unoptimized
                    />
                  </a>
                  <div className="text-xs text-foreground/60 text-center">
                    <span className="font-bold block text-foreground/90 mb-1">
                      NCKUEE
                    </span>
                    國立成功大學電機工程學系
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 網站導覽 */}
          <div className="flex flex-col items-start gap-6 lg:ml-18 lg:justify-self-end">
            <h3 className="text-lg font-bold tracking-wider text-[oklch(0.75_0.15_85)]">
              網站導覽
            </h3>
            <div className="flex flex-col gap-3 text-foreground/70 w-full">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="flex items-center gap-2 hover:text-[oklch(0.75_0.15_85)] transition-colors group w-fit cursor-pointer text-sm"
              >
                <span className="h-px w-4 bg-foreground/20 group-hover:bg-[oklch(0.75_0.15_85)] transition-all"></span>
                回到頂部
              </button>
              <button
                onClick={() => scrollToSection("course")}
                className="flex items-center gap-2 hover:text-[oklch(0.75_0.15_85)] transition-colors group w-fit cursor-pointer text-sm"
              >
                <span className="h-px w-4 bg-foreground/20 group-hover:bg-[oklch(0.75_0.15_85)] transition-all"></span>
                課程內容
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="flex items-center gap-2 hover:text-[oklch(0.75_0.15_85)] transition-colors group w-fit cursor-pointer text-sm"
              >
                <span className="h-px w-4 bg-foreground/20 group-hover:bg-[oklch(0.75_0.15_85)] transition-all"></span>
                報名資訊
              </button>
              <a
                href="mailto:camp@scist.org"
                className="flex items-center gap-2 hover:text-[oklch(0.75_0.15_85)] transition-colors group w-fit cursor-pointer text-sm"
              >
                <span className="h-px w-4 bg-foreground/20 group-hover:bg-[oklch(0.75_0.15_85)] transition-all"></span>
                聯絡我們
              </a>
            </div>
          </div>

          {/* 關於活動 */}
          <div className="flex flex-col items-start gap-6 lg:ml-24 lg:col-span-2">
            <h3 className="text-lg font-bold tracking-wider text-[oklch(0.75_0.15_85)]">
              關於活動
            </h3>
            <div className="text-foreground/70 text-sm leading-relaxed text-justify space-y-3">
              <p>
                SCIST 與 SCAICT 首度合作策劃寒訓，以「做一個自己的 ChatGPT」為主題，引導學員從 LLM 基礎概念到實際整合 AI 應用系統，完成可部署的智慧服務。
                課程涵蓋 AI API、RAG、LoRA 等實務技術，以及前端介面與 Discord Bot 設計，並教學雲端部署，使專案真正上線運作。
                透過專題實作與黑客松，培養跨領域協作能力，讓學員實際整合 UI、AI 與雲端技術，為未來競賽與技術發展奠定基礎。
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-linear-to-r from-transparent via-[oklch(0.75_0.15_85)]/20 to-transparent my-8"></div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-foreground/50">
          <p>
            Copyright &copy; 2025-2026 SCIST x SCAICT | All rights reserved.
          </p>
          <p>Crafted by SCIST x SCAICT 2026 Winter Camp Organizing Team</p>
        </div>
      </div>
    </footer>
  );
}
