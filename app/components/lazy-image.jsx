"use client";

import { useState, useEffect, useRef, useCallback, memo } from "react";
import Image from "next/image";
import { Camera } from "lucide-react";

// Image load queue to prevent simultaneous decoding
let loadQueue = [];
let isProcessing = false;

const processQueue = () => {
  if (isProcessing || loadQueue.length === 0) return;
  isProcessing = true;
  const next = loadQueue.shift();
  if (next) next();
};

const LazyImage = memo(function LazyImage({
  src,
  alt,
  className = "",
  fill = false,
  sizes,
  priority = false,
  unoptimized = false,
  onLoad,
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef(null);
  const [shouldRender, setShouldRender] = useState(priority);

  useEffect(() => {
    if (priority) return; // Skip observer for priority images

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Delay rendering slightly to avoid all images rendering at once
            requestAnimationFrame(() => {
              setShouldRender(true);
              setIsInView(true);
            });
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: "100px",
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [priority]);

  const handleImageLoad = useCallback(() => {
    setIsLoaded(true);
    isProcessing = false;
    processQueue();
    onLoad?.();
  }, [onLoad]);

  return (
    <>
      {/* Skeleton screen with shimmer effect */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/60 to-secondary/30 overflow-hidden">
          {/* Shimmer animation */}
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Camera className="w-12 h-12 text-[oklch(0.55_0.15_85)]/30" />
          </div>
        </div>
      )}

      {/* Actual image - only render when in view */}
      {shouldRender ? (
        <Image
          ref={imgRef}
          src={src}
          alt={alt}
          fill={fill}
          sizes={sizes}
          className={`${className} transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{
            willChange: isLoaded ? "auto" : "opacity",
            contentVisibility: "auto",
          }}
          priority={priority}
          unoptimized={unoptimized}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={handleImageLoad}
        />
      ) : (
        <div ref={imgRef} className="absolute inset-0" />
      )}
    </>
  );
});

export default LazyImage;
