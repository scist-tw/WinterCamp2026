"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Camera, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { secureFetch } from "@/lib/security";

export default function Gallery() {
  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    let isMounted = true;

    secureFetch("/data/gallery.json")
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;

        // 驗證資料結構
        if (!data || typeof data !== 'object') {
          throw new Error('Invalid data format');
        }

        const images = Array.isArray(data.featuredImages) ? data.featuredImages : [];
        // 按年份排序：2024 -> 2025
        const sorted = images.sort((a, b) => (a.year || "").localeCompare(b.year || ""));
        setGalleryImages(sorted);
      })
      .catch((err) => {
        if (isMounted) {
          console.error("Failed to load gallery:", err);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="gallery" className="py-20 lg:py-32 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="mb-3 flex justify-center">
            <span className="section-eyebrow">GALLERY // 過往紀錄</span>
          </div>
          <h2 className="section-title text-3xl lg:text-5xl font-bold mb-4">
            活動精彩瞬間
          </h2>
          <p className="text-foreground/70 text-base lg:text-lg max-w-2xl mx-auto mb-4">
            回顧歷屆寒訓的精彩時刻，見證學員們的成長與突破
          </p>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-[oklch(0.75_0.15_85)] hover:text-[oklch(0.8_0.18_85)] font-semibold transition-colors group"
          >
            查看完整照片牆
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.length > 0 ? (
            galleryImages.map((image, idx) => (
              <Card
                key={idx}
                className="neon-card rounded-3xl overflow-hidden group transition-shadow"
              >
                <div className="relative aspect-[4/3] bg-secondary/50 overflow-hidden">
                  {/* Actual Image */}
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  {/* Image overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Title overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <div className="inline-block px-2 py-1 bg-[oklch(0.75_0.15_85)] text-black text-xs font-bold rounded mb-2">
                      {image.year}
                    </div>
                    <h3 className="text-white font-bold text-xl mb-1 drop-shadow-lg">
                      {image.title}
                    </h3>
                    {image.description && (
                      <p className="text-white/80 text-sm drop-shadow-lg">
                        {image.description}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            ))
          ) : (
            // Placeholder cards when no images
            Array.from({ length: 6 }).map((_, idx) => (
              <Card key={idx} className="neon-card rounded-3xl overflow-hidden">
                <div className="relative aspect-[4/3] bg-secondary/50 overflow-hidden">
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-secondary/80 to-background/80">
                    <Camera className="w-12 h-12 text-[oklch(0.55_0.15_85)]/40 mb-3" />
                    <p className="text-foreground/40 text-sm">待上傳照片</p>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

      </div>
    </section>
  );
}
