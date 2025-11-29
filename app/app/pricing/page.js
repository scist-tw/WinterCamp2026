"use client";

import { Card } from "@/components/ui/card";
import { Users, Calendar, MapPin, Clock, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { safeWindowOpen } from "@/lib/security";

export default function PricingPage() {
  const [faqs, setFaqs] = useState([]);
  const [loadingFaqs, setLoadingFaqs] = useState(true);
  const [faqError, setFaqError] = useState(null);

  useEffect(() => {
    let active = true;
    fetch("/data/faq.json")
      .then((res) => {
        if (!res.ok) throw new Error("FAQ 資料載入失敗");
        return res.json();
      })
      .then((data) => {
        if (active) {
          setFaqs(Array.isArray(data.faqs) ? data.faqs : []);
          setLoadingFaqs(false);
        }
      })
      .catch((err) => {
        if (active) {
          setFaqError(err.message);
          setLoadingFaqs(false);
        }
      });
    return () => {
      active = false;
    };
  }, []);

  
  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section className="pt-32 pb-20 lg:pb-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="mb-3 flex justify-center">
              <span className="section-eyebrow">REGISTRATION // 報名資訊</span>
            </div>
            <h1 className="section-title text-4xl lg:text-6xl font-bold mb-6">
              報名資訊
            </h1>
            <p className="text-foreground/70 text-lg lg:text-xl max-w-3xl mx-auto">
              SCIST x SCAICT 2026 聯合寒訓
              <br className="hidden md:block" />
              四天三夜密集訓練，開啟你的 AI 應用開發之旅
            </p>
          </div>

          {/* Event Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <Card className="neon-card rounded-2xl p-8 bg-background">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-[oklch(0.75_0.15_85)]/12 flex items-center justify-center shrink-0">
                  <Calendar className="w-6 h-6 text-[oklch(0.55_0.15_85)]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">活動時間</h3>
                  <p className="text-foreground/70 text-lg mb-1">2026/02/05 (四) ~ 02/08 (日)</p>
                  <p className="text-foreground/60 text-sm">四天三夜完整課程</p>
                </div>
              </div>
            </Card>

            <Card className="neon-card rounded-2xl p-8 bg-background">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-[oklch(0.75_0.15_85)]/12 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-[oklch(0.55_0.15_85)]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">活動地點</h3>
                  <p className="text-foreground/70 text-lg mb-1">國立成功大學</p>
                  <p className="text-foreground/60 text-sm">電機工程學系</p>
                </div>
              </div>
            </Card>

            <Card className="neon-card rounded-2xl p-8 bg-background">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-[oklch(0.75_0.15_85)]/12 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-[oklch(0.55_0.15_85)]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">報名期間</h3>
                  <p className="text-foreground/70 text-lg mb-1">即日起至 2026/01/04 (日)</p>
                  <p className="text-foreground/60 text-sm">早鳥優惠至 12/14 23:59</p>
                </div>
              </div>
            </Card>

            <Card className="neon-card rounded-2xl p-8 bg-background">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-[oklch(0.75_0.15_85)]/12 flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6 text-[oklch(0.55_0.15_85)]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">招收對象</h3>
                  <p className="text-foreground/70 text-lg mb-1">全臺學生</p>
                  <p className="text-foreground/60 text-sm">不限年級，對 AI 應用有興趣即可</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Pricing Table */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">報名費用</h2>
              <p className="text-foreground/70 text-lg">
                包含四天三夜住宿、餐飲、課程教材與講師費用
              </p>
            </div>

            <Card className="neon-card rounded-2xl p-8 lg:p-12 bg-background max-w-3xl mx-auto">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-6 border-b border-[oklch(0.75_0.15_85)]/20">
                  <div>
                    <h3 className="text-xl font-bold mb-1">早鳥優惠</h3>
                    <p className="text-foreground/60 text-sm">即日起至 12/14 23:59</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-black text-[oklch(0.75_0.15_85)]">$4,300</div>
                    <div className="text-foreground/60 text-sm">/ 人</div>
                  </div>
                </div>

                <div className="flex items-center justify-between pb-6 border-b border-[oklch(0.75_0.15_85)]/20">
                  <div>
                    <h3 className="text-xl font-bold mb-1">單人報名</h3>
                    <p className="text-foreground/60 text-sm">一般報名價格</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-black text-foreground">$4,500</div>
                    <div className="text-foreground/60 text-sm">/ 人</div>
                  </div>
                </div>

                <div className="flex items-center justify-between pb-6 border-b border-[oklch(0.75_0.15_85)]/20">
                  <div>
                    <h3 className="text-xl font-bold mb-1">雙人團報</h3>
                    <p className="text-foreground/60 text-sm">2 人一起報名</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-black text-foreground">$4,200</div>
                    <div className="text-foreground/60 text-sm">/ 人</div>
                  </div>
                </div>

                <div className="flex items-center justify-between pb-6 border-b border-[oklch(0.75_0.15_85)]/20">
                  <div>
                    <h3 className="text-xl font-bold mb-1">三人團報</h3>
                    <p className="text-foreground/60 text-sm">3 人一起報名</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-black text-foreground">$4,100</div>
                    <div className="text-foreground/60 text-sm">/ 人</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-1">四人以上團報</h3>
                    <p className="text-foreground/60 text-sm">4 人以上一起報名</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-black text-foreground">$4,000</div>
                    <div className="text-foreground/60 text-sm">/ 人</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-[oklch(0.75_0.15_85)]/5 rounded-xl border border-[oklch(0.75_0.15_85)]/20">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-[oklch(0.55_0.15_85)] shrink-0 mt-0.5" />
                  <div className="text-sm text-foreground/70">
                    <p className="font-semibold text-foreground mb-2">費用包含</p>
                    <ul className="space-y-1">
                      <li>• 四天三夜完整課程</li>
                      <li>• 住宿與所有餐飲</li>
                      <li>• 學習教材與工具</li>
                      <li>• 專業講師指導</li>
                      <li>• 結業證書</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </div>


          {/* FAQs */}
          <div className="mb-12" id="faq-section">
            <div className="text-center mb-12">
              <div className="mb-3 flex justify-center">
                <span className="section-eyebrow">FAQ // 常見問題</span>
              </div>
              <h2 className="section-title text-3xl lg:text-5xl font-bold mb-4">
                常見問題解答
              </h2>
              <p className="text-foreground/60 text-sm max-w-xl mx-auto">
                以下為常見提問，若仍有疑問歡迎透過聯絡方式詢問。
              </p>
            </div>

            {loadingFaqs && (
              <div className="text-center text-foreground/60">載入中...</div>
            )}
            {faqError && (
              <div className="text-center text-red-500 text-sm">{faqError}</div>
            )}

            {!loadingFaqs && !faqError && faqs.length === 0 && (
              <div className="text-center text-foreground/60 text-sm">
                目前沒有常見問題資料。
              </div>
            )}

            {!loadingFaqs && !faqError && faqs.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {faqs.map((faq, idx) => (
                  <Card
                    key={idx}
                    className="neon-card rounded-2xl p-6 bg-background hover:border-[oklch(0.75_0.15_85)]/40 transition-colors"
                  >
                    <h3 className="font-bold text-lg mb-3 text-[oklch(0.75_0.15_85)]">
                      {faq.question}
                    </h3>
                    <p className="text-foreground/70 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* CTA */}
          <Card className="neon-card rounded-2xl p-8 lg:p-12 text-center bg-linear-to-br from-[oklch(0.75_0.15_85)]/5 to-background">
            <h2 className="text-2xl lg:text-3xl font-bold mb-3">
              立即報名參加
            </h2>
            <p className="text-foreground/70 mb-6">
              名額有限，把握機會！
            </p>
            <button
              onClick={() =>
                safeWindowOpen("https://forms.gle/vKVbDr45aDBkoM3i6")
              }
              className="inline-block bg-linear-to-r from-[oklch(0.75_0.15_85)] to-[oklch(0.8_0.18_85)] hover:from-[oklch(0.8_0.18_85)] hover:to-[oklch(0.75_0.15_85)] text-black rounded-full px-10 py-3 font-bold transition-all transform hover:scale-105"
            >
              前往報名表單
            </button>
          </Card>
        </div>
      </section>
    </div>
  );
}
