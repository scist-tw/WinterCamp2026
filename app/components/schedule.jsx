"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

export default function Schedule() {
  const [scheduleData, setScheduleData] = useState([]);

  useEffect(() => {
    fetch("/data/schedule.json")
      .then((res) => res.json())
      .then((data) => setScheduleData(data.scheduleData));
  }, []);

  return (
    <section className="py-20 lg:py-32 bg-muted px-6 lg:px-40">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold">課程活動</h2>
        </div>

        <div className="overflow-x-auto">
          <div className="inline-block min-w-full">
            <div
              className="grid gap-4 mb-4"
              style={{
                gridTemplateColumns: `150px repeat(${scheduleData.length}, 1fr)`,
              }}
            >
              <div className="font-semibold text-foreground/60 text-sm">
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
                  gridTemplateColumns: `150px repeat(${scheduleData.length}, 1fr)`,
                }}
              >
                <div className="text-sm font-semibold text-foreground/70 py-4">
                  {scheduleData[0].slots[slotIdx].time}
                </div>
                {scheduleData.map((day, dayIdx) => (
                  <Card
                    key={dayIdx}
                    className="border border-border rounded-2xl p-4 bg-background min-h-20 flex items-center justify-center text-center hover:shadow-md transition-shadow"
                  >
                    <p className="text-sm font-semibold text-foreground">
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
