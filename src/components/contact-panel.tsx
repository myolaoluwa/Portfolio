import { ArrowDown, ArrowUpRight } from "lucide-react";

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
          <dt>LinkedIn</dt>
          <dd>
            <button type="button" disabled>
              LinkedIn coming soon{" "}
              <ArrowUpRight size={16} aria-hidden="true" />
            </button>
          </dd>
        </div>
        <div>
          <dt>Résumé</dt>
          <dd>
            <button type="button" disabled>
              Résumé coming soon <ArrowDown size={16} aria-hidden="true" />
            </button>
          </dd>
        </div>
        <div>
          <dt>Availability</dt>
          <dd>To be confirmed</dd>
        </div>
        <div>
          <dt>Time zone</dt>
          <dd>Nigeria · WAT (UTC+01:00)</dd>
        </div>
        <div>
          <dt>Booking</dt>
          <dd>
            <button type="button" disabled>
              Booking link coming soon{" "}
              <ArrowUpRight size={16} aria-hidden="true" />
            </button>
          </dd>
        </div>
      </dl>
      <p className="contact-panel-note">
        Email us about your project. LinkedIn, résumé, and booking details will
        be added when available.
      </p>
    </aside>
  );
}
