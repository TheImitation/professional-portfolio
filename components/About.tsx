"use client";

import React from "react";
import { useInView } from "react-intersection-observer";
import "../styles/components/About.css";

const stats = [
  { value: "5", unit: "years", label: "engineering at IBM" },
  { value: "1st", unit: "of its kind", label: "successful AI platform for public sector clients" },
  { value: "100%", unit: "self-taught", label: "engineer, consultant & architect" },
];

const logLines = [
  { prompt: "whoami", output: "Nic Defaux — Senior Software Engineer & Technical Strategist" },
  { prompt: "cat origin_story.txt", output: "No degree pipeline, no bootcamp script. Self-taught from first principles — engineer, then consultant, then architect." },
  { prompt: "history | grep IBM", output: "Five years building and rebuilding AI platforms; delivered the first successful AI platform for public sector clients, a Generative AI centre of excellence." },
  { prompt: "echo $PERSONALITY", output: "Laid-back, nerdy, heart firmly on sleeve. Will absolutely talk your ear off about elegant architectures." },
];

const About: React.FC = () =>
{
  const { ref, inView } = useInView({ threshold: 0.25, triggerOnce: false });

  return (
    <section id="about" ref={ref} className={`about${inView ? " in-view" : ""}`}>
      <p className="faux-kicker">01 / the human behind the handle</p>
      <h2 className="faux-heading" data-sprite-target>
        <span className="faux-hash">#</span>About <span className="faux-shimmer">TheImitation</span>
      </h2>
      <p className="about-pun" data-sprite-target>
        <em>Defaux</em> is French — <em>faux</em>, as in fake.
        And what is faux, if not an imitation? The code, however, is all true.
      </p>

      <div className="about-grid">
        <div className="terminal faux-pane" role="img" aria-label="Terminal-styled biography of Nic Defaux">
          <div className="terminal-bar">
            <i /><i /><i />
            <span className="faux-mono">nic@theimitation: ~/about</span>
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
