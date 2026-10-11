# Production refinement: phases 1–3 — October 11, 2026

This records the three phases requested after the latest design/performance
audit. These are not the earlier five-phase implementation plan. The owner
authorised implementation, commit and push. No fabricated project results,
credentials or contact links are included.

## 1. Mobile rendering and loading

- Static homepage sections moved out of the cinematic client module graph into
  `PortfolioContent`, rendered on the server. Interactive navigation, cinema,
  videos and deferred product dashboards keep their client boundaries.
- Optional signature fonts avoid a late headline font swap on slow cold visits;
  only two signature fonts preload. Upright serif uses a separate, non-preloaded
  font. Phones use native body/label typography while keeping branded headings.
- Opening WebP quality 60 reduces transferred bytes without changing its source.
  Hidden portraits, unopened films and detailed interfaces remain deferred.
- Compared inline CSS with independently cached external stylesheets. See
  `lcp-refinement.md` for measurements, the chosen configuration and trade-offs.

Implementation is verified; a consistent **LCP ≤2.5 s** and a field Core Web
Vitals pass must not be claimed from these local tests. Collect deployed mobile
measurements and real-user p75 when traffic is sufficient.

## 2. Client-facing design and clarity

- Booking and selected work remain the primary opening actions. The tour and
  services retain secondary styling. Booking announces its new-tab behaviour.
- Skip-intro control now has a clearer contrast-backed outline and 32px target.
- Cinematic track reduced from 520 to 440 viewport heights (about 15%) without
  removing any chapter, portrait, phone preview or project.
- Selected-work introduction uses client-facing language, not internal
  publication-approval instructions.
- Unavailable LinkedIn/résumé buttons are removed. Email, actual availability
  and working Calendly booking remain. Add genuine links once supplied.
- Current city imagery is preserved. Returning to the original tree concept
  requires an explicit visual decision, not an unapproved asset replacement.

## 3. Inclusive interaction and regression protection

- Pinned Playwright and axe-core as development dependencies.
- Added `test:accessibility` for all sitemap pages at phone/desktop widths:
  WCAG A/AA automated rules, one H1, overflow, visible keyboard focus, intro
  skip, video modal focus containment, Escape and trigger focus restoration.
  The contrast scan forces off-screen project cards to render so deferred-paint
  background sampling cannot conceal or falsely report their colours; contrast
  rules remain enabled and production rendering behaviour is unchanged.
- Added `test:browser` to run responsive landing, loading, service, article,
  Cashflow, usability and accessibility checks against a production build.
- CI installs Chromium, Firefox and WebKit, runs the browser suite and audits
  production dependencies after lint, unit, build and metadata checks.
- Existing tests protect reduced motion, media-load errors, unavailable
  IntersectionObserver, 200% CSS enlarged-content reflow and no-JavaScript
  content/FAQ access. CSS enlargement is not physical browser-zoom testing.
- Analytics requests are blocked by browser tests; no bookings or enquiries
  are submitted during verification.

### Verification and remaining acceptance checks

Local lint, 16 unit tests, production build, 14-route production checks and the
full Chromium browser suite passed. Automated axe scans have zero reported
A/AA violations on all 14 pages at both 393px and 1440px. All 13 landing sizes,
including compact landscape phones, passed. Hero/contact screenshots were
reviewed; existing project audio remains user-activated.

Current Playwright bundled browsers cannot install on this Mac's OS version.
Local Chromium checks use installed Chrome; CI performs Firefox/WebKit checks.
WebKit emulation does **not** prove a physical iPhone/Safari pass.

Remaining human checks: physical iPhone/Android, VoiceOver/TalkBack, browser
zoom and meaningful video audio review. Both showcase files contain AAC audio
(Elara ~23 s, Nomi ~43 s), but this does not establish whether they contain
speech. The owner has been asked to confirm/provide transcripts. No invented
captions or blanket WCAG certification are published.

`npm audit --omit=dev` reports zero known production vulnerabilities. Full
audit reports five development-only dependency entries caused by the braces
advisory GHSA-vfj7-8cjw-p6xm through Next's ESLint plugin. The registry's latest
braces version is still affected at this check; do not force-downgrade Next's
ESLint config to v14 as npm suggests. Track the upstream fix and rerun audit.

## Repeat the checks

```sh
npm ci
npm run lint
npm run test:unit
npm run build
npm run test:production
npx playwright install --with-deps chromium firefox webkit
BROWSER_ENGINES=chromium,firefox,webkit npm run test:browser
```

On this Mac, skip browser installation and use the installed Chrome:

```sh
CHROME_PATH='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' npm run test:browser
```

The suite starts and stops its own server unless `BASE_URL` is supplied. Keep
performance measurements separate from the browser suite or other CPU-heavy
work. Never commit `.env.local` or provider credentials.
