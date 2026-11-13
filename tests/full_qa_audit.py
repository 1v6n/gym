import os
import json
from playwright.sync_api import sync_playwright

URL = "http://127.0.0.1:8080"
SCREENSHOT_DIR = "/home/ivan/gym/tests/screenshots/full_qa"


def ensure_dir():
    os.makedirs(SCREENSHOT_DIR, exist_ok=True)


def run_full_qa():
    ensure_dir()
    results = []
    console_errors = []
    page_errors = []
    failed_requests = []

    def record(name, passed, detail=""):
        results.append({"name": name, "passed": bool(passed), "detail": detail})
        status = "PASS" if passed else "FAIL"
        print(f"[{status}] {name}: {detail}")

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 390, "height": 844}, device_scale_factor=2)
        page = context.new_page()

        page.on("console", lambda m: console_errors.append(m.text) if m.type == "error" else None)
        page.on("pageerror", lambda e: page_errors.append(str(e)))
        page.on("response", lambda r: failed_requests.append(f"{r.status} {r.url}") if r.status >= 400 else None)
        page.on("dialog", lambda d: d.accept())

        page.goto(URL, wait_until="networkidle")
        page.evaluate("localStorage.clear()")
        page.reload(wait_until="networkidle")
        page.wait_for_timeout(300)

        # 1. Dark Mode + Light Mode across viewports & horizontal overflow check
        for theme in ("dark", "light"):
            page.locator("#btnSettings").click()
            page.wait_for_timeout(200)
            page.locator("#themeSelect").select_option(theme)
            page.wait_for_timeout(200)
            page.locator("#modalSettings [data-close-modal]").click()
            page.wait_for_timeout(200)

            for vp_name, vp in [("390x844", {"width": 390, "height": 844}), ("320x640", {"width": 320, "height": 640}), ("1280x800", {"width": 1280, "height": 800})]:
                page.set_viewport_size(vp)
                page.wait_for_timeout(200)
                overflow = page.evaluate("document.documentElement.scrollWidth > window.innerWidth")
                record(f"No Horizontal Overflow ({theme}, {vp_name})", not overflow, f"scrollWidth<=innerWidth: {not overflow}")
                if vp_name == "390x844":
                    page.screenshot(path=f"{SCREENSHOT_DIR}/home_{theme}_390.png")

        page.set_viewport_size({"width": 390, "height": 844})
        page.locator("#btnSettings").click()
        page.wait_for_timeout(150)
        page.locator("#themeSelect").select_option("dark")
        page.locator("#modalSettings [data-close-modal]").click()
        page.wait_for_timeout(150)

        # 2. All 4 routine tabs
        for tab_id, expected_title in [
            ("lowerA", "Lower A:"),
            ("upperB", "Upper B:"),
            ("lowerB", "Lower B:"),
            ("upperA", "Upper A:"),
        ]:
            page.locator(f".tab-btn[data-session='{tab_id}']").click()
            page.wait_for_timeout(150)
            title = page.locator("#sessionTitle").inner_text()
            record(f"Tab Switch ({tab_id})", expected_title in title, title)

        # 3. Persistent Keep-Weight Progression Window (Set 1 < ceiling)
        page.locator("#btnToggleWorkout").click()
        page.wait_for_timeout(150)
        page.locator("#row_flat_db_press_0 .set-input-weight").fill("30")
        page.locator("#row_flat_db_press_0 .set-input-reps").fill("6")
        page.locator("#row_flat_db_press_0 .set-input-rir").fill("2")
        page.locator("#row_flat_db_press_0 .set-check-btn").click()
        page.wait_for_timeout(200)
        page.locator("#btnTimerSkip").click()
        page.wait_for_timeout(150)
        page.locator("#btnToggleWorkout").click()
        page.wait_for_timeout(250)
        page.reload(wait_until="networkidle")
        page.wait_for_timeout(250)

        keep_win = page.locator("[data-prev-progression='flat_db_press']")
        keep_text = keep_win.inner_text() if keep_win.count() > 0 else ""
        keep_ok = keep_win.is_visible() and ("KEEP WEIGHT" in keep_text.upper()) and ("30 kg x 6 reps" in keep_text)
        record("Progression Window (Keep Weight persists after reload)", keep_ok, keep_text.replace("\n", " "))
        page.screenshot(path=f"{SCREENSHOT_DIR}/prev_window_keep_dark.png")

        # 4. Persistent Increase-Weight Progression Window (Set 1 >= ceiling)
        page.locator("#btnToggleWorkout").click()
        page.wait_for_timeout(150)
        page.locator("#row_flat_db_press_0 .set-input-weight").fill("30")
        page.locator("#row_flat_db_press_0 .set-input-reps").fill("8")
        page.locator("#row_flat_db_press_0 .set-input-rir").fill("2")
        page.locator("#row_flat_db_press_0 .set-check-btn").click()
        page.wait_for_timeout(200)
        page.locator("#btnTimerSkip").click()
        page.wait_for_timeout(150)
        page.locator("#btnToggleWorkout").click()
        page.wait_for_timeout(250)
        page.reload(wait_until="networkidle")
        page.wait_for_timeout(250)

        inc_win = page.locator("[data-prev-progression='flat_db_press']")
        inc_text = inc_win.inner_text() if inc_win.count() > 0 else ""
        inc_ok = inc_win.is_visible() and ("INCREASE WEIGHT" in inc_text.upper()) and ("30.7" in inc_text)
        record("Progression Window (Increase Weight persists after reload)", inc_ok, inc_text.replace("\n", " "))
        page.screenshot(path=f"{SCREENSHOT_DIR}/prev_window_increase_dark.png")

        # 5. Custom Exercise Persistence across Finish Workout + Page Reload
        page.locator("button[data-accordion='flat_db_press']").click()
        page.wait_for_timeout(150)
        page.locator("[data-show-subs='flat_db_press']").click()
        page.wait_for_timeout(200)
        placeholder = page.locator("#inputCustomSub").get_attribute("placeholder") or ""
        record("Custom Substitute Placeholder Fits Cleanly", len(placeholder) <= 28, f"Placeholder: '{placeholder}'")
        page.locator("#inputCustomSub").fill("Nautilus Nitro Chest Press")
        page.locator("#btnApplyCustomSub").click()
        page.wait_for_timeout(200)

        page.locator("#btnToggleWorkout").click()
        page.wait_for_timeout(150)
        page.locator("#row_flat_db_press_0 .set-input-weight").fill("65")
        page.locator("#row_flat_db_press_0 .set-input-reps").fill("8")
        page.locator("#row_flat_db_press_0 .set-check-btn").click()
        page.wait_for_timeout(200)
        page.locator("#btnTimerSkip").click()
        page.wait_for_timeout(150)
        page.locator("#btnToggleWorkout").click()
        page.wait_for_timeout(250)
        page.reload(wait_until="networkidle")
        page.wait_for_timeout(250)

        card_title_after_reload = page.locator("#card_flat_db_press .exercise-title").inner_text().strip()
        custom_prev_win = page.locator("[data-prev-progression='flat_db_press']").inner_text()
        record("Custom Exercise Remains Active After Finish & Reload", card_title_after_reload == "Nautilus Nitro Chest Press", card_title_after_reload)
        record("Custom Exercise Has Its Own Progression Window", "65 kg x 8 reps" in custom_prev_win, custom_prev_win.replace("\n", " "))

        # Restore original, reopen subs modal, verify Saved custom still exists, then delete it
        page.locator("#card_flat_db_press .btn-restore-sub").click()
        page.wait_for_timeout(200)
        page.locator("button[data-accordion='flat_db_press']").click()
        page.wait_for_timeout(150)
        page.locator("[data-show-subs='flat_db_press']").click()
        page.wait_for_timeout(200)
        saved_chip_ok = page.locator(".sub-option-item:has-text('Nautilus Nitro Chest Press') .sub-custom-chip").count() > 0
        record("Saved Custom Substitute Listed After Restore", saved_chip_ok, f"Chip present: {saved_chip_ok}")
        page.screenshot(path=f"{SCREENSHOT_DIR}/subs_modal_custom_saved_dark.png")
        page.locator(".sub-option-item:has-text('Nautilus Nitro Chest Press') .btn-sub-delete").click()
        page.wait_for_timeout(200)
        deleted_ok = page.locator(".sub-option-item:has-text('Nautilus Nitro Chest Press')").count() == 0
        record("Saved Custom Substitute Delete Button Works", deleted_ok, f"Deleted: {deleted_ok}")
        page.locator("#modalSubstitutions [data-close-modal]").click()
        page.wait_for_timeout(150)

        # 6. History & Progression Chart Grammar & Axis Label Check
        page.locator("#btnHistory").click()
        page.wait_for_timeout(200)
        page.locator("#tabHistoryCharts").click()
        page.wait_for_timeout(250)
        select_options_text = page.locator("#historyExerciseSelect").inner_text()
        axis_texts = page.locator(".chart-svg .chart-points text").all_text_contents()
        no_trailing_comma = all("," not in t for t in axis_texts)
        singular_ok = "(1 workout)" not in select_options_text or "(1 workouts)" not in select_options_text
        record("Chart Exercise Select Grammar", "(1 workouts)" not in select_options_text, "No '1 workouts' bug")
        record("Chart X-Axis Date Labels Clean", no_trailing_comma and len(axis_texts) > 0, f"Labels: {axis_texts}")
        page.screenshot(path=f"{SCREENSHOT_DIR}/chart_dark.png")
        page.locator("#modalHistory [data-close-modal]").click()
        page.wait_for_timeout(150)

        # 7. Escape key closes open modal
        page.locator("#btnSettings").click()
        page.wait_for_timeout(150)
        page.keyboard.press("Escape")
        page.wait_for_timeout(150)
        esc_closed = "hidden" in (page.locator("#modalSettings").get_attribute("class") or "")
        record("Escape Key Closes Modal", esc_closed, f"Settings hidden: {esc_closed}")

        # 8. Console / Page / Network Error Check
        record("Zero Console Errors", len(console_errors) == 0, str(console_errors))
        record("Zero Unhandled Page Errors", len(page_errors) == 0, str(page_errors))
        record("Zero HTTP >=400 Responses", len(failed_requests) == 0, str(failed_requests))

        browser.close()

    total = len(results)
    passed = sum(1 for r in results if r["passed"])
    failed = total - passed
    print(f"\nFULL QA AUDIT: {passed}/{total} PASSED ({failed} failed)")
    if failed > 0:
        raise SystemExit(1)


if __name__ == "__main__":
    run_full_qa()
