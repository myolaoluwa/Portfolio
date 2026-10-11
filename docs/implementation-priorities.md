# DelighTech implementation roadmap

Preserve the approved cinematic structure, palette, portrait, phone previews and films. No fabricated results, testimonials, offices, team credentials, or delivery guarantees. Implement and verify each phase before moving on; commits and deployment require owner approval.

## 1. Production consistency and release safeguards — in progress

- Repair contact regression selectors; verify email, booking and availability independently.
- Add consent-controlled `booking_click` measurement. This is intent, not a completed meeting.
- Prevent Vercel preview/development builds inheriting production indexing. This is search configuration, not authentication; protect confidential previews through hosting access controls.
- Add scoped security headers without introducing a script policy that breaks static rendering or video playback.
- Automate lint, unit tests, production build and route/header/search-discovery checks.
- Owner decision confirmed: keep apex `https://delightech.net`. Change the hosting redirect; do not introduce an application redirect against the current upstream redirect.
- Owner privacy details confirmed: `hello@delightech.net`, Umami Cloud Hobby, US region, six-month analytics retention. The notice now uses these details and explains external Calendly booking. Provider-specific hosting logs remain described without an invented retention period.
- Deployment task: add analytics public configuration to the hosting production environment and rebuild. Local `.env.local` is not deployed by Git.
- Exit gate: all local checks pass; domain and privacy facts resolved; verify the approved deployment's routes, headers and consent behaviour.

## 2. Client clarity and conversion — implemented locally; preview review pending

- Retain the creative headline; explain what businesses can hire DelighTech to build.
- Give opening visitors clear work and booking choices without forcing the chapter tour.
- Add a contact/booking close to all four project stories.
- Clarify sign-in requirements for external apps, and distinguish public walkthroughs from live demos.
- Confirm tree versus current architectural opening before changing imagery.
- Exit gate: review desktop/mobile hero layouts, all chapter transitions, keyboard flow, enquiry links and video interactions; no unverified promises.

### Phase 2 implementation — October 10, 2026

Retained the creative headline and cinematic assets. The opening now identifies DelighTech as a design/software studio, explains the business website/web app/mobile app offer, and prioritises booking with selected work as the secondary action. The optional project tour and a direct services link remain available. The portrait retains its distinct introduction. All four project stories now close with discovery-call, email and service links; Elara/Cashflow live links carry a sign-in caveat, while the portfolio walkthrough remains account-free. No external app access requirement or business outcome was invented.

Short, narrow screens use a smaller opening phone to protect the new links; other product previews are preserved. Compact landscape layouts receive a targeted copy/action layout. Opening-link and project-enquiry assertions were added to regression checks. The tree-versus-city choice remains deliberately unresolved: this phase does not replace the current opening imagery. No commits, pushes or deployments are included in this phase.

Verification: lint, seven unit tests, production build and six-route production checks passed. The responsive chapter/navigation/video audit passed all 11 screen sizes. All four enquiry sections passed link/overflow/automated axe A/AA checks at 320, 390 and 1440px. Separate 320×568, 667×375 and 844×390 checks confirmed opening controls are unobscured and portrait copy clears the bottom controls. Desktop/mobile opening screenshots were visually reviewed. Automated tests do not establish full accessibility or real-device performance; owner visual review remains the next gate.

## 3. Genuine proof and studio credibility — implementation proof and publication system ready; owner evidence needed

- Publish approved team roles, collaboration credits, feedback and documented project outcomes.
- Add verified Google Play URLs for Cashflow/BizFlow.
- Describe actual remote collaboration, milestone reviews and handover practices.
- Keep missing résumé/LinkedIn optional; do not make them launch blockers or invent their content.
- Exit gate: owner approval for all identities, claims, quotes and public links.

### Phase 3 implementation — October 10, 2026

Inspected the existing trust components and evidence data. Retained the approved studio/product/collaboration positioning and empty evidence slots instead of manufacturing proof. Added a public team-profile data model with verification/approval/completeness gates; the studio panel displays only the confirmed CEO identity. No invented specialist names, credentials or role assignments were added. Added regression tests for team publication, evidence approval/attribution/context, ownership labels and store URL safety. Prepared [a simple evidence intake form](trust-evidence-intake.md) for actual team identities, credits, outcomes, quotes, store URLs and working practices.

