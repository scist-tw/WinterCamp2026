"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function RouteScrollTop() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    // 路由變更時跳到頁首
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}
