export const analyticsChoiceKey = "delightech.analytics-choice";
export type AnalyticsEvent =
  | "page_view"
  | "projects_view"
  | "services_view"
  | "contact_view"
  | "project_open"
  | "contact_click"
  | "video_play";

// Optional Umami-compatible collector. No script, cookies, or visitor ID.
export function analyticsConfiguration() {
  const endpoint = process.env.NEXT_PUBLIC_ANALYTICS_COLLECT_URL;
  const website = process.env.NEXT_PUBLIC_ANALYTICS_WEBSITE_ID;
  if (
    !endpoint ||
    !website ||
    !/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(
      website,
    )
  )
    return null;
  try {
    const url = new URL(endpoint);
    if (
      url.protocol !== "https:" ||
      url.username ||
      url.password ||
      url.search ||
      url.hash ||
      url.pathname !== "/api/send"
    )
      return null;
    return { endpoint: url.href, website };
  } catch {
    return null;
  }
}

export function privacySignalEnabled() {
  return (
    navigator.doNotTrack === "1" ||
    (navigator as Navigator & { globalPrivacyControl?: boolean })
      .globalPrivacyControl === true
  );
}

export function trackEvent(name: AnalyticsEvent, project?: string) {
  const config = analyticsConfiguration();
  if (!config || privacySignalEnabled()) return;
  try {
    if (localStorage.getItem(analyticsChoiceKey) !== "granted") return;
  } catch {
    return;
  }
  // Only known portfolio paths and project names are ever sent.
  const path = window.location.pathname;
  if (!/^\/(?:work\/(?:elara|cashflow|oracle|nomi)\/?)?$/.test(path)) return;
  const data =
    project && /^(elara|cashflow|oracle|nomi|bizflow)$/.test(project)
      ? { project }
      : undefined;
  void fetch(config.endpoint, {
    method: "POST",
    credentials: "omit",
    referrerPolicy: "no-referrer",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "event",
      payload: {
        website: config.website,
        hostname: window.location.hostname,
        url: path,
        name,
        ...(data ? { data } : {}),
      },
    }),
  }).catch(() => {
    /* Measurement must never interrupt the portfolio. */
  });
}
