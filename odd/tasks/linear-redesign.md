# Feature: Linear Design System Redesign

Full visual restyle of the Hypertrophy DDP PWA adopting the official Linear design system contract (`design.md`): #010102 deepest dark canvas, high-legibility grotesque sans typography (`Geist` / `Inter`), signature Linear lavender-blue accent (`#5e6ad2`), and precision 1px hairlines.

## Specs

### S1: Linear Design Tokens & Font Imports
- Implement the locked `design.md` token system in `assets/css/tokens.css`:
  - Deepest black canvas (`oklch(12% 0.005 260)`) and 4-step surface ladder.
  - Linear lavender accent (`oklch(56% 0.18 275)`).
  - High-legibility `Geist` / `Inter` sans font family for display and body with `-0.025em` tracking.
  - `Geist Mono` for weights, reps, timers, and charts.
- Update `index.html` font links (ensure Google Fonts imports Geist, Geist Mono, and Inter) and meta `theme-color` to `#010102`.

### S2: Component Styling Refinement
- Update Hallmark header stamp and style rules in `assets/css/styles.css`:
  - Headers, modal titles, and card headers use `--font-display` with weight 600 and `-0.025em` tracking.
  - Linear 12px card corners and 8px inner button radii.
  - Single primary filled CTA in Linear lavender (`.btn-primary`).
  - SVG progression chart line and gradient updated to Linear lavender accents.
  - Ceilings and status pills styled with Linear success green (`#27a644`).

### S3: Verification, Cache Bump & QA
- Bump Service Worker cache to `hypertrophy-ddp-v14` in `sw.js`.
- Hallmark `sloplint.mjs` must pass with 0 FAIL.
- All 44 automated Playwright QA tests in `tests/qa_runner.py` must pass with 0 failures.
- `tests/run_qa.py` (WCAG 2.1 AA contrast & responsive audit) passes with 0 failures.
- `tests/theme_qa.py` (theme persistence, offline, font family) passes.
- Gentleman Guardian Angel (GGA) pre-commit AI code review passes.

## Tasks

- [x] `T1` (S1): Update font imports in `index.html` and define Linear tokens in `assets/css/tokens.css` — route: inline
- [x] `T2` (S2): Refine component styles in `assets/css/styles.css` for Linear typography, cards, and SVG charts — route: inline
- [x] `T3` (S3): Bump `sw.js` cache to v14, verify sloplint, contrast audits, and all 44 Playwright QA tests, and commit — route: inline

## Log

- L1: "Set up Linear"
- L2: Implemented Linear design system contract in `design.md`, `tokens.css`, `styles.css`.
- L3: Verified WCAG 2.1 AA contrast compliance (7/7 resolved), `tests/run_qa.py` (PASS), `tests/theme_qa.py` (PASS), `tests/qa_runner.py` (44/44 PASS), `sloplint.mjs` (0 FAIL). Bumper sw.js cache to `hypertrophy-ddp-v14`.
