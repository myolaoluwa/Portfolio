export type ProjectId = "elara" | "oracle" | "cashflow" | "nomi" | "bizflow";

type ProjectOrigin = {
  kind: "independent" | "commissioned" | "collaboration" | null;
  approved: boolean;
  clientName?: string;
};

// Do not infer an engagement type from repository ownership or product usage.
export const projectOrigins: Record<ProjectId, ProjectOrigin> = {
  elara: { kind: "collaboration", approved: true },
  oracle: { kind: "collaboration", approved: true },
  cashflow: { kind: "independent", approved: true },
  nomi: { kind: "collaboration", approved: true },
  bizflow: { kind: "independent", approved: true },
};

export const projectStoreLinks: Partial<
  Record<ProjectId, { googlePlayUrl: string | null; approved: boolean }>
> = {
  cashflow: { googlePlayUrl: null, approved: false },
  bizflow: { googlePlayUrl: null, approved: false },
};

export function getApprovedPlayStoreUrl(project: ProjectId) {
  const listing = projectStoreLinks[project];
  if (!listing?.approved || !listing.googlePlayUrl) return null;
  try {
    const url = new URL(listing.googlePlayUrl);
    return url.protocol === "https:" &&
      url.hostname === "play.google.com" &&
      !url.username &&
      !url.password &&
      !url.port &&
      url.pathname === "/store/apps/details" &&
      Boolean(url.searchParams.get("id")?.trim())
      ? url.href
      : null;
  } catch {
    return null;
  }
}

export type ProjectEvidence = {
  id: string;
  kind: "testimonial" | "collaboration" | "result";
  project: ProjectId;
  title: string;
  body: string;
  attribution: string;
  // Public context: approved role credits, or measurement period and method.
  context: string;
  verified: boolean;
  publication: "draft" | "approved";
};

// Reserved for genuine, documented content approved for public publication.
// Empty by design: no fabricated quotes, logos, team names, or results.
// All values here must be safe to publish; keep private evidence outside src/.
export const projectEvidence: ProjectEvidence[] = [];

export function getPublishedEvidence(
  records: readonly ProjectEvidence[] = projectEvidence,
  project?: ProjectId,
) {
  return records.filter(
    (record) =>
      record.verified &&
      record.publication === "approved" &&
      (!project || record.project === project) &&
      [
        record.id,
        record.title,
        record.body,
        record.attribution,
        record.context,
      ].every((value) => value.trim().length > 0),
  );
}

export function getProjectOriginLabel(project: ProjectId) {
  const origin = projectOrigins[project];
  if (!origin.approved || !origin.kind) return "Product showcase";
  if (origin.kind === "independent") return "DelighTech-owned product";
  if (origin.kind === "collaboration") return "Collaboration";
  return origin.clientName?.trim()
    ? `Commissioned client work · ${origin.clientName.trim()}`
    : "Commissioned client work";
}
