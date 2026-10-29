# 🏋️ Hypertrophy DDP Coach

An evidence-based, 4-day Upper/Lower natural hypertrophy training web application and Progressive Web App (PWA). Powered by Dynamic Double Progression (DDP), biomechanical execution cues, intelligent fatigue drop-off detection, and zero-dependency offline storage.

Designed with modern typography and Dusk tokens adhering to strict design standards (WCAG 2.1 AA accessible, >=44px touch targets, zero AI-slop).

---

## 🚀 1-Minute Deployment to GitHub Pages

GitHub Pages is the easiest, fastest way to host this app with free, automatic HTTPS:

1. **Create a GitHub Repository**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Hypertrophy DDP Coach PWA"
   git branch -M main
   git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPO_NAME>.git
   git push -u origin main
   ```
2. **Enable GitHub Pages**:
   - Go to your repository on GitHub.
   - Click **Settings** → **Pages** (in the left sidebar).
   - Under **Build and deployment** > **Source**, select **Deploy from a branch**.
   - Under **Branch**, select `main` and `/ (root)`, then click **Save**.
3. **Open on your Phone**:
   - In 1–2 minutes, GitHub will publish your site at `https://<YOUR_USERNAME>.github.io/<YOUR_REPO_NAME>/`.
   - Open that URL on your phone's browser (Safari on iOS or Chrome on Android).
   - Tap **Share** → **Add to Home Screen** (iOS) or **Menu** → **Install App** (Android).
   - The app installs as a standalone fullscreen app that works 100% offline at the gym!

---

## 📱 Features

* **Scientific 4-Day Split**:
  * **Upper A**: Horizontal Push & Vertical Pull (Flat DB Press, Lat Pulldown, Incline DB, Chest-Supported Row, Cable Lateral Raise, Overhead Triceps Extension, Incline Biceps Curl).
  * **Lower A**: Quad Bias & Knee Flexion (Leg Press, Romanian Deadlift, Leg Extension, Seated Leg Curl, Standing Calf Raise).
  * **Upper B**: Vertical Push & Horizontal Pull (Overhead DB Press, Chest-Supported T-Bar Row, Flat DB Bench, Neutral Grip Pulldown, DB Lateral Raise, Cross-Body Triceps Extension, Bayesian Cable Curl).
  * **Lower B**: Posterior Chain & Adductor Focus (Barbell RDL, Hack Squat / Leg Press, Lying Leg Curl, Machine Hip Adduction, Seated Calf Raise).
* **Dynamic Double Progression (DDP) Engine**:
  * **Set 1 Ceiling Trigger**: Reaching the top of the rep target bracket (e.g. 8 reps on 6–8) prompts an automated load increase recommendation (+2.5% to +5%) for the next week.
  * **Fatigue Drop-off Warning**: Falling below the target bracket floor on subsequent sets prompts an immediate fatigue reduction recommendation (-5% to -10%) to preserve high-threshold motor unit recruitment without junk volume.
* **Smart Rest Timer**:
  * Auto-starts when sets are completed with exercise-specific rest intervals (2.0 to 3.5 min for compounds; 1.5 to 2.0 min for isolations).
  * +30s / -30s adjustments, pause/resume, and hardware-accelerated progress bar.
  * Web Audio API synthesized completion chime and haptic vibration pattern (`[200, 100, 200, 100, 400]ms`).
* **Deload Mode**:
  * One-tap switch reducing volume by ~50% and setting target intensity to 3–4 RIR for scheduled recovery weeks.
* **100% Offline & Private**:
  * Built on `localStorage` and Service Worker (`sw.js`). No database, no tracking, no external login required.
  * Single-tap JSON backup import/export and formatted Markdown clipboard export.

---

## 📂 Project Structure

```text
├── index.html                 # Main PWA application entry point
├── styles.css                 # Responsive Dusk layout and component styles
├── tokens.css                 # OKLCH color tokens, spacing, and typography scales
├── base.css                   # CSS reset and utility definitions
├── app.js                     # Routine data, DDP progression engine, rest timer & state
├── manifest.json              # Web App Manifest for mobile installation
├── sw.js                      # Service Worker for full offline caching (v3)
├── icon.svg                   # PWA vector icon and apple-touch-icon
├── serve.py                   # Lightweight local development server
├── routine.md                 # Evidence-based training principles and anatomy breakdown
├── OPEN_SOURCE_COMPARISON.md  # Comprehensive benchmark vs existing open-source trackers
├── workout_log.md             # Markdown workout logging template
├── .gitignore                 # Excluded build and local cache files
├── qa_runner.py               # Synchronous Playwright functional E2E test runner (30 tests)
├── run_qa.py                  # Multi-viewport responsive visual & contrast test suite
└── qa_screenshots/            # Automated test captures and machine-readable audit report
```

---

## 💻 Local Development & Testing

### Running the Local Server
```bash
# Using UV
uv run python serve.py

# Or standard Python 3
python3 serve.py
```
Access at `http://localhost:8080` (or the printed local Wi-Fi IP from your mobile phone).

### Running Automated Playwright QA
```bash
# Run all 30 functional E2E tests
uv run python qa_runner.py

# Run responsive visual audits (Desktop, iPhone, Android, 320px)
uv run python run_qa.py

# Verify Hallmark design compliance (0 slop)
node /path/to/hallmark/scripts/sloplint.mjs index.html --scope app
```

---

## 📄 License
MIT License. Free to use, modify, and share.