This is partial Phase 3 implementation, not completion of its credibility objective. The owner still needs to provide genuine materials and approve exact publication wording. Existing process copy remains proposal-dependent; specific communication channels, review cadence, handover deliverables and support guarantees are not asserted without confirmation. No commits, pushes or deployment are included.

Verification: lint, all 11 unit tests, production build and all six public route checks passed. The updated studio panel passed identity, overflow and automated axe A/AA checks at 320, 390 and 1440px; its mobile screenshot was visually inspected. No full responsive audit rerun is claimed for this small panel-only change.

Owner follow-up: additional team profiles were deferred after review; only the confirmed CEO profile remains public. Other team profiles and third-party proof remain pending.

### Credibility refinement — October 11, 2026

Added a concise selected-work proof summary to the homepage and a server-rendered
evidence snapshot to each of the four case-study/walkthrough pages. Visitors can
quickly assess delivery status, studio ownership versus collaborative builds,
demonstrated functionality and implementation decisions, then follow direct
workflow/decision links without signing in. These reuse the already inspected
implementation notes; no new security audit, sole-contributor credit, business
metric or testimonial is claimed. Additional team identities remain unpublished
as requested. Missing approved evidence does not produce public placeholder cards.

Owner clarified that Cashflow's Android app is in Google Play closed testing.
Updated the homepage badge, case-study status, result and evidence boundaries.
The expected 14-day window is not published as a guaranteed release date. The
web-product link remains available and the Google Play button remains hidden
until the actual listing is supplied and approved.

Verification: lint, 18 unit tests, production build and 14 public-route release
checks pass. The new proof audit passes all four pages at 320/768/1440px,
including working evidence anchors, ownership/status wording, absent unapproved
store links, overflow and no-JavaScript access. The Chromium accessibility audit
passes all 14 routes at 393/1440px with no automated A/AA violations, including
keyboard skip and video focus/Escape checks. Mobile/desktop proof screenshots
were reviewed. Third-party validation, approved quotes, named collaboration
credits and measured outcomes remain owner-supplied publication requirements,
not completed work. Changes are local; no commit, push or deployment in this pass.

## 4. Search acquisition and international positioning — implemented locally; launch review pending

- Build substantive service pages for business websites, web apps, mobile apps and ongoing improvements using verified capabilities.
- Add accurate organisation and breadcrumb structured data where applicable; no invented ratings.
- Link services to relevant project evidence and enquiries.
- Prepare useful articles based on actual product decisions, not generic bulk SEO content.
- Start in English; only add German/other locales when translations and ongoing maintenance are approved. No duplicate country doorway pages or false local offices.
- Extend analytics route allowlists, privacy copy, sitemap and route tests with every new route.
- Exit gate: unique metadata, consistent canonicals, crawlable content, schema validation, mobile QA; review actual Search Console data rather than promising rankings.

### Phase 4 implementation — October 10, 2026

Added four substantial static service pages with distinct metadata, scope/fit/boundaries, project evidence, enquiry paths and related service navigation. Homepage cards and project stories link to relevant services. Added factual Organisation and visible-navigation BreadcrumbList JSON-LD, expanded the sitemap to ten pages and added consent-controlled service-page analytics allowlists/tests. No fabricated foreign offices, country doorway pages, ratings, prices or alternate-language pages were added. Prepared [search launch steps and original article briefs](search-acquisition.md); articles are not published before content review. Real Search Console ranking/traffic assessment remains a post-deployment activity, not a claimed result.

Verification: lint, 12 unit tests, static production build and ten-route production checks passed, including unique titles/descriptions, canonicals, parsable factual JSON-LD, breadcrumbs, sitemap and 404 handling. The repeatable service-page browser audit passed all four pages at 320/390/768/1440px with working enquiry links, FAQ interactions, internal anchors, no horizontal overflow and no automated axe A/AA violations. Content remains readable without JavaScript. Homepage service-link/layout checks passed at 320/768/1440px; mobile/desktop service screenshots were visually reviewed. Search provider validation and actual indexing remain post-publication checks. No commit, push or deployment was performed.

## 5. Maintainability, performance and inclusive QA

