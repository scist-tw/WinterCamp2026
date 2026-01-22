"use client";

import Image from "next/image";
import ScheduleGrid from "@/components/schedule-grid";

export default function CoursePage() {
  const instructor = {
    name: "OsGa",
    handle: "@os324_",
    gravatar:
      "https://www.gravatar.com/avatar/5e5faa1632e059c945888331f3d6215b45b03dded682353468ebc49be5dd4920?d=identicon&s=512",
    portfolio: "https://osga.dev",
  };

  return (
    <div className="min-h-screen">
      {/* Instructor Section */}
      <section className="pt-32 pb-16 lg:pb-20 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="mb-3 flex justify-center">
              <span className="section-eyebrow">INSTRUCTOR // 講師介紹</span>
            </div>
            <h2 className="section-title text-3xl lg:text-5xl font-bold mb-4">
              講師介紹
            </h2>
            <p className="text-foreground/70 text-lg max-w-3xl mx-auto">
              來自社群與實務現場的講師，帶你從基礎到進階打通雲端維運與 Bot 開發
            </p>
          </div>

          <div className="neon-card rounded-3xl border border-[oklch(0.75_0.15_85)]/20 bg-linear-to-br from-card via-card to-muted p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 items-start">
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-[oklch(0.75_0.15_85)]/40 shadow-lg">
                  <Image
                    src={instructor.gravatar}
                    alt={instructor.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="mt-6">
                  <div className="text-2xl font-black text-[oklch(0.75_0.15_85)]">
                    {instructor.name}
                  </div>
                  <div className="text-foreground/60 text-sm mt-1">
                    {instructor.handle}
                  </div>
                </div>
                <a
                  href={instructor.portfolio}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[oklch(0.75_0.15_85)] hover:text-[oklch(0.8_0.18_85)] transition-colors"
                >
                  個人作品集
                  <span className="text-xs">↗</span>
                </a>
              </div>

              <div className="space-y-8 text-foreground/80">
                <p className="text-base lg:text-lg leading-relaxed">
                  OsGa 長期投入資訊安全、系統開發與網路維運領域，具備豐富的實務與教學經驗，
                  活躍於各大學生社群與技術活動。
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm font-bold text-[oklch(0.75_0.15_85)] mb-3">
                      現任與經歷
                    </div>
                    <ul className="space-y-2 text-sm lg:text-base">
                      <li>雲科大網管小組｜系統組組長</li>
                      <li>SITCON 2026｜開發組副組長</li>
                      <li>SCIST 寒訓 2024：活動組</li>
                      <li>SCIST 寒訓 2025：講師</li>
                    </ul>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[oklch(0.75_0.15_85)] mb-3">
                      教學與社群經驗
                    </div>
                    <ul className="space-y-2 text-sm lg:text-base">
                      <li>累積超過 100 小時以上技術分享與教學經驗</li>
                      <li>長期協助各校社團與技術活動</li>
                      <li>活動規劃、系統開發、題目設計、技術培訓皆有參與</li>
                    </ul>
                  </div>
                </div>

                <div className="border-t border-[oklch(0.75_0.15_85)]/20 pt-6">
                  <div className="text-sm font-bold text-[oklch(0.75_0.15_85)] mb-3">
                    本次課程負責內容
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="pill">雲端網路維運</span>
                    <span className="pill">Discord Bot 實作</span>
                  </div>
                  <ul className="space-y-2 text-sm lg:text-base">
                    <li>建立雲端伺服器與網路維運基礎觀念</li>
                    <li>實作部署流程與常見問題排查</li>
                    <li>實戰開發 Discord Bot，結合 AI 應用後端</li>
                    <li>協助學員建置可實際運作的社團或專案系統</li>
                  </ul>
                  <div className="mt-6 rounded-2xl bg-[oklch(0.75_0.15_85)]/10 border border-[oklch(0.75_0.15_85)]/20 p-4 text-sm lg:text-base text-foreground/80">
                    目標不是「跑得動就好」，而是真的能維運、能擴充、能救火。
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="pb-20 lg:pb-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="mb-3 flex justify-center">
              <span className="section-eyebrow">SCHEDULE // 課程活動</span>
            </div>
            <h2 className="section-title text-3xl lg:text-5xl font-bold mb-4">
              課程時間表
            </h2>
            <p className="text-foreground/70 text-lg max-w-3xl mx-auto">
              完整規劃的四天課程，理論與實作並重
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <ScheduleGrid />
          </div>
        </div>
      </section>
    </div>
  );
}
