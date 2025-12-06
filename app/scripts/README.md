# Gallery Image Generation

這個文件說明如何使用專案內的 `generate-images.js` 腳本，來為 gallery 產生多尺寸、WebP / AVIF 格式的圖片，並給出常見問題與排錯步驟（含 Windows 注意事項）。

## 目的
- 從原始大圖（放在 `app/public/gallery-src`）產生多種寬度的圖片（預設 320、640、960、1280、1920）。
- 為每張圖片輸出 `.webp` 與 `.avif`（品質可設定），並複製中間尺寸作為 fallback（例如 `name.webp`）。

## 檔案位置
- 原始（master）影像：`app/public/gallery-src/`（請放入 JPEG/PNG/WebP/TIFF 等支援格式）
- 產出（輸出）：`app/public/gallery/`（網站會從這裡讀取 `-<width>.webp` / `-<width>.avif`）
- 腳本檔案：`app/scripts/generate-images.js`

## 先決條件
- Node.js（建議 v16+，本專案在測試時使用 Node 22）
- `sharp` 套件（腳本已用）」 — 在 `app` 資料夾下執行 `npm install` 會安裝依賴（或在專案 root 安裝）

## 主要參數（在腳本內）
- `widths`：預設為 `[320, 640, 960, 1280, 1920]`。可依需求減少或調整（例如最大只到 960）。
- `webpQuality`：WebP 輸出品質（預設 80）。減少此數值可顯著縮小檔案大小。
- `avifQuality`：AVIF 輸出品質（預設 60）。AVIF 一般在較低品質下仍能保持不錯畫質。

若想改設定，直接在 `app/scripts/generate-images.js` 裡調整這些變數。

## 執行（在專案根或 `app` 內皆可，但腳本使用相對路徑到 `app/public`）

1. 建立來源資料夾（若尚未）：

```powershell
mkdir .\app\public\gallery-src -Force
```

2. 把要生成的原始圖片放到 `app/public/gallery-src`（例如 `banner.webp`、`2024-1.jpg`）

3. 執行腳本：

```powershell
cd .\app
node .\scripts\generate-images.js
```

執行後會在 `app/public/gallery` 產生 `name-320.webp`, `name-320.avif`, `name-640.webp` 等檔案，並嘗試產生 `name.webp` 作為 fallback（copy 自中間尺寸）。

## 建議的品質/尺寸策略
- 若希望更小檔案（以 LCP 最佳化為優先），可以把 `webpQuality` 調低至 `65` 或 `55`，把 `avifQuality` 調低至 `45` 或 `35`。
- 若不需要超高解析度，移除 `1920`/`1280`，最大輸出改為 `960` 即能減少輸出量與磁碟空間。

## 與前端整合
- 本專案使用 `app/components/responsive-image.jsx`（`ResponsiveImage`）載入圖片：
  - 若圖片已放在 `app/public/gallery`，`ResponsiveImage` 會產生 `<source>` 的 `srcset` 指向 `-<width>.avif` / `-<width>.webp`（取決於 `formats` prop）。
  - 在 `Hero` 中我們將 banner 指向 `"/gallery/banner.webp"` 並使用 `formats={["webp"]}`，以只輸出 webp srcset。

## Windows 常見問題與排錯
- `UNKNOWN` copy / open 錯誤：
  - 原因：輸出檔案正在被其他 process 鎖住（例如 dev server、檔案索引器或防毒軟體），或是權限不足。
  - 解決：確保已停止 Next dev server（或關閉正在使用 `public/gallery` 的 process），或暫時停用防毒/索引，然後重試。

- lock 檔或舊的 build artifacts：若 dev server 對舊檔有快取，可刪除 `.next` 與 `out` 再重啟：

```powershell
Remove-Item -Recurse -Force .\.next, .\out -ErrorAction SilentlyContinue
cd .\app
npm run dev
```

## 驗證輸出
- 在 `app/public/gallery` 中你應看到每個原始檔 `name` 對應的多個 `name-<w>.webp` / `name-<w>.avif` 檔案。
- 在瀏覽器 DevTools Network 中重新載入頁面時，確認 hero 與 gallery 的圖片實際由 `/gallery/...-<w>.webp` 或 `.avif` 被載入。

## 進階（CI / 自動化）
- 建議把圖片生成步驟放入 CI pipeline（或部署前的 build step），在靜態託管前先生成好所有輸出，這樣 production 環境不需要在第一次訪問時動態處理影像。

## 常見問題快速參考
- Q: 我看到 `/assets/images/banner-640.avif` 的 404？
  - A: 代表某處還在引用 `/assets/images` 路徑而非 `/gallery`，或 `ResponsiveImage` 產生的 srcset 針對非 gallery 路徑。本專案的安全策略是只對 `/gallery` 自動輸出 srcset，確保不會對 `assets` 產生不存在的 `-<width>` 請求。

---
如需我幫你把品質改低並重新生成所有圖片或把 repo 中舊的 `/assets/images/banner.*` 引用自動更新為 `/gallery/banner.webp`，告訴我我會協助自動化操作。
