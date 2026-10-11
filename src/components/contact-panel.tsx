import { ArrowUpRight } from "lucide-react";

export function ContactPanel() {
  return (
    <aside className="contact-panel" aria-labelledby="contact-panel-title">
      <div className="contact-panel-heading">
        <span className="section-label">LET’S CONNECT</span>
        <span className="contact-preview-badge">DELIGHTECH</span>
      </div>
      <h3 id="contact-panel-title">A conversation starts here.</h3>
      <dl className="contact-details">
        <div>
          <dt>Email</dt>
          <dd>
            <a href="mailto:hello@delightech.net">
              hello@delightech.net <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </dd>
        </div>
        <div>
          <dt>Availability</dt>
          <dd>Available for new projects</dd>
        </div>
        <div>
          <dt>Booking</dt>
          <dd>
            <a
              href="https://calendly.com/hello-delightech/30min"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Book a discovery call (opens in a new tab)"
            >
              Book a discovery call{" "}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </dd>
        </div>
      </dl>
      <p className="contact-panel-note">
        Tell us what you want to build. Email our team or book a discovery call
        to discuss your goals and the next step.
      </p>
    </aside>
  );
}
