# Case-study evidence

The Elara and Cashflow case studies and Oracle and Nomi product walkthroughs are additive portfolio refinements. The cinematic homepage, existing media, and contact placeholders remain in place. No deployment, commit, or push is part of these changes.

## Status and attribution

Olaoluwa confirmed that both products are finished products with real users and requested descriptions without numbers. No user counts, testimonials, measured business outcomes, project durations, or sole-contributor credits are inferred. “Work covered” describes implementation scope, not verified team attribution.

## Implementation sources inspected

### Elara

Source revision: `801ccffb4dcc0fd87b090c2774e5a46a8b8501b0`.

- `README.md`: operational workspace, provider configuration, workspace-owned APIs, and integration limitations.
- `src/app/page.tsx`: daily briefing, schedule, task/follow-up summaries, and priority queue.
- `src/lib/ai/service.test.ts`: workspace requirements and provider delegation.
- `src/lib/ai/workspace-action-intent.ts`: explicit operational action intents.
- `src/lib/ai/AGENT.md`: grounded context, draft/send distinctions, missing-information handling, and recorded action outcomes. This is evidence about the product's assistant policy, not independent proof that every runtime path satisfies it.

### Cashflow

Source revision: `da073efb9c8492959ccbe636923fe664aa26a736`.

- `apps/web/package.json` and `apps/web/capacitor.config.ts`: Next.js web application and Capacitor Android implementation. The older Expo description does not represent the current implementation.
- `apps/web/lib/permissions.ts`: business membership, book membership, and permission checks.
- `apps/web/lib/book-policies.ts` and its tests: duplicate-entry policy, closed dates, receipt thresholds, and expense limits.
- `apps/web/app/api/transactions/route.ts`: transaction policy checks and idempotency-key handling.
- Cashbook interfaces: desktop overview/search/sorting and mobile workspace selector, cashbook list, add action, and bottom navigation.

Cashflow's source is private. The public case study does not link to it or reproduce customer records.

### Oracle — account-free walkthrough

Source revision: `1977e588fb378bf47ed47319ea9d5d5129634ae8`.

- `README.md`: radar, token/wallet investigation, following, alert preferences, provider configuration, and anonymous local demo sessions.
- `src/features/radar/components/radar-shell.tsx`: filter categories, signal explanations, supporting metrics, and the investigation panel.
- `src/lib/market-data/demo-provider.ts`: deterministic illustrative AXIOM/NOVA observations, not live market signals.

The public page uses existing source-based desktop and mobile previews plus a plain-language workflow. It is explicitly a static guided preview, not an interactive trading terminal. No account, wallet connection, live-data promise, trading result, or adoption claim is required or inferred.

### Nomi — account-free walkthrough

Source revision: `05b30ed544dba4b82e5d24adccccc7f0f238f6ab`.

- `README.md`: implemented V1 scope, records-based questions and consent, import preview/save flow, and exclusions such as bank-provider sync and native binaries.
- `apps/web/src/App.tsx`: overview metrics, recent events, quick actions, reflection, and navigation to focused views.

The public page reuses the supplied Nomi film and source-based desktop/mobile previews. The film may show an older interface. Sample records are not real account data, and no new account or backend is created. No measured productivity result or real-user adoption is inferred for Nomi.

## Presentation boundaries

- Desktop and mobile previews reuse the existing source-based components and contain illustrative records.
- Elara's recorded film may represent an earlier interface version; the page states this explicitly.
- Oracle and Nomi carry their own preview statuses; they do not inherit Elara/Cashflow's confirmed finished-product and real-user badge.
- Oracle and Nomi homepage walkthrough links appear before optional GitHub source links. The walkthroughs have route-specific metadata and can be read without JavaScript; video playback is progressive enhancement.
- Integration configuration, app-store distribution, security certification, and quantified business impact are not presented as verified outcomes.
- Product-source tests were inspected, not executed as part of the portfolio checks. Portfolio linting, type checking, production build, and browser layout/navigation checks are separate verification activities.
