# SEO implementation release checks — October 10, 2026

## Passed locally

- ESLint and 16 unit tests: publication gates, valid dates/content, article allowlist alignment, analytics consent/privacy safeguards, indexing policy and verified trust data.
- Production build and all 14 public-page checks: unique titles/descriptions, canonicals, consistent indexing policy, security headers, factual Organisation/Article/Breadcrumb data and sitemap membership. Unknown article URLs return 404.
- Insights hub and three articles: 320, 390, 768 and 1440px; no horizontal overflow, working contents anchors, enquiry link, automated axe WCAG A/AA checks and no-JavaScript readability. Mobile screenshots reviewed.
- Four services: responsive layouts and no-JavaScript content checks.
- Landing page: 11 desktop/mobile/landscape layouts, navigation, chapter interaction, project videos, FAQ and anchors.
- Usability: reduced motion, missing IntersectionObserver fallback, media-error announcements, close/focus/scroll restoration, enlarged-content reflow and no-JavaScript service/engagement access.
- Cashflow interface: homepage and case study at seven widths from 320 to 1440px. Visible sidebars retain the complete wordmark and readable menu; narrow screens use the existing simplified layout.
- Read-only hosting verification: apex configuration valid, no reported DNS conflicts, www-to-apex 308 retaining the path. No hosting changes were made.

## Performance diagnosis — not a pass

A single mobile Lighthouse run against the local production build (`http://localhost:3111`) returned:

| Diagnostic | Result |
| --- | --- |
| Performance | 62 |
| Accessibility | 100 |
| Best practices | 100 |
| Basic SEO | 100 |
| LCP | 5.1 seconds |
| CLS | 0.001 |
| Total blocking time | 390 milliseconds |

The LCP element was the opening headline. The trace attributed most LCP time to element render delay, with style/layout and script evaluation contributing main-thread work. It also flagged render-blocking stylesheets and image delivery opportunities. Existing first-message and opening-background animations are already disabled; simply removing another entrance animation is not an evidenced fix.

This is a local, simulated, single-run diagnostic, not production field data or a valid before/after comparison with historical tests. It does not meet the good-LCP target. Further work should profile the critical style/font path and initial layout/hydration on representative mobile hardware, change one cause at a time, and recheck chapter geometry, readability and interaction. Preserve the cinematic direction rather than rushing an unverified rendering rewrite. Do not claim performance-ready or ranking gains from this release.

## Requires account evidence or owner input

- Google-selected canonical, actual indexing, search queries/countries, demand and baseline: Search Console reports or a connected read-only account. No accessible signed-in browser was available; no credentials requested.
- Field Core Web Vitals and actual production analytics events: enough real traffic and account verification. Booking clicks measure intent, not completed appointments.
- Real project results, testimonials, named collaborator credits and outreach: owner evidence and approval. Templates are prepared; nothing was fabricated or sent externally.
- International visibility: actual query/country evidence and ongoing iteration. No fake foreign offices, paid ranking promises or doorway country pages were introduced.
- Automated accessibility checks do not replace manual keyboard, screen-reader and assistive-technology testing.

The static implementation is ready for the requested Git release with these documented limitations; the wider SEO programme is not complete.
