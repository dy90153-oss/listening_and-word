---
name: 音律工作室
description: 安靜、清楚的繁體中文 SRT 工作室視覺系統
colors:
  forest-ink: "#173f35"
  paper: "#f6f7f2"
  muted-ink: "#496258"
  celadon: "#e5eddf"
  selected-celadon: "#ccdfbd"
  error-red: "#952c2c"
  forest-hover: "#285a46"
  studio-green: "#234b40"
  inverse-muted: "#c7e0cc"
  field-border: "#809884"
  cue-hover: "#d6e2cf"
  timeline-muted: "#6b8a79"
  timeline-active: "#d0e7bb"
typography:
  display:
    fontFamily: '"Noto Serif TC", "Songti TC", serif'
    fontSize: "clamp(62px, 10.8vw, 154px)"
    fontWeight: 500
    lineHeight: 1.13
    letterSpacing: "-0.035em"
  headline:
    fontFamily: '"Noto Serif TC", "Songti TC", serif'
    fontSize: "clamp(34px, 4.2vw, 58px)"
    fontWeight: 500
    lineHeight: 1.32
    letterSpacing: "-0.025em"
  title:
    fontFamily: '"Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif'
    fontSize: "clamp(19px, 1.65vw, 23px)"
    fontWeight: 500
    lineHeight: 1.5
  body:
    fontFamily: '"Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif'
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.8
  lead:
    fontFamily: '"Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif'
    fontSize: "clamp(19px, 1.65vw, 23px)"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: '"Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif'
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.8
  button:
    fontFamily: '"Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif'
    fontSize: "16px"
    fontWeight: 500
    lineHeight: 1.6
rounded:
  square: "0px"
spacing:
  gutter: "clamp(22px, 5vw, 80px)"
components:
  button-primary:
    backgroundColor: "{colors.forest-ink}"
    textColor: "{colors.paper}"
    typography: "{typography.button}"
    rounded: "{rounded.square}"
    padding: "14px 28px"
    height: "58px"
  button-primary-hover:
    backgroundColor: "{colors.forest-hover}"
  duration-input:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.forest-ink}"
    rounded: "{rounded.square}"
    padding: "12px 42px 12px 16px"
    height: "60px"
  cue-selected:
    backgroundColor: "{colors.selected-celadon}"
    textColor: "{colors.forest-ink}"
    rounded: "{rounded.square}"
    padding: "15px 12px"
  cue-hover:
    backgroundColor: "{colors.cue-hover}"
  quote-summary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.forest-ink}"
    rounded: "{rounded.square}"
    padding: "22px 24px"
---

# Design System: 音律工作室

## Overview

**Creative North Star: "有時間座標的紙頁"**

以「有時間座標的紙頁」作為視覺隱喻：繁體中文是主要材料，紙白留白容納閱讀，深綠建立穩定的工作室語氣，淺綠承接資料與互動。整體安靜、清楚、專業；以完整句子和可讀的時間碼建立性格。

字體、實色面與規整數字負責層次，沒有陰影或漸層。宋體標題帶出文字工作的溫度，黑體正文、標籤與控制項保持清楚。畫面密度寬鬆，資料區則以對齊與色階讓使用者逐步理解。

**Key Characteristics:**

- 繁體中文優先的宋體／黑體配對。
- 紙白、深綠、淺綠構成平面色層。
- 方角控制項、明確焦點與可讀時間碼。
- 寬鬆段距與緊密資料對齊並存。

## Colors

色彩以帶灰的綠與紙白為主；所有規範色值以前置 token 為準。以下名稱對應同名 token，而非額外色票。

### Primary

- **錄音室深綠**（`forest-ink`）：正文墨色、主要按鈕與深色段落共用，讓品牌與資訊保持一致。
- **深綠回應色**（`forest-hover`）：主要按鈕 hover，提供清楚但克制的回應。

### Neutral

