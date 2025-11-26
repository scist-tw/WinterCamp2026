"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export default function Schedule() {
  const [scheduleData, setScheduleData] = useState([]);
  const [leftColWidth, setLeftColWidth] = useState("150px");

  useEffect(() => {
    fetch("/data/schedule.json")
      .then((res) => res.json())
      .then((data) => setScheduleData(data.scheduleData));
  }, []);

  useEffect(() => {
    const update = () => {
      setLeftColWidth(window.innerWidth >= 768 ? "150px" : "80px");
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <section id="schedule" className="py-20 lg:py-32 px-6 lg:px-40">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="mb-3 flex items-center justify-center gap-2">
            <Calendar className="w-6 h-6 text-[oklch(0.75_0.15_85)]" />
            <span className="section-eyebrow">SCHEDULE // 課程活動</span>
          </div>
          <h2 className="section-title text-3xl lg:text-4xl font-bold">課程活動</h2>
        </div>

        <div className="overflow-x-auto">
          <div className="inline-block min-w-full">
            <div
              className="grid gap-4 mb-4"
              style={{
                gridTemplateColumns: `${leftColWidth} repeat(${
                  scheduleData.length || 1
                }, 1fr)`,
              }}
            >
              <div className="font-semibold text-foreground/60 text-sm py-2 px-2 md:py-4 md:px-0">
                時間
              </div>
              {scheduleData.map((day, idx) => (
                <div key={idx} className="text-center">
                  <div className="font-bold text-lg">{day.day}</div>
                  <div className="text-sm text-foreground/60">{day.date}</div>
                </div>
              ))}
            </div>

            {scheduleData[0]?.slots.map((_, slotIdx) => (
              <div
                key={slotIdx}
                className="grid gap-4 mb-4"
                style={{
                  gridTemplateColumns: `${leftColWidth} repeat(${scheduleData.length}, 1fr)`,
                }}
              >
                <div className="text-sm font-semibold text-foreground/70 py-2 px-2 md:py-4 md:px-4">
                  {scheduleData[0].slots[slotIdx].time}
                </div>
                {scheduleData.map((day, dayIdx) => (
                  <Card
                    key={dayIdx}
                    className="neon-card rounded-2xl p-2 md:p-4 bg-background min-h-12 md:min-h-20 flex items-center justify-center text-center transition-shadow"
                  >
                    <p className="text-xs md:text-sm font-semibold text-foreground">
                      {day.slots[slotIdx]?.activity || "-"}
                    </p>
                  </Card>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
