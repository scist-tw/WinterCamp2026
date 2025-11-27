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

export default function Team() {
  const [mainOrganizers, setMainOrganizers] = useState([]);

  useEffect(() => {
    fetch("/data/team.json")
      .then((res) => res.json())
      .then((data) => {
        setMainOrganizers(data.mainOrganizers || []);
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
          <h2 className="section-title text-3xl lg:text-5xl font-bold mb-4">
            籌備團隊
          </h2>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mainOrganizers.length > 0 ? (
            mainOrganizers.map((member, idx) => (
              <Link key={idx} href="/team">
                <Card className="neon-card rounded-2xl overflow-hidden group cursor-pointer hover:scale-[1.02] transition-transform p-6">
                  <div className="flex flex-col items-center text-center">
                    {/* Avatar - Gravatar */}
                    <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden border-2 border-[oklch(0.75_0.15_85)]/30 group-hover:border-[oklch(0.75_0.15_85)] transition-colors">
                      <Image
                        src={getGravatarUrl(member.email, 256)}
                        alt={member.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>

                    {/* Info */}
                    <div className="inline-block px-3 py-1 bg-[oklch(0.75_0.15_85)] text-black text-xs font-bold rounded-full mb-2">
                      {member.role}
                    </div>
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    {member.organization && (
                      <p className="text-[oklch(0.75_0.15_85)] text-sm mb-3">{member.organization}</p>
                    )}
                    <p className="text-foreground/60 text-sm">{member.bio}</p>
                  </div>
                </Card>
              </Link>
            ))
          ) : (
            // Placeholder cards when no members
            Array.from({ length: 3 }).map((_, idx) => (
              <Link key={idx} href="/team">
                <Card className="neon-card rounded-2xl overflow-hidden group cursor-pointer hover:scale-[1.02] transition-transform p-6">
                  <div className="flex flex-col items-center text-center">
                    {/* Avatar placeholder */}
                    <div className="w-32 h-32 mb-4 rounded-full bg-secondary/50 flex items-center justify-center border-2 border-[oklch(0.75_0.15_85)]/20">
                      <Users className="w-12 h-12 text-[oklch(0.55_0.15_85)]/40" />
                    </div>

                    {/* Info placeholder */}
                    <div className="inline-block px-3 py-1 bg-secondary/50 text-foreground/40 text-xs font-bold rounded-full mb-2">
                      總召
                    </div>
                    <h3 className="text-xl font-bold mb-1 text-foreground/40">工作人員</h3>
                    <p className="text-foreground/30 text-sm">籌備中...</p>
                  </div>
                </Card>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
