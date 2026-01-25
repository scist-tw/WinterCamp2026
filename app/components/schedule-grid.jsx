"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

const DEFAULT_SCHEDULE = {
  startTime: "08:00",
  endTime: "20:00",
  pxPerMin: 1,
  days: [],
};

const toMinutes = (timeString) => {
  const [hour, minute] = timeString.split(":").map(Number);
  return hour * 60 + minute;
};

const formatHour = (totalMinutes) => {
  const hour = Math.floor(totalMinutes / 60);
  return `${String(hour).padStart(2, "0")}:00`;
};

const EVENT_STYLES = [
  {
    match: /課程|講座|分享|說明/,
    cardClass: "border-[oklch(0.75_0.15_85)]/35 bg-[oklch(0.75_0.15_85)]/14",
    tagClass: "border-[oklch(0.75_0.15_85)]/45 bg-[oklch(0.75_0.15_85)]/20 text-[oklch(0.92_0.08_85)]",
  },
  {
    match: /早餐|午餐|晚餐/,
    cardClass: "border-[oklch(0.72_0.1_85)]/30 bg-[oklch(0.72_0.1_85)]/12",
    tagClass: "border-[oklch(0.72_0.1_85)]/40 bg-[oklch(0.72_0.1_85)]/18 text-[oklch(0.9_0.06_85)]",
  },
  {
    match: /破冰|遊戲|晚會|室內活動|社群攤位/,
    cardClass: "border-[oklch(0.68_0.08_85)]/30 bg-[oklch(0.68_0.08_85)]/12",
    tagClass: "border-[oklch(0.68_0.08_85)]/40 bg-[oklch(0.68_0.08_85)]/18 text-[oklch(0.88_0.05_85)]",
  },
  {
    match: /黑客松|成果|頒獎|閉幕|開訓|賦歸/,
    cardClass: "border-[oklch(0.78_0.14_85)]/35 bg-[oklch(0.78_0.14_85)]/18",
    tagClass: "border-[oklch(0.78_0.14_85)]/45 bg-[oklch(0.78_0.14_85)]/22 text-[oklch(0.95_0.1_85)]",
  },
  {
    match: /住宿休息|賦歸/,
    cardClass: "border-[oklch(0.65_0.02_0)]/45 bg-[oklch(0.65_0.02_0)]/12",
    tagClass: "border-[oklch(0.65_0.02_0)]/50 bg-[oklch(0.65_0.02_0)]/18 text-foreground/70",
  },
];

const getEventStyle = (title) => {
  const matched = EVENT_STYLES.find((item) => item.match.test(title));
  return matched || EVENT_STYLES[0];
};

const getDayMeta = (label) => {
  const match = label.match(/(\d+)/);
  return {
    number: match ? match[1] : null,
    label,
  };
};

const hasEventDetails = (event) => {
  return (
    event &&
    (event.description || event.speaker || event.link || event.speakerBio || event.speakerAvatar)
  );
};

