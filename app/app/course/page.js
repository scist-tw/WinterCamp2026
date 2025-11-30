"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { BookOpen, Globe, Cpu, Clock, Target, Award } from "lucide-react";
import Link from "next/link";

const courses = [
  {
    icon: Cpu,
    title: "LLM 基礎與應用架構",
    description: "從基礎概念到實際應用，學習如何串接多模型 API，建立智能應用系統。",
    topics: ["LLM 基礎", "多模型 API", "應用架構"],
    details: [
      "理解大型語言模型的核心原理與運作機制",
      "學習如何選擇與使用不同的 LLM API",
      "掌握 Prompt Engineering 的技巧與最佳實踐",
      "建立多模型整合的智能應用系統",
      "實作 RAG (Retrieval-Augmented Generation) 架構",
    ],
  },
  {
    icon: Globe,
    title: "多平台 UI 概述",
    description: "掌握不同平台的介面設計與實作，從 Web 到 Discord Bot 都能輕鬆上手。",
    topics: ["Web UI", "Discord Bot", "API 設計"],
    details: [
      "現代 Web 框架與 UI 設計原則",
      "React / Next.js 快速開發技巧",
      "Discord Bot 開發與互動設計",
      "RESTful API 與 WebSocket 實作",
      "跨平台整合與資料同步",
    ],
  },
  {
    icon: BookOpen,
    title: "雲端網路維運",
    description: "學習如何將專案部署到雲端，建立穩定可靠的維運機制。",
    topics: ["雲端部署", "網路配置", "維運管理"],
    details: [
      "Docker 容器化技術與最佳實踐",
      "雲端平台選擇與部署策略 (AWS, GCP, Azure)",
      "CI/CD 自動化流程建立",
      "網路安全與 HTTPS 配置",
      "監控、日誌與效能優化",
    ],
  },
];

export default function CoursePage() {
  const [scheduleData, setScheduleData] = useState([]);
  const [leftColWidth, setLeftColWidth] = useState("150px");

  useEffect(() => {
    fetch("/data/schedule.json")
      .then((res) => res.json())
      .then((data) => setScheduleData(data.scheduleData));
  }, []);

  useEffect(() => {
    const update = () => {
      setLeftColWidth(window.innerWidth >= 768 ? "150px" : "80px");
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div className="min-h-screen">

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pb-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="mb-3 flex justify-center">
              <span className="section-eyebrow">COURSES // 課程內容</span>
            </div>
            <h1 className="section-title text-4xl lg:text-6xl font-bold mb-6">
              完整的學習體驗
            </h1>
            <p className="text-foreground/70 text-lg lg:text-xl max-w-3xl mx-auto">
              四天三夜密集訓練，從基礎理論到實際應用，
              <br className="hidden md:block" />
              打造全方位的 AI 應用開發能力
            </p>
          </div>

          {/* Course Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            {courses.map((course, idx) => {
              const Icon = course.icon;
              return (
                <Card
                  key={idx}
                  className="neon-card rounded-2xl p-8 transition-all hover:scale-[1.02] flex flex-col"
                >
                  <div className="w-16 h-16 rounded-2xl bg-[oklch(0.75_0.15_85)]/12 flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-[oklch(0.55_0.15_85)]" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{course.title}</h3>
                  <p className="text-foreground/70 mb-6">{course.description}</p>

                  <div className="space-y-3 mb-6 flex-1">
                    {course.details.map((detail, detailIdx) => (
                      <div key={detailIdx} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.55_0.15_85)] shrink-0 mt-2"></span>
                        <span className="text-sm text-foreground/80">{detail}</span>
                      </div>
                    ))}
                  </div>

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
                </Card>
              );
            })}
          </div>

          {/* Learning Outcomes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            <Card className="neon-card rounded-2xl p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-[oklch(0.75_0.15_85)]/12 flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-[oklch(0.55_0.15_85)]" />
              </div>
              <h3 className="text-xl font-bold mb-2">實戰導向</h3>
              <p className="text-foreground/70 text-sm">
                每個主題都包含實際操作，從做中學習最有效
              </p>
            </Card>

            <Card className="neon-card rounded-2xl p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-[oklch(0.75_0.15_85)]/12 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-[oklch(0.55_0.15_85)]" />
              </div>
              <h3 className="text-xl font-bold mb-2">密集訓練</h3>
              <p className="text-foreground/70 text-sm">
                四天三夜全方位學習，快速建立完整知識體系
              </p>
            </Card>

            <Card className="neon-card rounded-2xl p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-[oklch(0.75_0.15_85)]/12 flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-[oklch(0.55_0.15_85)]" />
              </div>
              <h3 className="text-xl font-bold mb-2">專業講師</h3>
              <p className="text-foreground/70 text-sm">
                業界經驗豐富的講師團隊，分享實務技巧
              </p>
            </Card>
          </div>

          {/* Schedule */}
          <div className="mb-12">
            <div className="text-center mb-16">
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

            {/* Schedule table - unified responsive design */}
            <div className="max-w-6xl mx-auto">
              <div className="flex gap-4">
                {/* Fixed time column */}
                <div className="flex-shrink-0" style={{ width: leftColWidth }}>
                  <div className="mb-4 h-[60px]"></div>
                  {scheduleData[0]?.slots.map((slot, slotIdx) => (
                    <div
                      key={slotIdx}
                      className="text-sm md:text-base font-semibold text-white py-3 px-2 md:py-4 md:px-4 mb-4 flex items-center justify-center text-center h-16 md:h-24"
                    >
                      {slot.time}
                    </div>
                  ))}
                </div>

                {/* Days container - scrollable on mobile, full width on desktop */}
                <div className="flex-1 overflow-x-auto lg:overflow-x-visible scrollbar-hide relative">
                  {/* Left fade overlay - only on mobile */}
                  <div className="lg:hidden absolute left-0 top-0 bottom-0 w-48 bg-gradient-to-r from-[hsl(var(--background))] via-[hsl(var(--background))]/70 via-[hsl(var(--background))]/40 to-transparent pointer-events-none z-10"></div>
                  {/* Right fade overlay - only on mobile */}
                  <div className="lg:hidden absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-[hsl(var(--background))] via-[hsl(var(--background))]/70 via-[hsl(var(--background))]/40 to-transparent pointer-events-none z-10"></div>

                  <div className="min-w-max lg:min-w-0 lg:w-full">
                    {/* Day headers */}
                    <div className="flex gap-4 mb-4">
                      {scheduleData.map((day, idx) => (
                        <div key={idx} className="text-center flex-1" style={{ minWidth: '200px' }}>
                          <div className="font-bold text-lg md:text-xl">{day.day}</div>
                          <div className="text-sm md:text-base text-foreground/60">{day.date}</div>
                        </div>
                      ))}
                    </div>

                    {/* Schedule rows */}
                    {scheduleData[0]?.slots.map((_, slotIdx) => (
                      <div key={slotIdx} className="flex gap-4 mb-4">
                        {scheduleData.map((day, dayIdx) => (
                          <Card
                            key={dayIdx}
                            className="neon-card rounded-2xl p-3 md:p-5 bg-card h-16 md:h-24 flex items-center justify-center text-center transition-all hover:shadow-lg hover:shadow-[oklch(0.75_0.15_85)]/10 hover:-translate-y-0.5 flex-1"
                            style={{ minWidth: '200px' }}
                          >
                            <p className="text-xs md:text-sm font-semibold text-foreground leading-tight">
                              {day.slots[slotIdx]?.activity || "-"}
                            </p>
                          </Card>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
