import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';

const origin = 'https://delightech.net';
const assets = [
  ['/delightech-logo.png', 'image/png'],
  ['/media/chapter-0.webp', 'image/webp'],
  ['/media/elara-showcase.mp4', 'video/mp4'],
  ['/media/nomi-showcase.mp4', 'video/mp4'],
  ['/media/elara-captions.en.vtt', 'text/vtt'],
];

// Read-only HTTP checks: no browser scripts, analytics, enquiries or bookings.
export async function checkOperations({ fetchImpl = fetch, log = console.log, retryDelay = 1000 } = {}) {
  const request = async (url, method = 'GET') => {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const response = await fetchImpl(url, {
          method, redirect: 'manual', signal: AbortSignal.timeout(12000),
          headers: { 'User-Agent': 'DelighTech-Operational-Check/1.0' },
        });
        if (attempt === 0 && (response.status === 429 || response.status >= 500)) {
          await response.body?.cancel();
          await new Promise(resolve => setTimeout(resolve, retryDelay));
          continue;
        }
        return response;
      } catch (error) {
        if (attempt) throw error;
        await new Promise(resolve => setTimeout(resolve, retryDelay));
      }
    }
  };

  const sitemapResponse = await request(`${origin}/sitemap.xml`);
  assert.equal(sitemapResponse.status, 200, 'Sitemap must serve directly');
  assert.match(sitemapResponse.headers.get('content-type') || '', /xml/);
  const sitemap = await sitemapResponse.text();
  const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
  assert.ok(locations.length >= 10 && locations.length <= 50, 'Unexpected sitemap size; review route coverage');
  assert.equal(new Set(locations).size, locations.length, 'Duplicate sitemap URLs');
  for (const location of locations) {
    const url = new URL(location);
    assert.equal(url.origin, origin, 'Sitemap must use the approved HTTPS apex');
    assert.equal(url.search + url.hash, '', 'Sitemap must not contain query/fragment URLs');
  }
  for (const path of ['/', '/privacy', '/insights', '/work/elara', '/work/cashflow', '/work/oracle', '/work/nomi',
    '/services/business-websites', '/services/web-applications', '/services/mobile-apps', '/services/ongoing-improvements']) {
    assert.ok(locations.includes(`${origin}${path}`), `Missing essential route: ${path}`);
  }
  log(`PASS sitemap: ${locations.length} unique approved URLs`);

  const robotsResponse = await request(`${origin}/robots.txt`);
  assert.equal(robotsResponse.status, 200);
  const robots = await robotsResponse.text();
  assert.match(robots, /^Allow: \/\s*$/m);
  assert.ok(!/^Disallow: \/\s*$/m.test(robots), 'Production crawling is blocked');
  assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
  log('PASS robots: production crawling and sitemap declaration');

  for (const location of locations) {
    const response = await request(location);
    assert.equal(response.status, 200, `Route unavailable or redirects: ${location}`);
    assert.ok(!response.headers.get('x-robots-tag')?.includes('noindex'), `Header blocks indexing: ${location}`);
    assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
    const html = await response.text();
    assert.match(response.headers.get('content-type') || '', /text\/html/);
    const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1];
    assert.ok(canonical, `Missing canonical: ${location}`);
    assert.equal(new URL(canonical).href, location, `Wrong canonical: ${location}`);
    assert.ok(!/name="robots" content="[^"]*noindex/.test(html), `Page blocks indexing: ${location}`);
    if (location === `${origin}/`) {
      assert.ok(html.includes('mailto:hello@delightech.net'), 'Email enquiry link missing');
      assert.ok(html.includes('https://calendly.com/hello-delightech/30min'), 'Booking link missing');
    }
    log(`PASS route: ${new URL(location).pathname}`);
  }

  const redirect = await request('https://www.delightech.net/work/elara?source=operations');
  assert.ok([301, 308].includes(redirect.status), 'www must permanently redirect to apex');
  assert.equal(new URL(redirect.headers.get('location'), 'https://www.delightech.net').href,
    `${origin}/work/elara?source=operations`, 'www redirect must preserve path/query');
  await redirect.body?.cancel();
  log('PASS www redirect: permanent, correct direction, path/query preserved');

  for (const [path, type] of assets) {
    const response = await request(`${origin}${path}`, 'HEAD');
    assert.equal(response.status, 200, `Missing essential asset: ${path}`);
    assert.equal(response.headers.get('content-type')?.split(';')[0], type, `Incorrect asset type: ${path}`);
    assert.ok(Number(response.headers.get('content-length')) > 0, `Empty asset: ${path}`);
    log(`PASS asset headers: ${path}`);
  }
  log('PASS operational smoke check (not browser QA, email delivery, video decoding or field performance)');
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  checkOperations().catch(error => { console.error(`Operational check failed: ${error.message}`); process.exitCode = 1; });
}
