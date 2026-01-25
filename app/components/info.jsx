"use client";

import { Card } from "@/components/ui/card";
import { AlertCircle, Users, Calendar, CheckCircle } from "lucide-react";

const infoItems = [
  {
    icon: Users,
    title: "招收對象",
    description: "全臺學生（不限年級）",
  },
  {
    icon: Calendar,
    title: "營隊時間",
    description: "2026/02/05 (四) ~ 02/08 (日)",
  },
  {
    icon: CheckCircle,
    title: "住宿方式",
    description: "由營隊安排住宿，體驗完整營隊生活",
  },
];

const notices = [
  "1/22 23:59 前全額退費",
  "1/23 00:00 到 1/30 23:59 退扣除住宿費用之 70%",
  "1/30 00:00 起不退費"
];

export default function Info() {
  return (
    <section className="py-20 lg:py-32 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="mb-3 flex justify-center"><span className="section-eyebrow">INFO // 營隊資訊</span></div>
          <h2 className="section-title text-3xl lg:text-4xl font-bold">營隊資訊</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {infoItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card
                key={idx}
                className="neon-card rounded-2xl p-6 transition-shadow"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[oklch(0.75_0.15_85)]/12 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[oklch(0.55_0.15_85)]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                    <p className="text-foreground/70 text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <Card className="neon-card rounded-2xl p-6 lg:p-8">
          <div className="flex items-start gap-3 mb-4">
            <AlertCircle className="w-6 h-6 text-[oklch(0.55_0.15_85)] shrink-0 mt-1" />
            <h3 className="text-xl lg:text-2xl font-bold">退費規則</h3>
          </div>
          <ul className="space-y-3">
            {notices.map((notice, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-foreground/70"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.55_0.15_85)] shrink-0 mt-2"></span>
                <span>{notice}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  );
}
