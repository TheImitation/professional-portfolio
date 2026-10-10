"use client";

import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import { openEmail, openWhatsApp } from "@/datasets/Site";
import { AVAILABILITY_LINE, CHANNELS, CONTACT, SECTIONS } from "@/datasets/Copy";
import Rich from "./Rich";
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

  const sendEmail = () => openEmail(subject, message);
  const sendWhatsApp = () => openWhatsApp(message);

  return (
    <section id="contact" ref={ref} className={`contact${inView ? " in-view" : ""}`}>
      <p className="faux-kicker">{SECTIONS.contact.kicker}</p>
      <h2 className="faux-heading" data-sprite-target>
        <span className="faux-hash">#</span>{SECTIONS.contact.heading} <span className="faux-shimmer">{SECTIONS.contact.accent}</span>
      </h2>
      <p className="contact-note" data-sprite-target>
        <Rich text={AVAILABILITY_LINE} />
      </p>
      <p className="contact-note contact-note-sub" data-sprite-target>
        {CONTACT.privacy}
      </p>

      <div className="contact-grid">
        <form
          className="contact-form faux-pane"
          onSubmit={(event) => { event.preventDefault(); sendEmail(); }}
        >
          <label className="faux-mono" htmlFor="contact-subject">{CONTACT.subject}</label>
          <input
            id="contact-subject"
            type="text"
            placeholder={CONTACT.prompt}
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
          />
          <label className="faux-mono" htmlFor="contact-message">{CONTACT.message}</label>
          <textarea
            id="contact-message"
            placeholder={CONTACT.messagePlaceholder}
            rows={5}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
          <p className="form-hint faux-mono">{CONTACT.hint}</p>
        </form>

        <div className="channel-stack">
          <button type="button" className="channel-card faux-pane" onClick={sendEmail}>
            <span className="channel-glyph" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
                <path d="M3.5 7l8.5 6 8.5-6" />
              </svg>
            </span>
            <span className="channel-meta">
              <span className="channel-name">{CHANNELS.email.proxy}</span>
              <span className="channel-desc faux-mono">{CHANNELS.email.note}</span>
            </span>
            <span className="channel-arrow" aria-hidden="true">→</span>
          </button>

          <button type="button" className="channel-card faux-pane" onClick={sendWhatsApp}>
            <span className="channel-glyph" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3z" />
                <path d="M9 8.5c0 4 2.5 6.5 6.5 6.5l1-2-2.2-1-1 .8c-1.2-.6-1.9-1.3-2.4-2.4l.8-1-1-2.2-1.7.3z" />
              </svg>
            </span>
            <span className="channel-meta">
              <span className="channel-name">{CHANNELS.whatsapp.proxy}</span>
              <span className="channel-desc faux-mono">{CHANNELS.whatsapp.note}</span>
            </span>
            <span className="channel-arrow" aria-hidden="true">→</span>
          </button>

          <p className="channel-footnote faux-mono">
            {CONTACT.footnote}
          </p>
        </div>
      </div>

      <footer className="site-footer faux-mono">
        <p>{CONTACT.footer(new Date().getFullYear())}</p>
      </footer>
    </section>
  );
};

export default Contact;
