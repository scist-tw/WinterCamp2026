"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Camera, X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function GalleryPage() {
  const [galleryImages, setGalleryImages] = useState([]);
  const [groupedByYear, setGroupedByYear] = useState({});
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetch("/data/gallery.json")
      .then((res) => res.json())
      .then((data) => {
        const images = data.allImages || [];
        setGalleryImages(images);

        // Group images by year
        const grouped = images.reduce((acc, img) => {
          const year = img.year || "其他";
          if (!acc[year]) acc[year] = [];
          acc[year].push(img);
          return acc;
        }, {});

        setGroupedByYear(grouped);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load gallery:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, currentImageIndex]);

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const handlePrevious = () => {
    setCurrentImageIndex((prev) =>
      prev > 0 ? prev - 1 : galleryImages.length - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) =>
      prev < galleryImages.length - 1 ? prev + 1 : 0
    );
  };

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
            <div className="space-y-20">
              {[
                "2024",
                "2025",
                ...Object.keys(groupedByYear).filter(
                  (y) => y !== "2024" && y !== "2025"
                ),
              ].map((year) => {
                const yearImages = groupedByYear[year];
                if (!yearImages || yearImages.length === 0) return null;

                return (
                  <div key={year}>
                    {/* Year Section Header */}
                    <div className="mb-8 flex flex-col items-center text-center">
                      <h2 className="text-3xl font-bold tracking-tight text-foreground mb-2">
                        {year} 年
                      </h2>
                      <div className="w-64 h-0.5 bg-gradient-to-r from-transparent via-[oklch(0.75_0.15_85)] to-transparent"></div>
                    </div>

                    {/* Images Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                      {yearImages.map((image, idx) => {
                        const globalIdx = galleryImages.indexOf(image);
                        return (
                          <Card
                            key={idx}
                            onClick={() => openLightbox(globalIdx)}
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
                                unoptimized
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
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && galleryImages.length > 0 && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close button */}
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 z-60 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Previous button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrevious();
            }}
            className="absolute left-4 z-60 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-8 h-8 text-white" />
          </button>

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 z-60 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
          >
            <ChevronRight className="w-8 h-8 text-white" />
          </button>

          {/* Image container */}
          <div
            className="relative w-full h-full flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-w-7xl max-h-[90vh] w-full h-full">
              <Image
                src={galleryImages[currentImageIndex].src}
                alt={galleryImages[currentImageIndex].alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
                unoptimized
              />
            </div>
            {/* Image info */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-sm rounded-xl px-6 py-4 text-center">
              <div className="inline-block px-2 py-1 bg-[oklch(0.75_0.15_85)] text-black text-xs font-bold rounded mb-2">
                {galleryImages[currentImageIndex].year}
              </div>
              <h3 className="text-white font-bold text-xl mb-1">
                {galleryImages[currentImageIndex].title}
              </h3>
              {galleryImages[currentImageIndex].description && (
                <p className="text-white/80 text-sm">
                  {galleryImages[currentImageIndex].description}
                </p>
              )}
              <p className="text-white/60 text-xs mt-2">
                {currentImageIndex + 1} / {galleryImages.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
