/* eslint-disable @typescript-eslint/no-require-imports -- Optional local browser audit. */
const assert = require('node:assert/strict');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.BASE_URL || 'http://localhost:3000';
(async () => {
  const browser = await chromium.launch({ headless: true, ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) });
  try {
    for (const width of [320, 390, 768, 1440]) {
      const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
      await page.route('https://cloud.umami.is/**', route => route.abort());
      await page.goto(`${base}/insights`);
      assert.equal(await page.locator('h1').count(), 1);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      assert.equal(await page.getByRole('link', { name: /Book a discovery call/ }).getAttribute('href'), 'https://calendly.com/hello-delightech/30min');
      const articlePaths = await page.locator('main article h3 a').evaluateAll(links => links.map(link => link.getAttribute('href')));
      assert.equal(articlePaths.length, 3);
      if (process.env.AXE_SCRIPT) {
        await page.addScriptTag({ path: process.env.AXE_SCRIPT });
        const issues = await page.evaluate(async () => (await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } })).violations.map(item => item.id));
        assert.deepEqual(issues, []);
      }
      if (width === 390 && process.env.AUDIT_SCREENSHOTS) await page.screenshot({ path: `${process.env.AUDIT_SCREENSHOTS}/insights-mobile.png`, fullPage: true });
      for (const articlePath of articlePaths) {
        await page.goto(`${base}${articlePath}`);
        assert.equal(await page.locator('h1').count(), 1);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, articlePath);
        const broken = await page.evaluate(() => [...document.querySelectorAll('a[href^="#"]')].filter(link => !document.getElementById(link.getAttribute('href').slice(1))).map(link => link.getAttribute('href')));
        assert.deepEqual(broken, []);
        await page.getByRole('navigation', { name: 'Article contents' }).locator('a').first().click();
        assert.equal(await page.getByRole('navigation', { name: 'Breadcrumb', exact: true }).locator('[aria-current="page"]').count(), 1);
        if (process.env.AXE_SCRIPT) {
          await page.addScriptTag({ path: process.env.AXE_SCRIPT });
          const issues = await page.evaluate(async () => (await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } })).violations.map(item => item.id));
          assert.deepEqual(issues, [], articlePath);
        }
        if (width === 390 && process.env.AUDIT_SCREENSHOTS) await page.screenshot({ path: `${process.env.AUDIT_SCREENSHOTS}/${articlePath.split('/').pop()}-mobile.png`, fullPage: true });
      }
      console.log(`PASS Insights hub + 3 articles ${width}px: layout, enquiry, contents, automated accessibility`);
      await page.close();
    }
    const page = await browser.newPage({ javaScriptEnabled: false });
    await page.goto(`${base}/insights`);
    assert.match(await page.locator('main').innerText(), /How to scope a web application/);
    await page.goto(`${base}/insights/how-to-scope-a-web-application`);
    assert.match(await page.locator('article').innerText(), /Bring a one-page brief to discovery/);
    console.log('PASS Insights readable without JavaScript');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
