# Design control panel

Mode: Operate. A local design preview utility inside the selected 清朗服務 website, enabled on localhost or by ?design=1. This is an extension of the existing blue identity; optional color presets are experiments rather than new brand commitments.

Purpose: allow the site owner to adjust typography, color, spacing, geometry and motion without editing code. Keep core service content, pricing calculation and LINE targets intact. State clearly that changes are browser-local until exported settings are applied to source and deployed.

UI: fixed, collapsible side panel with left/right docking, four native disclosure groups, a persistent original comparison and undo/redo toolbar, and persistent import/export/share/reset controls. Shadow DOM isolates the editor from the styles being edited. Responsive narrow-screen panel; keyboard Escape returns focus to its launcher.

Guardrails: normalize all imported/shared values; no arbitrary CSS or script import. Auto-select readable text on the primary color, display contrast ratios, honor reduced motion, preserve no-script marketing content. Normal production homepage has no editor DOM or personal overrides.

Verified: local live typography/color changes, undo/redo, original comparison, export/import, persistence on reload, cloud-origin sharing, panel collapse/Escape/docking, motion off/replay, and 390/320px maximum font/spacing layouts. Eight unit tests cover settings and existing quotes. No default design tokens changed.
