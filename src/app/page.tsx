"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, CodeXml, Menu, X } from "lucide-react";

function ElaraPreview() {
  return <div className="product-window elara-window" aria-label="Elara workspace interface preview">
    <div className="window-topbar"><div className="window-dots"><i /><i /><i /></div><span>elara / command center</span><span className="window-date">SAMPLE DATA</span></div>
    <div className="elara-layout"><aside className="elara-sidebar"><Image src="/elara-mark.svg" alt="" width={25} height={25} /><div className="side-active">⌂</div><span>▤</span><span>◷</span><span>✓</span><span>◎</span><span className="side-bottom">↗</span></aside>
      <div className="elara-content"><div className="preview-greeting"><span>THURSDAY, OCTOBER 01</span><strong>Good morning, Myolaoluwa.</strong></div>
        <div className="briefing-strip"><span className="briefing-spark">✳</span><span>Your day, in focus</span><small>3 meetings · 2 follow-ups · 4 tasks</small><ArrowUpRight size={14} /></div>
        <div className="elara-columns"><div className="preview-panel"><div className="panel-heading"><strong>Today</strong><span>All events ↗</span></div>
          <div className="meeting-item"><b>09:30</b><span><strong>Product sync</strong><small>Studio room · 30 min</small></span><i className="meeting-dot" /></div><div className="meeting-item"><b>11:00</b><span><strong>Quarterly review</strong><small>Leadership team</small></span><i className="meeting-dot muted" /></div><div className="meeting-item"><b>14:15</b><span><strong>Partnership call</strong><small>Briefing ready</small></span><i className="meeting-dot muted" /></div>
        </div><div className="preview-panel task-panel"><div className="panel-heading"><strong>Next actions</strong><span>2 of 4 done</span></div><div className="task-progress"><span /></div><p><i className="task-check checked">✓</i> Review agenda notes</p><p><i className="task-check" /> Send revised proposal</p><p><i className="task-check" /> Confirm Friday schedule</p><div className="task-note"><span>ELARA NOTE</span><br />The partnership call has a briefing and 2 open follow-ups.</div></div></div>
      </div></div><div className="window-caption"><span>01 / EXECUTIVE WORKSPACE</span><span>GROUNDED, ORGANIZED, READY.</span></div></div>;
}

function OraclePreview() {
  return <div className="product-window oracle-window" aria-label="Oracle market radar interface preview">
    <div className="oracle-topbar"><div className="oracle-brand"><Image src="/oracle-mark.png" alt="" width={27} height={27} /><strong>ORACLE</strong><span>INTELLIGENCE</span></div><span className="radar-live">SAMPLE FEED</span></div>
    <div className="oracle-layout"><div className="oracle-rail"><span className="rail-active">◉</span><span>⌕</span><span>⌖</span><span>◷</span></div><div className="oracle-content">
      <div className="oracle-head"><div><span className="micro-label">SAMPLE SIGNALS / SOLANA</span><h3>Radar</h3></div><span className="oracle-updated">Illustrative events</span></div>
      <div className="signal-row signal-hot"><div className="signal-icon">↗</div><div className="signal-copy"><span>SMART MONEY CONVERGENCE</span><strong>$BONK</strong><small>9 tracked wallets entered in 12 minutes</small></div><div className="signal-score">92<span> / 100</span></div></div>
      <div className="signal-row"><div className="signal-icon blue-icon">⌁</div><div className="signal-copy"><span>WHALE ROTATION</span><strong>$JUP → $RAY</strong><small>$84K moved across 4 wallets</small></div><div className="signal-age">4m</div></div>
      <div className="signal-row"><div className="signal-icon orange-icon">↘</div><div className="signal-copy"><span>DISTRIBUTION</span><strong>$WIF</strong><small>7 tracked wallets reduced positions</small></div><div className="signal-age">9m</div></div><div className="oracle-footer"><span>DEMO FEED</span><span>EXAMPLE DATA</span></div>
    </div></div></div>;
}

