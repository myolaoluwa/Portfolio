import { ArrowRight, ArrowUpRight } from "lucide-react";
import styles from "./services.module.css";
import { ApprovedEvidence, StudioTeam } from "./studio-trust";
import Link from "next/link";
import { serviceOffers } from "@/lib/services";

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
          {serviceOffers.map((service) => (
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
              <Link className={styles.detailsLink} href={`/services/${service.slug}`}>Explore {service.title.toLowerCase()} <ArrowRight size={16} aria-hidden="true" /></Link>
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
