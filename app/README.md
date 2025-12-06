# SCIST x SCAICT 2026 聯合寒訓 官方網站

## 目錄

- [技術棧](#技術棧)
- [快速開始](#快速開始)
- [資料管理](#資料管理)
- [專案結構](#專案結構)
- [開發指南](#開發指南)
- [部署](#部署)

---

## 技術棧

| 技術 | 版本 | 用途 |
|------|------|------|
| **Next.js** | 16.0.3 | React 框架（App Router） |
| **React** | 19.2.0 | UI 組件庫 |
| **Tailwind CSS** | 4.x | 樣式工具 |
| **Lenis** | 1.0.42 | 平滑滾動效果 |
| **Framer Motion** | 12.23.24 | 動畫庫 |
| **Lucide React** | - | Icon 組件集 |
| **md5** | - | Gravatar 頭像雜湊 |

---

## 快速開始

### 前置需求
- Node.js 18+
- npm 或 yarn

### 安裝依賴

```bash
cd app
npm install
```

### 開發環境

```bash
npm run dev
```

開啟瀏覽器訪問 [`http://localhost:3000`](http://localhost:3000)

### 生產構建

```bash
npm run build
npm run start
```

---

## 📊 資料管理

所有內容數據存放於 `app/public/data/` 目錄，透過 JSON 檔案管理。

### 工作人員（Team）

**檔案：** `app/public/data/team.json`

```json
{
  "allMembers": [
    {
      "id": "001",
      "name": "TEST",
      "email": "email@example.com",
      "bio": "TEST",
      "category": ["總召組"],
      "role": ["副召"],
      "link": "https://example.com"
    }
  ]
}
```

**欄位說明：**
| 欄位 | 型態 | 說明 |
|------|------|------|
| `id` | string | 唯一識別碼 |
| `name` | string | 人員名稱（必填） |
| `email` | string | Email（用於 Gravatar） |
| `bio` | string | 簡介/職位 |
| `category` | string \| string[] | 分類（如 `"總召組"`、`"行政組"` 等） |
| `role` | string \| string[] | 角色（如 `"總召"`、`"副召"`、`"組長"` 等） |
| `link` | string | 點擊頭像導向的連結（社群、個人網站等） |

**特殊機制：**
- **Gravatar 頭像**：若提供 `email`，會自動生成對應的 Gravatar 頭像
- **總召組顯示**：只有 `category` 包含 `"總召組"` 且 `role` 為 `"總召"` 或 `"副召"` 的成員會在首頁展示
- **排序**：同分類內優先顯示 `role` 為組長的成員

### 合作社團（Partners）

**檔案：** `app/public/data/partners.json`

```json
[
  {
    "name": "臺南高商資訊研究社",
    "logo": "/assets/images/club/臺南高商資訊研究社.webp",
    "link": "https://example.com"
  }
]
```

**欄位說明：**
| 欄位 | 型態 | 必填 | 說明 |
|------|------|------|------|
| `name` | string | ✅ | 社團名稱 |
| `logo` | string | ✅ | Logo 圖片路徑（放在 `app/public` 下） |
| `link` | string | ❌ | 點擊導向連結（可留空） |

**Logo 放置：**
- 路徑：`app/public/assets/images/club/`
- 推薦格式：PNG 或 WebP
- 建議尺寸：300×300px 或以上

**輪播機制：**
- 已實現無縫連續捲動（rAF 驅動）
- 速度可透過組件 props 調整（預設 8 秒半輪播）
- 支持滑鼠懸停暫停，觸控停止時同樣暫停

---

## 📁 專案結構

```
app/
├── app/                          # Next.js App Router
│   ├── globals.css              # 全站全局樣式
│   ├── layout.js                # 主佈局
│   ├── page.js                  # 首頁
│   ├── course/
│   │   └── page.js              # 課程頁
│   ├── gallery/
│   │   └── page.js              # 相簿頁
│   ├── pricing/
│   │   └── page.js              # 定價頁
│   └── team/
│       └── page.js              # 完整團隊頁
│
├── components/
│   ├── navbar.jsx               # 導航欄
│   ├── hero.jsx                 # Hero 區段
│   ├── intro.jsx                # 介紹區段
│   ├── info.jsx                 # 資訊區段
│   ├── course.jsx               # 課程區段
│   ├── schedule.jsx             # 日程表區段
│   ├── team.jsx                 # 工作人員區段（首頁）
│   ├── gallery.jsx              # 相簿區段
│   ├── pricing.jsx              # 定價區段
│   ├── partners.jsx             # 合作社團輪播
│   ├── contact.jsx              # 聯絡我們區段
│   ├── footer.jsx               # 頁尾
│   ├── smooth-scroll.jsx        # Lenis 平滑滾動初始化
│   ├── scroll-to-top.jsx        # 回到頂部按鈕
│   ├── detail-navbar.jsx        # 詳細頁導航欄
│   ├── auto-fit-text.jsx        # 自適應文字大小組件
│   └── ui/
│       ├── button.jsx           # 按鈕組件
│       └── card.jsx             # 卡片組件
│
├── lib/
│   └── utils.js                 # 工具函數
│
├── public/
│   ├── assets/
│   │   └── images/
│   │       └── club/            # 社團 Logo 圖片
│   └── data/
│       ├── team.json            # 工作人員資料
│       ├── partners.json        # 合作社團資料
│       ├── schedule.json        # 日程表資料
│       ├── gallery.json         # 相簿資料
│       └── faq.json             # 常見問題資料
│
├── package.json                 # 專案依賴
├── next.config.mjs              # Next.js 設定
├── tailwind.config.js           # Tailwind CSS 設定
├── postcss.config.mjs           # PostCSS 設定
└── README.md                    # 本文件
```

---

## 🎨 開發指南

### 新增首頁區段

1. 在 `app/components/` 建立新檔案（如 `new-section.jsx`）
2. 編寫 React 組件
3. 在 `app/app/page.js` 引入並使用

### 編輯樣式

- **全站樣式**：編輯 `app/app/globals.css`
- **Tailwind 工具類**：直接在 JSX 中使用（已配置 Tailwind CSS 4）
- **自訂顏色**：主色調使用 `oklch(0.75_0.15_85)`

### 使用 Lenis 平滑滾動

```javascript
// 已自動啟用，無需額外設定
// 若需在代碼中使用：
window.__lenis?.scrollTo('#section-id', { duration: 1.5 })
```

### 自訂組件

#### AutoFitText（自適應文字）

```jsx
import AutoFitText from "@/components/auto-fit-text";

<AutoFitText as="h2" maxLines={2} min={12} max={24}>
  動態調整大小的標題
</AutoFitText>
```

**Props：**
- `as`：HTML 標籤（預設 `div`）
- `maxLines`：最多行數
- `min`：最小字體大小（px）
- `max`：最大字體大小（px）

### 常見工作

#### 修改首頁標題
📄 `app/app/page.js` 中修改 Hero 區段

#### 新增團隊成員
📝 編輯 `app/public/data/team.json`

#### 新增合作社團
📝 編輯 `app/public/data/partners.json` 並上傳 Logo 到 `app/public/assets/images/club/`

#### 修改導航項目
📄 編輯 `app/components/navbar.jsx`

---

## 部署

### Vercel（推薦）

1. 推送代碼到 GitHub
2. 連接 Vercel 項目
3. Vercel 自動部署

### Docker

```bash
# 構建 Docker 鏡像
docker-compose build

# 啟動容器
docker-compose up -d
```

訪問 `http://localhost:3000`

---

## 📱 響應式設計

採用 Tailwind CSS 斷點：

| 斷點 | 寬度 | 用途 |
|------|------|------|
| `sm` | ≥640px | 平板豎向 |
| `md` | ≥768px | 平板橫向 |
| `lg` | ≥1024px | 桌面 |
| `xl` | ≥1280px | 寬桌面 |

所有組件已適配行動裝置。

---

## 🔧 常見問題

### 圖片無法加載？
確認圖片路徑以 `/` 開頭，且放在 `app/public/` 目錄下。

### 頭像顯示為預設圖案？
檢查 JSON 中的 `email` 欄位，或確認 Gravatar 賬戶設定。

### 樣式不生效？
- 重啟開發服務器
- 清理 Tailwind 緩存：`rm -rf .next`
- 檢查 Tailwind 設定中的 `content` 路徑

### 輪播速度過快/過慢？
編輯 `app/components/partners.jsx` 中的 `duration` 常數（單位：秒）

---

## 授權

© 2026 SCIST x SCAICT. All rights reserved.

## Build-time 圖片處理（static export 支援）

若你使用 `output: 'export'`（靜態導出），Next 的 Image Optimization API 會無法使用。此專案提供一個 build-time 圖片生成腳本，會把原始大圖轉成多尺寸的 WebP / AVIF，放到 `public/gallery/`，前端可以使用 `srcset`/`<picture>` 或保留現有的圖片命名來使用這些靜態檔案。

使用方法：

1. 把原始高解析度圖片放到 `app/public/gallery-src/`（例如 `app/public/gallery-src/photo1.jpg`）。
2. 安裝相依（在 `app` 資料夾）：
```powershell
cd app
npm install
```
3. 產生多尺寸檔案：
```powershell
cd app
npm run gen:images
```
4. 產生後會在 `app/public/gallery/` 出現 `photo1-320.webp`, `photo1-640.avif`, ... 以及一個預設 `photo1.webp` 作為 fallback。

前端使用建議（`<picture>` 範例）：
```jsx
<picture>
  <source type="image/avif" srcSet="/gallery/photo1-320.avif 320w, /gallery/photo1-640.avif 640w" sizes="(max-width:768px)100vw, 33vw" />
  <source type="image/webp" srcSet="/gallery/photo1-320.webp 320w, /gallery/photo1-640.webp 640w" sizes="(max-width:768px)100vw, 33vw" />
  <img src="/gallery/photo1.webp" alt="..." loading="lazy" decoding="async" style={{width:'100%',height:'auto'}} />
</picture>
```

備註：`sharp` 會被加入到 `devDependencies`。如果你的 CI 或主機無法編譯 native 模組，請在本地或支持 native 模組的 runner 上執行 `npm run gen:images`，再把 `public/gallery` 上傳到部署環境。