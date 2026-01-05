"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "早鳥優惠",
    price: "4,300",
    description: "即日至 12/14 23:59（含住宿）",
    highlight: true,
  },
  {
    name: "單人報名",
    price: "4,500",
    description: "一般報名價格（含住宿）",
  },
  {
    name: "雙人團報",
    price: "4,200",
    description: "每人價格（含住宿）",
  },
  {
    name: "三人團報",
    price: "4,100",
    description: "每人價格（含住宿）",
  },
  {
    name: "四人團報",
    price: "4,000",
    description: "每人價格（含住宿）",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 lg:py-32 px-6 lg:px-12 text-center relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16">
          <div className="mb-3 flex justify-center">
            <span className="section-eyebrow">PRICING // 報名資訊</span>
          </div>
          <h2 className="section-title text-4xl lg:text-5xl font-black mb-6">報名資訊</h2>
          <p className="text-foreground/70 text-xl">
            越早報名越划算！團報更優惠！
          </p>
          <div className="mt-6">
            <a
              href="/pricing"
              className="inline-flex items-center gap-2 text-[oklch(0.75_0.15_85)] hover:text-[oklch(0.8_0.18_85)] font-semibold transition-colors group"
            >
              查看完整報名資訊
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 mt-8">
            <div className="neon-card rounded-2xl p-6 bg-card">
              <div className="flex items-center justify-center gap-2 mb-3">
                <CalendarDays className="w-5 h-5 text-[oklch(0.75_0.15_85)]" />
                <p className="text-sm font-bold text-[oklch(0.75_0.15_85)]">營隊日期</p>
              </div>
              <p className="text-lg font-semibold">2026/2/5(四)~2026/2/8(日)</p>
            </div>
            <div className="neon-card rounded-2xl p-6 bg-card">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-[oklch(0.75_0.15_85)]" />
                <p className="text-sm font-bold text-[oklch(0.75_0.15_85)]">報名日期</p>
              </div>
              <p className="text-lg font-semibold">即日起至 2026/1/11(日) 23:59</p>
            </div>
            <div className="neon-card rounded-2xl p-6 bg-card">
              <div className="flex items-center justify-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-[oklch(0.75_0.15_85)]" />
                <p className="text-sm font-bold text-[oklch(0.75_0.15_85)]">營隊地點</p>
              </div>
              <p className="text-lg font-semibold">國立成功大學電機工程學系</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {plans.map((plan, idx) => (
            <div key={idx} className="group relative">
              {plan.highlight && (
                <div className="absolute -inset-1 bg-linear-to-r from-[oklch(0.75_0.15_85)] to-[oklch(0.8_0.18_85)] rounded-3xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity"></div>
              )}
              <Card
                className={`
                  relative
                  rounded-3xl
                  p-6 md:p-8
                  flex flex-col items-center justify-center
                  min-h-[200px]
                  hover:shadow-2xl transition-all text-center cursor-pointer transform hover:-translate-y-2
                  ${
                    plan.highlight
                      ? "bg-linear-to-br from-[oklch(0.75_0.15_85)] to-[oklch(0.8_0.18_85)] border border-[oklch(0.8_0.18_85)] text-black"
                      : "neon-card bg-card"
                  }
                `}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-black text-[oklch(0.75_0.15_85)] px-4 py-1 rounded-full text-xs font-bold">
                    最優惠
                  </div>
                )}
                <div className="space-y-4">
                  <h3
                    className={`text-xl font-bold ${
                      plan.highlight ? "text-black" : "text-foreground"
                    }`}
                  >
                    {plan.name}
                  </h3>
                  <div className="flex flex-col items-center">
                    <div
                      className={`text-xs font-semibold mb-1 ${
                        plan.highlight ? "text-black/70" : "text-foreground/50"
                      }`}
                    >
                      NTD$
                    </div>
                    <div
                      className={`text-5xl md:text-6xl font-black tracking-tight ${
                        plan.highlight ? "text-black" : "text-[oklch(0.75_0.15_85)]"
                      }`}
                    >
                      {plan.price}
                    </div>
                  </div>
                  <p
                    className={`text-xs ${
                      plan.highlight ? "text-black/70" : "text-foreground/60"
                    }`}
                  >
                    {plan.description}
                  </p>
                </div>
              </Card>
            </div>
          ))}
        </div>

        <div className="mt-6 text-foreground/70 space-y-2">
          <p className="text-sm">
            * 註：早鳥學員無論人數皆為 NTD$4,300/人
          </p>
          <p className="text-sm">
            * 不住宿方案報名費一律再折 NTD$1,000，報名時可於表單中選擇
          </p>
          <p className="text-sm">
            報名費用已含：場地、住宿（將由營隊安排住宿）、餐飲、保險、衣服等
          </p>
        </div>
      </div>
    </section>
  );
}
