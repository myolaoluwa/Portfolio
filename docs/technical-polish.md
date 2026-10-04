# Technical polish and launch configuration

## Preserved experience

The cinematic composition, portrait reveal, phone chapters, project videos, and existing navigation remain. The initial headline no longer waits for an opacity entrance; subsequent portrait and chapter entrances still animate. The opening image uses responsive Next Image delivery and preloading. The portrait's mobile image sizing now follows its rendered width. Homepage dashboard previews are code-split and mounted when approaching the viewport, instead of all being hydrated during the opening. They retain their original layouts once loaded; project descriptions/links stay available immediately and case-study previews remain server-rendered.

The duplicate Google Fonts CSS import was removed. Fonts remain self-hosted through Next's font loader; the small mono labels no longer preload ahead of primary heading/body typography. Text contrast was deepened without replacing the coral surfaces, forest palette, or lime hero accent. Video cards now derive accessible names from their visible labels. The sound button's accessible name includes its visible text.

Cashflow's inspected implementation is Next.js/TypeScript/Prisma/PostgreSQL with Capacitor, not Expo/React Native. Its case study and site metadata reflect this. Do not add a second implementation claim without evidence.

## Domain and search discovery

Olaoluwa confirmed `https://delightech.net` as the production domain.

- `/robots.txt` and `/sitemap.xml` are native metadata routes.
- The sitemap lists the homepage and all four existing case-study/walkthrough routes. It does not invent modification dates.
- Production indexing is enabled by default. Set `SITE_INDEXING_ENABLED=false` **at build time** for publicly hosted staging or preview builds. This changes both the robots file and page metadata; it is not authentication or a privacy guarantee.
- `SITE_URL` optionally overrides the confirmed domain and must be an HTTPS origin. Never launch with a temporary preview origin in canonical metadata.
- After approval/deployment, check the live endpoints and submit the sitemap in your search console. Local lab SEO scores do not establish search visibility.

## Optional analytics — configuration-dependent

Olaoluwa configured Umami Cloud locally and confirmed that events arrive. The values are in ignored `.env.local`, so fresh clones and hosting builds remain unconfigured until their environment variables are supplied. An unconfigured build makes no analytics collection requests. No analytics SDK or remote tracker script is installed. Email, booking, and enquiry placeholders remain disabled; no actual enquiry-submission conversion is claimed.

The optional adapter speaks the documented Umami `/api/send` event format: https://docs.umami.is/docs/api/sending-stats. You can choose Umami (hosted or self-hosted), or replace the adapter if you choose another service. Choosing a provider is still outstanding.

To enable a compatible collector, copy the relevant blank fields from `.env.example` into your deployment configuration, configure these environment variables, and rebuild:

```dotenv
NEXT_PUBLIC_ANALYTICS_COLLECT_URL=https://YOUR-ANALYTICS-HOST/api/send
NEXT_PUBLIC_ANALYTICS_WEBSITE_ID=YOUR-UMAMI-WEBSITE-UUID
```

These are public configuration values, **not secret API keys**. Use a dedicated website record for the confirmed production domain. Confirm that the collector accepts cross-origin JSON requests from that domain; verify collection in the provider dashboard before treating it as working measurement.

Consent controls appear only when configuration is valid and browser privacy signals permit collection. Nothing is sent before the visitor chooses Allow analytics. Decline/withdrawal persists locally. Do Not Track and Global Privacy Control override consent. If local storage is unavailable, collection stays off.

Events prepared:

- `page_view`: a known portfolio route is viewed after consent.
- `projects_view`, `services_view`, `contact_view`: a section enters the viewport once per route visit/consent session.
- `project_open`: an existing case-study or walkthrough link is clicked.
- `video_play`: an explicit full project video actually starts, once per opening; muted hover previews are excluded.
- `contact_click`: an enabled email link is clicked, once a real address is configured. **This is intent, not a delivered enquiry.** Add a booking hook or actual form success event only when those flows exist.

