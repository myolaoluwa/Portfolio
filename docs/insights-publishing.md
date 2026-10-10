# Publishing DelighTech Insights

## Current setup

Preview the hub at `http://localhost:3000/insights`. Articles are file-based in `src/lib/insights.ts`; no CMS account, additional npm package or new environment variable is required. There is no browser editor/admin panel yet. Three original studio guides are prepared for publication under the owner's implementation/release instruction, using the existing project evidence and no invented client results.

## Add an article

1. Choose a real buyer question from keyword research, Search Console or enquiries.
2. Write and review original content. Verify product claims and obtain permission for private examples, results or collaboration credits.
3. Add an `Insight` entry in `src/lib/insights.ts`, initially with `published: false`, `reviewed: false`, and `publishedAt: null`.
4. Fill in a unique lowercase hyphenated `slug`, title, short description, category, attribution, and `sections`. Each section has a heading, paragraphs and optional bullet `points`. Text renders as text, not raw HTML. Use `related` for approved service/case-study links. Current attribution is a studio/organisation name; a personal byline requires corresponding author-schema support first.
5. Run lint, unit tests and a build. Review content, mobile layout and keyboard navigation. Drafts intentionally do not have a public preview URL; review them in the workspace. For a local visual proof, temporarily enable the completed entry on a private working branch, never push a preview with unapproved publication flags, then return it to draft if not approved.
6. After approval, set `reviewed: true`, `published: true`, and `publishedAt` to the real publication date (`YYYY-MM-DD`). Use `updatedAt` only for an actual content revision. These flags are workflow gates, not authentication; confidential drafts should never be committed to a public repository.
7. Run checks again and review `/insights/<slug>` locally. Check its title, canonical, visible attribution/date, Article/Breadcrumb JSON-LD, contents links and related links. Add the approved route to `analyticsInsightPaths` in `src/lib/analytics.ts` if measurement is wanted; the unit test checks alignment with published articles. Unknown draft routes remain excluded.
8. Only after release approval, commit/push and confirm deployment. The article enters the listing/sitemap automatically; the hub becomes indexable once at least one complete reviewed article exists, subject to the site's production indexing settings.
9. Inspect the live URL in Search Console. The existing sitemap URL remains unchanged. Share a short summary with a link on your approved professional profiles.

## Publication gates

An entry must be published, reviewed, have a valid slug/date, complete title/summary/author and at least one non-empty content section. Draft/unknown article URLs return 404; drafts do not appear in metadata, JSON-LD, the listing or sitemap. This prevents accidental publication of the editorial brief; it does not replace human review for quality, confidentiality or accuracy.

## First briefs

- How to scope a web application before development — workflow, users, MVP boundaries, dependencies and acceptance criteria; link Elara/web applications.
- Responsive website or mobile app — real needs and trade-offs, with verified Cashflow/Capacitor examples; link mobile services.
- What to prepare before hiring a software studio — goals, anonymised workflow examples, scope, content and decision-makers; link engagement/services.

Avoid generic bulk posts, invented testimonials and unsupported quantified results. The three complete guides use studio attribution, not fabricated personal testimonials or undocumented project outcomes.

## Implementation checks

This release passed lint, 16 unit tests, production build and 14-public-page metadata/schema/sitemap checks. The hub and all three complete articles passed 320/390/768/1440px layout/axe scans, contents-anchor checks and no-JavaScript readability checks. See [release checks](seo-release-checks.md) for remaining limits. No packages or environment variables were added; publishing is through the normal reviewed Git/Vercel release.