function CashflowPreview() {
  return <div className="product-window cashflow-window" aria-label="Illustrative Cashflow web and mobile app preview">
    <div className="window-topbar"><div className="window-dots"><i /><i /><i /></div><span>cashflow / overview</span><span className="window-date">SAMPLE DATA</span></div>
    <div className="cashflow-app"><aside className="cashflow-sidebar"><strong>c.</strong><span className="preview-active">⌂</span><span>↔</span><span>▤</span><span>◷</span><span>◎</span></aside>
      <div className="cashflow-content"><div className="cashflow-heading"><div><span>OVERVIEW / OCTOBER</span><strong>Good morning.</strong></div><span className="cashflow-avatar">M</span></div>
        <div className="cashflow-balance"><span>AVAILABLE BALANCE <i>•••</i></span><strong>₦ 2,840,500</strong><small>Across your accounts</small><div className="cashflow-chart">{Array.from({ length: 12 }, (_, i) => <i key={i} />)}</div></div>
        <div className="cashflow-summary"><div><span>INCOME</span><strong>₦ 680,000</strong></div><div><span>SPENDING</span><strong>₦ 214,300</strong></div><div><span>BUDGET LEFT</span><strong>₦ 85,700</strong></div></div>
        <div className="cashflow-activity"><strong>Recent activity</strong><span>Groceries <b>− ₦ 24,500</b></span><span>Client payment <b>+ ₦ 185,000</b></span></div>
      </div>
    </div><div className="window-caption"><span>WEB + MOBILE APP</span><span>ILLUSTRATIVE INTERFACE / SAMPLE DATA</span></div>
  </div>;
}

function NomiPreview() {
  return <div className="product-window nomi-window" aria-label="Illustrative Nomi personal dashboard preview">
    <div className="window-topbar"><div className="window-dots"><i /><i /><i /></div><span>nomi / your overview</span><span className="window-date">SAMPLE DATA</span></div>
    <div className="nomi-app"><div className="nomi-heading"><div><span>YOUR WEEK AT A GLANCE</span><strong>A little more in balance.</strong></div><span className="nomi-date">OCT 01 — 07</span></div>
      <div className="nomi-summary"><div className="nomi-card nomi-money"><span>MONEY IN</span><strong>₦ 482,600</strong><small>This month</small><div className="nomi-chart">{Array.from({ length: 10 }, (_, i) => <i key={i} />)}</div></div><div className="nomi-card"><span>TIME SPENT</span><strong>18h 40m</strong><small>Across 6 activities</small><div className="nomi-timebar"><i /><i /><i /></div><small>Work · Learning · Life</small></div></div>
      <div className="nomi-lower"><div className="nomi-panel"><span>HABIT CHECK-IN</span><strong>4 day streak</strong><div className="nomi-days"><i> M </i><i> T </i><i> W </i><i> T </i><i> F </i><i> S </i><i> S </i></div></div><div className="nomi-panel nomi-goal"><span>GOAL / SAVE FOR A NEW LAPTOP</span><strong>68% there</strong><div className="nomi-progress"><i /></div></div></div>
    </div><div className="window-caption"><span>MONEY · TIME · HABITS · GOALS</span><span>ILLUSTRATIVE INTERFACE / SAMPLE DATA</span></div>
  </div>;
}

