export type Insight = {
  slug: string;
  title: string;
  description: string;
  category: string;
  author: string;
  published: boolean;
  reviewed: boolean;
  publishedAt: string | null;
  updatedAt?: string;
  sections: { heading: string; paragraphs: string[]; points?: string[] }[];
  related: { title: string; href: string }[];
  references?: { title: string; href: string }[];
};

// Original studio guidance, checked against the published project evidence.
// The owner authorised publication as part of the SEO implementation.
export const insights: Insight[] = [
  {
    slug: "how-to-scope-a-web-application",
    title: "How to scope a web application before development",
    description: "A practical guide to defining users, workflows, priorities and acceptance criteria before commissioning a web application.",
    category: "Product planning",
    author: "DelighTech",
    published: true,
    reviewed: true,
    publishedAt: "2026-10-10",
    sections: [
      { heading: "Start with the task, not the feature list", paragraphs: [
        "A brief that asks for a dashboard, an app and an AI assistant describes possible interfaces, not the job the product must do. Before discussing screens, write one sentence naming the user, the task and the useful outcome. For example: a team coordinator needs to assign a follow-up and know whether the person responsible has completed it. This is an illustrative workflow, not a claim about a particular client.",
        "Map the current journey from trigger to completion. Identify who supplies information, who approves changes and where work currently gets stuck. Record what happens when information is missing or someone cannot complete a step. A successful first release should support a complete useful task, even if it supports fewer tasks overall.",
      ] },
      { heading: "Define users, records and permissions together", paragraphs: [
        "Names such as admin and member are not enough to define access. List the records each role can view, create, change, export or remove. Decide whether access belongs to an organisation, a team or an individual record. These decisions influence both the interface and the implementation.",
        "Cashflow illustrates this distinction: its published case study describes business workspaces, separate cashbooks and permission-scoped entry operations. Hiding a button is not the same as enforcing permission where a record is written. Use the example to ask better questions about your own product, not to assume the same model fits every business.",
      ], points: ["Which records need a named owner?", "Who can approve or reverse an action?", "What should happen when access is withdrawn?", "What information is sensitive, and what can safely appear in a demonstration?"] },
      { heading: "Agree what the first version includes—and excludes", paragraphs: [
        "Separate the complete first workflow from supporting conveniences and future ideas. A manual handover or an export may be appropriate initially, but only if the people operating the product understand the limitation. Deferred work should be written down rather than quietly implied by a polished prototype.",
        "Identify integrations early. A payment service, calendar or third-party data source may require account access, subscription costs and provider approval. Include failure behaviour: what the user sees if an integration is unavailable, whether a retry is safe and who investigates the problem. A proposal should distinguish a feasible integration from an assumption still awaiting validation.",
      ] },
      { heading: "Turn expectations into reviewable acceptance criteria", paragraphs: [
        "An acceptance criterion describes behaviour that can be checked. Instead of 'the dashboard must be intuitive', state that an authorised user can find their assigned records, inspect the relevant details and complete the agreed action, while an unauthorised user cannot change them. Specify useful empty, loading and failure states alongside the successful path.",
        "For each milestone, name the reviewer, the material they will receive and the feedback window to agree in the proposal. Include the supported devices, test data, content responsibilities and launch dependencies. This creates a shared reference for reviewing progress without promising a timeline before the scope is understood.",
      ] },
      { heading: "Bring a one-page brief to discovery", paragraphs: [
        "You do not need a complete technical specification to begin. Bring an anonymised example of the current workflow, the people involved, the required outcome and the constraints. Identify the decision-maker and explain any target date or budget boundary. Do not send passwords or private customer records in an initial enquiry.",
        "At DelighTech, discovery is the place to test these assumptions and decide what should be scoped next. The deliverables, price, milestones, ownership and support arrangements belong in the agreed proposal. A useful brief helps that discussion; it does not replace it.",
      ], points: ["User and task: who needs to do what?", "First release: what must work from start to finish?", "Boundaries: what is deliberately excluded?", "Dependencies: which accounts, content or integrations are needed?", "Review: how will the team recognise that the agreed workflow works?"] },
    ],
    related: [
      { title: "Web application development", href: "/services/web-applications" },
      { title: "Explore the Elara case study", href: "/work/elara" },
    ],
  },
  {
    slug: "responsive-website-or-mobile-app",
    title: "Responsive website or mobile app: what should your business build?",
    description: "Choose a delivery format around your users’ tasks, device needs and release responsibilities—not simply because an app sounds more advanced.",
    category: "Mobile products", author: "DelighTech", published: true, reviewed: true, publishedAt: "2026-10-10",
    sections: [
      { heading: "Begin with where and how the work happens", paragraphs: [
        "A customer discovering your business and a staff member recording a transaction every day have different needs. The first may need a clear page and an enquiry route. The second may need a repeatable workflow, access to records and an interface comfortable to use away from a desk. The right delivery format follows that task.",
        "List the devices your users actually have and the circumstances in which they work. Check connectivity assumptions, whether installing an app is practical, and who controls the devices. These are requirements to investigate—not reasons to promise offline operation or device integrations before they have been scoped.",
      ] },
      { heading: "Choose responsive web delivery when access is the priority", paragraphs: [
        "A responsive website can present services and support enquiries through a link. A responsive web application can also provide authenticated accounts, records and operational workflows. The distinction is the work people do, not whether the page has an impressive visual design.",
        "Web delivery may be a useful first step when a product needs to be accessible across different screen sizes without asking everyone to install it. It still needs mobile-specific design: readable labels, usable controls, clear validation and a task sequence that works on a small screen. Shrinking a desktop dashboard is not enough.",
      ] },
      { heading: "Consider an app when there is a clear device or distribution need", paragraphs: [
        "An app can be appropriate when the agreed product requires device capabilities, installation or a store-based distribution route. Make a list of those needs and assess each one against the target platform and implementation approach. Do not assume every requirement behaves identically on Android, iOS and the web.",
        "Capacitor is a runtime for bringing web applications into native application environments, with access to platform capabilities through plugins. Cashflow’s inspected implementation includes a responsive web product and an Android Capacitor project. That is evidence of its delivery approach—not a claim that any website can become a finished, store-approved app without further design and testing.",
      ] },
      { heading: "Account for the release work, not just the screens", paragraphs: [
        "App delivery can involve developer accounts, store assets, permissions, device testing and review requirements. Agree who supplies accounts, who prepares submissions and who maintains the product after release. Store approval and review timing should not be guaranteed by the development team.",
        "For both formats, define how accounts, data and third-party services are managed. Discuss version compatibility, expected connections, failure states and recurring provider costs. Compare the total responsibilities of the options rather than assuming one is always cheaper or faster.",
      ], points: ["Which platforms are required for the first release?", "What specific capabilities need validation?", "Who owns the hosting, store and provider accounts?", "What devices and workflows will be tested?", "What maintenance is included, and what needs a separate agreement?"] },
      { heading: "Make the decision with a small, testable brief", paragraphs: [
        "Describe the main task, target devices and the reason an installed app would help. If that reason is unclear, investigate a responsive web product first. If there is a definite device requirement, assess feasibility before committing to a delivery format.",
        "DelighTech can help scope a mobile-first workflow and an appropriate delivery approach. The proposal should identify the supported platforms and responsibilities explicitly. Start with what the product must make possible, then choose the technology that supports it.",
      ] },
    ],
    related: [{ title: "Mobile app development", href: "/services/mobile-apps" }, { title: "Cashflow’s web and mobile workflow", href: "/work/cashflow" }, { title: "Business website design and development", href: "/services/business-websites" }],
    references: [{ title: "Capacitor: official runtime documentation", href: "https://capacitorjs.com/docs" }],
  },
  {
    slug: "prepare-for-software-discovery-call",
    title: "What to prepare before hiring a software development studio",
    description: "A practical discovery checklist covering goals, workflows, scope, evidence, access and the commercial questions to clarify before a software build.",
    category: "Working together", author: "DelighTech", published: true, reviewed: true, publishedAt: "2026-10-10",
    sections: [
      { heading: "Explain the problem and the people affected", paragraphs: [
        "Your first conversation does not need to start with a technology choice. Explain what your business does, who will use the product and what currently takes too much effort or causes confusion. A concrete example is more useful than a long list of fashionable features.",
        "Bring a short description of the current process. Name the person starting it, the information they need and the point at which the task is complete. If different people have conflicting needs, describe that too. It is better to surface the conflict during discovery than to hide it behind an attractive interface.",
      ] },
      { heading: "Prepare examples without exposing private information", paragraphs: [
        "An existing website, an anonymised record, a diagram or a short recording can help a team understand the workflow. References are useful when you explain what you value about them: hierarchy, navigation, a specific interaction or the way they explain a service. A reference is a direction for discussion, not permission to copy another company’s work.",
        "Remove customer identifiers, personal records and secrets before sharing examples. Arrange any required repository, hosting or provider access through an appropriate secure channel after responsibilities are agreed. Do not put credentials into an enquiry form or an initial email.",
      ], points: ["Current product or website URL", "An anonymised example of the workflow", "Brand assets you own or can license", "Reference examples with an explanation of what works", "Known issues and any genuine user feedback"] },
      { heading: "Share constraints before asking for an estimate", paragraphs: [
        "Explain any budget boundary, target launch date, required integration or platform. Identify whether content is ready and who can make decisions. These facts affect what a useful first release can include and which dependencies need investigation.",
        "A responsible estimate should follow enough understanding of the scope. Ask what the estimate assumes, what is excluded and what could change the schedule. A fixed date without agreed deliverables, access and review responsibilities is not the same as a dependable delivery plan.",
      ] },
      { heading: "Clarify what the proposal must cover", paragraphs: [
        "A proposal should describe deliverables, milestones, review arrangements and acceptance criteria. It should also identify payment terms, third-party costs, ownership, account control and handover materials. Ask which licences or services have their own terms.",
        "Discuss post-launch support separately. Maintenance, hosting management, new features and response arrangements should have a defined scope rather than an assumed unlimited commitment. Agree how requested changes will be assessed and how any effect on price or timing will be approved.",
      ], points: ["What will be delivered, and what is excluded?", "Who reviews each milestone, and how is feedback handled?", "Who controls the code, assets and provider accounts?", "What checks are included before launch?", "What support is included after launch, and for how long?"] },
      { heading: "Know who you are engaging", paragraphs: [
        "When you enquire through this website, you are engaging DelighTech as a studio, led by Olaoluwa Moshood, CEO. The relevant team and responsibilities should be clear in the project proposal. The portfolio distinguishes studio-owned products from collaborations so visitors can understand the context of the work.",
        "For remote engagements, agree the communication channels, review cadence, meeting availability and handover responsibilities. Working internationally does not require pretending that the studio has an office in your country. It requires clear expectations and a practical way to make decisions together.",
      ] },
    ],
    related: [{ title: "Our engagement process", href: "/#engagement" }, { title: "Scope a web application", href: "/insights/how-to-scope-a-web-application" }, { title: "Improve an existing product", href: "/services/ongoing-improvements" }],
  },
];

export function getPublishedInsights(entries: Insight[] = insights) {
  const validDate = (value: string | null | undefined) => Boolean(value && /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value);
  return entries.filter(entry =>
    entry.published && entry.reviewed && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.slug) &&
    entry.title.trim() && entry.description.trim() && entry.author.trim() &&
    validDate(entry.publishedAt) && (!entry.updatedAt || (validDate(entry.updatedAt) && entry.updatedAt >= entry.publishedAt!)) &&
    entry.sections.length > 0 && entry.sections.every(section =>
      section.heading.trim() && section.paragraphs.length > 0 && section.paragraphs.every(text => text.trim())),
  ).sort((a, b) => b.publishedAt!.localeCompare(a.publishedAt!));
}

export function getInsight(slug: string) {
  return getPublishedInsights().find(entry => entry.slug === slug);
}

export function readingMinutes(entry: Insight) {
  const words = entry.sections.flatMap(section => [section.heading, ...section.paragraphs, ...(section.points || [])]).join(" ").trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}
