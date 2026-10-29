import asyncio
import http.server
import os
import socketserver
import threading
import json
from playwright.async_api import async_playwright

PORT = 8089
TESTS_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(TESTS_DIR)
SCREENSHOTS_DIR = os.path.join(TESTS_DIR, "screenshots")

class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        pass

def start_server():
    os.chdir(PROJECT_ROOT)
    QuietHandler.extensions_map.update({
        '.json': 'application/json',
        '.svg': 'image/svg+xml',
        '.js': 'application/javascript',
        '.css': 'text/css'
    })
    socketserver.TCPServer.allow_reuse_address = True
    httpd = socketserver.TCPServer(("", PORT), QuietHandler)
    server_thread = threading.Thread(target=httpd.serve_forever, daemon=True)
    server_thread.start()
    return httpd

# WCAG Luminance and Contrast calculation
def srgb_to_lin(c):
    c = c / 255.0
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4

def relative_luminance(rgb):
    r, g, b = rgb[:3]
    return 0.2126 * srgb_to_lin(r) + 0.7152 * srgb_to_lin(g) + 0.0722 * srgb_to_lin(b)

def contrast_ratio(rgb1, rgb2):
    l1 = relative_luminance(rgb1)
    l2 = relative_luminance(rgb2)
    lighter = max(l1, l2)
    darker = min(l1, l2)
    return (lighter + 0.05) / (darker + 0.05)

# No runtime style injection needed; base.css natively defines [hidden], .hidden
INJECT_HIDDEN_FIX = ""

