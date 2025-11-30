"use client";

import { useEffect, useState } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import Image from "next/image";

export default function Partners() {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    fetch("/data/partners.json")
      .then((res) => res.json())
      .then((data) => {
        setPartners(data.partners || []);
      })
      .catch((err) => console.error("Failed to load partners:", err));
  }, []);

  if (partners.length === 0) return null;

  // Duplicate for seamless loop
  const duplicatedPartners = [...partners, ...partners];

  return (
    <LazyMotion features={domAnimation}>
      <section id="partners" className="py-20 lg:py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="mb-3 flex justify-center">
              <span className="section-eyebrow">PARTNERS // 合作社團</span>
            </div>
            <h2 className="section-title text-3xl lg:text-5xl font-bold mb-4">合作社團</h2>
            <p className="text-foreground/70 text-base lg:text-lg max-w-2xl mx-auto">
              與我們一起打造精彩的學習體驗
            </p>
          </div>

          {/* Marquee Container */}
          <div className="relative w-full overflow-hidden">
            {/* Left fade overlay */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none z-10"></div>
            {/* Right fade overlay */}
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none z-10"></div>

            <m.div
              className="flex gap-8"
              animate={{ x: "-50%" }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop",
              }}
            >
            {duplicatedPartners.map((partner, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-48 h-48 rounded-2xl bg-card/50 backdrop-blur border border-[oklch(0.75_0.15_85)]/20 overflow-hidden group cursor-pointer transition-all duration-300 hover:border-[oklch(0.75_0.15_85)]/50 hover:shadow-lg hover:shadow-[oklch(0.75_0.15_85)]/20"
              >
                <div className="relative w-full h-full flex items-center justify-center bg-secondary/30 group-hover:bg-secondary/50 transition-colors duration-300">
                  {partner.logo ? (
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={192}
                      height={192}
                      className="object-contain p-4 w-full h-full"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-4 text-center">
                      <div className="text-4xl font-bold text-[oklch(0.75_0.15_85)]/60 mb-2">
                        {partner.name.charAt(0)}
                      </div>
                      <div className="text-sm text-foreground/60">{partner.name}</div>
                    </div>
                  )}
                </div>

                {/* Overlay with club name */}
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="w-full p-4 bg-gradient-to-t from-black to-transparent">
                    <h4 className="text-lg font-bold text-[oklch(0.75_0.15_85)]">
                      {partner.name}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </m.div>
        </div>
      </div>
    </section>
    </LazyMotion>
  );
}
