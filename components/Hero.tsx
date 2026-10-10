"use client";

import React from "react";
import "../styles/pages/Home.css";
import SpriteQuest from "./SpriteQuest";
import { CV_PATH, JOB_ROLES as jobRoles, PERSON } from "@/datasets/Site";
import { CLASSIC_HERO, CTA } from "@/datasets/Copy";

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
            {CLASSIC_HERO.greeting}
          </p>
          <h1 data-sprite-target>
            {PERSON.name} <span className="brand-mark faux-shimmer">{PERSON.brand}</span>
          </h1>
          <p className="brand-gloss faux-mono" data-sprite-target>
            {CLASSIC_HERO.gloss}
          </p>
          <div className="role-ticker" role="text" aria-label={jobRoles.join(", ")}>
            <ul aria-hidden="true">
              {tickerRoles.map((role, index) => (
                <li key={`${role}-${index}`} data-sprite-target>{role}</li>
              ))}
            </ul>
          </div>
          <p className="hero-blurb" data-sprite-target>
            {CLASSIC_HERO.blurb}
          </p>
          <div className="hero-actions">
            <a className="faux-btn faux-solid" href="#contact">{CTA.contact}</a>
            <a className="faux-btn faux-ghost" href="#skills">{CTA.stack}</a>
            {cvAvailable && (
              <a className="faux-btn faux-ghost" href={CV_PATH} download>
                {CTA.cv}
              </a>
            )}
          </div>
          {/* the same material, walked through as an exhibition */}
          <a className="gallery-door faux-mono" href="/">
            <span className="door-dot" aria-hidden="true" />
            {CTA.gallery}
            <span className="door-arrow" aria-hidden="true">↗</span>
          </a>
        </div>
        <SpriteQuest />
      </div>
      <a className="scroll-cue faux-mono" href="#about" aria-label={CLASSIC_HERO.scrollAria}>
        <span>{CLASSIC_HERO.scroll}</span>
        <span className="cue-arrow">▾</span>
      </a>
    </section>
  );
}
