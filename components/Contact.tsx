"use client";

import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import { EMAIL_B64, WHATSAPP_B64, PERSON } from "@/datasets/Site";
import "../styles/components/Contact.css";

/* ==========================================================================
   Contact — proxy channels. The raw email address and phone number never
   appear in the HTML (scraper-proof-ish): they live base64-encoded in
   datasets/Site.ts and are only decoded in the browser at click time.
   ========================================================================== */

const Contact: React.FC = () =>
{
  const { ref, inView } = useInView({ threshold: 0.25, triggerOnce: false });
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const openEmail = () =>
  {
    const params = new URLSearchParams();
    if (subject) params.set("subject", subject);
    if (message) params.set("body", message);
    const query = params.toString();
    window.location.href = `mailto:${atob(EMAIL_B64)}${query ? `?${query}` : ""}`;
  };

  const openWhatsApp = () =>
  {
    const text = message ? `?text=${encodeURIComponent(message)}` : "";
    window.open(`https://wa.me/${atob(WHATSAPP_B64)}${text}`, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contact" ref={ref} className={`contact${inView ? " in-view" : ""}`}>
      <p className="faux-kicker">05 / open a channel</p>
      <h2 className="faux-heading" data-sprite-target>
        <span className="faux-hash">#</span>Contact <span className="faux-shimmer">/dev/nic</span>
      </h2>
      <p className="contact-note" data-sprite-target>
        Currently <strong>open to contract work</strong> — {PERSON.services}.
      </p>
      <p className="contact-note contact-note-sub" data-sprite-target>
        No address harvesting here: both channels decode client-side, only
        when you knock. Geek out, propose an engagement, or just say hi.
      </p>

      <div className="contact-grid">
        <form
          className="contact-form faux-pane"
          onSubmit={(event) => { event.preventDefault(); openEmail(); }}
        >
          <label className="faux-mono" htmlFor="contact-subject">subject:</label>
          <input
            id="contact-subject"
            type="text"
            placeholder="Let's build something"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
          />
          <label className="faux-mono" htmlFor="contact-message">payload:</label>
          <textarea
            id="contact-message"
            placeholder="Your message — drafted here, sent from your own app. I never see a byte until you hit send."
            rows={5}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
          <p className="form-hint faux-mono">message routes through the proxy of your choosing →</p>
        </form>

        <div className="channel-stack">
          <button type="button" className="channel-card faux-pane" onClick={openEmail}>
            <span className="channel-glyph" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
                <path d="M3.5 7l8.5 6 8.5-6" />
              </svg>
            </span>
            <span className="channel-meta">
              <span className="channel-name">EMAIL_PROXY</span>
              <span className="channel-desc faux-mono">mailto decodes on click · base64 at rest</span>
            </span>
            <span className="channel-arrow" aria-hidden="true">→</span>
          </button>

          <button type="button" className="channel-card faux-pane" onClick={openWhatsApp}>
            <span className="channel-glyph" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3z" />
                <path d="M9 8.5c0 4 2.5 6.5 6.5 6.5l1-2-2.2-1-1 .8c-1.2-.6-1.9-1.3-2.4-2.4l.8-1-1-2.2-1.7.3z" />
              </svg>
            </span>
            <span className="channel-meta">
              <span className="channel-name">WHATSAPP_PROXY</span>
              <span className="channel-desc faux-mono">wa.me relay · number stays encoded</span>
            </span>
            <span className="channel-arrow" aria-hidden="true">→</span>
          </button>

          <p className="channel-footnote faux-mono">
            {"// heart on sleeve, inbox always open"}
          </p>
        </div>
      </div>

      <footer className="site-footer faux-mono">
        <p>© {new Date().getFullYear()} TheImitation — designed & built by Nic Defaux, fuelled by curiosity.</p>
      </footer>
    </section>
  );
};

export default Contact;
