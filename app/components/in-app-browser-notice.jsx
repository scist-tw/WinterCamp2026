"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "ig-browser-notice-dismissed";

const isInstagramInApp = () => {
  if (typeof navigator === "undefined") return false;
  return /Instagram/i.test(navigator.userAgent || "");
};

export default function InAppBrowserNotice() {
  const [visible, setVisible] = useState(false);
  const [copyState, setCopyState] = useState("idle");

  useEffect(() => {
    if (!isInstagramInApp()) return;
    try {
      const dismissed = localStorage.getItem(STORAGE_KEY) === "1";
      if (!dismissed) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Ignore write failures.
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 1800);
    } catch {
      setCopyState("failed");
      window.setTimeout(() => setCopyState("idle"), 1800);
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 px-4 py-10 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-3xl border border-primary/35 bg-card/95 p-6 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.9)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/80">通知</p>
            <h2 className="mt-2 text-2xl font-semibold text-foreground">IG 內建瀏覽器可能顯示異常</h2>
          </div>
          <button
            type="button"
            onClick={handleDismiss}
            className="rounded-full border border-primary/40 px-3 py-1 text-xs font-semibold text-primary transition hover:border-primary/70 hover:text-primary"
          >
            關閉
          </button>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          為了確保報名與互動功能正常運作，建議改用外部瀏覽器（Safari / Chrome）開啟本頁。
        </p>

        <div className="mt-4 rounded-2xl border border-primary/20 bg-secondary/60 p-4 text-sm text-foreground/90">
          <p className="font-semibold text-primary">開啟方式</p>
          <ol className="mt-2 space-y-2 text-sm text-muted-foreground">
            <li>1. 點右上角「⋯」或分享按鈕</li>
            <li>2. 選擇「在瀏覽器中開啟」</li>
          </ol>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            {copyState === "copied" ? "連結已複製" : "複製連結"}
          </button>
          <button
            type="button"
            onClick={handleDismiss}
            className="rounded-full border border-primary/40 px-5 py-2 text-sm font-semibold text-foreground transition hover:border-primary/70 hover:text-primary"
          >
            我知道了
          </button>
          {copyState === "failed" && (
            <span className="self-center text-xs text-destructive">複製失敗，請手動複製網址</span>
          )}
        </div>
      </div>
    </div>
  );
}
