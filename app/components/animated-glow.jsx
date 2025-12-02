"use client";

import { useEffect, useState, useRef } from "react";

export default function AnimatedGlow() {
  const [isLowPerf, setIsLowPerf] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);
  const [glows, setGlows] = useState([]);
  const animationRefs = useRef([]);

  useEffect(() => {
    // Performance detection
    const checkPerformance = () => {
      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

      // Check for integrated graphics or low-end devices
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

      let isIntegrated = false;
      if (gl) {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
          // Detect integrated graphics
          isIntegrated = /intel|mesa|swiftshader/i.test(renderer);
        }
      }

      // Disable on mobile, reduce on tablet/integrated graphics
      if (isMobile) {
        setShouldRender(false);
      } else if (isTablet || isIntegrated) {
        setIsLowPerf(true);
      }
    };

    checkPerformance();

    // 計算兩點之間的距離
    const getDistance = (x1, y1, x2, y2) => {
      return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    };

    // 生成一個新的隨機位置（確保與其他光暈保持距離）
    const generatePosition = (existingGlows, excludeId) => {
      const minDistance = 25;
      const otherGlows = existingGlows.filter(g => g.id !== excludeId);

      let left, top;
      let attempts = 0;
      const maxAttempts = 50;

      do {
        left = 10 + Math.random() * 80;
        top = 10 + Math.random() * 80;
        attempts++;
      } while (
        attempts < maxAttempts &&
        !otherGlows.every(glow => getDistance(left, top, glow.left, glow.top) >= minDistance)
      );

      return { left, top };
    };

    // 初始化 3 個光暈
    const initialGlows = [];
    for (let i = 0; i < 3; i++) {
      const { left, top } = generatePosition(initialGlows, -1);
      initialGlows.push({
        id: i,
        left,
        top,
        size: 300 + Math.random() * 200,
        maxOpacity: 0.15 + Math.random() * 0.1, // 隨機最大亮度
        blur: 40 + Math.random() * 30,
        duration: 6000 + Math.random() * 4000, // 6-10 秒隨機週期
      });
    }
    setGlows(initialGlows);

    // 為每個光暈設置獨立的動畫循環
    const startAnimation = (index) => {
      const animateGlow = () => {
        setGlows(prevGlows => {
          const newGlows = [...prevGlows];
          const glow = newGlows[index];

          // 生成新位置和新的隨機參數
          const { left, top } = generatePosition(newGlows, index);
          newGlows[index] = {
            ...glow,
            left,
            top,
            size: 300 + Math.random() * 200,
            maxOpacity: 0.15 + Math.random() * 0.1,
            blur: 40 + Math.random() * 30,
            duration: 6000 + Math.random() * 4000,
          };

          return newGlows;
        });

        // 設置下一次循環（在當前週期完成後）
        const currentDuration = glows[index]?.duration || 8000;
        animationRefs.current[index] = setTimeout(animateGlow, currentDuration);
      };

      // 每個光暈有不同的初始延遲，避免同時變化
      const initialDelay = index * 2000;
      animationRefs.current[index] = setTimeout(animateGlow, initialDelay + (glows[index]?.duration || 8000));
    };

    // 啟動所有光暈的動畫
    if (glows.length === 3) {
      for (let i = 0; i < 3; i++) {
        startAnimation(i);
      }
    }

    const handleResize = () => {
      if (window.innerWidth < 768) {
        setShouldRender(false);
      } else {
        setShouldRender(true);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      // 清理所有定時器
      animationRefs.current.forEach(timer => clearTimeout(timer));
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {glows.map((glow) => (
        <div
          key={glow.id}
          className="glow-orb-animated"
          style={{
            left: `${glow.left}%`,
            top: `${glow.top}%`,
            width: `${glow.size}px`,
            height: `${glow.size}px`,
            filter: `blur(${isLowPerf ? glow.blur * 0.7 : glow.blur}px)`,
            '--max-opacity': isLowPerf ? glow.maxOpacity * 0.7 : glow.maxOpacity,
            '--duration': `${glow.duration}ms`,
          }}
        />
      ))}
    </div>
  );
}
