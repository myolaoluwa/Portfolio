/* eslint-disable @typescript-eslint/no-require-imports -- Optional local browser audit. */
const assert = require('node:assert/strict');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.BASE_URL || 'http://localhost:3000';

(async () => {
  const browser = await chromium.launch({ headless: true, ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) });
  try {
    for (const width of [320, 390, 430, 700, 768, 1024, 1440]) {
      const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
      await page.route('https://cloud.umami.is/**', route => route.abort());
      await page.route('**/api/send', route => route.abort());
      for (const route of ['/', '/work/cashflow']) {
        await page.goto(`${base}${route}`);
        const figure = page.locator('figure[aria-label="CASHFLOW source-based dashboard preview with sample data"]');
        if (route === '/') {
          await page.locator('.cashflow-project').scrollIntoViewIfNeeded();
        }
        await figure.waitFor();
        const layout = await figure.evaluate(element => {
          const sidebar = element.querySelector('aside');
          const brand = sidebar.querySelector('strong');
          const rect = node => node.getBoundingClientRect();
          const labels = [...sidebar.querySelectorAll('div > div > span')].filter(node => node.previousElementSibling?.tagName.toLowerCase() === 'svg');
          return {
            visible: getComputedStyle(sidebar).display !== 'none',
            sidebarRight: rect(sidebar).right,
            brandRight: rect(brand).right,
            menuSizes: labels.map(node => parseFloat(getComputedStyle(node).fontSize)),
            clippedLabels: labels.filter(node => node.scrollWidth > node.clientWidth + 1).map(node => node.textContent),
            overflow: document.documentElement.scrollWidth > innerWidth,
          };
        });
        assert.equal(layout.overflow, false, `${route}: page overflow at ${width}`);
        if (layout.visible) {
          assert.ok(layout.brandRight < layout.sidebarRight, `${route}: CASHFLOW wordmark clips at ${width}`);
          assert.ok(layout.menuSizes.length > 0);
          assert.ok(layout.menuSizes.every(size => size >= 11), `${route}: tiny menu at ${width}`);
          assert.deepEqual(layout.clippedLabels, []);
        }
        if (process.env.AUDIT_SCREENSHOTS && width === 1024) await figure.screenshot({ path: `${process.env.AUDIT_SCREENSHOTS}/cashflow-${route === '/' ? 'home' : 'story'}.png` });
        console.log(`PASS ${route} ${width}px: full wordmark, readable menu, no overflow`);
      }
      await page.close();
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