- Extract static homepage sections gradually, keeping interactive cinema/video islands.
- Consolidate overlapping CSS only with visual regression checks.
- Review meaningful video audio for captions/transcripts; verify on physical devices and Safari/Firefox.
- Validate contact paths, error states, reduced motion, focus and zoom.
- Measure real-user Core Web Vitals and qualified enquiries after deployment. Lab scores alone are not acceptance evidence for field performance.
- Exit gate: no visual regressions; tested device/browser matrix; documented remaining limits.

### Phase 5 implementation — local verification, release checks pending

The homepage now has a Server Component route wrapper. Static Services and Engagement content is passed into the preserved interactive portfolio as server-rendered slots, instead of being imported into its client module graph. The cinema, portrait, navigation, project previews and contact behaviour retain their existing structure and styling. This is a targeted hydration/maintainability improvement, not a claim of measured field-performance gains. No broad CSS rewrite was needed.

Added progressive fallbacks when IntersectionObserver is unavailable: dashboard previews still render, video controls remain usable, and consented click tracking does not depend on section observers. Video load failures and playback guidance now have live status semantics. Added repeatable error-path, reduced-motion, enlarged-content and video focus-restoration checks (`npm run test:usability`, with the same Playwright/Chrome environment as the other browser audits). Enlarged-content checks use 200% CSS zoom and do not replace browser zoom or assistive-technology testing.

Verification: lint, all 12 unit tests, production build and ten-route production checks passed. Local Chrome responsive checks passed all 11 homepage viewport sizes, including compact landscape and video-trigger focus restoration. All 16 service-page checks passed with no automated axe A/AA violations. The usability audit passed unavailable-observer fallback, blocked-media errors, reduced-motion hover, focus/scroll restoration, four enlarged-content routes and JavaScript-disabled homepage service/process content with a working native FAQ. The 390px opening screenshot was visually reviewed. These are local regression checks, not an accessibility certification or field-performance measurement.

Release limits: physical iOS/Android, Safari and Firefox have not been verified here. Meaningful project-video speech still needs human-reviewed captions/transcripts; no transcript has been invented. The approved opening asset still needs owner confirmation because the current city composition differs from the earlier tree brief. Live DNS validation, deployed consent/analytics checks, real-user Core Web Vitals, genuine project results, optional résumé/store links and owner visual approval remain separate release work. Do not describe the site as fully certified or guarantee international search rankings. Changes remain local, without commit, push or deployment.

## 6. Operational readiness — publication authorized; account/recovery acceptance pending

Added a read-only production smoke check covering all sitemap routes, indexing,
canonical consistency, essential enquiry links, robots, www redirect and media
asset headers. Prepared six-hourly/manual GitHub monitoring, weekly runtime
dependency audits and reviewed Dependabot updates. No analytics events, enquiries,
bookings, paid services, account settings or DNS mutations are introduced.

The [operational runbook](operational-readiness.md) records release/rollback,
alert setup, encrypted backups, restore drills, account security, renewals and
maintenance responsibilities. Prepared automation is not active until published;
notification delivery, backup/recovery drills and account security require owner
confirmation. This phase does not certify complete production readiness or an
LCP/uptime target. Existing visuals and browser bundles are unchanged.

Latest prior release: `84b93fd`, production measurement published October 11,
2026. GitHub run 38140267044 passed and all 14 deployed route checks passed.
Older implementation records below are historical, not the current release state.

## Local checks

### Next phase: production validation and performance measurement — publication authorized

After owner approval, the caption/credibility refinements were committed and
pushed. Added consent-controlled document LCP/INP/CLS reporting through the
existing Umami adapter, minimal rounded payloads, in-memory deduplication,
route-attribution safeguards and keepalive transport. Updated the consent copy
and privacy notice. No accounts, environment files, third-party SDKs or website
visuals were changed. See [performance measurement](performance-measurement.md)
for review instructions and sampling limitations. This is measurement
infrastructure, not a claim that the 2.5-second LCP target has been reached.

The owner has authorized committing and pushing this implementation. Automated unit/browser
checks use mocked collectors, not fabricated Umami visits. Real field results,
physical-device/assistive-technology checks and genuine third-party project
evidence remain outstanding acceptance tasks.

```sh
npm run lint
npm run test:unit
npm run build
npm run test:production
```

