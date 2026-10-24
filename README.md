# 音律工作室：Vercel 部署來源

使用 GitHub 儲存來源並部署 Vercel。公開輸出僅為 dist，不包含本機設計面板。

- 建置：npm run build
- 驗證：npm test（先建置）
- Vercel：Other / npm ci / npm run build / dist，已寫入 vercel.json。
- 正式網址：自動使用 VERCEL_PROJECT_PRODUCTION_URL。自有網域可用 SITE_URL 明確設定。公開版 canonical、Open Graph、robots.txt 與 sitemap.xml 都依同一網址產生。
- Vercel preview 保持 noindex；production 開放索引。
- 原本 Sites 正式網站在遷移完成前保留，這個 checkout 的變更不會自動發布到 Sites。

正式網址：https://listeningand-word.vercel.app/

Vercel 專案：listening_and-word；GitHub 儲存庫：dy90153-oss/listening_and-word。正式部署由 main 分支建置公開的 dist/。
