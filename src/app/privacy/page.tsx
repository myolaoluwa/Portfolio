import type { Metadata } from "next";
import Link from "next/link";
import styles from "./privacy.module.css";

export const metadata: Metadata = {
  title: "Privacy notice — DelighTech",
  description:
    "How DelighTech handles optional portfolio analytics, browser preferences, and privacy enquiries.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy notice — DelighTech",
    description: "Clear information about optional analytics and your choices.",
    url: "/privacy",
  },
};

export default function PrivacyPage() {
  const configuredEmail = process.env.PRIVACY_CONTACT_EMAIL?.trim();
  const email =
    configuredEmail &&
    /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(configuredEmail)
      ? configuredEmail
      : null;
  return (
    <div className={styles.page}>
      <a className={styles.skip} href="#privacy-content">
        Skip to privacy notice
      </a>
      <header className={styles.header}>
        <Link className={styles.brand} href="/">
          DelighTech
        </Link>
        <Link href="/">Back to the portfolio ↗</Link>
      </header>
      <main id="privacy-content" className={styles.main}>
        <div className={styles.hero}>
          <span className={styles.eyebrow}>DELIGHTECH / YOUR PRIVACY</span>
          <h1>Privacy notice</h1>
          <p>
            What this portfolio collects, why we use optional analytics, and how
            you stay in control.
          </p>
          <span className={styles.updated}>Last updated: October 3, 2026</span>
        </div>
        {!email && (
          <aside
            className={styles.pending}
            aria-label="Notice awaiting contact details"
          >
            <strong>Local preview: privacy contact details are pending.</strong>
            <p>
              This notice is prepared for review. DelighTech’s approved privacy
              email and the analytics account’s retention settings must be
              confirmed before public launch.
            </p>
          </aside>
        )}
        <section>
          <h2>1. Who is responsible</h2>
          <p>
            This notice covers the DelighTech portfolio at delightech.net.
            DelighTech is the software studio led by Olaoluwa Moshood, CEO.
            Linked products, demos, and third-party websites may have different
            privacy practices.
          </p>
        </section>
        <section>
          <h2>2. Website delivery and enquiries</h2>
          <p>
            Your browser sends ordinary request information, including an IP
            address and user-agent header, to the services that deliver this
            website and its media. Hosting services may process request logs for
            operation and security; their retention depends on the provider and
            account settings.
          </p>
          <p>
            This portfolio does not currently include an enquiry form or require
            an account. If you choose to email DelighTech, we receive the
            information you include in that message. Please do not send
            sensitive personal information unnecessarily.
          </p>
        </section>
        <section>
          <h2>3. Optional analytics</h2>
          <p>
            When configured, we use Umami Cloud only after you select{" "}
            <strong>Allow analytics</strong>. This helps us understand which
            projects visitors explore and whether they reach contact options.
          </p>
          <p>
            Our integration sends a known portfolio pathname, the hostname, an
            event name, and sometimes a project name. Events include page
            visits, project and service section views, contact section views,
            project-link clicks, full project-video plays, and clicks on enabled
            email links. A contact click is not evidence that an enquiry was
            sent.
          </p>
          <p>
            We do not include query strings, URL fragments, referrers, form
            contents, email addresses, or an assigned visitor ID in analytics
            payloads. Muted hover previews are not recorded as full video plays.
            We do not enable advertising trackers, session replay, or
            cross-device identity tracking.
          </p>
          <p>
            Umami nevertheless receives network information, including your IP
            address and browser headers. It can derive pseudonymous session
            identifiers from this information. Our use of minimal payloads does
            not mean no personal data is processed. Read{" "}
            <a
              href="https://docs.umami.is/docs/sessions"
              target="_blank"
              rel="noreferrer"
            >
              Umami’s session documentation
            </a>{" "}
            and{" "}
            <a href="https://umami.is/privacy" target="_blank" rel="noreferrer">
              its privacy policy
            </a>
            .
          </p>
        </section>
        <section>
          <h2>4. Your choices and browser storage</h2>
          <p>
            You can decline optional analytics and continue using the portfolio.
            If you previously allowed it, use the{" "}
            <strong>Analytics preferences</strong> button to turn it off.
            Withdrawal stops future collection by this integration; it does not
            automatically erase records already received by Umami.
          </p>
          <p>
            We store only your analytics choice in browser local storage under{" "}
            <code>delightech.analytics-choice</code>. This is a preference, not
            a visitor identifier or tracking cookie. It remains until you change
            your choice or clear this website’s browser storage. Clearing it
            means you will be asked again.
          </p>
          <p>
            Do Not Track and Global Privacy Control override an earlier consent
            choice. If browser storage is unavailable, optional collection stays
            off. No analytics consent controls appear when analytics is
            unconfigured or those privacy signals prevent collection.
          </p>
        </section>
        <section>
          <h2>5. Providers, retention, and other websites</h2>
          <p>
            Analytics records are held in our Umami Cloud account under its plan
            and retention settings; the portfolio does not maintain a separate
            analytics database. Umami Cloud offers US and EU hosting, so
            processing location depends on the account region. See{" "}
            <a
              href="https://docs.umami.is/docs/cloud/faq"
              target="_blank"
              rel="noreferrer"
            >
              Umami’s Cloud information
            </a>
            . The configured region and retention period should be confirmed
            before this notice is publicly launched.
          </p>
          <p>
            Links to GitHub, project apps, stores, or other external services
            take you to independently operated websites. Their own policies
            apply. We do not send form contents or contact details to Umami
            through this integration.
          </p>
        </section>
        <section>
          <h2>6. Privacy questions</h2>
          {email ? (
            <p>
              For questions about this notice or requests relating to
              information you have shared with DelighTech, email{" "}
              <a href={`mailto:${email}`}>{email}</a>.
            </p>
          ) : (
            <p>
              A dedicated privacy contact email is being prepared and will be
              added before public launch. We have not supplied a placeholder
              email that would fail to deliver your request.
            </p>
          )}
          <p>
            Changes to this website’s collection practices will be reflected in
            this notice and its update date.
          </p>
        </section>
      </main>
      <footer className={styles.footer}>
        <span>© 2026 DelighTech · Olaoluwa Moshood, CEO</span>
        <Link href="/">Return to the portfolio ↗</Link>
      </footer>
    </div>
  );
}
