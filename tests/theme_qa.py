"""Appearance regression checks. Run with: python3 tests/theme_qa.py"""
import functools
import http.server
from pathlib import Path
import threading

from playwright.sync_api import sync_playwright


def run_tests():
    root = Path(__file__).resolve().parent.parent
    handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(root))
    with http.server.ThreadingHTTPServer(('127.0.0.1', 0), handler) as server:
        threading.Thread(target=server.serve_forever, daemon=True).start()
        try:
            with sync_playwright() as p:
                browser = p.chromium.launch()
                context = browser.new_context(color_scheme='light')
                page = context.new_page()
                url = f'http://127.0.0.1:{server.server_port}'
                page.goto(url)
                page.wait_for_selector('.exercise-card')

                def scheme():
                    return page.evaluate('getComputedStyle(document.documentElement).colorScheme')

                assert scheme() == 'light'
                assert page.locator('body').evaluate('(el) => getComputedStyle(el).backgroundColor') == 'rgb(255, 255, 255)'
                assert page.locator('#themeSelect').input_value() == 'system'
                assert any(f in page.locator('h1').evaluate('(el) => getComputedStyle(el).fontFamily') for f in ['Geist', 'Inter', 'system-ui', '-apple-system', 'sans-serif'])
                assert page.locator('link[href*="fonts.googleapis.com"]').count() == 0

                page.emulate_media(color_scheme='dark')
                page.wait_for_function('getComputedStyle(document.documentElement).colorScheme === "dark"')
                page.locator('#btnSettings').click()
                page.locator('#themeSelect').select_option('light')
                assert scheme() == 'light'
                page.reload()
                page.wait_for_selector('.exercise-card')
                assert scheme() == 'light'
                assert page.locator('#themeSelect').input_value() == 'light'

                page.locator('#btnSettings').click()
                page.locator('#themeSelect').select_option('dark')
                assert scheme() == 'dark'
                assert page.locator('body').evaluate('(el) => getComputedStyle(el).backgroundColor') == 'rgb(1, 1, 2)'
                assert page.locator('.tab-btn.active').evaluate('(el) => getComputedStyle(el).backgroundColor') == 'rgb(94, 106, 210)'
                page.emulate_media(color_scheme='light')
                assert scheme() == 'dark'
                page.reload()
                page.wait_for_selector('.exercise-card')
                assert scheme() == 'dark'
                for width in [320, 360, 390, 768, 1280, 1920]:
                    page.set_viewport_size({'width': width, 'height': 844})
                    assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), width

                page.evaluate('navigator.serviceWorker.ready.then(() => true)')
                page.reload()
                page.wait_for_selector('.exercise-card')
                context.set_offline(True)
                page.reload()
                page.wait_for_selector('.exercise-card')
                assert scheme() == 'dark'
                context.set_offline(False)

                page.locator('#btnSettings').click()
                page.locator('#themeSelect').select_option('system')
                assert scheme() == 'light'
                page.evaluate("localStorage.setItem('hypertrophy_ddp_settings_v2', '{broken')")
                page.reload()
                page.wait_for_selector('.exercise-card')
                assert page.locator('#themeSelect').input_value() == 'system'
                page.locator('#btnSettings').click()
                page.evaluate("""() => {
                    Storage.prototype.setItem = () => {
                        throw new DOMException('Full', 'QuotaExceededError');
                    };
                }""")
                page.locator('#themeSelect').select_option('dark')
                assert scheme() == 'dark'
                assert 'Could not save' in page.locator('#themeStatus').inner_text()
                browser.close()
                print('PASS: fonts, system appearance, overrides, persistence, offline, '
                      'responsive layout, corrupt settings, and storage failure fallback')
        finally:
            server.shutdown()


if __name__ == '__main__':
    run_tests()
