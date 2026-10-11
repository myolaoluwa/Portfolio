/* eslint-disable @typescript-eslint/no-require-imports -- Optional local browser audit. */
const assert = require('node:assert/strict');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.BASE_URL || 'http://localhost:3000';
(async () => {
  const browser = await chromium.launch({ headless: true, ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) });
  try {
    const page = await browser.newPage({ viewport: { width: 393, height: 740 }, reducedMotion: 'reduce', isMobile: true, hasTouch: true });
    await page.route('https://cloud.umami.is/**', route => route.abort());
    const requests = [];
    page.on('request', request => requests.push(decodeURIComponent(request.url())));
    await page.goto(base);
    await page.getByRole('heading', { name: /Good software begins/ }).waitFor();
    const decline = page.getByRole('button', { name: 'Decline', exact: true });
    if (await decline.isVisible()) await decline.click();
    assert.equal(await page.locator('.cinema-studio img').count(), 0);
    assert.equal(requests.some(url => /myolaoluwa-studio|\.mp4/.test(url)), false, 'No hidden portrait/video transfers at first paint');
    assert.equal(requests.some(url => /\/media\/(elara|nomi)-poster\.jpg$/.test(url)), false, 'Closed video dialogs do not fetch full-size posters');
    const hero = page.locator('.cinema-opening-image');
    assert.match(await hero.getAttribute('src'), /q=60/);
    const headlineFonts = await page.evaluate(() => [...document.styleSheets]
      .flatMap(sheet => [...sheet.cssRules])
      .filter(rule => rule.type === CSSRule.FONT_FACE_RULE)
      .map(rule => ({ family: rule.style.fontFamily, style: rule.style.fontStyle, display: rule.style.fontDisplay }))
      .filter(font => font.family.includes('Space Grotesk') || (font.family.includes('Instrument Serif') && font.style === 'italic'))
      .filter(font => !font.family.includes('Fallback')));
    assert.ok(headlineFonts.length > 0, 'Headline fonts are present');
    assert.ok(headlineFonts.every(font => font.display === 'optional'), 'Slow first visits must not wait for late headline font swaps');
    assert.equal(await page.locator('head link[rel="preload"][as="font"]').count(), 2, 'Only signature headline fonts are preloaded');
    const mobileTypography = await page.evaluate(() => {
      const root = getComputedStyle(document.documentElement);
      return [root.getPropertyValue('--sans'), root.getPropertyValue('--mono')];
    });
    assert.match(mobileTypography[0], /system-ui/);
    assert.match(mobileTypography[1], /ui-monospace/);
    for (const action of await page.locator('.cinema-opening-actions a, .cinema-opening-actions button').all()) await action.click({ trial: true });
    if (process.env.AXE_SCRIPT) {
      await page.addScriptTag({ path: process.env.AXE_SCRIPT });
      const issues = await page.evaluate(async () => (await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } })).violations.map(issue => issue.id));
      assert.deepEqual(issues, [], 'Automated mobile accessibility checks');
    }
    if (process.env.AUDIT_SCREENSHOTS) await page.screenshot({ path: `${process.env.AUDIT_SCREENSHOTS}/mobile-opening-fixed.png` });

    await page.evaluate(() => {
      const track = document.getElementById('cinematic-intro');
      window.scrollTo(0, track.getBoundingClientRect().top + scrollY + (track.offsetHeight - innerHeight) * .05);
    });
    await page.waitForFunction(() => document.querySelector('.cinema-studio img')?.naturalWidth > 0);
    await page.getByRole('heading', { name: /I’m Olaoluwa/ }).waitFor();
    if (process.env.AUDIT_SCREENSHOTS) await page.screenshot({ path: `${process.env.AUDIT_SCREENSHOTS}/mobile-portrait-fixed.png` });
    await page.locator('.cinema-rail-steps button').nth(1).click();
    await page.locator('[data-mobile-project="oracle"]').waitFor();
    assert.equal(requests.some(url => /\.mp4/.test(url)), false);
    if (process.env.AUDIT_SCREENSHOTS) await page.screenshot({ path: `${process.env.AUDIT_SCREENSHOTS}/mobile-project-fixed.png` });
    for (const [width, height] of [[320, 568], [393, 740]]) {
      const fallback = await browser.newPage({ viewport: { width, height }, reducedMotion: 'reduce', isMobile: true });
      await fallback.route('**/*', route => route.request().resourceType() === 'font' || route.request().url().startsWith('https://cloud.umami.is/') ? route.abort() : route.continue());
      await fallback.goto(base);
      await fallback.getByRole('heading', { name: /Good software begins/ }).waitFor();
      const declineFallback = fallback.getByRole('button', { name: 'Decline', exact: true });
      if (await declineFallback.isVisible()) await declineFallback.click();
      for (const action of await fallback.locator('.cinema-opening-actions a, .cinema-opening-actions button').all()) await action.click({ trial: true });
      assert.ok(await fallback.evaluate(() => document.querySelector('.cinema-copy').getBoundingClientRect().bottom <= document.querySelector('.cinema-bottomline').getBoundingClientRect().top), `Font fallback fits ${width}×${height}`);
      await fallback.close();
    }
    console.log('PASS mobile opening hit targets, deferred portrait, preserved project phones and no unsolicited video transfers');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
