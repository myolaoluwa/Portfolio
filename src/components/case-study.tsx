import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import type { CaseStudy as Study } from "@/lib/case-studies";
import {
  ElaraPreview,
  CashflowPreview,
  OraclePreview,
  NomiPreview,
} from "./dashboard-preview";
import { MobileDashboardPreview } from "./mobile-dashboard-preview";
import { ProjectVideo } from "./project-video";
import styles from "./case-study.module.css";
import {
  ApprovedEvidence,
  PlayStoreLink,
  ProjectContext,
} from "./studio-trust";

const sections = [
  ["overview", "Overview"],
  ["challenge", "The problem"],
  ["product", "The product"],
  ["decisions", "Key decisions"],
  ["result", "The result"],
];

export function CaseStudy({ study }: { study: Study }) {
  const DesktopPreview = {
    elara: ElaraPreview,
    cashflow: CashflowPreview,
    oracle: OraclePreview,
    nomi: NomiPreview,
  }[study.slug];
  const walkthrough = study.format === "walkthrough";
  return (
    <div className={styles.page}>
      <a className={styles.skip} href="#case-main">
        Skip to {walkthrough ? "product walkthrough" : "case study"}
      </a>
      <header className={styles.header}>
        <Link href="/" className={styles.brand}>
          DelighTech<span>.</span>
        </Link>
        <Link href="/#work">
          <ArrowLeft size={16} />
          All selected work
        </Link>
      </header>
      <main id="case-main" className={styles.main}>
        <section
          id="overview"
          className={styles.hero}
          aria-labelledby="case-title"
        >
          <div className={styles.eyebrow}>
            FIELD NOTES / {study.number} · {study.name.toUpperCase()}
          </div>
          <div className={styles.productStatus}>
            <span aria-hidden="true" /> {study.status}
          </div>
          <p className={styles.category}>{study.category}</p>
          <ProjectContext project={study.slug} />
          <h1 id="case-title">
            {study.name}
            <span>{study.title}</span>
          </h1>
          <p className={styles.introduction}>{study.introduction}</p>
          {walkthrough && (
            <p className={styles.visualNote}>
              No sign-in or code required. Explore a guided preview with sample
              data—not a live, editable demo.
            </p>
          )}
          <div className={styles.actions}>
            <a href="#product" className={styles.primary}>
              {walkthrough ? "Explore the walkthrough" : "See the product"}{" "}
              <ArrowRight size={17} />
            </a>
            {study.liveUrl && (
              <a href={study.liveUrl} target="_blank" rel="noreferrer">
                Open live app <ArrowUpRight size={16} />
              </a>
            )}
            <PlayStoreLink project={study.slug} />
          </div>
          <dl className={styles.facts}>
            <div>
              <dt>Built for</dt>
              <dd>{study.audience}</dd>
            </div>
            <div>
              <dt>{walkthrough ? "Walkthrough covers" : "Work covered"}</dt>
              <dd>{study.scope}</dd>
            </div>
            <div>
              <dt>Implementation</dt>
              <dd>{study.stack.join(" · ")}</dd>
            </div>
          </dl>
        </section>
        <nav
          className={styles.contents}
          aria-label={
            walkthrough ? "Product walkthrough sections" : "Case study sections"
          }
        >
          {sections.map(([id, label], index) => (
            <a href={`#${id}`} key={id}>
              <span>0{index + 1}</span>
              {walkthrough && id === "decisions"
                ? "Design choices"
                : walkthrough && id === "result"
                  ? "How it helps"
                  : label}
            </a>
          ))}
        </nav>
        <section
          id="challenge"
          className={styles.section}
          aria-labelledby="challenge-title"
        >
          <div className={styles.sectionLabel}>01 / THE PROBLEM</div>
          <div>
            <h2 id="challenge-title">{study.challenge.title}</h2>
            <p className={styles.body}>{study.challenge.body}</p>
            <aside className={styles.constraint}>
              <span className={styles.eyebrow}>The constraint</span>
              <p>{study.challenge.constraint}</p>
            </aside>
          </div>
        </section>
        <section
          id="product"
          className={styles.productSection}
          aria-labelledby="product-title"
        >
          <div className={styles.productHeading}>
            <div>
              <span className={styles.sectionLabel}>02 / THE PRODUCT</span>
              <h2 id="product-title">Follow the workflow.</h2>
            </div>
            <p>A closer look at the interface and the sequence it supports.</p>
          </div>
          <ol className={styles.workflow}>
            {study.workflow.map((step, index) => (
              <li key={step.title}>
                <span className={styles.stepNumber}>0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
          {study.video && (
            <div className={styles.film}>
              <ProjectVideo
                project={study.video.project}
                title={study.name}
                duration={study.video.duration}
                description={study.video.description}
              />
            </div>
          )}
          <div className={styles.visuals}>
            <div>
              <span className={styles.visualLabel}>Desktop workspace</span>
              <DesktopPreview />
            </div>
            <div className={styles.mobileVisual}>
              <span className={styles.visualLabel}>Mobile layout</span>
              <div
                className={styles.device}
                role="img"
                aria-label={`${study.name} source-based mobile interface with sample data`}
              >
                <div aria-hidden="true">
                  <MobileDashboardPreview scene={study.mobileScene} />
                </div>
              </div>
            </div>
          </div>
          <p className={styles.visualNote}>
            Interface previews are reconstructed from the implementation and use
            sample data. They are not live accounts or customer records.
          </p>
        </section>
        <section
          id="decisions"
          className={styles.decisionsSection}
          aria-labelledby="decisions-title"
        >
          <div className={styles.productHeading}>
            <div>
              <span className={styles.sectionLabel}>03 / KEY DECISIONS</span>
              <h2 id="decisions-title">
                {walkthrough
                  ? "Why the experience works this way."
                  : "The thinking in the build."}
              </h2>
            </div>
            <p>
              {walkthrough
                ? "The product choices behind what you see on screen."
                : "Each choice connects a product constraint to an implementation detail."}
            </p>
          </div>
          <div className={styles.decisions}>
            {study.decisions.map((decision, index) => (
              <article key={decision.title}>
                <span className={styles.stepNumber}>0{index + 1}</span>
                <h3>{decision.title}</h3>
                <dl>
                  <div>
                    <dt>Challenge</dt>
                    <dd>{decision.challenge}</dd>
                  </div>
                  <div>
                    <dt>Implementation</dt>
                    <dd>{decision.implementation}</dd>
                  </div>
                  <div>
                    <dt>Why it matters</dt>
                    <dd>{decision.value}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </section>
        <section
          id="result"
          className={styles.result}
          aria-labelledby="result-title"
        >
          <div>
            <span className={styles.eyebrow}>04 / THE RESULT</span>
            <h2 id="result-title">{study.result.title}</h2>
            <p>{study.result.body}</p>
          </div>
          <ul>
            {study.result.capabilities.map((capability) => (
              <li key={capability}>
                <Check size={18} aria-hidden="true" />
                <span>{capability}</span>
              </li>
            ))}
          </ul>
        </section>
        <ApprovedEvidence project={study.slug} />
        <aside className={styles.boundaries} aria-labelledby="boundaries-title">
          <h3 id="boundaries-title">Scope & evidence</h3>
          <p>{study.boundaries}</p>
          {study.sourceUrl && (
            <a href={study.sourceUrl} target="_blank" rel="noreferrer">
              Inspect the public implementation <ArrowUpRight size={15} />
            </a>
          )}
        </aside>
        <nav className={styles.nextProject} aria-label="More project stories">
          <div>
            <span className={styles.eyebrow}>CONTINUE EXPLORING</span>
            <Link href={study.next.href}>
              {study.next.name} <ArrowUpRight size={30} />
            </Link>
          </div>
          <Link href="/#work">
            Back to selected work <ArrowLeft size={16} />
          </Link>
        </nav>
      </main>
      <footer className={styles.footer}>
        <span>DelighTech · Led by Olaoluwa Moshood, CEO</span>
        <Link href="/privacy">Privacy notice</Link>
        <span>© 2026</span>
      </footer>
    </div>
  );
}
