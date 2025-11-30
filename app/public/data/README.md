資料檔說明（app/public/data）

用途
- 此資料夾提供前台讀取的 JSON 設定與內容，修改後可直接反映在網站。
- 主要檔案：
  - partners.json：合作社團清單（名稱、Logo、連結）
  - team.json：工作人員清單（姓名、職務、所屬組別等）
  - fonts.json：全站字體與尺寸、字重設定，支援 Google Fonts 連結
  - 其他：faq.json、gallery.json、schedule.json 供各區塊使用


partners.json（合作社團）
- 結構：
  {
    "partners": [
      { "name": "社團 A", "logo": "/assets/club-a.png", "link": "https://example.com" },
      { "name": "社團 B", "logo": "/assets/club-b.png", "link": "" }
    ]
  }
- 欄位：
  - name：社團名稱（必填）
  - logo：圖片路徑（放在 app/public 底下，前台以 "/" 開頭引用，如 /assets/club-a.png）
  - link：點擊導向連結（可留空）
- 輪播已做成無縫連續滾動，會自動讀取此檔案。


fonts.json（全站字體設定，支援 Google Fonts）
- 結構：
  {
    "links": [
      "https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;700&display=swap"
    ],
    "fonts": {
      "zh": {
        "family": "'Noto Sans TC', system-ui, -apple-system, sans-serif",
        "google": "https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;700&display=swap",
        "sizes": { "sm": "12px", "base": "14px", "lg": "16px", "xl": "20px" },
        "weight": { "normal": 400, "bold": 700 }
      },
      "en": {
        "family": "Inter, system-ui, -apple-system, sans-serif",
        "google": "https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap",
        "sizes": { "sm": "12px", "base": "14px", "lg": "16px", "xl": "20px" },
        "weight": { "normal": 400, "bold": 700 }
      },
      "display": {
        "family": "'Space Grotesk', Inter, system-ui, sans-serif",
        "google": "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700;900&display=swap",
        "sizes": { "sm": "20px", "base": "28px", "lg": "36px", "xl": "48px" },
        "weight": { "normal": 700, "bold": 900 }
      }
    }
  }
- 使用方式：
  1) 將欲使用的 Google Fonts CSS 連結填入 `links`，或於 `fonts.zh|en|display.google` 指定（兩者可併用）。
  2) 在 `family` 寫對應 CSS 字族（含備援字體），大小與字重可依需求調整。
  3) 網站啟動後由 FontManager 自動：
     - 注入 `<link rel="stylesheet" ...>` 與 `preconnect` 至 `<head>`
     - 寫入 CSS 變數供全站使用：
       - 家族：`--font-zh`、`--font-en`、`--font-display-family`
       - 尺寸：`--font-size-zh-*`、`--font-size-en-*`、`--font-size-display-*`
       - 字重：`--font-weight-*-normal|bold`
- 前端快捷 class（在任何元件可用）：
  - 字族：`.font-zh`、`.font-en`、`.font-display`
  - 尺寸：`.text-zh-{sm|base|lg|xl}`、`.text-en-{sm|base|lg|xl}`、`.text-display-{sm|base|lg|xl}`


team.json（工作人員）
- 主要結構：
  {
    "allMembers": [
      {
        "name": "姓名/暱稱",
        "role": "行政組" 或 ["副召","組員"...],
        "email": "用於產生 Gravatar 頭像，可留空",
        "category": "總召組" 或 ["資訊組","組長"...],
        "link": "點擊頭像導向，可留空",
        "bio": "簡短介紹，可留空"
      }
    ]
  }
- 說明：
  - role、category 皆可為字串或陣列；category 可包含「組長／組員」等修飾詞。
  - 一個成員可同時出現在多個分類（例如同時屬於資訊組與編輯組）。


注意事項
- 圖片路徑請放在 `app/public` 底下，前端引用以 `/` 開頭（例如 `/assets/logo.png`）。
- 字體載入會自動加入 Google Fonts 連結，避免 FOUT 已加入 preconnect。
- 若編輯 fonts.json 後發現字體未更新，請重新整理頁面；開發中建議清掉快取再測試。

