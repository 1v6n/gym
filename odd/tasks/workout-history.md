# Feature: Workout History & Persistence Register

Persistent workout history tracking with local append-only logging, detailed inspection, and export.

## Specs

### S1: Persistent Training History Storage
- State stores `state.history = [...]` containing chronologically ordered completed sessions.
- Each history entry contains:
  - `id`: unique timestamp-based identifier (e.g. `entry_${Date.now()}_${sessionId}`)
  - `sessionId`: `upperA` | `lowerA` | `upperB` | `lowerB`
  - `sessionTitle`: string name of the routine
  - `date`: ISO timestamp or formatted locale string
  - `durationMinutes`: calculated duration of the workout
  - `weightUnit`: `kg` or `lbs`
  - `isDeloadMode`: boolean
  - `exercises`: dictionary of exercises with sets, weights, reps, and RIR
- Saved under `localStorage` key `hypertrophy_ddp_history_v1`.
- When finishing a session (`finishWorkoutSession`), append the new session entry to `state.history` AND update `state.logs[session.id]` to preserve progressive overload target calculations for the next week.

### S2: Workout History Viewer Modal
- Header action button (`#btnHistory`) with clock/calendar icon next to `#btnSettings`.
- Modal overlay (`#modalHistory`) with accessible close button (`[data-close-modal]`).
- Empty state message when no sessions are recorded: "No hay entrenamientos registrados aun."
- Cards for each past workout displaying:
  - Routine title & date/time
  - Duration and deload badge (if applicable)
  - Quick summary of top sets and total completed sets
  - Expand/collapse toggle to see all exercise sets, loads, reps, and RIR

### S3: History Management & Item Export
- Button to copy markdown summary of any individual past session.
- Button to delete an individual session from history with confirmation prompt.
- Clearing all history (`#btnResetHistory`) prompts user and resets both `state.history` and `state.logs`.

### S4: JSON Backup & Restore Compatibility
- `exportJsonBackup` exports both `state.logs` and `state.history`.
- `importJsonBackup` loads `imported.history` and falls back gracefully if only legacy `imported.logs` is present.

### S5: Progressive Web App Cache Invalidation
- Bump cache name in `sw.js` to `hypertrophy-ddp-v5`.
- Verify offline manifest and assets load from the new cache.

### S6: Automated Regression & Compliance Verification
- Automated Playwright QA runner tests in `tests/qa_runner.py`:
  - Test 31: Completing a workout creates an entry in `state.history`.
  - Test 32: Opening `#modalHistory` renders the completed workout with correct sets/reps.
  - Test 33: Page reload retains history from `localStorage`.
  - Test 34: Deleting an entry updates the UI and `localStorage`.
- Touch targets >= 44x44px, zero horizontal overflow, and WCAG AA contrast.

## Tasks

- [x] `T1` (S1, S4): Implement history data structures, persistence, and JSON backup/restore in `assets/js/app.js` — route: inline
- [x] `T2` (S2, S3): Implement history viewer modal and cards in `index.html`, `assets/css/styles.css`, and `assets/js/app.js` — route: inline
- [x] `T3` (S5, S6): Bump `sw.js` cache to v5, update QA test suite in `tests/qa_runner.py`, and run full verification — route: inline

## Log

- L1: "can you implement that using odd?"
- L2: Completed T1, T2, T3 with 35/35 passing automated QA tests and 0 sloplint failures.
