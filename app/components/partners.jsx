"use client";

import { useEffect, useState, useRef } from "react";

export default function Partners() {
  const [partners, setPartners] = useState([]);
  const trackRef = useRef(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    fetch("/data/partners.json")
      .then((res) => res.json())
      .then((data) => setPartners(data.partners || []))
      .catch((err) => console.error("Failed to load partners:", err));
  }, []);

  // rAF marquee: wait for images to load then run continuous translate
  useEffect(() => {
    if (!trackRef.current) return;
    const el = trackRef.current;
    let rafId = null;
    let ro = null;
    let mounted = true;

    const waitImages = () => {
      const imgs = Array.from(el.querySelectorAll('img'));
      return Promise.all(
        imgs.map((img) =>
          img.complete
            ? Promise.resolve()
            : new Promise((res) => {
                img.addEventListener('load', res, { once: true });
                img.addEventListener('error', res, { once: true });
              })
        )
      );
    };

    let last = performance.now();
    let pos = 0;
    let halfWidth = 0;

    const measure = () => {
      if (!el) return;
      halfWidth = el.scrollWidth / 2;
      // Ensure transform stays within bounds
      if (Math.abs(pos) >= halfWidth) pos = pos % halfWidth;
    };

    const start = async () => {
      await waitImages();
      if (!mounted) return;
      measure();

      // prefer duration-based speed: one half-loop in duration seconds
      const duration = 8; // seconds for half sequence
      let speed = halfWidth / Math.max(duration, 0.01); // px per second

      const step = (now) => {
        const dt = (now - last) / 1000;
        last = now;
        if (!pausedRef.current) {
          pos -= speed * dt;
          if (halfWidth > 0 && pos <= -halfWidth) {
            pos += halfWidth;
          }
          el.style.transform = `translate3d(${pos}px,0,0)`;
        }
        rafId = requestAnimationFrame(step);
      };

      // observe size changes
      ro = new ResizeObserver(() => {
        measure();
        // recalc speed based on new width
        const newSpeed = halfWidth / Math.max(duration, 0.01);
        speed = newSpeed;
      });
      ro.observe(el);

      last = performance.now();
      rafId = requestAnimationFrame(step);
    };

    start().catch((e) => console.error('marquee start error', e));

    return () => {
      mounted = false;
      if (rafId) cancelAnimationFrame(rafId);
      try {
        if (ro) ro.disconnect();
      } catch (e) {}
    };
  }, [partners.length]);

  if (!partners || partners.length === 0) return null;

  // duplicate for seamless loop
  const items = [...partners, ...partners];

  return (
    <section id="partners" className="py-20 lg:py-32 px-6 lg:px-12 background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="mb-3 flex justify-center">
            <span className="section-eyebrow">PARTNERS // 合作社團</span>
          </div>
          <h2 className="section-title text-3xl lg:text-5xl font-bold mb-4">合作社團</h2>
          <p className="text-foreground/70 text-base lg:text-lg max-w-2xl mx-auto">
            與我們一起打造精彩的學習體驗
          </p>
        </div>

        <div className="club-container relative w-full overflow-hidden">
          <div
            className="club-list"
            ref={trackRef}
            onMouseEnter={() => (pausedRef.current = true)}
            onMouseLeave={() => (pausedRef.current = false)}
            onTouchStart={() => (pausedRef.current = true)}
            onTouchEnd={() => (pausedRef.current = false)}
          >
            {items.map((p, i) => (
              <div key={i} className="club-item">
                <a
                  href={p.link || '#'}
                  target={p.link ? '_blank' : undefined}
                  rel={p.link ? 'noopener noreferrer' : undefined}
                  className="relative w-full h-full block"
                  aria-label={p.link ? `前往 ${p.name}` : p.name}
                >
                  <img src={p.logo || '/assets/images/placeholder.webp'} alt={p.name} />
                  <div className="back">
                    <h4>{p.name}</h4>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .club-container { position: relative; }
        .club-list { display:flex; gap:1rem; padding:2rem 0; margin-top:2rem; will-change: transform; }
        .club-item { position: relative; flex: 0 0 auto; width: 8rem; height: 8rem; border-radius: 1rem; overflow: hidden; background: rgba(255,255,255,0.03); display:flex; align-items:center; justify-content:center }
        .club-item img { width:100%; height:100%; object-fit:contain; display:block }
        .club-item .back { position:absolute; inset:0; display:flex; align-items:flex-end; justify-content:center; background: linear-gradient(180deg, transparent, rgba(0,0,0,0.6)); opacity:0; transition: opacity .25s }
        .club-item:hover .back { opacity:1 }
        .club-item h4 { color: white; font-weight:700; padding:0.75rem; font-size:0.9rem }
        /* rAF-driven marquee - no keyframes to avoid reset jump */
        @media (min-width: 1024px) { .club-item { width:10rem; height:10rem } }
      `}</style>
    </section>
  );
}
