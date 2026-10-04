import type { ReactNode } from "react";
import {
  Bell,
  BookOpen,
  Bot,
  CalendarDays,
  Check,
  ClipboardList,
  Compass,
  HelpCircle,
  Menu,
  MoreVertical,
  Plus,
  Radio,
  Search,
  Settings,
  SlidersHorizontal,
  Users,
  WalletCards,
} from "lucide-react";
import styles from "./mobile-dashboard-preview.module.css";

type Product = "oracle" | "elara" | "cashflow" | "nomi";
const products: Product[] = ["oracle", "elara", "cashflow", "nomi"];

function Screen({
  product,
  children,
  navigation,
}: {
  product: Product;
  children: ReactNode;
  navigation?: ReactNode;
}) {
  return (
    <div
      className={`${styles.screen} ${styles[product]}`}
      data-mobile-project={product}
    >
      <div className={styles.status}>
        <span>9:41</span>
        <span>● ● ▰</span>
      </div>
      <div className={styles.viewport}>{children}</div>
      {navigation}
      <div className={styles.sample}>SOURCE-BASED MOBILE · SAMPLE DATA</div>
    </div>
  );
}

function OracleMobile() {
  return (
    <Screen
      product="oracle"
      navigation={
        <div className={styles.tabs}>
          {[
            [Radio, "Radar"],
            [Compass, "Explore"],
            [WalletCards, "Following"],
            [Bot, "Agent"],
          ].map(([Icon, label]) => {
            const TabIcon = Icon as typeof Radio;
            return (
              <span key={label as string}>
                <TabIcon />
                <small>{label as string}</small>
              </span>
            );
          })}
        </div>
      }
    >
      <div className={styles.header}>
        <span className={styles.breadcrumb}>
          ORACLE / <b>RADAR</b>
        </span>
        <div className={styles.headerIcons}>
          <Search />
          <Bell />
          <span className={styles.avatar}>OX</span>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.radarHero}>
          <span className={styles.eyebrow}>
            ● Autonomous market intelligence
          </span>
          <h4>
            See what the chain
            <br />
            <em>is revealing.</em>
          </h4>
          <p>
            Oracle monitors capital movement, wallet behavior, and market
            structure—turning on-chain activity into intelligence.
          </p>
          <div className={styles.radar} />
        </div>
        <div className={styles.stream}>
          <strong>Live signal stream</strong>
          <small>● Demo</small>
        </div>
        <p className={styles.muted}>
          Ordered by detection time · updated continuously
        </p>
        <div className={styles.filters}>
          <span>All signals</span>
          <span>Smart money</span>
          <span>Whales</span>
          <span>New launches</span>
        </div>
        <section className={styles.signal}>
          <span className={styles.eyebrow}>
            Smart money convergence · 2m ago
          </span>
          <h5>Smart money is converging</h5>
          <p>
            <b>$AXIOM</b> / Axiom Protocol
          </p>
          <p>9 historically successful wallets entered within 15 minutes.</p>
          <div className={styles.evidence}>
            <span>
              Smart buyers<b>9</b>
            </span>
            <span>
              Smart sellers<b>1</b>
            </span>
            <span>
              5m volume<b>$92.4K</b>
            </span>
          </div>
        </section>
      </div>
    </Screen>
  );
}

function ElaraMobile() {
  return (
    <Screen product="elara">
      <div className={styles.header}>
        <Menu />
        <span className={styles.search}>
          <Search />
          Search workspace
        </span>
        <div className={styles.headerIcons}>
          <span className={styles.assistant}>✳</span>
          <Bell />
        </div>
      </div>
      <div className={styles.content}>
        <span className={styles.eyebrow}>Thursday, October 1</span>
        <h4>Good morning, Rebecca.</h4>
        <p>Here’s the shape of your executive’s day.</p>
        <span className={styles.primary}>
          <ClipboardList />
          Prepare my day
        </span>
        <section className={styles.briefing}>
          <span className={styles.eyebrow}>Daily briefing</span>
          <h5>Today, grounded in your workspace.</h5>
          <p>
            3 calendar events today, 4 tasks due, and 2 items requiring
            attention.
          </p>
          <small>Ask for detail →</small>
        </section>
        <div className={styles.elaraMetrics}>
          {[
            [CalendarDays, "Meetings today", "3"],
            [Check, "Tasks due", "4"],
            [Bell, "Waiting on", "2"],
            [ClipboardList, "Needs attention", "2"],
          ].map(([Icon, label, value]) => {
            const MetricIcon = Icon as typeof Check;
            return (
              <div key={label as string}>
                <span>
                  <MetricIcon />
                </span>
                <div>
                  <strong>{value as string}</strong>
                  <small>{label as string}</small>
                </div>
              </div>
            );
          })}
        </div>
        <section className={styles.panel}>
          <span className={styles.eyebrow}>Schedule</span>
          <h5>Today</h5>
          <p>09:30 · Product sync</p>
        </section>
      </div>
    </Screen>
  );
}

