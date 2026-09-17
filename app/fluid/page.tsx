import React from "react";
import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { CV_PATH, PERSON, SOCIALS } from "@/datasets/Site";
import { CONTRACTING, EDUCATION, JOB_ROLES, LOG_LINES, PROJECTS, REVIEWS, SKILL_DOMAINS, STATS } from "@/datasets/Content";
import FluidChrome, { type RoomRef } from "@/components/fluid/FluidChrome";
import FluidChannels from "@/components/fluid/FluidChannels";
import FluidTour from "@/components/fluid/FluidTour";
import "@/styles/fluid/atmosphere.css";
import "@/styles/fluid/rooms.css";

export const metadata: Metadata = {
  title: "Fluid — prototype",
  description:
    "A scroll-driven prototype of theimitation.dev: seven rooms, one travelling atmosphere, drawn entirely in CSS.",
  robots: { index: false, follow: false },
};

const ROOMS: RoomRef[] = [
  { id: "approach", numeral: "i", name: "approach" },
  { id: "ganzfeld", numeral: "ii", name: "about" },
  { id: "colonnade", numeral: "iii", name: "stack" },
  { id: "horizon", numeral: "iv", name: "horizon" },
  { id: "volume", numeral: "v", name: "work" },
  { id: "field", numeral: "vi", name: "words" },
  { id: "egress", numeral: "vii", name: "contact" },
];

/* `--i` drives each plane's depth in the 3D rooms. */
const depth = (i: number) => ({ ["--i" as string]: i }) as React.CSSProperties;

