"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Users } from "lucide-react";
import Image from "next/image";
import DetailNavbar from "@/components/detail-navbar";
import md5 from "md5";

// Generate Gravatar URL from email
function getGravatarUrl(email, size = 200) {
  if (!email) return `https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&s=${size}`;

  const hash = md5(email.trim().toLowerCase());
  return `https://www.gravatar.com/avatar/${hash}?d=identicon&s=${size}`;
}

// 職位順序
const categoryOrder = ["總召", "副召", "行政組", "課程組", "活動組", "資訊組", "隊輔組", "編輯組", "紀錄組", "其他"];

export default function TeamPage() {
  const [allTeamMembers, setAllTeamMembers] = useState([]);
  const [groupedMembers, setGroupedMembers] = useState({});

  useEffect(() => {
    fetch("/data/team.json")
      .then((res) => res.json())
      .then((data) => {
        const members = data.allMembers || [];
        setAllTeamMembers(members);

        // 依照職位分組
        const grouped = members.reduce((acc, member) => {
          const category = member.category || "其他";
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(member);
          return acc;
        }, {});
        setGroupedMembers(grouped);
      })
      .catch((err) => console.error("Failed to load team:", err));
  }, []);
  return (
    <div className="min-h-screen">
      <DetailNavbar currentPage="team" />

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

          {/* Team Members */}
          {allTeamMembers.length === 0 ? (
            <div className="text-center py-20 text-foreground/70">
              <Users className="w-16 h-16 mx-auto mb-4 text-[oklch(0.55_0.15_85)]/40" />
              <p>工作人員名單籌備中...</p>
            </div>
          ) : (
            <div className="space-y-16">
              {categoryOrder.map((category) => {
                const members = groupedMembers[category];
                if (!members || members.length === 0) return null;

                return (
                  <div key={category}>
                    {/* Category Title */}
                    <div className="mb-8">
                      <h2 className="text-2xl lg:text-3xl font-bold text-center">
                        <span className="inline-block px-4 py-2 bg-[oklch(0.75_0.15_85)] text-black rounded-lg">
                          {category}
                        </span>
                      </h2>
                    </div>

                    {/* Members Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {members.map((member, idx) => (
                        <Card
                          key={idx}
                          className="neon-card rounded-2xl overflow-hidden group hover:scale-[1.02] transition-transform p-6"
                        >
                          <div className="flex flex-col items-center text-center">
                            {/* Avatar - Gravatar */}
                            <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden border-2 border-[oklch(0.75_0.15_85)]/30 group-hover:border-[oklch(0.75_0.15_85)] transition-colors">
                              <Image
                                src={getGravatarUrl(member.email, 192)}
                                alt={member.name}
                                fill
                                className="object-cover"
                                unoptimized
                              />
                            </div>

                            {/* Info */}
                            <div className="inline-block px-2 py-1 bg-[oklch(0.75_0.15_85)] text-black text-xs font-bold rounded-full mb-2">
                              {member.role}
                            </div>
                            <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                            {member.organization && (
                              <p className="text-[oklch(0.75_0.15_85)] text-xs mb-2">
                                {member.organization}
                              </p>
                            )}
                            {member.bio && (
                              <p className="text-foreground/60 text-sm">{member.bio}</p>
                            )}
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Placeholder when no members */}
          {allTeamMembers.length === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, idx) => (
                <Card
                  key={idx}
                  className="neon-card rounded-2xl overflow-hidden p-6"
                >
                  <div className="flex flex-col items-center text-center">
                    {/* Avatar placeholder */}
                    <div className="w-24 h-24 mb-4 rounded-full bg-secondary/50 flex items-center justify-center border-2 border-[oklch(0.75_0.15_85)]/20">
                      <Users className="w-8 h-8 text-[oklch(0.55_0.15_85)]/40" />
                    </div>

                    {/* Info placeholder */}
                    <div className="inline-block px-2 py-1 bg-secondary/50 text-foreground/40 text-xs font-bold rounded-full mb-2">
                      工作人員
                    </div>
                    <h3 className="text-lg font-bold mb-1 text-foreground/40">姓名</h3>
                    <p className="text-foreground/30 text-sm">籌備中...</p>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
