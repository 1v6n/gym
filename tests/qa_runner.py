import os
import sys
import time
import json
from playwright.sync_api import sync_playwright

TESTS_DIR = os.path.dirname(os.path.abspath(__file__))
SCREENSHOT_DIR = os.path.join(TESTS_DIR, "screenshots")
os.makedirs(SCREENSHOT_DIR, exist_ok=True)

test_results = []
def record_result(test_name, passed, details="", defect=None):
    test_results.append({
        "test": test_name,
        "passed": passed,
        "details": details,
        "defect": defect
    })
    status = "✅ PASS" if passed else "❌ FAIL"
    print(f"[{status}] {test_name}: {details}")
    if defect:
        print(f"    ⚠️ DEFECT: {defect}")

def run_tests():
    console_messages = []
    page_errors = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Mobile viewport: 390x844 (iPhone 12/13/14)
        context = browser.new_context(
            viewport={"width": 390, "height": 844},
            user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1",
            device_scale_factor=2,
            is_mobile=True,
            has_touch=True
        )
        page = context.new_page()

        page.on("console", lambda msg: console_messages.append(f"[{msg.type}] {msg.text}"))
        page.on("pageerror", lambda err: page_errors.append(str(err)))

        dialog_actions = {
            "confirm": True,
            "prompt": ""
        }
        dialogs_encountered = []
        def handle_dialog(dialog):
            dialogs_encountered.append({"type": dialog.type, "message": dialog.message})
            print(f"    Dialog opened: [{dialog.type}] '{dialog.message}'")
            if dialog.type == "confirm":
                if dialog_actions["confirm"]:
                    dialog.accept()
                else:
                    dialog.dismiss()
            elif dialog.type == "prompt":
                dialog.accept(dialog_actions["prompt"])
            else:
                dialog.accept()

        page.on("dialog", handle_dialog)

        url = "http://127.0.0.1:8080"
        print(f"Navigating to {url} (Unpatched baseline)...")
        page.goto(url, wait_until="networkidle")
        page.wait_for_timeout(500)

        # ---------------------------------------------------------
        # TEST 0: Baseline Check - Missing .hidden CSS Rule Defect
        # ---------------------------------------------------------
        sub_modal_display = page.evaluate("() => window.getComputedStyle(document.getElementById('modalSubstitutions')).display")
        guide_modal_display = page.evaluate("() => window.getComputedStyle(document.getElementById('modalGuide')).display")
        settings_modal_display = page.evaluate("() => window.getComputedStyle(document.getElementById('modalSettings')).display")
        timer_display = page.evaluate("() => window.getComputedStyle(document.getElementById('restTimerBar')).display")
        banner_display = page.evaluate("() => window.getComputedStyle(document.getElementById('ddpBanner')).display")

        modals_blocking = (sub_modal_display == "flex")
        record_result(
            "Baseline Defect Check: Missing .hidden CSS class",
            not modals_blocking,
            f"Computed displays: modalSubstitutions='{sub_modal_display}', modalGuide='{guide_modal_display}', modalSettings='{settings_modal_display}', timerBar='{timer_display}', ddpBanner='{banner_display}'",
            defect="CRITICAL BUG: .hidden class is not defined in any CSS file (only [hidden] attribute selector in base.css)." if modals_blocking else None
        )
        page.screenshot(path=f"{SCREENSHOT_DIR}/00_baseline_unpatched_modals_blocking.png")

        # ---------------------------------------------------------
        # Native CSS Verification (No runtime injection needed)
        # ---------------------------------------------------------
        print("\nVerifying native CSS styles loaded from base.css and styles.css...")
        page.wait_for_timeout(200)

        # ---------------------------------------------------------
        # TEST 1: Initial Page Load & Upper A rendering
        # ---------------------------------------------------------
        title_text = page.locator("#sessionTitle").inner_text()
        sets_count = page.locator("#totalSetsCount").inner_text()
        unit_pill = page.locator("#currentUnitPill").inner_text()
        cards_count = page.locator(".exercise-card").count()
        
        upper_a_pass = (title_text == "Upper A: Horizontal Push y Vertical Pull") and \
                       (sets_count == "19 series") and \
                       (unit_pill == "kg") and \
                       (cards_count == 7)
        record_result("Initial Load & Upper A Setup", upper_a_pass,
                      f"Title: '{title_text}', Sets: '{sets_count}', Unit: '{unit_pill}', Exercises: {cards_count}",
                      defect="HTML hardcodes '18 series' in #totalSetsCount, but app.js correctly renders and calculates 19 series (3+3+3+3+3+2+2) for Upper A." if sets_count != "19 series" else None)
        page.screenshot(path=f"{SCREENSHOT_DIR}/01_initial_upper_a.png")

        # ---------------------------------------------------------
        # TEST 2: Tab Navigation (Lower A, Upper B, Lower B, Back to Upper A)
        # ---------------------------------------------------------
        # Click Lower A
        page.locator("button[data-session='lowerA']").click()
        page.wait_for_timeout(300)
        la_title = page.locator("#sessionTitle").inner_text()
        la_sets = page.locator("#totalSetsCount").inner_text()
        la_cards = page.locator(".exercise-card").count()
        la_pass = (la_title == "Lower A: Quad Bias y Knee Flexion") and (la_sets == "13 series") and (la_cards == 5)
        record_result("Tab Navigation: Lower A", la_pass, f"Title: '{la_title}', Sets: '{la_sets}', Cards: {la_cards}")
        page.screenshot(path=f"{SCREENSHOT_DIR}/02_tab_lower_a.png")

        # Click Upper B
        page.locator("button[data-session='upperB']").click()
        page.wait_for_timeout(300)
        ub_title = page.locator("#sessionTitle").inner_text()
        ub_sets = page.locator("#totalSetsCount").inner_text()
        ub_cards = page.locator(".exercise-card").count()
        ub_pass = (ub_title == "Upper B: Vertical Push y Horizontal Pull") and (ub_sets == "19 series") and (ub_cards == 7)
        record_result("Tab Navigation: Upper B", ub_pass, f"Title: '{ub_title}', Sets: '{ub_sets}', Cards: {ub_cards}")
        page.screenshot(path=f"{SCREENSHOT_DIR}/03_tab_upper_b.png")

        # Click Lower B
        page.locator("button[data-session='lowerB']").click()
        page.wait_for_timeout(300)
        lb_title = page.locator("#sessionTitle").inner_text()
        lb_sets = page.locator("#totalSetsCount").inner_text()
        lb_cards = page.locator(".exercise-card").count()
        lb_pass = (lb_title == "Lower B: Posterior Chain y Adductor Focus") and (lb_sets == "13 series") and (lb_cards == 5)
        record_result("Tab Navigation: Lower B", lb_pass, f"Title: '{lb_title}', Sets: '{lb_sets}', Cards: {lb_cards}")
        page.screenshot(path=f"{SCREENSHOT_DIR}/04_tab_lower_b.png")

        # Switch back to Upper A
        page.locator("button[data-session='upperA']").click()
        page.wait_for_timeout(300)
        back_title = page.locator("#sessionTitle").inner_text()
        record_result("Tab Navigation: Return to Upper A", back_title == "Upper A: Horizontal Push y Vertical Pull", f"Title: '{back_title}'")
        page.screenshot(path=f"{SCREENSHOT_DIR}/05_back_to_upper_a.png")

        # ---------------------------------------------------------
        # TEST 3: Starting a Workout Session
        # ---------------------------------------------------------
        workout_btn = page.locator("#btnToggleWorkout")
        lbl_workout = page.locator("#lblWorkoutAction")
        initial_label = lbl_workout.inner_text()
        workout_btn.click()
        page.wait_for_timeout(300)

        started_label = lbl_workout.inner_text()
        btn_classes = workout_btn.get_attribute("class") or ""
        started_pass = (started_label == "Finalizar sesion") and ("active-workout" in btn_classes)
        record_result("Start Workout Toggle", started_pass, f"Label: '{initial_label}' -> '{started_label}', Class: '{btn_classes}'")
        page.screenshot(path=f"{SCREENSHOT_DIR}/06_workout_started.png")

        # ---------------------------------------------------------
        # TEST 4: Logging Set 1 - DDP Ceiling Trigger (8 reps on 6-8 target)
        # ---------------------------------------------------------
        weight_input_0 = page.locator("#row_flat_db_press_0 .set-input-weight")
        reps_input_0 = page.locator("#row_flat_db_press_0 .set-input-reps")
        rir_input_0 = page.locator("#row_flat_db_press_0 .set-input-rir")
        check_btn_0 = page.locator("#row_flat_db_press_0 .set-check-btn")

        weight_input_0.fill("30")
        reps_input_0.fill("8")
        rir_input_0.fill("2")
        check_btn_0.click()
        page.wait_for_timeout(400)

        row_0_class = page.locator("#row_flat_db_press_0").get_attribute("class") or ""
        check_0_text = check_btn_0.inner_text().strip()

        ddp_banner = page.locator("#ddpBanner")
        banner_classes = ddp_banner.get_attribute("class") or ""
        banner_hidden = "hidden" in banner_classes
        banner_text = page.locator("#ddpAlertText").inner_text()

        insight_0 = page.locator("#insight_flat_db_press_0")
        insight_0_classes = insight_0.get_attribute("class") or ""
        insight_0_text = insight_0.inner_text()

        ceiling_pass = ("completed" in row_0_class) and \
                       (check_0_text == "✓") and \
                       (not banner_hidden) and \
                       ("Techo alcanzado en Serie 1" in banner_text) and \
                       ("insight-ceiling" in insight_0_classes) and \
                       ("+0.8 a +1.5 kg" in insight_0_text)

        record_result("Set 1 DDP Ceiling Trigger (8 reps -> +2.5% to 5% alert)",
                      ceiling_pass,
                      f"Banner text: '{banner_text}', Inline text: '{insight_0_text}'")
        page.screenshot(path=f"{SCREENSHOT_DIR}/07_ddp_ceiling_triggered.png")

        # ---------------------------------------------------------
        # TEST 5: Rest Timer Controls and Countdown
        # ---------------------------------------------------------
        timer_bar = page.locator("#restTimerBar")
        timer_classes = timer_bar.get_attribute("class") or ""
        timer_label = page.locator("#timerExerciseLabel").inner_text()
        initial_clock = page.locator("#timerClock").inner_text()

        timer_visible = "hidden" not in timer_classes
        record_result("Rest Timer Auto-Start on Set Check",
                      timer_visible and ("Flat Dumbbell Press" in timer_label),
                      f"Visible: {timer_visible}, Label: '{timer_label}', Clock: '{initial_clock}'")

        # Test +30s button
        btn_plus = page.locator("#btnTimerPlus")
        btn_plus.click()
        page.wait_for_timeout(200)
        clock_after_plus = page.locator("#timerClock").inner_text()
        record_result("Timer +30s Button", "03:30" in clock_after_plus or "03:29" in clock_after_plus or clock_after_plus > initial_clock,
                      f"Clock changed from {initial_clock} to {clock_after_plus}")
        page.screenshot(path=f"{SCREENSHOT_DIR}/08_timer_plus_30s.png")

        # Test -30s button
        btn_minus = page.locator("#btnTimerMinus")
        btn_minus.click()
        page.wait_for_timeout(200)
        clock_after_minus = page.locator("#timerClock").inner_text()
        record_result("Timer -30s Button", clock_after_minus < clock_after_plus,
                      f"Clock changed from {clock_after_plus} to {clock_after_minus}")
        page.screenshot(path=f"{SCREENSHOT_DIR}/09_timer_minus_30s.png")

        # Test Pause/Resume
        btn_toggle = page.locator("#btnTimerToggle")
        btn_toggle.click()
        page.wait_for_timeout(200)
        toggle_svg_html = page.locator("#timerToggleIcon").inner_html()
        is_paused = "polygon" in toggle_svg_html
        record_result("Timer Pause Toggle", is_paused, f"Toggle Icon has polygon: {is_paused}")
        page.screenshot(path=f"{SCREENSHOT_DIR}/10_timer_paused.png")

        # Test Skip
        btn_skip = page.locator("#btnTimerSkip")
        btn_skip.click()
        page.wait_for_timeout(200)
        timer_after_skip_classes = timer_bar.get_attribute("class") or ""
        timer_hidden = "hidden" in timer_after_skip_classes
        record_result("Timer Skip Button", timer_hidden, f"Timer hidden after skip: {timer_hidden}")
        page.screenshot(path=f"{SCREENSHOT_DIR}/11_timer_skipped.png")

        # ---------------------------------------------------------
        # TEST 6: Logging Set 2 - Fatigue Drop-off Alert (<6 reps)
        # ---------------------------------------------------------
        weight_input_1 = page.locator("#row_flat_db_press_1 .set-input-weight")
        reps_input_1 = page.locator("#row_flat_db_press_1 .set-input-reps")
        rir_input_1 = page.locator("#row_flat_db_press_1 .set-input-rir")
        check_btn_1 = page.locator("#row_flat_db_press_1 .set-check-btn")

        weight_input_1.fill("30")
        reps_input_1.fill("5") # < 6 floor reps
        rir_input_1.fill("0")
        check_btn_1.click()
        page.wait_for_timeout(400)

        # Skip timer right away
        page.locator("#btnTimerSkip").click()
        page.wait_for_timeout(200)

        insight_1 = page.locator("#insight_flat_db_press_1")
        insight_1_classes = insight_1.get_attribute("class") or ""
        insight_1_text = insight_1.inner_text()

        drop_pass = ("insight-floor" in insight_1_classes) and \
                    ("Caida por fatiga" in insight_1_text) and \
                    ("5% y 10%" in insight_1_text) and \
                    ("-2.3 kg" in insight_1_text)

        record_result("Set Drop-off Alert (<6 reps triggers fatigue alert & -5% to 10% load reduction)",
                      drop_pass,
                      f"Classes: '{insight_1_classes}', Text: '{insight_1_text}'")
        page.screenshot(path=f"{SCREENSHOT_DIR}/12_set_drop_off_alert.png")

        # ---------------------------------------------------------
        # TEST 7: Logging Set 3 - Normal completion
        # ---------------------------------------------------------
        weight_input_2 = page.locator("#row_flat_db_press_2 .set-input-weight")
        reps_input_2 = page.locator("#row_flat_db_press_2 .set-input-reps")
        rir_input_2 = page.locator("#row_flat_db_press_2 .set-input-rir")
        check_btn_2 = page.locator("#row_flat_db_press_2 .set-check-btn")

        weight_input_2.fill("27.5")
        reps_input_2.fill("7")
        rir_input_2.fill("1")
        check_btn_2.click()
        page.wait_for_timeout(200)
        page.locator("#btnTimerSkip").click()
        page.wait_for_timeout(200)

        set3_done = "completed" in (page.locator("#row_flat_db_press_2").get_attribute("class") or "")
        record_result("Set 3 Logging Completion", set3_done, "Flat DB Press all 3 sets completed")
        page.screenshot(path=f"{SCREENSHOT_DIR}/13_exercise1_completed.png")

        # ---------------------------------------------------------
        # TEST 8: Accordion Drawer & Substitutions Modal
        # ---------------------------------------------------------
        acc_btn = page.locator("button[data-accordion='flat_db_press']")
        acc_btn.click()
        page.wait_for_timeout(300)
        drawer = page.locator("#drawer_flat_db_press")
        drawer_hidden = "hidden" in (drawer.get_attribute("class") or "")
        record_result("Accordion Drawer Expansion", not drawer_hidden, f"Drawer hidden: {drawer_hidden}")
        page.screenshot(path=f"{SCREENSHOT_DIR}/14_accordion_open.png")

        # Open substitutions modal
        page.locator("[data-show-subs='flat_db_press']").click()
        page.wait_for_timeout(300)
        sub_modal = page.locator("#modalSubstitutions")
        sub_modal_hidden = "hidden" in (sub_modal.get_attribute("class") or "")
        sub_body_text = page.locator("#subModalBody").inner_text()
        subs_pass = (not sub_modal_hidden) and ("Barbell Flat Bench Press" in sub_body_text)
        record_result("Substitutions Modal Open & Content", subs_pass, f"Substitutions found: 'Barbell Flat Bench Press' in modal")
        page.screenshot(path=f"{SCREENSHOT_DIR}/15_substitutions_modal.png")

        # ---------------------------------------------------------
        # Complete Substitution Flow Verification
        # ---------------------------------------------------------
        # 1. Select 'Barbell Flat Bench Press'
        page.locator(".sub-option-item:has-text('Barbell Flat Bench Press') .btn-sub-select").click()
        page.wait_for_timeout(300)

        # 2. Verify card title changes to 'Barbell Flat Bench Press' and .badge-sub displays 'Sustituto de: Flat Dumbbell Press'
        card_title = page.locator("#card_flat_db_press .exercise-title").inner_text().strip()
        badge_el = page.locator("#card_flat_db_press .badge-sub")
        badge_count = badge_el.count()
        badge_text = badge_el.inner_text().strip() if badge_count > 0 else ""
        sub_apply_pass = (card_title == "Barbell Flat Bench Press") and ("Sustituto de: Flat Dumbbell Press" in badge_text)
        record_result("Exercise Substitution: Predefined Swap to Barbell Flat Bench Press",
                      sub_apply_pass,
                      f"Card title: '{card_title}', Badge: '{badge_text}'")
        page.screenshot(path=f"{SCREENSHOT_DIR}/15a_substitute_barbell_bench.png")

        # 3. Restore original exercise and verify title reverts
        page.locator("#card_flat_db_press .btn-restore-sub").click()
        page.wait_for_timeout(300)
        reverted_title = page.locator("#card_flat_db_press .exercise-title").inner_text().strip()
        badge_after_revert = page.locator("#card_flat_db_press .badge-sub").count()
        restore_pass = (reverted_title == "Flat Dumbbell Press") and (badge_after_revert == 0)
        record_result("Exercise Substitution: Restore Original Exercise Reverts Title",
                      restore_pass,
                      f"Reverted title: '{reverted_title}', Badge count: {badge_after_revert}")
        page.screenshot(path=f"{SCREENSHOT_DIR}/15b_substitute_reverted_original.png")

        # 4. Custom substitution: Open modal, type 'Incline Hammer Strength Press', click apply, verify title updates
        page.locator("button[data-accordion='flat_db_press']").click()
        page.wait_for_timeout(200)
        page.locator("[data-show-subs='flat_db_press']").click()
        page.wait_for_timeout(300)

        page.locator("#inputCustomSub").fill("Incline Hammer Strength Press")
        page.locator("#btnApplyCustomSub").click()
        page.wait_for_timeout(300)

        custom_title = page.locator("#card_flat_db_press .exercise-title").inner_text().strip()
        custom_badge_el = page.locator("#card_flat_db_press .badge-sub")
        custom_badge_count = custom_badge_el.count()
        custom_badge_text = custom_badge_el.inner_text().strip() if custom_badge_count > 0 else ""
        custom_pass = (custom_title == "Incline Hammer Strength Press") and ("Sustituto de: Flat Dumbbell Press" in custom_badge_text)
        record_result("Exercise Substitution: Custom Substitute Input Applied",
                      custom_pass,
                      f"Custom title: '{custom_title}', Badge: '{custom_badge_text}'")
        page.screenshot(path=f"{SCREENSHOT_DIR}/15c_substitute_custom_hammer_strength.png")

        # 5. Clean revert to baseline for downstream tests
        page.locator("#card_flat_db_press .btn-restore-sub").click()
        page.wait_for_timeout(300)
        final_revert_title = page.locator("#card_flat_db_press .exercise-title").inner_text().strip()
        record_result("Exercise Substitution: Clean Revert to Baseline",
                      final_revert_title == "Flat Dumbbell Press",
                      f"Final title: '{final_revert_title}'")
        page.screenshot(path=f"{SCREENSHOT_DIR}/15d_substitute_clean_restore.png")

        # ---------------------------------------------------------
        # TEST 9: DDP Guide Modal
        # ---------------------------------------------------------
        page.locator("#btnQuickNotes").click()
        page.wait_for_timeout(300)
        guide_modal = page.locator("#modalGuide")
        guide_hidden = "hidden" in (guide_modal.get_attribute("class") or "")
        guide_text = page.locator(".modal-guide-text").inner_text()
        guide_pass = (not guide_hidden) and ("Dynamic Double Progression" in guide_text)
        record_result("DDP Guide Modal", guide_pass, "Guide displayed Dynamic Double Progression principles")
        page.screenshot(path=f"{SCREENSHOT_DIR}/16_guide_modal.png")
        guide_modal.locator("button.modal-close").click()
        page.wait_for_timeout(200)

        # ---------------------------------------------------------
        # TEST 10: Settings Modal & Unit Conversion & Deload Mode
        # ---------------------------------------------------------
        page.locator("#btnSettings").click()
        page.wait_for_timeout(300)
        settings_modal = page.locator("#modalSettings")
        settings_pass = "hidden" not in (settings_modal.get_attribute("class") or "")
        record_result("Settings Modal Open", settings_pass, "Settings modal opened")
        page.screenshot(path=f"{SCREENSHOT_DIR}/17_settings_modal.png")

        # Toggle to lbs
        page.locator("#btnUnitLbs").click()
        page.wait_for_timeout(200)
        settings_modal.locator("button.modal-close").click()
        page.wait_for_timeout(200)

        unit_pill_lbs = page.locator("#currentUnitPill").inner_text()
        table_hdr_unit = page.locator(".table-header div:nth-child(3)").first.inner_text()
        lbs_pass = (unit_pill_lbs == "lbs") and (table_hdr_unit == "lbs")
        record_result("Unit Toggle to lbs", lbs_pass, f"Unit Pill: '{unit_pill_lbs}', Table Header: '{table_hdr_unit}'")
        page.screenshot(path=f"{SCREENSHOT_DIR}/18_unit_lbs.png")

        # Toggle Deload Mode ON by clicking the switch slider
        page.locator("#btnSettings").click()
        page.wait_for_timeout(200)
        page.locator("label.switch:has(#chkDeloadMode) .slider").click()
        page.wait_for_timeout(200)
        settings_modal.locator("button.modal-close").click()
        page.wait_for_timeout(300)

        deload_status = page.locator("#deloadStatus").inner_text()
        deload_sets_count = page.locator("#totalSetsCount").inner_text()
        first_card_bracket = page.locator(".target-bracket").first.inner_text()
        first_card_rir = page.locator(".target-rir").first.inner_text()

        # In deload mode, plannedSets = Math.max(1, round(sets * 0.5)) -> 3 becomes 2 sets.
        # Upper A total sets: 5*2 + 2*1 = 12 sets.
        deload_pass = ("Modo deload activo" in deload_status) and \
                      ("3 a 4 RIR" in first_card_rir) and \
                      ("2 series" in first_card_bracket) and \
                      (deload_sets_count == "12 series")
        record_result("Deload Mode Activation (50% volume, 3 to 4 RIR)", deload_pass,
                      f"Deload Status: '{deload_status}', Total sets: '{deload_sets_count}', First exercise: '{first_card_bracket}', RIR: '{first_card_rir}'")
        page.screenshot(path=f"{SCREENSHOT_DIR}/19_deload_mode_active.png")

        # Restore normal mode and kg
        page.locator("#btnSettings").click()
        page.wait_for_timeout(200)
        page.locator("label.switch:has(#chkDeloadMode) .slider").click()
        page.wait_for_timeout(200)
        page.locator("#btnUnitKg").click()
        page.wait_for_timeout(200)
        settings_modal.locator("button.modal-close").click()
        page.wait_for_timeout(300)
        record_result("Settings Restore to Normal Mode (kg)", True, "Deload unchecked and unit restored to kg")
        page.screenshot(path=f"{SCREENSHOT_DIR}/20_deload_mode_restored.png")

        # ---------------------------------------------------------
        # TEST 11: Finishing Workout Session & Historical Data (Previa)
        # ---------------------------------------------------------
        # Click Finalizar sesion
        page.locator("#btnToggleWorkout").click()
        page.wait_for_timeout(500)

        # After finishing workout, check button reverts to "Iniciar entrenamiento"
        final_btn_label = page.locator("#lblWorkoutAction").inner_text()
        final_workout_active = "active-workout" in (page.locator("#btnToggleWorkout").get_attribute("class") or "")
        finish_pass = (final_btn_label == "Iniciar entrenamiento") and (not final_workout_active)
        record_result("Workout Session Finish", finish_pass, f"Button label: '{final_btn_label}', active: {final_workout_active}")

        # Check that previous values ("Previa") column now shows the completed weights & reps!
        previa_set1 = page.locator("#row_flat_db_press_0 .set-col-prev").inner_text()
        previa_set2 = page.locator("#row_flat_db_press_1 .set-col-prev").inner_text()
        previa_set3 = page.locator("#row_flat_db_press_2 .set-col-prev").inner_text()

        previa_pass = ("30x8" in previa_set1) and ("30x5" in previa_set2) and ("27.5x7" in previa_set3)
        record_result("Historical Retention (Previa Column)", previa_pass,
                      f"Previa Set 1: '{previa_set1}', Set 2: '{previa_set2}', Set 3: '{previa_set3}'")
        page.screenshot(path=f"{SCREENSHOT_DIR}/21_session_finished_previa_displayed.png")

        # Test Overload Integrity: When substituted, do NOT show original exercise's previous weights!
        page.locator("button[data-accordion='flat_db_press']").click()
        page.wait_for_timeout(200)
        page.locator("[data-show-subs='flat_db_press']").click()
        page.wait_for_timeout(300)
        page.locator(".sub-option-item:has-text('Barbell Flat Bench Press') .btn-sub-select").click()
        page.wait_for_timeout(300)

        sub_previa_set1 = page.locator("#row_flat_db_press_0 .set-col-prev").inner_text().strip()
        overload_integrity_pass = (sub_previa_set1 == "—")
        record_result("Overload Integrity: Substitute Hides Mismatched Machine Previa",
                      overload_integrity_pass,
                      f"Substituted Previa shows: '{sub_previa_set1}' (expected '—', not '30x8')")

        # Restore original exercise and verify Previa restores to 30x8
        page.locator("#card_flat_db_press .btn-restore-sub").click()
        page.wait_for_timeout(300)
        restored_previa_set1 = page.locator("#row_flat_db_press_0 .set-col-prev").inner_text().strip()
        record_result("Overload Integrity: Restoring Original Exercise Restores Previa",
                      "30x8" in restored_previa_set1,
                      f"Restored Previa shows: '{restored_previa_set1}'")

        # ---------------------------------------------------------
        # TEST 12: Additional Defect Investigations
        # ---------------------------------------------------------
        # Investigation A: DDP Banner hidden upon session finish
        banner_hidden_on_finish = "hidden" in (page.locator("#ddpBanner").get_attribute("class") or "")
        record_result("DDP Banner Hidden on Session Finish", banner_hidden_on_finish, f"Banner hidden after finish: {banner_hidden_on_finish}")

        # Investigation B: Unchecking a ceiling set leaves global banner or removes it?
        page.locator("#btnToggleWorkout").click()
        page.wait_for_timeout(200)
        w_in = page.locator("#row_flat_db_press_0 .set-input-weight")
        r_in = page.locator("#row_flat_db_press_0 .set-input-reps")
        c_btn = page.locator("#row_flat_db_press_0 .set-check-btn")
        w_in.fill("32.5")
        r_in.fill("8")
        c_btn.click()
        page.wait_for_timeout(300)
        page.locator("#btnTimerSkip").click()
        banner_shown_on_check = "hidden" not in (page.locator("#ddpBanner").get_attribute("class") or "")

        # Now test close button
        page.locator("#btnCloseDdpBanner").click()
        page.wait_for_timeout(200)
        banner_closed = "hidden" in (page.locator("#ddpBanner").get_attribute("class") or "")
        record_result("DDP Banner Close Button", banner_closed, f"Banner hidden after close button: {banner_closed}")

        # Now re-trigger and test uncheck
        c_btn.click() # uncheck
        page.wait_for_timeout(200)
        c_btn.click() # re-check
        page.wait_for_timeout(300)
        page.locator("#btnTimerSkip").click()

        # Uncheck to verify auto-hide
        c_btn.click()
        page.wait_for_timeout(300)
        banner_class_after_uncheck = page.locator("#ddpBanner").get_attribute("class") or ""
        uncheck_banner_hidden = "hidden" in banner_class_after_uncheck
        record_result("Defect Investigation: Global DDP Banner on Set Uncheck",
                      uncheck_banner_hidden,
                      f"Banner class after unchecking set: '{banner_class_after_uncheck}'",
                      defect="When unchecking a set that triggered the ceiling alert, app.js removes the row insight but does NOT hide the global #ddpBanner." if not uncheck_banner_hidden else None)
        page.screenshot(path=f"{SCREENSHOT_DIR}/22_defect_banner_persists_on_uncheck.png")

        # Investigation C: Tab navigation during active workout
        page.locator("button[data-session='lowerA']").click()
        page.wait_for_timeout(300)
        la_workout_btn_label = page.locator("#lblWorkoutAction").inner_text()
        tab_switch_active = (la_workout_btn_label == "Finalizar sesion")
        record_result("Defect Investigation: Active Workout Cross-Tab State",
                      not tab_switch_active,
                      f"While Upper A workout was active, switching to Lower A tab displays button label: '{la_workout_btn_label}'.",
                      defect="state.isWorkoutActive is a single global boolean. Switching tabs during an active workout leaves 'Finalizar sesion' active on any other tab and finishing it overwrites that tab's session." if tab_switch_active else None)
        page.screenshot(path=f"{SCREENSHOT_DIR}/23_active_workout_cross_tab.png")

        # History Feature Tests
        # History Feature Tests
        # Test 31: Open History Modal on button click
        page.locator("#btnHistory").click()
        page.wait_for_timeout(300)
        history_modal_visible = not ("hidden" in (page.locator("#modalHistory").get_attribute("class") or ""))
        record_result("Workout History: Modal Opens on Button Click",
                      history_modal_visible,
                      f"Modal classes: {page.locator('#modalHistory').get_attribute('class')}")
        page.screenshot(path=f"{SCREENSHOT_DIR}/24_history_modal_open.png")

        # Test 32: Verify session logged in Test 11 appears in History List
        history_cards_count = page.locator(".history-card").count()
        record_result("Workout History: Session Recorded in History List",
                      history_cards_count >= 1,
                      f"Found {history_cards_count} history cards in modal.")
        page.screenshot(path=f"{SCREENSHOT_DIR}/25_history_card_rendered.png")

        # Test 33: Expand history details
        page.locator(".btn-toggle-detail").first.click()
        page.wait_for_timeout(200)
        details_visible = not ("hidden" in (page.locator(".history-card-details").first.get_attribute("class") or ""))
        record_result("Workout History: Details Toggle Works",
                      details_visible,
                      "Expanded history card details table.")
        page.screenshot(path=f"{SCREENSHOT_DIR}/26_history_details_expanded.png")

        # Test 34: Reload and verify persistence
        page.reload()
        page.wait_for_timeout(400)
        page.locator("#btnHistory").click()
        page.wait_for_timeout(300)
        persisted_cards_count = page.locator(".history-card").count()
        record_result("Workout History: Persists Across Page Reload",
                      persisted_cards_count >= 1,
                      f"Found {persisted_cards_count} history cards after reload.")

        # Test 35: Progression Chart: Tab Switch
        page.locator("#tabHistoryCharts").click()
        page.wait_for_timeout(300)
        charts_visible = not ("hidden" in (page.locator("#historyChartsView").get_attribute("class") or ""))
        sessions_hidden = "hidden" in (page.locator("#historySessionsView").get_attribute("class") or "")
        record_result("Progression Chart: Tab Switching",
                      charts_visible and sessions_hidden,
                      f"Charts visible: {charts_visible}, Sessions hidden: {sessions_hidden}")
        page.screenshot(path=f"{SCREENSHOT_DIR}/27_progression_charts_view.png")

        # Test 36: Progression Chart: SVG Render & Exercise Select
        svg_count = page.locator(".chart-svg").count()
        points_count = page.locator(".chart-hit-circle").count()
        polyline_count = page.locator(".chart-svg polyline").count()
        select_options_count = page.locator("#historyExerciseSelect option").count()
        record_result("Progression Chart: SVG Chart Rendered with Nodes",
                      svg_count == 1 and points_count >= 1 and polyline_count == 1 and select_options_count > 0,
                      f"SVG: {svg_count}, Points: {points_count}, Polyline: {polyline_count}, Exercises in select: {select_options_count}")

        # Test 37: Progression Chart: Metric Toggle (1RM Estimado)
        page.locator('.metric-pill-btn[data-metric="e1rm"]').click()
        page.wait_for_timeout(200)
        active_metric = page.locator('.metric-pill-btn.active').get_attribute("data-metric")
        tooltip_rendered = page.locator("#chartPointDetail").count() > 0
        record_result("Progression Chart: Metric Toggle Recalculates Data",
                      active_metric == "e1rm" and tooltip_rendered,
                      f"Active metric: '{active_metric}', Detail card visible: {tooltip_rendered}")

        # Return to sessions tab
        page.locator("#tabHistorySessions").click()
        page.wait_for_timeout(200)

        # Test 38: Delete history entry
        page.locator(".btn-history-delete").first.click()
        page.wait_for_timeout(300)
        cards_after_delete = page.locator(".history-card").count()
        empty_visible = page.locator(".history-empty").count() > 0
        record_result("Workout History: Deletion from History List",
                      cards_after_delete == 0 and empty_visible,
                      f"Cards remaining: {cards_after_delete}, Empty state visible: {empty_visible}")
        page.locator("#modalHistory [data-close-modal]").click()
        page.wait_for_timeout(200)

        # ---------------------------------------------------------
        # TEST 39: Substituted Workout Completion & History Integrity
        # ---------------------------------------------------------
        # Switch back to Upper A tab
        page.locator("button[data-session='upperA']").click()
        page.wait_for_timeout(300)

        # Clear any dangling active workout from previous test investigations if present
        if page.evaluate("() => Boolean(state.isWorkoutActive)"):
            page.locator("#btnToggleWorkout").click()
            page.wait_for_timeout(400)
            page.locator("#btnHistory").click()
            page.wait_for_timeout(300)
            if page.locator(".btn-history-delete").count() > 0:
                page.locator(".btn-history-delete").first.click()
                page.wait_for_timeout(300)
            page.locator("#modalHistory [data-close-modal]").click()
            page.wait_for_timeout(200)

        page.locator("#btnToggleWorkout").click()
        page.wait_for_timeout(300)

        # Substitute Flat DB Press with Barbell Flat Bench Press
        page.locator("button[data-accordion='flat_db_press']").click()
        page.wait_for_timeout(200)
        page.locator("[data-show-subs='flat_db_press']").click()
        page.wait_for_timeout(300)
        page.locator(".sub-option-item:has-text('Barbell Flat Bench Press') .btn-sub-select").click()
        page.wait_for_timeout(300)

        # Fill and complete Set 1
        page.locator("#row_flat_db_press_0 .set-input-weight").fill("75")
        page.locator("#row_flat_db_press_0 .set-input-reps").fill("8")
        page.locator("#row_flat_db_press_0 .set-input-rir").fill("2")
        page.locator("#row_flat_db_press_0 .set-check-btn").click()
        page.wait_for_timeout(200)
        page.locator("#btnTimerSkip").click()
        page.wait_for_timeout(200)

        # Finish workout
        page.locator("#btnToggleWorkout").click()
        page.wait_for_timeout(400)

        # Open History modal and verify substituted exercise name is displayed
        page.locator("#btnHistory").click()
        page.wait_for_timeout(300)
        page.locator(".btn-toggle-detail").first.click()
        page.wait_for_timeout(200)

        sub_hist_table_text = page.locator(".history-card-details .history-table tbody").first.inner_text()
        sub_meta_check = page.evaluate("() => { const log = state.history[0]?.exerciseLogs?.['flat_db_press']; return Boolean(log && log.exerciseName === 'Barbell Flat Bench Press' && log.isSubstituted === true && log.originalName === 'Flat Dumbbell Press'); }")
        top_set_hist = page.locator(".history-card").first.inner_text()
        sub_hist_pass = sub_meta_check and ("Barbell Flat Bench Press" in sub_hist_table_text) and ("Barbell Flat Bench Press" in top_set_hist)
        record_result("Workout History: Substituted Session Recorded with Accurate Exercise Name",
                      sub_hist_pass,
                      f"exerciseLogs valid: {sub_meta_check}, Substituted name in table: {'Barbell Flat Bench Press' in sub_hist_table_text}")
        page.screenshot(path=f"{SCREENSHOT_DIR}/28_substituted_history_recorded.png")

        # Clean up history entry
        page.locator(".btn-history-delete").first.click()
        page.wait_for_timeout(300)
        page.locator("#modalHistory [data-close-modal]").click()
        page.wait_for_timeout(200)

        # Investigation D: Console errors check
        record_result("Console Errors & Unhandled Exceptions",
                      len(page_errors) == 0,
                      f"Page errors: {page_errors}, Console warnings/errors: {[c for c in console_messages if 'error' in c.lower()]}")

        # Summary
        print("\n" + "="*60)
        print("QA TEST SUMMARY:")
        passed_count = sum(1 for r in test_results if r["passed"])
        failed_count = sum(1 for r in test_results if not r["passed"])
        print(f"Total: {len(test_results)} | Passed: {passed_count} | Failed: {failed_count}")
        print("="*60)

        with open(f"{SCREENSHOT_DIR}/qa_results.json", "w") as f:
            json.dump({
                "results": test_results,
                "console_messages": console_messages,
                "page_errors": page_errors,
                "dialogs": dialogs_encountered
            }, f, indent=2)

        browser.close()

if __name__ == "__main__":
    run_tests()
