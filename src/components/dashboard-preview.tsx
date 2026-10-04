import Image from "next/image";
import type { ReactNode } from "react";
import {
  BookOpen,
  CalendarDays,
  CheckSquare,
  CircleDot,
  LayoutDashboard,
  MessageSquare,
  Search,
  Settings,
  Target,
  Users,
  Wallet,
  Zap,
} from "lucide-react";
import styles from "./dashboard-preview.module.css";

type Product = "elara" | "oracle" | "cashflow" | "nomi" | "bizflow";
const navigation: Record<Product, string[]> = {
  elara: [
    "Dashboard",
    "Alarms",
    "Command center",
    "Inbox",
    "Calendar",
    "Meetings",
    "Tasks",
    "Operations",
    "Follow-ups",
    "Contacts",
    "Travel",
    "Expenses",
  ],
  oracle: [
    "Radar",
    "Explore",
    "Following",
    "Agent",
    "Workspace",
    "Roadmap",
    "Alerts",
    "Wallets",
  ],
  cashflow: [
    "Cashbooks",
    "Settings",
    "Business Team",
    "Business Settings",
    "Subscription & Billing",
    "Others",
    "Business Activity",
    "What's New",
    "Help Docs",
    "Contact Us",
  ],
  nomi: [
    "Overview",
    "Finance",
    "Activities",
    "Timeline",
    "Planner",
    "Habits",
    "Goals",
    "Insights",
    "Settings",
  ],
  bizflow: [
    "Activity Planner",
    "Goals",
    "Prospects",
    "Progress",
    "AI BizFlow Coach",
    "Team",
    "Learning",
    "Settings",
  ],
};
const icons = [
  LayoutDashboard,
  Wallet,
  CalendarDays,
  MessageSquare,
  Target,
  CheckSquare,
  Users,
  BookOpen,
  Settings,
];

function Shell({
  product,
  children,
}: {
  product: Product;
  children: ReactNode;
}) {
  const brand = {
    elara: "ELARA",
    oracle: "ORACLE",
    cashflow: "CASHFLOW",
    nomi: "nomi.",
    bizflow: "BizFlow",
  }[product];
  return (
    <figure
      className={`${styles.preview} ${styles[product]}`}
      aria-label={`${brand} source-based dashboard preview with sample data`}
    >
      <div className={styles.browser}>
        <span aria-hidden="true">● ● ●</span>
        <span>
          {product} / {navigation[product][0].toLowerCase()}
        </span>
        <span>SAMPLE DATA</span>
      </div>
      <div className={styles.app}>
        <aside
          className={styles.sidebar}
          aria-label={`${brand} preview navigation`}
        >
          <div className={styles.brand}>
            {product === "elara" && (
              <Image src="/elara-mark.svg" alt="" width={22} height={22} />
            )}
            {product === "oracle" && (
              <Image src="/oracle-mark.png" alt="" width={22} height={22} />
            )}
            {product === "cashflow" && (
              <Image
                src="/media/cashflow-mark.png"
                alt=""
                width={22}
                height={22}
              />
            )}
            {product === "bizflow" && (
              <span className={styles.brandIcon} aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
            )}
            <strong>
              {product === "nomi" ? (
                <>
                  n<span className={styles.brandAccent}>o</span>mi
                  <span className={styles.brandAccent}>.</span>
                </>
              ) : product === "bizflow" ? (
                <>
                  bizflow<span className={styles.brandAccent}>.</span>
                </>
              ) : (
                brand
              )}
            </strong>
          </div>
          <span className={styles.kicker}>
            {product === "nomi"
              ? "Your everyday"
              : product === "oracle"
                ? "Intelligence"
                : product === "cashflow"
                  ? "Book keeping"
                  : "Your workspace"}
          </span>
          <div className={styles.navigation}>
            {navigation[product].map((label, index) => {
              const Icon = icons[index % icons.length];
              const group =
                ["Operations", "Workspace", "Others", "Settings"].includes(
                  label,
                ) &&
                product !== "nomi" &&
                product !== "bizflow";
              return group ? (
                <span key={label} className={styles.group}>
                  {label}
                </span>
              ) : (
                <div
                  key={label}
                  className={index === 0 ? styles.active : undefined}
                >
                  <Icon size={12} strokeWidth={1.6} />
                  <span>{label}</span>
                </div>
              );
            })}
          </div>
          <div className={styles.sidebarFoot}>
            {product === "oracle"
              ? "● Demo intelligence"
              : product === "cashflow"
                ? "◐ Light mode"
                : "Small steps. Clearer days."}
          </div>
        </aside>
        <div className={styles.workspace}>
          <div className={styles.topbar}>
            <span>
              {product === "cashflow" ? "Studio workspace" : "My workspace"} /{" "}
              <b>{navigation[product][0]}</b>
            </span>
            <span className={styles.search}>
              <Search size={10} />
              {product === "elara"
                ? "Search workspace · ⌘K"
                : product === "oracle"
                  ? "Search intelligence · ⌘K"
                  : product === "bizflow"
                    ? "Private by default"
                    : "Personal"}
            </span>
          </div>
          <div className={styles.content}>{children}</div>
        </div>
      </div>
      <figcaption className={styles.caption}>
        Source-based interface preview · illustrative sample data
      </figcaption>
    </figure>
  );
}

