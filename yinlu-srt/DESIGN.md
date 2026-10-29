---
name: 音律工作室
description: 清朗服務 — 晴藍、清楚、親切的繁體中文 SRT 服務視覺系統
colors:
  blue-ink: "#124d76"
  blue-muted: "#45667d"
  near-white: "#fbfdff"
  pale-blue: "#edf5fc"
  white: "#ffffff"
  selected-blue: "#d1e8f8"
  cue-selected: "#c6e2f6"
  field-border: "#7c9bb0"
  contact-blue: "#d5eafa"
  contact-hover: "#1e618f"
  header-action: "#e4f0fa"
  specimen-blue: "#e5f1fa"
  alternate-row: "#e0effa"
  inverse-muted: "#d4e9f8"
  error-red: "#a62d3f"
typography:
  display:
    fontFamily: '"Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif'
    fontSize: "clamp(56px, 6.5vw, 92px)"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.035em"
  headline:
    fontFamily: '"Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif'
    fontSize: "46px"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "-0.03em"
  title:
    fontFamily: '"Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif'
    fontSize: "25px"
    fontWeight: 500
    lineHeight: 1.5
  body:
    fontFamily: '"Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif'
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.8
  label:
    fontFamily: '"Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif'
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.8
rounded:
  field: "16px"
  button: "12px"
  result: "14px"
  panel: "24px"
  mobile-panel: "20px"
spacing:
  gutter: "clamp(24px, 6vw, 96px)"
  mobile-gutter: "24px"
components:
  button-primary:
    backgroundColor: "{colors.blue-ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.button}"
    padding: "14px 26px"
    height: "56px"
  duration-input:
    backgroundColor: "{colors.white}"
    textColor: "{colors.blue-ink}"
    rounded: "{rounded.field}"
    padding: "12px 40px 12px 14px"
    height: "58px"
  cue-selected:
    backgroundColor: "{colors.cue-selected}"
    textColor: "{colors.blue-ink}"
    rounded: "{rounded.button}"
    padding: "17px 14px"
  quote-panel:
    backgroundColor: "{colors.pale-blue}"
    textColor: "{colors.blue-ink}"
    rounded: "{rounded.panel}"
    padding: "34px"
  quote-summary:
    backgroundColor: "{colors.white}"
    textColor: "{colors.blue-ink}"
    rounded: "{rounded.result}"
    padding: "22px"
---

# Design System: 音律工作室

## Overview

**Creative North Star: "清朗服務"**

使用者已選定的晴藍視覺方向，以清楚的繁體中文黑體、開闊留白與柔和圓角建立親切的專業感。深藍承擔閱讀、操作與品牌辨識，淺藍與白色負責區分資訊層次。

**Key Characteristics:**
- 晴藍底色與清楚的深藍文字。
- 單一黑體家族，以真實字重形成層次。
- 扁平色面、功能性圓角與可見焦點。

## Colors

### Primary
- **晴藍墨色**：品牌、正文、主要操作與字幕預覽的深色區域。
- **柔藍文字**：次要說明，維持清楚可讀的對比。

### Neutral
- **近白與純白**：頁面底色、欄位與報價摘要。
- **淡晴藍與聯絡藍**：大面積區域與聯絡收尾。
- **選取藍**：字幕選取狀態；錯誤紅僅用於驗證回饋。

**The Single Blue World Rule.** 延伸頁面沿用此藍色系，不引入其他候選方向的綠色、海報紅或深色螢光美學。

## Typography

**Display Font:** Noto Sans TC，備援 PingFang TC、Microsoft JhengHei、sans-serif。
**Body Font:** 同一字型家族。自託管可變字型支援 400–800；目前主要使用 400、500 與 600。

### Hierarchy
- **Display**：主標以 600 字重；手機使用 clamp(47px, 11.8vw, 72px)。
- **Headline**：區段標題主要 44–48px；中間寬度主要 40px，手機 32px。
- **Title**：小標題主要 24–26px，手機 22–24px。
- **Body**：16px、1.8 行高；表格、註記與輔助資訊縮至 13–15px。
- **Label**：14px；數字、時間碼與金額使用等寬數字特性。

**The Real Weight Rule.** 使用自託管可變字型提供的真實字重，不以假粗體或第二套展示字型製造層次。

## Layout

主要內容容器最大寬度 1440px，左右留白使用 gutter。桌面以雙欄呈現字幕、報價與 FAQ；流程使用較窄的水平對照列。區段上下留白主要 72–95px。

1000px 以下縮小欄距與部分字級；700px 以下改為單欄，左右留白 24px，區段間距主要 56–64px。導覽在手機換到第二行，保留可直接使用的 LINE 按鈕。長文字自然換行。

## Elevation & Depth

Default surfaces remain flat. The user selected a dimensional exception for the homepage LINE action: 20px corners, blue-on-blue shading, inset highlights and a soft downward shadow. Hover raises it slightly; pressing lowers it and reduces the shadow. Do not spread this treatment to other controls.

The user also selected a one-shot typewriter headline and a phrase-by-phrase introduction reveal at pace 1. The heading finishes its text in about 1.34 seconds, then the cursor stops; the description finishes in about 1.96 seconds. The complete text keeps its layout space throughout. Reduced motion shows all text immediately, hides cursors and removes button movement. Existing service copy, pricing and LINE targets remain unchanged.

## Shapes

按鈕與字幕列使用 button 圓角；表單欄位使用 field 圓角；報價摘要使用 result 圓角。主要操作面板與字幕組合桌面使用 panel 圓角、手機使用 mobile-panel 圓角。波形品牌標誌為簡潔線條。

## Components

### Buttons
主要按鈕為深藍底、白字，至少 56px 高；首頁 LINE 操作桌面 60px。一般 hover 使用 brightness(.9)，聯絡操作使用 contact-hover。全站 focus-visible 為 3px 深藍外框，外移 5px；白字聯絡按鈕也使用深藍外框，以在淺藍底上清楚辨識。Disabled 降低透明度並保留原生語義。

### Cards / Containers
淡藍試算面板包覆白色摘要，內距桌面 34px、中間寬度 26px、手機 26px 22px。字幕以深藍預覽及較淺藍的時間碼清單組合，手機上下排列。

### Inputs / Fields
白底、1px 藍灰邊框，長度欄位 58px 高、23px 數字。單位在右側固定位置。保留原生 select、checkbox 與鍵盤行為；錯誤以文字說明並停用無效的複製操作。

### Navigation
深藍品牌與文字導覽，hover 底線；LINE 入口有淡藍色底及圓角。手機導覽換行，所有項目仍可見。

### SRT specimen
時間碼與段落可點選，選取列使用 cue-selected，深藍預覽同步顯示對應內容。保留示意標示與下載入口。

## Do's and Don'ts

### Do:
- **Do** 延續晴藍、近白與深藍的單一視覺世界。
- **Do** 保留清楚的數字、時間碼、表單狀態及鍵盤焦點。
- **Do** 在手機使用單欄與自然換行。

### Don't:
- **Don't** 混用其他四個候選版本的美學。
- **Don't** spread the homepage LINE button's user-selected depth treatment to other surfaces or add unrelated texture.
- **Don't** 將商業承諾或頁面排序當作全站視覺 token。

### Workspace imagery

The selected clear homepage adds a single photographic workspace illustration between the hero and the SRT example. Soft daylight, pale oak, ivory and navy headphones add warmth within the established blue-white palette. The image is AI-generated illustrative photography, not a photograph of the actual studio. No visible subtitles, client material or recording equipment. Desktop uses a wide inset crop; mobile uses a taller crop. Assets are locally hosted responsive WebP files.
