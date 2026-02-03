"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [messages, setMessages] = useState([]);
  const [shaking, setShaking] = useState(false);
  const [flagShown, setFlagShown] = useState(false);
  const idRef = useRef(1);

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

  const addMessage = (text, persist = false) => {
    const id = idRef.current++;
    const left = Math.random() * 70 + 10; // percent
    const top = Math.random() * 60 + 10; // percent
    // 只保留一個訊息
    setMessages([{ id, text, left, top }]);

    // 若非永久訊息，設定自動移除；若為永久訊息則不移除
    if (!persist) {
      const duration = 1000;
      setTimeout(() => {
        setMessages((prev) => prev.filter((m) => m.id !== id));
      }, duration);
    }
  };

  const handleBannerClick = () => {
    if (flagShown) {
      const flagText = "Flag{w3b5!t3_M30w}";

      // 先嘗試現代 clipboard API，失敗則使用傳統 textarea+execCommand 的 fallback
      (async () => {
        try {
          if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(flagText);
            addMessage("已複製 flag！");
            return;
          }
        } catch (e) {
          // 若現代 API 有錯，繼續走 fallback
        }

        // 傳統 fallback
        if (typeof document !== "undefined") {
          try {
            const ta = document.createElement("textarea");
            ta.value = flagText;
            // 避免畫面跳動
            ta.style.position = "fixed";
            ta.style.left = "-9999px";
            document.body.appendChild(ta);
            ta.select();
            const ok = document.execCommand("copy");
            document.body.removeChild(ta);
            if (ok) addMessage("已複製 flag！");
            else addMessage("複製失敗");
            return;
          } catch (e) {
            addMessage("複製失敗");
            return;
          }
        }

        addMessage("複製不支援");
      })();

      return;
    }

    setClickCount((prev) => {
      const next = prev + 1;


      if (next >= 20) {
        setFlagShown(true);
        addMessage("Flag{w3b5!t3_M30w}", true);
        return 20;
      }

      const pool = ["喵", "阿", "痛!", "-w-", "QQ", "awa", "不要再點啦", "嗚嗚", "救命", "Σ(っ °Д °;)っ", "ಥ_ಥ", "(>_<)", "QAQ", "TAT", "ಥ﹏ಥ", "QwQ"];
      const txt = pool[Math.floor(Math.random() * pool.length)];
      addMessage(txt);

      setShaking(true);
      setTimeout(() => setShaking(false), 260);

      return next;
    });
  };

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
          <div className="text-sm lg:text-base text-foreground/70 font-medium">
              2026 年 2 月 5 日 &nbsp;-&nbsp; 2 月 8 日
          </div>
          <br />
          <div className="flex items-center justify-center w-full px-4">
            <div
              className="w-full max-w-2xl aspect-video relative cursor-pointer"
              role="button"
              tabIndex={0}
              onClick={handleBannerClick}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleBannerClick(); }}
              aria-label="點擊 banner 互動"
              style={{ transform: shaking ? 'translateY(-6px) rotate(-2deg)' : 'translateY(0)', transition: 'transform 160ms' }}
            >
              <Image
                src="/assets/images/banner.webp"
                alt="閃電四連編"
                fill
                priority
                fetchPriority="high"
                sizes="1024px"
                className="object-contain w-full h-full"
              />

              {/* floating messages */}
              {messages.map((m) => (
                <div
                  key={m.id}
                  style={{ left: `${m.left}%`, top: `${m.top}%` }}
                  className="pointer-events-none absolute px-3 py-1 bg-foreground/90 text-background rounded-full text-sm font-medium transform -translate-y-2 opacity-90"
                >
                  {m.text}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-3">
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
        </div>
      </div>
      <br />
    </section>
  );
}
