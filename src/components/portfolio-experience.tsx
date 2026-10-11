"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Menu,
  X,
} from "lucide-react";

// These detailed interfaces are only needed after entering the project tour.
const MobileDashboardPreview = dynamic(
  () => import("./mobile-dashboard-preview").then(module => module.MobileDashboardPreview),
  { loading: () => <div className="cinema-preview-loading" role="status">Loading project preview…</div> },
);

const cinematicChapters = [
  {
    marker: "01",
    eyebrow: "DELIGHTECH / DESIGN & SOFTWARE STUDIO",
    title: (
      <>
        Good software begins with a <em>better question.</em>
      </>
    ),
    description:
      "DelighTech designs and builds websites, web applications, and mobile apps for businesses—from the first product decision to launch.",
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
  studioRequested,
  onChapterSelect,
}: {
  activeScene: number;
  portraitActive: boolean;
  studioRequested: boolean;
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
                quality={60}
                className="cinema-opening-image"
              />
            )}
          </div>
          <div className="cinema-studio">
            {studioRequested && <Image
              src="/media/myolaoluwa-studio.webp"
              alt=""
              fill
              sizes="(max-width: 700px) 100vw, 106vw"
            />}
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
          {activeScene !== 0 && <div className="cinema-project-stamp">
            <span>NOW IN FRAME</span>
            <strong>{chapter.product}</strong>
          </div>}
          {activeScene === 0 && (
            <div className="cinema-opening-actions">
              <div className="cinema-action-pair">
                <a className="cinema-booking" href="https://calendly.com/hello-delightech/30min" target="_blank" rel="noopener noreferrer" aria-label="Book a discovery call — opens in a new tab">
                  Book a discovery call <ArrowUpRight size={16} aria-hidden="true" />
                </a>
                <a className="cinema-explore" href="#work">
                  Explore our work <ArrowDownRight size={16} aria-hidden="true" />
                </a>
              </div>
              <div className="cinema-optional-links">
                <button type="button" onClick={() => onChapterSelect(1)}>Take the project tour <ArrowRight size={14} aria-hidden="true" /></button>
                <a href="#services">How we can help</a>
              </div>
            </div>
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


export default function PortfolioExperience({ children }: {
  children: ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeScene, setActiveScene] = useState(0);
  const [portraitActive, setPortraitActive] = useState(false);
  const [studioRequested, setStudioRequested] = useState(false);
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
      // Start the portrait transfer as its scroll reveal begins, not while
      // hidden behind the first frame. Keep it cached when scrolling back.
      if (studioReveal > 0 && nextProgress < 1 / cinematicChapters.length)
        setStudioRequested(true);
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
          <Link href="/insights" onClick={() => setMenuOpen(false)}>
            Insights
          </Link>
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
        studioRequested={studioRequested}
        onChapterSelect={jumpToChapter}
      />

      {children}
    </main>
  );
}
