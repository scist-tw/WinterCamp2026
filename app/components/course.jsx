"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { BookOpen, Globe, Cpu, Users, Calendar } from "lucide-react";

const courses = [
  {
    icon: Cpu,
    title: "LLM 基礎與應用架構",
    description: "從基礎概念到實際應用，學習如何串接多模型 API，建立智能應用系統。",
    topics: ["LLM 基礎", "多模型 API", "應用架構"],
  },
  {
    icon: Globe,
    title: "多平台 UI 概述",
    description: "掌握不同平台的介面設計與實作，從 Web 到 Discord Bot 都能輕鬆上手。",
    topics: ["Web UI", "Discord Bot", "API 設計"],
  },
  {
    icon: BookOpen,
    title: "雲端網路維運",
    description: "學習如何將專案部署到雲端，建立穩定可靠的維運機制。",
    topics: ["雲端部署", "網路配置", "維運管理"],
  },
];

export default function Course() {
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
    <section id="course" className="py-20 lg:py-32 px-6 lg:px-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-[oklch(0.75_0.15_85)] opacity-3 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-3">
            <span className="section-eyebrow">COURSE // 課程內容</span>
          </div>
          <h2 className="section-title text-4xl lg:text-5xl font-black">課程內容</h2>
          <p className="text-foreground/70 text-lg max-w-3xl mx-auto mt-4 leading-relaxed">
            從 LLM 基礎到多平台應用，再到雲端部署維運，<br />
            四天三夜帶你完整掌握現代 AI 應用開發流程
          </p>
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

        <div className="relative group mb-20">
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

          <div className="overflow-x-auto">
            <div className="inline-block min-w-full">
              <div
                className="grid gap-4 mb-4"
                style={{
                  gridTemplateColumns: `${leftColWidth} repeat(${
                    scheduleData.length || 1
                  }, 1fr)`,
                }}
              >
                <div className="font-semibold text-foreground/60 text-sm py-2 px-2 md:py-4 md:px-0">
                </div>
                {scheduleData.map((day, idx) => (
                  <div key={idx} className="text-center">
                    <div className="font-bold text-lg">{day.day}</div>
                    <div className="text-sm text-foreground/60">{day.date}</div>
                  </div>
                ))}
              </div>

              {scheduleData[0]?.slots.map((_, slotIdx) => (
                <div
                  key={slotIdx}
                  className="grid gap-4 mb-4"
                  style={{
                    gridTemplateColumns: `${leftColWidth} repeat(${scheduleData.length}, 1fr)`,
                  }}
                >
                  <div className="text-sm font-semibold text-foreground/70 py-2 px-2 md:py-4 md:px-4">
                    {scheduleData[0].slots[slotIdx].time}
                  </div>
                  {scheduleData.map((day, dayIdx) => (
                    <Card
                      key={dayIdx}
                      className="neon-card rounded-2xl p-2 md:p-4 bg-card min-h-12 md:min-h-20 flex items-center justify-center text-center transition-shadow"
                    >
                      <p className="text-xs md:text-sm font-semibold text-foreground">
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
    </section>
  );
}
