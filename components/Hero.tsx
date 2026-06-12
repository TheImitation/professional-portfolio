"use client";

import React from "react";
import "../styles/pages/Home.css";
import SpriteQuest from "./SpriteQuest";
import { CV_PATH, PERSON } from "@/datasets/Site";

const jobRoles = [
  "Senior Software Engineer",
  "Technical Strategist",
  "AI Platform Architect",
  "Self-Taught & Proud Of It",
];

export default function Hero({ cvAvailable = false }: { cvAvailable?: boolean })
{
  // The first role is repeated at the end so the vertical ticker loops seamlessly.
  const tickerRoles = [...jobRoles, jobRoles[0]];

  return (
    <section id="home" className="hero">
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="status-chip faux-mono">
            <span className="status-dot" aria-hidden="true" />
            {PERSON.availability.toLowerCase()}
          </p>
          <p className="hero-kicker faux-mono" data-sprite-target>
            {"// hello, world — transmission from"}
          </p>
          <h1 data-sprite-target>
            Nic Defaux <span className="brand-mark faux-shimmer">TheImitation</span>
          </h1>
          <p className="brand-gloss faux-mono" data-sprite-target>
            {"// Defaux is French for 'of false' — the handle is just my surname, translated"}
          </p>
          <div className="role-ticker" role="text" aria-label={jobRoles.join(", ")}>
            <ul aria-hidden="true">
              {tickerRoles.map((role, index) => (
                <li key={`${role}-${index}`} data-sprite-target>{role}</li>
              ))}
            </ul>
          </div>
          <p className="hero-blurb" data-sprite-target>
            I fuse creativity and precision at the cutting edge — building
            AI platforms, architecting clouds, and occasionally hiding
            pixel creatures behind my own photograph.
          </p>
          <div className="hero-actions">
            <a className="faux-btn faux-solid" href="#contact">Open a channel</a>
            <a className="faux-btn faux-ghost" href="#skills">Inspect my stack</a>
            {cvAvailable && (
              <a className="faux-btn faux-ghost" href={CV_PATH} download>
                Grab my CV
              </a>
            )}
          </div>
        </div>
        <SpriteQuest />
      </div>
      <a className="scroll-cue faux-mono" href="#about" aria-label="Scroll to about section">
        <span>scroll</span>
        <span className="cue-arrow">▾</span>
      </a>
    </section>
  );
}
