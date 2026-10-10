import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

function configuration(env = {}) {
  const context = { exports: {}, process: { env }, URL };
  const code = ts.transpileModule(fs.readFileSync("src/lib/site-config.ts", "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText;
  vm.runInNewContext(code, context);
  return context.exports;
}

test("production uses the approved origin and explicit indexing preference", () => {
  assert.equal(configuration().siteUrl.origin, "https://delightech.net");
  assert.equal(configuration({ VERCEL_ENV: "production" }).indexingEnabled, true);
  assert.equal(configuration({ SITE_INDEXING_ENABLED: "false" }).indexingEnabled, false);
  assert.equal(configuration({ SITE_URL: "https://www.delightech.net" }).siteUrl.origin, "https://www.delightech.net");
});

test("Vercel preview and development cannot accidentally enable indexing", () => {
  for (const VERCEL_ENV of ["preview", "development"]) {
    assert.equal(configuration({ VERCEL_ENV, SITE_INDEXING_ENABLED: "true" }).indexingEnabled, false);
  }
});

test("canonical origin rejects insecure or non-origin values", () => {
  for (const SITE_URL of ["http://delightech.net", "https://user:password@delightech.net", "https://delightech.net/path", "https://delightech.net?query=1", "https://delightech.net#fragment", "not a URL"]) {
    assert.throws(() => configuration({ SITE_URL }));
  }
});
