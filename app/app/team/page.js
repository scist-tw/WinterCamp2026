"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Users } from "lucide-react";
import Image from "next/image";
import md5 from "md5";

// Generate Gravatar URL from email
function getGravatarUrl(email, size = 200) {
  if (!email) return `https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&s=${size}`;

  const hash = md5(email.trim().toLowerCase());
  return `https://www.gravatar.com/avatar/${hash}?d=identicon&s=${size}`;
}

// 職位順序（合併總召和副召為總召組）
const CATEGORY_ORDER = ["總召組", "行政組", "課程組", "活動組", "資訊組", "隊輔組", "紀錄組"];

export default function TeamPage() {
  const [allTeamMembers, setAllTeamMembers] = useState([]);
  const [groupedMembers, setGroupedMembers] = useState({});

  useEffect(() => {
    fetch("/data/team.json")
      .then((res) => res.json())
      .then((data) => {
        const members = data.allMembers || [];
        setAllTeamMembers(members);

        // 依照職位分組，合併總召和副召
        const grouped = {};

        members.forEach(member => {
          let category = member.category || "其他";

          // 將總召和副召都歸入「總召組」
          if (category === "總召" || category === "副召") {
            if (!grouped["總召組"]) {
              grouped["總召組"] = [];
            }
            grouped["總召組"].push(member);
          } else {
            if (!grouped[category]) {
              grouped[category] = [];
            }
            grouped[category].push(member);
          }
        });

        // 總召組內排序：總召在中間，副召在兩側
        if (grouped["總召組"] && grouped["總召組"].length > 0) {
          const 總召 = grouped["總召組"].filter(m => m.category === "總召");
          const 副召 = grouped["總召組"].filter(m => m.category === "副召");

          const sorted = [];
          if (副召.length > 0 && 副召[0]) sorted.push(副召[0]);
          if (總召.length > 0 && 總召[0]) sorted.push(總召[0]);
          if (副召.length > 1 && 副召[1]) sorted.push(副召[1]);

          grouped["總召組"] = sorted;
        }

        setGroupedMembers(grouped);
      })
      .catch((err) => console.error("Failed to load team:", err));
  }, []);
  return (
    <div className="min-h-screen">

      {/* Main content */}
      <section className="pt-32 pb-20 lg:pb-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="mb-3 flex justify-center">
              <span className="section-eyebrow">TEAM // 工作人員</span>
            </div>
            <h1 className="section-title text-4xl lg:text-6xl font-bold mb-6">
              籌備團隊
            </h1>
            <p className="text-foreground/70 text-lg lg:text-xl max-w-3xl mx-auto">
              由 SCIST x SCAICT 攜手打造
              <br />
              致力於提供最優質的學習體驗與活動規劃
            </p>
          </div>

          {/* Team Members - Centered Layout */}
          {allTeamMembers.length === 0 ? (
            <div className="text-center py-20 text-foreground/70">
              <Users className="w-16 h-16 mx-auto mb-4 text-[oklch(0.55_0.15_85)]/40" />
              <p>工作人員名單籌備中...</p>
            </div>
          ) : (
            <div className="space-y-20">
              {CATEGORY_ORDER.map((category) => {
                const members = groupedMembers[category];
                if (!members || members.length === 0) return null;

                return (
                  <div key={category} className="w-full">
                    {/* Category Title - Centered */}
                    <div className="mb-10 text-center">
                      <h2 className="text-2xl lg:text-3xl font-bold">
                        <span className="inline-block px-4 py-2 bg-[oklch(0.75_0.15_85)] text-black rounded-lg">
                          {category}
                        </span>
                      </h2>
                    </div>

                    {/* Members Grid - Centered */}
                    <div className="flex justify-center">
                      <div className={`grid gap-6 w-full ${
                        members.length === 1 ? "grid-cols-1 max-w-sm" :
                        members.length === 2 ? "grid-cols-1 sm:grid-cols-2 max-w-2xl" :
                        category === "總召組" && members.length === 3 ? "grid-cols-1 sm:grid-cols-3 max-w-4xl" :
                        "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl"
                      }`}>
                        {members.map((member, idx) => (
                          <Card
                            key={idx}
                            className={`neon-card rounded-2xl overflow-hidden group hover:scale-[1.02] transition-transform p-6 relative ${
                              category === "總召組" && member.category === "總召" ? "ring-2 ring-[oklch(0.75_0.15_85)]/50" : ""
                            }`}
                          >
                            {member.isLeader && (
                              <div className="absolute top-2 right-2 px-2 py-1 bg-yellow-400 text-black text-xs font-bold rounded-full z-10">組長</div>
                            )}
                            <div className="flex flex-col items-center text-center">
                              {/* Avatar */}
                              <div className={`relative w-24 h-24 mb-4 rounded-full overflow-hidden group-hover:border-[oklch(0.75_0.15_85)] transition-colors flex items-center justify-center bg-secondary/50 ${
                                category === "總召組" && member.category === "總召"
                                  ? "border-4 border-[oklch(0.75_0.15_85)]/50"
                                  : "border-2 border-[oklch(0.75_0.15_85)]/30"
                              }`}>
                                {member.email ? (
                                  <Image
                                    src={getGravatarUrl(member.email, 192)}
                                    alt={member.name}
                                    width={96}
                                    height={96}
                                    className="object-cover"
                                    unoptimized
                                  />
                                ) : (
                                  <Users className="w-8 h-8 text-[oklch(0.55_0.15_85)]/40" />
                                )}
                              </div>

                              {/* Info */}
                              <div className="inline-block px-2 py-1 bg-[oklch(0.75_0.15_85)] text-black text-xs font-bold rounded-full mb-2">
                                {member.role}
                              </div>
                              <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                              {member.organization && (
                                <p className="text-foreground/60 text-xs mb-2 line-clamp-2">
                                  {member.organization}
                                </p>
                              )}
                              {member.bio && (
                                <p className="text-foreground/60 text-sm line-clamp-2">{member.bio}</p>
                              )}
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
