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
