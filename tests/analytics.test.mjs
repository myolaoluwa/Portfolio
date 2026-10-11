import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

function fixture() {
  const storage = new Map();
  const requests = [];
  const context = {
    exports: {},
    process: { env: {} },
    URL,
    navigator: {},
    localStorage: { getItem: (key) => storage.get(key) },
    window: {
      location: { pathname: "/work/elara", hostname: "delightech.net" },
      innerWidth: 393,
    },
    fetch: (...args) => {
      requests.push(args);
      return Promise.resolve({});
    },
  };
  const source = fs.readFileSync("src/lib/analytics.ts", "utf8");
  const code = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText;
  vm.runInNewContext(code, context);
  const configure = () => {
    context.process.env = {
      NEXT_PUBLIC_ANALYTICS_COLLECT_URL:
        "https://analytics.example.com/api/send",
      NEXT_PUBLIC_ANALYTICS_WEBSITE_ID: "12345678-1234-1234-1234-123456789abc",
    };
  };
  return { api: context.exports, context, storage, requests, configure };
}

test("collection requires valid configuration and explicit consent", () => {
  const f = fixture();
  f.api.trackEvent("page_view");
  f.configure();
  f.api.trackEvent("page_view");
  assert.equal(f.requests.length, 0);
  f.storage.set(f.api.analyticsChoiceKey, "granted");
  f.api.trackEvent("video_play", "elara");
  assert.equal(f.requests.length, 1);
  const request = f.requests[0][1];
  assert.equal(request.credentials, "omit");
  assert.equal(request.referrerPolicy, "no-referrer");
  assert.deepEqual(JSON.parse(request.body).payload, {
    website: "12345678-1234-1234-1234-123456789abc",
    hostname: "delightech.net",
    url: "/work/elara",
    name: "video_play",
    data: { project: "elara" },
  });
});

test("approved booking clicks are intent only and respect consent", () => {
  const f = fixture();
  f.configure();
  const action = f.api.analyticsLinkEvent("https://calendly.com/hello-delightech/30min");
  assert.equal(action.name, "booking_click");
  assert.equal(f.api.analyticsLinkEvent("https://calendly.com/someone-else/30min"), null);
  assert.equal(f.api.analyticsLinkEvent("https://calendly.com/hello-delightech/30min?email=private"), null);
  assert.equal(f.api.analyticsLinkEvent("/work/unknown"), null);
  assert.equal(f.api.analyticsLinkEvent("/work/elara").project, "elara");
  assert.equal(f.api.analyticsLinkEvent("mailto:hello@delightech.net").name, "contact_click");
  f.api.trackEvent(action.name);
  assert.equal(f.requests.length, 0);
  f.storage.set(f.api.analyticsChoiceKey, "granted");
  f.api.trackEvent(action.name);
  const payload = JSON.parse(f.requests[0][1].body).payload;
  assert.equal(payload.name, "booking_click");
  assert.equal(payload.data, undefined);
  assert.equal(JSON.stringify(payload).includes("calendly"), false);
  f.storage.set(f.api.analyticsChoiceKey, "denied");
  f.api.trackEvent(action.name);
  assert.equal(f.requests.length, 1);
});

test("withdrawal, DNT, GPC, storage errors, and unknown paths prevent collection", () => {
  const f = fixture();
  f.configure();
  f.storage.set(f.api.analyticsChoiceKey, "granted");
  f.context.navigator.globalPrivacyControl = true;
  f.api.trackEvent("page_view");
  f.context.navigator.globalPrivacyControl = false;
  f.context.navigator.doNotTrack = "1";
  f.api.trackEvent("page_view");
  f.context.navigator.doNotTrack = "0";
  f.storage.set(f.api.analyticsChoiceKey, "denied");
  f.api.trackEvent("page_view");
  f.storage.set(f.api.analyticsChoiceKey, "granted");
  f.context.window.location.pathname = "/private/customer";
  f.api.trackEvent("page_view");
  f.context.window.location.pathname = "/";
  f.context.localStorage.getItem = () => {
    throw Error("Storage unavailable");
  };
  f.api.trackEvent("page_view");
  assert.equal(f.requests.length, 0);
});

test("service-page collection is consent-controlled and limited to known routes", () => {
  const f = fixture();
  f.configure();
  for (const slug of ["business-websites", "web-applications", "mobile-apps", "ongoing-improvements"]) {
    f.context.window.location.pathname = `/services/${slug}`;
    f.api.trackEvent("page_view");
  }
  assert.equal(f.requests.length, 0);
  f.storage.set(f.api.analyticsChoiceKey, "granted");
  for (const slug of ["business-websites", "web-applications", "mobile-apps", "ongoing-improvements"]) {
    f.context.window.location.pathname = `/services/${slug}`;
    f.api.trackEvent("page_view");
  }
  assert.equal(f.requests.length, 4);
  for (const pathname of ["/services/unknown", "/services/mobile-apps/private", "/privacy"]) {
    f.context.window.location.pathname = pathname;
    f.api.trackEvent("page_view");
  }
  assert.equal(f.requests.length, 4);
  assert.equal(JSON.parse(f.requests[0][1].body).payload.url, "/services/business-websites");
});

