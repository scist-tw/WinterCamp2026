"use client";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-md font-semibold text-gray-800">
            SCIST x SCAICT 2026 聯合寒訓
          </div>

          <div className="flex items-center gap-8">
            <button
              onClick={() => scrollToSection("schedule")}
              className="text-gray-700 hover:text-blue-400 font-medium transition-colors cursor-pointer"
            >
              課程活動
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="text-gray-700 hover:text-blue-400 font-medium transition-colors cursor-pointer"
            >
              報名資訊
            </button>
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6 font-medium cursor-pointer"
              onClick={() =>
                window.open(
                  "https://docs.google.com/forms/d/e/1FAIpQLSeX88997wSKQ0K8wUMT4s4x3lprJeL_Jq2xO_jDmGvnq4mQPg/viewform",
                  "_blank"
                )
              }
            >
              立即報名
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