Payloads contain only the event, known pathname, hostname, website configuration ID, and optionally a known project name. Query strings, fragments, form contents, email addresses, referrers, and visitor IDs are excluded. Requests omit credentials and referrers. The collector still receives ordinary network information, including IP address and user-agent headers; review its retention/settings and publish the appropriate privacy notice before activation. Consent UI is not a substitute for that review.

Run `npm run test:analytics` for the adapter tests. The consent UI was additionally checked in Chrome using a mocked collector: no request before consent, collection after consent, withdrawal across reload/navigation, and suppression with GPC.

## Verification

Build, lint, and analytics tests pass. Responsive checks at 320, 390, 768, and 1440px showed no horizontal overflow. Elara and Nomi's full videos started with sound and supported mute/re-enable and Escape dismissal. Browser checks found no external Google Fonts or analytics requests in the unconfigured build.

Fresh baseline on this expanded portfolio: performance 66, accessibility 96, best practices 100, basic SEO 100; FCP 4.48s, LCP 5.24s.

Three repeated mobile Lighthouse runs after loading improvements returned performance 78 / 92 / 91 (median 91), accessibility 100, best practices 100, and basic SEO 100. LCP was 4.43 / 3.17 / 3.07s (median 3.17s); FCP median was 1.30s. These repeated runs deliberately expose variability instead of reporting only the best result. The slower LCP remains above the good threshold, so loading is improved, not declared perfect.

Lighthouse measurements are simulated mobile lab results, not field data. Repeat after launch on the actual hosting/CDN. The good LCP field threshold is 2.5 seconds at the 75th percentile: https://web.dev/articles/vitals. Deferred dashboards were also expanded and checked with axe, rather than relying on their unloaded state for the homepage's accessibility score. Additional mobile preview labels found on case-study pages were corrected separately.

The verification above was originally performed before committing, pushing, or deploying these changes.

## Privacy notice and production indexing update

The `/privacy` route is linked from the homepage footer, every case-study footer, and the analytics consent panel. It describes the actual optional event collection, local consent storage, browser privacy signals, Umami network metadata/session processing, withdrawal, third-party links, and provider-dependent retention. It does not claim complete anonymity or certify legal compliance.

Olaoluwa requested production indexing be enabled: `.env.local` now sets `SITE_INDEXING_ENABLED=true`. This enables both index/follow metadata and `Allow: /` in robots when rebuilt. `/sitemap.xml` includes `/privacy` alongside the homepage and four project routes, all under `https://delightech.net`. Set indexing false for externally hosted staging builds.

Privacy contact remains pending at Olaoluwa’s request. The intended mailbox is `hello@delightech.net`; **do not publish it as a working address until it is registered and tested**. When ready, set `PRIVACY_CONTACT_EMAIL` in the hosting environment and rebuild. `.env.example` reserves the field, with no guessed address.

Before approving public launch, confirm the Umami account region and retention period, the hosting/logging practices, the privacy mailbox, and the final notice wording. The notice deliberately marks missing contact/provider settings in the local preview. This is a factual draft for review, not a legal-compliance guarantee. These changes have not yet been deployed; publishing them on the live domain requires approval.

Verification: production build, lint, and adapter tests pass. All six public routes render index/follow directives and confirmed-domain canonicals. Robots and sitemap return 200, with six sitemap URLs. The privacy page was checked at 320/390/768/1440px without overflow, with no WCAG A/AA axe violations, and with JavaScript disabled. Its consent panel stays collapsed while reading the notice; the privacy link and withdrawal controls were tested using a mocked collector, without sending test records to the real Umami account.

## Approved Git handoff — October 3, 2026

Olaoluwa authorized committing and pushing the portfolio changes to `main`. Google Search Console/sitemap submission is deferred; the existing discovery routes remain in the repository. `.env.local` remains ignored and is not part of the commit. Production hosting must receive the analytics configuration separately. A Git push may trigger the host's connected deployment workflow; it does not verify the live deployment or submit anything to Google.
