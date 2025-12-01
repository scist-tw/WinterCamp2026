資料檔說明（app/public/data）

用途
- 此資料夾提供前台讀取的 JSON 設定與內容，修改後可直接反映在網站。
- 主要檔案：
  - partners.json：合作社團清單（名稱、Logo、連結）
  - team.json：工作人員清單（姓名、職務、所屬組別等）
  - fonts.json：已改為固定於程式碼，不再使用
  - 其他：faq.json、gallery.json、schedule.json 供各區塊使用


partners.json（合作社團）
- 結構：
  {
    "partners": [
      { "name": "社團 A", "logo": "/assets/club-a.webp", "link": "https://example.com" },
      { "name": "社團 B", "logo": "/assets/club-b.webp", "link": "" }
    ]
  }
- 欄位：
  - name：社團名稱（必填）
  - logo：圖片路徑（放在 app/public 底下，前台以 "/" 開頭引用，如 /assets/club-a.webp）
  - link：點擊導向連結（可留空）
- 輪播已做成無縫連續滾動，會自動讀取此檔案。


字體設定（已固定於程式碼）
- 結構：
  - 目前字體載入與綁定位於：
    - `app/app/layout.js`：以 `<link>` 直接載入 Google Fonts / emfont。
    - `app/app/globals.css`：以 CSS 變數固定全站預設字體與區塊專屬字體。
  - 現行預設：
    - 全站中文：GenSen Rounded（備援 Noto Sans TC）
    - 全站英文／Display：Lato（Google Fonts）
    - Logo：Space Grotesk（固定，不受全站設定影響）
    - Hero 區：GenYoMinTW（emfont）
    - Intro 區：ChenYuLuoYan（emfont）
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
- 圖片路徑請放在 `app/public` 底下，前端引用以 `/` 開頭（例如 `/assets/logo.webp`）。
- 字體載入直接在 layout.js 以 `<link>` 注入，已加 preconnect 以降低 FOUT。
