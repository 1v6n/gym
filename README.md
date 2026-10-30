# Hypertrophy DDP Coach

A 4-day upper/lower workout tracker built as an offline Progressive Web App (PWA). It implements Dynamic Double Progression (DDP) to regulate load and volume, with exercise cues, a rest timer, and local data storage.

Built with semantic HTML, modern CSS tokens (Dusk theme, WCAG 2.1 AA contrast, 44px touch targets), and vanilla JavaScript. No database, account, or cloud dependency.

---

## Deployment to GitHub Pages

GitHub Pages serves the static app over HTTPS, which iOS and Android require for home screen installation:

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin git@github.com:<YOUR_USERNAME>/<YOUR_REPO_NAME>.git
   git push -u origin main
   ```
2. **Enable Pages**:
   - Go to your repository on GitHub.
   - Click **Settings** -> **Pages**.
   - Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
   - Select branch `main` and folder `/ (root)`, then click **Save**.
3. **Install on Phone**:
   - Open `https://<YOUR_USERNAME>.github.io/<YOUR_REPO_NAME>/` in Safari (iOS) or Chrome (Android).
   - Tap **Share** -> **Add to Home Screen** (iOS) or **Menu** -> **Install App** (Android).
   - The app runs fullscreen and works offline.

---

## Features

- **4-Day Split**:
  - **Upper A**: Horizontal Push and Vertical Pull (Flat DB Press, Lat Pulldown, Incline DB, Chest-Supported Row, Cable Lateral Raise, Overhead Triceps Extension, Incline Biceps Curl).
  - **Lower A**: Quad Bias and Knee Flexion (Leg Press, Romanian Deadlift, Leg Extension, Seated Leg Curl, Standing Calf Raise).
  - **Upper B**: Vertical Push and Horizontal Pull (Overhead DB Press, Chest-Supported T-Bar Row, Flat DB Bench, Neutral Grip Pulldown, DB Lateral Raise, Cross-Body Triceps Extension, Bayesian Cable Curl).
  - **Lower B**: Posterior Chain and Adductors (Barbell RDL, Hack Squat / Leg Press, Lying Leg Curl, Machine Hip Adduction, Seated Calf Raise).
- **Dynamic Double Progression (DDP)**:
  - **Set 1 ceiling**: Reaching the top of the rep bracket (e.g. 8 reps on a 6–8 target) prompts a 2.5% to 5% load increase for the next week.
  - **Fatigue floor**: Dropping below the rep floor on later sets prompts an immediate 5% to 10% load reduction for the next set.
- **Rest Timer**:
  - Starts on set completion with exercise-specific intervals (2 to 3.5 minutes for compounds; 1.5 to 2 minutes for isolations).
  - Web Audio synthesis chime and haptic vibration pattern on completion.
  - +30s / -30s adjustments, pause, and skip controls.
- **Deload Switch**:
  - One-tap toggle that cuts volume by 50% and sets targets to 3–4 RIR.
- **Data Privacy**:
  - Data stays in browser `localStorage`.
  - JSON backup import/export and formatted Markdown clipboard export.

---

## Project Structure

```text
gym/
├── index.html                   # Application entry point (GitHub Pages root)
├── manifest.json                # PWA manifest
├── sw.js                        # Service Worker (offline cache v4)
├── README.md                    # Project documentation
├── .gitignore                   # Excluded build and cache files
│
├── assets/                      # Frontend assets
│   ├── css/
│   │   ├── tokens.css           # Design tokens (OKLCH colors, spacing, typography)
│   │   ├── base.css             # CSS reset and typography base
│   │   └── styles.css           # Component layouts and Dusk theme
│   ├── js/
│   │   └── app.js               # Workout routine, DDP engine, timer, and state
│   └── icons/
│       └── icon.svg             # Vector app icon
│
├── docs/                        # Reference documentation
│   ├── routine.md               # Training principles and exercise details
│   ├── workout_log.md           # Markdown logging template
│   └── OPEN_SOURCE_COMPARISON.md# Comparison against existing open-source trackers
│
├── scripts/                     # Local utilities
│   └── serve.py                 # Local Wi-Fi development server
│
└── tests/                       # Playwright test suite
    ├── qa_runner.py             # 30 functional E2E tests
    ├── run_qa.py                # Viewport, contrast, and touch target checks
    └── screenshots/             # Test captures and machine audit log
```

---

## Local Development and Testing

### Run Local Server
```bash
# With UV
uv run python scripts/serve.py

# With standard Python
python3 scripts/serve.py
```
Open `http://localhost:8080` or the local Wi-Fi IP shown in the console.

### Run Tests
```bash
# Functional tests
uv run python tests/qa_runner.py

# Multi-viewport and accessibility checks (touch targets, WCAG contrast,
# hidden-state regressions, horizontal overflow). Exits 1 on any failure.
python3 -m pip install -r tests/requirements.txt
python3 -m playwright install chromium
uv run python tests/run_qa.py
```

Screenshots and `qa_results.json` are written to `tests/screenshots/`, which is git-ignored.

---

## License
MIT
