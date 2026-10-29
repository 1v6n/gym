# Code Review Rules — Hypertrophy DDP PWA

## Architecture & Code Quality
REJECT if:
- Introduction of external frontend frameworks or heavy npm runtime dependencies (project is strictly vanilla HTML5, CSS3, ES6+).
- Hardcoded secrets, API keys, or credentials.
- Empty catch blocks or silent failure handling.
- Unhandled `localStorage` quota or JSON parse errors without fallbacks.
- Global variable pollution outside the core `state` / `ROUTINE_DATA` structures.

## CSS & Design System
REJECT if:
- Hardcoded arbitrary pixel spacing or arbitrary hex colors instead of design tokens in `tokens.css` (e.g. `var(--color-...)`, `var(--space-...)`).
- Interactive elements (buttons, inputs) with touch targets under 44x44px.
- Horizontal scrolling or layout overflow caused by fixed-width containers.

## Progressive Web App (PWA)
REJECT if:
- Changes to assets in `assets/` without corresponding cache bump or review in `sw.js`.
- Missing offline fallbacks or broken relative paths in `manifest.json`.

## Documentation & Commits
REJECT if:
- Commits not following Conventional Commits format (`feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`).
- AI attribution or "Co-Authored-By" tags in commit messages.
- Decorative emojis added to markdown headings.

## Response Format
FIRST LINE must be exactly:
STATUS: PASSED
or
STATUS: FAILED

If FAILED, list: `file:line - rule violated - issue`
