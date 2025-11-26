"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

export default function Hero() {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const targetDate = new Date("2026-02-05").getTime();
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setDays(Math.floor(distance / (1000 * 60 * 60 * 24)));
        setHours(
          Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        );
        setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
        setSeconds(Math.floor((distance % (1000 * 60)) / 1000));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 lg:px-12 py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[oklch(0.75_0.15_85)] opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[oklch(0.75_0.15_85)] opacity-5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl text-center space-y-12 relative z-10">
        <div className="space-y-6">
          <div className="flex justify-center"><span className="section-eyebrow">WINTER CAMP // 閃電四連編</span></div>
          <h1 className="text-3xl lg:text-5xl font-bold tracking-tight">
            SCIST x SCAICT 2026 聯合寒訓
          </h1>
          <div className="flex items-center justify-center">
            <h2 className="text-4xl lg:text-7xl font-black tracking-tight bg-linear-to-r from-[oklch(0.65_0.13_85)] via-[oklch(0.75_0.15_85)] to-[oklch(0.8_0.18_85)] bg-clip-text text-transparent drop-shadow-2xl">
              閃電四連編
            </h2>
          </div>
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 bg-muted text-foreground/80 rounded-lg px-3 py-2">
              <MapPin className="w-4 h-4" />
              <span className="text-lg">國立成功大學電機工程學系</span>
            </div>
          </div>

          <p className="text-lg lg:text-2xl text-foreground/90 leading-relaxed max-w-3xl mx-auto font-medium">
            想讓寒假過得更充實？想增進自己的資訊能力與技術？<br />
            想認識更多志同道合的資訊圈朋友？<br />
            <span className="text-[oklch(0.75_0.15_85)] font-bold text-2xl lg:text-3xl">那就來參加我們的聯合寒訓吧！</span>
          </p>

          <div className="relative group">
            <div className="absolute inset-0 bg-linear-to-r from-[oklch(0.75_0.15_85)] to-[oklch(0.65_0.13_85)] rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
            <div className="relative bg-linear-to-br from-card to-muted border-2 border-[oklch(0.75_0.15_85)]/30 rounded-3xl p-8 lg:p-10 space-y-4">
              <h3 className="text-2xl lg:text-3xl font-black text-[oklch(0.75_0.15_85)]">
                四天三夜，紮實做出可上線的專案
              </h3>
              <div className="space-y-3 text-base lg:text-xl text-foreground/80 leading-relaxed">
                <p>
                  從需求拆解到系統設計，從前端開發到雲端部署，帶你走過真實的產品開發流程。
                </p>
                <p>
                  我們重視團隊協作與技術深度，不空談理論，專注實作落地。
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="grid grid-cols-4 gap-4 lg:gap-6 p-8 bg-linear-to-br from-card to-muted border border-[oklch(0.75_0.15_85)]/20 rounded-3xl">
            <div className="flex flex-col items-center justify-center">
              <div className="text-4xl lg:text-6xl font-black text-[oklch(0.75_0.15_85)]">{days}</div>
              <div className="text-sm text-foreground/70 mt-2 font-medium">天</div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="text-4xl lg:text-6xl font-black text-[oklch(0.75_0.15_85)]">{hours}</div>
              <div className="text-sm text-foreground/70 mt-2 font-medium">時</div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="text-4xl lg:text-6xl font-black text-[oklch(0.75_0.15_85)]">{minutes}</div>
              <div className="text-sm text-foreground/70 mt-2 font-medium">分</div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="text-4xl lg:text-6xl font-black text-[oklch(0.75_0.15_85)]">{seconds}</div>
              <div className="text-sm text-foreground/70 mt-2 font-medium">秒</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-linear-to-r from-[oklch(0.75_0.15_85)] to-[oklch(0.8_0.18_85)] rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <Button
              size="lg"
              className="relative bg-linear-to-r from-[oklch(0.75_0.15_85)] to-[oklch(0.8_0.18_85)] hover:from-[oklch(0.8_0.18_85)] hover:to-[oklch(0.75_0.15_85)] rounded-full px-12 py-8 text-xl font-black text-black cursor-pointer transition-all transform hover:scale-105 shadow-2xl"
              onClick={() =>
                window.open(
                  "https://forms.gle/vKVbDr45aDBkoM3i6",
                  "_blank"
                )
              }
            >
              立即報名營隊
            </Button>
          </div>
          <p className="text-base text-foreground/70 font-medium">
            報名名額有限，歡迎加入一起專注做事的夥伴。
          </p>
        </div>
      </div>
    </section>
  );
}
