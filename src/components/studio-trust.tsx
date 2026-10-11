import {
  getPublishedEvidence,
  getProjectOriginLabel,
  getApprovedPlayStoreUrl,
  type ProjectId,
} from "@/lib/project-evidence";
import styles from "./studio-trust.module.css";
import { ArrowUpRight } from "lucide-react";
import { getPublishedTeam } from "@/lib/studio-team";
import Link from "next/link";
import type { CaseStudy } from "@/lib/case-studies";

export function SelectedWorkProof() {
  return (
    <aside className={styles.workProof} aria-label="Selected work and ownership">
      <div>
        <span className={styles.eyebrow}>PRODUCTS IN USE</span>
        <p>
          <Link href="/work/elara">Elara</Link> and{" "}
          <Link href="/work/cashflow">Cashflow</Link> are used by real users,
          as confirmed by DelighTech. Cashflow’s Android app is in Google Play
          closed testing.
        </p>
      </div>
      <div>
        <span className={styles.eyebrow}>CLEAR OWNERSHIP</span>
        <p>
          Cashflow and BizFlow are DelighTech-owned products. Elara, Oracle and
          Nomi are collaborative builds. Each story separates demonstrated
          functionality from measured business results.
        </p>
      </div>
    </aside>
  );
}

export function ProjectProof({ study }: { study: CaseStudy }) {
  const walkthrough = study.format === "walkthrough";
  return (
    <aside className={styles.proof} aria-labelledby="project-proof-title">
      <div className={styles.proofHeading}>
        <span className={styles.eyebrow}>PROJECT EVIDENCE</span>
        <h2 id="project-proof-title">What you can inspect.</h2>
        <p>
          Product functionality, interface previews and the decisions behind
          the build—without needing an account.
        </p>
      </div>
      <div className={styles.proofGrid}>
        <div>
          <h3>Delivery & ownership</h3>
          <p>{study.status}</p>
          <p>{getProjectOriginLabel(study.slug)}</p>
          <span className={styles.proofNote}>
            {walkthrough
              ? "A guided product preview, not a claim of user adoption."
              : "Product usage and release status confirmed by DelighTech; no usage figures published."}
          </span>
        </div>
        <div>
          <h3>Demonstrated functionality</h3>
          <ul>{study.result.capabilities.map(capability => <li key={capability}>{capability}</li>)}</ul>
          <a href="#product">Inspect the workflow <ArrowUpRight size={15} aria-hidden="true" /></a>
        </div>
        <div>
          <h3>Implementation decisions</h3>
          <p>Read how the product’s constraints shaped its interface and implementation.</p>
          <span className={styles.proofNote}>
            Previews use sample data. Functionality is not evidence of measured
            time savings, revenue gains or an independent security audit.
          </span>
          <a href="#decisions">Explore the decisions <ArrowUpRight size={15} aria-hidden="true" /></a>
        </div>
      </div>
    </aside>
  );
}

export function StudioTeam() {
  const members = getPublishedTeam();
  return (
    <aside className={styles.team} aria-labelledby="studio-team-title">
      <div>
        <span className={styles.eyebrow}>DELIGHTECH / THE TEAM</span>
        <h3 id="studio-team-title">You hire the studio. We build together.</h3>
        {members.length > 0 && <dl className={styles.members} aria-label="Studio leadership and team">
          {members.map((member) => <div key={member.id}><dt>{member.name}</dt><dd>{member.role}</dd></div>)}
        </dl>}
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