`test:production` starts and stops a local production server on port 3107, or uses `BASE_URL` when supplied. The test validates code-level metadata consistency, not the hosting provider's preferred-domain redirect. The full responsive audit additionally requires an installed Playwright module and Chrome/browser binary; set `PLAYWRIGHT_MODULE`, `CHROME_PATH`, and `BASE_URL`, then run `npm run test:landing`.

CI intentionally runs without analytics configuration. Browser consent tests must mock/block collector requests rather than writing fake visits to Umami. Running automated checks does not certify accessibility, security, legal compliance or SEO ranking.

## Phase 1 implementation record — October 10, 2026

Implemented locally: contact/booking regression checks, `booking_click` classification and consent tests, response-header hardening, Vercel preview indexing protection, seven unit tests, production route/header/metadata checks and a read-only GitHub Actions quality workflow. Preserved the existing local availability update. Build, lint, unit tests and local production checks passed. The quality workflow has not run on GitHub because these changes have not been pushed.

The existing video audit's fixed 100ms delay exposed a timing-dependent failure. Direct checks confirmed Escape closes each dialog and restores scrolling; the regression check now waits for those actual conditions with a bounded timeout instead of assuming a frame duration. The full local production audit then passed all 11 viewport sizes, including compact landscape, chapters, navigation, videos, FAQ and internal anchors.

The local production build currently has no active consent controls; end-to-end booking collection was therefore not claimed as verified against a live collector. Analytics unit tests cover consent and payload minimisation. Hosting analytics configuration/rebuild and consent-based verification are still release tasks.

Owner answers received: apex domain and privacy facts are now resolved in local code and documentation. Privacy assertions are included in the production check. Do not mark Phase 1 fully released until hosting configuration and deployment verification are complete. No commits, pushes, hosting settings or provider accounts were changed.

After the privacy update, lint, all seven unit tests, the production build and all production route checks passed again. The updated privacy page passed 320/390/768/1440px checks without horizontal overflow or automated WCAG A/AA axe violations, rendered its approved contact link, and remained readable without JavaScript. Its mobile screenshot was visually inspected. These checks do not certify legal compliance or complete accessibility.

## Phase 1 hosting handoff — redirect completed; code release still required

On October 10, 2026, at the owner’s request, the authenticated Vercel CLI updated the linked `portfolio` project’s domain settings: removed the apex-to-www redirect, verified the apex served production, then configured www-to-apex with status 308. Live checks passed for the homepage, privacy, robots, sitemap and a project URL with a query string. Paths/queries are preserved, the followed redirect has no loop, and the homepage canonical agrees with the apex. No DNS records, environment variables, Git commits or deployments were changed. The live site still serves the previously deployed code; the local privacy/security/analytics changes await release.

1. **Completed:** `delightech.net` serves Production directly, with no redirect to www.
2. **Completed:** `www.delightech.net` permanently redirects to the apex with 308. For future changes, remove the opposite redirect before reversing direction to avoid a loop. See [Vercel’s domain redirect instructions](https://vercel.com/docs/domains/working-with-domains/deploying-and-redirecting).
3. Keep Namecheap’s Zoho MX, SPF, DKIM, DMARC and Google verification records intact. This is a hosting redirect change, not an email DNS migration.
4. In Vercel’s Production environment variables, use `SITE_URL=https://delightech.net` and `SITE_INDEXING_ENABLED=true`. Supply the existing Umami collector URL and website UUID through `NEXT_PUBLIC_ANALYTICS_COLLECT_URL` and `NEXT_PUBLIC_ANALYTICS_WEBSITE_ID`. Never publish account credentials; `.env.local` is not pushed. The privacy email is now approved public copy and no longer requires an environment variable.
5. After owner approval to publish, deploy the updated code with these build-time values. Confirm `https://delightech.net` stays non-www and `https://www.delightech.net/work/elara` redirects to the same path on the apex without a loop.
6. Run `BASE_URL=https://delightech.net npm run test:production`. Confirm the final response URL stays on the apex, all ten public routes pass, `/privacy` shows the approved details, and both discovery endpoints work. Test consent/withdrawal manually; only an intentional consented visit should be used to confirm the real collector. No automated fake traffic should be sent to Umami.

Until this handoff is complete, local Phase 1 readiness is not a claim that the live site has been corrected.
