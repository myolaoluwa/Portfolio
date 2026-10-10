/* eslint-disable @typescript-eslint/no-require-imports -- Optional local browser audit. */
const assert = require('node:assert/strict');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.BASE_URL || 'http://localhost:3000';
const slugs = ['business-websites', 'web-applications', 'mobile-apps', 'ongoing-improvements'];

(async () => {
  const browser = await chromium.launch({ headless: true, ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) });
  try {
    for (const width of [320, 390, 768, 1440]) {
      const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
      // Automated visits must never write real analytics records.
      await context.route('**/api/send', route => route.abort());
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      for (const slug of slugs) {
        await page.goto(`${base}/services/${slug}`);
        await page.locator('h1').waitFor();
        assert.equal(await page.locator('h1').count(), 1);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `${slug}: overflow at ${width}`);
        assert.equal(await page.getByRole('link', { name: /Book a discovery call/ }).getAttribute('href'), 'https://calendly.com/hello-delightech/30min');
        assert.equal(await page.getByRole('link', { name: /Email our team/ }).getAttribute('href'), 'mailto:hello@delightech.net');
        assert.equal(await page.locator('nav[aria-label="Other services"] a').count(), 3);
        assert.equal(await page.getByRole('navigation', { name: 'Breadcrumb', exact: true }).locator('[aria-current="page"]').count(), 1);
        const broken = await page.evaluate(() => [...document.querySelectorAll('a[href^="#"]')].filter(a => !document.getElementById(a.getAttribute('href').slice(1))).map(a => a.getAttribute('href')));
        assert.deepEqual(broken, []);
        await page.locator('details summary').first().click();
        assert.equal(await page.locator('details').first().getAttribute('open'), '');
        if (process.env.AXE_SCRIPT) {
          await page.addScriptTag({ path: process.env.AXE_SCRIPT });
          const violations = await page.evaluate(async () => (await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } })).violations.map(item => item.id));
          assert.deepEqual(violations, [], `${slug}: axe at ${width}`);
        }
        console.log(`PASS ${slug} ${width}px: layout, navigation, enquiry, FAQ${process.env.AXE_SCRIPT ? ', axe A/AA' : ''}`);
      }
      assert.deepEqual(errors, []);
      await context.close();
    }
    const page = await browser.newPage({ javaScriptEnabled: false });
    await page.goto(`${base}/services/web-applications`);
    assert.match(await page.locator('main').innerText(), /Custom web applications built around your business/);
    console.log('PASS readable service content without JavaScript');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
