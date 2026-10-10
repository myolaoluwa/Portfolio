/* eslint-disable @typescript-eslint/no-require-imports -- Optional local browser audit. */
const assert = require('node:assert/strict');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.BASE_URL || 'http://localhost:3000';

(async () => {
  const browser = await chromium.launch({ headless: true, ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) });
  try {
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
    await context.route('https://cloud.umami.is/**', route => route.abort());
    await context.route('**/api/send', route => route.abort());
    await context.route('**/*-showcase.mp4', route => route.abort());
    await context.addInitScript(() => { window.IntersectionObserver = undefined; });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(base);
    await page.locator('#services').waitFor();
    await page.locator('[data-deferred-project="elara"] figure').waitFor({ state: 'attached' });
    console.log('PASS interface previews without IntersectionObserver');
    for (const film of await page.locator('.project-film').all()) {
      const trigger = film.locator('.project-film-card');
      await trigger.hover();
      assert.equal(await film.locator('.project-film-card > video').getAttribute('src'), null, 'Reduced motion must not start hover video');
      await trigger.click();
      await film.locator('dialog[open]').waitFor();
      await film.getByRole('status').filter({ hasText: 'The video could not load' }).waitFor();
      await film.getByRole('button', { name: 'Close video preview' }).click();
      await page.waitForFunction(() => !document.querySelector('dialog[open]') && document.body.style.overflow !== 'hidden');
      assert.equal(await trigger.evaluate(button => document.activeElement === button), true);
    }
    console.log('PASS reduced-motion hover, announced media errors, close/focus/scroll restoration');
    // CSS zoom exercises enlarged-content reflow; it is not a substitute for
    // browser zoom or a physical-device accessibility review.
    for (const route of ['/', '/services/web-applications', '/work/elara', '/privacy']) {
      await page.goto(`${base}${route}`);
      await page.locator('main').waitFor();
      await page.evaluate(() => { document.documentElement.style.zoom = '2'; });
      assert.equal(await page.evaluate(() => document.documentElement.getBoundingClientRect().width <= innerWidth + 1 && document.body.scrollWidth <= document.body.clientWidth + 1), true, `Enlarged content overflow: ${route}`);
      console.log(`PASS 200% CSS enlarged-content reflow ${route}`);
    }
    assert.deepEqual(errors, []);
    await context.close();
    const staticPage = await browser.newPage({ javaScriptEnabled: false });
    await staticPage.goto(base);
    assert.ok(await staticPage.locator('#services').innerText());
    assert.match(await staticPage.locator('#engagement').innerText(), /Scope & proposal/);
    await staticPage.locator('#engagement-faq summary').first().click();
    assert.equal(await staticPage.locator('#engagement-faq details').first().getAttribute('open'), '');
    console.log('PASS homepage service/process content and native FAQ without JavaScript');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
