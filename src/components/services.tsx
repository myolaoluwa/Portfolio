import { ArrowRight, ArrowUpRight } from "lucide-react";
import styles from "./services.module.css";
import { ApprovedEvidence, StudioTeam } from "./studio-trust";

const services = [
  {
    number: "01",
    title: "Business websites",
    benefit:
      "Give potential customers a clear picture of your business and a straightforward way to take the next step.",
    deliverable:
      "A responsive website with a considered page structure, clear service messaging, and enquiry or booking integrations suited to your business.",
  },
  {
    number: "02",
    title: "Web applications",
    benefit:
      "Turn a product idea or a repetitive business workflow into software people can actually use.",
    deliverable:
      "A working web application with the screens, accounts, data, dashboards, and integrations your agreed scope needs—not just a visual prototype.",
  },
  {
    number: "03",
    title: "Mobile apps",
    benefit:
      "Make your product’s key tasks convenient to complete on a phone, wherever your users are.",
    deliverable:
      "Mobile-first interfaces and connected app workflows, including Android app delivery where appropriate. Target platforms and release requirements are agreed up front.",
  },
  {
    number: "04",
    title: "Ongoing improvements",
    benefit:
      "Keep a useful product moving forward without starting again from scratch.",
    deliverable:
      "A review of your existing website or app, followed by scoped fixes, interface refinements, performance improvements, or new features, with checks before handover.",
  },
];

export function Services() {
  return (
    <section
      id="services"
      className={styles.section}
      aria-labelledby="services-title"
    >
      <div className={styles.inner}>
        <div className={styles.heading}>
          <div>
            <span className={styles.eyebrow}>03 / SERVICES</span>
            <h2 id="services-title">
              How we can <em>help.</em>
            </h2>
          </div>
          <p>
            A new website, a useful application, or a better version of what you
            already have. Here’s what you can hire DelighTech to deliver.
          </p>
        </div>
        <StudioTeam />
        <div className={styles.grid}>
          {services.map((service) => (
            <article className={styles.offer} key={service.number}>
              <div className={styles.topline}>
                <span>{service.number}</span>
                <ArrowUpRight size={20} aria-hidden="true" />
              </div>
              <h3>{service.title}</h3>
              <p className={styles.benefit}>{service.benefit}</p>
              <div className={styles.deliverable}>
                <span className={styles.eyebrow}>WHAT YOU GET</span>
                <p>{service.deliverable}</p>
              </div>
            </article>
          ))}
        </div>
        <div className={styles.nextStep}>
          <p>
            Start with a clear goal. We’ll agree on the deliverables,
            priorities, and platform before building.
          </p>
          <a href="#engagement">
            See how projects work <ArrowRight size={17} aria-hidden="true" />
          </a>
        </div>
        <ApprovedEvidence />
      </div>
    </section>
  );
}
