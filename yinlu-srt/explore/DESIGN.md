---
name: "Yinlu five independent proposals"
description: "Implemented comparison tokens; 清朗服務 selected and applied to the production homepage."
colors:
  hub-bg: "#f7f8f5"
  hub-ink: "#252b26"
  hub-muted: "#59625c"
  hub-line: "#d8ddd5"
  hub-selected: "#e6eadf"
  hub-accent: "#314536"
  editorial-bg: "#f5f3ec"
  editorial-ink: "#182c45"
  editorial-muted: "#526074"
  editorial-accent: "#182c45"
  editorial-on-accent: "#f5f3ec"
  editorial-surface: "#e9e6de"
  editorial-surface-2: "#fcfbf6"
  editorial-selected: "#d4dee6"
  editorial-border: "#8d99a5"
  studio-bg: "#141918"
  studio-ink: "#e4ede6"
  studio-muted: "#adbbb0"
  studio-accent: "#c8ee88"
  studio-on-accent: "#192217"
  studio-surface: "#222b27"
  studio-surface-2: "#18201c"
  studio-selected: "#3b542f"
  studio-border: "#697a6a"
  studio-error: "#ffb2a7"
  poster-bg: "#f9f8f4"
  poster-ink: "#171a18"
  poster-muted: "#555952"
  poster-accent: "#d73122"
  poster-on-accent: "#fffaf6"
  poster-surface: "#e9e8df"
  poster-surface-2: "#fffefa"
  poster-selected: "#f6d2c8"
  poster-border: "#7e8177"
  clear-bg: "#fbfdff"
  clear-ink: "#124d76"
  clear-muted: "#45667d"
  clear-accent: "#124d76"
  clear-on-accent: "#fff"
  clear-surface: "#edf5fc"
  clear-surface-2: "#fff"
  clear-selected: "#d1e8f8"
  clear-border: "#7c9bb0"
  clear-error: "#a62d3f"
  archive-bg: "#e9e8e3"
  archive-ink: "#242623"
  archive-muted: "#60635b"
  archive-accent: "#242623"
  archive-on-accent: "#fafaf6"
  archive-surface: "#ddded6"
  archive-surface-2: "#fafaf6"
  archive-selected: "#d4d7ca"
  archive-border: "#85887f"
typography:
  shared-body:
    fontFamily: '"Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif'
    fontSize: "16px"
    lineHeight: 1.8
rounded:
  shared-square: "0px"
  clear-base: "16px"
  clear-button: "12px"
  clear-panel: "24px"
  hub-tab: "7px"
spacing:
  shared-button: "14px 26px"
  editorial-gutter: "clamp(26px,4.3vw,68px)"
  studio-gutter: "clamp(22px,4vw,64px)"
  poster-gutter: "clamp(24px,4vw,64px)"
  clear-gutter: "clamp(24px,6vw,96px)"
  archive-gutter: "clamp(26px,4.8vw,76px)"
---
# 音律工作室：五方向比較

## Overview

Mode: outer review surface = Operate; each complete service page = Persuade. This is a durable comparison page explicitly requested by the user, with independent full-page versions and a persistent switcher. It is not the temporary element-level live-accept overlay; no selected direction is baked into the production website until the user chooses.

All five use the same 音律工作室 identity, single-speaker Mandarin-to-Traditional-Chinese SRT positioning, exact existing service copy, price/turnaround/refinement/deletion terms, example cues and primary LINE conversion. Business copy is generated from the current root index.html; no invented customer proof or added service claims. Quote logic and interaction code are reused, but each page has an isolated document and one complete theme stylesheet. Shared CSS supplies neutral semantic/interaction primitives only.

## Colors
All five use the same 音律工作室 identity, single-speaker Mandarin-to-Traditional-Chinese SRT positioning, exact existing service copy, price/turnaround/refinement/deletion terms, example cues and primary LINE conversion. Business copy is generated from the current root index.html; no invented customer proof or added service claims. Quote logic and interaction code are reused, but each page has an isolated document and one complete theme stylesheet. Shared CSS supplies neutral semantic/interaction primitives only.

Each theme's `:root` defines its own bg/ink/muted/accent/on-accent/surface/surface-2/selected/border/error/display/gutter/radius tokens. Editorial uses paper #f5f3ec and ink #182c45; studio uses #141918 and signal #c8ee88; poster uses vermilion #cf3023 with #171a18 and #f9f8f4; clear uses #edf5fc / #124d76 with 12–24px rounded functional surfaces; archive uses #e9e8e3 / #242623 / #fafaf6 and square document geometry. Their composition, type hierarchy, section rhythm and responsive behavior live only in their individual theme stylesheet. Noto Sans TC variable 400–800 is self-hosted in explore/fonts/ for real weight differences; the existing Noto Serif TC remains the editorial/archival display face. No production identity change has been made.

## Typography

Five pages self-host Noto Sans TC variable 400–800 at `explore/fonts/noto-sans-tc-variable.woff2`; hub declares 400–700 from the same file. Noto Serif TC 500–600 comes from `assets/fonts/noto-serif-tc.woff2`. Studio and archive timecodes use `ui-monospace, SFMono-Regular, monospace`.
1. 編輯書房: editorial two-page opening; serif display; paper/navy; print-like pacing; a narrow text column paired with the SRT specimen.
2. 字幕工作台: production desk; compact sans; charcoal/signal green; SRT preview dominates the opening; dense alignments and docked navigation.
3. 字體海報: Swiss poster; bold sans at large scale; vermilion/black/white; strong full-width fields, large price, asymmetrical grid.
4. 清朗服務: approachable service; centered opening, generous horizontal composition; blue/white, rounded interactive surfaces; long-form guidance made easy to scan.
5. 文字檔案室: archival document; monochrome; masthead/sidebar structure, small structured body measure, table-like service organization and file specimen.

## Layout
Complete content and working SRT/quote/copy/download/navigation in every version. No mixed direction selector on the visitor page; review controls live outside the isolated iframe. No gradients, shadow decoration, fake audio playback or upload actions. Real SRT sequence numbers and timecodes retain their data semantics. Chinese font support remains self-hosted Noto Sans/Serif TC; treatment and typographic hierarchy differ per direction. Desktop, 390px and 320px phone compositions must remain readable.

## Elevation & Depth

No box-shadow or gradients are implemented. Color fields, reversed ink and flat surfaces establish depth.

## Shapes

Editorial, studio, poster and archive inherit square corners. Clear uses a 16px base radius, 12px buttons and 24px panels (20px mobile). Hub uses its independent 7px tab and 5px control radii.

## Components
Five named tabs, desktop/mobile width controls, direct section jumps, previous/next direction, independent retained scroll, direct full-page view, copy chosen direction. Keyboard navigation, reload persistence and a no-script direct-link fallback. The neutral review chrome does not recolor with the selected page.

## Do's and Don'ts

Do preserve each proposal namespace; do keep the shared confirmed product content, pricing and LINE goal. Don't treat any proposal as the chosen brand or merge their aesthetics. Source authority: `explore/catalog.mjs`, `explore/common.css`, `explore/hub.css`, and `explore/themes/{editorial,studio,poster,clear,archive}.css`.
