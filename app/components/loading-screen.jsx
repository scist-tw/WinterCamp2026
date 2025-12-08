"use client";

import { useState, useEffect } from "react";

const FONTS = [
  "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700;900&display=swap",
  "https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap",
  "https://font.emtech.cc/css/GenJyuuGothicX?display=swap",
  "https://font.emtech.cc/css/ChenYuLuoYan?display=swap",
];

// 有趣的程式/科技冷知識/ps如果你看到這段註解代表你也是個程式設計師XD
const FUN_FACTS = [
  "Python 的名字不是來自蟒蛇，而是致敬喜劇團體 Monty Python ",
  "第一個電腦 Bug 是一隻真正的飛蛾，卡在 Harvard Mark II 電腦裡 ",
  "JavaScript 只花了 10 天就被發明出來 ",
  "Git 是 Linus Torvalds 因為不爽其他版控系統而創造的 ",
  "第一個網站至今仍在運行：info.cern.ch ",
  "「Hello, World!」程式起源於 1972 年的 C 語言教學 ",
  "Wi-Fi 不是任何東西的縮寫，只是個品牌名稱 ",
  "NASA 的太空梭程式碼只有約 40 萬行，而現代汽車有上億行 ",
  "第一個程式設計師是女性：Ada Lovelace ",
  "Linux 企鵝叫 Tux，因為 Linus 曾被企鵝咬過 ",
  "早期的滑鼠是木頭做的 ",
  "程式碼註解 // TODO 的數量總是比完成的多 ",
  "Stack Overflow 拯救了無數工程師的人生 ",
  "全世界約有 2700 萬名軟體開發者 ",
  "CAPTCHA 的全名是「Completely Automated Public Turing test」",
];

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);
  const [funFact, setFunFact] = useState("");

  useEffect(() => {
    setFunFact(FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)]);
    
    let fontsLoaded = 0;
    
    FONTS.forEach((url) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = url;
      link.onload = () => {
        fontsLoaded++;
        setProgress(Math.round((fontsLoaded / FONTS.length) * 100));
      };
      link.onerror = () => {
        fontsLoaded++;
        setProgress(Math.round((fontsLoaded / FONTS.length) * 100));
      };
      document.head.appendChild(link);
    });

    const checkReady = async () => {
      try {
        await document.fonts.ready;
      } catch (e) {
      }
      
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => setIsLoading(false), 400);
      }, 200);
    };

    const minTime = setTimeout(checkReady, 600);
    
    const maxTime = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setIsLoading(false), 400);
    }, 4000);

    return () => {
      clearTimeout(minTime);
      clearTimeout(maxTime);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#1a1a1a] flex flex-col items-center justify-center transition-opacity duration-400 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="relative mb-8">
        <svg
          className="w-16 h-16 text-[#d4a855] animate-pulse"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
        
        <div className="absolute inset-0 w-16 h-16 bg-[#d4a855] rounded-full blur-xl opacity-30 animate-ping" />
      </div>

      <div className="text-center px-6" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
        <h2 className="text-xl font-bold text-white mb-2">
          SCIST x SCAICT 2026
        </h2>
        <p className="text-white/60 text-sm mb-6">載入中 {progress}%</p>
        
        <p className="text-white/50 text-xs max-w-xs mx-auto leading-relaxed">
          💡 {funFact}
        </p>
      </div>

      <div className="mt-8 w-48 h-1 bg-[#333] rounded-full overflow-hidden">
        <div 
          className="h-full bg-[#d4a855] rounded-full transition-all duration-300"
          style={{ width: `${Math.max(progress, 10)}%` }}
        />
      </div>
    </div>
  );
}
