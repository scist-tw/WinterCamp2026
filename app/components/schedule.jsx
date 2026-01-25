"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Calendar, X } from "lucide-react";

export default function Schedule() {
  const [scheduleData, setScheduleData] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    fetch("/data/schedule.json")
      .then((res) => res.json())
      .then((data) => setScheduleData(data.scheduleData));
  }, []);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section id="schedule" className="py-20 lg:py-32 px-6 lg:px-12 bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="mb-3 flex items-center justify-center gap-2">
            <Calendar className="w-6 h-6 text-[oklch(0.75_0.15_85)]" />
            <span className="section-eyebrow">SCHEDULE // 課程活動</span>
          </div>
          <h2 className="section-title text-3xl lg:text-5xl font-bold mb-4">課程活動</h2>
          <p className="text-foreground/70 text-base lg:text-lg max-w-2xl mx-auto">
            精心規劃四天密集課程，涵蓋破冰、課程、社群交流與黑客松
          </p>
        </div>

        {/* Day Tabs */}
        <div className="mb-12 flex flex-wrap gap-3 justify-center">
          {scheduleData.map((day, idx) => (
            <div
              key={idx}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-[oklch(0.75_0.15_85)]/10 to-[oklch(0.8_0.18_85)]/10 border border-[oklch(0.75_0.15_85)]/30 backdrop-blur-sm text-center"
            >
              <div className="font-bold text-sm md:text-base text-[oklch(0.75_0.15_85)]">
                {day.day}
              </div>
              <div className="text-xs text-foreground/60">{day.date}</div>
            </div>
          ))}
        </div>

        {/* Schedule Cards Grid */}
        <div className="space-y-6">
          {scheduleData.map((day, dayIdx) => (
            <div key={dayIdx} className="border-l-4 border-[oklch(0.75_0.15_85)]/50 pl-6 py-4">
              <h3 className="text-2xl font-bold mb-6 text-[oklch(0.75_0.15_85)]">
                {day.day} - {day.date}
              </h3>

              <div className="space-y-3">
                {day.slots.map((slot, slotIdx) => {
                  const hasDetail = hasDetails(slot);

                  return (
                    <div 
                      key={slotIdx}
                      className={`rounded-2xl p-4 md:p-6 transition-all border-2 border-[oklch(0.75_0.15_85)]/30 bg-card ${
                        hasDetail
                          ? "cursor-pointer hover:shadow-lg hover:scale-[1.01] hover:border-[oklch(0.75_0.15_85)]/60"
                          : "cursor-default"
                      }`}
                      onClick={() => {
                        // console.log("Card clicked:", slot.activity, hasDetail);
                        openModal(slot, dayIdx, slotIdx);
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="text-xs md:text-sm font-bold text-[oklch(0.75_0.15_85)] mb-1 opacity-80">
                            {slot.time}
                          </div>
                          <h4 className="text-lg md:text-xl font-bold text-foreground">
                            {slot.activity}
                          </h4>
                        </div>
                        {hasDetail && (
                          <div className="ml-3 flex-shrink-0 px-3 py-1 bg-[oklch(0.75_0.15_85)]/20 rounded-full text-xs text-[oklch(0.75_0.15_85)] font-semibold">
                            詳情
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