- **紙白**（`paper`）：主要頁面與試算結果的閱讀底色，也是深綠上的主要文字色。
- **灰綠墨色**（`muted-ink`）：紙白與淺綠上的次要說明。
- **淡青瓷綠**（`celadon`）：表單容器、流程色面、SRT 原稿底色與表格交錯列。
- **選取嫩綠**（`selected-celadon`）：SRT 選取段落與聯絡連結 hover。
- **字幕室綠**（`studio-green`）：深色大區塊內的字幕預覽面。
- **反白灰綠**（`inverse-muted`）：深色區的中繼資訊、備註與次要說明。
- **欄位灰綠**（`field-border`）：欄位描邊與捲軸。
- **段落停留綠**（`cue-hover`）：尚未選取的字幕段落 hover。
- **時間軌灰綠／亮綠**（`timeline-muted`、`timeline-active`）：時間段的未選取與選取狀態。

### Semantic

- **錯誤暗紅**（`error-red`）：欄位驗證訊息。錯誤同時有明確文字，不只改變顏色。

**The Tonal Surface Rule.** 使用實色面區分主要背景、閱讀區與互動區；選取狀態以較明確的淺綠標記，並保留文字或狀態語意。

## Typography

**Display Font:** 自託管 Noto Serif TC，退回 Songti TC、serif。

**Body Font:** 自託管 Noto Sans TC，退回 PingFang TC、Microsoft JhengHei、sans-serif。

**Character:** 宋體承接完整中文語句的呼吸，黑體負責資訊與操作。字型以 `font-display: swap` 載入；黑體檔涵蓋字重 400–700，宋體涵蓋 500–600。

### Hierarchy

- **Display**（`display`）：首頁主張；手機改為 `clamp(53px, 12vw, 88px)`，行高 1.25。
- **Headline**（`headline`）：主要段落標題；手機一般為 36px、行高 1.4，FAQ 標題為 34px。
- **Title**（`title`）：表單標題與一般三級標題；階梯流程另以宋體 `clamp(25px, 3vw, 40px)` 呈現。
- **Lead**（`lead`）：服務摘要，以較鬆行高支持連續閱讀。
- **Body**（`body`）：段落與控制項基底。介紹文字常限制在 520px，流程說明限制在 490px。
- **Label**（`label`）：時間碼、次要資料、費率表頭與提示，不使用全大寫裝飾。
- **Button**（`button`）：主要操作；單行中文與箭頭按內容對齊。

金額、費率、時間碼與輸入數字使用 `font-variant-numeric: tabular-nums`。巨型聯絡字使用黑體與較緊字距，其桌面尺寸為 `clamp(64px, 11.5vw, 170px)`。

**The Chinese Reading Rule.** 中文正文與數字控制項保持黑體；宋體用於標題與字幕語句，時間碼及金額使用等寬數字。

## Layout

容器最大寬度為 1600px，左右以 `gutter` token 自適應。區塊採全寬實色面配內層容器，閱讀與資料區的視線保持同一條左邊界。桌面介紹、SRT 示例與費率內容以雙欄組合；費率兩欄間距為 8vw。主要段距約 94–128px，依內容角色調整。

流程使用 12 欄網格，四步逐次向右推移；FAQ 使用標題／內容的 4:8 配置，回答直接展開為兩欄閱讀。這些是目前一頁式網站的表現模式，擴充內容時可依資訊量調整，而不是把所有內容套進相同卡片。

- **1100px 以下：** 調整導覽與欄距，首頁價格和操作改成縱向排列；FAQ 標題先獨立成列。
- **760px 以下：** 導覽另起一整列，SRT 與試算改為單欄，FAQ 改為單欄；主要段距收至約 56–66px。流程以 4%、8%、12% 的左縮排保留階梯節奏。
- **360px 以下：** 大型 LINE 文字收至 44px，箭頭 38px；聯絡文字保持單行，圖示不壓縮。320px 寬度也需完整容納操作。
- **1601px 以上：** 內層容器維持最大寬度，首頁上緣略加留白。

## Elevation & Depth

全站不使用陰影。紙白、淺綠與深綠色面提供平面層次；試算結果以紙白嵌入淺綠容器，字幕預覽則以稍亮的深綠嵌入深色段落。必要描邊只用在輸入控制項，不把每個資訊段落圍成框。