function CashflowMobile() {
  return (
    <Screen
      product="cashflow"
      navigation={
        <>
          <span className={styles.fab}>
            <Plus />
          </span>
          <div className={styles.tabs}>
            <span>
              <BookOpen />
              <small>Cashbooks</small>
            </span>
            <span>
              <HelpCircle />
              <small>Help</small>
            </span>
            <span>
              <Settings />
              <small>Settings</small>
            </span>
          </div>
        </>
      }
    >
      <div className={styles.header}>
        <span className={styles.workspaceIcon}>
          <BookOpen />
        </span>
        <strong>Studio workspace</strong>
        <span>⌄</span>
        <span className={styles.addBusiness}>
          <Plus />
        </span>
        <Menu />
      </div>
      <div className={styles.content}>
        <section className={styles.guide}>
          <div>
            <span className={styles.eyebrow}>Quick start</span>
            <strong>Keep every balance in view</strong>
            <p>Build a simple daily cashbook habit.</p>
            <span>Open guide →</span>
          </div>
          <span className={styles.guideArt}>＋</span>
        </section>
        <div className={styles.booksHeading}>
          <h5>Your Books</h5>
          <span>
            <SlidersHorizontal />
            <Search />
          </span>
        </div>
        {[
          ["Studio operations", "2 members · Updated today", "1,640.00"],
          ["Client projects", "3 members · Yesterday", "950.00"],
          ["Equipment", "1 member · 2 days ago", "250.00"],
        ].map(([name, detail, balance]) => (
          <div className={styles.book} key={name}>
            <span className={styles.bookIcon}>
              <Users />
            </span>
            <div>
              <strong>{name}</strong>
              <small>{detail}</small>
            </div>
            <b>{balance}</b>
            <MoreVertical />
          </div>
        ))}
      </div>
    </Screen>
  );
}

function NomiMobile() {
  return (
    <Screen
      product="nomi"
      navigation={
        <div className={`${styles.tabs} ${styles.nomiTabs}`}>
          {[
            ["◈", "Overview"],
            ["▤", "Finance"],
            ["◷", "Activities"],
            ["≋", "Timeline"],
            ["☑", "Planner"],
            ["✦", "Habits"],
            ["↗", "Goals"],
            ["◎", "Insights"],
            ["⚙", "Settings"],
          ].map(([icon, label]) => (
            <span key={label}>
              <i>{icon}</i>
              <small>{label}</small>
            </span>
          ))}
        </div>
      }
    >
      <div className={styles.header}>
        <span>
          My workspace / <b>Overview</b>
        </span>
        <small>Thu, Oct 1 · Personal</small>
      </div>
      <div className={styles.content}>
        <span className={styles.eyebrow}>Your life, at a glance</span>
        <h4>Hello, Alex.</h4>
        <p>A little perspective on your money and your day.</p>
        <span className={styles.primary}>
          <Plus />
          Add entry
        </span>
        <div className={styles.nomiMetrics}>
          {[
            ["Total balance", "₦482,600", "2 accounts in NGN"],
            ["Money in", "₦185,000", "This month · NGN"],
            ["Money out", "₦42,400", "This month · NGN"],
            ["Time logged today", "3h 20m", "3 activities recorded"],
          ].map(([label, value, note]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
              <small>{note}</small>
            </div>
          ))}
        </div>
        <section className={styles.panel}>
          <div className={styles.recentHeading}>
            <h5>Your recent days</h5>
            <span>View timeline →</span>
          </div>
          <p>A shared view of time and money</p>
          <div className={styles.activity}>
            <span>◷</span>
            <div>
              <strong>Deep work</strong>
              <small>Work · Today, 09:00</small>
            </div>
            <b>2h</b>
          </div>
          <div className={styles.activity}>
            <span>↙</span>
            <div>
              <strong>Client payment</strong>
              <small>Income · Bank account</small>
            </div>
            <b>+₦185,000</b>
          </div>
        </section>
      </div>
    </Screen>
  );
}

export function MobileDashboardPreview({ scene }: { scene: number }) {
  const product = products[scene - 1];
  if (product === "oracle") return <OracleMobile />;
  if (product === "elara") return <ElaraMobile />;
  if (product === "cashflow") return <CashflowMobile />;
  if (product === "nomi") return <NomiMobile />;
  return null;
}
