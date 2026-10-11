# Mobile loading and hero refinement — October 11, 2026

Status: implementation verified locally; production checks required after this release.

## Changes

- Removed the generic opening phone illustration from narrow-screen opening/portrait chapters. The offer, description and booking links no longer sit behind it. Desktop opening illustration and the four real project phone interfaces remain.
- Portrait-format mobile tour chapters allocate remaining height to each phone after its copy, rather than relying on a fixed bottom position. Compact landscape layouts retain their existing side-by-side treatment.
- Detailed mobile dashboard code loads on entry to the project tour. The portrait image starts downloading when its scroll reveal begins and remains available when scrolling back.
- Hero image uses the explicitly allowed quality 65 variant; existing images keep quality 75. No identity, composition or asset replacement was introduced.
- Closed video dialogs no longer download their full-size posters. Optimised lazy card posters and user-initiated audible videos remain unchanged.
- Off-screen project cards use browser-native `content-visibility: auto` with intrinsic block-size estimates. Their document content and links remain present. This may affect the reading-progress estimate while previously unseen cards obtain their measured height; it does not change cinematic chapter travel.

## Checks

- ESLint, TypeScript/production build and 16 unit tests passed.
- Landing journeys passed at 13 sizes: 320×568, 375×667, 393×740, 390×844, 430×932, 540×940, 700×900, 768×1024, 1024×768, 1440×900, 1920×1080, 844×390 and 667×375. Added real hit-target and phone/copy intersection assertions, rather than checking overflow alone.
- Mobile loading audit passed against the production build: no hidden portrait, unsolicited video or closed-dialog poster transfers; working opening actions, portrait reveal and project phone loading. Automated axe WCAG A/AA scan passed.
- Existing usability checks passed: missing IntersectionObserver fallback, reduced motion, media-error announcement, close/focus/scroll restoration, enlarged-content reflow and no-JavaScript service/process content.
- All 14 public-page metadata/schema/header checks, robots, sitemap and unknown-route 404 checks passed against the local production build.
- Opening, portrait and first-project mobile screenshots reviewed at 393×740.

## Local mobile Lighthouse diagnostics

Same CLI/mobile preset and Chrome installation, local production server, without collecting analytics:

| Metric | Fresh baseline | Final changed build |
| --- | --- | --- |
| Performance score | 56 | 79 |
| LCP | 4.6 s | 2.8 s |
| Total blocking time | 1,670 ms | 660 ms |
| CLS | 0.001 | 0.001 |
| Total initial transfer | 453,272 bytes | 368,231 bytes |
| Image transfer | 133,934 bytes | 52,605 bytes |
| JavaScript transfer | 169,656 bytes | 165,734 bytes |
| Accessibility / best practices / basic SEO | 100 / 100 / 100 | 100 / 100 / 100 |

An intermediate run before the hidden-poster correction scored 87 with 3.9 s LCP and 120 ms blocking time. The variance demonstrates why a single lab score is not a stable product guarantee. The final transfer reduction is approximately 19%; LCP improved in this run but still exceeds the 2.5 s good target. These are simulated local measurements, not production field Core Web Vitals, rankings or real-user guarantees. No comparison to historical October 10 scores is implied.

After owner approval and release, verify the deployed build on representative phones and repeat production mobile tests. Profile the remaining critical stylesheet/font and hydration work if LCP remains above target. Manual assistive-technology testing and field data are still needed for broader accessibility/performance conclusions.