**The Flat Surface Rule.** 元件以色面、間距與必要描邊分層，不加入陰影、漸層或裝飾性浮起效果。

## Shapes

按鈕、輸入欄位與資料容器均為方角。欄位採 1px 實線描邊，其餘區分主要依賴色面與間距。圖示使用簡潔線條箭頭與品牌標誌，線條採當前文字色。時間軌由細長矩形段落構成，沒有圓膠囊或進度播放器造型。

## Components

### Buttons

明確、穩定的文字操作。主要按鈕使用 `button-primary`，hover 使用其同名變體。桌面 padding 與最小高度記錄於前置 token；手機 padding 改為 13px 22px、最小高度 56px。箭頭與文字以 flex 對齊，按下向下位移 2px；disabled 使用 0.5 透明度與不可操作游標。

所有可互動元素以 `:focus-visible` 提供 3px currentColor 外框與 5px offset。連結、按鈕的狀態轉換約 0.25 秒；文字下載連結 hover 向右 4px。

### Cards / Containers

資訊容器以色面承載，保持方角且不加陰影。試算表單桌面 padding 36px，在中型螢幕縮至 26px、手機為 25px 22px。結果區使用 `quote-summary`。FAQ 為直接閱讀段落，不設收合手風琴。

### Inputs / Fields

分鐘／秒鐘為兩個等寬數字欄位，單位固定在右側；欄位使用 `duration-input` 與灰綠描邊。select 延續同樣的紙白、方角與描邊，最小高度 54px。checkbox 保留原生行為並以深綠作 accent。提示與錯誤靠近相關欄位；結果及複製狀態使用適當 live region，失敗時提供可手動複製的 textarea。

### Navigation

桌面品牌在左，文字導覽與 LINE 入口在右。導覽使用 label 字級，hover 加底線；手機品牌與聯絡入口保留第一列，服務導覽另起第二列。頁面提供鍵盤跳至主要內容的連結，取得焦點後顯示。

### SRT Cue & Preview

以兩個實色面並列呈現預覽與原稿。每段 cue 保留序號、起訖時間與句子，按鈕為整段可點區；hover 使用 `cue-hover`，選取使用 `cue-selected` 並同步 `aria-pressed`。選取更新上方字幕與對應時間軌，手機提示文字直接說明「點選時間段」。不顯示虛構播放控制項。

### Reading FAQ & Stepping Process

FAQ 問題用較粗黑體，回答沿用灰綠正文，保持直接可讀。流程標題用宋體，四步沿閱讀方向逐漸推移；手機保留輕微縮排，避免過度擠壓說明文字。

### Contact Link

大型 LINE 文字與斜向箭頭共用一個完整連結；手機保留單行文字。hover 使用選取嫩綠，箭頭向右上各移 5px。文字本身有完整可理解的操作名稱。

段落進場使用 0.8 秒曲線與 20px 的垂直位移，初始透明度為 0.45。`prefers-reduced-motion: reduce` 停用動畫、轉換及平滑捲動；內容在沒有動畫時仍完整可讀。

## Do's and Don'ts

### Do:

- **Do** 沿用前置 token 的色彩與字體配對，以閱讀層級選字級。
- **Do** 讓時間碼與金額使用等寬數字，並保持資料欄位對齊。
- **Do** 保留鍵盤可見焦點、原生表單語意與 reduced-motion 支援。
- **Do** 讓手機的主要 LINE 文字與箭頭完整可見，聯絡文字保持單行。
- **Do** 用段落與留白組織說明，讓 FAQ 保持直接可讀。

### Don't:

- **Don't** 為既有元件加入圓角、投影或漸層。
- **Don't** 將資訊段落普遍改成同尺寸卡片格。
- **Don't** 以只有顏色的提示取代選取語意、錯誤文字或表單標籤。
- **Don't** 把格式示意包裝為正在播放的錄音，或補上沒有來源的信任數字。
