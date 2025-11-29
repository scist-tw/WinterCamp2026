"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { ArrowRight, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import md5 from "md5";

// Generate Gravatar URL from email
function getGravatarUrl(email, size = 200) {
  if (!email) return `https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&s=${size}`;

  const hash = md5(email.trim().toLowerCase());
  return `https://www.gravatar.com/avatar/${hash}?d=identicon&s=${size}`;
}

// 職位順序（首頁只顯示總召和副召）
const DISPLAY_CATEGORIES = ["總召", "副召"];

export default function Team() {
  const [members, setMembers] = useState([]);
  const [groupedMembers, setGroupedMembers] = useState({});

  useEffect(() => {
    fetch("/data/team.json")
      .then((res) => res.json())
      .then((data) => {
        const allMembers = data.allMembers || [];
        setMembers(allMembers);

        // 依照職位分組，只保留要在首頁顯示的
        const grouped = allMembers.reduce((acc, member) => {
          const category = member.category || "其他";
          if (DISPLAY_CATEGORIES.includes(category)) {
            if (!acc[category]) {
              acc[category] = [];
            }
            acc[category].push(member);
          }
          return acc;
        }, {});
        setGroupedMembers(grouped);
      })
      .catch((err) => console.error("Failed to load team:", err));
  }, []);

  return (
    <section id="team" className="py-20 lg:py-32 px-6 lg:px-12 bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="mb-3 flex justify-center">
            <span className="section-eyebrow">TEAM // 工作人員</span>
          </div>
          <h2 className="section-title text-3xl lg:text-5xl font-bold mb-4">籌備團隊</h2>
          <p className="text-foreground/70 text-base lg:text-lg max-w-2xl mx-auto mb-4">
            由 SCIST x SCAICT 攜手打造，致力於提供最優質的學習體驗
          </p>
          <Link
            href="/team"
            className="inline-flex items-center gap-2 text-[oklch(0.75_0.15_85)] hover:text-[oklch(0.8_0.18_85)] font-semibold transition-colors group"
          >
            查看完整團隊
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Groups - Centered Layout */}
        {(groupedMembers["總召"]?.length > 0 || groupedMembers["副召"]?.length > 0) && (
          <div className="w-full text-center">
            <div className="mb-8">
              <h3 className="text-2xl lg:text-3xl font-bold">
                <span className="inline-block px-4 py-2 bg-[oklch(0.75_0.15_85)] text-black rounded-lg">
                  總召組
                </span>
              </h3>
            </div>
            <div className="flex justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl">
                {/* 副召左 */}
                {groupedMembers["副召"]?.[0] && (
                  <Link href="/team" className="flex justify-center">
                    <Card className="neon-card rounded-2xl p-6 hover:scale-[1.02] transition-transform h-full w-full relative flex flex-col">
                      {groupedMembers["副召"][0].isLeader && (
                        <div className="absolute top-3 right-3 px-2 py-1 bg-yellow-400 text-black text-xs font-bold rounded-full z-10">組長</div>
                      )}
                      <div className="flex flex-col items-center text-center flex-1">
                        <div className="relative w-36 h-36 mb-4 rounded-full overflow-hidden border-2 border-[oklch(0.75_0.15_85)]/30 flex-shrink-0">
                          {groupedMembers["副召"][0].email ? (
                            <Image src={getGravatarUrl(groupedMembers["副召"][0].email, 256)} alt={groupedMembers["副召"][0].name} fill className="object-cover" unoptimized />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-secondary/50 text-foreground/40">
                              <Users className="w-12 h-12" />
                            </div>
                          )}
                        </div>
                        <div className="inline-block px-3 py-1 bg-[oklch(0.75_0.15_85)] text-black text-xs font-bold rounded-full mb-3">{groupedMembers["副召"][0].role}</div>
                        <h4 className="text-lg font-bold mb-2 line-clamp-2">{groupedMembers["副召"][0].name}</h4>
                        <p className="text-foreground/60 text-sm line-clamp-3">{groupedMembers["副召"][0].organization}</p>
                      </div>
                    </Card>
                  </Link>
                )}

                {/* 總召中 */}
                {groupedMembers["總召"]?.[0] && (
                  <Link href="/team" className="flex justify-center">
                    <Card className="neon-card rounded-2xl p-6 hover:scale-[1.02] transition-transform h-full w-full relative flex flex-col">
                      {groupedMembers["總召"][0].isLeader && (
                        <div className="absolute top-3 right-3 px-2 py-1 bg-yellow-400 text-black text-xs font-bold rounded-full z-10">組長</div>
                      )}
                      <div className="flex flex-col items-center text-center flex-1">
                        <div className="relative w-36 h-36 mb-4 rounded-full overflow-hidden border-2 border-[oklch(0.75_0.15_85)]/30 flex-shrink-0">
                          {groupedMembers["總召"][0].email ? (
                            <Image src={getGravatarUrl(groupedMembers["總召"][0].email, 256)} alt={groupedMembers["總召"][0].name} fill className="object-cover" unoptimized />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-secondary/50 text-foreground/40">
                              <Users className="w-12 h-12" />
                            </div>
                          )}
                        </div>
                        <div className="inline-block px-3 py-1 bg-[oklch(0.75_0.15_85)] text-black text-xs font-bold rounded-full mb-3">{groupedMembers["總召"][0].role}</div>
                        <h4 className="text-lg font-bold mb-2 line-clamp-2">{groupedMembers["總召"][0].name}</h4>
                        <p className="text-foreground/60 text-sm line-clamp-3">{groupedMembers["總召"][0].organization}</p>
                      </div>
                    </Card>
                  </Link>
                )}

                {/* 副召右 */}
                {groupedMembers["副召"]?.[1] && (
                  <Link href="/team" className="flex justify-center">
                    <Card className="neon-card rounded-2xl p-6 hover:scale-[1.02] transition-transform h-full w-full relative flex flex-col">
                      {groupedMembers["副召"][1].isLeader && (
                        <div className="absolute top-3 right-3 px-2 py-1 bg-yellow-400 text-black text-xs font-bold rounded-full z-10">組長</div>
                      )}
                      <div className="flex flex-col items-center text-center flex-1">
                        <div className="relative w-36 h-36 mb-4 rounded-full overflow-hidden border-2 border-[oklch(0.75_0.15_85)]/30 flex-shrink-0">
                          {groupedMembers["副召"][1].email ? (
                            <Image src={getGravatarUrl(groupedMembers["副召"][1].email, 256)} alt={groupedMembers["副召"][1].name} fill className="object-cover" unoptimized />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-secondary/50 text-foreground/40">
                              <Users className="w-12 h-12" />
                            </div>
                          )}
                        </div>
                        <div className="inline-block px-3 py-1 bg-[oklch(0.75_0.15_85)] text-black text-xs font-bold rounded-full mb-3">{groupedMembers["副召"][1].role}</div>
                        <h4 className="text-lg font-bold mb-2 line-clamp-2">{groupedMembers["副召"][1].name}</h4>
                        <p className="text-foreground/60 text-sm line-clamp-3">{groupedMembers["副召"][1].organization}</p>
                      </div>
                    </Card>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
