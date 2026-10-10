import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { serviceOffers, type ServiceOffer } from "@/lib/services";
import { BreadcrumbData } from "./structured-data";
import { InsightsLinks } from "./insights-links";
import styles from "./service-page.module.css";

export function ServicePage({ service }: { service: ServiceOffer }) {
  return <div className={styles.page}>
    <BreadcrumbData name={service.title} path={`/services/${service.slug}`} />
    <a className={styles.skip} href="#service-main">Skip to service details</a>
    <header className={styles.header}><Link className={styles.brand} href="/">DelighTech</Link><Link href="/#services">All services <ArrowUpRight size={16} aria-hidden="true" /></Link></header>
    <main id="service-main" className={styles.main}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">DelighTech</Link><span aria-hidden="true">/</span><span aria-current="page">{service.title}</span></nav>
      <section className={styles.hero} aria-labelledby="service-title">
        <span className={styles.eyebrow}>{service.number} / {service.title.toUpperCase()}</span>
        <h1 id="service-title">{service.heading}</h1><p>{service.benefit}</p>
        <div className={styles.actions}><a className={styles.primary} href="https://calendly.com/hello-delightech/30min" target="_blank" rel="noopener noreferrer">Discuss your project <ArrowUpRight size={17} aria-hidden="true" /></a><a href="#service-scope">What we can deliver <ArrowRight size={17} aria-hidden="true" /></a></div>
      </section>
      <section className={styles.split} aria-labelledby="fit-title"><h2 id="fit-title">When this is a good fit.</h2><div><p>{service.fit}</p><p>You engage DelighTech as a studio, led by Olaoluwa Moshood, CEO. For remote projects, communication, review milestones and handover should be agreed in the proposal alongside the scope.</p></div></section>
      <section id="service-scope" className={styles.split} aria-labelledby="scope-title"><div><span className={styles.eyebrow}>THE DELIVERABLES</span><h2 id="scope-title">A clear scope, not a vague promise.</h2></div><div><p>{service.deliverable}</p><ul>{service.scope.map(item=><li key={item}>{item}</li>)}</ul><p className={styles.note}>These are scope options, not a fixed package. Deliverables, cost, dependencies and schedule are agreed in your proposal.</p></div></section>
      <section aria-labelledby="decisions-title" className={styles.section}><span className={styles.eyebrow}>HOW WE THINK ABOUT THE BUILD</span><h2 id="decisions-title">Decisions that shape the work.</h2><ol className={styles.cards}>{service.decisions.map((body,index)=><li key={body}><span className={styles.eyebrow}>0{index+1}</span><p>{body}</p></li>)}</ol></section>
      <section className={styles.section} aria-labelledby="proof-title"><span className={styles.eyebrow}>EXPLORE THE EVIDENCE</span><h2 id="proof-title">See the thinking in practice.</h2><div className={styles.proof}>{service.proof.map(item=><article key={item.href}><h3><Link href={item.href}>{item.title} <ArrowUpRight size={18} aria-hidden="true" /></Link></h3><p>{item.body}</p></article>)}</div></section>
      <section className={styles.split} aria-labelledby="inputs-title"><h2 id="inputs-title">What to bring to discovery.</h2><p>{service.inputs}</p></section>
      <aside className={styles.boundary} aria-labelledby="boundary-title"><h2 id="boundary-title">Important boundaries.</h2><p>{service.boundary}</p></aside>
      <section className={styles.section} aria-labelledby="questions-title"><h2 id="questions-title">Questions before we begin.</h2>{service.questions.map(item=><details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}<Link className={styles.inlineLink} href="/#engagement">Read about proposals, milestones and handover <ArrowRight size={16} aria-hidden="true" /></Link></section>
      <section className={styles.close} aria-labelledby="next-title"><span className={styles.eyebrow}>START WITH THE PROBLEM</span><h2 id="next-title">Tell us what needs to work better.</h2><p>Discuss what you’re building, who it’s for and any constraints. We’ll use that conversation to identify possible next steps—not assume a solution before understanding the brief.</p><div className={styles.actions}><a className={styles.primary} href="https://calendly.com/hello-delightech/30min" target="_blank" rel="noopener noreferrer">Book a discovery call <ArrowUpRight size={17} aria-hidden="true" /></a><a href="mailto:hello@delightech.net">Email our team <ArrowUpRight size={17} aria-hidden="true" /></a></div></section>
      <InsightsLinks relatedTo={`/services/${service.slug}`} />
      <nav className={styles.related} aria-label="Other services">{serviceOffers.filter(item=>item.slug!==service.slug).map(item=><Link key={item.slug} href={`/services/${item.slug}`}>{item.title} <ArrowRight size={16} aria-hidden="true" /></Link>)}</nav>
    </main><footer className={styles.footer}><span>© 2026 DelighTech · Olaoluwa Moshood, CEO</span><Link href="/privacy">Privacy notice</Link></footer>
  </div>;
}