function BizflowPreview() {
  return <div className="product-window bizflow-window" aria-label="Illustrative BizFlow goals and daily action preview">
    <div className="window-topbar"><div className="window-dots"><i /><i /><i /></div><span>bizflow / today</span><span className="window-date">SAMPLE DATA</span></div>
    <div className="bizflow-app"><aside className="bizflow-rail"><strong>b.</strong><span className="bizflow-active">⌂</span><span>◎</span><span>▤</span><span>◷</span></aside>
      <div className="bizflow-content"><div className="bizflow-greeting"><span>MONDAY / YOUR NEXT STEP</span><strong>Make room for what matters.</strong><small>A steady day is built one small action at a time.</small></div>
        <div className="bizflow-focus"><div><span>FOCUS FOR TODAY</span><strong>Build a calmer morning</strong><small>Personal goal · Week 3 of 6</small></div><div className="bizflow-ring">68<small>%</small></div></div>
        <div className="bizflow-tasks"><div className="bizflow-list-head"><strong>Today’s plan</strong><span>2 / 4 done</span></div><div><i className="done">✓</i><span>Review weekly priorities</span><small>09:00</small></div><div><i />Prepare the project brief<small>11:30</small></div><div><i />Take a proper lunch break<small>13:00</small></div></div>
      </div>
    </div><div className="window-caption"><span>GOALS → DAILY ACTION</span><span>ILLUSTRATIVE INTERFACE / SAMPLE DATA</span></div>
  </div>;
}

const cinematicChapters = [
  {
    marker: "01",
    eyebrow: "START WITH THE QUESTION",
    title: <>Good software begins with a <em>better question.</em></>,
    description: "I’m Myolaoluwa. I turn the complicated parts of work and everyday life into products that feel clear, useful, and human.",
    product: "DELIGHTECH",
    screenTitle: "A useful place to begin",
  },
  {
    marker: "02",
    eyebrow: "FIND THE SIGNAL",
    title: <>Make the important thing <em>impossible to miss.</em></>,
    description: "Oracle brings scattered market activity into focus, so a signal comes with context instead of noise.",
    product: "ORACLE",
    screenTitle: "Radar / live signals",
  },
  {
    marker: "03",
    eyebrow: "CONNECT THE CONTEXT",
    title: <>Keep the whole picture <em>in reach.</em></>,
    description: "Elara gives busy teams one grounded place for the meetings, follow-ups, and details that should not get lost.",
    product: "ELARA",
    screenTitle: "Your day, in focus",
  },
  {
    marker: "04",
    eyebrow: "MAKE MONEY FEEL CLEARER",
    title: <>A calmer view of what comes <em>in and out.</em></>,
    description: "Cashflow turns everyday money movement into a picture people can actually make decisions from.",
    product: "CASHFLOW",
    screenTitle: "Your money, at a glance",
  },
  {
    marker: "05",
    eyebrow: "MAKE THE NEXT STEP SMALLER",
    title: <>Turn good intentions into <em>real momentum.</em></>,
    description: "From personal routines to ambitious products, the best next step is the one that feels possible to take.",
    product: "NOMI / BIZFLOW",
    screenTitle: "A little more in balance",
  },
];

