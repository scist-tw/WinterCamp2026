"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "早鳥優惠",
    price: "$4,300",
    description: "限時報名優惠*",
  },
  {
    name: "1人方案",
    price: "$4,500",
    description: "單人報名",
  },
  {
    name: "2人方案",
    price: "$4,200",
    description: "雙人報名",
  },
  {
    name: "3人方案",
    price: "$4,100",
    description: "三人報名",
  },
  {
    name: "4人方案",
    price: "$4,000",
    description: "四人報名",
  },
];

export default function Pricing() {
  return (
    <section className="py-20 lg:py-32 bg-background px-6 lg:px-12 text-center">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-12">報名資訊</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 text-foreground/70 text-center">
            <div>
              <p className="text-sm font-semibold mb-2">營隊日期</p>
              <p className="text-lg">2026/2/5(四)~2026/2/8(日)</p>
            </div>
            <div>
              <p className="text-sm font-semibold mb-2">報名日期</p>
              <p className="text-lg">即日起~2026/1/4(日)</p>
            </div>
            <div>
              <p className="text-sm font-semibold mb-2">營隊地點</p>
              <p className="text-lg">國立成功大學</p>
            </div>
          </div>
        </div>

        {/* compact grid on small screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-6 mb-12">
          {plans.map((plan, idx) => (
            <Card
              key={idx}
              className={`
                border-2 border-border 
                rounded-xl md:rounded-3xl 
                p-4 md:p-8 
                flex items-center justify-between md:flex-col md:items-center 
                h-20 md:h-auto 
                hover:shadow-md transition-shadow text-center cursor-pointer
                ${idx === 0 ? "bg-(--color-chart-2) text-white" : ""}
              `}
            >
              <div className="w-full flex items-center justify-between md:flex-col md:items-center">
                <div className="text-left md:text-center">
                  <h3 className="text-lg md:text-2xl font-bold mb-0 md:mb-2">
                    {plan.name}
                  </h3>
                  <p
                    className={`text-foreground/60 text-xs md:text-sm ${
                      idx === 0 ? "text-white" : "text-black"
                    }`}
                  >
                    {plan.description}
                  </p>
                </div>

                <div className="text-right md:text-center md:mt-6">
                  <div className="text-xl md:text-4xl font-bold">
                    {plan.price}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <span className="mt-4 block text-center">
          * 註：早鳥學員無論人數皆為 NTD$4,300/人
        </span>
      </div>
    </section>
  );
}
