"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Award } from "lucide-react";

export default function AcceptedList() {
  return (
    <section id="pricing" className="py-20 lg:py-32 px-6 lg:px-12 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-3">
            <span className="section-eyebrow">ACCEPTED // 錄取名單</span>
          </div>
          <h2 className="section-title text-4xl lg:text-5xl font-black">錄取名單</h2>
            <p className="text-foreground/70 text-lg max-w-3xl mx-auto mt-4 leading-relaxed">
            感謝大家的踴躍報名！ 我們已完成報名審查，並選出符合資格的學員錄取參加本次寒訓。
          </p>
        </div>

        {/* Accepted List Card */}
        <div className="relative group mb-20">
          <div className="absolute inset-0 bg-linear-to-r from-[oklch(0.75_0.15_85)] to-[oklch(0.65_0.13_85)] rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
          <Card className="relative border-2 border-[oklch(0.75_0.15_85)]/30 rounded-3xl p-8 lg:p-12 bg-linear-to-br from-card via-card to-muted">
            <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
              <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-[oklch(0.75_0.15_85)]/20 to-[oklch(0.65_0.13_85)]/10 flex items-center justify-center shrink-0">
                <Award className="w-8 h-8 text-[oklch(0.75_0.15_85)]" />
              </div>
              <div className="space-y-4 flex-1">
                <h3 className="text-2xl lg:text-3xl font-black text-[oklch(0.75_0.15_85)]">
                  查看錄取名單
                </h3>
                <div className="space-y-3 text-foreground/80">
                  <p className="text-base leading-relaxed">
                    我們已完成報名審查。
                    如果你已被錄取，將收到確認通知。
                  </p>
                  <p className="text-base leading-relaxed">
                    點擊下方按鈕查看完整的錄取名單及相關資訊。
                  </p>
                </div>
                <Link
                  href="/list"
                  className="inline-flex items-center gap-2 text-[oklch(0.75_0.15_85)] hover:text-[oklch(0.8_0.18_85)] font-semibold transition-colors group mt-4"
                >
                  前往查看
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
