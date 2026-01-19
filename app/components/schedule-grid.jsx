"use client";

import { useEffect, useMemo, useState } from "react";

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

export default function ScheduleGrid() {
  const [schedule, setSchedule] = useState(DEFAULT_SCHEDULE);

  useEffect(() => {
    fetch("/data/schedule.json")
      .then((res) => res.json())
      .then((data) => setSchedule({ ...DEFAULT_SCHEDULE, ...data }));
  }, []);

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
                gridTemplateColumns: `repeat(${schedule.days.length}, minmax(0, 1fr))`,
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

                    return (
                      <div
                        key={`${event.title}-${event.start}`}
                        className={`absolute left-2 right-2 rounded-lg px-3 py-2.5 border shadow-sm backdrop-blur-sm ${style.cardClass}`}
                        style={{ top: `${adjustedTop}px`, height: `${adjustedHeight}px` }}
                      >
                        <div className="flex flex-col items-center justify-center gap-2 text-center h-full">
                          <div className="text-base font-semibold text-foreground leading-tight">
                            {event.title}
                          </div>
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

                  return (
                    <div
                      key={`${event.title}-${event.start}`}
                      className={`absolute left-2 right-2 rounded-lg px-3 py-2.5 border shadow-sm backdrop-blur-sm ${style.cardClass}`}
                      style={{ top: `${adjustedTop}px`, height: `${adjustedHeight}px` }}
                    >
                      <div className="flex flex-col items-center justify-center gap-2 text-center h-full">
                        <div className="text-base font-semibold text-foreground leading-tight">
                          {event.title}
                        </div>
                        <span
                          className={`rounded-md border px-2.5 py-0.5 text-sm font-semibold ${style.tagClass}`}
                        >
                          {style.label}
                        </span>
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
                  const top = (lastEnd - startMinutes) * pxPerMin;
                  const adjustedHeight = Math.max(columnHeight - top, 24);
                  const adjustedTop = top;

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
  );
}