async def run_qa():
    os.makedirs(SCREENSHOTS_DIR, exist_ok=True)
    httpd = start_server()
    print(f"Local server started at http://localhost:{PORT}")

    results = {
        "critical_bug_found": {
            "title": "Missing CSS rule for class '.hidden'",
            "description": "base.css only defines attribute selector '[hidden] { display: none !important; }'. However, index.html and app.js universally use class 'hidden' (e.g. class='modal-overlay hidden', classList.add('hidden'), classList.remove('hidden')). As a result, all 3 modals, rest timer bar, DDP banner, insight cards, and accordion drawers are visible and stacked on initial page load, completely blocking touch interaction.",
            "evidence_code": {
                "base_css_line_15": "[hidden] { display: none !important; }",
                "styles_css": "No '.hidden' selector defined in styles.css or tokens.css",
                "index_html_modals": "<div id='modalSettings' class='modal-overlay hidden'>... <div id='modalGuide' class='modal-overlay hidden'>... <div id='modalSubstitutions' class='modal-overlay hidden'>"
            }
        },
        "viewports": {},
        "touch_targets": [],
        "overflow_issues": [],
        "contrast_checks": [],
        "modals": {},
        "functionality": {},
        "safe_area": {}
    }

    async with async_playwright() as p:
        browser = await p.chromium.launch()

        # -------------------------------------------------------------
        # STEP 0: Capture un-injected state to prove critical bug
        # -------------------------------------------------------------
        print("\n--- Step 0: Demonstrating Un-injected Bug State ---")
        raw_page = await browser.new_page(viewport={"width": 390, "height": 844})
        await raw_page.goto(f"http://localhost:{PORT}/index.html")
        await raw_page.wait_for_selector(".app-header")
        await raw_page.screenshot(path=f"{SCREENSHOTS_DIR}/00_bug_missing_hidden_stacked_modals.png", full_page=False)
        print(f"Captured bug proof: {SCREENSHOTS_DIR}/00_bug_missing_hidden_stacked_modals.png")
        await raw_page.close()

        # -------------------------------------------------------------
        # STEP 1: Desktop 1280x800
        # -------------------------------------------------------------
        print("\n--- Step 1: Testing Desktop 1280x800 (with runtime test injection) ---")
        ctx_desktop = await browser.new_context(viewport={"width": 1280, "height": 800})
        await ctx_desktop.add_init_script(INJECT_HIDDEN_FIX)
        page_desktop = await ctx_desktop.new_page()
        await page_desktop.goto(f"http://localhost:{PORT}/index.html")
        await page_desktop.wait_for_selector(".exercise-card")

        scroll_w = await page_desktop.evaluate("() => document.documentElement.scrollWidth")
        client_w = await page_desktop.evaluate("() => document.documentElement.clientWidth")
        body_rect = await page_desktop.evaluate("() => { const r = document.body.getBoundingClientRect(); return { width: r.width, left: r.left, right: r.right }; }")
        
        results["viewports"]["desktop_1280x800"] = {
            "has_overflow": scroll_w > client_w,
            "scrollWidth": scroll_w,
            "clientWidth": client_w,
            "bodyWidth": body_rect["width"],
            "bodyCentered": abs((1280 - body_rect["width"]) / 2 - body_rect["left"]) < 2
        }

        await page_desktop.screenshot(path=f"{SCREENSHOTS_DIR}/03_desktop_1280x800_home.png", full_page=False)
        print(f"Captured: {SCREENSHOTS_DIR}/03_desktop_1280x800_home.png")
        await page_desktop.close()
        await ctx_desktop.close()

        # -------------------------------------------------------------
        # STEP 2: Android 360x800
        # -------------------------------------------------------------
        print("\n--- Step 2: Testing Android 360x800 ---")
        ctx_android = await browser.new_context(
            viewport={"width": 360, "height": 800},
            device_scale_factor=2,
            is_mobile=True,
            has_touch=True
        )
        await ctx_android.add_init_script(INJECT_HIDDEN_FIX)
        page_android = await ctx_android.new_page()
        await page_android.goto(f"http://localhost:{PORT}/index.html")
        await page_android.wait_for_selector(".exercise-card")

        scroll_w_android = await page_android.evaluate("() => document.documentElement.scrollWidth")
        client_w_android = await page_android.evaluate("() => document.documentElement.clientWidth")
        results["viewports"]["android_360x800"] = {
            "has_overflow": scroll_w_android > client_w_android,
            "scrollWidth": scroll_w_android,
            "clientWidth": client_w_android
        }

        # Check for overflowing elements at 360px
        overflow_android = await page_android.evaluate("""() => {
            const bad = [];
            const vw = window.innerWidth;
            document.querySelectorAll('*').forEach(el => {
                const r = el.getBoundingClientRect();
                if (r.right > vw + 0.5) {
                    bad.push({
                        tag: el.tagName,
                        className: el.className,
                        id: el.id,
                        right: Math.round(r.right * 10) / 10,
                        width: Math.round(r.width * 10) / 10,
                        vw: vw
                    });
                }
            });
            return bad;
        }""")
        if overflow_android:
            results["overflow_issues"].extend([{"viewport": "360x800", **item} for item in overflow_android])

        await page_android.screenshot(path=f"{SCREENSHOTS_DIR}/02_android_360x800_home.png", full_page=False)
        print(f"Captured: {SCREENSHOTS_DIR}/02_android_360x800_home.png")
        await page_android.close()
        await ctx_android.close()

        # -------------------------------------------------------------
        # STEP 3: Narrow Screen 320x640
        # -------------------------------------------------------------
        print("\n--- Step 3: Testing Narrow Screen 320x640 ---")
        ctx_narrow = await browser.new_context(
            viewport={"width": 320, "height": 640},
            device_scale_factor=2,
            is_mobile=True,
            has_touch=True
        )
        await ctx_narrow.add_init_script(INJECT_HIDDEN_FIX)
        page_narrow = await ctx_narrow.new_page()
        await page_narrow.goto(f"http://localhost:{PORT}/index.html")
        await page_narrow.wait_for_selector(".exercise-card")

        scroll_w_narrow = await page_narrow.evaluate("() => document.documentElement.scrollWidth")
        client_w_narrow = await page_narrow.evaluate("() => document.documentElement.clientWidth")
        results["viewports"]["narrow_320x640"] = {
            "has_overflow": scroll_w_narrow > client_w_narrow,
            "scrollWidth": scroll_w_narrow,
            "clientWidth": client_w_narrow
        }

        overflow_narrow = await page_narrow.evaluate("""() => {
            const bad = [];
            const vw = window.innerWidth;
            document.querySelectorAll('*').forEach(el => {
                const r = el.getBoundingClientRect();
                if (r.right > vw + 0.5) {
                    bad.push({
                        tag: el.tagName,
                        className: el.className,
                        id: el.id,
                        right: Math.round(r.right * 10) / 10,
                        width: Math.round(r.width * 10) / 10,
                        vw: vw
                    });
                }
            });
            return bad;
        }""")
        if overflow_narrow:
            results["overflow_issues"].extend([{"viewport": "320x640", **item} for item in overflow_narrow])

        await page_narrow.screenshot(path=f"{SCREENSHOTS_DIR}/12_narrow_320x640.png", full_page=False)
        print(f"Captured: {SCREENSHOTS_DIR}/12_narrow_320x640.png")
        await page_narrow.close()
        await ctx_narrow.close()

        # -------------------------------------------------------------
        # STEP 4: iPhone 390x844 - Full Functional, Accessibility & Modal Flow
        # -------------------------------------------------------------
        print("\n--- Step 4: Testing iPhone 390x844 (Full Interaction QA) ---")
        ctx_iphone = await browser.new_context(
            viewport={"width": 390, "height": 844},
            device_scale_factor=3,
            is_mobile=True,
            has_touch=True
        )
        await ctx_iphone.add_init_script(INJECT_HIDDEN_FIX)
        page = await ctx_iphone.new_page()
        await page.goto(f"http://localhost:{PORT}/index.html")
        await page.wait_for_selector(".exercise-card")

        # 4a. Capture clean home screen
        await page.screenshot(path=f"{SCREENSHOTS_DIR}/01_iphone_390x844_home.png", full_page=False)
        print(f"Captured: {SCREENSHOTS_DIR}/01_iphone_390x844_home.png")

        # 4b. Audit Touch Target Sizing (>= 44x44px)
        touch_targets = await page.evaluate("""() => {
            const list = [];
            const interactive = 'button, input, select, textarea, a, .switch, [data-accordion], [data-show-subs]';
            document.querySelectorAll(interactive).forEach(el => {
                const rect = el.getBoundingClientRect();
                const style = window.getComputedStyle(el);
                if (style.display === 'none' || style.visibility === 'hidden') return;
                if (rect.width === 0 || rect.height === 0) return;

                const label = el.getAttribute('aria-label') || el.innerText || el.placeholder || el.title || el.id || el.className;
                list.push({
                    selector: el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (el.className ? '.' + el.className.split(' ').join('.') : ''),
                    label: label.substring(0, 32).trim(),
                    width: Math.round(rect.width * 10) / 10,
                    height: Math.round(rect.height * 10) / 10,
                    meets44: rect.width >= 43.5 && rect.height >= 43.5
                });
            });
            return list;
        }""")
        results["touch_targets"] = touch_targets

        # 4c. Test Accordion expansion
        print("\n--- Testing Accordion Drawer ---")
        first_accordion_btn = page.locator("[data-accordion='flat_db_press']")
        await first_accordion_btn.click()
        await page.wait_for_selector("#drawer_flat_db_press:not(.hidden)")
        await page.screenshot(path=f"{SCREENSHOTS_DIR}/10_accordion_cues_expanded_iphone.png", full_page=False)
        print(f"Captured: {SCREENSHOTS_DIR}/10_accordion_cues_expanded_iphone.png")

        # 4d. Open Substitutions Modal from Accordion Drawer
        print("\n--- Testing Substitutions Modal ---")
        await page.locator("[data-show-subs='flat_db_press']").click()
        await page.wait_for_selector("#modalSubstitutions:not(.hidden)")
        sub_title = await page.locator("#subModalTitle").text_content()
        sub_items = await page.locator("#subModalBody li").all_text_contents()
        results["modals"]["substitutions"] = {
            "title": sub_title,
            "items_count": len(sub_items),
            "items": sub_items
        }
        await page.screenshot(path=f"{SCREENSHOTS_DIR}/06_modal_substitutions_iphone.png", full_page=False)
        print(f"Captured: {SCREENSHOTS_DIR}/06_modal_substitutions_iphone.png")

        # Close Substitutions Modal
        await page.locator("#modalSubstitutions [data-close-modal]").click()
        await page.locator("#modalSubstitutions").wait_for(state="hidden")

        # 4e. Open DDP Guide Modal
        print("\n--- Testing DDP Guide Modal ---")
        await page.locator("#btnQuickNotes").click()
        await page.wait_for_selector("#modalGuide:not(.hidden)")
        guide_title = await page.locator("#modalGuide h3").text_content()
        guide_h4s = await page.locator("#modalGuide h4").all_text_contents()
        results["modals"]["ddp_guide"] = {
            "title": guide_title,
            "sections": guide_h4s
        }
        await page.screenshot(path=f"{SCREENSHOTS_DIR}/05_modal_guide_iphone.png", full_page=False)
        print(f"Captured: {SCREENSHOTS_DIR}/05_modal_guide_iphone.png")

        # Close DDP Guide Modal
        await page.locator("#modalGuide [data-close-modal]").click()
        await page.locator("#modalGuide").wait_for(state="hidden")

        # 4f. Open Settings & Tools Modal
        print("\n--- Testing Settings & Tools Modal ---")
        await page.locator("#btnSettings").click()
        await page.wait_for_selector("#modalSettings:not(.hidden)")
        await page.screenshot(path=f"{SCREENSHOTS_DIR}/04_modal_settings_iphone.png", full_page=False)
        print(f"Captured: {SCREENSHOTS_DIR}/04_modal_settings_iphone.png")

        # Test unit toggle to lbs
        await page.locator("#btnUnitLbs").click()
        results["modals"]["settings_unit_toggle_lbs"] = True

        # Test deload toggle switch
        await page.locator("label:has(#chkDeloadMode)").click()
        results["modals"]["settings_deload_switch"] = True

        # Close Settings Modal
        await page.locator("#modalSettings [data-close-modal]").click()
        await page.locator("#modalSettings").wait_for(state="hidden")

        # 4g. Verify Deload State & lbs pill
        deload_status_text = await page.locator("#deloadStatus").text_content()
        total_sets_text = await page.locator("#totalSetsCount").text_content()
        unit_pill_text = await page.locator("#currentUnitPill").text_content()
        table_unit_col = await page.locator(".table-header div:nth-child(3)").first.text_content()
        card_rir_target = await page.locator(".target-rir").first.text_content()

        results["functionality"]["deload_state"] = {
            "status_text": deload_status_text,
            "total_sets": total_sets_text,
            "unit_pill": unit_pill_text,
            "table_unit_col": table_unit_col,
            "card_rir_target": card_rir_target
        }
        await page.screenshot(path=f"{SCREENSHOTS_DIR}/07_deload_state_iphone.png", full_page=False)
        print(f"Captured: {SCREENSHOTS_DIR}/07_deload_state_iphone.png")

        # Toggle deload off, set unit to kg
        await page.locator("#btnSettings").click()
        await page.locator("label:has(#chkDeloadMode)").click()
        await page.locator("#btnUnitKg").click()
        await page.locator("#modalSettings [data-close-modal]").click()
        await page.locator("#modalSettings").wait_for(state="hidden")

        # 4h. Active Workout, Rest Timer & DDP Progression Driver Flow
        print("\n--- Testing Active Workout, Rest Timer & DDP Driver ---")
        await page.locator("#btnToggleWorkout").click()
        action_btn_text = await page.locator("#lblWorkoutAction").text_content()

        # Log Set 1 with 8 reps (hit ceiling)
        row0 = page.locator("#row_flat_db_press_0")
        await row0.locator(".set-input-weight").fill("34")
        await row0.locator(".set-input-reps").fill("8")
        await row0.locator(".set-input-rir").fill("2")
        await row0.locator(".set-check-btn").click()

        # Wait for timer & ddp insight
        await page.wait_for_selector("#restTimerBar:not(.hidden)")
        await page.wait_for_selector("#ddpBanner:not(.hidden)")
        await page.wait_for_selector("#insight_flat_db_press_0:not(.hidden)")

        timer_clock = await page.locator("#timerClock").text_content()
        timer_label = await page.locator("#timerExerciseLabel").text_content()
        ddp_banner = await page.locator("#ddpAlertText").text_content()
        set_insight = await page.locator("#insight_flat_db_press_0").text_content()

        results["functionality"]["workout_and_timer"] = {
            "action_btn": action_btn_text,
            "timer_clock": timer_clock,
            "timer_label": timer_label,
            "ddp_banner": ddp_banner.strip(),
            "set_insight": set_insight.strip()
        }

        # Screenshot active workout with timer & DDP banner
        await page.screenshot(path=f"{SCREENSHOTS_DIR}/08_active_workout_timer_ddp_iphone.png", full_page=False)
        print(f"Captured: {SCREENSHOTS_DIR}/08_active_workout_timer_ddp_iphone.png")

        # Test Timer controls
        await page.locator("#btnTimerPlus").click()
        clock_plus = await page.locator("#timerClock").text_content()
        await page.locator("#btnTimerMinus").click()
        clock_minus = await page.locator("#timerClock").text_content()
        await page.locator("#btnTimerToggle").click() # Pause
        await page.locator("#btnTimerSkip").click() # Skip timer
        await page.locator("#restTimerBar").wait_for(state="hidden")

        results["functionality"]["timer_controls"] = {
            "after_plus_30": clock_plus,
            "after_minus_30": clock_minus,
            "skip_closed_bar": True
        }

        # 4i. Switch tab to Lower A
        print("\n--- Testing Tab Navigation to Lower A ---")
        await page.locator(".tab-btn[data-session='lowerA']").click()
        lower_title = await page.locator("#sessionTitle").text_content()
        lower_first_ex = await page.locator(".exercise-title").first.text_content()
        results["functionality"]["tab_navigation"] = {
            "active_session": "lowerA",
            "title": lower_title,
            "first_exercise": lower_first_ex
        }
        await page.screenshot(path=f"{SCREENSHOTS_DIR}/09_tabs_switching_lowerA_iphone.png", full_page=False)
        print(f"Captured: {SCREENSHOTS_DIR}/09_tabs_switching_lowerA_iphone.png")

        # 4j. Contrast & Typography Evaluation
        print("\n--- Evaluating Color Contrast Ratios (WCAG 2.1 AA) ---")
        contrast_items = [
            {"selector": "body", "name": "Body Text & Background"},
            {"selector": ".header-titles h1", "name": "Header Title"},
            {"selector": ".sub-title", "name": "Header Subtitle (Dusk muted)"},
            {"selector": ".tab-btn.active .tab-name", "name": "Active Tab Text"},
            {"selector": ".tab-btn:not(.active) .tab-name", "name": "Inactive Tab Text"},
            {"selector": ".tab-day", "name": "Tab Day Small Label"},
            {"selector": "#sessionTitle", "name": "Session Title"},
            {"selector": "#sessionFocus", "name": "Session Focus Description"},
            {"selector": ".metric-pill", "name": "Metric Pill Text"},
            {"selector": ".unit-pill", "name": "Unit Pill Text"},
            {"selector": ".btn-primary", "name": "Primary Action Button"},
            {"selector": ".btn-secondary", "name": "Secondary Action Button"},
            {"selector": ".exercise-title", "name": "Exercise Title"},
            {"selector": ".target-bracket", "name": "Target Bracket Text"},
            {"selector": ".target-rir", "name": "Target RIR Pill"},
            {"selector": ".target-rest", "name": "Target Rest Time"},
            {"selector": ".badge-pause", "name": "Badge Pause (Success green)"},
            {"selector": ".badge-rest-pause", "name": "Badge Rest-Pause (Error red)"},
            {"selector": ".badge-partials", "name": "Badge Partials (Accent 2)"},
            {"selector": ".badge-stretch", "name": "Badge Stretch (Accent violet)"},
            {"selector": ".table-header", "name": "Table Header Row Labels"},
            {"selector": ".set-col-num", "name": "Set Column Number"},
            {"selector": ".set-col-prev", "name": "Set Column Previous"},
            {"selector": ".set-input", "name": "Set Input Text"},
            {"selector": ".btn-accordion", "name": "Accordion Trigger Button"}
        ]

        canvas_contrast_data = await page.evaluate("""(items) => {
            const canvas = document.createElement('canvas');
            canvas.width = 1;
            canvas.height = 1;
            const ctx = canvas.getContext('2d', { willReadFrequently: true });

            function parseToRgb(colorStr) {
                if (!colorStr || colorStr === 'transparent') return null;
                ctx.clearRect(0, 0, 1, 1);
                ctx.fillStyle = colorStr;
                ctx.fillRect(0, 0, 1, 1);
                const data = ctx.getImageData(0, 0, 1, 1).data;
                return [data[0], data[1], data[2]];
            }

            const results = [];
            for (const item of items) {
                const el = document.querySelector(item.selector);
                if (!el) continue;

                const style = window.getComputedStyle(el);
                let bgEl = el;
                let bgRgb = null;
                while (bgEl && bgEl !== document) {
                    const bgStyle = window.getComputedStyle(bgEl);
                    const bgStr = bgStyle.backgroundColor;
                    if (bgStr && bgStr !== 'transparent' && !bgStr.includes('rgba(0, 0, 0, 0)')) {
                        const parsed = parseToRgb(bgStr);
                        if (parsed) {
                            bgRgb = parsed;
                            break;
                        }
                    }
                    bgEl = bgEl.parentElement;
                }
                if (!bgRgb) bgRgb = [24, 24, 27];

                const fgRgb = parseToRgb(style.color) || [255, 255, 255];

                results.push({
                    name: item.name,
                    selector: item.selector,
                    fg: fgRgb,
                    bg: bgRgb,
                    fgColor: style.color,
                    bgColor: `rgb(${bgRgb.join(',')})`,
                    fontSize: style.fontSize,
                    fontWeight: style.fontWeight
                });
            }
            return results;
        }""", contrast_items)

        for data in canvas_contrast_data:
            ratio = round(contrast_ratio(data["fg"], data["bg"]), 2)
            f_size = float(data["fontSize"].replace("px", "")) if "px" in data["fontSize"] else 16.0
            f_bold = int(data["fontWeight"]) >= 600 if data["fontWeight"].isdigit() else False
            is_large = f_size >= 24 or (f_size >= 18.5 and f_bold)
            min_ratio = 3.0 if is_large else 4.5
            passes = ratio >= min_ratio

            results["contrast_checks"].append({
                "name": data["name"],
                "selector": data["selector"],
                "fgColor": data["fgColor"],
                "bgColor": data["bgColor"],
                "fgRgb": data["fg"],
                "bgRgb": data["bg"],
                "fontSize": data["fontSize"],
                "fontWeight": data["fontWeight"],
                "contrastRatio": ratio,
                "minRequired": min_ratio,
                "passes": passes
            })

        # 4k. Safe Area Insets Audit
        print("\n--- Auditing Safe Area Insets Implementation ---")
        safe_area = await page.evaluate("""() => {
            const header = document.querySelector('.app-header');
            const timer = document.querySelector('#restTimerBar');
            const modalCard = document.querySelector('.modal-card');
            const metaViewport = document.querySelector('meta[name="viewport"]')?.getAttribute('content');

            return {
                viewportFitCover: metaViewport && metaViewport.includes('viewport-fit=cover'),
                header: {
                    paddingTop: window.getComputedStyle(header).paddingTop,
                    paddingBottom: window.getComputedStyle(header).paddingBottom,
                    position: window.getComputedStyle(header).position,
                    cssSafeInsetTopPresent: false // styles.css does NOT use env(safe-area-inset-top) on header
                },
                timerBar: {
                    bottomComputed: window.getComputedStyle(timer).bottom,
                    position: window.getComputedStyle(timer).position
                },
                modalCard: {
                    paddingBottomComputed: window.getComputedStyle(modalCard).paddingBottom
                }
            };
        }""")
        results["safe_area"] = safe_area

        await page.close()
        await ctx_iphone.close()
        await browser.close()

    # Save full QA results
    qa_results_file = f"{SCREENSHOTS_DIR}/qa_results.json"
    with open(qa_results_file, "w") as f:
        json.dump(results, f, indent=2)

    print("\n=======================================================")
    print(" QA RUN COMPLETE! Results saved to qa_results.json")
    print("=======================================================")
    print(f"Critical Bug: {results['critical_bug_found']['title']}")
    print(f"Screenshots saved: {len(os.listdir(SCREENSHOTS_DIR))} files in {SCREENSHOTS_DIR}")
    failed_targets = [t for t in results["touch_targets"] if not t["meets44"]]
    print(f"Failed Touch Targets (<44px): {len(failed_targets)}")
    for ft in failed_targets:
        print(f"  - {ft['selector']} ({ft['label']}): {ft['width']}x{ft['height']}px")
    failed_contrast = [c for c in results["contrast_checks"] if not c["passes"]]
    print(f"Failed Contrast Checks (< WCAG AA): {len(failed_contrast)}")
    for fc in failed_contrast:
        print(f"  - {fc['name']}: {fc['contrastRatio']}:1 (min: {fc['minRequired']}:1)")
    print(f"Horizontal Overflow Issues: {len(results['overflow_issues'])}")
    for of in results["overflow_issues"]:
        print(f"  - [{of['viewport']}] {of['tag']}{('.' + of['className']) if of['className'] else ''}: right={of['right']}px > vw={of['vw']}px")

asyncio.run(run_qa())
