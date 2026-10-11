import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProjectVideo } from "@/components/project-video";
import { ContactPanel } from "@/components/contact-panel";
import { PlayStoreLink, ProjectContext } from "@/components/studio-trust";
import { DeferredDashboard } from "@/components/deferred-dashboard";
import { ArrowDownRight, ArrowRight, ArrowUpRight, CodeXml, MapPin } from "lucide-react";

const capabilityGroups = [
  {
    number: "01",
    title: "Web engineering",
    description:
      "Responsive applications, data-rich dashboards, and interfaces built to feel clear in daily use.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    applied: "Elara · Oracle",
  },
  {
    number: "02",
    title: "Mobile engineering",
    description:
      "Mobile and web product flows with shared logic, validation, and a consistent interaction model.",
    stack: ["Capacitor", "Android", "TypeScript", "Responsive interfaces"],
    applied: "Cashflow",
  },
  {
    number: "03",
    title: "Backend & data",
    description:
      "Persistence choices for connected services, financial records, and local-first personal tools.",
    stack: ["PostgreSQL", "Prisma", "Supabase", "SQLite", "PGlite", "Python"],
    applied: "Cashflow · BizFlow · Nomi",
  },
  {
    number: "04",
    title: "AI & intelligence",
    description:
      "Context-aware workflows and structured signals that help people understand information and decide what to do next.",
    stack: [
      "AI workflows",
      "Structured data",
      "Signal detection",
      "Human review",
    ],
    applied: "Elara · Oracle",
  },
  {
    number: "05",
    title: "Finance & Web3",
    description:
      "Product systems for managing money and investigating the activity behind fast-moving markets.",
    stack: [
      "Bookkeeping",
      "Cash management",
      "On-chain activity",
      "Market signals",
    ],
    applied: "Cashflow · Oracle",
  },
  {
    number: "06",
    title: "Product quality",
    description:
      "Thoughtful states, local-first behavior, and responsive details that hold up beyond the happy path.",
    stack: [
      "Responsive UI",
      "Offline-ready",
      "Error states",
      "Shared validation",
    ],
    applied: "Nomi · BizFlow",
  },
];

