"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

export default function CoursePage() {
  const [scheduleData, setScheduleData] = useState([]);

  useEffect(() => {
    fetch("/data/schedule.json")
      .then((res) => res.json())
      .then((data) => setScheduleData(data.scheduleData));
  }, []);

  return (
    <div className="min-h-screen">
      {/* Schedule Section */}
      <section className="pt-32 pb-20 lg:pb-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="mb-3 flex justify-center">
              <span className="section-eyebrow">SCHEDULE // 課程活動</span>
            </div>
            <h2 className="section-title text-3xl lg:text-5xl font-bold mb-4">
              課程時間表
            </h2>
            <p className="text-foreground/70 text-lg max-w-3xl mx-auto">
              完整規劃的四天課程，理論與實作並重
            </p>
          </div>

          {/* Schedule - One day per section with clear separation */}
          <div className="max-w-5xl mx-auto space-y-20">
            {scheduleData.map((day, dayIdx) => (
              <div key={dayIdx} className="space-y-6">
                {/* Day Header */}
                <div className="bg-gradient-to-r from-[oklch(0.75_0.15_85)] to-[oklch(0.65_0.13_85)] rounded-2xl p-6 md:p-8">
                  <div className="text-center">
                    <div className="text-sm font-bold text-black/80 tracking-widest uppercase mb-2">
                      Day {dayIdx + 1}
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black text-black">
                      {day.day}
                    </h3>
                    {day.date && (
                      <p className="text-black/70 text-sm md:text-base mt-2 font-medium">
                        {day.date}
                      </p>
                    )}
                  </div>
                </div>

                {/* Day Schedule */}
                <div className="space-y-3">
                  {day.slots.map((slot, slotIdx) => (
                    <Card
                      key={slotIdx}
                      className="neon-card rounded-xl p-4 md:p-6 border-l-4 border-[oklch(0.75_0.15_85)] hover:shadow-lg hover:shadow-[oklch(0.75_0.15_85)]/20 hover:scale-[1.01] transition-all bg-card/50 backdrop-blur-sm"
                    >
                      <div className="flex gap-4 md:gap-6 items-start">
                        {/* Time */}
                        <div className="flex-shrink-0 w-24 md:w-32 pt-1">
                          <div className="text-sm md:text-base font-bold text-[oklch(0.75_0.15_85)]">
                            {slot.time}
                          </div>
                        </div>

                        {/* Activity Content */}
                        <div className="flex-1 min-w-0">
                          <p className="text-base md:text-lg font-semibold text-foreground leading-relaxed break-words">
                            {slot.activity}
                          </p>
                          {slot.details && (
                            <p className="text-sm text-foreground/60 mt-2">
                              {slot.details}
                            </p>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Day Divider */}
                {dayIdx < scheduleData.length - 1 && (
                  <div className="flex items-center gap-4 py-8">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[oklch(0.75_0.15_85)] to-transparent"></div>
                    <div className="text-xs font-bold text-foreground/40 uppercase tracking-widest">
                      End of Day
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[oklch(0.75_0.15_85)] to-transparent"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
