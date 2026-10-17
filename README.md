# 🎙️ 文字音律工作室｜錄音室級・繁體中文音檔轉譯與字幕製作

[![GitHub Pages Deployment](https://img.shields.io/badge/GitHub%20Pages-Live%20Website-success?style=for-the-badge&logo=github)](https://dy90153-oss.github.io/listening_and-word/)
[![Pricing Rate](https://img.shields.io/badge/Standard%20Rate-NT$%2015%20/%20min-amber?style=for-the-badge)](https://dy90153-oss.github.io/listening_and-word/#calculator)
[![Language](https://img.shields.io/badge/Language-繁體中文%20(zh--TW)-blue?style=for-the-badge)](https://dy90153-oss.github.io/listening_and-word/)

> 告別機械算法與生硬機翻的盲目猜測。以專業錄音室監聽耳機進行微觀聲音辨析，專為商務決策、演講論壇、法律醫療專業紀錄及影音創作者打造。

---

## 🌐 正式線上展示站（Live Demo）

- **公開網址**：[https://dy90153-oss.github.io/listening_and-word/](https://dy90153-oss.github.io/listening_and-word/)
- **原始碼儲存庫**：[https://github.com/dy90153-oss/listening_and-word](https://github.com/dy90153-oss/listening_and-word)

---

## ✨ 網站亮點與視覺設計

1. **沉浸式錄音室控台暗黑美學（Recording Studio Dark Aesthetic）**：
   - 拒絕刺眼死白，採用低飽和鼠尾草灰（Sage-grey）與錄音室控台深藍灰（Studio Slate）。
   - 模擬單一物理光源定向打光、1px 微光立體倒角邊框與膠卷顆粒底紋。
2. **即時音訊示波器與雙軌 VU 儀表**：
   - 原生 HTML5 Canvas 60fps 聲波振幅模擬與左右聲道動態跳動電平表。
3. **動態互動式控台報價計算器（Interactive Console Calculator）**：
   - 支援滑桿精確調整音檔分鐘數（1~360 分鐘）。
   - 支援法律醫療專業術語（+30%）、去贅詞潤飾排版、SRT 時間軸字幕等多選項目。
   - 支援四級交付時效切換（一般件、急件 +20%、當日件 +50%、特急件 +100%）。
   - 一鍵自動生成 LINE 諮詢文字與 Email 正式委託單。
4. **服務模組漸進滑入動效**：
   - 依據視口滾動位置，左右交錯滑入、雷射掃描光束與項目依序浮現。
5. **完整 SEO 與搜尋引擎最佳化**：
   - 完整標記 `title`、`meta description`、`meta keywords`。
   - 支援 Open Graph（Facebook/LINE 分享預覽卡片）與 Twitter Cards 大圖預覽。
   - 內嵌 Google 推薦的 Schema.org `ProfessionalService` JSON-LD 結構化資料。
   - 附帶標準 `robots.txt` 與 `sitemap.xml` 網站地圖。

---

## 📋 服務項目與計費規範

| 服務項目 | 基礎費率 | 特色說明 |
| :--- | :--- | :--- |
| **標準繁體中文逐字稿** | **NT$ 15 / 影音分鐘** | 人工耳機監聽、繁體中文標點校對、提供 Word (.docx) 與純文字 (.txt) |
| **SRT 影音字幕製作** | 另計或依需求打包 | 精確至 0.1 秒級時間戳記、斷句節奏舒適、可直接上傳 YouTube / Premiere |
| **法律訴訟與醫療專科** | **標準費率加收 30%** | 涵蓋法庭錄音、偵查筆錄核對、專科醫學術語交叉文獻查驗 |
| **無時間軸排版檔案** | **斟酌收費（私訊詳談）** | 依特定出版或段落排版規範進行客製化編排處理 |

### 🚀 急件時效分級

- **一般件**：正常排程（約 3~5 工作日，無加收）
- **急件**：**加收 20%**（約 2~3 天工作日交付）
- **當日件**：**加收 50%**（約 8 小時交付）
- **特急件**：**加收 100%**（約 5 小時交付）

---

## 📁 專案檔案結構

```text
listening_and-word/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Pages 自動部署工作流程
├── index.html                  # 核心單頁式響應式著陸頁（含完整互動程式碼）
├── robots.txt                  # 搜尋引擎爬蟲存取規則
├── sitemap.xml                 # 網站地圖（提交給 Google Search Console）
└── README.md                   # 專案中文說明文件
```

---

## ⚙️ 如何在 GitHub 開啟公開網站（GitHub Pages）

本儲存庫已內建 GitHub Actions 自動部署工作流程，只需依照以下步驟確認開啟：

1. 前往 GitHub 儲存庫頁面：[dy90153-oss/listening_and-word](https://github.com/dy90153-oss/listening_and-word)
2. 點擊頂部導覽列的 **`Settings`（設定）**。
3. 在左側選單點選 **`Pages`**。
4. 在 **Build and deployment** 下方的 **Source** 下拉選單中：
   - 選擇 **`GitHub Actions`**（推薦，將自動觸發 `.github/workflows/deploy.yml` 進行部署）。
   - *（或選擇 `Deploy from a branch` -> 分支選 `main`、資料夾選 `/ (root)` 並點擊 Save）*。
5. 稍等約 1~2 分鐘，頁面上方即會顯示綠色勾勾與專屬網址：  
   👉 **`https://dy90153-oss.github.io/listening_and-word/`**

---

## 🔍 如何讓 Google 等搜尋引擎更快搜尋到本站？

1. 前往 [Google Search Console](https://search.google.com/search-console)。
2. 使用 Google 帳號登入，在「網址前置字元」輸入您的網站網址：  
   `https://dy90153-oss.github.io/listening_and-word/`
3. 按照提示驗證所有權（可使用 HTML 標記或 Google Analytics 驗證）。
4. 驗證通過後，在左側選單點擊 **「Sitemaps」**。
5. 在「新增 Sitemap」欄位輸入：  
   `https://dy90153-oss.github.io/listening_and-word/sitemap.xml`
6. 點擊 **「提交」**，Google 爬蟲即會在 1~3 天內排程檢索並收錄您的網站！

---

## 📄 版權與授權條款

© 2026 文字音律逐字稿工作室. All rights reserved.
