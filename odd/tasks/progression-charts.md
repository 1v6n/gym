# Feature: Progression Charts & Analytics

Native SVG progression chart embedded in the History modal to visualize progressive overload and strength trends per exercise over time.

## Specs

### S1: History Modal Segmented Switch
- Segmented control (`#historyTabControl`) inside `#modalHistory`:
  - `[ Sesiones ]` (`#tabHistorySessions`, default active)
  - `[ Progresión ]` (`#tabHistoryCharts`)
- Toggles visibility between `#historySessionsView` and `#historyChartsView`.
- Clean token styling with `var(--color-accent)`, `var(--color-surface)`, and `var(--radius-sm)`.
- Touch target minimum 44px height for tab switches.

### S2: Exercise Picker & Metric Aggregator
- Exercise selector (`#historyExerciseSelect`) listing all exercises with historical data.
- Metric toggle buttons:
  - **Peso Top Set (Set 1)** (`set1_weight`) - direct indicator of DDP progressive overload.
  - **1RM Estimado (E1RM)** (`e1rm`) - Epley formula `weight * (1 + reps / 30)`.
  - **Volumen Total** (`total_volume`) - sum of `weight * reps` across all sets.
- Aggregates chronologically ordered points from `state.history`.
- Friendly empty state when no history exists: "Completa entrenamientos para ver tu curva de progresión."

### S3: Zero-Dependency Native SVG Chart Engine
- Responsive SVG container with `viewBox="0 0 600 280"`, width 100%, and height auto.
- Grid lines using `var(--color-border)`.
- Gradient area fill & stroke line using `var(--color-accent)`.
- Data markers (`<circle>`) at each session point with accessible labels.
- Stats summary strip below chart showing: **Carga Inicial**, **Máximo Actual**, **Progreso Neto (+kg / +%)**.
- Detail callout showing date, weight, reps, and RIR on point interaction.

### S4: Design System & Accessibility Compliance
- Strictly pure tokens from `assets/css/tokens.css`.
- WCAG AA color contrast on text and SVG labels.
- No horizontal layout overflow.
- All touch targets >= 44x44px.

### S5: Progressive Web App Cache Invalidation
- Bump cache name in `sw.js` to `hypertrophy-ddp-v6`.
- Verify offline availability.

### S6: Automated Regression Verification
- Automated Playwright QA tests in `tests/qa_runner.py`:
  - Verify segmented tab switches views correctly.
  - Verify exercise dropdown populates from history.
  - Verify SVG chart renders with data nodes and axis coordinates.
  - Verify metric toggle recalculates SVG path.

## Tasks

- [x] `T1` (S1, S2): Implement tab controls, containers, and data aggregation logic in `index.html`, `assets/css/styles.css`, and `assets/js/app.js` — route: inline
- [x] `T2` (S3, S4): Implement native SVG chart rendering engine, metrics selector, and stats summary in `assets/js/app.js` and `assets/css/styles.css` — route: inline
- [x] `T3` (S5, S6): Bump `sw.js` cache to v6, add Playwright tests in `tests/qa_runner.py`, and run full QA verification — route: inline

## Log

- L1: "Yes. But rememeber, using odd to impleemnt this and gentle ai"
- L2: Completed T1, T2, T3 with 38/38 passing Playwright tests and 0 sloplint errors. Native inline SVG engine integrated with zero runtime dependencies.
