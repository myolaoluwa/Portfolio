/* eslint-disable @typescript-eslint/no-require-imports -- Standalone Node release check. */
const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const { setTimeout: delay } = require('node:timers/promises');
const port = process.env.AUDIT_PORT || '3107';
const base = process.env.BASE_URL || `http://127.0.0.1:${port}`;

(async () => {
  let server;
  let serverExited = false;
  let output = '';
  try {
    if (!process.env.BASE_URL) {
      server = spawn(process.execPath, [require.resolve('next/dist/bin/next'), 'start', '--port', port], { stdio: ['ignore', 'pipe', 'pipe'] });
      for (const stream of [server.stdout, server.stderr]) stream.on('data', chunk => { output = (output + chunk).slice(-6000); });
      server.on('exit', () => { serverExited = true; });
      let ready = false;
      for (let attempt = 0; attempt < 100; attempt++) {
        if (serverExited) throw Error(`Production server exited: ${output}`);
        try {
          const response = await fetch(base, { signal: AbortSignal.timeout(1000) });
          if (response.ok) { ready = true; break; }
        } catch { /* Server starting. */ }
        await delay(100);
      }
      assert.ok(ready, `Production server did not start: ${output}`);
    }
    const paths = ['/', '/privacy', '/work/elara', '/work/cashflow', '/work/oracle', '/work/nomi', '/services/business-websites', '/services/web-applications', '/services/mobile-apps', '/services/ongoing-improvements'];
    const titles = new Set();
    const descriptions = new Set();
    let canonicalOrigin;
    let indexable;
    for (const path of paths) {
      const response = await fetch(new URL(path, base));
      assert.equal(response.status, 200, path);
      const html = await response.text();
      const title = html.match(/<title>(.*?)<\/title>/)?.[1];
      const description = html.match(/name="description" content="([^"]+)"/)?.[1];
      assert.ok(title && description, `Missing title/description on ${path}`);
      assert.ok(!titles.has(title), `Duplicate title on ${path}`);
      assert.ok(!descriptions.has(description), `Duplicate description on ${path}`);
      titles.add(title); descriptions.add(description);
      const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1];
      assert.ok(canonical, `Missing canonical on ${path}`);
      const url = new URL(canonical);
      assert.equal(url.protocol, 'https:');
      canonicalOrigin ||= url.origin;
      assert.equal(url.origin, canonicalOrigin, `Mixed canonical origin on ${path}`);
      if (new URL(base).origin === canonicalOrigin) {
        assert.equal(new URL(response.url).origin, canonicalOrigin, `Hosting redirect disagrees with canonical origin on ${path}`);
      }
      assert.equal(url.pathname, path);
      const robots = html.match(/name="robots" content="([^"]+)"/)?.[1];
      assert.ok(robots, `Missing robots metadata on ${path}`);
      const pageIndexable = !robots.includes('noindex');
      if (indexable === undefined) indexable = pageIndexable;
      assert.equal(pageIndexable, indexable, `Mixed indexing policy on ${path}`);
      assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
      assert.equal(response.headers.get('x-frame-options'), 'DENY');
      assert.equal(response.headers.get('referrer-policy'), 'strict-origin-when-cross-origin');
      assert.match(response.headers.get('content-security-policy') || '', /frame-ancestors 'none'/);
      assert.equal(response.headers.get('x-powered-by'), null);
      const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map(match => JSON.parse(match[1]));
      const organization = schemas.find(item => item['@type'] === 'Organization');
      assert.equal(organization?.name, 'DelighTech');
      assert.equal(organization?.url, `${canonicalOrigin}/`);
      assert.equal(organization?.email, 'hello@delightech.net');
      for (const schema of schemas) {
        assert.equal(schema['@context'], 'https://schema.org');
        assert.equal(schema.aggregateRating, undefined);
        assert.equal(schema.address, undefined);
      }
      if (path.startsWith('/services/') || path.startsWith('/work/')) {
        const crumbs = schemas.find(item => item['@type'] === 'BreadcrumbList')?.itemListElement;
        assert.equal(crumbs?.length, 2);
        assert.equal(crumbs[0].position, 1);
        assert.equal(crumbs[0].item, `${canonicalOrigin}/`);
        assert.equal(crumbs[1].position, 2);
        assert.equal(crumbs[1].item, `${canonicalOrigin}${path}`);
      }
      if (path.startsWith('/services/')) {
        assert.ok(html.includes('Book a discovery call'));
        assert.ok(html.includes('mailto:hello@delightech.net'));
        assert.ok(html.includes('Important boundaries.'));
        assert.ok(html.includes('See the thinking in practice.'));
        assert.match(html, /href="(?:\/work\/(?:elara|cashflow)|\/)"/);
      }
      if (path === '/') {
        assert.ok(html.includes('Available for new projects'));
        assert.ok(html.includes('https://calendly.com/hello-delightech/30min'));
        assert.ok(html.includes('DelighTech designs and builds websites, web applications, and mobile apps for businesses'));
        assert.ok(html.includes('Explore our work'));
        assert.ok(html.includes('Studio leadership and team'));
        assert.ok(html.includes('CEO, DelighTech'));
      }
      if (path.startsWith('/work/')) {
        assert.ok(html.includes('Have a similar challenge?'));
        assert.ok(html.includes('https://calendly.com/hello-delightech/30min'));
        assert.ok(html.includes('mailto:hello@delightech.net'));
        assert.ok(html.includes('href="/#services"'));
        if (path === '/work/elara' || path === '/work/cashflow') {
          assert.ok(html.includes('The live product may require sign-in'));
        }
      }
      if (path === '/privacy') {
        assert.ok(html.includes('mailto:hello@delightech.net'));
        assert.ok(html.includes('US hosting region'));
        assert.ok(html.includes('six-month analytics data-retention period'));
        assert.ok(html.includes('https://calendly.com/legal/privacy-notice'));
        assert.ok(!html.includes('Local preview: privacy contact details are pending'));
        assert.ok(!html.includes('dedicated privacy contact email is being prepared'));
      }
      console.log(`PASS ${path}: status, metadata and response headers`);
    }
    const robotsResponse = await fetch(new URL('/robots.txt', base));
    assert.equal(robotsResponse.status, 200);
    const robots = await robotsResponse.text();
    assert.ok(robots.includes(indexable ? 'Allow: /' : 'Disallow: /'));
    assert.ok(robots.includes(`${canonicalOrigin}/sitemap.xml`));
    const sitemapResponse = await fetch(new URL('/sitemap.xml', base));
    assert.equal(sitemapResponse.status, 200);
    const sitemap = await sitemapResponse.text();
    const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
    assert.deepEqual(locations.sort(), paths.map(path => new URL(path, canonicalOrigin).href).sort());
    const missingResponse = await fetch(new URL('/not-a-real-page', base));
    assert.equal(missingResponse.status, 404);
    assert.match(await missingResponse.text(), /name="robots" content="noindex"/);
    console.log('PASS robots, sitemap and true 404 handling');
  } finally {
    if (server && !serverExited) {
      server.kill('SIGTERM');
      for (let attempt = 0; attempt < 30 && !serverExited; attempt++) await delay(100);
      if (!serverExited) server.kill('SIGKILL');
    }
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
