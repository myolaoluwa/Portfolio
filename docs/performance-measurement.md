# Consented performance measurement

Local implementation — October 11, 2026. Uses the existing Umami collector and
Next's built-in `next/web-vitals` hook; no new package, account or environment
variable is required. Hosting still needs the existing public analytics values
and a rebuild. This feature does not itself improve LCP or prove a field pass.

## What is sent

| Event | Value | Good threshold |
| --- | --- | --- |
| `web_vital_lcp` | Rounded milliseconds | ≤ 2,500 ms |
| `web_vital_inp` | Rounded milliseconds | ≤ 200 ms |
| `web_vital_cls` | Unitless score, three decimal places | ≤ 0.1 |

Each event contains only `value`, `unit`, `rating`, `viewport` (`compact` at
700px or less, otherwise `wide`) and `scope: document`, plus the existing
allowlisted pathname/hostname/website fields. Compact is a viewport category,
not a reliable phone/device classification. No performance entries, DOM text,
resource URLs, metric IDs, referrers, queries or form data are sent.

Observers run locally from hydration to capture the first interaction correctly.
Every transmission independently checks explicit consent, valid configuration,
Do Not Track and Global Privacy Control. Denial, withdrawal or unavailable
storage blocks collection. Rejected samples are not queued to send on consent.
Local metric IDs deduplicate callbacks in memory only; they are never transmitted
or persisted. Keepalive requests help small final samples finish when a page
is hidden; network delivery is not guaranteed.

These are document-load samples, not SPA route-load measurements. Samples are
discarded if the current pathname differs from the original document pathname,
avoiding attribution to a later route. The first permitted final report for
each metric ID is sent; later same-ID updates are ignored. Some browsers lack
particular metrics, and INP requires actual interaction. Missing data is not zero.

## Review in Umami after an approved deployment

1. Select the DelighTech website and an appropriate date range.
2. Look for the three event names above in the event reports.
3. Inspect event data, comparing compact and wide samples separately.
4. LCP/INP values are milliseconds; CLS is a score, not milliseconds.
5. Record the sample count, collection period and changes deployed during that
   period before comparing results. Do not treat an average or one good sample
   as a 75th-percentile pass.
6. Compare with Search Console/PageSpeed Insights field data when available.
   This consented, browser-dependent subset is not Google's CrUX population.

No real visits or measurements were fabricated. Actual dashboard ingestion and
field results require approved deployment, configured analytics and visitors
who consent. Do not repeatedly generate fake traffic to populate these reports.

## Verification

Adapter unit tests cover minimal payloads, rounding, rating thresholds,
deduplication, invalid metrics, unknown paths, SPA changes, consent withdrawal,
DNT/GPC and storage failures. `npm run test:performance` uses a mocked collector;
it never contacts the real provider. An unconfigured build validates no collection
only. A configured local test build additionally verifies an actual browser LCP
callback and withdrawal across reload. It uses dummy public configuration, not
account credentials; the normal environment build is restored afterward.

Local verification passed: lint, 20 unit tests, production build, all 14
route/header/search-discovery checks, the full Chromium browser suite and the
configured mocked-collector LCP/withdrawal check. A final targeted usability
check also passed after the native video focus recovery was added. The published
credibility/caption release was checked separately against the live site's 14
routes. The owner has authorized committing and pushing the measurement code;
release CI and deployment must be verified separately. No real Umami ingestion,
field percentile or physical-device result is claimed.

Published caption/credibility release: `7365fad`. GitHub run
[38139722127](https://github.com/myolaoluwa/Portfolio/actions/runs/38139722127)
passed Chromium, Firefox and WebKit. The intermediate runs exposed WebKit's
native caption preference/loading behaviour and native-video focus escape;
the test now explicitly selects captions, and the component recovers focus
only when it leaves an open dialog. This cross-browser result applies to the
published release, not to the new performance measurement release candidate.

References: [Next hook documentation](https://nextjs.org/docs/app/api-reference/functions/use-report-web-vitals),
[Google Web Vitals](https://web.dev/articles/vitals),
[Umami event payload](https://docs.umami.is/docs/api/sending-stats).
