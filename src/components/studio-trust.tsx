import {
  getPublishedEvidence,
  getProjectOriginLabel,
  getApprovedPlayStoreUrl,
  type ProjectId,
} from "@/lib/project-evidence";
import styles from "./studio-trust.module.css";
import { ArrowUpRight } from "lucide-react";

export function StudioTeam() {
  return (
    <aside className={styles.team} aria-labelledby="studio-team-title">
      <div>
        <span className={styles.eyebrow}>DELIGHTECH / THE TEAM</span>
        <h3 id="studio-team-title">You hire the studio. We build together.</h3>
      </div>
      <div>
        <p>
          DelighTech is a software studio led by Olaoluwa, CEO. Your engagement
          is with DelighTech, and your project is delivered by our expert team.
        </p>
        <p>
          We bring design and development together around a shared scope, from
          the first product decisions to implementation and refinement.
        </p>
      </div>
    </aside>
  );
}

export function ProjectContext({ project }: { project: ProjectId }) {
  return <p className={styles.origin}>{getProjectOriginLabel(project)}</p>;
}

export function PlayStoreLink({ project }: { project: ProjectId }) {
  const href = getApprovedPlayStoreUrl(project);
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      Get it on Google Play <ArrowUpRight size={15} aria-hidden="true" />
    </a>
  );
}

const evidenceLabels = {
  testimonial: "Client perspective",
  collaboration: "Collaboration & credits",
  result: "Documented project result",
};

export function ApprovedEvidence({ project }: { project?: ProjectId }) {
  const records = getPublishedEvidence(undefined, project);
  if (records.length === 0) return null;

  return (
    <section
      className={styles.evidence}
      aria-labelledby={`evidence-title-${project ?? "studio"}`}
    >
      <span className={styles.eyebrow}>RESULTS & COLLABORATIONS</span>
      <h3 id={`evidence-title-${project ?? "studio"}`}>
        The evidence behind the work.
      </h3>
      <div className={styles.records}>
        {records.map((record) => (
          <article key={record.id}>
            <span className={styles.eyebrow}>
              {evidenceLabels[record.kind]}
            </span>
            <h4>{record.title}</h4>
            {record.kind === "testimonial" ? (
              <blockquote>{record.body}</blockquote>
            ) : (
              <p>{record.body}</p>
            )}
            <p className={styles.attribution}>{record.attribution}</p>
            <p className={styles.context}>{record.context}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
