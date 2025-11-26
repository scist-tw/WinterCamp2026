"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, MessageCircle, Facebook, Instagram } from "lucide-react";

const contactMethods = [
  {
    icon: Mail,
    title: "Email",
    value: "scist@scist.org",
    link: "mailto:scist@scist.org",
  },
  {
    icon: Facebook,
    title: "Facebook",
    value: "SCIST 南臺灣學生資訊社群",
    link: "https://www.facebook.com/scist.tw",
  },
  {
    icon: Instagram,
    title: "Instagram",
    value: "@scist.tw",
    link: "https://www.instagram.com/scist.tw",
  },
  {
    icon: MessageCircle,
    title: "Discord",
    value: "SCIST Community",
    link: "https://discord.gg/scist",
  },
];

export default function Contact() {
  return (
    <section className="py-20 lg:py-32 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="mb-3 flex justify-center"><span className="section-eyebrow">CONTACT // 聯絡我們</span></div>
          <h2 className="section-title text-3xl lg:text-4xl font-bold mb-4">聯絡我們</h2>
          <p className="text-foreground/70 text-lg">
            有任何問題歡迎透過以下方式聯絡我們
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {contactMethods.map((method, idx) => {
            const Icon = method.icon;
            return (
              <Card
                key={idx}
                className="neon-card rounded-2xl p-6 bg-muted transition-shadow cursor-pointer"
                onClick={() => window.open(method.link, "_blank")}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[oklch(0.55_0.15_85)]/10 flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-[oklch(0.55_0.15_85)]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-foreground/60 mb-1">
                      {method.title}
                    </h3>
                    <p className="text-base lg:text-lg font-medium">
                      {method.value}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Card className="neon-card rounded-2xl p-8 bg-muted inline-block min-w-[600px]">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-center">主辦單位</h3>
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-8">
                <div className="text-center">
                  <p className="text-lg font-semibold">SCIST</p>
                  <p className="text-sm text-foreground/70">
                    南臺灣學生資訊社群
                  </p>
                </div>
                <div className="text-2xl text-foreground/40">×</div>
                <div className="text-center">
                  <p className="text-lg font-semibold">SCAICT</p>
                  <p className="text-sm text-foreground/70">
                    學生計算機與資訊教育協會
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
