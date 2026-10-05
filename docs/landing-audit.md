# Landing-page audit — 4 October 2026

## Scope

Reviewed landing-page composition, cinematic scroll state and motion handling, navigation, project previews, video dialogs, contact conversion, consent UI, heading structure, responsive styles, and production route/build behavior. Preserved existing artwork, portrait, phone scenes, project content, videos, service offers, process, and FAQ. No commit or deployment performed.

## Fixes

- Moved all five projects into the selected-work section. Previously the final three were outside its wrapper, giving them different gutters and section semantics.
- Connected the contact panel and primary contact CTA to the user-confirmed, working `hello@delightech.net` mailbox instead of the placeholder and GitHub detour. Set Nigeria's WAT timezone; left availability, LinkedIn, résumé and booking explicitly pending.
- Added a keyboard skip link, navigation `aria-controls`, mobile-menu dismissal on Escape/outside pointer input, focus restoration on Escape, and reset on desktop breakpoint changes. Increased the mobile menu toggle target to 44px.
- Compact landscape hero layouts no longer overlap the header, metadata, phone, and continuation controls. Chapter scrolling and the original portrait transition remain intact.
- Preserved a main heading after switching to product chapters. Marked duplicate decorative project numbers and the contact stamp as decorative and improved their contrast.
- Constrained the consent panel to the available viewport height, with scrolling on short screens and 44px button targets.
- Track section visibility from headings rather than very tall section rectangles. This prevents the expanded selected-work section from missing its analytics visibility threshold. Collection still requires consent.

## Verification

- ESLint, production build/TypeScript, analytics adapter tests, and `git diff --check` passed.
- Browser regression coverage: 320×568, 375×667, 390×844, 430×932, 700×900, 768×1024, 1024×768, 1440×900, 1920×1080, 844×390 and 667×375.
- Tested five chapters, hero bounds, document overflow, mobile menu, all main sections, project still disclosure, both video dialogs (unmuted on opening, Escape closing, restored body scroll), FAQ, and internal fragment targets.
- Production axe WCAG A/AA checks at 320, 390, 844 and 1440px: no violations found. Automated checks do not establish complete accessibility compliance.
- Portrait copy transition confirmed. Privacy, four case-study routes, sitemap and robots returned HTTP 200 locally.
- Analytics requests blocked in browser regression tests; no test enquiries or external messages sent.

## Run the browser regression audit

With Playwright available, run `node tests/landing-audit.cjs` against localhost:3000. Set `BASE_URL` to test a different local server. `PLAYWRIGHT_MODULE` can point to an existing Playwright installation, and `CHROME_PATH` can point to a local Chrome executable. The audit does not require a new production dependency. Set `AUDIT_SCREENSHOTS` to an existing directory if full-page captures are needed.

## Remaining items, not invented or silently enabled

- Approved LinkedIn, résumé, booking, availability, Play Store links, testimonials, credits and measured project results still require owner-provided information.
- The privacy notice's pending contact/provider details should be reviewed separately before treating it as final.
- The architecture retains a large global stylesheet and client-rendered landing-page component. A future scoped extraction of static sections can improve maintainability; this audit avoided a risky wholesale rewrite.
- Browser emulation was used, not physical iOS/Android hardware. Real-device checks, screen-reader review, cross-browser coverage, external demo availability and field performance remain separate verification steps. No new Lighthouse score or performance guarantee is claimed.
- Email-template work is separate and unchanged by this audit.
