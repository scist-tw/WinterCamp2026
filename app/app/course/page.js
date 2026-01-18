"use client";

import ScheduleGrid from "@/components/schedule-grid";

export default function CoursePage() {
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

          <div className="max-w-6xl mx-auto">
            <ScheduleGrid />
          </div>
        </div>
      </section>
    </div>
  );
}
