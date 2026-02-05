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

const refundPolicies = [
  {
    period: "1/22 23:59 前",
    title: "全額退費",
    detail: "於此時段內取消可獲得全額退費（含活動費與住宿費）。"
  },
  {
    period: "1/23 00:00 - 1/30 23:59",
    title: "部分退費（扣除住宿後退還 70%）",
    detail:
      "於此期間申請退費，先扣除實際住宿費，再將剩餘款項退還 70%。範例：若總付款為 NT$4,000，住宿費為 NT$1,000 → 剩餘 NT$3,000，退還 70% × 3,000 = NT$2,100。"
  },
  {
    period: "1/30 00:00 起",
    title: "不退費",
    detail: "活動開始後不接受退費申請。"
  }
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
            {refundPolicies.map((p, idx) => (
              <li key={idx} className="flex items-start gap-3 text-foreground/70">
                <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.55_0.15_85)] shrink-0 mt-2"></span>
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="font-semibold">{p.period}</span>
                    <span className="text-sm text-foreground/80">{p.title}</span>
                  </div>
                  <p className="text-sm mt-1">{p.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  );
}
