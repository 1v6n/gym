# Feature: Exercise Substitutions & Machine Swapping

Active exercise substitution engine allowing users to swap occupied machines with biomechanically equivalent alternatives (or custom exercises) while maintaining DDP progression and historical tracking integrity.

## Specs

### S1: Active Substitution State Model
- State stores `state.substitutions = { [originalExerciseId]: { name: string, isCustom: boolean } }`.
- Persisted in `state.draft` / `localStorage` to survive page reloads during active workouts.
- Provide `substituteExercise(exerciseId, substituteName)` and `restoreOriginalExercise(exerciseId)`.

### S2: Actionable Substitutions Modal
- Upgraded `#modalSubstitutions`:
  - Lists all predefined equivalents from `ROUTINE_DATA` as interactive selectable items with `[ Usar este sustituto ]`.
  - Custom substitute input field: `<input id="inputCustomSub" placeholder="O escribe el nombre de otra máquina/ejercicio">` with `[ Aplicar ]`.
  - When an exercise is currently swapped: provides a prominent `[ ↺ Restaurar ejercicio original ]` button.

### S3: Exercise Card Visual State & Controls
- When substituted:
  - Exercise card title updates to show the substitute name.
  - Adds indicator badge: `Sustituto de [Nombre original]`.
  - Displays quick restore button `[ ↺ Restaurar original ]`.

### S4: Overload & History Integrity
- Historical lookup (`Previa` column): Prioritizes previous logs for the substitute to avoid polluting DDP target calculations.
- Session completion: `finishWorkoutSession` records the actual performed exercise name in `state.history` and notes substitution.

### S5: Progressive Web App Cache Invalidation
- Bump cache name in `sw.js` to `hypertrophy-ddp-v7`.
- Verify offline availability.

### S6: Automated Regression Verification
- Automated Playwright QA tests in `tests/qa_runner.py`:
  - Open substitution modal for an exercise.
  - Select an alternative (e.g. *Barbell Flat Bench Press*).
  - Verify card header reflects the new exercise title and badge.
  - Verify restoring original exercise reverts cleanly.
  - Verify completed substituted workout records the substituted name in history.

## Tasks

- [x] `T1` (S1, S2, S3): Implement state model, actionable substitutions modal, and card UI updates in `assets/js/app.js`, `index.html`, and `assets/css/styles.css` — route: subagent-core
- [x] `T2` (S4, S5, S6): Add historical integrity handling, bump `sw.js` cache to v7, add Playwright tests in `tests/qa_runner.py`, and run full verification suite — route: subagent-verifier

## Log

- L1: "Now I have one more feature, I want something that let me swap the excersises, in case the machine is ocuppied. What I can do for that?"
- L2: "Yes. Use multiple agents"
- L3: Completed T1 and T2 via subagent-core and subagent-verifier. All 44 automated QA tests passed, 0 sloplint errors, PWA cache bumped to v7.
