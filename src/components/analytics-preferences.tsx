"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  analyticsChoiceKey,
  analyticsConfiguration,
  privacySignalEnabled,
  trackEvent,
} from "@/lib/analytics";
import styles from "./analytics-preferences.module.css";

export function AnalyticsPreferences() {
  const pathname = usePathname();
  const [choice, setChoice] = useState<string | null>(null);
  const [settings, setSettings] = useState(false);
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    const enabled =
      Boolean(analyticsConfiguration()) && !privacySignalEnabled();
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(analyticsChoiceKey);
    } catch {
      /* No storage: no collection. */
    }
    // Resolve browser preferences after hydration, never collect during render.
    queueMicrotask(() => {
      setAvailable(enabled);
      setChoice(saved);
    });
  }, []);

  useEffect(() => {
    if (!available || choice !== "granted") return;
    trackEvent("page_view");
    const seen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const sectionId = (entry.target as HTMLElement).dataset.analyticsSection || entry.target.id;
          if (!entry.isIntersecting || seen.has(sectionId)) continue;
          seen.add(sectionId);
          const event = {
            work: "projects_view",
            services: "services_view",
            contact: "contact_view",
          } as const;
          const name = event[sectionId as keyof typeof event];
          if (name) trackEvent(name);
        }
      },
      { threshold: 0.15 },
    );
    for (const id of ["work", "services", "contact"]) {
      const section = document.getElementById(id);
      // Observe the heading: a tall multi-project section may never reach
      // the intersection threshold when observed as one large rectangle.
      if (section) {
        const heading = section.querySelector("h2");
        if (heading) {
          heading.dataset.analyticsSection = id;
          observer.observe(heading);
        } else observer.observe(section);
      }
    }
    const click = (event: MouseEvent) => {
      const anchor = (event.target as Element)?.closest?.("a[href]");
      if (!anchor || anchor.getAttribute("aria-disabled") === "true") return;
      const href = anchor.getAttribute("href") || "";
      const project = /^\/work\/(elara|cashflow|oracle|nomi)\/?$/.exec(
        href,
      )?.[1];
      if (project) trackEvent("project_open", project);
      if (href.startsWith("mailto:")) trackEvent("contact_click");
    };
    const video = (event: Event) =>
      trackEvent(
        "video_play",
        (event as CustomEvent<{ project: string }>).detail?.project,
      );
    document.addEventListener("click", click);
    window.addEventListener("portfolio:video-play", video);
    return () => {
      observer.disconnect();
      document.removeEventListener("click", click);
      window.removeEventListener("portfolio:video-play", video);
    };
  }, [available, choice, pathname]);

  function save(value: "granted" | "denied") {
    try {
      localStorage.setItem(analyticsChoiceKey, value);
      setChoice(value);
      setSettings(false);
    } catch {
      setChoice("denied");
    }
  }
  if (!available) return null;
  // Let visitors read the notice before deciding; preferences remain available.
  if ((choice !== null || pathname === "/privacy") && !settings)
    return (
      <button className={styles.preferences} onClick={() => setSettings(true)}>
        Analytics preferences
      </button>
    );
  return (
    <aside className={styles.panel} aria-label="Optional analytics preferences">
      <p>
        Optional analytics helps DelighTech understand which projects visitors
        explore and whether they reach contact options. We don’t send form
        contents, query strings, or visitor identifiers. The analytics provider
        receives ordinary network information, including your IP address.
      </p>
      <Link className={styles.noticeLink} href="/privacy" onClick={() => setSettings(false)}>
        Read the privacy notice
      </Link>
      <div>
        <button onClick={() => save("granted")}>Allow analytics</button>
        <button onClick={() => save("denied")}>
          {choice === "granted" ? "Turn analytics off" : "Decline"}
        </button>
      </div>
    </aside>
  );
}
