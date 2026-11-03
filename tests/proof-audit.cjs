/* eslint-disable @typescript-eslint/no-require-imports -- Optional local browser audit. */
const assert = require('node:assert/strict');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.BASE_URL || 'http://localhost:3000';

(async () => {
  const browser = await chromium.launch({ headless: true, ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) });
  try {
    for (const width of [320, 768, 1440]) {
      const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
      await page.route('**/api/send', route => route.abort());
      await page.addInitScript(() => localStorage.setItem('delightech.analytics-choice', 'denied'));
      for (const project of ['elara', 'cashflow', 'oracle', 'nomi']) {
        await page.goto(`${base}/work/${project}`);
        const proof = page.getByRole('complementary', { name: 'What you can inspect.' });
        await proof.scrollIntoViewIfNeeded();
        assert.match(await proof.innerText(), /Demonstrated functionality/);
        assert.match(await proof.innerText(), /sample data/);
        assert.match(await proof.innerText(), /not evidence of measured/);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
        for (const link of await proof.locator('a').all()) {
          const href = await link.getAttribute('href');
          assert.equal(await page.locator(href).count(), 1);
          await link.click({ trial: true });
        }
        if (project === 'cashflow') {
          assert.match(await proof.innerText(), /Available on Google Play/);
          const store = page.locator('a[href="https://play.google.com/store/apps/details?id=biz.cashflowapp.mobile"]');
          assert.equal(await store.count(), 1);
          await store.click({ trial: true });
        }
        if (process.env.AUDIT_SCREENSHOTS && project === 'cashflow') await proof.screenshot({ path: `${process.env.AUDIT_SCREENSHOTS}/project-proof-${width}.png` });
        console.log(`PASS ${project} evidence summary ${width}px: status, ownership, boundaries, working anchors`);
      }
      await page.close();
    }
    const page = await browser.newPage({ javaScriptEnabled: false });
    await page.goto(base);
    assert.match(await page.getByRole('complementary', { name: 'Selected work and ownership' }).innerText(), /now available on\s+Google Play/);
    assert.equal(await page.locator('a[href="https://play.google.com/store/apps/details?id=biz.cashflowapp.mobile"]').count(), 1);
    await page.goto(`${base}/work/cashflow`);
    assert.match(await page.getByRole('complementary', { name: 'What you can inspect.' }).innerText(), /DelighTech-owned product/);
    console.log('PASS project proof remains readable without JavaScript');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
