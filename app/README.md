SCIST x SCAICT 2026 網站（Next.js App Router）

快速指南
- 開發啟動：`npm run dev` 後開啟 `http://localhost:3000`
- 資料檔目錄：`app/public/data/*`
- 全站樣式入口：`app/app/globals.css`

資料設定
- Team（工作人員）：`app/public/data/team.json`
- Partners（合作社團）：`app/public/data/partners.json`
- Fonts（全站字體）：`app/public/data/fonts.json`

合作社團（Partners）
- 檔案：`app/public/data/partners.json`
- 欄位說明：
  - `name`：社團名稱（必填）
  - `logo`：圖片路徑（放在 `app/public` 底下，例 `/assets/club-a.png`）
  - `link`：點擊導向連結（可留空）
- 使用方式：直接新增或編輯 JSON 陣列，前台會自動讀取；輪播已做成無縫連續捲動（不會跳回第一則）。

字體設定（Fonts）
- 檔案：`app/public/data/fonts.json`
- 支援以 JSON 綁定不同字族（中文 zh、英文 en、標題 display），可自訂 family、大小、字重，並可直接填入 Google Fonts 連結。
- 結構範例：
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
- 套用邏輯：
  - 首頁載入時由 `FontManager` 讀取該 JSON，自動插入 Google Fonts `<link>` 與 `preconnect`，並寫入 CSS 變數：
    - 家族：`--font-zh`、`--font-en`、`--font-display-family`
    - 尺寸：`--font-size-zh-*`、`--font-size-en-*`、`--font-size-display-*`
    - 字重：`--font-weight-*-{normal|bold}`
  - 全站預設字族來自 `globals.css` 中：`--font-sans` 與 `--font-display`，會自動使用上述變數。
  - 你也可以在任意元件用以下工具 class 覆蓋：
    - 字族：`.font-zh`、`.font-en`、`.font-display`
    - 尺寸：`.text-zh-{sm|base|lg|xl}`、`.text-en-{sm|base|lg|xl}`、`.text-display-{sm|base|lg|xl}`

注意事項
- 圖片路徑：放在 `app/public/...`，前台引用以 `/...` 開頭。
- 行動裝置：為省資源，首頁的光暈裝飾在手機上已停用（不渲染、不執行動畫）。
- 導覽列：手機選單支援點擊外側收回，含開合動畫。

開發
- 啟動：
  - `npm run dev`
- 編輯：
  - 首頁區段在 `app/components/*`
  - 子頁位於 `app/app/{course|gallery|pricing|team}`
  - 資料 JSON 在 `app/public/data/*`
