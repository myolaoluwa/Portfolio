import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const context = { exports: {} };
vm.runInNewContext(ts.transpileModule(fs.readFileSync("src/lib/insights.ts", "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, context);
const content = context.exports;
const sample = { slug: "sample-article", title: "A useful title", description: "A useful summary", category: "Planning", author: "DelighTech", published: true, reviewed: true, publishedAt: "2026-10-10", sections: [{ heading: "Start here", paragraphs: ["Reviewed content."] }], related: [] };

test("Insights cannot publish briefs, unreviewed content or incomplete articles", () => {
  assert.equal(content.getPublishedInsights().length, 3);
  assert.ok(content.getInsight("how-to-scope-a-web-application"));
  assert.equal(content.getInsight("draft-studio-note"), undefined);
  assert.equal(content.getPublishedInsights([sample]).length, 1);
  for (const override of [{ published: false }, { reviewed: false }, { publishedAt: null }, { publishedAt: "2026-02-30" }, { publishedAt: "not-a-date" }, { slug: "../private" }, { title: " " }, { author: "" }, { sections: [] }, { sections: [{ heading: "Test", paragraphs: [] }] }, { updatedAt: "2026-10-09" }]) {
    assert.equal(content.getPublishedInsights([{ ...sample, ...override }]).length, 0);
  }
});

test("Insights are sorted by real publication date and expose reading estimates", () => {
  const entries = content.getPublishedInsights([{ ...sample, slug: "older", publishedAt: "2026-10-01" }, sample]);
  assert.equal(entries[0].slug, sample.slug);
  assert.equal(content.readingMinutes(sample), 1);
});

test("Published articles have substantial original content and unique slugs", () => {
  const articles = content.getPublishedInsights();
  assert.equal(new Set(articles.map(article => article.slug)).size, articles.length);
  for (const article of articles) {
    const words = article.sections.flatMap(section => section.paragraphs).join(' ').split(/\s+/).length;
    assert.ok(words >= 400, `${article.slug}: needs substantive guidance`);
    assert.ok(article.related.length >= 2);
  }
  const analyticsContext = { exports: {} };
  vm.runInNewContext(ts.transpileModule(fs.readFileSync("src/lib/analytics.ts", "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, analyticsContext);
  assert.equal(JSON.stringify([...analyticsContext.exports.analyticsInsightPaths].sort()), JSON.stringify(articles.map(article => `/insights/${article.slug}`).sort()));
});
