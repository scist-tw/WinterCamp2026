"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import ScheduleGrid from "@/components/schedule-grid";
import { BookOpen, Globe, Cpu, Users, ArrowRight } from "lucide-react";

const courses = [
  {
    icon: Cpu,
    title: "AI 實作與應用",
    description: "從 AI 基礎概念到實際 API 應用，學習 LoRA、RAG 等實務技術，將 AI 功能整合進你的應用中。",
    topics: ["AI API", "LoRA", "RAG"],
  },
  {
    icon: Globe,
    title: "UI 開發",
    description: "學習 Discord Bot 介面開發，不侷限成品形式，讓你的 AI 應用觸及各種平台。",
    topics: ["網頁開發", "Discord Bot"],
  },
  {
    icon: BookOpen,
    title: "雲端部署與維運",
    description: "將你的 AI 應用服務部署到雲端伺服器，學習網路維運技能，讓專案真正上線運作。",
    topics: ["雲端部署", "伺服器維運", "服務架設"],
  },
];

export default function Course() {
  return (
    <section id="course" className="py-20 lg:py-32 px-6 lg:px-12 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-3">
            <span className="section-eyebrow">COURSE // 課程內容</span>
          </div>
          <h2 className="section-title text-4xl lg:text-5xl font-black">課程內容</h2>
          <p className="text-foreground/70 text-lg max-w-3xl mx-auto mt-4 leading-relaxed">
            LLM 基礎到多平台應用，再到雲端部署維運，
            四天三夜帶你完整掌握現代 AI 應用開發流程
          </p>
          <div className="mt-6">
          <Link
            href="/course"
            className="inline-flex items-center gap-2 text-[oklch(0.75_0.15_85)] hover:text-[oklch(0.8_0.18_85)] font-semibold transition-colors group"
          >
            查看詳細資訊
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {courses.map((course, idx) => {
            const Icon = course.icon;
            return (
              <div key={idx} className="group relative">
                <Card className="neon-card relative rounded-3xl p-8 transition-all transform group-hover:-translate-y-2 h-full">
                  <div className="flex flex-col h-full">
                    <div className="w-20 h-20 rounded-2xl bg-[oklch(0.75_0.15_85)]/10 flex items-center justify-center group-hover:scale-110 transition-transform mb-6">
                      <Icon className="w-10 h-10 text-[oklch(0.75_0.15_85)]" />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <h3 className="text-2xl font-black mb-3 text-foreground group-hover:text-[oklch(0.75_0.15_85)] transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-foreground/70 text-base mb-6 leading-relaxed flex-1">
                        {course.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {course.topics.map((topic, topicIdx) => (
                          <span
                            key={topicIdx}
                            className="pill"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>

        <div className="relative group mb-50">
          <div className="absolute inset-0 bg-linear-to-r from-[oklch(0.75_0.15_85)] to-[oklch(0.65_0.13_85)] rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
          <Card className="relative border-2 border-[oklch(0.75_0.15_85)]/30 rounded-3xl p-8 lg:p-12 bg-linear-to-br from-card via-card to-muted">
            <div className="flex flex-col lg:flex-row items-start gap-6">
              <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-[oklch(0.75_0.15_85)]/20 to-[oklch(0.65_0.13_85)]/10 flex items-center justify-center shrink-0">
                <Users className="w-8 h-8 text-[oklch(0.75_0.15_85)]" />
              </div>
              <div className="space-y-4 flex-1">
                <h3 className="text-2xl lg:text-3xl font-black text-[oklch(0.75_0.15_85)]">
                  額外亮點
                </h3>
                <div className="space-y-4 text-foreground/80">
                  <p className="text-base leading-relaxed">
                    此外，我們還邀請<span className="font-bold text-[oklch(0.75_0.15_85)]">企業與學長姐</span>來分享經驗。
                  </p>
                  <p className="text-base leading-relaxed">
                    無論你是<span className="font-bold text-[oklch(0.75_0.15_85)]">剛踏入資訊領域的新手</span>，或是<span className="font-bold text-[oklch(0.75_0.15_85)]">有些基礎但卡在瓶頸期</span>，我們都相信這次寒訓能讓你有所成長！
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* 課程活動時間表 */}
        <div id="schedule">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-3">
              <span className="section-eyebrow">SCHEDULE // 課程活動</span>
            </div>
            <h3 className="section-title text-4xl lg:text-5xl font-black">課程活動</h3>
            <p className="text-foreground/70 text-lg max-w-3xl mx-auto mt-4 leading-relaxed">
              四天三夜密集訓練，從理論到實作，完整體驗 AI 應用開發全流程
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <ScheduleGrid />
          </div>
        </div>
      </div>
    </section>
  );
}
