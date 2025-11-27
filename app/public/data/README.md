# 資料管理說明

本目錄包含網站所有動態資料，直接編輯 JSON 檔案即可更新網站內容。

## 📁 檔案說明

### 1. `gallery.json` - 照片牆資料

```json
{
  "featuredImages": [
    // 首頁「過往紀錄」區塊顯示的精選照片
    // 建議放 1-6 張最具代表性的照片
    {
      "src": "/gallery/2024-1.jpg",      // 圖片路徑（放在 public/gallery/ 目錄）
      "alt": "2024 寒訓活動照片",        // 圖片替代文字
      "title": "開幕式",                  // 照片標題
      "description": "2024年寒訓開幕典禮", // 照片描述
      "year": "2024"                     // 年份
    }
  ],
  "allImages": [
    // /gallery 頁面顯示的所有照片
    // 可以放任意數量的照片
  ]
}
```

### 2. `team.json` - 工作人員資料

```json
{
  "mainOrganizers": [
    // 首頁區塊顯示的核心幹部
    // 建議放 1-3 位（總召、副召等重要幹部）
    {
      "name": "總召",                    // 姓名
      "role": "總召",                      // 職位（總召、副召、組長等）
      "organization": "SCIST",            // 所屬組織（選填，可省略此行）
      "email": "example@example.com",     // Email（用於 Gravatar 頭像）
      "bio": "負責統籌活動整體規劃與執行"   // 簡介
    },
    // 沒有組織的範例
    {
      "name": "副召",
      "role": "副召",
      "email": "example2@example.com",
      "bio": "協助活動規劃與執行"
      // 注意：organization 欄位可以完全省略
    }
  ],
  "allMembers": [
    // /team 頁面顯示的所有工作人員
    // 會依照 category 分組顯示
    {
      "name": "總召",
      "role": "總召",
      "organization": "SCIST",
      "email": "example@example.com",
      "bio": "負責統籌活動整體規劃與執行",
      "category": "總召"                  
    }
  ]
}
```

**職位分組順序**：總召 → 副召 → 行政組 → 課程組 → 活動組 → 資訊組 → 隊輔組 → 編輯組 → 紀錄組 → 其他

**頭像系統**：使用 [Gravatar](https://gravatar.com/)，請確保 email 已註冊 Gravatar 頭像

### 3. `faq.json` - 常見問題

```json
{
  "faqs": [
    {
      "question": "活動時間是什麼時候？",         
      "answer": "2026 年寒假期間，詳細日期請參考報名資訊。" 
    }
  ]
}
```

## 🔄 更新流程

1. 編輯對應的 JSON 檔案
2. 儲存檔案
3. 開發環境：自動重載
4. 生產環境：重新整理頁面即可看到更新

## 📝 注意事項

- JSON 格式必須正確（注意逗號、引號）
- 圖片檔案放在 `public/gallery/` 目錄
- Email 需要在 Gravatar 註冊才能顯示自訂頭像
- `organization` 欄位為選填，可以省略
- 建議定期備份 JSON 檔案

## 🛠️ JSON 格式驗證

可以使用線上工具驗證 JSON 格式：
- https://jsonlint.com/
- https://jsonformatter.curiousconcept.com/
