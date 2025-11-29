"use client";

export default function StructuredData() {
  const eventData = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "SCIST x SCAICT 2026 聯合寒訓 - 閃電四連編",
    "description": "四天三夜密集訓練，從 LLM 基礎到雲端部署，打造專屬的 AI 應用。由 SCIST 與 SCAICT 首度攜手合作舉辦的寒訓活動。",
    "startDate": "2026-02-05T00:00:00+08:00",
    "endDate": "2026-02-08T23:59:59+08:00",
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": "國立成功大學電機工程學系",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "台南市",
        "addressCountry": "TW"
      }
    },
    "image": [
      "https://scist.gonets.top/assets/images/winter.png"
    ],
    "organizer": [
      {
        "@type": "Organization",
        "name": "SCIST",
        "url": "https://scist.org"
      },
      {
        "@type": "Organization",
        "name": "SCAICT",
        "url": "https://scaict.org"
      }
    ],
    "offers": [
      {
        "@type": "Offer",
        "name": "早鳥優惠",
        "price": "4300",
        "priceCurrency": "TWD",
        "validFrom": "2024-12-01T00:00:00+08:00",
        "validThrough": "2024-12-14T23:59:59+08:00",
        "availability": "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        "name": "單人報名",
        "price": "4500",
        "priceCurrency": "TWD",
        "availability": "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        "name": "雙人團報",
        "price": "4200",
        "priceCurrency": "TWD",
        "availability": "https://schema.org/InStock"
      }
    ]
  };

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SCIST x SCAICT",
    "url": "https://scist.gonets.top",
    "logo": "https://scist.gonets.top/assets/images/winter.png",
    "sameAs": [
      "https://scist.org",
      "https://scaict.org"
    ]
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "首頁",
        "item": "https://scist.gonets.top"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "課程內容",
        "item": "https://scist.gonets.top/course"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "報名資訊",
        "item": "https://scist.gonets.top/pricing"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "過往紀錄",
        "item": "https://scist.gonets.top/gallery"
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": "工作人員",
        "item": "https://scist.gonets.top/team"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
    </>
  );
}
