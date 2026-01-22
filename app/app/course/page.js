"use client";

import Image from "next/image";
import ScheduleGrid from "@/components/schedule-grid";

export default function CoursePage() {
  const instructors = [
    {
      name: "OsGa",
      handle: "@os324_",
      gravatar:
        "https://www.gravatar.com/avatar/5e5faa1632e059c945888331f3d6215b45b03dded682353468ebc49be5dd4920?d=identicon&s=512",
      portfolio: "https://osga.dev",
      bio: "長期投入資訊安全、系統開發與網路維運領域，具備豐富的實務與教學經驗，活躍於各大學生社群與技術活動。",
      experience: [
        "雲科大網管小組｜系統組組長",
        "SITCON 2026｜開發組副組長",
        "SCIST 寒訓 2024：活動組",
        "SCIST 寒訓 2025：講師",
      ],
      community: [
        "累積超過 100 小時以上技術分享與教學經驗",
        "長期協助各校社團與技術活動",
        "活動規劃、系統開發、題目設計、技術培訓皆有參與",
      ],
      topics: ["雲端網路維運", "Discord Bot 實作"],
      highlights: [
        "建立雲端伺服器與網路維運基礎觀念",
        "實作部署流程與常見問題排查",
        "實戰開發 Discord Bot，結合 AI 應用後端",
        "協助學員建置可實際運作的社團或專案系統",
      ],
      quote: "目標不是「跑得動就好」，而是真的能維運、能擴充、能救火。",
    },
    {
      name: "4yü",
      handle: "@4yu.dev.318",
      gravatar:
        "https://www.gravatar.com/avatar/8be3565ad047f6109e030da1e2e838d4706e6a0576db217733d9f0dcefb7b881?d=identicon&s=512",
      portfolio: "https://4yu.dev/about",
      bio: "專注於 AI / ML 與演算法教學，長期深耕學生資訊社群，具備紮實的競賽實力與大量實務教學經驗，擅長將抽象理論轉化為可實作、可理解的專案流程。",
      experience: [
        "國立中央大學｜資訊工程學系 114 級",
        "APCS 滿級分",
        "CPE 專家級（6/7，PR99）",
        "演算法與 AI / ML 實務導向教學",
      ],
      community: [
        "SCIST 南臺灣學生資訊社群：S5 總召、演算法助教",
        "GDG on Campus @ NCU：AI Team PM",
        "NFIRC：創辦人／社長／講師",
        "SITCON 2026：行銷組成員",
        "南九校 × SCIST × 成大資工 2024 聯合寒訓【資得其樂】：副召",
        "GDG on Campus @ NCU：AI / ML 概論與實作入門課程 講師",
        "SCIST 聯合寒訓【資深玩家】：AI / ML 講師",
        "四校 AI 工作坊（數位實中 × 師大附中 × 政大附中 × 松山高中）：講師",
        "南臺灣四校聯合 AI 社課：講師",
        "SCIST 培訓課程：演算法助教／講師",
        "SCIST × NHDK 聯合初學者練習賽：出題者",
        "資訊體驗一日營：台中、台南講師｜台北助教",
        "南十校聯合迎新 經驗分享講座：講師",
      ],
      topics: ["AI / ML 實作入門"],
      highlights: [
        "AI / ML 基礎概念與模型直覺建立",
        "從理論推導到實際程式實作",
        "引導學員逐步完成個人 AI 專案",
        "建立後續自主學習與延伸實作能力",
      ],
      quote: "不只聽懂，更是能親手做完一個 AI 專案。",
    },
  ];

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
          </div>

          <div className="space-y-10">
            {instructors.map((instructor) => (
              <div
                key={instructor.name}
                className="neon-card rounded-3xl border border-[oklch(0.75_0.15_85)]/20 bg-linear-to-br from-card via-card to-muted p-8 lg:p-12"
              >
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
                      {instructor.name} {instructor.bio}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="text-sm font-bold text-[oklch(0.75_0.15_85)] mb-3">
                          背景與經歷
                        </div>
                        <ul className="space-y-2 text-sm lg:text-base">
                          {instructor.experience.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[oklch(0.75_0.15_85)] mb-3">
                          教學與社群經驗
                        </div>
                        <ul className="space-y-2 text-sm lg:text-base">
                          {instructor.community.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="border-t border-[oklch(0.75_0.15_85)]/20 pt-6 space-y-6">
                      <div>
                        <div className="text-sm font-bold text-[oklch(0.75_0.15_85)] mb-3">
                          本次課程負責內容
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {instructor.topics.map((topic) => (
                            <span key={topic} className="pill">
                              {topic}
                            </span>
                          ))}
                        </div>
                        <ul className="space-y-2 text-sm lg:text-base">
                          {instructor.highlights.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            ))}
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
