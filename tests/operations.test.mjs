import test from 'node:test';
import assert from 'node:assert/strict';
import { checkOperations } from '../scripts/operations-check.mjs';

const origin = 'https://delightech.net';
const paths = ['/', '/privacy', '/insights', '/work/elara', '/work/cashflow', '/work/oracle', '/work/nomi',
  '/services/business-websites', '/services/web-applications', '/services/mobile-apps', '/services/ongoing-improvements'];
function fixture(change = () => {}) {
  const calls = [];
  const fetchImpl = async (url, options) => {
    calls.push({ url, ...options });
    const path = new URL(url).pathname;
    let body = `<html><link rel="canonical" href="${url === `${origin}/` ? origin : url}"><meta name="robots" content="index, follow"><a href="mailto:hello@delightech.net">Email</a><a href="https://calendly.com/hello-delightech/30min">Book</a></html>`;
    const init = { status: 200, headers: { 'content-type': 'text/html', 'x-content-type-options': 'nosniff' } };
    if (path === '/sitemap.xml') { body = `<urlset>${paths.map(path => `<url><loc>${origin}${path}</loc></url>`).join('')}</urlset>`; init.headers['content-type'] = 'application/xml'; }
    if (path === '/robots.txt') body = `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`;
    if (new URL(url).hostname === 'www.delightech.net') { init.status = 308; init.headers.location = `${origin}/work/elara?source=operations`; }
    if (options.method === 'HEAD') {
      body = null;
      init.headers['content-length'] = '1024';
      init.headers['content-type'] = path.endsWith('.mp4') ? 'video/mp4' : path.endsWith('.vtt') ? 'text/vtt' : path.endsWith('.webp') ? 'image/webp' : 'image/png';
    }
    const changed = change(url, options, { body, init });
    return new Response(changed?.body === undefined ? body : changed.body, changed?.init || init);
  };
  return { calls, fetchImpl };
}
const run = fetchImpl => checkOperations({ fetchImpl, log: () => {}, retryDelay: 0 });

test('operational monitor only reads approved site URLs and uses bounded, manual-redirect requests', async () => {
  const { calls, fetchImpl } = fixture();
  await run(fetchImpl);
  assert.equal(calls.length, paths.length + 8);
  for (const call of calls) {
    assert.ok(['delightech.net', 'www.delightech.net'].includes(new URL(call.url).hostname));
    assert.ok(['GET', 'HEAD'].includes(call.method));
    assert.equal(call.redirect, 'manual');
    assert.ok(call.signal instanceof AbortSignal);
    assert.equal(call.body, undefined);
  }
  assert.equal(calls.filter(call => call.method === 'HEAD').length, 5);
});

test('operational monitor rejects canonical drift, blocked indexing, broken media and wrong redirects', async () => {
  for (const mutate of [
    (url, options, value) => url === `${origin}/privacy` ? { ...value, body: value.body.replace('https://delightech.net/privacy', 'https://www.delightech.net/privacy') } : undefined,
    (url, options, value) => url === `${origin}/robots.txt` ? { ...value, body: 'Disallow: /' } : undefined,
    (url, options, value) => url === `${origin}/` ? { ...value, body: value.body.replace('index, follow', 'noindex') } : undefined,
    (url, options, value) => url.endsWith('elara-showcase.mp4') ? { ...value, init: { ...value.init, status: 404 } } : undefined,
    (url, options, value) => url.includes('www.delightech.net') ? { ...value, init: { ...value.init, headers: { location: `${origin}/` } } } : undefined,
    (url, options, value) => url.endsWith('sitemap.xml') ? { ...value, body: value.body.replace(`${origin}/privacy`, 'https://outside.example/privacy') } : undefined,
  ]) await assert.rejects(run(fixture(mutate).fetchImpl));
});

test('operational monitor retries transient failures once, then fails instead of masking an outage', async () => {
  const base = fixture().fetchImpl;
  let attempts = 0;
  await run(async (url, options) => {
    if (url.endsWith('sitemap.xml') && attempts++ === 0) return new Response('temporary', { status: 503 });
    return base(url, options);
  });
  assert.equal(attempts, 2);
  let failedAttempts = 0;
  await assert.rejects(run(async () => { failedAttempts++; throw new Error('network unavailable'); }), /network unavailable/);
  assert.equal(failedAttempts, 2);
});
