"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Camera } from "lucide-react";
import Image from "next/image";

export default function GalleryPage() {
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/gallery.json")
      .then((res) => res.json())
      .then((data) => {
        setGalleryImages(data.allImages || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load gallery:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen">

      {/* Main content */}
      <section className="pt-32 pb-20 lg:pb-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="mb-3 flex justify-center">
              <span className="section-eyebrow">GALLERY // 過往紀錄</span>
            </div>
            <h1 className="section-title text-4xl lg:text-6xl font-bold mb-6">
              活動精彩瞬間
            </h1>
            <p className="text-foreground/70 text-lg lg:text-xl max-w-3xl mx-auto">
              回顧歷屆寒訓的精彩時刻，見證學員們的成長與突破。
              <br />
              每一張照片都記錄著學習的熱情與團隊的凝聚力。
            </p>
          </div>

          {/* Gallery Grid */}
          {loading ? (
            <div className="text-center py-20 text-foreground/70">
              <Camera className="w-16 h-16 mx-auto mb-4 text-[oklch(0.55_0.15_85)]/40 animate-pulse" />
              <p>載入中...</p>
            </div>
          ) : galleryImages.length === 0 ? (
            <div className="text-center py-20 text-foreground/70">
              <Camera className="w-16 h-16 mx-auto mb-4 text-[oklch(0.55_0.15_85)]/40" />
              <p>目前還沒有照片</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {galleryImages.map((image, idx) => (
              <Card
                key={idx}
                className="neon-card rounded-2xl overflow-hidden group cursor-pointer hover:scale-[1.02] transition-transform duration-300"
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

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Content overlay */}
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
              ))}
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