function CinematicPhone({ scene }: { scene: number }) {
  return <div className={`cinema-phone cinema-phone-${scene}`} aria-label={`${cinematicChapters[scene].product} product preview`}>
    <div className="cinema-phone-screen">
      <div className="phone-status"><span>9:41</span><span>● ● ▰</span></div>
      <div className="phone-title-row"><div><span>{cinematicChapters[scene].product}</span><strong>{cinematicChapters[scene].screenTitle}</strong></div><b>DT</b></div>
      {scene === 0 && <div className="phone-origin-screen"><span>PRODUCT STUDIO / 2026</span><strong>Make the next step<br />feel obvious.</strong><div className="origin-flow"><i>QUESTION</i><b /><i>INTERFACE</i><b /><i>IMPACT</i></div><small>WEB · MOBILE · PRODUCT</small></div>}
      {scene === 1 && <div className="phone-radar-screen"><div className="phone-signal"><span>SMART MONEY CONVERGENCE</span><strong>$BONK</strong><small>9 tracked wallets moved in 12 min</small><b>92 <i>/ 100</i></b></div><div className="phone-signal"><span>WHALE ROTATION</span><strong>$JUP → $RAY</strong><small>$84K moved across 4 wallets</small></div><div className="phone-signal"><span>DISTRIBUTION</span><strong>$WIF</strong><small>7 wallets reduced positions</small></div><div className="phone-phone-foot">SIGNALS / EXPLAINED</div></div>}
      {scene === 2 && <div className="phone-elara-screen"><div className="phone-brief"><span>THURSDAY · YOUR DAY</span><strong>Good morning.</strong><small>3 meetings · 2 follow-ups</small></div><div className="phone-event"><b>09:30</b><span><strong>Product sync</strong><small>Studio room · 30 min</small></span></div><div className="phone-event"><b>11:00</b><span><strong>Quarterly review</strong><small>Briefing ready</small></span></div><div className="phone-event"><b>14:15</b><span><strong>Partnership call</strong><small>2 open follow-ups</small></span></div><div className="phone-assist">✳ &nbsp; Your day, in focus</div></div>}
      {scene === 3 && <div className="phone-cashflow-screen"><div className="phone-money-card"><span>AVAILABLE BALANCE</span><strong>₦ 2,840,500</strong><small>Across your accounts</small><div className="phone-chart">{[32, 52, 40, 68, 54, 76, 61, 92, 70, 100].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}</div></div><div className="phone-money-totals"><div><span>INCOME</span><b>₦ 680,000</b></div><div><span>SPENDING</span><b>₦ 214,300</b></div></div><div className="phone-transaction"><span>Groceries</span><b>− ₦ 24,500</b></div><div className="phone-transaction"><span>Client payment</span><b>+ ₦ 185,000</b></div></div>}
      {scene === 4 && <div className="phone-nomi-screen"><div className="phone-week-card"><span>YOUR WEEK AT A GLANCE</span><strong>A little more<br />in balance.</strong><div className="phone-week-bars">{[32, 50, 40, 72, 57, 82, 61, 92].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}</div></div><div className="phone-life-card"><span>TIME SPENT</span><strong>18h 40m</strong><div><i /><i /><i /></div><small>Work · Learning · Life</small></div><div className="phone-goal-card"><span>YOUR NEXT STEP</span><strong>Build a steady morning</strong><small>4 day streak · 68% to your goal</small><div><i /></div></div></div>}
      <div className="phone-tabbar"><span>⌂<small>HOME</small></span><span>◷<small>ACTIVITY</small></span><span>◎<small>PROFILE</small></span></div>
    </div>
    <span className="phone-side-button" />
  </div>;
}

