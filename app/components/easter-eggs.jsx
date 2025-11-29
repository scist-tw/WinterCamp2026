"use client";

import { useEffect, useState } from "react";

export default function EasterEggs() {
  const [konamiProgress, setKonamiProgress] = useState(0);
  const [showSecret, setShowSecret] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  // Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
  const konamiCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ];

  useEffect(() => {
    const handleKeyPress = (e) => {
      const key = e.key.toLowerCase();

      // 檢查 Konami Code
      if (key === konamiCode[konamiProgress].toLowerCase()) {
        const newProgress = konamiProgress + 1;
        setKonamiProgress(newProgress);

        if (newProgress === konamiCode.length) {
          // Konami Code 完成！
          activateKonamiMode();
          setKonamiProgress(0);
        }
      } else {
        setKonamiProgress(0);
      }

      // 按 ESC 關閉秘密訊息
      if (e.key === "Escape") {
        setShowSecret(false);
        setShowConfetti(false);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [konamiProgress]);

  const activateKonamiMode = () => {
    setShowSecret(true);
    setShowConfetti(true);

    // 播放成功音效（如果可以）
    try {
      const audio = new Audio("data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGGS45+eXSwkNUKzn7bllHAU2jdXvzHkpBSh+x+/dj0AKElyx6OmnUxEKRp/f8r1rIAUrlMvv2ogzBxdmsObll0kJDU+q5+24ZBsENo3U7s15KQUme8jr3I4+CRJcrujopVIRCkSb3vK8aiAEKI/J79qINQcXY7zl5ZdJCQ1Pat/ttzEFNY3T7s15KQOJPL5lHAU4jdTtzXkpBSV6x+vbiz0IEl2w5+ikURUKQ5nb8btpHwQnksju2IYzBxZhtOPll0gIDU6p5eq0YRsENo3S7M15KQYme8fp2ow9CRFbr+fnpVIRCUOZ2/G7ahwEJ47H79iHMQYWY7Tj5ZZICw5Nqd/rtl4fBDSL0evNeSkGJnnE6dqMPAgRXK3m56RSEQpDmNjxu2scBCeNxu3ahzIHFWKy4uOUSwsMT6jd67dgGgQzi9HqzHcnBSV5w+jaizsHEl2t5eakUREIQpjX8bpqGwQmjMXs2oc0BhVhseLjkkoLDE6n3Oq2XhoEMorP6sx2JgUkd8Ln2Yk7BxFdrOTmpFARCUKY1/C6aRsEJYvE7NqHMgQVYLDh45JKCwxOp9vptl4aBS+Jzun");
      audio.play().catch(() => {}); // 忽略錯誤
    } catch (e) {}

    // 5 秒後自動關閉
    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
  };

  // Logo 連點彩蛋
  const handleLogoClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount === 10) {
      alert("🎉 恭喜發現連點彩蛋！你已經點擊 Logo 10 次了！\n\n彩蛋提示：試試看輸入 Konami Code...\n↑ ↑ ↓ ↓ ← → ← → B A");
      setClickCount(0);
    }

    // 5 秒後重置計數
    setTimeout(() => {
      setClickCount(0);
    }, 5000);
  };

  // 監聽 Logo 點擊（使用事件委派）
  useEffect(() => {
    const handleClick = (e) => {
      // 檢查是否點擊 Logo 區域
      const logo = e.target.closest('a[href="/"]');
      if (logo && logo.querySelector('svg, img')) {
        handleLogoClick();
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [clickCount]);

  return (
    <>
      {/* Konami Code 秘密訊息 */}
      {showSecret && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setShowSecret(false)}
        >
          <div className="max-w-2xl text-center space-y-6 animate-scaleIn">
            <div className="text-6xl mb-4">🎮✨🎉</div>
            <h2 className="text-4xl lg:text-6xl font-black text-[oklch(0.75_0.15_85)] mb-4">
              恭喜發現 Konami Code！
            </h2>
            <p className="text-xl text-white/90 leading-relaxed">
              你找到了隱藏的彩蛋！🎊
              <br />
              <br />
              這是一個經典的遊戲秘技，源自 1986 年的《魂斗羅》。
              <br />
              <br />
              感謝你對細節的關注！
              <br />
              希望你在寒訓中也能發現更多有趣的事物！
            </p>
            <div className="text-sm text-white/60 mt-8">
              按 ESC 或點擊任意處關閉
            </div>
          </div>
        </div>
      )}

      {/* 五彩紙屑效果 */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-[9998]">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                backgroundColor: [
                  "oklch(0.75 0.15 85)",
                  "oklch(0.7 0.2 140)",
                  "oklch(0.8 0.15 200)",
                  "oklch(0.75 0.18 280)",
                  "oklch(0.8 0.2 340)",
                ][Math.floor(Math.random() * 5)],
              }}
            />
          ))}
        </div>
      )}

      {/* Konami Code 進度提示（開發用，可選） */}
      {konamiProgress > 0 && konamiProgress < konamiCode.length && (
        <div className="fixed bottom-4 right-4 bg-black/80 text-white px-4 py-2 rounded-lg text-sm z-50 animate-fadeIn">
          Konami Code: {konamiProgress}/{konamiCode.length}
        </div>
      )}

      <style jsx>{`
        @keyframes confettiFall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes scaleIn {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .confetti {
          position: absolute;
          width: 10px;
          height: 10px;
          top: -10px;
          animation: confettiFall 3s linear forwards;
        }

        .animate-scaleIn {
          animation: scaleIn 0.5s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
