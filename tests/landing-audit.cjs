/* eslint-disable @typescript-eslint/no-require-imports -- Standalone CommonJS browser audit with an optional external Playwright installation. */
// Run with PLAYWRIGHT_MODULE pointing to an installed Playwright package.
// BASE_URL defaults to the local development server. Never sends analytics.
const assert = require('node:assert/strict');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.BASE_URL || 'http://localhost:3000';

(async () => {
  const browser = await chromium.launch({
    headless: true,
    ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}),
  });
  try {
    for (const [width, height] of [[320,568],[375,667],[390,844],[430,932],[700,900],[768,1024],[1024,768],[1440,900],[1920,1080],[844,390],[667,375]]) {
      const context = await browser.newContext({ viewport: { width, height }, reducedMotion: 'reduce' });
      await context.route('https://cloud.umami.is/**', route => route.abort());
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(base);
      await page.getByRole('heading', { name: /Good software begins/ }).waitFor();
      const decline = page.getByRole('button', { name: 'Decline', exact: true });
      if (await decline.isVisible()) await decline.click();
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `Page overflow at ${width}`);
      assert.equal(await page.locator('#work .featured-project').count(), 5);
      assert.equal(await page.locator('.contact-details a').getAttribute('href'), 'mailto:hello@delightech.net');

      for (let chapter = 0; chapter < 5; chapter++) {
        // Hidden chapter rail on compact landscape: use the visible next button.
        if (width <= 700 && height <= 500) {
          if (chapter > 0) await page.locator('.cinema-bottomline button').click();
        } else await page.locator('.cinema-rail-steps button').nth(chapter).click();
        await page.waitForTimeout(100);
        const layout = await page.evaluate(() => {
          const rect = selector => document.querySelector(selector).getBoundingClientRect().toJSON();
          return { copy: rect('.cinema-copy'), bottom: rect('.cinema-bottomline'), phone: rect('.cinema-device-wrap'), header: rect('.site-header'), current: document.querySelectorAll('.cinema-rail-steps [aria-current="step"]').length };
        });
        assert.equal(layout.current, 1);
        assert.ok(layout.copy.top >= layout.header.bottom - 1, `Hero under header: ${width}, chapter ${chapter}`);
        assert.ok(layout.copy.bottom <= layout.bottom.top + 1, `Hero overlaps bottom control: ${width}, chapter ${chapter}`);
        assert.ok(layout.bottom.bottom <= height + 1, `Hero controls clipped: ${width}, chapter ${chapter}`);
        assert.ok(layout.copy.right <= width, `Hero overflows: ${width}, chapter ${chapter}`);
      }

      if (width <= 700) {
        const toggle = page.locator('.menu-toggle');
        await toggle.click();
        assert.equal(await toggle.getAttribute('aria-expanded'), 'true');
        await page.keyboard.press('Escape');
        assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
        await toggle.click();
        await page.locator('.main-nav a[href="#services"]').click();
        assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
      }

      for (const section of ['work','services','approach','capabilities','engagement','contact']) {
        await page.locator(`#${section}`).scrollIntoViewIfNeeded();
        await page.waitForTimeout(100);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `Overflow in ${section} at ${width}`);
      }
      for (const details of await page.locator('.interface-details').all()) {
        await details.locator('summary').click();
      }
      for (const film of await page.locator('.project-film').all()) {
        await film.locator('.project-film-card').click();
        await film.locator('dialog[open]').waitFor();
        assert.equal(await film.locator('dialog video').evaluate(video => video.muted), false);
        await page.keyboard.press('Escape');
        await page.waitForTimeout(100);
        assert.equal(await film.locator('dialog').evaluate(dialog => dialog.open), false);
        assert.notEqual(await page.evaluate(() => document.body.style.overflow), 'hidden');
      }
      await page.locator('#engagement-faq summary').first().click();
      assert.equal(await page.locator('#engagement-faq details').first().getAttribute('open'), '');
      const brokenAnchors = await page.evaluate(() => [...document.querySelectorAll('a[href^="#"]')].filter(link => !document.getElementById(link.getAttribute('href').slice(1))).map(link => link.getAttribute('href')));
      assert.deepEqual(brokenAnchors, []);
      assert.deepEqual(errors, [], `Browser errors at ${width}`);
      if (process.env.AUDIT_SCREENSHOTS) {
        await page.screenshot({ path: `${process.env.AUDIT_SCREENSHOTS}/landing-${width}.png`, fullPage: true });
      }
      console.log(`PASS ${width}×${height}: chapters, layout, navigation, sections, video, FAQ, anchors`);
      await context.close();
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
