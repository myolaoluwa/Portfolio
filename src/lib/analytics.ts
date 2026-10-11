export const analyticsChoiceKey = "delightech.analytics-choice";
// Keep this small allowlist aligned with published content; never ship article
// bodies in the analytics client bundle or collect arbitrary draft paths.
export const analyticsInsightPaths = [
  "/insights/how-to-scope-a-web-application",
  "/insights/responsive-website-or-mobile-app",
  "/insights/prepare-for-software-discovery-call",
];
export type AnalyticsEvent =
  | "page_view"
  | "projects_view"
  | "services_view"
  | "contact_view"
  | "project_open"
  | "contact_click"
  | "booking_click"
  | "video_play";

// Classify only approved destinations. No address, destination URL, or booking
// form content is included in the measurement payload.
export function analyticsLinkEvent(href: string):
  | { name: AnalyticsEvent; project?: string }
  | null {
  const project = /^\/work\/(elara|cashflow|oracle|nomi)\/?$/.exec(href)?.[1];
  if (project) return { name: "project_open", project };
  if (href.startsWith("mailto:")) return { name: "contact_click" };
  if (href === "https://calendly.com/hello-delightech/30min")
    return { name: "booking_click" };
  return null;
}

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
  const data =
    project && /^(elara|cashflow|oracle|nomi|bizflow)$/.test(project)
      ? { project }
      : undefined;
  sendAnalyticsEvent(name, window.location.pathname, data);
}

function sendAnalyticsEvent(
  name: string,
  path: string,
  data?: Record<string, string | number>,
) {
  const config = analyticsConfiguration();
  if (!config || privacySignalEnabled()) return false;
  try {
    if (localStorage.getItem(analyticsChoiceKey) !== "granted") return false;
  } catch {
    return false;
  }
  // Only known portfolio paths and project names are ever sent.
  const normalized = path.replace(/\/$/, "");
  if (!/^\/(?:work\/(?:elara|cashflow|oracle|nomi)\/?|services\/(?:business-websites|web-applications|mobile-apps|ongoing-improvements)\/?)?$/.test(path) && normalized !== "/insights" && !analyticsInsightPaths.includes(normalized)) return false;
  void fetch(config.endpoint, {
    method: "POST",
    credentials: "omit",
    referrerPolicy: "no-referrer",
    keepalive: true,
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
  return true;
}

type VitalMetric = { name: string; value: number; id: string };

// Document-load samples, not SPA route timings. IDs are used only in memory
// to avoid duplicate callbacks; they never leave the browser or enter storage.
export function createWebVitalsReporter(documentPath: string) {
  const reported = new Set<string>();
  return (metric: VitalMetric) => {
    if (window.location.pathname !== documentPath) return;
    if (!['LCP', 'INP', 'CLS'].includes(metric.name) ||
        !Number.isFinite(metric.value) || metric.value < 0 ||
        typeof metric.id !== 'string' || !metric.id) return;
    const key = `${metric.name}:${metric.id}`;
    if (reported.has(key)) return;
    const thresholds = metric.name === 'LCP' ? [2500, 4000]
      : metric.name === 'INP' ? [200, 500] : [0.1, 0.25];
    const rating = metric.value <= thresholds[0] ? 'good'
      : metric.value <= thresholds[1] ? 'needs-improvement' : 'poor';
    const sent = sendAnalyticsEvent(`web_vital_${metric.name.toLowerCase()}`, documentPath, {
      value: metric.name === 'CLS' ? Math.round(metric.value * 1000) / 1000 : Math.round(metric.value),
      unit: metric.name === 'CLS' ? 'score' : 'ms',
      rating,
      viewport: window.innerWidth <= 700 ? 'compact' : 'wide',
      scope: 'document',
    });
    if (sent) reported.add(key);
  };
}
