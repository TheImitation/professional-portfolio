"use client";

import React from "react";
import { useInView } from "react-intersection-observer";
import { STATS as stats, LOG_LINES as logLines } from "@/datasets/Content";
import { ABOUT, NAME_PUN, SECTIONS } from "@/datasets/Copy";
import Rich from "./Rich";
import "../styles/components/About.css";

const About: React.FC = () =>
{
  const { ref, inView } = useInView({ threshold: 0.25, triggerOnce: false });

  return (
    <section id="about" ref={ref} className={`about${inView ? " in-view" : ""}`}>
      <p className="faux-kicker">{SECTIONS.about.kicker}</p>
      <h2 className="faux-heading" data-sprite-target>
        <span className="faux-hash">#</span>{SECTIONS.about.heading} <span className="faux-shimmer">{SECTIONS.about.accent}</span>
      </h2>
      <p className="about-pun" data-sprite-target>
        <Rich text={NAME_PUN} />
      </p>

      <div className="about-grid">
        <div className="terminal faux-pane" role="img" aria-label={ABOUT.terminalAria}>
          <div className="terminal-bar">
            <i /><i /><i />
            <span className="faux-mono">{ABOUT.terminal}</span>
          </div>
          <div className="terminal-body faux-mono">
            {logLines.map((line, index) => (
              <div className="terminal-line" style={{ transitionDelay: `${0.25 + index * 0.35}s` }} key={line.prompt}>
                <p className="prompt"><span>❯</span> {line.prompt}</p>
                <p className="output">{line.output}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="stat-stack">
          {stats.map((stat, index) => (
            <div
              className="stat-card faux-pane"
              style={{ transitionDelay: `${0.2 + index * 0.18}s` }}
              key={stat.label}
              data-sprite-target
            >
              <p className="stat-value faux-shimmer">
                {stat.value} <span className="stat-unit">{stat.unit}</span>
              </p>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
