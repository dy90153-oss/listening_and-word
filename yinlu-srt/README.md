# 音律工作室｜單人華語 SRT 逐字稿

公開接案網站：**https://yinlu-srt.vercel.app/**。

獨立目錄 `yinlu-srt/`，沿用既有 GitHub 儲存庫 `dy90153-oss/listening_and-word`，由獨立 Vercel 專案 `yinlu-srt` 部署；原網站程式不改動。

## 本機操作

需要 Node.js 22 以上，無第三方 npm 依賴。

```sh
npm run dev
npm test
npm run build
```

預覽網址為 `http://127.0.0.1:4178`。建置輸出為 `dist/`。

## 部署設定

- GitHub：`dy90153-oss/listening_and-word`，正式分支 `main`
- Vercel 專案：`yinlu-srt`
- Root Directory：`yinlu-srt`
- Framework Preset：Other
- Install Command：`echo 'No dependencies'`
- Build Command：`npm run build`
- Output Directory：`dist`
- 正式網址：`https://yinlu-srt.vercel.app/`
- 正式網站公開可讀，無登入限制。

GitHub 內容更新後由 Vercel Git 整合建置部署。不要把舊站的 Root Directory 改為此目錄。

## 已確認服務規格

只接單人國語／華語音檔；交付繁體中文 SRT 時間軸忠實逐字稿。重口音、雜音或夾雜其他語言先試聽。只有 SRT，沒有 Word/TXT 交付、英文翻譯、多人對談、自動上傳或線上付款功能。

基本費率每音檔分鐘 NT$15、最低 NT$150，總長度向上進位整分鐘。法律／醫療 +30%，急件 +20%、當日件 +50%、特急件 +100%，加成相加後總額四捨五入至整元。例：11 分鐘法律／醫療當日件 `165 × (1 + 0.3 + 0.5) = 297`，加價明細保留半元，避免先各自進位造成誤差。

單次銀行轉帳全額付款及確認排單後起算交期。交期均為預估，先確認檔期。交件後 7 天內一次免費漏字、錯字、誤聽修正；結案後 7 天內刪除工作室持有的音檔及稿件。銀行資料透過 LINE 提供。

接單 LINE：`https://lin.ee/9kHonjI` / `@818jzowe`。

## 檔案位置

- `index.html`：完整服務文案、價格表、流程、FAQ、metadata、結構化資料。
- `assets/style.css`：字型與響應式樣式。
- `assets/app.mjs`：費用表單、詢價文字複製及手動複製替代流程、SRT 預覽。
- `assets/quote.mjs`：價格與計算邏輯；改價時同步更新 HTML 文案與結構化資料。
- `assets/example.srt`：明確標示為格式示意的合成文字，不是客戶實績。
- `assets/social.png`：以本網站字型與版面生成的 1200×630 分享圖片。
- `assets/fonts/`：Google Fonts Noto Sans TC、Noto Serif TC 字型子集與 SIL Open Font License。子集涵蓋初版頁面和互動文案；新增文字不在子集中時會使用系統字型，可重新生成子集。

## 搜尋引擎

已提供可直接讀取的靜態內容、唯一標題、description、canonical、Open Graph、Organization/Service/WebSite JSON-LD、`robots.txt` 與 `sitemap.xml`。網站允許公開索引。

上線不代表已被 Google 收錄；可由擁有 Google 帳號的站主在 Search Console 新增網址前綴資源 `https://yinlu-srt.vercel.app/`，依指示完成 HTML 檔案或標籤驗證，再提交 `https://yinlu-srt.vercel.app/sitemap.xml`。此專案未代登入 Google 或聲稱已提交索引。若換正式網域，須同步更新 index、robots、sitemap、README 與建置網址檢查。

Google 官方說明：https://developers.google.com/search/docs/fundamentals/seo-starter-guide

## 驗證

`npm test` 驗證最低消費、秒數進位、相加加成、總額取整、錯誤長度與詢價文字。Chrome 本機流程另驗證費用表單、空值/長度限制、剪貼簿成功與失敗替代流程、SRT 時間段點選/鍵盤操作、示例與 SEO 檔案回應、1440/768/390/320 寬度無橫向溢出及無 JavaScript 例外。測試不會實際傳送 LINE 訊息。
