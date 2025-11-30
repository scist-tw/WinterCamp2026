"use client";

import { useEffect } from "react";

export default function FontManager() {
  useEffect(() => {
    let aborted = false;
    const applyFonts = async () => {
      try {
        const res = await fetch("/data/fonts.json", { cache: "no-store" });
        const json = await res.json();
        if (aborted) return;

        const fonts = json.fonts || {};
        const zh = fonts.zh || {};
        const en = fonts.en || {};
        const display = fonts.display || {};

        const root = document.documentElement.style;

        // Optionally inject Google Fonts (or any CSS) links from JSON
        const toLinks = new Set();
        // top-level links array
        if (Array.isArray(json.links)) json.links.forEach((h) => h && toLinks.add(h));
        // per-font google link
        [zh, en, display].forEach((cfg) => {
          if (cfg && cfg.google) toLinks.add(cfg.google);
        });

        const appended = [];
        const ensurePreconnect = (href, id) => {
          if (document.getElementById(id)) return;
          const link = document.createElement("link");
          link.id = id;
          link.rel = "preconnect";
          link.href = href;
          if (href.includes("gstatic")) link.crossOrigin = "anonymous";
          document.head.appendChild(link);
          appended.push(link);
        };

        if (toLinks.size > 0) {
          const needsGoogle = [...toLinks].some((h) => h.includes("fonts.googleapis.com"));
          if (needsGoogle) {
            ensurePreconnect("https://fonts.googleapis.com", "gf-preconnect-api");
            ensurePreconnect("https://fonts.gstatic.com", "gf-preconnect-static");
          }
          toLinks.forEach((href) => {
            if (!document.querySelector(`link[rel="stylesheet"][href="${href}"]`)) {
              const l = document.createElement("link");
              l.rel = "stylesheet";
              l.href = href;
              l.setAttribute("data-font-link", "true");
              document.head.appendChild(l);
              appended.push(l);
            }
          });
        }

        // Families
        if (zh.family) root.setProperty("--font-zh", zh.family);
        if (en.family) root.setProperty("--font-en", en.family);
        if (display.family) root.setProperty("--font-display-family", display.family);

        // Back-compat: map to existing theme variables used in globals.css
        if (zh.family) root.setProperty("--font-noto-sans-tc", zh.family);
        if (en.family) root.setProperty("--font-inter", en.family);
        if (display.family) root.setProperty("--font-space-grotesk", display.family);

        // Sizes
        const setSizes = (prefix, sizes) => {
          if (!sizes) return;
          for (const [k, v] of Object.entries(sizes)) {
            root.setProperty(`--font-size-${prefix}-${k}`, String(v));
          }
        };
        setSizes("zh", zh.sizes);
        setSizes("en", en.sizes);
        setSizes("display", display.sizes);

        // Weights
        const setWeights = (prefix, weight) => {
          if (!weight) return;
          if (weight.normal) root.setProperty(`--font-weight-${prefix}-normal`, String(weight.normal));
          if (weight.bold) root.setProperty(`--font-weight-${prefix}-bold`, String(weight.bold));
        };
        setWeights("zh", zh.weight);
        setWeights("en", en.weight);
        setWeights("display", display.weight);
      } catch (e) {
        // Silent fail in production; can log in dev if needed
        // console.error("Failed to load fonts.json", e);
      }
    };

    applyFonts();
    return () => {
      aborted = true;
      // Note: we do not aggressively remove <link>s to avoid FOUT on route changes.
    };
  }, []);

  return null;
}
