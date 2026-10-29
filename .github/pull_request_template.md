## Summary

<!-- One concise paragraph: What was changed, why was it needed, and what is the outcome? -->

## Type of Change

- [ ] `feat`: New feature or capability
- [ ] `fix`: Bug fix
- [ ] `refactor`: Code refactoring without behavior change
- [ ] `perf`: Performance improvement
- [ ] `docs`: Documentation updates
- [ ] `test`: Test suite additions or modifications
- [ ] `chore`: Maintenance, dependencies, or configuration

## Technical Architecture & Key Decisions

| Area | Decision / Change | Rationale |
| :--- | :--- | :--- |
| **Storage / State** | | |
| **UI / Components** | | |
| **PWA / Service Worker** | | |

## Verification & Testing Evidence

- **Automated QA Runner**:
  - `qa_runner.py`: `X / X tests passed`
  - `run_qa.py`: Touch targets >= 44px, WCAG AA contrast, 0 overflow
- **Design Tokens**: `sloplint` passed with 0 failures
- **Code Review**: GGA (Gentleman Guardian Angel) pre-commit audit passed

<!-- Attach relevant screenshots or test results below -->

## Reviewer Checklist

- [ ] Follows Conventional Commits format (`feat:`, `fix:`, etc.)
- [ ] No hardcoded arbitrary pixels or colors (uses `tokens.css`)
- [ ] Service worker cache version bumped if assets changed (`sw.js`)
- [ ] No external frontend frameworks or heavy dependencies added
- [ ] No secrets, credentials, or AI attribution tags