// Static portfolio content stays outside the cinematic client module graph.
export function PortfolioContent({ services, engagement, insights }: {
  services: ReactNode; engagement: ReactNode; insights: ReactNode;
}) {
  return (
    <>
      <section className="intro-band" aria-label="Introduction">
        <span className="section-index">01 / THE THROUGHLINE</span>
        <p>
          Different problems. One instinct:{" "}
          <strong>make the next step clearer.</strong>
        </p>
        <span className="intro-mark">✳</span>
      </section>
      <section
        className="featured-section"
        id="work"
        aria-labelledby="work-title"
      >
        <div className="section-heading">
          <div>
            <span className="section-index">02 / SELECTED WORK</span>
            <h2 id="work-title">
              Built around
              <br />
              <em>real problems.</em>
            </h2>
          </div>
          <p>
            Explore our own products and collaborative builds. See the
            workflows, interfaces and engineering decisions behind each one—then
            imagine what we could build for your business.
          </p>
        </div>
        <article className="featured-project elara-project">
          <div className="feature-copy">
            <div className="project-kicker">
              <span>01</span>
              <span>AI · EXECUTIVE WORKSPACE</span>
              <span className="status-chip">
                <i /> FINISHED PRODUCT
              </span>
            </div>
            <div className="feature-title-row">
              <Image src="/elara-mark.svg" alt="" width={36} height={36} />
              <h3>Elara</h3>
            </div>
            <p className="feature-lede">
              The operating workspace for executive assistants.
            </p>
            <p className="feature-description">
              Meetings, tasks, email, and executive memory, gathered in one
              grounded workspace. Built to keep context connected and sensitive
              actions in human hands.
            </p>
            <div className="feature-tags">
              <span>Next.js</span>
              <span>TypeScript</span>
              <span>Prisma</span>
              <span>AI workflows</span>
            </div>
            <ProjectContext project="elara" />
            <div className="feature-links">
              <Link href="/work/elara">
                Read the case study <ArrowRight size={15} />
              </Link>
              <a
                href="https://elara-nu.vercel.app"
                target="_blank"
                rel="noreferrer"
              >
                Explore Elara <ArrowUpRight size={15} />
              </a>
              <a
                href="https://github.com/myolaoluwa/Elara"
                target="_blank"
                rel="noreferrer"
              >
                Source code <CodeXml size={14} />
              </a>
            </div>
          </div>
          <div className="feature-visual">
            <ProjectVideo
              project="elara"
              title="Elara"
              duration="0:23"
              description="An executive workspace connecting the daily briefing, meeting capture, follow-ups, and the context behind each next action."
            />
            <details className="interface-details">
              <summary>Explore the interface still</summary>
              <DeferredDashboard project="elara" />
            </details>
          </div>
          <span className="feature-index-ghost" aria-hidden="true">01</span>
        </article>
        <article className="featured-project oracle-project">
          <div className="feature-visual">
            <DeferredDashboard project="oracle" />
          </div>
          <div className="feature-copy">
            <div className="project-kicker">
              <span>02</span>
              <span>WEB3 · MARKET INTELLIGENCE</span>
              <span className="status-chip status-prototype">
                ● PRODUCT MVP
              </span>
            </div>
            <div className="feature-title-row">
              <Image src="/oracle-mark.png" alt="" width={38} height={38} />
              <h3>Oracle</h3>
            </div>
            <p className="feature-lede">Let the market reveal what matters.</p>
            <p className="feature-description">
              A market intelligence interface that detects unusual on-chain
              activity, explains the evidence, and makes tokens and wallets
              easier to investigate.
            </p>
            <div className="feature-tags">
              <span>Next.js</span>
              <span>TypeScript</span>
              <span>Detection engine</span>
              <span>Structured data</span>
            </div>
            <ProjectContext project="oracle" />
            <div className="feature-links">
              <Link href="/work/oracle">
                Explore the walkthrough <ArrowRight size={15} />
              </Link>
              <a
                href="https://github.com/myolaoluwa/Oracle"
                target="_blank"
                rel="noreferrer"
              >
                View source code <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
          <span className="feature-index-ghost" aria-hidden="true">02</span>
        </article>
      <article className="featured-project cashflow-project">
        <div className="feature-copy">
          <div className="project-kicker">
            <span>03</span>
            <span>FINTECH · WEB + MOBILE APP</span>
            <span className="status-chip status-prototype">
              FINISHED PRODUCT
            </span>
          </div>
          <div className="feature-title-row">
            <span className="project-monogram cashflow-monogram">C</span>
            <h3>Cashflow</h3>
          </div>
          <p className="feature-lede">
            A clearer picture of money, wherever you are.
          </p>
          <p className="feature-description">
            A multi-platform bookkeeping and cash management product for
            individuals, small businesses, freelancers, merchants, and teams.
            The current implementation brings together a responsive Next.js web
            app, a Capacitor Android project, and permission-scoped financial
            records backed by PostgreSQL.
          </p>
          <div className="feature-tags">
            <span>Next.js</span>
            <span>TypeScript</span>
            <span>Capacitor</span>
            <span>PostgreSQL</span>
          </div>
          <ProjectContext project="cashflow" />
          <div className="feature-links">
            <Link href="/work/cashflow">
              Read the case study <ArrowRight size={15} />
            </Link>
            <a
              href="https://cashflow-delight12.vercel.app"
              target="_blank"
              rel="noreferrer"
            >
              Open web app <ArrowUpRight size={15} />
            </a>
            <PlayStoreLink project="cashflow" />
          </div>
        </div>
        <div className="feature-visual">
          <DeferredDashboard project="cashflow" />
        </div>
        <span className="feature-index-ghost" aria-hidden="true">03</span>
      </article>
      <article className="featured-project nomi-project">
        <div className="feature-visual">
          <ProjectVideo
            project="nomi"
            title="Nomi"
            duration="0:43"
            description="A personal dashboard connecting finances, time, activities, habits, and goals in one clear view of everyday life."
          />
          <details className="interface-details">
            <summary>Explore the interface still</summary>
            <DeferredDashboard project="nomi" />
          </details>
        </div>
        <div className="feature-copy">
          <div className="project-kicker">
            <span>04</span>
            <span>PERSONAL SYSTEMS · DASHBOARD</span>
            <span className="status-chip status-prototype">
              LOCAL-FIRST MVP
            </span>
          </div>
          <div className="feature-title-row">
            <span className="project-monogram nomi-monogram">N</span>
            <h3>Nomi</h3>
          </div>
          <p className="feature-lede">
            A more connected view of everyday life.
          </p>
          <p className="feature-description">
            A personal dashboard bringing money, time, tasks, habits, and goals
            into one timeline. Track progress, review patterns, and get
            data-backed answers from your own records.
          </p>
          <div className="feature-tags">
            <span>TypeScript</span>
            <span>React</span>
            <span>PGlite</span>
            <span>Offline-ready</span>
          </div>
          <ProjectContext project="nomi" />
          <div className="feature-links">
            <Link href="/work/nomi">
              Explore the walkthrough <ArrowRight size={15} />
            </Link>
            <a
              href="https://github.com/myolaoluwa/Nomi"
              target="_blank"
              rel="noreferrer"
            >
              View source code <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
        <span className="feature-index-ghost" aria-hidden="true">04</span>
      </article>
      <article className="featured-project bizflow-project">
        <div className="feature-copy">
          <div className="project-kicker">
            <span>05</span>
            <span>NETWORK MARKETING · BUSINESS TOOLS</span>
            <span className="status-chip">
              <i /> LIVE BUILD
            </span>
          </div>
          <div className="feature-title-row">
            <span className="project-monogram bizflow-monogram">B</span>
            <h3>BizFlow</h3>
          </div>
          <p className="feature-lede">
            Turn business goals into focused daily action.
          </p>
          <p className="feature-description">
            Built by DelighTech for network marketers and business owners. A
            mobile-first workspace for planning daily activity, reviewing weekly
            progress, following up with prospects, and keeping team goals in
            view.
          </p>
          <div className="feature-tags">
            <span>TypeScript</span>
            <span>SQLite</span>
            <span>Responsive product</span>
            <span>Team summaries</span>
          </div>
          <ProjectContext project="bizflow" />
          <div className="feature-links">
            <a
              href="https://bizflow-eta-two.vercel.app"
              target="_blank"
              rel="noreferrer"
            >
              Explore BizFlow <ArrowUpRight size={15} />
            </a>
            <PlayStoreLink project="bizflow" />
          </div>
        </div>
        <div className="feature-visual">
          <DeferredDashboard project="bizflow" />
        </div>
        <span className="feature-index-ghost" aria-hidden="true">05</span>
      </article>

      </section>

      {services}

      <section
        className="approach-section"
        id="approach"
        aria-labelledby="approach-title"
      >
        <div className="approach-intro">
          <span className="section-index">04 / HOW WE APPROACH IT</span>
          <h2 id="approach-title">
            Thoughtful
            <br />
            from <em>first sketch</em>
            <br />
            to first use.
          </h2>
          <p>
            We work across the whole product: understanding the job, shaping the
            interface, and making the details hold up in real use.
          </p>
        </div>
        <div className="approach-steps">
          <div className="approach-step">
            <span>01</span>
            <div>
              <h3>Find the friction</h3>
              <p>
                Start with the real workflow, the people inside it, and the part
                that keeps getting in the way.
              </p>
            </div>
            <ArrowDownRight size={17} />
          </div>
          <div className="approach-step">
            <span>02</span>
            <div>
              <h3>Shape the product</h3>
              <p>
                Turn the messy middle into clear priorities, calm interfaces,
                and a useful first version.
              </p>
            </div>
            <ArrowDownRight size={17} />
          </div>
          <div className="approach-step">
            <span>03</span>
            <div>
              <h3>Build for the edges</h3>
              <p>
                Make the everyday path feel easy, and give errors, empty states,
                and sensitive actions the same care.
              </p>
            </div>
            <ArrowDownRight size={17} />
          </div>
        </div>
      </section>
      <section
        className="capabilities-section"
        id="capabilities"
        aria-labelledby="capabilities-title"
      >
        <div className="capabilities-heading">
          <div>
            <span className="section-index">05 / TECHNICAL CAPABILITIES</span>
            <h2 id="capabilities-title">
              Built across
              <br />
              <em>the whole stack.</em>
            </h2>
          </div>
          <p>
            From interface to persistence, we choose tools around the job the
            product needs to do. Here’s the range behind the work.
          </p>
        </div>
        <div className="capabilities-grid">
          {capabilityGroups.map((group) => (
            <article className="capability-item" key={group.number}>
              <div className="capability-topline">
                <span>{group.number}</span>
                <i />
              </div>
              <h3>{group.title}</h3>
              <p>{group.description}</p>
              <div
                className="capability-stack"
                aria-label={`${group.title} technologies`}
              >
                {group.stack.map((technology) => (
                  <span key={technology}>{technology}</span>
                ))}
              </div>
              <div className="capability-applied">
                <span>IN PRACTICE</span>
                <strong>{group.applied}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>
      {engagement}
      <div className="studio-insights-section">{insights}</div>

      <section
        className="contact-section"
        id="contact"
        aria-labelledby="contact-title"
      >
        <div className="contact-stamp" aria-hidden="true">
          OPEN
          <br />
          SOURCE
          <br />
          <span>♥</span>
          <br />
          OPEN MIND
        </div>
        <div className="contact-content">
          <span className="section-index">07 / YOUR TURN</span>
          <h2 id="contact-title">
            Have a useful
            <br />
            problem? <em>Let’s build.</em>
          </h2>
          <p>
            If you’re working on something that could make a real day a little
            easier, the DelighTech team would like to hear about it.
          </p>
          <a
            className="button button-dark"
            href="mailto:hello@delightech.net"
          >
            Tell us about your project <ArrowUpRight size={16} />
          </a>
        </div>
        <ContactPanel />
        <div className="contact-mark" aria-hidden="true">
          DT<span>.</span>
        </div>
      </section>
      <footer className="site-footer">
        <a className="footer-brand" href="#top">
          DelighTech
        </a>
        <div className="footer-identity">
          <span className="footer-ceo">
            Olaoluwa Moshood · CEO of DelighTech
          </span>
          <div className="footer-meta">
            <span>
              <MapPin size={12} aria-hidden="true" /> Lagos, Nigeria
            </span>
            <span>Working with teams worldwide</span>
          </div>
        </div>
        <div className="footer-links">
          <Link href="/privacy">Privacy notice</Link>
          <a
            href="https://github.com/myolaoluwa"
            target="_blank"
            rel="noreferrer"
          >
            GitHub <ArrowUpRight size={13} />
          </a>
          <a href="#top">
            Back to top <ArrowRight size={13} />
          </a>
        </div>
        <small>© 2026 DELIGHTECH</small>
      </footer>
    </>
  );
}

