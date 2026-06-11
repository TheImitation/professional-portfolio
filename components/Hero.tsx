"use client";

import React from "react";
import "../styles/pages/Home.css";
import SpriteQuest from "./SpriteQuest";

const jobRoles = [
  "Senior Software Engineer",
  "Technical Strategist",
  "AI Platform Architect",
  "Self-Taught & Proud Of It",
];

export default function Hero()
{
  // The first role is repeated at the end so the vertical ticker loops seamlessly.
  const tickerRoles = [...jobRoles, jobRoles[0]];

  return (
    <section id="home" className="hero">
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="hero-kicker faux-mono" data-sprite-target>
            {"// hello, world — transmission from"}
          </p>
          <h1 data-sprite-target>
            Nic Defaux <span className="brand-mark faux-shimmer">TheImitation</span>
          </h1>
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
