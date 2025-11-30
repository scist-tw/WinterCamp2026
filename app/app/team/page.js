"use client";

import { useEffect, useState } from "react";
import { Users, ArrowRight, Mail } from "lucide-react";
import Image from "next/image";
import md5 from "md5";

// Generate Gravatar URL from email
function getGravatarUrl(email, size = 400) {
  if (!email) return `https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&s=${size}`;
  const hash = md5(email.trim().toLowerCase());
  return `https://www.gravatar.com/avatar/${hash}?d=identicon&s=${size}`;
}

// 職位順序
const CATEGORY_ORDER = [
  "總召組",
  "行政組",
  "課程組",
  "活動組",
  "資訊組",
  "隊輔組",
  "編輯組",
  "紀錄組",
];

// 職位描述對照表
const CATEGORY_DESC = {
  "總召組": "掌握協調寒訓籌備進度，主持核心討論及決策。",
  "行政組": "負責維持寒訓常務行政事務、財務與場地協調。",
  "課程組": "負責議程規劃、講師邀請與課程內容安排。",
  "活動組": "負責寒訓當天的活動流程、場控與體驗設計。",
  "資訊組": "負責官網開發、系統維護與技術支援。",
  "隊輔組": "引導學員參與活動，凝聚小隊向心力。",
  "紀錄組": "透過影像與文字，紀錄寒訓的精彩瞬間。",
  "編輯組": "負責主視覺設計，文案設計與文字內容品質把關。",
};

