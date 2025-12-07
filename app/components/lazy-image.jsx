"use client";

import { useState, useEffect, useRef, useCallback, memo } from "react";
import Image from "next/image";
import { Camera } from "lucide-react";

let sharedObserver = null;
const observerCallbacks = new WeakMap();

const getSharedObserver = () => {
  if (sharedObserver) return sharedObserver;

  sharedObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const callback = observerCallbacks.get(entry.target);
          if (callback) {
            callback();
            sharedObserver.unobserve(entry.target);
            observerCallbacks.delete(entry.target);
          }
        }
      });
    },
    {
      rootMargin: "200px",
      threshold: 0,
    }
  );

  return sharedObserver;
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
  const [shouldRender, setShouldRender] = useState(priority);
  const placeholderRef = useRef(null);

  useEffect(() => {
    if (priority || shouldRender) return;

    const element = placeholderRef.current;
    if (!element) return;

    const observer = getSharedObserver();

    observerCallbacks.set(element, () => {
      setShouldRender(true);
    });

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observerCallbacks.delete(element);
    };
  }, [priority, shouldRender]);

  const handleImageLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  return (
    <>
      {/* Skeleton placeholder */}
      {!isLoaded && (
        <div 
          ref={!shouldRender ? placeholderRef : null}
          className="absolute inset-0 bg-secondary/40"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <Camera className="w-12 h-12 text-[oklch(0.55_0.15_85)]/30" />
          </div>
        </div>
      )}

      {/* Actual image - only render when in view */}
      {shouldRender && (
        <Image
          src={src}
          alt={alt}
          fill={fill}
          sizes={sizes}
          className={`${className} ${isLoaded ? "opacity-100" : "opacity-0"}`}
          style={{
            transition: "opacity 0.2s ease-out",
          }}
          priority={priority}
          unoptimized={unoptimized}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={handleImageLoad}
        />
      )}
    </>
  );
});

export default LazyImage;
