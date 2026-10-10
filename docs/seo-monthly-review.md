# Monthly SEO and enquiry review

Template only. No metrics below have been invented. Keep exports containing private business/customer data outside the public repository.

Period: [start/end]. Comparator: [previous comparable period]. Deployment/content changes: [dates/URLs]. Search Console property: delightech.net.

## Search baseline

| Metric | Current | Comparator | Interpretation |
| --- | --- | --- | --- |
| Indexed intended pages | Pending Search Console | Pending | Inspect exclusions and Google-selected canonicals |
| Non-branded impressions/clicks | Pending | Pending | Separate service/content discovery from brand searches |
| CTR / average position | Pending | Pending | Interpret by query/page; not as a single success score |
| USA / UK / Australia / Germany clicks | Pending | Pending | Export country breakdown separately |
| Qualified enquiries | Pending owner records | Pending | Use actual completed enquiries, not button clicks |
| Discovery bookings | Pending booking records | Pending | A booking click is only intent |
| Real-user Core Web Vitals | Pending sufficient field data | Pending | No field data is not a pass |

## Collection steps

1. Search Console → Performance → Search results. Select a comparable date range; export queries, pages and countries. Separate brand queries. Do not infer rankings from an indexing request or a `site:` search alone.
2. Pages/URL Inspection: inspect important exclusions, selected canonicals and live fetchability. Record evidence before changing anything.
3. Umami: verify consented production page views and `booking_click`, `contact_click`, `project_open`, `video_play`. Check published Insight routes. Do not compare consent-limited traffic as if it measured every visitor.
4. Owner: count completed enquiries/bookings, note which became suitable projects. Do not import names/emails or confidential proposals into public analytics.
5. PageSpeed/Search Console field data: record mobile/desktop separately. Label lab results as lab results; do not promise rankings from a high score.

## Decision rules

- Intended page not indexed: investigate crawl status, canonical, noindex and content before rewriting metadata.
- Impressions, few clicks: check search intent and title/description accuracy with the actual query.
- Visits, few suitable enquiries: review the offer, proof and contact journey—not only keywords.
- Unsuitable traffic: narrow content towards genuine buyer problems.
- Successful article: improve supporting service/evidence links; do not create duplicate country versions.

Choose at most three next actions, each with an owner, evidence, target page and review date. The 30/60/90-day checkpoints are reviews, not ranking guarantees. Ongoing reporting requires real data and a future review; this commit does not create an autonomous monitoring schedule.
