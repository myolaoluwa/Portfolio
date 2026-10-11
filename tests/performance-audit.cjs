/* eslint-disable @typescript-eslint/no-require-imports -- Local mocked-collector audit. */
const assert = require('node:assert/strict');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.BASE_URL || 'http://localhost:3000';

(async () => {
  const browser = await chromium.launch({ headless: true, ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) });
  try {
    for (const choice of [null, 'denied', 'granted']) {
      const context = await browser.newContext({ viewport: { width: 393, height: 740 }, reducedMotion: 'reduce' });
      await context.addInitScript(value => {
        if (value && localStorage.getItem('delightech.analytics-choice') === null)
          localStorage.setItem('delightech.analytics-choice', value);
      }, choice);
      const requests = [];
      // Never send test records to the actual provider.
      await context.route('**/api/send', async route => {
        requests.push(route.request().postDataJSON());
        await route.fulfill({ status: 200, contentType: 'application/json', body: '{}' });
      });
      const page = await context.newPage();
      await page.goto(base, { waitUntil: 'networkidle' });
      const configured = await page.getByRole('button', { name: /Analytics preferences|Allow analytics/ }).count() > 0;
      if (choice === null) {
        const decline = page.getByRole('button', { name: 'Decline', exact: true });
        if (await decline.isVisible()) await decline.click();
      }
      await page.locator('.cinema-skip').click();
      if (choice === 'granted' && configured) {
        await page.waitForFunction(() => document.querySelector('#work') !== null);
        // LCP finalises after the first trusted interaction, not by a fake
        // metric event. Allow asynchronous observer and collector callbacks.
        for (let attempt = 0; attempt < 100 && !requests.some(r => r.payload?.name === 'web_vital_lcp'); attempt++) {
          await new Promise(resolve => setTimeout(resolve, 50));
        }
        assert.equal(requests.filter(r => r.payload?.name === 'web_vital_lcp').length, 1);
        const sample = requests.find(r => r.payload.name === 'web_vital_lcp').payload;
        assert.equal(sample.url, '/');
        assert.ok(sample.data.value >= 0);
        assert.equal(sample.data.unit, 'ms');
        assert.equal(sample.data.scope, 'document');
        assert.deepEqual(Object.keys(sample.data).sort(), ['rating', 'scope', 'unit', 'value', 'viewport']);
        await page.getByRole('button', { name: 'Analytics preferences' }).click();
        await page.getByRole('button', { name: 'Turn analytics off' }).click();
        assert.equal(await page.evaluate(() => localStorage.getItem('delightech.analytics-choice')), 'denied');
        await page.waitForLoadState('networkidle');
        const count = requests.length;
        await page.reload({ waitUntil: 'networkidle' });
        await page.locator('.cinema-skip').click();
        assert.equal(requests.length, count, 'No collection after withdrawal');
        console.log('PASS real LCP callback, minimal mocked payload and withdrawal across reload');
      } else {
        assert.equal(requests.length, 0, 'No collection without consent/configuration');
        console.log(`PASS no collection: ${choice ?? 'no choice'}${configured ? '' : ' / unconfigured'}`);
      }
      await context.close();
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
