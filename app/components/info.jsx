"use client";

import { Card } from "@/components/ui/card";
import { AlertCircle, Users, Calendar, CheckCircle } from "lucide-react";

const infoItems = [
  {
    icon: Users,
    title: "招收對象",
    description: "對資訊有興趣的高中職學生",
  },
  {
    icon: Calendar,
    title: "營隊時間",
    description: "四天三夜密集訓練",
  },
  {
    icon: CheckCircle,
    title: "課程內容",
    description: "從基礎到進階的完整資訊課程",
  },
];

const notices = [
  "報名後將於 2026/1/10 前以 Email 通知錄取結果",
  "費用包含住宿、餐點、教材及保險",
  "早鳥優惠截止日期為 2025/12/31",
  "請確保報名資料正確，以便後續聯繫",
];

export default function Info() {
  return (
    <section className="py-20 lg:py-32 bg-muted px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold">營隊資訊</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {infoItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card
                key={idx}
                className="border border-border rounded-2xl p-6 bg-background hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[oklch(0.55_0.15_85)]/10 flex items-center justify-center">
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

        <Card className="border border-border rounded-2xl p-6 lg:p-8 bg-background">
          <div className="flex items-start gap-3 mb-4">
            <AlertCircle className="w-6 h-6 text-[oklch(0.55_0.15_85)] flex-shrink-0 mt-1" />
            <h3 className="text-xl lg:text-2xl font-bold">注意事項</h3>
          </div>
          <ul className="space-y-3">
            {notices.map((notice, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-foreground/70"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.55_0.15_85)] flex-shrink-0 mt-2"></span>
                <span>{notice}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  );
}
