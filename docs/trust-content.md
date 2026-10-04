# Studio positioning and approved trust content

## Confirmed positioning

Clients hire **DelighTech**, a software studio led by **Olaoluwa, CEO**, with an expert team. Personal “I” copy is appropriate for Olaoluwa’s introduction; offers, delivery, approach, and studio contact use “we” or “DelighTech.” No individual team names, credentials, years of experience, or project-specific roles have been supplied.

Elara and Cashflow are finished products used by real users, as confirmed by Olaoluwa. Usage is described without numbers. Olaoluwa separately confirmed that Cashflow and Bizflow are DelighTech-owned products; Oracle, Elara, and Nomi are collaborations.

## Project origin

Update `projectOrigins` in `src/lib/project-evidence.ts` after confirmation:

- `kind: "independent"`: an independently developed DelighTech product.
- `kind: "commissioned"`: commissioned client work. Include a client name only if approved for publication; anonymous commissions may omit the name.
- `kind: "collaboration"`: work undertaken with or for collaborators. The general label does not claim a specific team role, ownership, or client commission.
- `kind: null`: unconfirmed. Public label remains **Product showcase**, not a client engagement claim.
- `approved: true`: the origin label and any supplied name are approved for public display.

The homepage and case-study labels use the same data. Do not infer project origin from a GitHub account, deployment address, or real-user adoption.

## Reserved evidence slots

`projectEvidence` is intentionally empty. The homepage services area and individual case studies already have reserved rendering slots; no empty testimonial cards or fake client logos appear publicly.

Each future entry requires:

- A unique `id`, project key, and `kind` (`testimonial`, `collaboration`, or `result`).
- A public `title` and `body`.
- Approved `attribution`: a testimonial author/role, exact collaboration credits, or the source of a documented result.
- Public `context`: relevant project/version, contributor responsibilities, or measurement method and period. Avoid implying correlation proves causation.
- `verified: true` only after checking the original evidence.
- `publication: "approved"` only after approval to publish the exact wording, identities, and details.

Unverified, draft, or incomplete entries are not rendered. Testimonials retain the approved quote rather than invented marketing copy. Collaborations identify the actual responsibilities without crediting Olaoluwa or DelighTech with someone else’s contribution. Results use only supported claims; metrics remain absent until documented.

All values in `src/` must be safe for public delivery. Do not add private customer records, approval correspondence, internal documents, secrets, or confidential financial data. Keep evidence and consent records in an appropriately private location outside the published source; use only the approved public summary here.

## Still needed from Olaoluwa

DelighTech owns Cashflow, built for businesses, and Bizflow, built for network marketers and business owners. Both are labelled **DelighTech-owned product**, not commissioned client work. Oracle, Elara, and Nomi are labelled **Collaboration**; detailed credits remain pending.

### Reserved Google Play links

`projectStoreLinks` in `src/lib/project-evidence.ts` reserves Cashflow and Bizflow listing URLs. Both are currently null and unapproved, so no empty, disabled, or guessed download link appears. Olaoluwa will supply Cashflow's Play Store link; Bizflow's exact listing link is also pending. Once the correct app identity is checked and publication approved, set the URL and `approved: true`. Only HTTPS `play.google.com/store/apps/details` links with an app ID render. The shared component updates the project cards and the Cashflow case study together.

1. The exact Google Play listing URLs for Cashflow and Bizflow.
2. Approved project-specific team/collaborator credits.
3. Documented results, including measurement context when applicable.
4. Any genuine client quotes and explicit approval to publish their words and attribution.

The studio identity is implemented now. Third-party proof remains pending these materials; the site does not claim that such proof has already been supplied.