function Heading({
  eyebrow,
  title,
  subtitle,
  action,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  action?: string;
}) {
  return (
    <div className={styles.heading}>
      <div>
        <span className={styles.kicker}>{eyebrow}</span>
        <h4>{title}</h4>
        <p>{subtitle}</p>
      </div>
      {action && <span className={styles.action}>{action}</span>}
    </div>
  );
}
function Metrics({ items }: { items: [string, string, string][] }) {
  return (
    <div className={styles.metrics}>
      {items.map(([label, value, note]) => (
        <div key={label}>
          <span>{label}</span>
          <strong>{value}</strong>
          <small>{note}</small>
        </div>
      ))}
    </div>
  );
}
function Panel({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow?: string;
  children: ReactNode;
}) {
  return (
    <section className={styles.panel}>
      {eyebrow && <span className={styles.kicker}>{eyebrow}</span>}
      <h5>{title}</h5>
      {children}
    </section>
  );
}
function Row({
  title,
  detail,
  value,
}: {
  title: string;
  detail?: string;
  value: string;
}) {
  return (
    <div className={styles.row}>
      <span>
        <strong>{title}</strong>
        {detail && <small>{detail}</small>}
      </span>
      <b>{value}</b>
    </div>
  );
}

export function ElaraPreview() {
  return (
    <Shell product="elara">
      <Heading
        eyebrow="Thursday, October 1"
        title="Good morning, Rebecca."
        subtitle="Here’s the shape of your executive’s day."
        action="Prepare my day"
      />
      <div className={styles.briefing}>
        <span className={styles.kicker}>Daily briefing</span>
        <h5>Today, grounded in your workspace.</h5>
        <p>
          3 calendar events today, 4 tasks due, and 2 items requiring attention.
        </p>
        <small>Ask for detail →</small>
      </div>
      <Metrics
        items={[
          ["Meetings today", "3", "Scheduled"],
          ["Tasks due", "4", "Today"],
          ["Waiting on", "2", "Follow-ups"],
          ["Needs attention", "2", "Priority queue"],
        ]}
      />
      <div className={styles.columns}>
        <Panel title="Today" eyebrow="Schedule">
          <Row
            title="Product sync"
            detail="Studio room · 30 min"
            value="09:30"
          />
          <Row
            title="Quarterly review"
            detail="Leadership team"
            value="11:00"
          />
          <Row title="Partnership call" detail="Briefing ready" value="14:15" />
        </Panel>
        <Panel title="Needs attention" eyebrow="Priority queue">
          <Row title="Send revised proposal" detail="Overdue task" value="→" />
          <Row
            title="Confirm Friday schedule"
            detail="Follow-up due"
            value="→"
          />
        </Panel>
      </div>
    </Shell>
  );
}

