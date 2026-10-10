# DelighTech SEO roadmap

Objective: attract qualified enquiries from international business buyers, not maximise irrelevant traffic. Work through these stages in order. Timing below is a working cadence, not a ranking forecast. No top-position, lead-volume or indexing guarantee is made.

## 1. Baseline and search eligibility — first week

- Confirm the latest production deployment, apex canonical and www redirect. Check Vercel's DNS validity separately from successful HTTP responses.
- In the existing Search Console domain property, inspect the homepage, four service pages and four case studies. Record actual indexed status, Google-selected canonical and any exclusion reason.
- Check the existing `/sitemap.xml` submission; do not repeatedly request indexing as a ranking tactic.
- Export the last available 28/90 days of queries/pages/countries. Separate branded searches (DelighTech/Olaoluwa) from service searches.
- Establish a baseline of clicks, impressions, CTR, average position and qualified enquiries. Filter USA, UK, Australia and Germany individually; do not treat Europe as one country filter.
- Verify production analytics consent and booking-intent collection without inventing visits. Booking-link clicks are not completed appointments.

Owner input: Search Console exports or read-only access, production environment confirmation. Exit: baseline recorded and known technical exclusions understood. A sitemap submission alone is not proof of indexing.

## 2. Buyer intent and keyword research — weeks 1–2

- Choose the first primary buyer segment and service based on genuine strengths, e.g. business workflow applications. Do not target every industry and country at once.
- Research actual buyer wording and current search results. Identify intent, competing page formats and evidence gaps.
- Map one distinct intent to each existing service page: business websites, custom web applications, mobile applications, ongoing improvements.
- Research narrower problem-led opportunities supported by work, such as operational dashboards or cashbook workflows. These are hypotheses until validated; no search-volume figures are supplied.
- Use Search Console's real queries and customer questions first; optional commercial keyword tools may help later but are not required for launch.

Deliverable: query → audience → intent → target page → supporting proof worksheet. Exit: a small validated list, not a long stuffed keyword list.

## 3. On-page refinement and proof — weeks 2–3

- Refine distinct page titles, headings, introductions and descriptions around validated intent, written naturally.
- Keep the cinematic homepage; lead with the service offer and a usable route to relevant work/contact.
- Add owner-approved real project results, attribution and testimonials. Distinguish studio-owned products from collaborations; never invent counts or clients.
- Connect service pages, relevant case studies and articles with descriptive internal links.
- Verify image alternative text, meaningful captions/transcripts, mobile layout, contact paths and actual performance. Maintain factual structured data; schema does not guarantee rich results.

Owner input: documented outcomes, permission for testimonials/credits, genuine collaboration details. Exit: each target page answers the buyer's question and provides a credible next step.

## 4. Insights and useful content — weeks 3–6, then ongoing

- The local Insights foundation is now at `/insights`; articles use `/insights/[slug]`.
- Prepare one original, thoroughly reviewed article first. Suggested brief: "How to scope a web application before development". Follow with website vs mobile app and preparing for a discovery call if research supports them.
- Use real implementation decisions, examples, limitations and citations. Do not disclose confidential project data or claim unverified outcomes.
- Each article needs a useful title, summary, real attribution/date, readable sections, relevant service/work links and an appropriate enquiry route.
- Publish only after review. An empty listing is noindex and excluded from the sitemap. This release includes three reviewed articles, so the hub is included under the production indexing policy. Draft URLs return 404. Approved articles automatically enter the listing and sitemap.
- Share an original short summary and link on existing professional profiles. Keep the complete article on DelighTech.

See [publishing instructions](insights-publishing.md). Exit: first substantive reviewed article live, linked, inspected in Search Console. More posts are not automatically better.

## 5. Off-page credibility — weeks 4–12, then ongoing

- Identify relevant collaborators, product partners and publications where DelighTech's work genuinely belongs.
- Ask for optional approved editorial collaboration credits and relevant links. Never require ranking links in client contracts.
- Add accurate studio ownership information to owned product sites/listings where appropriate.
- Keep genuine business profiles consistent. Social publishing is a discovery/referral channel, not a promised direct ranking factor.
- Contribute practical resources or demonstrations worth referencing; use personalised, relevant outreach, not mass spam.
- Assess selective industry listings for real audience value before paying. Avoid backlink packages, link networks, automated links, low-quality directories and excessive exchanges. Advertising/sponsorship links should be appropriately qualified.

Owner action: approve outreach and public credits before messages or profile updates. Exit: genuine referral sources and relevant mentions, not an arbitrary backlink count.

## 6. Measurement and international expansion — monthly

