import type { Metadata } from "next";

export type CaseStudy = {
  slug: "elara" | "cashflow" | "oracle" | "nomi";
  format?: "walkthrough";
  status: string;
  mobileScene: 1 | 2 | 3 | 4;
  video?: { project: "elara" | "nomi"; duration: string; description: string };
  name: string;
  number: string;
  category: string;
  title: string;
  introduction: string;
  audience: string;
  scope: string;
  stack: string[];
  challenge: { title: string; body: string; constraint: string };
  workflow: { title: string; body: string }[];
  decisions: {
    title: string;
    challenge: string;
    implementation: string;
    value: string;
  }[];
  result: { title: string; body: string; capabilities: string[] };
  boundaries: string;
  liveUrl?: string;
  sourceUrl?: string;
  next: { name: string; href: string };
};

export const caseStudies: Record<CaseStudy["slug"], CaseStudy> = {
  elara: {
    slug: "elara",
    status: "Finished product · Used by real users",
    mobileScene: 2,
    video: {
      project: "elara",
      duration: "0:23",
      description:
        "A walkthrough of Elara’s executive workspace. Recorded project footage may show an earlier interface version.",
    },
    name: "Elara",
    number: "01",
    category: "Executive operations · AI-assisted workspace",
    title: "A connected workspace for a day full of moving parts.",
    introduction:
      "Bringing meetings, tasks, follow-ups, and executive context into one workspace—with AI assistance that stays grounded in the work.",
    audience: "Executive assistants and their executives",
    scope:
      "Dashboard, operational workflows, AI integration, and full-stack implementation",
    stack: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "AI provider layer",
    ],
    challenge: {
      title: "The next action is only useful when its context is close.",
      body: "An executive’s schedule, conversations, and commitments belong to the same day, but can live in different places. Elara addresses that product problem by connecting operational records rather than treating the calendar, task list, and assistant as separate experiences.",
      constraint:
        "AI assistance also needs boundaries: incomplete context should not become an invented fact, and a draft should never be presented as a sent message.",
    },
    workflow: [
      {
        title: "Orient",
        body: "Start with the daily briefing, schedule, and priority queue.",
      },
      {
        title: "Understand",
        body: "Ask the Command Center a question grounded in workspace records.",
      },
      {
        title: "Act deliberately",
        body: "Create an internal action or review an outbound communication.",
      },
      {
        title: "Follow through",
        body: "Keep tasks, follow-ups, and recorded outcomes connected.",
      },
    ],
    decisions: [
      {
        title: "Lead with the day, not an empty conversation.",
        challenge:
          "A visitor to the workspace needs orientation before deciding what to do next.",
        implementation:
          "The dashboard queries calendar events, due tasks, follow-ups, and attention items. A daily briefing sits above operational metrics, with the schedule and priority queue underneath.",
        value:
          "The interface makes the day’s workload visible and gives each summary a route back to its underlying work.",
      },
      {
        title: "Keep AI connected to the workspace.",
        challenge:
          "A fluent answer is not enough if it cannot relate to the user’s actual records.",
        implementation:
          "AI requests pass through a shared service layer and carry workspace context. The provider configuration is separate from the interface, while operational APIs derive workspace access from the authenticated session.",
        value:
          "This separates presentation, provider configuration, and access control instead of putting those responsibilities into a chat component.",
      },
      {
        title: "Distinguish a suggestion from an executed action.",
        challenge:
          "Email and scheduling involve real commitments; ambiguity needs visible handling.",
        implementation:
          "The assistant policy distinguishes drafts, explicit sends, and scheduled messages. Missing details or sensitive communication stay in a review path, and recorded action outcomes are kept in audit history.",
        value:
          "Users can understand what was prepared, what was requested, and what actually happened—without treating every generated response as an action.",
      },
    ],
    result: {
      title: "One operational workspace, with context carried forward.",
      body: "Elara is a finished product used by real users. It connects the overview of a day to its meetings, tasks, follow-ups, and AI-assisted operations. The portfolio film shows the interface in motion; the source-based preview makes the dashboard structure easy to inspect.",
      capabilities: [
        "A daily briefing derived from operational records",
        "A schedule and priority queue with routes into the work",
        "Workspace-scoped AI requests and recorded action outcomes",
      ],
    },
    boundaries:
      "Real-user usage is described without numbers. Interface previews use sample data, and the recorded film may show an earlier interface version. Connected Gmail and AI features depend on the configured providers; no measured time-saving or business-impact claims are presented here.",
    liveUrl: "https://elara-nu.vercel.app",
    sourceUrl: "https://github.com/myolaoluwa/Elara",
    next: { name: "Cashflow", href: "/work/cashflow" },
  },
  cashflow: {
    slug: "cashflow",
    status: "Finished product · Used by real users",
    mobileScene: 3,
    name: "Cashflow",
    number: "02",
    category: "Bookkeeping · Web + Android implementation",
    title: "Business money, organized around the way people work.",
    introduction:
      "A cashbook workspace for separating business records, recording money movement, and controlling who can change each book.",
    audience: "Small businesses, freelancers, merchants, and teams",
    scope:
      "Cashbook interfaces, financial entry workflows, access controls, and mobile adaptation",
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Capacitor"],
    challenge: {
      title: "A balance needs a clear record behind it.",
      body: "Business records can span several projects, branches, or teams. Cashflow addresses this product problem through separate cashbooks inside a business workspace, so the interface has a clear place for each set of entries and its members.",
      constraint:
        "Recording money also requires care at the API boundary: a visible button must not grant permission, and a repeated request should not silently become another entry.",
    },
    workflow: [
      {
        title: "Choose a workspace",
        body: "Keep business membership and cashbooks in context.",
      },
      {
        title: "Open a cashbook",
        body: "Inspect the book, its balance, and its entries.",
      },
      {
        title: "Record money",
        body: "Capture cash in or cash out with the relevant details.",
      },
      {
        title: "Review and control",
        body: "Use book permissions and entry policies to manage changes.",
      },
    ],
    decisions: [
      {
        title: "Make the cashbook the organizing unit.",
        challenge:
          "A single headline balance does not explain which project or team a record belongs to.",
        implementation:
          "The current workspace starts with a searchable cashbook list. Each row exposes a book’s name, members, recent activity, and balance; desktop adds sorting and an overview, while mobile prioritizes the list.",
        value:
          "The structure lets a visitor understand where records live before navigating into individual entries.",
      },
      {
        title: "Put financial safeguards behind the interface.",
        challenge:
          "Roles, duplicate submissions, and closed periods cannot depend on the appearance of the UI.",
        implementation:
          "Server-side book access combines business membership and book permissions. The transaction route checks entry policies, closed dates, duplicate protection, and idempotency keys.",
        value:
          "Access and entry rules stay enforceable beyond the interface, at the point where financial records are written.",
      },
      {
        title: "Adapt the workflow for a smaller screen.",
        challenge:
          "Desktop search, sorting, and workspace controls need a different hierarchy on a phone.",
        implementation:
          "Mobile uses a workspace selector, a list-first book view, search/filter controls, a floating add-book action, and Cashbooks / Help / Settings navigation. The Android project uses Capacitor to host the web experience with device integrations.",
        value:
          "The mobile layout retains the cashbook model while changing navigation and action placement. The repository contains an Android project; no app-store release is claimed here.",
      },
    ],
    result: {
      title: "A clear route from business workspace to financial entry.",
      body: "Cashflow is a finished product used by real users. It brings cashbooks, entries, member access, and financial policies into a responsive product. The desktop and mobile previews in this case study show how the same workflow is presented at different screen sizes.",
      capabilities: [
        "Separate cashbooks with balances and member context",
        "Permission-scoped access to books and entry operations",
        "Entry-policy checks and an Android Capacitor project",
      ],
    },
    boundaries:
      "Real-user usage is described without numbers. The source repository is private, and the previews contain illustrative records rather than customer finances. This case study covers the web and Android implementation; no app-store release or measured business-impact claims are presented here.",
    liveUrl: "https://cashflow-delight12.vercel.app",
    next: { name: "Oracle", href: "/work/oracle" },
  },
  oracle: {
    slug: "oracle",
    format: "walkthrough",
    status: "Guided preview · Demo market data",
    mobileScene: 1,
    name: "Oracle",
    number: "03",
    category: "Market intelligence · Product walkthrough",
    title: "Understand a market signal before following it.",
    introduction:
      "Oracle brings unusual on-chain activity into a radar workspace, explains why it was flagged, and connects the signal to the tokens and wallets behind it. On-chain activity means transactions recorded on a blockchain.",
    audience: "People investigating token and wallet activity",
    scope: "Radar overview, signal evidence, investigation, and follow-up",
    stack: ["Next.js", "TypeScript", "Detection engine", "SQLite"],
    challenge: {
      title: "A notification is a starting point, not an explanation.",
      body: "A busy market feed can show that something changed without making the reason easy to understand. Oracle organizes activity into signals, then puts an explanation and supporting observations within reach of each one.",
      constraint:
        "A sample signal must not be mistaken for live market information. This walkthrough uses illustrative demo data and does not make predictions or promise trading results.",
    },
    workflow: [
      {
        title: "Scan the radar",
        body: "Start with the feed of detected activity and its short explanations.",
      },
      {
        title: "Narrow the view",
        body: "Use signal categories to focus on large trades, new launches, or market changes.",
      },
      {
        title: "Inspect the evidence",
        body: "In the product, open a signal to see why it was flagged and the observations behind it.",
      },
      {
        title: "Keep context close",
        body: "Investigate the related token or wallet, then use following and alert preferences to keep track.",
      },
    ],
    decisions: [
      {
        title: "Explain the signal in the feed.",
        challenge:
          "A short alert can be difficult to evaluate without opening several different screens.",
        implementation:
          "Radar cards bring the signal type, token, summary, supporting metrics, and investigation entry point into one place.",
        value:
          "A visitor can understand what deserves a closer look before opening the details.",
      },
      {
        title: "Make the evidence part of the investigation.",
        challenge:
          "An attention-grabbing headline should not replace the observations behind it.",
        implementation:
          "The investigation panel explains why Oracle is watching a token and shows the related evidence. Separate token and wallet views carry the investigation further.",
        value:
          "The product connects a signal to its context instead of leaving the user with an isolated notification.",
      },
      {
        title: "Separate a demonstration from live data.",
        challenge:
          "A product should be understandable without requiring market-provider credentials.",
        implementation:
          "The source includes a repeatable demo-data provider. The previews here use that sample universe, including AXIOM and NOVA, rather than presenting invented live signals.",
        value:
          "The workflow can be explained without connecting a wallet, signing in, or suggesting the sample feed represents current conditions.",
      },
    ],
    result: {
      title: "A route from signal to explanation.",
      body: "This walkthrough shows Oracle’s product structure: a radar feed for orientation, evidence for investigation, and connected token, wallet, following, and alert surfaces. It demonstrates the workflow, not a trading outcome.",
      capabilities: [
        "Categorized signals with supporting observations",
        "Investigation paths into token and wallet context",
        "Following and configurable alert preferences in the product",
      ],
    },
    boundaries:
      "This is a guided product preview, not a functioning market terminal. Interface controls in the illustrations are static. AXIOM, NOVA, and displayed metrics are demo data, not live signals or recommendations. No adoption counts, trading returns, or named collaboration credits are claimed. Provider and notification integrations require their own configuration in the source application.",
    sourceUrl: "https://github.com/myolaoluwa/Oracle",
    next: { name: "Nomi", href: "/work/nomi" },
  },
  nomi: {
    slug: "nomi",
    format: "walkthrough",
    status: "Guided preview · Personal dashboard V1",
    mobileScene: 4,
    video: {
      project: "nomi",
      duration: "0:43",
      description:
        "A recorded walkthrough of Nomi’s personal dashboard, connecting money, time, activities, habits, and goals. The film may show an earlier interface version; the separate previews follow the inspected implementation.",
    },
    name: "Nomi",
    number: "04",
    category: "Personal organization · Product walkthrough",
    title: "Bring money, time, and daily progress into one picture.",
    introduction:
      "Nomi is a personal dashboard that brings recorded spending, activities, tasks, habits, and goals together. Watch the film or follow the guide below—no account is needed to understand the experience.",
    audience: "People organizing their money, time, and everyday commitments",
    scope: "Overview, quick entry, shared timeline, habits, and goals",
    stack: ["React", "TypeScript", "PGlite / PostgreSQL", "Responsive web"],
    challenge: {
      title: "Separate lists can hide how a day fits together.",
      body: "Spending, activities, tasks, and habits can each tell only part of the story. Nomi connects those records through an overview and shared timeline, then provides focused views when someone needs more detail.",
      constraint:
        "Personal data should not be exposed just to demonstrate a product. This page uses illustrative records and an existing product film, without requiring access to a real user’s account.",
    },
    workflow: [
      {
        title: "Get your bearings",
        body: "See balance, money in and out, and time logged from the overview.",
      },
      {
        title: "Capture the day",
        body: "In the app, use quick actions to add a transaction, log an activity, or create an account.",
      },
      {
        title: "See the connections",
        body: "Review recent events together in a timeline of time and money.",
      },
      {
        title: "Review progress",
        body: "Move into planner, habits, goals, and insights for a more focused view.",
      },
    ],
    decisions: [
      {
        title: "Start with a useful overview.",
        challenge:
          "Several types of personal records need a clear starting point.",
        implementation:
          "The overview places money and time summaries above recent events, quick actions, and a reflection card. Detailed areas remain available through the navigation.",
        value:
          "The first screen gives orientation without asking the user to inspect every record separately.",
      },
      {
        title: "Make adding a record easy to find.",
        challenge:
          "A dashboard is only useful when people can keep its records up to date.",
        implementation:
          "Quick actions offer direct routes to adding a transaction, logging an activity, and creating an account. Import flows preview records before the user saves them.",
        value:
          "The product gives recording and review their own clear places in the workflow.",
      },
      {
        title: "Answer from recorded information.",
        challenge:
          "A personal summary should not invent details that the user never recorded.",
        implementation:
          "Consent-controlled questions calculate supported answers from saved records and identify supporting record IDs. The V1 implementation does not send this data to an external AI provider.",
        value:
          "Answers stay tied to the information available, rather than being presented as open-ended AI reasoning.",
      },
    ],
    result: {
      title: "An overview that connects to the details.",
      body: "Nomi’s implemented V1 brings personal records, a shared timeline, and progress views into a responsive web product. The film makes the experience visible in motion; the desktop and mobile previews explain the current overview structure.",
      capabilities: [
        "Money and time summaries with a combined timeline",
        "Quick entry paths and focused planning views",
        "Consent-controlled questions grounded in saved records",
      ],
    },
    boundaries:
      "This page is an account-free walkthrough, not an editable account or live demo. Interface illustrations contain sample data and static controls; the film may show an earlier version. Bank-provider connections, automatic background provider sync, and native mobile binaries are not part of the inspected V1. No user counts, measured productivity improvements, or named collaboration credits are claimed.",
    sourceUrl: "https://github.com/myolaoluwa/Nomi",
    next: { name: "Elara", href: "/work/elara" },
  },
};

export function caseStudyMetadata(study: CaseStudy): Metadata {
  const title = `${study.name} ${study.format === "walkthrough" ? "Product Walkthrough" : "Case Study"} — DelighTech`;
  const url = `/work/${study.slug}`;
  return {
    title,
    description: study.introduction,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: study.introduction,
      url,
      type: "website",
      siteName: "DelighTech",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "DelighTech software studio — led by Olaoluwa, CEO",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: study.introduction,
      images: ["/opengraph-image"],
    },
  };
}
