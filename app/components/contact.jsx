"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, MessageCircle, Facebook, Instagram } from "lucide-react";

const scistMethods = [
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
    link: "https://dc.scist.org",
  },
];

const scaictMethods = [
  {
    icon: Mail,
    title: "Email",
    value: "contact@scaict.org",
    link: "mailto:contact@scaict.org",
  },
  {
    icon: Facebook,
    title: "Facebook",
    value: "Scaict 中電會",
    link: "https://www.facebook.com/scaict.tw",
  },
  {
    icon: Instagram,
    title: "Instagram",
    value: "@scaict.tw",
    link: "https://www.instagram.com/scaict.tw",
  },
  {
    icon: MessageCircle,
    title: "Discord",
    value: "SCAICT Community",
    link: "https://dc.scaict.org",
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* SCIST 聯絡方式 */}
          <div>
            <h3 className="text-3xl font-bold mb-6 text-center lg:text-center">SCIST</h3>
            <div className="grid grid-cols-1 gap-4">
              {scistMethods.map((method, idx) => {
                const Icon = method.icon;
                return (
                  <Card
                    key={`scist-${idx}`}
                    className="neon-card rounded-2xl p-6 bg-muted transition-shadow cursor-pointer"
                    onClick={() => window.open(method.link, "_blank")}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[oklch(0.55_0.15_85)]/10 flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6 text-[oklch(0.55_0.15_85)]" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-foreground/60 mb-1">
                          {method.title}
                        </h4>
                        <p className="text-base font-medium">
                          {method.value}
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* SCAICT 聯絡方式 */}
          <div>
            <h3 className="text-3xl font-bold mb-6 text-center lg:text-center">SCAICT</h3>
            <div className="grid grid-cols-1 gap-4">
              {scaictMethods.map((method, idx) => {
                const Icon = method.icon;
                return (
                  <Card
                    key={`scaict-${idx}`}
                    className="neon-card rounded-2xl p-6 bg-muted transition-shadow cursor-pointer"
                    onClick={() => window.open(method.link, "_blank")}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[oklch(0.55_0.15_85)]/10 flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6 text-[oklch(0.55_0.15_85)]" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-foreground/60 mb-1">
                          {method.title}
                        </h4>
                        <p className="text-base font-medium">
                          {method.value}
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div> 
    </section>
  );
}