export function OraclePreview() {
  return (
    <Shell product="oracle">
      <div className={styles.radarHero}>
        <div>
          <span className={styles.kicker}>Autonomous market intelligence</span>
          <h4>
            See what the chain
            <br />
            <em>is revealing.</em>
          </h4>
          <p>
            Capital movement, wallet behavior, and market structure—in context.
          </p>
        </div>
        <div className={styles.radar} aria-hidden="true">
          <CircleDot size={72} strokeWidth={0.5} />
          <Zap size={16} />
        </div>
      </div>
      <div className={styles.streamHeading}>
        <strong>Live signal stream</strong>
        <span>Demo intelligence</span>
      </div>
      <div className={styles.filters}>
        {[
          "All signals",
          "Smart money",
          "Whales",
          "New launches",
          "Market shifts",
        ].map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
      <div className={styles.signal}>
        <span className={styles.kicker}>Smart money convergence · 2m ago</span>
        <h5>Smart money is converging</h5>
        <p>$AXIOM / Axiom Protocol · Solana</p>
        <p>9 tracked smart-money wallets entered within 15 minutes.</p>
        <div className={styles.signalMetrics}>
          <span>
            Smart buyers <b>9</b>
          </span>
          <span>
            Smart sellers <b>1</b>
          </span>
          <span>
            5m volume <b>$92.4K</b>
          </span>
        </div>
        <small>Investigate →</small>
      </div>
      <div className={styles.signal}>
        <span className={styles.kicker}>Smart money distribution · 6m ago</span>
        <h5>Distribution beneath strength</h5>
        <p>$NOVA / Nova Mesh · 7 tracked wallets reduced positions.</p>
        <small>Investigate →</small>
      </div>
    </Shell>
  );
}

export function CashflowPreview() {
  return (
    <Shell product="cashflow">
      <Heading
        eyebrow="Cashbooks"
        title="Studio workspace"
        subtitle="Keep each project’s business records together."
        action="Business Team"
      />
      <div className={styles.booksLayout}>
        <div>
          <div className={styles.booksSummary}>
            <span>Your books</span>
            <strong>3 active books</strong>
            <small>Combined balance · USD 2,840.00</small>
          </div>
          <div className={styles.bookTools}>
            <span>
              <Search size={10} /> Search by book name…
            </span>
            <span>Last Updated ↓</span>
            <b>＋ Add New Book</b>
          </div>
          <p className={styles.archive}>□ Show archived books</p>
          <div className={styles.bookRows}>
            <Row
              title="Studio operations"
              detail="2 members · Updated today"
              value="1,640.00"
            />
            <Row
              title="Client projects"
              detail="3 members · Updated yesterday"
              value="950.00"
            />
            <Row
              title="Equipment"
              detail="1 member · Updated 2 days ago"
              value="250.00"
            />
          </div>
        </div>
        <div className={styles.bookTip}>
          <BookOpen size={25} />
          <h5>Organize your business money</h5>
          <p>
            Create a separate cashbook for each team, branch, customer, or
            project.
          </p>
          <small>Add another book ›</small>
        </div>
      </div>
    </Shell>
  );
}

export function NomiPreview() {
  return (
    <Shell product="nomi">
      <Heading
        eyebrow="Your life, at a glance"
        title="Hello, Alex."
        subtitle="A little perspective on your money and your day."
        action="＋ Add entry"
      />
      <Metrics
        items={[
          ["Total balance", "₦482,600", "2 accounts in NGN"],
          ["Money in", "₦185,000", "This month · NGN"],
          ["Money out", "₦42,400", "This month · NGN"],
          ["Time logged today", "3h 20m", "3 activities recorded"],
        ]}
      />
      <div className={styles.columns}>
        <Panel
          title="Your recent days"
          eyebrow="A shared view of time and money"
        >
          <Row title="Deep work" detail="Work · Today, 09:00" value="2h" />
          <Row
            title="Client payment"
            detail="Income · Bank account"
            value="+₦185,000"
          />
          <Row title="Learning" detail="Personal growth · Today" value="1h" />
        </Panel>
        <div className={styles.stack}>
          <Panel title="Quick actions">
            <Row
              title="Add transaction"
              detail="Capture money movement"
              value="↗"
            />
            <Row
              title="Log an activity"
              detail="Give your time context"
              value="◷"
            />
            <Row title="Add an account" value="＋" />
          </Panel>
          <div className={styles.reflection}>
            Awareness is a<br />
            good place to start.
          </div>
        </div>
      </div>
    </Shell>
  );
}

export function BizflowPreview() {
  return (
    <Shell product="bizflow">
      <Heading
        eyebrow="Activity planner · Thursday, October 1"
        title="Plan, do, and review, Olaoluwa."
        subtitle="Plan → Do → Remind → Track → Review."
        action="＋ New goal"
      />
      <div className={styles.planningTabs}>
        <b>Day</b>
        <span>Week</span>
        <span>Month</span>
      </div>
      <div className={styles.practicalHeading}>
        <span className={styles.kicker}>Your day, at a glance</span>
        <h5>Good morning, Olaoluwa</h5>
      </div>
      <div className={styles.columns}>
        <Panel title="Today’s Focus">
          <Row title="Prospecting" value="2 / 5" />
          <Row title="Outreach" value="4 / 8" />
          <Row title="Follow-up" value="Sam Taylor" />
        </Panel>
        <Panel title="This Week" eyebrow="Weekly Progress: 60%">
          <Row title="Monday" value="60 / 90 min" />
          <Row title="Tuesday" value="90 / 90 min" />
          <Row title="Wednesday" value="30 / 120 min" />
        </Panel>
      </div>
      <Panel title="Coming Up">
        <Row
          title="Team presentation"
          detail="October 2 · Online"
          value="10:00"
        />
      </Panel>
      <div className={styles.planningStats}>
        <span>
          <b>90</b> min planned
        </span>
        <span>
          <b>40</b> min recorded
        </span>
        <span>
          <b>2</b> active goals
        </span>
      </div>
    </Shell>
  );
}
