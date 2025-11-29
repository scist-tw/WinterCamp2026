"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Camera, X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function GalleryPage() {
  const [galleryImages, setGalleryImages] = useState([]);
  const [groupedByYear, setGroupedByYear] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    let isMounted = true;

    fetch("/data/gallery.json")
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;

        const images = data.allImages || [];
        setGalleryImages(images);

        // 按年份分組
        const grouped = images.reduce((acc, image) => {
          const year = image.year || "其他";
          if (!acc[year]) {
            acc[year] = [];
          }
          acc[year].push(image);
          return acc;
        }, {});

        setGroupedByYear(grouped);
        setLoading(false);
      })
      .catch((err) => {
        if (isMounted) {
          console.error("Failed to load gallery:", err);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // 關閉放大圖片 - memoized
  const closeModal = useCallback(() => {
    setSelectedImage(null);
  }, []);

  // 上一張圖片 - memoized
  const prevImage = useCallback(() => {
    if (!selectedImage) return;
    const currentIndex = galleryImages.findIndex(img => img.src === selectedImage.src);
    const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    setSelectedImage(galleryImages[prevIndex]);
  }, [selectedImage, galleryImages]);

  // 下一張圖片 - memoized
  const nextImage = useCallback(() => {
    if (!selectedImage) return;
    const currentIndex = galleryImages.findIndex(img => img.src === selectedImage.src);
    const nextIndex = (currentIndex + 1) % galleryImages.length;
    setSelectedImage(galleryImages[nextIndex]);
  }, [selectedImage, galleryImages]);

  // ESC 鍵關閉、左右鍵切換
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [closeModal, prevImage, nextImage]);

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
            <div className="space-y-16">
              {Object.keys(groupedByYear)
                .sort((a, b) => a.localeCompare(b)) // 年份由舊到新排序 (2024 -> 2025)
                .map((year) => (
                  <div key={year}>
                    {/* 年份標題 */}
                    <div className="mb-8 text-center">
                      <h2 className="text-3xl lg:text-4xl font-bold">
                        <span className="inline-block px-6 py-3 bg-[oklch(0.75_0.15_85)] text-black rounded-2xl">
                          {year}
                        </span>
                      </h2>
                    </div>

                    {/* 該年份的照片 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                      {groupedByYear[year].map((image, idx) => (
                        <Card
                          key={idx}
                          className="neon-card rounded-3xl overflow-hidden group hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
                          onClick={() => setSelectedImage(image)}
                        >
                          <div className="relative aspect-[4/3] bg-secondary/50 overflow-hidden">
                            {/* Actual Image */}
                            <Image
                              src={image.src}
                              alt={image.alt}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              priority={idx === 0 && year === Object.keys(groupedByYear).sort((a, b) => a.localeCompare(b))[0]}
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
                  </div>
                ))}
            </div>
          )}

        </div>
      </section>

      {/* 圖片放大 Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fadeIn"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label="圖片預覽"
        >
          {/* 關閉按鈕 */}
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors z-10 cursor-pointer"
            onClick={closeModal}
            aria-label="關閉圖片預覽"
          >
            <X className="w-8 h-8" />
          </button>

          {/* 左右切換按鈕 */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white hover:bg-white/10 rounded-full p-3 transition-all z-10 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            aria-label="上一張圖片"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white hover:bg-white/10 rounded-full p-3 transition-all z-10 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            aria-label="下一張圖片"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div
            className="relative max-w-6xl max-h-[85vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-background border-2 border-[oklch(0.75_0.15_85)]/30 rounded-3xl overflow-hidden">
              <div className="relative w-full h-full">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>

              {/* 圖片資訊 */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-8">
                <div className="inline-block px-3 py-1 bg-[oklch(0.75_0.15_85)] text-black text-sm font-bold rounded-full mb-2">
                  {selectedImage.year}
                </div>
                <h3 className="text-white font-bold text-2xl mb-2 drop-shadow-lg">
                  {selectedImage.title}
                </h3>
                {selectedImage.description && (
                  <p className="text-white/90 text-base drop-shadow-lg">
                    {selectedImage.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
