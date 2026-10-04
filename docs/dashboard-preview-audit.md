# Project preview audit — October 3, 2026

Compared the five projects displayed in the portfolio against the latest GitHub `main` branches. Inspected UI components, dashboard routes, navigation, styles, and Oracle's demo provider/detection engine. No repositories or live project accounts were modified.

| Project            | Source revision | Relevant source                                                                                                                               | Correction                                                                                                                                                                         |
| ------------------ | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Elara              | `801ccff`       | `src/app/page.tsx`, `src/components/app-shell.tsx`, `src/lib/navigation.ts`, `src/app/globals.css`                                            | Full sidebar, daily briefing, four operational metrics, schedule and priority queue.                                                                                               |
| Oracle             | `1977e58`       | `src/features/radar/components/radar-shell.tsx`, `src/app/globals.css`, `src/lib/market-data/demo-provider.ts`, `src/lib/detection/engine.ts` | Dark radar workspace, editorial hero, signal filters, evidence metrics; AXIOM/NOVA replace invented BONK/JUP/WIF signals.                                                          |
| Cashflow (private) | `da073ef`       | `apps/web/app/books/page.tsx`, `apps/web/app/components/app-shell.tsx`, `apps/web/app/globals.css`                                            | Current cashbook workspace replaces a generic balance/chart dashboard. Retains source logo, dark green sidebar, book totals, search/sort controls, book rows and organization tip. |
| Nomi               | `05b30ed`       | `apps/web/src/App.tsx`, `apps/web/src/styles.css`                                                                                             | Overview navigation, balance/in/out/time metrics, shared timeline, quick actions and reflection card.                                                                              |
| BizFlow (private)  | `b70665d`       | `src/App.tsx`, `src/planning/Today.tsx`, `src/styles.css`                                                                                     | Activity Planner, Day/Week/Month selector, Today's Focus, This Week, Coming Up and planning totals replace the fabricated wellness dashboard.                                      |

## Representation and limitations

- These are condensed **source-based interface previews**, not authenticated screenshots or functioning copies of the projects. Their captions explicitly state that values are illustrative sample data.
- No real account records, credentials, customer details, or private operational data are displayed. Sample dates are fixed rather than pretending to be live.
- Preview navigation and controls are static, non-focusable illustrations. The portfolio's actual project links and video controls remain interactive.
- At smaller sizes previews simplify navigation and metric grids to stay within their cards. They are not pixel-for-pixel reproductions of the original applications' responsive breakpoints.
- Cinematic phone screens for Oracle, Elara, Cashflow and Nomi now use separate source-based mobile compositions from the same audited revisions. They follow mobile headers, navigation, content hierarchy, spacing and palettes rather than the old shared phone UI. Oracle has four bottom tabs; Elara has a menu/search header, stacked briefing and single-column metrics at a 390px source viewport; Cashflow has a guide, list-first books view, floating add button and three bottom tabs; Nomi has two-column metrics and a horizontal nine-item navigation strip. Phone frames and cinematic behavior are unchanged.
- Hero previews represent a scaled 390px mobile viewport. Content naturally below the first screen is clipped rather than compressed or rearranged to fit. These remain illustrative compositions, not authenticated screenshots; static controls are not interactive.
- Supplied Elara/Nomi videos are preserved as historical project footage. They may show earlier product versions.
- Private repository source links remain excluded from public-facing cards. Existing live project links are retained.
- Contact placeholders, portrait treatment, cinematic chapters and existing portfolio structure are unchanged.

## Verification

- ESLint, TypeScript, and production build passed.
- Browser QA at 1440px and 390px: five previews render, no page errors or horizontal document overflow. Expanded interface stills and inspected each rendered preview.
- No commit, push, deployment, or changes to the source applications.