- Compare rolling 28-day and longer windows in Search Console, considering small samples and seasonality. Review pages, queries, target countries and qualified enquiry quality.
- Diagnose separately: not indexed → crawl/content/canonical checks; impressions without clicks → intent/title review; visits without enquiries → offer/proof/contact review.
- Check field Core Web Vitals when enough data exists; no data is not a pass. Use lab tests for diagnosis, not as ranking proof.
- Improve articles/services from real questions and search evidence. Update dates only when the content actually changes.
- Use clear international English and honest remote-working information. No invented foreign offices or cloned country/city landing pages.
- Consider professionally reviewed German content only when demand and maintenance capacity justify it; use separate language URLs and correct hreflang then, not now.

Exit: a repeatable monthly report and evidence-backed next actions. A 90-day review is a decision checkpoint, not a promise of rankings by day 90.

## Tools, dependencies and environment variables

| Item | Purpose | Needed now? | Code/env integration |
| --- | --- | --- | --- |
| Google Search Console | Indexing, search queries, country/page performance | Existing verified property | No SDK/API key needed for manual use; keep verification DNS record |
| Umami Cloud | Consented visitor activity and enquiry intent | Already selected | Existing public collector/website ID configuration; no new settings for Insights layout |
| PageSpeed Insights / Rich Results Test | Performance diagnosis / supported schema validation | Use after publication | External checks; no dependency/env key |
| LinkedIn / genuine product and collaborator sites | Content distribution, referrals, credible mentions | Use existing approved profiles | Ordinary links, not a ranking API |
| Optional CMS | Browser-based article editing | Not needed for current file-based publishing | Requires a separate selection, access controls and integration if requested later |
| SEO plugins, paid backlink services | Not required to make this Next.js site indexable | No | No packages or secrets added |

There is no "rank on Google" environment variable. The site already uses `SITE_URL`, `SITE_INDEXING_ENABLED` and optional public analytics settings. Do not expose credentials in NEXT_PUBLIC variables. This implementation installs no dependencies and changes no environment files. Add future approved article routes to the consent-controlled allowlist and tests; the hub and three current articles are already covered. Unknown draft URLs are not collected.

## Sources

- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide): discovery, helpful content, links, iteration and uncertain timing.
- [People-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content): original experience, evidence and reader value.
- [Spam policies](https://developers.google.com/search/docs/essentials/spam-policies): link spam, doorway abuse and keyword stuffing.
- [Page experience](https://developers.google.com/search/docs/appearance/page-experience): performance and broader usability.
- [International sites](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites): honest regional/language architecture.
- [Search Console performance](https://support.google.com/webmasters/answer/7576553?hl=en): interpreting search visibility.

No Search Console private data, keyword volumes or backlink audit has been accessed for this roadmap. No ranking gains are claimed.

## Implementation status — October 10, 2026

- Technical foundation: production HTTP checks passed before this release. Vercel's authenticated read-only domain configuration returned `misconfigured: false`, no conflicts and A record `216.198.79.1`; www-to-apex 308 was confirmed with the service path preserved. No DNS/hosting changes were needed.
- Research: qualitative intent/result sampling and a page map are recorded in [buyer-intent map](seo-keyword-map.md). Target-country localisation, query demand and volumes remain unverified without account data.
- On-page: refined service titles/headings; linked services, relevant project stories and Insights; preserved the cinematic experience. Added the real studio logo to Organisation data.
- Insights: three original, reviewed buyer guides are publication-ready in this release. The hub becomes indexable under the production indexing policy; articles have unique metadata, factual Article/Breadcrumb data, contents navigation, relevant links and publication-based sitemap dates. No client results were invented.
- Measurement: added consent-controlled allowlisting for the hub and three published article paths, with tests and privacy wording. Real collection and conversion outcomes still require production configuration and live/account evidence.
- Off-page: [brand/outreach/distribution kit](seo-off-page-kit.md) prepared. No messages, profiles, owned product repositories or store listings were changed. Genuine credits need named recipient/wording approval.
- Ongoing: [monthly review template](seo-monthly-review.md) prepared. Actual reports, field Core Web Vitals and future content iteration are ongoing tasks, not completed historical results.
- Verification: [release checks](seo-release-checks.md) record passing functional checks and an unresolved mobile lab performance issue. Do not treat automated SEO/accessibility scores as evidence of rankings or complete accessibility compliance.
- Access: no accessible browser session was available for Search Console. An optional GSC Wizard integration was suggested; it is not confirmed installed/connected. Owner can instead supply exported queries/pages/countries. No credentials were requested or stored.

The code portion is implemented; the external evidence, approved public credits and monthly measurement portions are explicitly pending. Do not describe the entire SEO programme as completed or guarantee international rankings.