export default function ScheduleGrid() {
  const [schedule, setSchedule] = useState(DEFAULT_SCHEDULE);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const [scrollHintOpacity, setScrollHintOpacity] = useState(1);
  const modalRef = useRef(null);

  useEffect(() => {
    fetch("/data/schedule.json")
      .then((res) => res.json())
      .then((data) => setSchedule({ ...DEFAULT_SCHEDULE, ...data }));
  }, []);

  useEffect(() => {
    if (!selectedEvent) return;
    setIsModalOpen(true);
    const onKey = (e) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
        setTimeout(() => setSelectedEvent(null), 300);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedEvent]);

  useEffect(() => {
    if (!selectedEvent) return;
    const modalEl = modalRef.current;
    if (!modalEl) return;

    const updateHint = () => {
      const overflow = modalEl.scrollHeight - modalEl.clientHeight;
      const canScroll = overflow > 8;
      const atTop = modalEl.scrollTop <= 2;
      setShowScrollHint(canScroll);
      setScrollHintOpacity(canScroll && atTop ? 1 : 0);
    };

    let rafId = 0;
    let rafId2 = 0;
    rafId = requestAnimationFrame(() => {
      updateHint();
      rafId2 = requestAnimationFrame(updateHint);
    });
    const onScroll = () => {
      if (modalEl.scrollHeight - modalEl.clientHeight <= 8) {
        setShowScrollHint(false);
        setScrollHintOpacity(0);
        return;
      }
      const scrollTop = modalEl.scrollTop;
      const nextOpacity = Math.max(0, Math.min(1, 1 - scrollTop / 120));
      setScrollHintOpacity(nextOpacity);
    };

    modalEl.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateHint);
    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => updateHint())
        : null;
    if (resizeObserver) {
      resizeObserver.observe(modalEl);
    }
    return () => {
      modalEl.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateHint);
      if (resizeObserver) resizeObserver.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
      if (rafId2) cancelAnimationFrame(rafId2);
    };
  }, [selectedEvent, isModalOpen]);

  useEffect(() => {
    if (!selectedEvent) return undefined;
    const root = document.documentElement;
    const lenis = typeof window !== "undefined" ? window.__lenis : null;
    const lenisScroll =
      lenis && typeof lenis.scroll === "number" ? lenis.scroll : undefined;
    const scrollY =
      lenisScroll !== undefined ? lenisScroll : window.scrollY || root.scrollTop || 0;

    const prevBodyOverflow = document.body.style.overflow;
    const prevRootOverflow = root.style.overflow;

    document.body.style.overflow = "hidden";
    root.style.overflow = "hidden";
    if (lenis && typeof lenis.stop === "function") {
      lenis.stop();
    }

    const preventScroll = (event) => {
      if (modalRef.current && modalRef.current.contains(event.target)) return;
      event.preventDefault();
    };

    document.addEventListener("wheel", preventScroll, { passive: false });
    document.addEventListener("touchmove", preventScroll, { passive: false });

    return () => {
      document.removeEventListener("wheel", preventScroll);
      document.removeEventListener("touchmove", preventScroll);

      document.body.style.overflow = prevBodyOverflow;
      root.style.overflow = prevRootOverflow;

      if (lenis && typeof lenis.start === "function") {
        lenis.start();
      }

      if (lenis && typeof lenis.scrollTo === "function") {
        lenis.scrollTo(scrollY, { immediate: true });
      } else {
        window.scrollTo(0, scrollY);
      }
    };
  }, [selectedEvent]);

  const { startMinutes, endMinutes, pxPerMin, hourSlots, columnHeight, hourSlotHeight } =
    useMemo(() => {
      const startMinutesValue = toMinutes(schedule.startTime);
      const endMinutesValue = toMinutes(schedule.endTime);
      const pixelPerMinute = Number(schedule.pxPerMin) || 1;

      const slots = [];
      for (let t = startMinutesValue; t <= endMinutesValue; t += 60) {
        slots.push(t);
      }

      return {
        startMinutes: startMinutesValue,
        endMinutes: endMinutesValue,
        pxPerMin: pixelPerMinute,
        hourSlots: slots,
        columnHeight: (endMinutesValue - startMinutesValue) * pixelPerMinute,
        hourSlotHeight: 60 * pixelPerMinute,
      };
    }, [schedule.startTime, schedule.endTime, schedule.pxPerMin]);

  if (!schedule.days.length) {
    return null;
  }

  return (
    <>
      <div className="flex gap-0 overflow-hidden">
      {/* Fixed TIME column */}
      <div className="flex flex-col bg-card/80 border-r border-border/60 flex-shrink-0 rounded-l-2xl overflow-hidden">
        <div className="bg-muted/70 border-b border-border/60 flex items-center justify-center text-xs font-semibold tracking-[0.3em] text-foreground/60" style={{ height: "120px", width: "88px" }}>
          TIME
        </div>
        {hourSlots.map((slot) => (
          <div
            key={slot}
            className="text-xs font-semibold text-foreground/60 text-right pr-3 border-b border-border/40 flex items-center justify-end flex-shrink-0"
            style={{ height: `${hourSlotHeight}px`, width: "88px" }}
          >
            {formatHour(slot)}
          </div>
        ))}
      </div>

      {/* Scrollable content */}
      <div className="overflow-x-auto flex-1">
        <div style={{ minWidth: `${Math.max(880, schedule.days.length * 150)}px` }}>
          <div className="relative">
            <div
              className="relative grid rounded-r-2xl bg-card/95 border border-border/60 shadow-lg overflow-hidden"
              style={{
                  gridTemplateColumns: 'repeat(' + schedule.days.length + ', minmax(0, 1fr))',
                }}
            >
              {schedule.days.map((day) => {
                const meta = getDayMeta(day.day);
                return (
                  <div
                    key={day.day}
                    className="bg-linear-to-b from-muted/80 via-muted/60 to-muted/30 border-b border-r border-border/60 text-center flex flex-col items-center justify-center"
                    style={{ minHeight: "120px" }}
                  >
                    {meta.number ? (
                      <>
                        <div className="text-xs font-semibold tracking-[0.3em] text-foreground/50">
                          DAY
                        </div>
                        <div className="text-3xl font-black text-foreground">
                          {meta.number}
                        </div>
                      </>
                    ) : (
                      <div className="text-xl font-black text-foreground">{meta.label}</div>
                    )}
                    <div className="text-sm text-foreground/60">{meta.label}</div>
                    {day.date ? (
                      <div className="text-sm text-foreground/50">{day.date}</div>
                    ) : null}
                  </div>
                );
              })}

              {schedule.days.map((day, dayIndex) => (
                <div
                  key={day.day}
                  className="relative border-r border-border/60"
                  style={{
                    height: `${columnHeight}px`,
                    backgroundColor: dayIndex % 2 === 0 ? "oklch(0.18 0 0 / 0.55)" : "oklch(0.16 0 0 / 0.55)",
                    backgroundImage: `linear-gradient(to bottom, transparent ${hourSlotHeight - 1}px, hsl(var(--border)) ${hourSlotHeight}px)`,
                    backgroundSize: `100% ${hourSlotHeight}px`,
                  }}
                >
                  {day.events.map((event) => {
                    const start = toMinutes(event.start);
                    const end = toMinutes(event.end);
                    const top = (start - startMinutes) * pxPerMin;
                    const height = (end - start) * pxPerMin;
                    const style = getEventStyle(event.title);
                    const gap = 10;
                    const adjustedHeight = Math.max(height - gap, 24);
                    const adjustedTop = top + gap / 2;

                        const isClickable = hasEventDetails(event);
                        return (
                          <div
                            key={event.title + '-' + event.start}
                            role={isClickable ? 'button' : 'presentation'}
                            tabIndex={isClickable ? 0 : -1}
                            onClick={() => isClickable && setSelectedEvent({ ...event, day: day.day })}
                            onKeyDown={(e) => { if (isClickable && e.key === 'Enter') setSelectedEvent({ ...event, day: day.day }); }}
                            className={'absolute left-2 right-2 rounded-lg px-3 py-2.5 border shadow-sm backdrop-blur-sm ' + (isClickable ? 'cursor-pointer hover:opacity-70 hover:shadow-lg transition-all duration-200 ' : 'cursor-default opacity-85 ') + style.cardClass}
                            style={{ top: `${adjustedTop}px`, height: `${adjustedHeight}px` }}
                          >
                            <div className="flex flex-col items-center justify-center text-center h-full relative">
                              <span className="text-base font-semibold text-foreground leading-tight">
                                {event.title}
                              </span>
                              {isClickable && (
                                <svg className="w-4 h-4 absolute bottom-1 right-1" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                          </div>
                        );
                  })}
                  {(() => {
                    if (!day.events.length) {
                      return null;
                    }
                    const lastEnd = toMinutes(day.events[day.events.length - 1].end);
                    if (lastEnd >= endMinutes) {
                      return null;
                    }
                    const gap = 10;
                    const top = (lastEnd - startMinutes) * pxPerMin;
                    const height = (endMinutes - lastEnd) * pxPerMin;
                    const adjustedHeight = Math.max(height - gap, 24);
                    const adjustedTop = top + gap / 2;

                    return (
                      <div
                        aria-hidden="true"
                        className="absolute left-2 right-2 rounded-lg border border-transparent bg-transparent"
                        style={{ top: `${adjustedTop}px`, height: `${adjustedHeight}px` }}
                      />
                    );
                  })()}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Modal for event details */}
      {selectedEvent && typeof document !== "undefined"
        ? createPortal(
            <div
              aria-modal="true"
              role="dialog"
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
              onClick={() => {
                setIsModalOpen(false);
                setTimeout(() => setSelectedEvent(null), 300);
              }}
            >
              <div
                className={
                  "absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 " +
                  (isModalOpen ? "opacity-100" : "opacity-0")
                }
              />
              <div
                className={
                  "relative rounded-3xl max-h-[calc((85vh-2rem))] w-[calc((100vw-2rem))] lg:max-h-[calc((90vh-20rem))] cursor-auto z-10 transition-all duration-300 bg-linear-to-br from-card via-card to-muted border border-[oklch(0.75_0.15_85)]/20 neon-card touch-pan-y " +
                  (isModalOpen ? "opacity-100 scale-100" : "opacity-0 scale-95")
                }
                style={{ maxWidth: 800 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  ref={modalRef}
                  className="modal-scroll max-h-[calc((85vh-2rem))] lg:max-h-[calc((90vh-20rem))] overflow-y-auto p-8 lg:p-12"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                  onWheel={(e) => e.stopPropagation()}
                  onTouchMove={(e) => e.stopPropagation()}
                >
                  <div className="flex items-start justify-between mb-8">
                  <div>
                    <div className="text-3xl lg:text-4xl font-black text-[oklch(0.75_0.15_85)] mb-4">
                      {selectedEvent.title}
                    </div>
                    {selectedEvent.subtitle ? (
                      <div className="text-lg lg:text-xl text-foreground/70 mb-4">
                        {selectedEvent.subtitle}
                      </div>
                    ) : null}
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-sm text-foreground/50">
                        <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 000 2h8a1 1 0 100-2H6zM4 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 1a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                        </svg>
                        <span>{selectedEvent.day}</span>
                        {selectedEvent.start && selectedEvent.end && (
                          <span className="text-foreground/40">•</span>
                        )}
                        {selectedEvent.start && selectedEvent.end && (
                          <span>
                            {selectedEvent.start} - {selectedEvent.end}
                          </span>
                        )}
                      </div>
                      {selectedEvent.location && (
                        <div className="flex items-center gap-2 text-sm text-foreground/50 mt-1">
                          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          <span>{selectedEvent.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    aria-label="Close"
                    className="text-foreground/60 hover:text-foreground hover:opacity-100 transition-all flex-shrink-0"
                    onClick={() => {
                      setIsModalOpen(false);
                      setTimeout(() => setSelectedEvent(null), 300);
                    }}
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>

            <div className="border-t border-[oklch(0.75_0.15_85)]/20 mb-8" />

            {selectedEvent.description && (
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <svg className="w-5 h-5 text-[oklch(0.75_0.15_85)] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000 2h12a1 1 0 100-2 2 2 0 00-2 2v10a2 2 0 002 2 1 1 0 100 2h-4.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-1.414-1.414l2.414-2.414A1 1 0 0013.414 18H9a2 2 0 01-2-2 1 1 0 100 2 2 2 0 002 2h4.586a1 1 0 00.707-.293l2.414-2.414a1 1 0 001.414 1.414l-2.414 2.414A1 1 0 0013.414 20H9a2 2 0 01-2-2V5z" clipRule="evenodd" />
                  </svg>
                  <h3 className="text-xl font-black text-foreground">課程介紹</h3>
                </div>
                <p className="text-foreground/75 leading-relaxed text-base ml-8">
                  {selectedEvent.description}
                </p>
              </div>
            )}

            {selectedEvent.link && (
              <div className="mb-8">
                <a
                  href={selectedEvent.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[oklch(0.75_0.15_85)]/10 border border-[oklch(0.75_0.15_85)]/30 text-[oklch(0.75_0.15_85)] hover:bg-[oklch(0.75_0.15_85)]/20 transition-all font-semibold group ml-8"
                >
                  查看課程資料
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 100 2h3.586L9.293 9.293a1 1 0 001.414 1.414L16 6.414V10a1 1 0 100 2h-7a1 1 0 01-1-1V4a1 1 0 011-1z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                  </svg>
                </a>
              </div>
            )}

            {(selectedEvent.speaker || selectedEvent.speakerBio || selectedEvent.speakerAvatar) && (
              <>
                <div className="border-t border-[oklch(0.75_0.15_85)]/20 mb-8" />
                <div className="flex items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <svg className="w-5 h-5 text-[oklch(0.75_0.15_85)] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v2h8v-2zM16 15v2h2v-2zM2 8a2 2 0 11-4 0 2 2 0 014 0zM6 15v2H4v-2z" />
                      </svg>
                      <h3 className="text-xl font-black text-foreground">講者介紹{selectedEvent.speaker ? ` - ${selectedEvent.speaker}` : ''}</h3>
                    </div>
                    <p className="text-foreground/75 leading-relaxed text-base ml-8">
                      {selectedEvent.speakerBio || '講者資訊暫無。'}
                    </p>
                  </div>
                  {selectedEvent.speakerAvatar && (
                    <div className="flex-shrink-0">
                      <img
                        src={selectedEvent.speakerAvatar}
                        alt={selectedEvent.speaker || '講者'}
                        className="w-24 h-24 lg:w-32 lg:h-32 rounded-2xl object-cover border-2 border-[oklch(0.75_0.15_85)]/30"
                      />
                    </div>
                  )}
                </div>
              </>
            )}
                </div>
                {showScrollHint && (
                  <div
                    className="pointer-events-none absolute bottom-6 right-6 z-20"
                    style={{ opacity: scrollHintOpacity }}
                    aria-hidden="true"
                  >
                    <div className="scroll-hint-chip">
                      <span className="scroll-hint-text">向下滑動看更多</span>
                      <span className="scroll-hint-chevron">
                        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M6 7l4 5 4-5H6z" />
                        </svg>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>,
            document.body
          )
        : null}
      <style jsx>{`
        .scroll-hint-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border-radius: 999px;
          background: oklch(0.16 0 0 / 0.9);
          border: 1px solid oklch(0.75 0.15 85 / 0.35);
          color: oklch(0.92 0.08 85);
          box-shadow: 0 6px 18px -8px oklch(0 0 0 / 0.6);
        }
        .scroll-hint-text {
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-weight: 700;
        }
        .scroll-hint-chevron {
          display: inline-flex;
          align-items: center;
          animation: scrollHintPulse 1.8s ease-in-out infinite;
        }
        @keyframes scrollHintPulse {
          0% { transform: translateY(0); opacity: 0.8; }
          50% { transform: translateY(4px); opacity: 0.5; }
          100% { transform: translateY(0); opacity: 0.8; }
        }
        :global(.modal-scroll::-webkit-scrollbar) {
          width: 0;
          height: 0;
          display: none;
        }
      `}</style>
    </>
  );
}