export default function FluidPage()
{
  const cvAvailable = fs.existsSync(path.join(process.cwd(), "public", CV_PATH));

  return (
    <div className="fluid">
      <div className="fluid-weather" aria-hidden="true" />
      <FluidChrome rooms={ROOMS} />
      <FluidTour />

      <main>
        <h1 className="fluid-sr">
          {PERSON.name} — {PERSON.title}. A scroll-driven prototype in seven rooms.
        </h1>

        {/* ─── i · APPROACH ─────────────────────────────────────────── */}
        <section className="fluid-room" id="approach" style={{ ["--span" as string]: 190 } as React.CSSProperties}>
          <div className="fluid-air air-approach" aria-hidden="true" />
          <div className="fluid-stage">
            <div className="aperture" aria-hidden="true" />
            <div className="approach-grid">
              <div className="hero-copy">
                <p className="hero-chips">
                  <span className="hero-chip">
                    <i aria-hidden="true" />
                    {PERSON.availability.toLowerCase()}
                  </span>
                  <span className="hero-chip quiet">{CONTRACTING.clearance}</span>
                </p>
                <h2 className="fluid-display fluid-xl hero-name">
                  Nic Defaux <b className="fluid-shimmer">TheImitation</b>
                </h2>
                {/* the vertical ticker from the live hero — the first role is
                    repeated at the end so the glide loops seamlessly */}
                <div className="role-ticker" role="text" aria-label={JOB_ROLES.join(", ")}>
                  <ul aria-hidden="true">
                    {[...JOB_ROLES, JOB_ROLES[0]].map((role, index) => (
                      <li key={`${role}-${index}`}>{role}</li>
                    ))}
                  </ul>
                </div>
                <p className="fluid-lede">
                  <em>Defaux</em> is French — <em>faux</em>, as in false. And what is faux,
                  if not an imitation? The code, however, is all true.
                </p>
                <div className="hero-actions">
                  <a className="fluid-btn solid" href="#egress">Open a channel</a>
                  <a className="fluid-btn" href="#colonnade">Inspect the stack</a>
                  {cvAvailable && <a className="fluid-btn" href={CV_PATH} download>Grab the CV</a>}
                </div>
              </div>

              <figure className="portrait">
                <img
                  src="/headshot.jpg"
                  width={760}
                  height={950}
                  alt="Headshot of Nic Defaux — Senior Software Engineer and Technical Strategist — backlit by a golden sunset that lends this site its warm accent colour"
                />
                <figcaption>headshot.jpg — backlit</figcaption>
              </figure>
            </div>
            <div className="fluid-label">
              <span>Room i</span>
              <b>Nic Defaux, backlit</b>
              <span>the sunset here is where this site&rsquo;s ember accent was sampled</span>
            </div>
          </div>
        </section>

        {/* ─── ii · GANZFELD — about ────────────────────────────────── */}
        <section className="fluid-room" id="ganzfeld" style={{ ["--span" as string]: 340 } as React.CSSProperties}>
          <div className="fluid-air air-ganzfeld" aria-hidden="true" />
          <div className="fluid-stage">
            <div className="bloom" aria-hidden="true" />
            {/* two plates: the log arrives line by line, then the numbers.
                One screen could not hold both legibly. */}
            <div className="fluid-plates plates-3 about-body">
              <div className="fluid-plate about-log">
                {LOG_LINES.map((line) => (
                  <div key={line.prompt}>
                    <p className="prompt"><span>❯</span> {line.prompt}</p>
                    <p className="output">{line.output}</p>
                  </div>
                ))}
              </div>
              <div className="fluid-plate about-stats">
                {STATS.map((stat) => (
                  <div key={stat.label}>
                    <b>{stat.value} <span>{stat.unit}</span></b>
                    <p>{stat.label}</p>
                  </div>
                ))}
              </div>
              <div className="fluid-plate about-edu">
                <p className="fluid-over">the route here</p>
                <ul>
                  {EDUCATION.map((credential) => (
                    <li key={credential.qualification}>
                      <b>{credential.qualification}</b>
                      <span>
                        {[credential.institution, credential.grade, credential.years]
                          .filter(Boolean)
                          .join("  ·  ")}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="fluid-label">
              <span>Room ii</span>
              <b>The human behind the handle</b>
              <span>radial-gradient, oklch(), scroll-linked hue</span>
            </div>
          </div>
        </section>

        {/* ─── iii · COLONNADE — skills ─────────────────────────────── */}
        <section className="fluid-room" id="colonnade" style={{ ["--span" as string]: 360 } as React.CSSProperties}>
          <div className="fluid-air air-colonnade" aria-hidden="true" />
          <div className="fluid-stage fluid-3d">
            <div className="corridor" aria-hidden="true">
              {Array.from({ length: 12 }, (_, i) => (
                <i className="arch" key={i} style={depth(i)} />
              ))}
            </div>
            <div className="fog" aria-hidden="true" />
            <div className="fluid-plates plates-3">
              {SKILL_DOMAINS.map((domain, index) => (
                <article className="fluid-plate skill-plate" key={domain.id}>
                  <p className="fluid-over">0{index + 1} / {domain.caption}</p>
                  <h2 className="fluid-display fluid-l">{domain.title}</h2>
                  <ul>
                    {domain.skills.map((skill) => <li key={skill}>{skill}</li>)}
                  </ul>
                </article>
              ))}
            </div>
            <div className="fluid-label">
              <span>Room iii</span>
              <b>Travelling through the stack</b>
              <span>perspective, preserve-3d, twelve planes</span>
            </div>
          </div>
        </section>

        {/* ─── iv · HORIZON ─────────────────────────────────────────── */}
        <section className="fluid-room" id="horizon" style={{ ["--span" as string]: 150 } as React.CSSProperties}>
          <div className="fluid-air air-horizon" aria-hidden="true" />
          <div className="fluid-stage">
            <div className="skyspace" aria-hidden="true">
              <div className="sky" />
              <div className="line" />
              <div className="ground" />
            </div>
            <div className="horizon-copy">
              <p className="fluid-over">iv / the work</p>
              <p className="fluid-display fluid-m" style={{ paddingBlockStart: "0.6em" }}>
                Built, torn down, rebuilt.
              </p>
            </div>
          </div>
        </section>

        {/* ─── v · VOLUME + vi · FIELD + vii · EGRESS ────────────────
            Wrapped together so one starfield spans all three: it ghosts in
            behind the work, reaches full by the testimonials, and keeps
            zooming to the foot of the page with the content on top. */}
        <div className="tail">
        {/* ─── v · VOLUME — projects ────────────────────────────────── */}
        <section className="fluid-room" id="volume" style={{ ["--span" as string]: 520 } as React.CSSProperties}>
          <div className="fluid-air air-volume" aria-hidden="true" />
          <div className="fluid-stage fluid-3d">
            {/* seven panes — the platform's architectural reincarnations */}
            <div className="glass" aria-hidden="true">
              <div className="glass-turn">
                {[-3, -2, -1, 0, 1, 2, 3].map((i) => <i key={i} style={depth(i)} />)}
              </div>
            </div>
            <div className="fluid-plates plates-5">
              {PROJECTS.map((project) => (
                <article className="fluid-plate work-plate" key={project.id}>
                  <p className="work-period">{project.period}</p>
                  <h2 className="fluid-display fluid-m">{project.title}</h2>
                  <p className="work-role">{project.role}</p>
                  <p className="work-desc">{project.description}</p>
                  {project.outcomes && (
                    <ul className="work-outcomes">
                      {project.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}
                    </ul>
                  )}
                  <ul className="work-stack">
                    {project.stack.map((tech) => <li key={tech}>{tech}</li>)}
                  </ul>
                  {project.href && (
                    <a className="fluid-btn" href={project.href} target="_blank" rel="noopener noreferrer">
                      Visit the site
                    </a>
                  )}
                  {project.locked && <p className="work-flag">◆ client work — details under wraps</p>}
                  {project.pending && <p className="work-flag">◆ coming back soon</p>}
                </article>
              ))}
            </div>
            <div className="fluid-label">
              <span>Room v</span>
              <b>Volume (Seven Panes)</b>
              <span>rotateY, seven translucent planes</span>
            </div>
          </div>
        </section>

        {/* ─── vi · FIELD — testimonials ────────────────────────────── */}
        <section className="fluid-room" id="field" style={{ ["--span" as string]: 360 } as React.CSSProperties}>
          <div className="fluid-air air-field" aria-hidden="true" />
          <div className="fluid-stage">
            <div className="fog soft" aria-hidden="true" />
            <div className="fluid-plates plates-4">
              {REVIEWS.map((review) => (
                <figure className="fluid-plate quote-plate" key={review.name}>
                  <blockquote>{review.quote}</blockquote>
                  <figcaption className="quote-who">
                    <b>
                      {review.linkedin
                        ? <a href={review.linkedin} target="_blank" rel="noopener noreferrer">{review.name}</a>
                        : review.name}
                    </b>
                    <span>{review.role}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
            <div className="fluid-label">
              <span>Room vi</span>
              <b>Field — what colleagues said</b>
              <span>eight point-planes in depth, zooming to the end of the page</span>
            </div>
          </div>
        </section>

        {/* ─── vii · EGRESS — contact ───────────────────────────────── */}
        <section className="fluid-room egress" id="egress" style={{ ["--span" as string]: 150 } as React.CSSProperties}>
          <div className="fluid-air air-egress" aria-hidden="true" />
          <div className="egress-body">
            <div className="egress-head">
              <p className="fluid-over fluid-in">vii / open a channel</p>
              <h2 className="fluid-display fluid-l fluid-in">Let&rsquo;s build something</h2>
            </div>

            <div className="egress-cols">
              <div className="fluid-in">
                <h3>Available for</h3>
                <p>Currently <strong>{PERSON.availability.toLowerCase()}</strong> — {PERSON.services}.</p>
                <ul className="egress-list">
                  <li>{CONTRACTING.clearance}</li>
                  <li>{CONTRACTING.dayRate}</li>
                  <li>{CONTRACTING.notice}</li>
                  <li>{CONTRACTING.working}</li>
                </ul>
              </div>

              <div className="fluid-in">
                <h3>Elsewhere</h3>
                <ul className="egress-list">
                  {SOCIALS.map((social) => (
                    <li key={social.label}>
                      <a href={social.url} target="_blank" rel="noopener noreferrer">
                        {social.label} ↗
                      </a>
                    </li>
                  ))}
                  {cvAvailable && (
                    <li><a href={CV_PATH} download>Curriculum vitae ↓</a></li>
                  )}
                </ul>
              </div>

              <div className="fluid-in">
                <h3>This prototype</h3>
                <ul className="egress-list">
                  <li>animation-timeline: scroll() / view()</li>
                  <li>view-timeline &amp; animation-range</li>
                  <li>@property interpolation</li>
                  <li>perspective, preserve-3d</li>
                  <li>oklch() — one travelling hue</li>
                  <li>No images. No canvas. No WebGL.</li>
                </ul>
              </div>
            </div>

            <p className="egress-foot fluid-in">
              One hue travels from iris to ember and back across the whole page —
              cold to warm to cold, old headshot to new.
              <span>Seven rooms. No prescribed route.</span>
            </p>

            <div className="fluid-in"><FluidChannels /></div>
          </div>
        </section>

        <div className="starfield" aria-hidden="true">
          <div className="starfield-depth">
            {Array.from({ length: 8 }, (_, i) => <i key={i} style={depth(i)} />)}
          </div>
        </div>
        </div>
      </main>
    </div>
  );
}
