"use client";

import { useEffect, useState } from "react";
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

// 改用 role 來判斷
const DISPLAY_ROLES = ["總召", "副召"];

export default function Team() {
  const [members, setMembers] = useState([]);
  const [groupedMembers, setGroupedMembers] = useState({});

  const toArray = (v) => (Array.isArray(v) ? v : v ? [v] : []);

  const resolveLabel = (member, categoryKey) => {
    const cats = toArray(member.category);
    const roles = toArray(member.role);
    const idx = cats.indexOf(categoryKey);
    if (idx !== -1 && roles[idx]) return roles[idx];
    // If the current categoryKey matches the member's role (or one of their roles),
    // and the member has a qualifier like 組長/組員 in their category, show that qualifier.
    const roleMatchesCategory = Array.isArray(member.role)
      ? member.role.includes(categoryKey)
      : member.role === categoryKey;
    if (roleMatchesCategory) {
      const qual = cats.find((c) => c === "組長" || c === "組員");
      if (qual) return qual;
    }
    if (categoryKey === "總召組") {
      const found = roles.find((r) => r === "總召" || r === "副召");
      if (found) return found;
    }
    const leader = roles.find((r) => r === "組長" || r === "組員");
    if (leader) return leader;
    if (roles.length > 0) return roles[0];
    if (cats.length > 0) return cats[0];
    return member.role || member.category || "";
  };

  useEffect(() => {
    fetch("/data/team.json")
      .then((res) => res.json())
      .then((data) => {
        const allMembers = data.allMembers || [];
        setMembers(allMembers);

        const catIncludes = (member, key) => {
          const c = member.category;
          if (Array.isArray(c)) return c.includes(key);
          return c === key;
        };

        const grouped = allMembers.reduce((acc, member) => {
          const cats = Array.isArray(member.category) ? member.category : [member.category];
          const roles = toArray(member.role);
          if (catIncludes(member, "總召組")) {
            roles.forEach((r) => {
              if (DISPLAY_ROLES.includes(r)) {
                acc[r] = acc[r] || [];
                acc[r].push(member);
              }
            });
          }
          return acc;
        }, { 總召: [], 副召: [] });
        // put 組長 first
        Object.keys(grouped).forEach((k) => {
          grouped[k].sort((a, b) => {
            const aIsLeader = resolveLabel(a, "總召組") === "組長" ? 0 : 1;
            const bIsLeader = resolveLabel(b, "總召組") === "組長" ? 0 : 1;
            if (aIsLeader !== bIsLeader) return aIsLeader - bIsLeader;
            return (a.name || "").localeCompare(b.name || "");
          });
        });
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
                {groupedMembers["副召"]?.[0] && (
                  <div className="flex justify-center">
                    <div className="bg-card text-card-foreground gap-6 border shadow-sm neon-card rounded-2xl p-6 hover:scale-[1.02] transition-transform h-full w-full relative flex flex-col">
                      <div className="flex flex-col items-center text-center flex-1">
                        <div className="relative w-36 h-36 mb-4 rounded-full overflow-hidden flex-shrink-0 border-2 border-[oklch(0.75_0.15_85)]/30">
                        {groupedMembers["副召"][0].email ? (
                          groupedMembers["副召"][0].link ? (
                            <button onClick={() => window.open(groupedMembers["副召"][0].link, "_blank")} title={groupedMembers["副召"][0].name} className="w-full h-full relative">
                              <Image src={getGravatarUrl(groupedMembers["副召"][0].email, 256)} alt={groupedMembers["副召"][0].name} fill className="object-cover" unoptimized />
                            </button>
                          ) : (
                            <Image src={getGravatarUrl(groupedMembers["副召"][0].email, 256)} alt={groupedMembers["副召"][0].name} fill className="object-cover" unoptimized />
                          )
                        ) : (
                          <Users className="w-8 h-8 text-[oklch(0.55_0.15_85)]/40" />
                        )}
                        </div>
                        <div className="inline-block px-3 py-1 bg-[oklch(0.75_0.15_85)] text-black text-xs font-bold rounded-full mb-3">{resolveLabel(groupedMembers["副召"][0], "總召組")}</div>
                        <h4 className="text-lg font-bold mb-2 line-clamp-2">{groupedMembers["副召"][0].name}</h4>
                        <p className="text-foreground/60 text-sm line-clamp-3">{groupedMembers["副召"][0].bio || groupedMembers["副召"][0].role}</p>
                      </div>
                    </div>
                  </div>
                )}

                {groupedMembers["總召"]?.[0] && (
                  <div className="flex justify-center">
                    <div className="bg-card text-card-foreground gap-6 border shadow-sm neon-card rounded-2xl p-6 hover:scale-[1.02] transition-transform h-full w-full relative flex flex-col ring-2 ring-[oklch(0.75_0.15_85)]/50">
                      {resolveLabel(groupedMembers["總召"][0], "總召組") === "組長" && (
                        <div className="absolute top-3 right-3 px-2 py-1 bg-yellow-400 text-black text-xs font-bold rounded-full z-10">組長</div>
                      )}
                      <div className="flex flex-col items-center text-center flex-1">
                        <div className="relative w-36 h-36 mb-4 rounded-full overflow-hidden flex-shrink-0 border-4 border-[oklch(0.75_0.15_85)]/50">
                        {groupedMembers["總召"][0].email ? (
                          groupedMembers["總召"][0].link ? (
                            <button onClick={() => window.open(groupedMembers["總召"][0].link, "_blank")} title={groupedMembers["總召"][0].name} className="w-full h-full relative">
                              <Image src={getGravatarUrl(groupedMembers["總召"][0].email, 256)} alt={groupedMembers["總召"][0].name} fill className="object-cover" unoptimized />
                            </button>
                          ) : (
                            <Image src={getGravatarUrl(groupedMembers["總召"][0].email, 256)} alt={groupedMembers["總召"][0].name} fill className="object-cover" unoptimized />
                          )
                        ) : (
                          <Users className="w-8 h-8 text-[oklch(0.55_0.15_85)]/40" />
                        )}
                        </div>
                        <div className="inline-block px-3 py-1 bg-[oklch(0.75_0.15_85)] text-black text-xs font-bold rounded-full mb-3">{resolveLabel(groupedMembers["總召"][0], "總召組")}</div>
                        <h4 className="text-lg font-bold mb-2 line-clamp-2">{groupedMembers["總召"][0].name}</h4>
                        <p className="text-foreground/60 text-sm line-clamp-3">{groupedMembers["總召"][0].bio || groupedMembers["總召"][0].role}</p>
                      </div>
                    </div>
                  </div>
                )}
                {groupedMembers["副召"]?.[1] && (
                  <div className="flex justify-center">
                    <div className="bg-card text-card-foreground gap-6 border shadow-sm neon-card rounded-2xl p-6 hover:scale-[1.02] transition-transform h-full w-full relative flex flex-col">
                      <div className="flex flex-col items-center text-center flex-1">
                        <div className="relative w-36 h-36 mb-4 rounded-full overflow-hidden flex-shrink-0 border-2 border-[oklch(0.75_0.15_85)]/30">
                        {groupedMembers["副召"][1].email ? (
                          groupedMembers["副召"][1].link ? (
                            <button onClick={() => window.open(groupedMembers["副召"][1].link, "_blank")} title={groupedMembers["副召"][1].name} className="w-full h-full relative">
                              <Image src={getGravatarUrl(groupedMembers["副召"][1].email, 256)} alt={groupedMembers["副召"][1].name} fill className="object-cover" unoptimized />
                            </button>
                          ) : (
                            <Image src={getGravatarUrl(groupedMembers["副召"][1].email, 256)} alt={groupedMembers["副召"][1].name} fill className="object-cover" unoptimized />
                          )
                        ) : (
                          <Users className="w-8 h-8 text-[oklch(0.55_0.15_85)]/40" />
                        )}
                        </div>
                        <div className="inline-block px-3 py-1 bg-[oklch(0.75_0.15_85)] text-black text-xs font-bold rounded-full mb-3">{resolveLabel(groupedMembers["副召"][1], "總召組")}</div>
                        <h4 className="text-lg font-bold mb-2 line-clamp-2">{groupedMembers["副召"][1].name}</h4>
                        <p className="text-foreground/60 text-sm line-clamp-3">{groupedMembers["副召"][1].bio || groupedMembers["副召"][1].role}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
