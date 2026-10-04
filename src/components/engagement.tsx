import { ArrowDown, Plus } from "lucide-react";
import styles from "./engagement.module.css";

const stages = [
  {
    title: "Discovery",
    body: "Start with your goal, audience, current workflow, and constraints. Identify what the product needs to make possible.",
  },
  {
    title: "Scope & proposal",
    body: "Define the deliverables, priorities, exclusions, and dependencies. Agree on pricing, payment terms, and an estimated schedule before committing to the build.",
  },
  {
    title: "Build in milestones",
    body: "Break the agreed scope into reviewable stages. Set the milestones and feedback points in the proposal so progress has a clear reference.",
  },
  {
    title: "Review & refine",
    body: "Review the work against the agreed requirements. Confirm feedback and changes, including any effect on scope, cost, or timing.",
  },
  {
    title: "Launch & handover",
    body: "Plan the release checks, hosting, access, and handover materials the project needs. Confirm launch responsibilities and readiness together.",
  },
  {
    title: "Support & next steps",
    body: "Agree on any post-launch support, maintenance, or further improvements. The coverage and terms belong in the proposal—not in an assumed ongoing commitment.",
  },
];

const questions = [
  {
    question: "How long will my project take?",
    answer:
      "An estimate follows discovery and depends on the scope, integrations, content readiness, and review turnaround. The proposal sets out the expected milestones and dependencies. A launch date should be agreed after those details are clear, rather than promised before the project is understood.",
  },
  {
    question: "How is pricing determined?",
    answer:
      "Pricing reflects the agreed deliverables, complexity, integrations, and level of ongoing involvement. The proposal should separate the build from recurring costs such as hosting, domains, and third-party services, and state the payment terms. Any separate discovery or planning fee should be confirmed up front.",
  },
  {
    question: "Who owns the code, design, and accounts?",
    answer:
      "Ownership and handover terms need to be agreed in writing. The proposal should identify the custom code, design files, and assets included, when any ownership transfer happens, and which accounts you will control. Third-party tools and licensed assets may have separate terms; confirm these before approving the work.",
  },
  {
    question: "Do you provide maintenance after launch?",
    answer:
      "DelighTech offers ongoing improvements, but maintenance is not automatically included in every build. Any support period, covered tasks, response arrangements, and fees should be agreed explicitly. Updates, new features, hosting management, and monitoring need a defined scope rather than an open-ended promise.",
  },
  {
    question: "What if I need to change the scope?",
    answer:
      "Bring changes to the team before the affected work proceeds. We can assess what they mean for the deliverables, budget, and schedule, then agree on the revised scope. Review rounds and acceptance criteria should be set in the proposal; revisions are not assumed to be unlimited.",
  },
  {
    question: "What should I bring to the first conversation?",
    answer:
      "A short description of the problem, who the product is for, and what a useful first version needs to do. Existing links, brand assets, and reference material help. Share any target launch date or budget constraints, but avoid sending passwords or sensitive customer data in an initial enquiry.",
  },
];

export function Engagement() {
  return (
    <section
      id="engagement"
      className={styles.section}
      aria-labelledby="engagement-title"
    >
      <div className={styles.inner}>
        <div className={styles.heading}>
          <div>
            <span className={styles.eyebrow}>06 / WORKING TOGETHER</span>
            <h2 id="engagement-title">
              From first conversation
              <br />
              to <em>clear next steps.</em>
            </h2>
          </div>
          <div className={styles.introduction}>
            <p>
              A practical path for working with DelighTech. The exact scope,
              schedule, commercial terms, and support are agreed for your
              project.
            </p>
            <a href="#engagement-faq">
              Questions before we begin{" "}
              <ArrowDown size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
        <ol className={styles.stages} aria-label="Project engagement stages">
          {stages.map((stage, index) => (
            <li key={stage.title}>
              <span className={styles.number} aria-hidden="true">
                0{index + 1}
              </span>
              <h3>{stage.title}</h3>
              <p>{stage.body}</p>
            </li>
          ))}
        </ol>
        <div className={styles.faq} id="engagement-faq">
          <div className={styles.faqIntroduction}>
            <span className={styles.eyebrow}>THE PRACTICAL DETAILS</span>
            <h3>Before we begin.</h3>
            <p>
              Clear expectations make a better starting point. These answers
              explain what to discuss; your agreed proposal defines the terms.
            </p>
          </div>
          <div className={styles.questions}>
            {questions.map(({ question, answer }) => (
              <details key={question}>
                <summary>
                  <span>{question}</span>
                  <Plus size={19} aria-hidden="true" />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
