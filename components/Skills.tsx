"use client";

import React from "react";
import { useInView } from "react-intersection-observer";
import "../styles/components/Skills.css";

/* ==========================================================================
   Skills — each card's icon is a set of SVG strokes that draw themselves
   when scrolled into view. Every path is normalised (pathLength=1) and
   revealed via stroke-dashoffset; the transition delay of each stroke is
   the cumulative duration of all previous strokes, so the whole icon reads
   like one continuous pencil line that never leaves the paper.
   ========================================================================== */

type Stroke = { d: string; dur: number };
type Dot = { cx: number; cy: number };

interface SkillCard
{
  id: string;
  title: string;
  caption: string;
  skills: string[];
  strokes: Stroke[];
  dots?: Dot[];
}

const skillCards: SkillCard[] = [
  {
    id: "design",
    title: "User Design",
    caption: "Interfaces people actually enjoy",
    skills: [
      "UI / UX engineering",
      "Design systems & component libraries",
      "Heavy-duty CSS & motion design",
      "Accessibility (WCAG)",
      "Rapid prototyping",
    ],
    strokes: [
      // Pencil body (slanted), drawn as one closed sweep
      { d: "M50 80 L94 36 L108 50 L64 94 Z", dur: 1.2 },
      // Facet lines along the body
      { d: "M57 73 L100 30", dur: 0.5 },
      { d: "M71 87 L114 44", dur: 0.5 },
      // Sharpened tip and lead
      { d: "M50 80 L64 94 L40 104 Z", dur: 0.7 },
      { d: "M40 104 L47 97", dur: 0.25 },
      // The squiggle the pencil is drawing
      { d: "M40 104 C 26 118, 52 124, 68 116 S 98 110, 114 122", dur: 1.1 },
    ],
  },
  {
    id: "architecture",
    title: "Architecture & Technology",
    caption: "Systems sketched on napkins, shipped to clouds",
    skills: [
      "Cloud architecture (AWS)",
      "TypeScript / Node.js / Next.js",
      "Distributed systems & APIs",
      "Technical strategy & consulting",
      "DevOps & infrastructure as code",
    ],
    strokes: [
      // Client box with title bar
      { d: "M14 20 h42 v28 h-42 Z", dur: 0.9 },
      { d: "M14 29 h42", dur: 0.3 },
      // Connector to API box, with arrowhead
      { d: "M56 34 H84", dur: 0.35 },
      { d: "M77 29 l7 5 l-7 5", dur: 0.3 },
      // API box
      { d: "M84 20 h42 v28 h-42 Z", dur: 0.9 },
      // Connector down to the database
      { d: "M105 48 V74", dur: 0.3 },
      // Database cylinder
      { d: "M85 80 a20 7 0 0 0 40 0 a20 7 0 0 0 -40 0 v26 a20 7 0 0 0 40 0 v-26", dur: 1.2 },
      // Connector down-left to the cloud
      { d: "M35 48 V86", dur: 0.35 },
      // Cloud
      { d: "M22 100 a11 11 0 0 1 20 -8 a9 9 0 0 1 16 6 a8 8 0 0 1 -5 14 h-26 a9 9 0 0 1 -5 -12", dur: 1.0 },
    ],
  },
  {
    id: "ai",
    title: "Artificial Intelligence",
    caption: "Built & rebuilt AI platforms — incl. the public sector's first",
    skills: [
      "Generative AI platform engineering",
      "LLM integration, RAG & agents",
      "AI strategy for the public sector",
      "MLOps & evaluation pipelines",
      "Responsible & explainable AI",
    ],
    strokes: [
      // Left hemisphere outline (organic)
      { d: "M70 18 C 48 10, 28 22, 27 40 C 12 46, 12 66, 22 74 C 16 90, 28 106, 44 104 C 50 118, 66 122, 70 110", dur: 1.5 },
      // Right hemisphere outline
      { d: "M70 18 C 92 10, 112 22, 113 40 C 128 46, 128 66, 118 74 C 124 90, 112 106, 96 104 C 90 118, 74 122, 70 110", dur: 1.5 },
      // Centre fold
      { d: "M70 22 V 110", dur: 0.5 },
      // Organic gyri on the left
      { d: "M38 40 C 46 33, 57 39, 52 47 C 61 45, 65 55, 56 59", dur: 0.7 },
      { d: "M33 66 C 41 61, 49 67, 45 75 C 53 73, 57 83, 48 87", dur: 0.7 },
      // Circuit traces on the right
      { d: "M78 36 h14 v12 h12", dur: 0.5 },
      { d: "M80 62 h22 v14", dur: 0.45 },
      { d: "M78 90 h12 v-10 h14", dur: 0.5 },
    ],
    dots: [
      { cx: 104, cy: 48 },
      { cx: 102, cy: 76 },
      { cx: 104, cy: 80 },
    ],
  },
];

const DrawnIcon: React.FC<{ card: SkillCard; active: boolean }> = ({ card, active }) =>
{
  let elapsed = 0.3; // small beat after the card fades in

  return (
    <svg
      viewBox="0 0 140 140"
      className={`drawn-icon${active ? " active" : ""}`}
      role="img"
      aria-label={`Hand-drawn ${card.title} illustration`}
    >
      {card.strokes.map((stroke, index) =>
      {
        const delay = elapsed;
        elapsed += stroke.dur;
        return (
          <path
            key={index}
            d={stroke.d}
            pathLength={1}
            style={{ transitionDuration: `${stroke.dur}s`, transitionDelay: `${delay}s` }}
          />
        );
      })}
      {card.dots?.map((dot, index) => (
        <circle
          key={index}
          cx={dot.cx}
          cy={dot.cy}
          r={3.2}
          className="node"
          style={{ transitionDelay: `${elapsed + index * 0.2}s` }}
        />
      ))}
    </svg>
  );
};

const SkillPanel: React.FC<{ card: SkillCard; index: number }> = ({ card, index }) =>
{
  const { ref, inView } = useInView({ threshold: 0.35, triggerOnce: false });

  return (
    <article ref={ref} className={`skill-card faux-pane${inView ? " in-view" : ""}`}>
      <DrawnIcon card={card} active={inView} />
      <h3 data-sprite-target>
        <span className="faux-mono skill-index">0{index + 1}.</span> {card.title}
      </h3>
      <p className="skill-caption">{card.caption}</p>
      <ul>
        {card.skills.map((skill, skillIndex) => (
          <li key={skill} style={{ transitionDelay: `${0.5 + skillIndex * 0.15}s` }}>
            {skill}
          </li>
        ))}
      </ul>
    </article>
  );
};

const Skills: React.FC = () => (
  <section id="skills">
    <p className="faux-kicker">02 / what i bring to the table</p>
    <h2 className="faux-heading" data-sprite-target>
      <span className="faux-hash">#</span>Skills, <span className="faux-shimmer">drawn from memory</span>
    </h2>
    <p className="skills-note">
      Each illustration sketches itself in a single unbroken line — pencil down, no lifting.
    </p>
    <div className="skills-grid">
      {skillCards.map((card, index) => (
        <SkillPanel card={card} index={index} key={card.id} />
      ))}
    </div>
  </section>
);

export default Skills;
