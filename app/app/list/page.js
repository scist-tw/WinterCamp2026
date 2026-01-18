"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Users } from "lucide-react";

export default function ListPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/accepted-list.json");
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error("Failed to fetch accepted list:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderSection = (title, items, type) => {
    if (type === "single") {
      return (
        <div key={type} className="mb-16">
          <h2 className="text-2xl lg:text-3xl font-bold mb-6 text-[oklch(0.75_0.15_85)]">
            {title}（共 {items.length} 人）
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((person) => (
              <Card
                key={person.id}
                className="border border-[oklch(0.75_0.15_85)]/20 p-4 hover:border-[oklch(0.75_0.15_85)]/50 transition-colors"
              >
                <p className="font-semibold text-foreground">{person.name}</p>
                <p className="text-sm text-foreground/60 mt-1">{person.status}</p>
              </Card>
            ))}
          </div>
        </div>
      );
    }

    // pair, trio, quad
    return (
      <div key={type} className="mb-16">
        <h2 className="text-2xl lg:text-3xl font-bold mb-6 text-[oklch(0.75_0.15_85)]">
          {title}（共 {items.length} 隊）
        </h2>
        <div className="space-y-4">
          {items.map((team) => (
            <Card
              key={team.code}
              className="border border-[oklch(0.75_0.15_85)]/20 p-6 hover:border-[oklch(0.75_0.15_85)]/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="font-bold text-lg text-[oklch(0.75_0.15_85)]">
                    代碼：{team.code}
                  </p>
                  <p className="text-sm text-foreground/60 mt-1">
                    {team.members.length} 位隊員 • {team.status}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-foreground/60">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <div className="space-y-2 ml-2 border-l-2 border-[oklch(0.75_0.15_85)]/20 pl-4">
                {team.members.map((member) => (
                  <div key={member.id}>
                    <p className="text-foreground/90">
                      {member.name}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      {/* List Header Section */}
      <section className="pt-32 pb-20 lg:pb-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="mb-3 flex justify-center">
              <span className="section-eyebrow">ACCEPTED // 錄取名單</span>
            </div>
            <h1 className="section-title text-4xl lg:text-6xl font-bold mb-6">
              恭喜錄取！
            </h1>
            <p className="text-foreground/70 text-lg lg:text-xl max-w-3xl mx-auto">
              感謝你的報名！以下是本次營隊的錄取名單
            </p>
            {data?.meta && (
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-foreground/60">
                <p>總錄取人數：<span className="font-bold text-[oklch(0.75_0.15_85)]">{data.meta.totalAccepted}</span> 人</p>
                <p>營隊日期：<span className="font-bold text-[oklch(0.75_0.15_85)]">{data.meta.eventDate}</span></p>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="max-w-4xl mx-auto">
            {loading ? (
              <div className="bg-gradient-to-br from-[oklch(0.75_0.15_85)]/10 via-card to-muted border border-[oklch(0.75_0.15_85)]/20 rounded-3xl p-12 lg:p-16 text-center">
                <div className="inline-block animate-spin">
                  <div className="w-8 h-8 border-2 border-[oklch(0.75_0.15_85)]/30 border-t-[oklch(0.75_0.15_85)] rounded-full"></div>
                </div>
                <p className="text-foreground/70 text-lg mt-4">載入中...</p>
              </div>
            ) : data ? (
              <div>
                {/* Single */}
                {data.acceptedList.single && data.acceptedList.single.length > 0 &&
                  renderSection("單人報名", data.acceptedList.single, "single")}

                {/* Pair */}
                {data.acceptedList.pair && data.acceptedList.pair.length > 0 &&
                  renderSection("雙人報名", data.acceptedList.pair, "pair")}

                {/* Trio */}
                {data.acceptedList.trio && data.acceptedList.trio.length > 0 &&
                  renderSection("三人報名", data.acceptedList.trio, "trio")}

                {/* Quad & Above */}
                {data.acceptedList.quad && data.acceptedList.quad.length > 0 &&
                  renderSection("四人以上報名", data.acceptedList.quad, "quad")}

                {/* Rejected List */}
                {data.rejectedList && data.rejectedList.single && data.rejectedList.single.length > 0 && (
                  <div className="mt-20 pt-20 border-t border-amber-500/20">
                    <h2 className="text-2xl lg:text-3xl font-bold mb-6 text-amber-600">
                      未錄取名單（共 {data.rejectedList.single.length} 人）
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {data.rejectedList.single.map((person) => (
                        <Card
                          key={person.id}
                          className="border border-amber-500/20 p-4 hover:border-amber-500/40 transition-colors"
                        >
                          <p className="font-semibold text-foreground">{person.name}</p>
                          <p className="text-sm text-amber-600/70 mt-1">{person.status}</p>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Note */}
                {data.meta?.note && (
                  <div className="mt-16 pt-8 border-t border-[oklch(0.75_0.15_85)]/20">
                    <p className="text-center text-foreground/60 text-sm italic">
                      {data.meta.note}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-gradient-to-br from-[oklch(0.75_0.15_85)]/10 via-card to-muted border border-[oklch(0.75_0.15_85)]/20 rounded-3xl p-12 lg:p-16 text-center">
                <p className="text-foreground/70 text-lg">無法載入錄取名單</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