test("invalid collectors stay disabled and failures do not break navigation", async () => {
  const f = fixture();
  f.configure();
  f.storage.set(f.api.analyticsChoiceKey, "granted");
  for (const endpoint of [
    "http://analytics.example.com/api/send",
    "https://user:pass@example.com/api/send",
    "https://example.com/api/send?email=private",
    "https://example.com/other",
  ]) {
    f.context.process.env.NEXT_PUBLIC_ANALYTICS_COLLECT_URL = endpoint;
    assert.equal(f.api.analyticsConfiguration(), null);
    f.api.trackEvent("page_view");
  }
  assert.equal(f.requests.length, 0);
  f.configure();
  f.context.fetch = () => Promise.reject(Error("Offline"));
  assert.doesNotThrow(() => f.api.trackEvent("page_view"));
  await new Promise((resolve) => setImmediate(resolve));
});

test("Insights measurement requires consent and excludes drafts or unknown articles", () => {
  const f = fixture();
  f.configure();
  f.context.window.location.pathname = "/insights";
  f.api.trackEvent("page_view");
  assert.equal(f.requests.length, 0);
  f.storage.set(f.api.analyticsChoiceKey, "granted");
  for (const path of ["/insights", ...f.api.analyticsInsightPaths]) {
    f.context.window.location.pathname = path;
    f.api.trackEvent("page_view");
  }
  assert.equal(f.requests.length, 4);
  for (const path of ["/insights/draft-studio-note", "/insights/private/client", "/privacy"]) {
    f.context.window.location.pathname = path;
    f.api.trackEvent("page_view");
  }
  assert.equal(f.requests.length, 4);
});

test('Web Vitals send only minimal, deduplicated document samples after consent', () => {
  const f = fixture();
  f.configure();
  const report = f.api.createWebVitalsReporter('/work/elara');
  const metric = { name: 'LCP', value: 2722.768, id: 'local-only', entries: [{ url: 'private', text: 'private' }] };
  report(metric);
  assert.equal(f.requests.length, 0);
  f.storage.set(f.api.analyticsChoiceKey, 'granted');
  report(metric);
  report(metric);
  assert.equal(f.requests.length, 1);
  const options = f.requests[0][1];
  assert.equal(options.keepalive, true);
  const payload = JSON.parse(options.body).payload;
  assert.equal(payload.name, 'web_vital_lcp');
  assert.deepEqual(payload.data, { value: 2723, unit: 'ms', rating: 'needs-improvement', viewport: 'compact', scope: 'document' });
  assert.doesNotMatch(options.body, /local-only|private|entries/);
  report({ name: 'CLS', value: 0.0834, id: 'cls' });
  assert.equal(JSON.parse(f.requests[1][1].body).payload.data.value, 0.083);
  assert.equal(JSON.parse(f.requests[1][1].body).payload.data.rating, 'good');
  f.context.window.innerWidth = 1440;
  report({ name: 'INP', value: 501.2, id: 'inp' });
  assert.equal(JSON.parse(f.requests[2][1].body).payload.data.rating, 'poor');
  assert.equal(JSON.parse(f.requests[2][1].body).payload.data.viewport, 'wide');
});

test('Web Vitals respect withdrawal, privacy signals, invalid metrics and route changes', () => {
  const f = fixture();
  f.configure();
  f.storage.set(f.api.analyticsChoiceKey, 'granted');
  const report = f.api.createWebVitalsReporter('/work/elara');
  for (const metric of [{ name: 'FCP', value: 20, id: 'x' }, { name: 'LCP', value: NaN, id: 'x' }, { name: 'LCP', value: Infinity, id: 'x' }, { name: 'CLS', value: -1, id: 'x' }, { name: 'INP', value: 20, id: '' }]) report(metric);
  const metric = { name: 'LCP', value: 2500, id: 'not-sent' };
  f.storage.set(f.api.analyticsChoiceKey, 'denied'); report(metric);
  f.storage.set(f.api.analyticsChoiceKey, 'granted');
  f.context.navigator.doNotTrack = '1'; report(metric);
  f.context.navigator.doNotTrack = '0';
  f.context.navigator.globalPrivacyControl = true; report(metric);
  f.context.navigator.globalPrivacyControl = false;
  f.context.window.location.pathname = '/privacy'; report(metric);
  f.api.createWebVitalsReporter('/privacy')(metric);
  f.context.window.location.pathname = '/work/cashflow'; report(metric);
  f.context.window.location.pathname = '/work/elara';
  f.context.localStorage.getItem = () => { throw Error('Unavailable'); }; report(metric);
  assert.equal(f.requests.length, 0);
});
