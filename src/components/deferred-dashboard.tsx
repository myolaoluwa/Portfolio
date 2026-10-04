"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { ProjectId } from "@/lib/project-evidence";
import styles from "./deferred-dashboard.module.css";

const previews = {
  elara: dynamic(
    () => import("./dashboard-preview").then((module) => module.ElaraPreview),
    { ssr: false },
  ),
  oracle: dynamic(
    () => import("./dashboard-preview").then((module) => module.OraclePreview),
    { ssr: false },
  ),
  cashflow: dynamic(
    () =>
      import("./dashboard-preview").then((module) => module.CashflowPreview),
    { ssr: false },
  ),
  nomi: dynamic(
    () => import("./dashboard-preview").then((module) => module.NomiPreview),
    { ssr: false },
  ),
  bizflow: dynamic(
    () => import("./dashboard-preview").then((module) => module.BizflowPreview),
    { ssr: false },
  ),
};

export function DeferredDashboard({ project }: { project: ProjectId }) {
  const frame = useRef<HTMLDivElement>(null);
  const [nearby, setNearby] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setNearby(true);
        observer.disconnect();
      },
      { rootMargin: "1500px 0px" },
    );
    if (frame.current) observer.observe(frame.current);
    return () => observer.disconnect();
  }, []);
  const Preview = previews[project];
  return (
    <div ref={frame} className={styles.frame} data-deferred-project={project}>
      {nearby ? (
        <Preview />
      ) : (
        <div className={styles.placeholder}>
          <span>{project.toUpperCase()} / INTERFACE PREVIEW</span>
          <p>Explore the product story using the links beside this preview.</p>
          <noscript>
            Use the project links to learn more about the product. Interface
            previews on case-study pages remain available without JavaScript.
          </noscript>
        </div>
      )}
    </div>
  );
}
