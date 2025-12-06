"use client";

import { useState, useEffect, useRef } from "react";
import { Camera } from "lucide-react";
import { cn } from "@/lib/utils";

// widths to generate srcset for — should match generate-images.js
const DEFAULT_WIDTHS = [320, 640, 960, 1280, 1920];

function stripExtension(p) {
  return p.replace(/\.[^/.]+$/, "");
}

function buildSrcSet(base, widths = DEFAULT_WIDTHS, ext = "webp") {
  return widths.map((w) => `${base}-${w}.${ext} ${w}w`).join(", ");
}

export default function ResponsiveImage({
  src,
  alt = "",
  className = "",
  sizes,
  priority = false,
  widths = DEFAULT_WIDTHS,
  style,
  objectFit = "cover",
  onLoad,
  formats = ["avif", "webp"],
}) {
  const [isInView, setIsInView] = useState(!!priority);
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (priority) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            obs.disconnect();
          }
        });
      },
      { rootMargin: "200px", threshold: 0.01 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [priority]);

  let base = stripExtension(src);
  const fallback = src; // safe fallback when generated sizes are missing

  // Normalize base path: ensure leading slash and remove repeated slashes
  if (!String(base).startsWith("/")) base = "/" + base;
  base = base.replace(/\/+/g, "/");

  // Only emit srcset entries for images that are in the generated `public/gallery` area.
  // Use includes so we match both '/gallery/...' and '.../gallery/...'.
  const isGeneratedGalleryImage = String(base).includes("/gallery/");
  const hasWidths = isGeneratedGalleryImage && Array.isArray(widths) && widths.length > 0;
  // Build srcsets according to requested formats order (e.g. ['webp'] or ['avif','webp'])
  const srcSets = {};
  if (hasWidths && Array.isArray(formats)) {
    formats.forEach((ext) => {
      srcSets[ext] = buildSrcSet(base, widths, ext);
    });
  }

  return (
    <div ref={ref} className={cn("relative", className)} style={style}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/60 to-secondary/30 overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Camera className="w-12 h-12 text-[oklch(0.55_0.15_85)]/30" />
          </div>
        </div>
      )}

      {isInView && (
        <picture>
          {hasWidths && formats.includes("avif") && srcSets["avif"] && (
            <source type="image/avif" srcSet={srcSets["avif"]} sizes={sizes} />
          )}
          {hasWidths && formats.includes("webp") && srcSets["webp"] && (
            <source type="image/webp" srcSet={srcSets["webp"]} sizes={sizes} />
          )}
          <img
            src={fallback}
            alt={alt}
            className={`w-full h-full transition-opacity duration-300 ${objectFit === "cover" ? "object-cover" : "object-contain"} ${isLoaded ? "opacity-100" : "opacity-0"}`}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            sizes={sizes}
            onLoad={(e) => {
              setIsLoaded(true);
              onLoad?.(e);
            }}
          />
        </picture>
      )}
    </div>
  );
}
