"use client";

import { useEffect, useRef } from "react";

export default function AutoFitText({
  children,
  as: Tag = "div",
  className = "",
  maxLines = 1,
  min = 12,
  max = 24,
  title,
  ...rest
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fit = () => {
      if (!el) return;
      // Start from max and shrink to fit width and maxLines height
      el.style.fontSize = `${max}px`;
      const cs = getComputedStyle(el);
      const fs = parseFloat(cs.fontSize) || max;
      let lh = parseFloat(cs.lineHeight);
      if (Number.isNaN(lh) || cs.lineHeight === "normal") {
        lh = Math.round(fs * 1.2);
      }
      const maxHeight = Math.ceil(lh * maxLines);
      el.style.maxHeight = `${maxHeight}px`;

      const fits = () => el.scrollHeight <= maxHeight + 1 && el.scrollWidth <= el.clientWidth + 1;

      let lo = min;
      let hi = max;
      let best = min;
      while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2);
        el.style.fontSize = `${mid}px`;
        // Force layout by accessing scrollHeight
        // eslint-disable-next-line no-unused-expressions
        el.scrollHeight;
        if (fits()) {
          best = mid;
          lo = mid + 1;
        } else {
          hi = mid - 1;
        }
      }
      el.style.fontSize = `${best}px`;
      el.style.maxHeight = `${maxHeight}px`;
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    if (el.parentElement) ro.observe(el.parentElement);
    window.addEventListener("resize", fit);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, [children, maxLines, min, max]);

  return (
    <Tag
      ref={ref}
      className={className}
      title={title ?? (typeof children === "string" ? children : undefined)}
      {...rest}
    >
      {children}
    </Tag>
  );
}

