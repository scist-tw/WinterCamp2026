"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import Image from "next/image";

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
    <section className="min-h-screen flex flex-col items-center justify-center px-6 lg:px-12 pt-12 pb-45 relative font-front">
      <div className="max-w-4xl text-center space-y-12 relative z-10">
        <div className="space-y-6">
          <div className="text-sm flex justify-center">
            <span className="section-eyebrow">WINTER CAMP // 閃電四連編</span>
          </div>
          <h1 className="text-2xl lg:text-4xl font-bold tracking-tight">
            SCIST x SCAICT 2026 聯合寒訓
          </h1>
          <br />
          <div className="flex items-center justify-center">
            <Image
              src="/assets/images/banner.png"
              alt="閃電四連編"
              width={300}
              height={150}
              priority
              fetchPriority="high"
              sizes="(max-width: 768px) 100vw, 512px"
              className="w-full max-w-lg h-auto"
              unoptimized
            />
          </div>
          <br />
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 bg-muted text-foreground/80 rounded-lg px-3 py-2">
              <MapPin className="w-4 h-4" />
              <span className="text-lg">國立成功大學電機工程學系</span>
            </div>
          </div>
          <div className="relative">
            <div className="grid grid-cols-4 gap-4 lg:gap-6 p-8 bg-linear-to-br from-card to-muted border border-[oklch(0.75_0.15_85)]/20 rounded-3xl">
              <div className="flex flex-col items-center justify-center">
                <div className="text-4xl lg:text-6xl font-black text-[oklch(0.75_0.15_85)]">
                  {days}
                </div>
                <div className="text-sm text-foreground/70 mt-2 font-medium">
                  天
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="text-4xl lg:text-6xl font-black text-[oklch(0.75_0.15_85)]">
                  {hours}
                </div>
                <div className="text-sm text-foreground/70 mt-2 font-medium">
                  時
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="text-4xl lg:text-6xl font-black text-[oklch(0.75_0.15_85)]">
                  {minutes}
                </div>
                <div className="text-sm text-foreground/70 mt-2 font-medium">
                  分
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="text-4xl lg:text-6xl font-black text-[oklch(0.75_0.15_85)]">
                  {seconds}
                </div>
                <div className="text-sm text-foreground/70 mt-2 font-medium">
                  秒
                </div>
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
                  window.open("https://forms.gle/vKVbDr45aDBkoM3i6", "_blank")
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
      </div>
    </section>
  );
}
