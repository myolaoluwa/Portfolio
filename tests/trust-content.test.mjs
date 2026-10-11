import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

function moduleFrom(path) {
  const context = { exports: {}, URL };
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(path, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText, context);
  return context.exports;
}

test("team identities need verification, permission and complete public fields", () => {
  const team = moduleFrom("src/lib/studio-team.ts");
  const member = { id: "sample", name: "Test Person", role: "Test Role", verified: true, publication: "approved" };
  assert.equal(team.getPublishedTeam([member]).length, 1);
  for (const override of [{ verified: false }, { publication: "draft" }, { name: " " }, { role: "" }, { id: "" }]) {
    assert.equal(team.getPublishedTeam([{ ...member, ...override }]).length, 0);
  }
  assert.equal(team.getPublishedTeam().length, 1);
  assert.equal(team.getPublishedTeam()[0].name, "Olaoluwa Moshood");
});

test("evidence needs verification, approval, attribution and context", () => {
  const evidence = moduleFrom("src/lib/project-evidence.ts");
  const record = { id: "test", kind: "result", project: "elara", title: "Test", body: "Test", attribution: "Test", context: "Test", verified: true, publication: "approved" };
  assert.equal(evidence.getPublishedEvidence([record], "elara").length, 1);
  assert.equal(evidence.getPublishedEvidence([record], "cashflow").length, 0);
  for (const override of [{ verified: false }, { publication: "draft" }, { attribution: " " }, { context: "" }, { body: "" }]) {
    assert.equal(evidence.getPublishedEvidence([{ ...record, ...override }]).length, 0);
  }
  assert.equal(evidence.getPublishedEvidence().length, 0, "No unsupplied testimonials or results");
});

test("approved ownership distinguishes studio products from collaborations", () => {
  const evidence = moduleFrom("src/lib/project-evidence.ts");
  for (const project of ["cashflow", "bizflow"]) assert.equal(evidence.getProjectOriginLabel(project), "DelighTech-owned product");
  for (const project of ["elara", "oracle", "nomi"]) assert.equal(evidence.getProjectOriginLabel(project), "Collaboration");
});

test("store links stay absent until approved and reject lookalikes", () => {
  const evidence = moduleFrom("src/lib/project-evidence.ts");
  assert.equal(evidence.getApprovedPlayStoreUrl("cashflow"), null);
  const valid = "https://play.google.com/store/apps/details?id=com.example.test";
  evidence.projectStoreLinks.cashflow = { googlePlayUrl: valid, approved: false };
  assert.equal(evidence.getApprovedPlayStoreUrl("cashflow"), null);
  evidence.projectStoreLinks.cashflow.approved = true;
  assert.equal(evidence.getApprovedPlayStoreUrl("cashflow"), valid);
  for (const url of ["http://play.google.com/store/apps/details?id=x", "https://play.google.com.evil.test/store/apps/details?id=x", "https://play.google.com/store/apps/details", "https://user:pass@play.google.com/store/apps/details?id=x"]) {
    evidence.projectStoreLinks.cashflow.googlePlayUrl = url;
    assert.equal(evidence.getApprovedPlayStoreUrl("cashflow"), null);
  }
});

test("Cashflow distinguishes closed testing from a public Google Play release", () => {
  const { caseStudies } = moduleFrom("src/lib/case-studies.ts");
  const cashflow = caseStudies.cashflow;
  assert.match(cashflow.status, /Google Play closed testing/);
  assert.match(cashflow.result.body, /public store release is not yet available/);
  assert.match(cashflow.boundaries, /no launch date is guaranteed/);
  assert.equal(/14 days|October 25|store-approved/i.test(JSON.stringify(cashflow)), false);
  for (const slug of ['oracle', 'nomi']) {
    assert.equal(caseStudies[slug].format, 'walkthrough');
    assert.doesNotMatch(caseStudies[slug].status, /real users|finished product/i);
  }
});