export default function TeamPage() {
  const [allTeamMembers, setAllTeamMembers] = useState([]);
  const [groupedMembers, setGroupedMembers] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Helper: support category/role being string or array
  const toArray = (c) => (Array.isArray(c) ? c : c ? [c] : []);

  // Resolve the display label for a member within a specific category group
  const resolveLabel = (member, categoryKey) => {
    const cats = toArray(member.category);
    const roles = toArray(member.role);

    // If member explicitly lists the category and there is a parallel role entry, use it
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

    // If viewing 總召組, prefer a 總召/副召 role if provided
    if (categoryKey === "總召組") {
      const found = roles.find((r) => r === "總召" || r === "副召");
      if (found) return found;
    }

    // If roles includes 組長/組員, use that qualification
    const leader = roles.find((r) => r === "組長" || r === "組員");
    if (leader) return leader;

    // Fallbacks
    if (roles.length > 0) return roles[0];
    if (cats.length > 0) return cats[0];
    return member.role || member.category || "";
  };

  useEffect(() => {
    fetch("/data/team.json")
      .then((res) => res.json())
      .then((data) => {
        const members = data.allMembers || [];
        setAllTeamMembers(members);

        // Helper: support category being string or array
        const toArray = (c) => (Array.isArray(c) ? c : c ? [c] : []);

        // Group members: allow a member to appear in multiple categories if category is an array.
        const grouped = members.reduce((acc, member) => {
          const cats = toArray(member.category);

          // If category contains 組長/組員 (these are role qualifiers), ensure the member is grouped under their role (e.g., 行政組)
          const roleQual = cats.find((c) => c === "組長" || c === "組員");
          if (roleQual) {
            // If member.role is an array, we can't use it directly as a key; fall back to the first role string
            const roleKey = Array.isArray(member.role) ? (member.role.find((r) => r && r !== "組長" && r !== "組員") || member.role[0]) : member.role || "其他";
            acc[roleKey] = acc[roleKey] || [];
            acc[roleKey].push(member);
          }

          // For every explicit category (except the role qualifiers), add the member to that category group
          cats.forEach((cat) => {
            if (!cat) return;
            if (cat === "組長" || cat === "組員") return; // already handled above
            const key = cat;
            acc[key] = acc[key] || [];
            acc[key].push(member);
          });

          // If member has no category, fallback to their role
          if (cats.length === 0) {
            const key = member.role || "其他";
            acc[key] = acc[key] || [];
            acc[key].push(member);
          }

          return acc;
        }, {});

        // Sort each group's members so that '組長' appear first, then by name
        Object.keys(grouped).forEach((key) => {
          grouped[key].sort((a, b) => {
            // For 總召組, prioritize 總召 > 副召 > others
            if (key === "總召組") {
              const aLabel = resolveLabel(a, key);
              const bLabel = resolveLabel(b, key);
              
              const roleOrder = { "總召": 0, "副召": 1, "組長": 2 };
              const aRank = roleOrder[aLabel] !== undefined ? roleOrder[aLabel] : 3;
              const bRank = roleOrder[bLabel] !== undefined ? roleOrder[bLabel] : 3;
              
              if (aRank !== bRank) return aRank - bRank;
              return (a.name || "").localeCompare(b.name || "");
            }
            
            // For other groups, '組長' appear first, then by name
            const aIsLeader = resolveLabel(a, key) === "組長" ? 0 : 1;
            const bIsLeader = resolveLabel(b, key) === "組長" ? 0 : 1;
            if (aIsLeader !== bIsLeader) return aIsLeader - bIsLeader;
            return (a.name || "").localeCompare(b.name || "");
          });
        });

        setGroupedMembers(grouped);
      })
      .catch((err) => console.error("Failed to load team:", err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="min-h-screen w-full selection:bg-primary/20">
      
      {/* --- Hero Section --- */}
      <div className="text-center mb-8 px-6 py-25 lg:px-8">
        <div className="mb-3 flex justify-center">
          <span className="section-eyebrow">TEAM // 工作人員</span>
        </div>
        <h1 className="section-title text-4xl lg:text-6xl font-bold mb-6">籌備團隊</h1>
        <p className="text-foreground/70 text-lg lg:text-xl max-w-3xl mx-auto">
          由 SCIST x SCAICT 攜手打造
          <br />
          致力於提供最優質的學習體驗與活動規劃
        </p>
      </div>

      {/* --- Team Members Content --- */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24">
        {isLoading ? (
          // Loading Skeleton
          <div className="flex flex-col items-center justify-center py-20 space-y-4 animate-pulse">
            <div className="w-16 h-16 bg-foreground/10 rounded-full"></div>
            <div className="h-4 w-48 bg-foreground/10 rounded"></div>
          </div>
        ) : allTeamMembers.length === 0 ? (
          // Empty State
          <div className="text-center py-20 text-foreground/60 border-2 border-dashed border-foreground/10 rounded-3xl mx-auto max-w-2xl">
            <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">工作人員名單籌備中...</p>
            <p className="text-sm mt-2">敬請期待</p>
          </div>
        ) : (
          <div className="space-y-16">
            {CATEGORY_ORDER.map((category) => {
              const members = groupedMembers[category];
              if (!members || members.length === 0) return null;

              return (
                <section key={category} id={category} className="scroll-mt-24">
                  {/* Category Header */}
                  <div className="mb-8 flex flex-col items-center text-center">
                    <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mb-2">
                      {category}
                    </h2>
                    <p className="text-sm text-foreground/70 mb-4">
                      {CATEGORY_DESC[category] || "SITCON 的核心夥伴"}
                    </p>
                    <div className="w-64 h-0.5 bg-gradient-to-r from-transparent via-[oklch(0.75_0.15_85)] to-transparent"></div>
                  </div>

                  {/* Members Grid - Special layout for 總召組 */}
                  {category === "總召組" ? (
                    <div className="flex justify-center">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 w-full max-w-4xl">
                        {/* First 副召 */}
                        {members.filter(m => resolveLabel(m, category) === "副召")[0] && (
                          <div className="flex justify-center">
                            <div className="neon-card rounded-2xl p-6 hover:scale-[1.02] transition-transform h-full w-full relative flex flex-col">
                              <div className="flex flex-col items-center text-center flex-1">
                                <div className={`relative w-36 h-36 mb-4 rounded-full overflow-hidden flex-shrink-0 transition-all duration-300 ${members.filter(m => resolveLabel(m, category) === "副召")[0].email && members.filter(m => resolveLabel(m, category) === "副召")[0].link?.trim() ? 'border-2 border-[oklch(0.75_0.15_85)]/30 cursor-pointer hover:border-primary hover:scale-110 hover:shadow-lg hover:shadow-primary/50' : 'border-2 border-[oklch(0.75_0.15_85)]/30'}`}>
                                  {members.filter(m => resolveLabel(m, category) === "副召")[0].email ? (
                                    members.filter(m => resolveLabel(m, category) === "副召")[0].link?.trim() ? (
                                      <button onClick={() => window.open(members.filter(m => resolveLabel(m, category) === "副召")[0].link.trim(), "_blank")} className="w-full h-full relative group">
                                        <Image src={getGravatarUrl(members.filter(m => resolveLabel(m, category) === "副召")[0].email, 256)} alt={members.filter(m => resolveLabel(m, category) === "副召")[0].name} fill className="object-cover" unoptimized />
                                        <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                          <ArrowRight className="w-6 h-6 text-white -rotate-45" />
                                        </div>
                                      </button>
                                    ) : (
                                      <Image src={getGravatarUrl(members.filter(m => resolveLabel(m, category) === "副召")[0].email, 256)} alt={members.filter(m => resolveLabel(m, category) === "副召")[0].name} fill className="object-cover" unoptimized />
                                    )
                                  ) : (
                                    <Users className="w-8 h-8 text-[oklch(0.55_0.15_85)]/40" />
                                  )}
                                </div>
                                <div className="inline-block px-3 py-1 bg-[oklch(0.75_0.15_85)] text-black text-xs font-bold rounded-full mb-3">{resolveLabel(members.filter(m => resolveLabel(m, category) === "副召")[0], category)}</div>
                                <h4 className="text-lg font-bold mb-2">{members.filter(m => resolveLabel(m, category) === "副召")[0].name}</h4>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* 總召 - Center */}
                        {members.filter(m => resolveLabel(m, category) === "總召")[0] && (
                          <div className="flex justify-center sm:col-span-1">
                            <div className="neon-card rounded-2xl p-6 hover:scale-[1.02] transition-transform h-full w-full relative flex flex-col ring-2 ring-[oklch(0.75_0.15_85)]/50">
                              {resolveLabel(members.filter(m => resolveLabel(m, category) === "總召")[0], category) === "組長" && (
                                <div className="absolute top-3 right-3 px-2 py-1 bg-yellow-400 text-black text-xs font-bold rounded-full z-10">組長</div>
                              )}
                              <div className="flex flex-col items-center text-center flex-1">
                                <div className={`relative w-36 h-36 mb-4 rounded-full overflow-hidden flex-shrink-0 transition-all duration-300 ${members.filter(m => resolveLabel(m, category) === "總召")[0].email && members.filter(m => resolveLabel(m, category) === "總召")[0].link?.trim() ? 'border-2 border-[oklch(0.75_0.15_85)]/30 cursor-pointer hover:border-primary hover:scale-110 hover:shadow-lg hover:shadow-primary/50' : 'border-2 border-[oklch(0.75_0.15_85)]/30'}`}>
                                  {members.filter(m => resolveLabel(m, category) === "總召")[0].email ? (
                                    members.filter(m => resolveLabel(m, category) === "總召")[0].link?.trim() ? (
                                      <button onClick={() => window.open(members.filter(m => resolveLabel(m, category) === "總召")[0].link.trim(), "_blank")} className="w-full h-full relative group">
                                        <Image src={getGravatarUrl(members.filter(m => resolveLabel(m, category) === "總召")[0].email, 256)} alt={members.filter(m => resolveLabel(m, category) === "總召")[0].name} fill className="object-cover" unoptimized />
                                        <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                          <ArrowRight className="w-6 h-6 text-white -rotate-45" />
                                        </div>
                                      </button>
                                    ) : (
                                      <Image src={getGravatarUrl(members.filter(m => resolveLabel(m, category) === "總召")[0].email, 256)} alt={members.filter(m => resolveLabel(m, category) === "總召")[0].name} fill className="object-cover" unoptimized />
                                    )
                                  ) : (
                                    <Users className="w-8 h-8 text-[oklch(0.55_0.15_85)]/40" />
                                  )}
                                </div>
                                <div className="inline-block px-3 py-1 bg-[oklch(0.75_0.15_85)] text-black text-xs font-bold rounded-full mb-3">{resolveLabel(members.filter(m => resolveLabel(m, category) === "總召")[0], category)}</div>
                                <h4 className="text-lg font-bold mb-2">{members.filter(m => resolveLabel(m, category) === "總召")[0].name}</h4>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Second 副召 */}
                        {members.filter(m => resolveLabel(m, category) === "副召")[1] && (
                          <div className="flex justify-center">
                            <div className="neon-card rounded-2xl p-6 hover:scale-[1.02] transition-transform h-full w-full relative flex flex-col">
                              <div className="flex flex-col items-center text-center flex-1">
                                <div className={`relative w-36 h-36 mb-4 rounded-full overflow-hidden flex-shrink-0 transition-all duration-300 ${members.filter(m => resolveLabel(m, category) === "副召")[1].email && members.filter(m => resolveLabel(m, category) === "副召")[1].link?.trim() ? 'border-2 border-[oklch(0.75_0.15_85)]/30 cursor-pointer hover:border-primary hover:scale-110 hover:shadow-lg hover:shadow-primary/50' : 'border-2 border-[oklch(0.75_0.15_85)]/30'}`}>
                                  {members.filter(m => resolveLabel(m, category) === "副召")[1].email ? (
                                    members.filter(m => resolveLabel(m, category) === "副召")[1].link?.trim() ? (
                                      <button onClick={() => window.open(members.filter(m => resolveLabel(m, category) === "副召")[1].link.trim(), "_blank")} className="w-full h-full relative group">
                                        <Image src={getGravatarUrl(members.filter(m => resolveLabel(m, category) === "副召")[1].email, 256)} alt={members.filter(m => resolveLabel(m, category) === "副召")[1].name} fill className="object-cover" unoptimized />
                                        <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                          <ArrowRight className="w-6 h-6 text-white -rotate-45" />
                                        </div>
                                      </button>
                                    ) : (
                                      <Image src={getGravatarUrl(members.filter(m => resolveLabel(m, category) === "副召")[1].email, 256)} alt={members.filter(m => resolveLabel(m, category) === "副召")[1].name} fill className="object-cover" unoptimized />
                                    )
                                  ) : (
                                    <Users className="w-8 h-8 text-[oklch(0.55_0.15_85)]/40" />
                                  )}
                                </div>
                                <div className="inline-block px-3 py-1 bg-[oklch(0.75_0.15_85)] text-black text-xs font-bold rounded-full mb-3">{resolveLabel(members.filter(m => resolveLabel(m, category) === "副召")[1], category)}</div>
                                <h4 className="text-lg font-bold mb-2">{members.filter(m => resolveLabel(m, category) === "副召")[1].name}</h4>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    /* Regular grid for other categories */
                    <div className="flex flex-wrap justify-center gap-6">
                      {members.map((member, idx) => (
                        <div
                          key={idx}
                          className={`group relative flex flex-col items-center rounded-2xl bg-secondary/10 transition-all duration-300 hover:bg-secondary/20 hover:-translate-y-1 hover:shadow-lg ${
                            category === "行政組"
                              ? "p-6 w-[200px]"
                              : "p-4 w-[140px]"
                          }`}
                        >
                          {/* Avatar Container */}
                          <div className="relative mb-4">
                            <div className={`relative overflow-hidden rounded-full ring-4 ring-background transition-all duration-300 ${
                              category === "行政組" ? "h-32 w-32" : "h-24 w-24"
                            } ${member.email && member.link?.trim() ? 'cursor-pointer hover:ring-primary hover:scale-110 hover:shadow-lg hover:shadow-primary/50 group' : 'group-hover:scale-105'} shadow-md`} onClick={() => member.link?.trim() && window.open(member.link.trim(), "_blank")}>
                              {member.email ? (
                                  member.link?.trim() ? (
                                    <>
                                      <Image
                                        src={getGravatarUrl(member.email, 256)}
                                        alt={member.name}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        loading="eager"
                                        unoptimized
                                      />
                                      <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <ArrowRight className={`text-white -rotate-45 ${category === "行政組" ? "w-6 h-6" : "w-5 h-5"}`} />
                                      </div>
                                    </>
                                  ) : (
                                    <Image
                                      src={getGravatarUrl(member.email, 256)}
                                      alt={member.name}
                                      fill
                                      className="object-cover"
                                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                      unoptimized
                                    />
                                  )
                              ) : (
                                <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-400">
                                  <Users className={category === "行政組" ? "h-12 w-12" : "h-10 w-10"} />
                                </div>
                              )}
                            </div>
                            {/* Optional: Add a subtle status dot or decoration here */}
                          </div>

                          {/* Text Info */}
                          <div className="text-center w-full">
                            <h3 className={`font-bold text-foreground truncate px-2 ${
                              category === "行政組" ? "text-xl mb-2" : "text-lg"
                            }`}>
                              {member.name}
                            </h3>
                            <p className={`mt-1 font-medium uppercase tracking-wider text-foreground/60 bg-foreground/5 rounded-full py-1 px-2 inline-block max-w-full truncate ${
                              category === "行政組" ? "text-base" : "text-xs"
                            }`}>
                              {resolveLabel(member, category)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}