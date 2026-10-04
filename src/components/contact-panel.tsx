import { ArrowDown, ArrowUpRight } from "lucide-react";

export function ContactPanel() {
  return (
    <aside className="contact-panel" aria-labelledby="contact-panel-title">
      <div className="contact-panel-heading">
        <span className="section-label">LET’S CONNECT</span>
        <span className="contact-preview-badge">PREVIEW</span>
      </div>
      <h3 id="contact-panel-title">A conversation starts here.</h3>
      <dl className="contact-details">
        <div>
          <dt>Email</dt>
          <dd>
            <button type="button" disabled>
              hello@example.com <ArrowUpRight size={16} aria-hidden="true" />
            </button>
          </dd>
        </div>
        <div>
          <dt>LinkedIn</dt>
          <dd>
            <button type="button" disabled>
              Your LinkedIn profile{" "}
              <ArrowUpRight size={16} aria-hidden="true" />
            </button>
          </dd>
        </div>
        <div>
          <dt>Résumé</dt>
          <dd>
            <button type="button" disabled>
              Download résumé <ArrowDown size={16} aria-hidden="true" />
            </button>
          </dd>
        </div>
        <div>
          <dt>Availability</dt>
          <dd>To be confirmed</dd>
        </div>
        <div>
          <dt>Time zone</dt>
          <dd>Your time zone · UTC±00</dd>
        </div>
        <div>
          <dt>Booking</dt>
          <dd>
            <button type="button" disabled>
              Book an introductory call{" "}
              <ArrowUpRight size={16} aria-hidden="true" />
            </button>
          </dd>
        </div>
      </dl>
      <p className="contact-panel-note">
        Placeholder details. Contact links and downloads will be enabled when
        your information is added.
      </p>
    </aside>
  );
}
