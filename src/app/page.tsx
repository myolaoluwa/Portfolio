"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ProjectVideo } from "@/components/project-video";
import { ContactPanel } from "@/components/contact-panel";
import { Services } from "@/components/services";
import { Engagement } from "@/components/engagement";
import { PlayStoreLink, ProjectContext } from "@/components/studio-trust";
import { MobileDashboardPreview } from "@/components/mobile-dashboard-preview";
import { DeferredDashboard } from "@/components/deferred-dashboard";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CodeXml,
  MapPin,
  Menu,
  X,
} from "lucide-react";

const cinematicChapters = [
  {
    marker: "01",
    eyebrow: "OLAOLUWA / CEO OF DELIGHTECH",
    title: (
      <>
        Good software begins with a <em>better question.</em>
      </>
    ),
    description:
      "Thoughtful websites, web applications, and mobile experiences. Scroll to explore selected DelighTech projects and the interfaces behind them.",
    product: "DELIGHTECH",
    screenTitle: "A useful place to begin",
  },
  {
    marker: "02",
    eyebrow: "FIND THE SIGNAL",
    title: (
      <>
        Make the important thing <em>impossible to miss.</em>
      </>
    ),
    description:
      "Oracle brings scattered market activity into focus, so a signal comes with context instead of noise.",
    product: "ORACLE",
    screenTitle: "Radar / demo signals",
  },
  {
    marker: "03",
    eyebrow: "CONNECT THE CONTEXT",
    title: (
      <>
        Keep the whole picture <em>in reach.</em>
      </>
    ),
    description:
      "Elara gives busy teams one grounded place for the meetings, follow-ups, and details that should not get lost.",
    product: "ELARA",
    screenTitle: "Your day, in focus",
  },
  {
    marker: "04",
    eyebrow: "MAKE MONEY FEEL CLEARER",
    title: (
      <>
        A calmer view of what comes <em>in and out.</em>
      </>
    ),
    description:
      "Cashflow turns everyday money movement into a picture people can actually make decisions from.",
    product: "CASHFLOW",
    screenTitle: "Your cashbooks",
  },
  {
    marker: "05",
    eyebrow: "MAKE THE NEXT STEP SMALLER",
    title: (
      <>
        Turn good intentions into <em>real momentum.</em>
      </>
    ),
    description:
      "From personal routines to ambitious products, the best next step is the one that feels possible to take.",
    product: "NOMI",
    screenTitle: "Your life, at a glance",
  },
];

const portraitIntroduction = {
  ...cinematicChapters[0],
  eyebrow: "MEET THE BUILDER / EXPLORE THE WORK",
  title: (
    <>
      I’m Olaoluwa. Here’s what <em>we’ve built.</em>
    </>
  ),
  description:
    "I’m the CEO of DelighTech, a software studio powered by an expert team. We bring design and full-stack engineering together. Scroll to explore our selected projects and their mobile interfaces.",
  product: "OLAOLUWA / DELIGHTECH",
};

function CinematicPhone({ scene }: { scene: number }) {
  return (
    <div
      className={`cinema-phone cinema-phone-${scene}`}
      aria-label={`${cinematicChapters[scene].product} source-based mobile preview with sample data`}
    >
      <div
        className={`cinema-phone-screen ${scene > 0 ? "cinema-phone-source" : ""}`}
      >
        {scene > 0 ? (
          <MobileDashboardPreview scene={scene} />
        ) : (
          <>
            <div className="phone-status">
              <span>9:41</span>
              <span>● ● ▰</span>
            </div>
            <div className="phone-title-row">
              <div>
                <span>DELIGHTECH</span>
                <strong>A useful place to begin</strong>
              </div>
              <b>DT</b>
            </div>
            <div className="phone-origin-screen">
              <span>PRODUCT STUDIO / 2026</span>
              <strong>
                Make the next step
                <br />
                feel obvious.
              </strong>
              <div className="origin-flow">
                <i>QUESTION</i>
                <b />
                <i>INTERFACE</i>
                <b />
                <i>IMPACT</i>
              </div>
              <small>WEB · MOBILE · PRODUCT</small>
            </div>
          </>
        )}
      </div>
      <span className="phone-side-button" />
    </div>
  );
}

