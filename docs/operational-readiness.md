# Phase 6 — Operational readiness

Owner: Olaoluwa, CEO of DelighTech. This is an operating checklist, not an
uptime SLA, security certification or promise of 24-hour support. No new
paid service, account, DNS change or browser dependency is required by this phase.

## 1. Live checks and alerts

Run `npm run test:operations` from the repository. It reads production only:
all sitemap pages, canonical/indexing policy, essential enquiry links, robots,
www-to-apex redirect with path/query, and logo/hero/video/caption asset headers.
Video checks use HEAD: they do not download films or prove playback. HTTPS
requests verify normal certificate validity, not advance expiry warnings.
No JavaScript executes, no Umami data is submitted and no enquiry is sent.
Requests time out after 12 seconds and retry a transient network/429/5xx error
once; a persistent outage or incorrect page fails the process.

After publication to the default branch, **Production operational checks** runs
every six hours, at minute 17 UTC, and can also be run manually from GitHub
Actions. It is a lightweight periodic smoke check, not continuous monitoring.
The GitHub schedule can be delayed, and inactive public repositories can have
scheduled workflows disabled. Check the actual run history rather than assuming
the schedule is active. [GitHub scheduled-event guidance](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule)

Alert activation, to be completed by the owner:

1. In GitHub Settings → Notifications, enable Actions email/web notifications
   and choose failed-workflow notifications if preferred.
2. Confirm the notification email is monitored. Scheduled notifications go to
   the user associated with the scheduled workflow; do not assume they go to
   `hello@delightech.net` automatically.
3. After publication, open Actions → Production operational checks → Run workflow.
4. Confirm the successful run. Arrange a controlled failing notification test
   in a separate test repository/workflow; never break production to test alerts.
5. Record who receives the alert and who covers absence. The technical delivery
   of an email notification remains unverified until the recipient checks it.

