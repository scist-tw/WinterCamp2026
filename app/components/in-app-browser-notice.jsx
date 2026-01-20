"use client";

import { useEffect, useState } from "react";

const IN_APP_UA_REGEX =
  /(FBAN|FBAV|FB_IAB|FB4A|FB4i|Instagram|Line|Messenger|Twitter|TikTok|Snapchat)/i;
const WEBVIEW_REGEX = /(wv|WebView)/i;

function isInAppBrowser() {
  if (typeof window === "undefined") return false;
  const ua = navigator.userAgent || navigator.vendor || "";
  return IN_APP_UA_REGEX.test(ua) || WEBVIEW_REGEX.test(ua);
}

export default function InAppBrowserNotice() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isInAppBrowser()) {
      setOpen(true);
    }
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative w-full max-w-md rounded-2xl border border-primary/30 bg-card/95 p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)]">
        <p className="text-xs font-semibold tracking-[0.35em] text-primary">
          NOTICE
        </p>
        <h2 className="mt-3 text-xl font-semibold text-foreground">
          內建瀏覽器可能造成網頁失效
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          目前發現 IG / FB 等內建瀏覽器會有網頁失效問題。建議改用外部瀏覽器
          （Safari / Chrome）開啟。
        </p>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            onClick={() => setOpen(false)}
          >
            我知道了
          </button>
          <span className="text-xs text-muted-foreground sm:self-center">
            可從右上角選單選擇「在瀏覽器開啟」
          </span>
        </div>
      </div>
    </div>
  );
}