function CinematicIntro({ progress, activeScene, onChapterSelect }: { progress: number; activeScene: number; onChapterSelect: (index: number) => void }) {
  const chapter = cinematicChapters[activeScene];
  return <section className="cinema-track" id="cinematic-intro" aria-label="A short film about how I build products">
    <div className="cinema-stage">
      <div className={`cinema-backdrop cinema-backdrop-${activeScene}`} key={activeScene} aria-hidden="true" />
      <div className="cinema-wash" aria-hidden="true" />
      <div className="cinema-grain" aria-hidden="true" />
      <div className="cinema-topline"><span>DELIGHTECH / FIELD NOTES</span><span>WEB · MOBILE · PRODUCT</span></div>
      <nav className="cinema-rail" aria-label="Intro chapters">
        <span className="cinema-rail-brand">DT</span>
        <div className="cinema-rail-steps">{cinematicChapters.map((item, index) => <button type="button" key={item.marker} className={activeScene === index ? "is-current" : ""} aria-label={`Go to chapter ${item.marker}: ${item.eyebrow.toLowerCase()}`} aria-current={activeScene === index ? "step" : undefined} onClick={() => onChapterSelect(index)}><span>{item.marker}</span><i /></button>)}</div>
        <span className="cinema-rail-end">05</span>
      </nav>
      <div className="cinema-copy" key={`copy-${activeScene}`}>
        <p className="cinema-eyebrow"><span>{chapter.marker}</span> {chapter.eyebrow}</p>
        {activeScene === 0 ? <h1>{chapter.title}</h1> : <h2>{chapter.title}</h2>}
        <p className="cinema-description">{chapter.description}</p>
        <div className="cinema-project-stamp"><span>NOW IN FRAME</span><strong>{chapter.product}</strong></div>
        {activeScene === cinematicChapters.length - 1 && <a className="cinema-work-link" href="#work">Explore selected work <ArrowUpRight size={17} /></a>}
      </div>
      <div className={`cinema-device-wrap cinema-device-wrap-${activeScene}`} key={`device-${activeScene}`}>
        <CinematicPhone scene={activeScene} />
      </div>
      <div className="cinema-bottomline"><span>MYOLAOLUWA / INDEPENDENT PRODUCT DEVELOPER</span><span>{chapter.marker} — 05</span><button type="button" onClick={() => onChapterSelect(Math.min(activeScene + 1, cinematicChapters.length - 1))} disabled={activeScene === cinematicChapters.length - 1}><span>{activeScene === cinematicChapters.length - 1 ? "EXPLORE THE WORK" : "SCROLL TO CONTINUE"}</span><i><ArrowDown size={17} /></i></button></div>
      <div className="cinema-track-progress" aria-hidden="true"><i style={{ height: `${progress * 100}%` }} /></div>
    </div>
  </section>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [cinemaProgress, setCinemaProgress] = useState(0);
  const [activeScene, setActiveScene] = useState(0);
  const [cinemaVisible, setCinemaVisible] = useState(true);

  useEffect(() => {
    const update = () => {
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(distance > 0 ? window.scrollY / distance * 100 : 0);
      const track = document.getElementById("cinematic-intro");
      if (!track) return;
      const bounds = track.getBoundingClientRect();
      const travel = Math.max(1, track.offsetHeight - window.innerHeight);
      const nextProgress = Math.max(0, Math.min(1, -bounds.top / travel));
      setCinemaProgress(nextProgress);
      setActiveScene(Math.min(cinematicChapters.length - 1, Math.floor(nextProgress * cinematicChapters.length)));
      setCinemaVisible(bounds.bottom > 74 && bounds.top < window.innerHeight);
    };
    update(); window.addEventListener("scroll", update, { passive: true }); window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);

  const jumpToChapter = (index: number) => {
    const track = document.getElementById("cinematic-intro");
    if (!track) return;
    const travel = track.offsetHeight - window.innerHeight;
    const start = window.scrollY + track.getBoundingClientRect().top;
    const target = start + travel * (index / cinematicChapters.length);
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    window.scrollTo({ top: target, behavior });
  };

  return <main className="portfolio-shell" id="top">
    <div className="reading-progress" style={{ width: `${progress}%` }} />
    <header className={`site-header ${cinemaVisible ? "site-header-cinema" : ""}`}><a className="brand-mark" href="#top" aria-label="DelighTech, back to top">DelighTech</a><button className="menu-toggle" type="button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button><nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Main navigation"><a href="#work" onClick={() => setMenuOpen(false)}>Selected work</a><a href="#approach" onClick={() => setMenuOpen(false)}>Approach</a><a className="nav-contact" href="#contact" onClick={() => setMenuOpen(false)}>Let’s talk <ArrowUpRight size={14} /></a></nav></header>

    <CinematicIntro progress={cinemaProgress} activeScene={activeScene} onChapterSelect={jumpToChapter} />

    <section className="intro-band" aria-label="Introduction"><span className="section-index">01 / THE THROUGHLINE</span><p>Different problems. One instinct: <strong>make the next step clearer.</strong></p><span className="intro-mark">✳</span></section>
    <section className="featured-section" id="work" aria-labelledby="work-title"><div className="section-heading"><div><span className="section-index">02 / SELECTED WORK</span><h2 id="work-title">Built around<br /><em>real problems.</em></h2></div><p>A few products I’ve taken from an idea to a working experience. Each starts with a real workflow and asks how software can make it feel lighter.</p></div>
      <article className="featured-project elara-project"><div className="feature-copy"><div className="project-kicker"><span>01</span><span>AI · EXECUTIVE WORKSPACE</span><span className="status-chip"><i /> LIVE BUILD</span></div><div className="feature-title-row"><Image src="/elara-mark.svg" alt="" width={36} height={36} /><h3>Elara</h3></div><p className="feature-lede">The operating workspace for executive assistants.</p><p className="feature-description">Meetings, tasks, email, and executive memory, gathered in one grounded workspace. Built to keep context connected and sensitive actions in human hands.</p><div className="feature-tags"><span>Next.js</span><span>TypeScript</span><span>Prisma</span><span>AI workflows</span></div><div className="feature-links"><a href="https://elara-nu.vercel.app" target="_blank" rel="noreferrer">Explore Elara <ArrowUpRight size={15} /></a><a href="https://github.com/myolaoluwa/Elara" target="_blank" rel="noreferrer">Source code <CodeXml size={14} /></a></div></div><div className="feature-visual"><ElaraPreview /></div><span className="feature-index-ghost">01</span></article>
      <article className="featured-project oracle-project"><div className="feature-visual"><OraclePreview /></div><div className="feature-copy"><div className="project-kicker"><span>02</span><span>WEB3 · MARKET INTELLIGENCE</span><span className="status-chip status-prototype">● PRODUCT MVP</span></div><div className="feature-title-row"><Image src="/oracle-mark.png" alt="" width={38} height={38} /><h3>Oracle</h3></div><p className="feature-lede">Let the market reveal what matters.</p><p className="feature-description">A market intelligence interface that detects unusual on-chain activity, explains the evidence, and makes tokens and wallets easier to investigate.</p><div className="feature-tags"><span>Next.js</span><span>TypeScript</span><span>Detection engine</span><span>Structured data</span></div><div className="feature-links"><a href="https://github.com/myolaoluwa/Oracle" target="_blank" rel="noreferrer">Explore the build <ArrowUpRight size={15} /></a></div></div><span className="feature-index-ghost">02</span></article>
    </section>

    <article className="featured-project cashflow-project"><div className="feature-copy"><div className="project-kicker"><span>03</span><span>FINTECH · WEB + MOBILE APP</span><span className="status-chip status-prototype">MULTI-PLATFORM</span></div><div className="feature-title-row"><span className="project-monogram cashflow-monogram">C</span><h3>Cashflow</h3></div><p className="feature-lede">A clearer picture of money, wherever you are.</p><p className="feature-description">A multi-platform bookkeeping and cash management product for individuals, small businesses, freelancers, merchants, and teams. The project includes a web app, Expo and React Native apps, a backend service, and shared validation and types.</p><div className="feature-tags"><span>Next.js</span><span>Expo</span><span>React Native</span><span>PostgreSQL</span></div><div className="feature-links"><a href="https://cashflow-delight12.vercel.app" target="_blank" rel="noreferrer">Open web app <ArrowUpRight size={15} /></a><a href="https://github.com/myolaoluwa/cashflow" target="_blank" rel="noreferrer">Source code <CodeXml size={14} /></a></div></div><div className="feature-visual"><CashflowPreview /></div><span className="feature-index-ghost">03</span></article>
    <article className="featured-project nomi-project"><div className="feature-visual"><NomiPreview /></div><div className="feature-copy"><div className="project-kicker"><span>04</span><span>PERSONAL SYSTEMS · DASHBOARD</span><span className="status-chip status-prototype">LOCAL-FIRST MVP</span></div><div className="feature-title-row"><span className="project-monogram nomi-monogram">N</span><h3>Nomi</h3></div><p className="feature-lede">A more connected view of everyday life.</p><p className="feature-description">A personal dashboard bringing money, time, tasks, habits, and goals into one timeline. Track progress, review patterns, and get data-backed answers from your own records.</p><div className="feature-tags"><span>TypeScript</span><span>React</span><span>PGlite</span><span>Offline-ready</span></div><div className="feature-links"><a href="https://github.com/myolaoluwa/Nomi" target="_blank" rel="noreferrer">Explore the build <ArrowUpRight size={15} /></a></div></div><span className="feature-index-ghost">04</span></article>
    <article className="featured-project bizflow-project"><div className="feature-copy"><div className="project-kicker"><span>05</span><span>GOALS · DAILY ACTION</span><span className="status-chip"><i /> LIVE BUILD</span></div><div className="feature-title-row"><span className="project-monogram bizflow-monogram">B</span><h3>BizFlow</h3></div><p className="feature-lede">Make meaningful goals easier to move on.</p><p className="feature-description">A mobile-first workspace for turning big intentions into manageable daily steps, supported by a Today dashboard, progress tracking, and thoughtful team summaries.</p><div className="feature-tags"><span>TypeScript</span><span>SQLite</span><span>Responsive product</span><span>Team summaries</span></div><div className="feature-links"><a href="https://bizflow-eta-two.vercel.app" target="_blank" rel="noreferrer">Explore BizFlow <ArrowUpRight size={15} /></a><a href="https://github.com/myolaoluwa/bizflow" target="_blank" rel="noreferrer">Source code <CodeXml size={14} /></a></div></div><div className="feature-visual"><BizflowPreview /></div><span className="feature-index-ghost">05</span></article>

    <section className="approach-section" id="approach" aria-labelledby="approach-title"><div className="approach-intro"><span className="section-index">04 / HOW I APPROACH IT</span><h2 id="approach-title">Thoughtful<br />from <em>first sketch</em><br />to first use.</h2><p>I like working across the whole product: understanding the job, shaping the interface, and making the details hold up in real use.</p></div><div className="approach-steps"><div className="approach-step"><span>01</span><div><h3>Find the friction</h3><p>Start with the real workflow, the people inside it, and the part that keeps getting in the way.</p></div><ArrowDownRight size={17} /></div><div className="approach-step"><span>02</span><div><h3>Shape the product</h3><p>Turn the messy middle into clear priorities, calm interfaces, and a useful first version.</p></div><ArrowDownRight size={17} /></div><div className="approach-step"><span>03</span><div><h3>Build for the edges</h3><p>Make the everyday path feel easy, and give errors, empty states, and sensitive actions the same care.</p></div><ArrowDownRight size={17} /></div></div></section>
    <section className="toolkit-strip" aria-label="Tools and technologies"><span className="section-index">WEB + APP DEVELOPMENT</span><div className="toolkit-list"><span>TypeScript</span><i /><span>React</span><i /><span>Next.js</span><i /><span>Expo</span><i /><span>React Native</span><i /><span>Python</span><i /><span>PostgreSQL</span><i /><span>Supabase</span></div></section>
    <section className="contact-section" id="contact" aria-labelledby="contact-title"><div className="contact-stamp">OPEN<br />SOURCE<br /><span>♥</span><br />OPEN MIND</div><div className="contact-content"><span className="section-index">05 / YOUR TURN</span><h2 id="contact-title">Have a useful<br />problem? <em>Let’s build.</em></h2><p>If you’re working on something that could make a real day a little easier, I’d like to hear about it.</p><a className="button button-dark" href="https://github.com/myolaoluwa" target="_blank" rel="noreferrer">Find me on GitHub <ArrowUpRight size={16} /></a></div><div className="contact-mark">DT<span>.</span></div></section>
    <footer className="site-footer"><a className="footer-brand" href="#top">DelighTech</a><span>Built with care by Myolaoluwa.</span><div><a href="https://github.com/myolaoluwa" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={13} /></a><a href="#top">Back to top <ArrowRight size={13} /></a></div><small>© 2026 DELIGHTECH</small></footer>
  </main>;
}