These steps follow [GitHub's notification documentation](https://docs.github.com/en/actions/concepts/workflows-and-actions/notifications-for-workflow-runs).

## 2. Release and recovery

Before releasing:

- Review the diff and protect user changes; keep `.env.local`, `.vercel`, access
  tokens and recovery codes outside Git.
- Run lint, unit tests, build, production checks and the browser suite described
  in [production refinement](production-refinement-phases.md).
- Review the preview on desktop/mobile and manually check mail/booking links,
  video audio/captions, consent and withdrawal without submitting fake analytics.
- Record the approved Git SHA, current production deployment ID/URL and the
  previous known-good deployment in the private release record below.
- Check hosting production variables against `.env.example`. `NEXT_PUBLIC_*`
  values are embedded at build time: a variable change requires a rebuild.
- Obtain publication approval, then commit/push. GitHub checks do not currently
  gate Vercel's automatic production deployment; monitor both independently.

After release, verify the Vercel deployment says Ready and serves the approved
commit on the apex. Run `npm run test:operations` and
`BASE_URL=https://delightech.net npm run test:production`. Confirm the actual
cross-browser GitHub run passed; do not substitute a previous release's result.

If a release breaks the site:

1. Record the failing check, UTC time and affected routes; inspect GitHub/Vercel
   logs. Do not expose visitor data, credentials or environment values in tickets.
2. Pause further releases. Confirm a known-good production deployment exists.
3. With owner authorization, use Vercel project → Production Deployment →
   Instant Rollback; inspect the target/domain list before confirming. Hobby
   rollback eligibility is limited to the previous deployment; verify the
   actual plan/eligible targets. Rollback restores an older build and its
   configuration, not a fresh build with newly edited variables.
4. Re-run both live checks. Manually check contact, media and consent. A deployment
   rollback does not restore Namecheap DNS, Zoho email or Calendly settings.
5. Fix the cause in a reviewed commit; do not reset/rewrite shared Git history.
   Vercel disables automatic production-domain assignment after rollback.
   Use its Undo Rollback/promote flow for the reviewed recovery deployment and
   verify that automatic assignment is restored.

See [Vercel's rollback instructions and limitations](https://vercel.com/docs/instant-rollback).
No live rollback drill has been performed by this phase.

## 3. Backup and restoration

GitHub contains the tracked source and public media, not all operational state.
Maintain an additional encrypted backup outside the laptop and GitHub account:

- Tracked repository and original approved media; verify Git includes each new asset.
- Production-variable inventory and required values, stored in a password manager,
  not this document. The website UUID/collector are public configuration, but
  account passwords/API tokens are not.
- Namecheap DNS export/screenshot, including Zoho MX/SPF/DKIM/DMARC and Google
  ownership verification. Do not change mail records to repair a website outage.
- Vercel domain/redirect configuration and current/previous deployment records.
- Calendly availability/event settings, notification recipients and account
  recovery details. Umami exports if needed before the confirmed six-month
  retention expires; do not retain personal data without a justified purpose.

Quarterly, restore the repository into a **separate disposable directory**,
install from the lockfile, build and run checks. Use an access-controlled preview
with noindex and analytics disabled; do not overwrite the current workspace,
repoint production or upload secrets to a public preview. Record the restore
date and result. Backups/restore drills are owner tasks and are not claimed done.

## 4. Maintenance and access

- Weekly: review failed runs, Vercel errors/usage, dependency pull requests and
  enquiry/booking availability. A weekly runtime audit can detect newly reported
  advisories even without a source push.
- Dependabot is prepared for npm and GitHub Actions updates. It opens reviewable
  PRs after publication; there is no automatic merge. Read this repository's
  bundled Next guides when upgrades alter APIs, then repeat preview/CI checks.
- Run the full dependency audit as well as the runtime audit. The previously
  documented development-only braces advisory remains an upstream maintenance
  item; a green runtime audit does not imply every dependency is clear.
- Monthly: review Search Console indexing/query/country reports and consented
  Umami enquiries/vitals; use sufficient samples, not ranking guarantees.
- Confirm domain renewal date, auto-renew, billing method and reminder recipient;
  check Vercel/Zoho plan suitability and certificate status. Do not invent dates.
- Enable MFA/passkeys on GitHub, Vercel, Namecheap, Zoho, Calendly and Umami where
  supported. Store recovery codes securely. Use least-privilege team access,
  remove unused collaborators/tokens and retain verified recovery access.
- Protect main through reviewed PRs/required quality checks if supported by the
  account/repository plan. This phase has not changed repository rules, billing,
  account security or hosting settings.

## Acceptance checklist

Local implementation verification — October 11, 2026: lint, all 23 unit tests,
YAML syntax for both workflows/Dependabot, and the live operational smoke check
passed. The live check covered 14 sitemap routes, robots, the permanent www
redirect and all five essential asset headers. `npm audit --omit=dev` reported
zero known runtime vulnerabilities. No website component/style changed, so no
new visual, physical-device or field-performance result is claimed. These new
files have been approved by the owner for commit and publication. Workflow runs
must be verified after pushing; no rollback, backup restore or notification
delivery test was done.

- [ ] Publish these workflow/configuration files after approval.
- [ ] Verify first scheduled/manual monitor and weekly audit runs in GitHub.
- [ ] Confirm alerts reach a monitored recipient and designate backup coverage.
- [ ] Confirm account MFA, recovery access, renewals and production-variable backup.
- [ ] Perform a separate-directory restore and an approved recovery rehearsal.
- [ ] Finish physical-device/assistive-technology and human caption review.
- [ ] Collect enough real-user data to evaluate the LCP target; no p75 pass is claimed.

## Private release/incident record template

Keep this completed record privately; do not include customer data or secrets.

```text
Date/time (UTC):
Owner/reviewer:
Change and approved commit SHA:
Production deployment ID/URL:
Previous known-good deployment:
CI run URL/result:
Live checks/result:
Manual checks/result:
Incident symptoms and affected routes (if any):
Recovery authorization/action/result:
Follow-up owner and date:
```