function CinematicIntro({
  activeScene,
  portraitActive,
  onChapterSelect,
}: {
  activeScene: number;
  portraitActive: boolean;
  onChapterSelect: (index: number) => void;
}) {
  const chapter =
    activeScene === 0 && portraitActive
      ? portraitIntroduction
      : cinematicChapters[activeScene];
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let frame = 0;
    let x = 0,
      y = 0,
      targetX = 0,
      targetY = 0;
    const animate = () => {
      x += (targetX - x) * 0.09;
      y += (targetY - y) * 0.09;
      stage.style.setProperty("--camera-x", x.toFixed(4));
      stage.style.setProperty("--camera-y", y.toFixed(4));
      if (Math.abs(targetX - x) + Math.abs(targetY - y) > 0.002)
        frame = requestAnimationFrame(animate);
      else frame = 0;
    };
    const move = (event: PointerEvent) => {
      if (motion.matches || !pointer.matches) return;
      const bounds = stage.getBoundingClientRect();
      targetX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      targetY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
      if (!frame) frame = requestAnimationFrame(animate);
    };
    const reset = () => {
      targetX = targetY = 0;
      if (!frame) frame = requestAnimationFrame(animate);
    };
    stage.addEventListener("pointermove", move, { passive: true });
    stage.addEventListener("pointerleave", reset);
    motion.addEventListener("change", reset);
    return () => {
      cancelAnimationFrame(frame);
      stage.removeEventListener("pointermove", move);
      stage.removeEventListener("pointerleave", reset);
      motion.removeEventListener("change", reset);
    };
  }, []);
  return (
    <section
      className="cinema-track"
      id="cinematic-intro"
      aria-label="A cinematic introduction to DelighTech and our products"
    >
      <div
        ref={stageRef}
        className={`cinema-stage cinema-scene-${activeScene}`}
      >
        <a className="cinema-skip" href="#work">
          Skip intro and explore projects <ArrowUpRight size={13} />
        </a>
        <div className="cinema-environment" aria-hidden="true">
          <div
            className={`cinema-backdrop cinema-backdrop-${activeScene}`}
            key={activeScene}
            aria-hidden="true"
          >
            {activeScene === 0 && (
              <Image
                src="/media/chapter-0.webp"
                alt=""
                fill
                sizes="106vw"
                preload
                className="cinema-opening-image"
              />
            )}
          </div>
          <div className="cinema-studio">
            <Image
              src="/media/myolaoluwa-studio.webp"
              alt=""
              fill
              sizes="(max-width: 700px) 100vw, 106vw"
            />
          </div>
          <div className="cinema-depth-light" />
          <div className="cinema-atmosphere" />
          <div className="cinema-foreground" />
        </div>
        <div className="cinema-wash" aria-hidden="true" />
        <div className="cinema-grain" aria-hidden="true" />
        <div className="cinema-topline">
          <span>DELIGHTECH / FIELD NOTES</span>
          <span>WEBSITES · WEB APPS · MOBILE · FULL STACK</span>
        </div>
        <nav className="cinema-rail" aria-label="Intro chapters">
          <span className="cinema-rail-brand">DT</span>
          <div className="cinema-rail-steps">
            {cinematicChapters.map((item, index) => (
              <button
                type="button"
                key={item.marker}
                className={activeScene === index ? "is-current" : ""}
                aria-label={`Go to chapter ${item.marker}: ${item.eyebrow.toLowerCase()}`}
                aria-current={activeScene === index ? "step" : undefined}
                onClick={() => onChapterSelect(index)}
              >
                <span>{item.marker}</span>
                <i />
              </button>
            ))}
          </div>
          <span className="cinema-rail-end">05</span>
        </nav>
        <div
          className={`cinema-copy ${activeScene === 0 && !portraitActive ? "cinema-opening-copy" : ""}`}
          key={`copy-${activeScene}-${activeScene === 0 && portraitActive ? "portrait" : "opening"}`}
        >
          <p className="cinema-eyebrow">
            <span>{chapter.marker}</span> {chapter.eyebrow}
          </p>
          {activeScene === 0 ? (
            <h1>{chapter.title}</h1>
          ) : (
            <h2>{chapter.title}</h2>
          )}
          <p className="cinema-description">{chapter.description}</p>
          <div className="cinema-project-stamp">
            <span>NOW IN FRAME</span>
            <strong>{chapter.product}</strong>
          </div>
          {activeScene === 0 && (
            <button
              type="button"
              className="cinema-work-link"
              onClick={() => onChapterSelect(1)}
            >
              Start the project tour <ArrowUpRight size={17} />
            </button>
          )}
          {activeScene === cinematicChapters.length - 1 && (
            <a className="cinema-work-link" href="#work">
              Explore selected work <ArrowUpRight size={17} />
            </a>
          )}
        </div>
        <div
          className={`cinema-device-wrap cinema-device-wrap-${activeScene}`}
          key={`device-${activeScene}`}
        >
          <div className="cinema-device-camera">
            <CinematicPhone scene={activeScene} />
          </div>
        </div>
        <div className="cinema-bottomline">
          <span>DELIGHTECH / CEO: OLAOLUWA MOSHOOD</span>
          <span>{chapter.marker} — 05</span>
          <button
            type="button"
            onClick={() => {
              if (activeScene === cinematicChapters.length - 1)
                document.getElementById("work")?.scrollIntoView({
                  behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)",
                  ).matches
                    ? "auto"
                    : "smooth",
                });
              else onChapterSelect(activeScene + 1);
            }}
          >
            <span>
              {activeScene === cinematicChapters.length - 1
                ? "EXPLORE THE WORK"
                : "SCROLL TO CONTINUE"}
            </span>
            <i>
              <ArrowDown size={17} />
            </i>
          </button>
        </div>
        <div className="cinema-track-progress" aria-hidden="true">
          <i />
        </div>
      </div>
    </section>
  );
}

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

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeScene, setActiveScene] = useState(0);
  const [portraitActive, setPortraitActive] = useState(false);
  const [cinemaVisible, setCinemaVisible] = useState(true);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const dismiss = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuRef.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 701px)");
    const resize = () => { if (desktop.matches) setMenuOpen(false); };
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    desktop.addEventListener("change", resize);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", escape);
      desktop.removeEventListener("change", resize);
    };
  }, [menuOpen]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const distance =
        document.documentElement.scrollHeight - window.innerHeight;
      const reading = document.querySelector<HTMLElement>(".reading-progress");
      if (reading)
        reading.style.transform = `scaleX(${distance > 0 ? window.scrollY / distance : 0})`;
      const track = document.getElementById("cinematic-intro");
      if (!track) return;
      const bounds = track.getBoundingClientRect();
      const travel = Math.max(1, track.offsetHeight - window.innerHeight);
      const nextProgress = Math.max(0, Math.min(1, -bounds.top / travel));
      track.style.setProperty("--intro-progress", String(nextProgress));
      track.style.setProperty(
        "--scene-progress",
        String((nextProgress * cinematicChapters.length) % 1),
      );
      const studioReveal = Math.min(
        1,
        Math.max(0, nextProgress * cinematicChapters.length * 4 - 0.35),
      );
      track.style.setProperty("--studio-reveal", String(studioReveal));
      // Change the message as the portrait becomes the dominant composition.
      // Scrolling back restores the opening copy at the same threshold.
      setPortraitActive(studioReveal >= 0.5);
      setActiveScene(
        Math.min(
          cinematicChapters.length - 1,
          Math.floor(nextProgress * cinematicChapters.length),
        ),
      );
      setCinemaVisible(bounds.bottom > 74 && bounds.top < window.innerHeight);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  const jumpToChapter = (index: number) => {
    const track = document.getElementById("cinematic-intro");
    if (!track) return;
    const travel = track.offsetHeight - window.innerHeight;
    const start = window.scrollY + track.getBoundingClientRect().top;
    const target =
      start + travel * ((index + 0.015) / cinematicChapters.length);
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches
      ? "auto"
      : "smooth";
    window.scrollTo({ top: target, behavior });
  };

  return (
    <main className="portfolio-shell" id="top">
      <a className="keyboard-skip" href="#work">Skip to selected work</a>
      {activeScene > 0 && <h1 className="sr-only">DelighTech — web and mobile software studio</h1>}
      <div className="reading-progress" aria-hidden="true" />
      <header
        ref={headerRef}
        className={`site-header ${cinemaVisible ? "site-header-cinema" : ""}`}
      >
        <a
          className="brand-mark"
          href="#top"
          aria-label="DelighTech, back to top"
        >
          DelighTech
        </a>
        <button
          ref={menuRef}
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <nav
          id="main-navigation"
          className={menuOpen ? "main-nav is-open" : "main-nav"}
          aria-label="Main navigation"
        >
          <a href="#work" onClick={() => setMenuOpen(false)}>
            Selected work
          </a>
          <a href="#services" onClick={() => setMenuOpen(false)}>
            Services
          </a>
          <a href="#engagement" onClick={() => setMenuOpen(false)}>
            Process
          </a>
          <a
            className="nav-contact"
            href="#contact"
            onClick={() => setMenuOpen(false)}
          >
            Let’s talk <ArrowUpRight size={14} />
          </a>
        </nav>
      </header>

      <CinematicIntro
        activeScene={activeScene}
        portraitActive={portraitActive}
        onChapterSelect={jumpToChapter}
      />

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
            Selected product showcases from DelighTech. Each starts with a real
            workflow and asks how software can make it feel lighter. Client
            commissions and collaboration credits are identified only when
            confirmed and approved for publication.
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

      <Services />

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
      <Engagement />

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
    </main>
  );
}
