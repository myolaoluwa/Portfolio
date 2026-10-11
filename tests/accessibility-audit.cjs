/* eslint-disable @typescript-eslint/no-require-imports -- Standalone browser regression check. */
const assert = require('node:assert/strict');
const path = require('node:path');
const engine = process.env.BROWSER_ENGINE || 'chromium';
const browserType = require(process.env.PLAYWRIGHT_MODULE || 'playwright')[engine];
const base = process.env.BASE_URL || 'http://localhost:3000';
const axePath = process.env.AXE_SCRIPT || require.resolve('axe-core/axe.min.js');

(async () => {
  assert.ok(browserType, `Unknown browser engine: ${engine}`);
  const browser = await browserType.launch({ headless: true, ...(engine === 'chromium' && process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) });
  try {
    const xml = await (await fetch(`${base}/sitemap.xml`)).text();
    const routes = [...new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => new URL(match[1]).pathname))];
    assert.ok(routes.includes('/') && routes.includes('/privacy') && routes.length >= 14);
    for (const width of [393, 1440]) {
      const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
      await context.route('https://cloud.umami.is/**', route => route.abort());
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      for (const route of routes) {
        await page.goto(`${base}${route}`);
        // Full-page test navigation must not cancel the previous visit's RSC
        // prefetch. WebKit can surface those cancellations as access-control
        // page errors. This is a network-settlement check, not UI readiness.
        await page.waitForLoadState('networkidle');
        await page.locator('main').waitFor();
        assert.equal(await page.locator('h1').count(), 1, `Single page heading: ${route}`);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, `Overflow: ${route}`);
        // Inspect the real project colours, including cards far below the intro.
        // Deferred painting can leave axe's pixel-background sampling incomplete.
        // Force rendering only for this audit; never disable contrast rules or
        // change the production content-visibility optimisation.
        await page.addStyleTag({ content: '.featured-project { content-visibility: visible !important; }' });
        await page.addScriptTag({ path: path.resolve(axePath) });
        const violations = await page.evaluate(async () => (await window.axe.run(document, {
          runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] },
        })).violations.map(item => ({ id: item.id, nodes: item.nodes.map(node => ({ target: node.target, summary: node.failureSummary })) })));
        assert.deepEqual(violations.filter(item => item.id !== 'color-contrast'), [], `${engine} ${width}px ${route}: automated accessibility violations`);
        // WebKit's off-screen pixel sampling differs from Chromium/Firefox.
        // A reported contrast failure must pass the SAME rule when scrolled
        // into view; no rule or failed node is simply waived or excluded.
        for (const node of violations.find(item => item.id === 'color-contrast')?.nodes || []) {
          let target = page.locator(node.target.join(' '));
          const replacementProject = node.target.join(' ').match(/data-deferred-project="([^"]+)"/)?.[1];
          if (await target.count() === 0 && replacementProject) target = page.locator(`[data-deferred-project="${replacementProject}"]`);
          assert.equal(await target.count(), 1, `Contrast target disappeared before exposure: ${node.target}`);
          const project = await target.evaluate(element => element.closest('[data-deferred-project]')?.getAttribute('data-deferred-project'));
          await target.scrollIntoViewIfNeeded();
          await page.waitForTimeout(100);
          // A loading placeholder can be replaced by its actual dashboard
          // during this scroll. Validate the replacement, not an absent node.
          if (await target.count() === 0 && project) target = page.locator(`[data-deferred-project="${project}"]`);
          assert.equal(await target.count(), 1, `Contrast target disappeared: ${node.target}`);
          const visibleViolations = await target.evaluate(async element => (await window.axe.run(element, {
            runOnly: { type: 'rule', values: ['color-contrast'] },
          })).violations.map(item => ({ id: item.id, nodes: item.nodes.map(node => ({ target: node.target, summary: node.failureSummary })) })));
          assert.deepEqual(visibleViolations, [], `${engine} ${width}px ${route}: visible contrast failure ${node.target}`);
        }
        if (violations.length) console.log(`PASS ${engine} ${width}px ${route}: every off-screen contrast report revalidated in viewport`);
      }
      await page.goto(base);
      await page.waitForLoadState('networkidle');
      const decline = page.getByRole('button', { name: 'Decline', exact: true });
      if (await decline.isVisible()) await decline.click();
      // Keyboard activation, visible focus and a route past the optional intro.
      const skip = page.locator('.cinema-skip');
      await page.keyboard.press('Tab');
      await skip.focus();
      assert.equal(await skip.evaluate(element => element.matches(':focus-visible') && getComputedStyle(element).outlineStyle !== 'none'), true);
      await page.keyboard.press('Enter');
      await page.waitForFunction(() => location.hash === '#work');
      assert.equal(await page.locator('.contact-details button[disabled]').count(), 0, 'No unfinished contact actions');
      for (const film of await page.locator('.project-film').all()) {
        const trigger = film.locator('.project-film-card');
        await trigger.focus();
        await page.keyboard.press('Enter');
        const modal = film.locator('dialog[open]');
        await modal.waitFor();
        assert.equal(await modal.evaluate(element => element.contains(document.activeElement)), true);
        // Codec support differs between installed Chrome and CI Chromium.
        // Let native media controls finish initialising (or enter their error
        // state) before testing their stable tab sequence.
        await modal.locator('video').evaluate(video => new Promise((resolve, reject) => {
          const ready = () => { if (video.readyState >= 2 || video.error) finish(); };
          const timer = setTimeout(() => { cleanup(); reject(Error('Video controls did not settle')); }, 15000);
          const cleanup = () => { clearTimeout(timer); video.removeEventListener('loadeddata', ready); video.removeEventListener('error', ready); };
          const finish = () => { cleanup(); resolve(); };
          video.addEventListener('loadeddata', ready);
          video.addEventListener('error', ready);
          ready();
        }));
        for (let tab = 0; tab < 8; tab++) {
          await page.keyboard.press('Tab');
          assert.equal(await modal.evaluate(element => element.contains(document.activeElement)), true, `Modal retains keyboard focus: ${engine}, ${width}px, Tab ${tab + 1}, active=${await page.evaluate(() => document.activeElement?.outerHTML.slice(0,200))}`);
        }
        await modal.getByRole('button', { name: 'Close video preview' }).focus();
        await page.keyboard.press('Shift+Tab');
        assert.equal(await modal.locator('button[aria-controls]').evaluate(element => document.activeElement === element), true, 'Reverse tab wraps to sound control');
        await page.keyboard.press('Escape');
        await page.waitForFunction(() => !document.querySelector('dialog[open]') && document.body.style.overflow !== 'hidden');
        assert.equal(await trigger.evaluate(element => document.activeElement === element), true);
      }
      assert.deepEqual(errors, []);
      console.log(`PASS ${engine} ${width}px: ${routes.length} routes, axe A/AA, overflow, keyboard skip, video focus/escape`);
      await context.close();
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
