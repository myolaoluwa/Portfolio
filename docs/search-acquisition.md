# Phase 4 — search acquisition and international positioning

## Implemented locally

Four substantive, statically rendered English service pages:

- `/services/business-websites`
- `/services/web-applications`
- `/services/mobile-apps`
- `/services/ongoing-improvements`

Each page has distinct intent, title, description, canonical, Open Graph and Twitter metadata. It explains fit, scope options, implementation decisions, discovery inputs, boundaries and FAQs. Relevant public work provides evidence without pretending that studio-owned projects are client commissions. The homepage cards, project story enquiry sections and related service links make the pages discoverable through ordinary links.

The sitemap now contains ten public URLs. The existing indexing policy still applies: Vercel previews/development are noindex; production honours `SITE_INDEXING_ENABLED`. All new analytics routes are explicitly allowlisted, require consent and exclude the privacy notice. No extra third-party tracker was added.

Organisation JSON-LD contains only the public studio name, origin, working email and service description. Project/service breadcrumb JSON-LD uses the actual two-level path and matching visible navigation. No invented ratings, awards, offices, legal identifiers, prices or social profiles are marked up. This is source-level structured-data validation, not a claim that Google has approved rich results. Sources: [organisation guidance](https://developers.google.com/search/docs/appearance/structured-data/organization), [structured-data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies).

## International audience

Use clear English and real project decisions to reach business buyers in the USA, UK, Australia, Germany and elsewhere. Do not imply a local office in those countries. Do not create near-identical city/country pages: [Google’s doorway-abuse policy](https://developers.google.com/search/docs/essentials/spam-policies#doorways) applies to pages made chiefly to capture similar search queries and funnel visitors onward.

No paid keyword research or Search Console account analysis has been performed in this phase. Do not assert search volume, competition, rankings or qualified leads without data. German localisation should wait for approved translations and an ongoing maintenance plan; no unsupported `hreflang` alternates were introduced.

## Local verification

Run lint, unit tests, build and `test:production`. The optional `npm run test:services` browser audit uses `PLAYWRIGHT_MODULE` and `CHROME_PATH` in the same way as the landing audit; supply `AXE_SCRIPT` pointing to an installed `axe.min.js` to include automated WCAG A/AA checks. Without that value, only layout and interaction checks run. Collector requests are blocked. This is not a complete accessibility certification.

## After approved publication

1. Resolve the known Namecheap forwarding/DNS conflict and confirm Vercel reports valid configuration. A successful page request alone does not prove every DNS answer is correct.
2. Verify the live non-www origin, all ten public pages, canonicals and discovery endpoints. Run `BASE_URL=https://delightech.net npm run test:production` only after the new code is deployed; it will fail against the old six-page deployment.
3. Check the updated sitemap in Search Console. Its URL stays `https://delightech.net/sitemap.xml`; an existing successful submission need not be replaced with a new sitemap URL.
4. Use Google’s [Rich Results Test](https://search.google.com/test/rich-results) and URL Inspection on the published pages. Automated JSON checks here establish structure and content consistency, not Google eligibility or indexing.
5. Review actual queries, page impressions, clicks and indexing status over time. Requested indexing is not confirmed indexing. Do not repeat submission requests as a ranking tactic.
6. Confirm Umami is configured in production, then use intentional consented visits to verify page views and booking intent. Never treat a booking-link click as a completed enquiry or confirmed client.
7. Improve pages based on real buyer questions and search data. Add genuine team/client proof when approved. Ranking is an ongoing result, not a release checkbox.

## Original content backlog — briefs, not published articles

Avoid an empty blog or bulk generated SEO posts. The following articles can be written from real inspected implementation decisions, then reviewed for accuracy and confidentiality:

### A useful MVP starts with a complete workflow

- Audience: business owners choosing a first web application scope.
- Use Elara’s orientation → context → action → follow-through sequence as an example.
- Explain how to define acceptance criteria, defer unrelated features and identify dependencies.
- Link the web-app service and Elara walkthrough.
- No invented customer story, adoption number or quantified savings.

### Responsive website or Android app: choosing the delivery format

- Audience: owners considering mobile access to an existing product.
- Use Cashflow’s web workflow and Capacitor adaptation as the implementation example.
- Discuss device needs, store distribution, testing, provider access and scope boundaries.
- Link the mobile-app service and Cashflow case study.
- Do not imply native iOS, offline sync or store acceptance unless verified for the implementation.

### Refining a portfolio without discarding its creative direction

- Audience: teams deciding whether an existing site needs refinement or replacement.
- Explain clarity, optional cinematic navigation, consent-controlled measurement and bounded regression checks using this studio website.
- Distinguish lab diagnostics from field performance.
- Link business websites and ongoing improvements.
- Do not present the current city opening as the original tree brief or claim documented conversion gains.

The original Phase 4 record above describes that phase's state. The later SEO release implements `/insights`, three reviewed guides, relevant internal links and factual Article/Breadcrumb schema. See [implementation status](seo-roadmap.md#implementation-status--october-10-2026) and [publishing workflow](insights-publishing.md). Private Search Console demand/ranking data and genuine outcome metrics remain pending; no ranking gains are claimed.
