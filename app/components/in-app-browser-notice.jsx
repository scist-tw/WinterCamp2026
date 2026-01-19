"use client";

import { useEffect, useState } from "react";

const isInAppBrowser = () => {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  return /Instagram|Line|FBAN|FBAV|FB_IAB|FBIOS|FB4A|Messenger/i.test(ua);
};

export default function InAppBrowserNotice() {
  const [visible, setVisible] = useState(false);
  const [copyState, setCopyState] = useState("idle");

  useEffect(() => {
    if (isInAppBrowser()) setVisible(true);
  }, []);

  const handleDismiss = () => {
    setVisible(false);
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
    <div className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-3xl border border-primary/35 bg-card/95 p-5 sm:p-6 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.9)]">
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="關閉通知"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-primary/35 text-primary transition hover:border-primary/70 hover:text-primary"
        >
          <span className="text-lg leading-none">×</span>
        </button>
        <div className="flex items-start justify-between gap-4 pr-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/80">通知</p>
            <h2 className="mt-2 text-2xl font-semibold text-foreground">社群 App 內建瀏覽器可能顯示異常</h2>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          若你是從 IG / LINE / Facebook 內建瀏覽器開啟，為了確保報名與互動功能正常運作，
          建議改用外部瀏覽器（Safari / Chrome）開啟本頁。
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
            className="w-full sm:w-auto rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            {copyState === "copied" ? "連結已複製" : "複製連結"}
          </button>
          {copyState === "failed" && (
            <span className="self-center text-xs text-destructive">複製失敗，請手動複製網址</span>
          )}
        </div>
      </div>
    </div>
  );
}
