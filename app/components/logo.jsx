"use client";
import React from "react";

export default function Logo() {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-black italic tracking-tighter uppercase whitespace-nowrap">
        閃電
        <span className="text-stroke text-transparent" style={{ WebkitTextStroke: "0.8px #E0A419" }}>
          四連編
        </span>
      </h2>
      <div className="flex flex-col">
        <span className="text-[10px] sm:text-xs text-foreground/70 pt-1 ml-1">// SCIST x SCAICT</span>
        <span className="text-xs sm:text-sm md:text-base font-black italic text-[oklch(0.75_0.15_85)] -mt-1">2026 聯合寒訓</span>
      </div>
    </div>
  );
}
