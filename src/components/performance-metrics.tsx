"use client";

import { useCallback, useEffect, useRef } from "react";
import { useReportWebVitals } from "next/web-vitals";
import { createWebVitalsReporter } from "@/lib/analytics";

// Observe browser timings locally from hydration so the first interaction
// finalises LCP correctly. Every outbound sample independently checks consent.
export function PerformanceMetrics() {
  const reporter = useRef<ReturnType<typeof createWebVitalsReporter> | null>(null);
  useEffect(() => {
    reporter.current = createWebVitalsReporter(window.location.pathname);
  }, []);
  const report = useCallback<Parameters<typeof useReportWebVitals>[0]>(metric => {
    reporter.current?.(metric);
  }, []);
  useReportWebVitals(report);
  return null;
}
