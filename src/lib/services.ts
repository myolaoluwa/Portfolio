import type { Metadata } from "next";

export const serviceOffers = [
  {
    slug: "business-websites", number: "01", title: "Business websites",
    benefit: "Give potential customers a clear picture of your business and a straightforward way to take the next step.",
    deliverable: "A responsive website with a considered page structure, clear service messaging, and enquiry or booking integrations suited to your business.",
    heading: "A business website that makes the next step clear.",
    description: "Business website design and development from DelighTech: clear service messaging, responsive interfaces, enquiry paths and a considered launch plan.",
    fit: "For businesses that need to explain their offer, show credible work, and make it easy for prospective customers to enquire. A brochure site, portfolio or service website should help visitors make a decision—not ask them to decode a technology stack.",
    decisions: ["Start with the visitor’s questions: what you do, who it’s for, and how to begin.", "Choose a page structure around real services and useful evidence, rather than creating duplicate pages for every country.", "Balance visual character with readable content, usable navigation and performance on mobile connections."],
    scope: ["Page planning and responsive interface design", "Service content structure and clear enquiry or booking links", "Implementation, page metadata and search-discovery configuration", "Agreed browser, accessibility and launch checks"],
    inputs: "Bring your offer, audience, brand assets, current website and examples of work you can publish. We’ll identify which pages need content, who supplies it, and whether editing tools or third-party integrations belong in scope.",
    boundary: "A website launch does not guarantee Google rankings or enquiries. Copywriting, CMS setup, integrations, ongoing hosting and content updates need an agreed scope. Search performance depends on content, competition, reputation and continued work after launch.",
    proof: [{ href: "/", title: "The DelighTech portfolio", body: "This site demonstrates our approach to service messaging, cinematic presentation, responsive layouts and a clear route to enquiry. It is our own studio website, not a commissioned client result." }],
    questions: [{ question: "Can you improve an existing website?", answer: "Yes. Start with what already works, then identify the content, navigation or implementation changes worth making. An improvement project may be more appropriate than a replacement." }, { question: "Will I be able to update the site?", answer: "Discuss who will edit the content during discovery. A CMS or editing workflow can be included when it fits the scope; it is not assumed to be part of every build." }],
  },
  {
    slug: "web-applications", number: "02", title: "Web applications",
    benefit: "Turn a product idea or a repetitive business workflow into software people can actually use.",
    deliverable: "A working web application with the screens, accounts, data, dashboards, and integrations your agreed scope needs—not just a visual prototype.",
    heading: "Turn a business workflow into a useful product.",
    description: "DelighTech builds web applications around real workflows: dashboards, accounts, connected data and scoped integrations, from product decisions to launch.",
    fit: "For teams building a new product or replacing a workflow spread across spreadsheets, messages and separate tools. We start with what a user needs to accomplish, then connect the interface to the data and permissions that make the task possible.",
    decisions: ["Define a useful first version around a complete workflow, rather than a long feature list.", "Separate what users can see from what they are allowed to change; access rules belong in the implementation, not just the interface.", "Make loading, empty states, failures and third-party dependencies part of the product design."],
    scope: ["Workflow definition and responsive product interfaces", "Application screens, data models and authenticated access where needed", "Dashboards, operational features and agreed integrations", "Reviewable implementation milestones and release checks"],
    inputs: "Bring an example of the workflow, the people involved, the data it uses and the decisions it should support. Explain any existing systems or provider accounts. Share anonymised examples rather than passwords or private customer records.",
    boundary: "Integrations depend on provider access, pricing and API limitations. AI-assisted features need a defined context, review path and boundaries; they should not be treated as a guarantee of correct answers. Security and regulatory requirements must be scoped for your particular product.",
    proof: [{ href: "/work/elara", title: "Elara: connected operational context", body: "A collaboration connecting meetings, tasks, follow-ups and AI assistance in an executive workspace. Explore the implementation decisions without signing in." }, { href: "/work/cashflow", title: "Cashflow: records and access controls", body: "A DelighTech-owned product organised around business workspaces, cashbooks and permission-aware financial entries. Usage is described without unverified metrics." }],
    questions: [{ question: "Can we begin with an MVP?", answer: "Yes. Define the smallest complete workflow that tests a useful product decision. The proposal should state what is included, what is deferred and how the first version will be reviewed." }, { question: "Can you connect our existing tools?", answer: "We assess the tools, API access and data requirements first. Feasibility, recurring provider costs and failure handling should be understood before an integration is committed to the scope." }],
  },
  {
    slug: "mobile-apps", number: "03", title: "Mobile apps",
    benefit: "Make your product’s key tasks convenient to complete on a phone, wherever your users are.",
    deliverable: "Mobile-first interfaces and connected app workflows, including Android app delivery where appropriate. Target platforms and release requirements are agreed up front.",
    heading: "Make your product’s everyday tasks work on a phone.",
    description: "Mobile app development from DelighTech: mobile-first workflows, connected interfaces and Android delivery where appropriate, with platform requirements scoped up front.",
    fit: "For businesses whose users need to record, review or act on information away from a desk. A mobile app should make the key task convenient; it should not simply squeeze a desktop dashboard into a smaller screen.",
    decisions: ["Choose the target platform and delivery approach around the product’s needs, including any device capabilities.", "Prioritise touch targets, readable hierarchy and the sequence of actions on a small screen.", "Define connectivity assumptions, permissions and release requirements before promising device-specific behaviour."],
    scope: ["Mobile-first screen design and key user journeys", "Connected application workflows and agreed data access", "Android app delivery where suitable for the product", "Platform-specific testing, release preparation and handover as agreed"],
    inputs: "Bring your target users, required platforms, existing web app or backend, and any device features you need. Tell us where people use the product and whether intermittent connectivity matters. Store accounts and publication responsibilities should be discussed early.",
    boundary: "Native iOS delivery, offline sync, background tasks and push notifications are not assumed. Each requires its own feasibility and scope decisions. Store approval is controlled by the platform, not guaranteed by DelighTech. The Cashflow implementation uses Capacitor; it is not evidence of a React Native build.",
    proof: [{ href: "/work/cashflow", title: "Cashflow: web-to-Android adaptation", body: "The DelighTech-owned cashbook product uses Capacitor for its mobile adaptation. Its case study shows the mobile layout alongside the underlying web workflow; the verified store link will be added when supplied." }],
    questions: [{ question: "Do we need an app or a mobile-friendly website?", answer: "It depends on the task, device capabilities and distribution needs. A responsive website can be the right starting point; choose an app when the product has a clear reason for that delivery format." }, { question: "Will you publish the app for us?", answer: "Agree on store accounts, assets, submission tasks and responsibilities in the proposal. Release preparation can be scoped, but store review decisions and timelines remain outside our control." }],
  },
  {
    slug: "ongoing-improvements", number: "04", title: "Ongoing improvements",
    benefit: "Keep a useful product moving forward without starting again from scratch.",
    deliverable: "A review of your existing website or app, followed by scoped fixes, interface refinements, performance improvements, or new features, with checks before handover.",
    heading: "Improve what works. Fix what gets in the way.",
    description: "Website and app improvements from DelighTech: scoped interface fixes, performance investigation, feature work and regression checks without an unnecessary rebuild.",
    fit: "For teams with an existing product that needs clearer interfaces, fewer frustrating interactions or a better next version. We inspect the current implementation before deciding what to change, preserving useful functionality and separating urgent fixes from longer-term improvements.",
    decisions: ["Reproduce the problem and establish a baseline before proposing a fix.", "Prioritise changes by user impact, implementation risk and dependency—not by how dramatic a redesign looks.", "Verify important existing journeys after changes, and record remaining limits rather than calling a product perfect."],
    scope: ["Review of agreed screens, workflows and implementation areas", "Prioritised fixes or refinements with explicit acceptance criteria", "Scoped performance investigations and feature additions", "Regression checks and a clear summary of the work delivered"],
    inputs: "Bring the current product URL, reproducible issues, the relevant codebase and your priorities. Arrange access through an appropriate secure channel. Useful evidence includes user feedback, error reports and performance measurements—not only screenshots of a preferred redesign.",
    boundary: "A review covers the agreed scope, not an unrestricted security audit. Lab performance scores are diagnostic, not proof of every visitor’s experience. Maintenance coverage, response times, hosting management and ongoing fees must be agreed rather than assumed.",
    proof: [{ href: "/", title: "This portfolio’s refinement", body: "The current studio website preserves its cinematic direction while adding clearer services, project walkthroughs and enquiry paths. This is a demonstration of our approach, not a measured client outcome." }, { href: "/work/elara", title: "Elara: explicit product boundaries", body: "The case study explains implementation choices and distinguishes prepared suggestions from executed actions—an example of making product behaviour easier to understand." }],
    questions: [{ question: "Will you need to rebuild everything?", answer: "Not necessarily. We first assess whether the problem can be addressed within the existing architecture. A larger migration should be justified by constraints and agreed separately." }, { question: "Is ongoing support included?", answer: "Only when explicitly agreed. Define the supported tasks, coverage, communication and commercial terms before treating an improvement project as an ongoing maintenance arrangement." }],
  },
] as const;

export type ServiceOffer = (typeof serviceOffers)[number];

export function serviceMetadata(service: ServiceOffer): Metadata {
  const title = `${service.title} — DelighTech`;
  const url = `/services/${service.slug}`;
  return {
    title, description: service.description, alternates: { canonical: url },
    openGraph: { title, description: service.description, url, type: "website", siteName: "DelighTech", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "DelighTech web and mobile software studio" }] },
    twitter: { card: "summary_large_image", title, description: service.description, images: ["/opengraph-image"] },
  };
}
