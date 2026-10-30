# Feature: Hallmark Vintage Dark UI & Branding Redesign

Full visual restyle of the Hypertrophy DDP PWA adopting Hallmark's Dark Vintage aesthetic (Golden Era Iron): deep espresso/near-black ground, warm parchment cream typography, classic Instrument Serif display headers, antique bronze/amber overload accents, and smoked hairline wells.

## Specs

### S1: Hallmark Token Palette (Golden Era / Dark Vintage)
- Paper tokens:
  - `--color-paper`: `oklch(13% 0.012 45)` (deep warm charcoal)
  - `--color-paper-2`: `oklch(17% 0.015 45)` (smoked well)
  - `--color-paper-3`: `oklch(21.5% 0.018 45)` (elevated card surface)
  - `--color-paper-4`: `oklch(26% 0.02 45)` (interactive hover)
- Ink tokens:
  - `--color-ink`: `oklch(94.5% 0.018 80)` (warm cream parchment)
  - `--color-ink-2`: `oklch(85% 0.022 75)`
  - `--color-muted`: `oklch(71% 0.028 65)`
  - `--color-faint`: `oklch(58% 0.025 60)`
- Accent & Overload tokens:
  - `--color-accent`: `oklch(72% 0.18 55)` (antique bronze / molten gold)
  - `--color-accent-ink`: `oklch(14% 0.02 45)`
  - `--color-accent-bg`: `oklch(22% 0.04 55)`
  - `--color-accent-rule`: `oklch(42% 0.08 55)`
  - `--color-focus`: `oklch(76% 0.18 55)`
- Typography:
  - `--font-display`: `"Instrument Serif", Georgia, serif`
  - `--font-body`: `"Geist", "Wix Madefor Text", ui-sans-serif, system-ui, sans-serif`
  - `--font-mono`: `"Geist Mono", monospace`

### S2: Layout & Component Refinement
- Headers (`h1`, `h2`, `h3`, `.exercise-title`, modal titles) styled with `--font-display`, refined line-height, and warm cream tone.
- Action buttons styled as pill controls with min 44x44px touch targets.
- Exercise cards and modal cards styled as smoked wells with 1px `--color-rule` hairlines.
- DDP Ceiling banner styled with antique bronze border and warm high-contrast callout.
- Progression SVG chart stroke and gradient updated to molten bronze tokens.

### S3: Wiring & Verification Preservation
- Zero change to functional IDs, classes, test hooks, inputs, or event handlers.
- Cache bumped to `hypertrophy-ddp-v8` in `sw.js`.
- All 44 Playwright tests in `tests/qa_runner.py` must pass with 0 failures.
- Hallmark `sloplint.mjs` must pass with 0 FAIL.

## Tasks

- [x] `T1` (S1): Update font imports in `index.html` and define Golden Era tokens in `assets/css/tokens.css` — route: inline
- [x] `T2` (S2): Refine styles in `assets/css/styles.css` for vintage typography, cards, buttons, and SVG charts — route: inline
- [x] `T3` (S3): Bump `sw.js` cache to v8, run sloplint, run all 44 Playwright tests, and commit with GGA review — route: inline

## Log

- L1: "Más un estilo más vintage"
- L2: "Vintage oscuro. Siempre respetar la skill de hallmark"
