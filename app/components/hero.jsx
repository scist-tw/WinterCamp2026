"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Zap } from "lucide-react";

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
    <section className="min-h-screen flex flex-col items-center justify-start bg-background px-6 lg:px-12 pt-18 pb-20">
      <div className="max-w-3xl text-center space-y-12">
        <div className="space-y-6">
          <h1 className="text-3xl lg:text-5xl font-bold tracking-tight">
            SCIST x SCAICT 2026 聯合寒訓
          </h1>
          <div className="flex items-center justify-center gap-3">
            <Zap className="w-8 h-8 lg:w-10 lg:h-10 text-[oklch(0.65_0.18_85)] fill-[oklch(0.65_0.18_85)]" />
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-[oklch(0.55_0.15_85)] to-[oklch(0.65_0.18_85)] bg-clip-text text-transparent">
              閃電四連編
            </h2>
            <Zap className="w-8 h-8 lg:w-10 lg:h-10 text-[oklch(0.65_0.18_85)] fill-[oklch(0.65_0.18_85)]" />
          </div>
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 bg-muted text-foreground/80 rounded-lg px-3 py-2">
              <MapPin className="w-4 h-4" />
              <span className="text-lg">國立成功大學</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 lg:gap-6 py-8 bg-muted rounded-3xl px-6">
          <div className="flex flex-col items-center justify-center">
            <div className="text-4xl lg:text-5xl font-bold">{days}</div>
            <div className="text-sm text-foreground/60 mt-1">天</div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="text-4xl lg:text-5xl font-bold">{hours}</div>
            <div className="text-sm text-foreground/60 mt-1">時</div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="text-4xl lg:text-5xl font-bold">{minutes}</div>
            <div className="text-sm text-foreground/60 mt-1">分</div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="text-4xl lg:text-5xl font-bold">{seconds}</div>
            <div className="text-sm text-foreground/60 mt-1">秒</div>
          </div>
        </div>

        <Button
          size="lg"
          className="bg-[oklch(0.55_0.15_85)] hover:bg-[oklch(0.65_0.18_85)] rounded-full px-11 py-7 text-lg font-semibold text-black cursor-pointer transition-all hover:shadow-lg hover:shadow-[oklch(0.55_0.15_85)]/30"
          onClick={() =>
            window.open(
              "https://docs.google.com/forms/d/e/1FAIpQLSeX88997wSKQ0K8wUMT4s4x3lprJeL_Jq2xO_jDmGvnq4mQPg/viewform",
              "_blank"
            )
          }
        >
          立即報名營隊
        </Button>
      </div>
    </section>
  );
}
