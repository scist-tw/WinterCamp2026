"use client";

import { useEffect, useRef, useState } from "react";

export default function AnimatedGlow() {
  const glow1Ref = useRef(null);
  const glow2Ref = useRef(null);
  const glow3Ref = useRef(null);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return; // Skip animation entirely on mobile
    // Mobile: only 1 glow, slower, lower opacity
    // Desktop: 3 glows, original speed
    const glows = [
          {
            ref: glow1Ref,
            duration: 25000,
            baseSize: 500,
            path: [
              { x: 20, y: 30 },
              { x: 75, y: 25 },
              { x: 20, y: 30 },
            ],
          },
          {
            ref: glow2Ref,
            duration: 30000,
            baseSize: 600,
            path: [
              { x: 80, y: 60 },
              { x: 15, y: 70 },
              { x: 80, y: 60 },
            ],
          },
          {
            ref: glow3Ref,
            duration: 28000,
            baseSize: 550,
            path: [
              { x: 50, y: 90 },
              { x: 60, y: 15 },
              { x: 50, y: 90 },
            ],
          },
        ];

    const animate = (glow, startTime) => {
      const elapsed = Date.now() - startTime;
      const progress = (elapsed % glow.duration) / glow.duration;

      // Calculate position along path
      let x, y, opacity, scale;
      if (progress < 0.1) {
        // Fade in
        opacity = progress / 0.1;
        x = glow.path[0].x;
        y = glow.path[0].y;
        scale = 0.8 + (opacity * 0.4); // 0.8 to 1.2
      } else if (progress < 0.5) {
        // Move to second point
        const t = (progress - 0.1) / 0.4;
        const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; // easeInOutQuad
        x = glow.path[0].x + (glow.path[1].x - glow.path[0].x) * eased;
        y = glow.path[0].y + (glow.path[1].y - glow.path[0].y) * eased;
        opacity = 0.12;
        // Scale from 1.2 to 0.8 and back
        scale = 1.2 - Math.abs(eased - 0.5) * 0.8;
      } else if (progress < 0.9) {
        // Move back to start
        const t = (progress - 0.5) / 0.4;
        const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        x = glow.path[1].x + (glow.path[2].x - glow.path[1].x) * eased;
        y = glow.path[1].y + (glow.path[2].y - glow.path[1].y) * eased;
        opacity = 0.12;
        scale = 1.2 - Math.abs(eased - 0.5) * 0.8;
      } else {
        // Fade out
        const fadeProgress = (progress - 0.9) / 0.1;
        opacity = 0.12 * (1 - fadeProgress);
        x = glow.path[2].x;
        y = glow.path[2].y;
        scale = 1.2 - (fadeProgress * 0.4); // 1.2 to 0.8
      }

      if (glow.ref.current) {
        glow.ref.current.style.left = `${x}%`;
        glow.ref.current.style.top = `${y}%`;
        // Desktop brightness
        glow.ref.current.style.opacity = opacity * 0.6;
        glow.ref.current.style.transform = `translate(-50%, -50%) scale(${scale})`;
      }
    };

    const startTime = Date.now();
    let animationFrame;

    const loop = () => {
      glows.forEach(glow => animate(glow, startTime));
      animationFrame = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [isMobile]);

  if (isMobile) return null; // Do not render glows on mobile

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div
        ref={glow1Ref}
        className={"absolute w-[500px] h-[500px] rounded-full blur-3xl transition-opacity duration-1000"}
        style={{
          background:
            'radial-gradient(circle, oklch(0.75 0.15 85) 0%, transparent 70%)',
          opacity: 0,
        }}
      />
      <div
        ref={glow2Ref}
        className="absolute w-[600px] h-[600px] rounded-full blur-3xl transition-opacity duration-1000"
        style={{
          background:
            'radial-gradient(circle, oklch(0.75 0.15 85) 0%, transparent 70%)',
          opacity: 0,
        }}
      />
      <div
        ref={glow3Ref}
        className="absolute w-[550px] h-[550px] rounded-full blur-3xl transition-opacity duration-1000"
        style={{
          background:
            'radial-gradient(circle, oklch(0.75 0.15 85) 0%, transparent 70%)',
          opacity: 0,
        }}
      />
    </div>
  );
}
