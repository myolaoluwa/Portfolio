# Mobile LCP refinement — October 11, 2026

Status: included in the owner-authorised phases 1–3 release. LCP acceptance
remains open; implementation/test completion is not a field-performance pass.

## Diagnosis and implementation

The Lighthouse mobile LCP element was the opening headline, not the cinematic
background. Its first paint and subsequent font rendering were on the critical
path. Reducing the artwork quality again would not address this bottleneck.

- Space Grotesk, the italic Instrument Serif headline and DM Sans use
  `font-display: optional`. On slow cold visits the browser can retain fallback
  typography instead of swapping fonts late. Fast/cached visits retain the brand
  fonts. Next's automatic metric-adjusted sans fallback remains enabled.
- Only the two opening headline fonts are preloaded. Body and upright serif
  fonts load when needed. The normal serif has its own variable so case-study
  headings retain their correct upright font rather than synthesising it.
- Phones up to 700 px wide use native system sans/monospace for body copy and
  small labels. Signature display/italic headings retain the branded fonts.
  Desktop body typography is unchanged. This avoids downloading the body and
  mono fonts for the opening mobile viewport.
- Static portfolio sections now render through `PortfolioContent`, a Server
  Component passed into the cinematic Client Component as children. Their
  copy, layout and server-rendered icons no longer live in the cinematic client
  module graph or rerender when the current chapter changes. Interactive video,
  deferred dashboard and navigation components retain their client boundaries.
- Next 16.3.8's experimental `inlineCss` was tested, not enabled in the final
  configuration. It removes a stylesheet round trip but duplicates the large
  shared CSS in HTML and RSC. The final external-CSS comparison had similar
  median LCP with 48,860 fewer initial transfer bytes and independent stylesheet
  caching. Keep the standard cached stylesheet path rather than retaining an
  experimental feature without a demonstrated consistent advantage.
- Cinematic artwork, portrait, project interfaces and video audio behaviour are
  preserved. Phase 2 shortens the optional cinematic track and improves skip
  visibility without removing its chapters.
- The existing opening WebP uses quality 60 instead of 65 (the 828 px variant
  falls from 51,056 to 48,380 bytes). AVIF was tested in memory and rejected
  because it was larger for this image at the equivalent setting. Source assets
  were not replaced or edited.

## Verification

Lint, TypeScript/production build and 16 unit tests passed. All 13 responsive
landing journeys, mobile-loading checks, usability checks (including no-JS), and
all 14 public-page production checks passed. Mobile screenshots were reviewed.
The mobile audit now guards optional headline font display, the two-font preload
budget, native small-text fonts and blocked-font fallback usability.

Measurements use the same default mobile Lighthouse CLI preset, Chrome 154,
local production server on port 3111 and separate cold browser runs. No analytics
was permitted. These are simulated lab numbers, not field data.

| Build / test series | LCP | Performance | CLS |
| --- | --- | --- | --- |
| Fresh unchanged baseline in this session | 3.696 s | 88 | 0.001 |
| Earlier inline CSS/mobile typography, quality 65, three runs | 2.505 / 2.453 / 2.585 s | 86 / 78 / 93 | 0 |
| Earlier inline CSS, quality 60, three runs | 3.370 / 2.997 / 2.960 s | 69 / 92 / 83 | 0 |
| Phase 2 + inline CSS comparison, two runs | 3.057 / 3.061 s | 88 / 93 | 0 |
| Final external CSS build, three runs | 3.354 / 2.500 / 3.032 s | 90 / 97 / 91 | 0 |

The final series median is **3.032 s: the strict 2.5-second target is NOT yet
verified consistently**. The middle run is 2,499.618 ms, but one successful run
does not establish consistent performance. Do not advertise a pass by rounding
earlier 2.505 s down or selecting one favourable result. Background CPU load and Lighthouse
benchmark readings varied materially across runs; no user applications were
closed to manipulate results. Quality 60 saved bytes but did not prove a further
LCP improvement. Final initial transfer is 303,528 bytes versus the previous
released build's 368,231 bytes (about 18% lower); initial JS is approximately
160 KB versus 166 KB. The external-CSS configuration saves about 49 KB versus
the final inline-CSS comparison.

Next: verify the deployed build under a
quiet, controlled mobile test environment and representative real phones. If
the deployed p75 remains above 2.5 s, profile first-paint stylesheet size and
hydration/main-thread work with a performance trace before further visual cuts.
See `production-refinement-phases.md` for the release checks and limitations.

Lab results are diagnostic, not a promise for every network or a field Core Web
Vitals pass. Google's good LCP target is at most 2.5 seconds for at least 75% of
real visits. Verify the deployed release with PageSpeed Insights and Search
Console field data when enough traffic is available.

Reference: https://web.dev/articles/optimize-lcp
