import React from "react";
import { CV_PATH, HEADSHOT, JOB_ROLES, PERSON, SOCIALS } from "@/datasets/Site";
import { CONTRACTING, EDUCATION, LOG_LINES, PROJECTS, REVIEWS, SKILL_DOMAINS, STATS, credentialLine, projectPeriod } from "@/datasets/Content";
import { AVAILABILITY_LINE, CONTACT, CTA, GALLERY, NAME_PUN, PLANES, PROJECT_UI, ROOMS, room } from "@/datasets/Copy";
import { cvAvailable as hasCv } from "@/lib/cv";
import FluidChrome from "@/components/fluid/FluidChrome";
import FluidChannels from "@/components/fluid/FluidChannels";
import FluidTour from "@/components/fluid/FluidTour";
import FluidTimeline from "@/components/fluid/FluidTimeline";
import ProjectSnapshot from "@/components/ProjectSnapshot";
import Rich from "@/components/Rich";
import { OPENING, arrivals, holdFor, pace, plateKeyframes, words } from "@/components/fluid/pacing";
import "@/styles/fluid/atmosphere.css";
import "@/styles/fluid/rooms.css";

/* The home page. Title, description, canonical and the OG card all come
   from the root layout's defaults; the classic one-page view lives at
   /classic (app/classic/page.tsx), linked from the chrome on every room. */

function RoomLabel({ id }: { id: string })
{
  const { numeral, label } = room(id);
  if (!label) return null;
  return (
    <div className="fluid-label">
      <span>{GALLERY.roomWord} {numeral}</span>
      <b>{label.title}</b>
      <span>{label.note}</span>
    </div>
  );
}

/* `--i` drives each plane's depth in the 3D rooms. */
const depth = (i: number) => ({ ["--i" as string]: i }) as React.CSSProperties;
/* n planes centred on zero: 7 → -3 … 3 */
const centred = (n: number) => Array.from({ length: n }, (_, i) => i - (n - 1) / 2);

/* ── pacing: holds counted from the words each exhibit carries ─────────
   (the grid itself, and why, lives in components/fluid/pacing.ts) */
const HERO = pace([OPENING], true);

const LOG_WORDS = LOG_LINES.map((line) => words([line.prompt, line.output]));
const ABOUT = pace([
  holdFor(LOG_WORDS.reduce((a, b) => a + b, 0)),
  holdFor(words(STATS.flatMap((s) => [s.value, s.unit, s.label]))),
  holdFor(words([GALLERY.route, ...EDUCATION.flatMap((c) => [c.qualification, credentialLine(c)])])),
]);
const LOG = arrivals(ABOUT, 0, LOG_WORDS);

const STACK = pace(SKILL_DOMAINS.map((d) => holdFor(words([d.caption, d.title, ...d.skills]))));

const HORIZON = pace([holdFor(words([GALLERY.horizon.over, GALLERY.horizon.line]))]);

const WORK = pace(PROJECTS.map((p) =>
  holdFor(words([projectPeriod(p), p.title, p.role, p.description], [...(p.outcomes ?? []), ...p.stack]))));

const WORDS = pace(REVIEWS.map((r) => holdFor(words([r.quote, r.name, r.role]))));

export default function FluidPage()
{
  const cvAvailable = hasCv();

  return (
    <div className="fluid">
      {/* per-window plate keyframes: one fade length, whatever the hold */}
      <style dangerouslySetInnerHTML={{ __html: plateKeyframes() }} />
      <div className="fluid-weather" aria-hidden="true" />
      <FluidChrome rooms={ROOMS} />
      <FluidTour />
      <FluidTimeline />

      <main>
        <h1 className="fluid-sr">
          {GALLERY.summary}
        </h1>

        {/* ─── i · APPROACH ─────────────────────────────────────────── */}
        <section className="fluid-room" id="approach" style={HERO.room}>
          <div className="fluid-air air-approach" aria-hidden="true" />
          <div className="fluid-stage">
            <div className="aperture" aria-hidden="true" />
            <div className="fluid-plate approach-grid" style={HERO.plates[0]}>
              <div className="hero-copy">
                <p className="hero-chips">
                  <span className="hero-chip">
                    <i aria-hidden="true" />
                    {PERSON.availability.toLowerCase()}
                  </span>
                  <span className="hero-chip quiet">{CONTRACTING.clearance}</span>
                </p>
                <h2 className="fluid-display fluid-xl hero-name">
                  {PERSON.name} <b className="fluid-shimmer">{PERSON.brand}</b>
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
                  <Rich text={NAME_PUN} />
                </p>
                <div className="hero-actions">
                  <a className="fluid-btn solid" href="#egress">{CTA.contact}</a>
                  <a className="fluid-btn" href="#colonnade">{CTA.stack}</a>
                  {cvAvailable && <a className="fluid-btn" href={CV_PATH} download>{CTA.cv}</a>}
                </div>
              </div>

              <figure className="portrait">
                <img src={HEADSHOT.src} width={HEADSHOT.width} height={HEADSHOT.height} alt={HEADSHOT.alt} />
                <figcaption>{GALLERY.portraitCaption}</figcaption>
              </figure>
            </div>
            <RoomLabel id="approach" />
          </div>
        </section>

        {/* ─── ii · GANZFELD — about ────────────────────────────────── */}
        <section className="fluid-room" id="ganzfeld" style={ABOUT.room}>
          <div className="fluid-air air-ganzfeld" aria-hidden="true" />
          <div className="fluid-stage">
            <div className="bloom" aria-hidden="true" />
            {/* two plates: the log arrives line by line, then the numbers.
                One screen could not hold both legibly. */}
            <div className="fluid-plates about-body">
              <div className="fluid-plate about-log" style={ABOUT.plates[0]}>
                {LOG_LINES.map((line, index) => (
                  <div key={line.prompt} style={LOG[index]}>
                    <p className="prompt"><span>❯</span> {line.prompt}</p>
                    <p className="output">{line.output}</p>
                  </div>
                ))}
              </div>
              <div className="fluid-plate about-stats" style={ABOUT.plates[1]}>
                {STATS.map((stat) => (
                  <div key={stat.label}>
                    <b>{stat.value} <span>{stat.unit}</span></b>
                    <p>{stat.label}</p>
                  </div>
                ))}
              </div>
              <div className="fluid-plate about-edu" data-era={EDUCATION.map((c) => c.id).join(" ")} style={ABOUT.plates[2]}>
                <p className="fluid-over">{GALLERY.route}</p>
                <ul>
                  {EDUCATION.map((credential) => (
                    <li key={credential.qualification}>
                      <b>{credential.qualification}</b>
                      <span>{credentialLine(credential)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <RoomLabel id="ganzfeld" />
          </div>
        </section>

        {/* ─── iii · COLONNADE — skills ─────────────────────────────── */}
        <section className="fluid-room" id="colonnade" style={STACK.room}>
          <div className="fluid-air air-colonnade" aria-hidden="true" />
          <div className="fluid-stage fluid-3d">
            <div className="corridor" aria-hidden="true">
              {Array.from({ length: PLANES.arches }, (_, i) => (
                <i className="arch" key={i} style={depth(i)} />
              ))}
            </div>
            <div className="fog" aria-hidden="true" />
            <div className="fluid-plates">
              {SKILL_DOMAINS.map((domain, index) => (
                <article className="fluid-plate skill-plate" key={domain.id} style={STACK.plates[index]}>
                  <p className="fluid-over">0{index + 1} / {domain.caption}</p>
                  <h2 className="fluid-display fluid-l">{domain.title}</h2>
                  <ul>
                    {domain.skills.map((skill) => <li key={skill}>{skill}</li>)}
                  </ul>
                </article>
              ))}
            </div>
            <RoomLabel id="colonnade" />
          </div>
        </section>

        {/* ─── iv · HORIZON ─────────────────────────────────────────── */}
        <section className="fluid-room" id="horizon" style={HORIZON.room}>
          <div className="fluid-air air-horizon" aria-hidden="true" />
          <div className="fluid-stage">
            <div className="skyspace" aria-hidden="true">
              <div className="sky" />
              <div className="line" />
              <div className="ground" />
            </div>
            <div className="fluid-plate horizon-copy" style={HORIZON.plates[0]}>
              <p className="fluid-over">{GALLERY.horizon.over}</p>
              <p className="fluid-display fluid-m" style={{ paddingBlockStart: "0.6em" }}>
                {GALLERY.horizon.line}
              </p>
            </div>
          </div>
        </section>

        {/* ─── v · VOLUME — projects ────────────────────────────────── */}
        <section className="fluid-room" id="volume" style={WORK.room}>
          <div className="fluid-air air-volume" aria-hidden="true" />
          <div className="fluid-stage fluid-3d">
            {/* the panes: the platform's architectural reincarnations */}
            <div className="glass" aria-hidden="true">
              <div className="glass-turn">
                {centred(PLANES.panes).map((i) => <i key={i} style={depth(i)} />)}
              </div>
            </div>
            <div className="fluid-plates">
              {PROJECTS.map((project, index) => (
                <article
                  className={`fluid-plate work-plate${project.snapshot ? " has-snapshot" : ""}`}
                  key={project.id}
                  data-era={project.id}
                  style={WORK.plates[index]}
                >
                  <p className="work-period">{projectPeriod(project)}</p>
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
                      {CTA.visit}
                    </a>
                  )}
                  {project.locked && <p className="work-flag">◆ {PROJECT_UI.locked}</p>}
                  {project.pending && <p className="work-flag">◆ {PROJECT_UI.pending}</p>}
                  {/* hangs in front of the glass on wide screens, inline below */}
                  <ProjectSnapshot project={project} className="work-snapshot" theme="fluid" />
                </article>
              ))}
            </div>
            <RoomLabel id="volume" />
          </div>
        </section>

        {/* ─── vi · FIELD + vii · EGRESS ─────────────────────────────
            Wrapped together so one starfield spans both: it opens against
            the lens as the testimonials arrive and keeps zooming to the foot
            of the page with the content on top. It stays out of the work
            room, which already carries the glass and the snapshots. */}
        <div className="tail">
        {/* ─── vi · FIELD — testimonials ────────────────────────────── */}
        <section className="fluid-room" id="field" style={WORDS.room}>
          <div className="fluid-air air-field" aria-hidden="true" />
          <div className="fluid-stage">
            <div className="fog soft" aria-hidden="true" />
            <div className="fluid-plates">
              {REVIEWS.map((review, index) => (
                <figure className="fluid-plate quote-plate" key={review.name} style={WORDS.plates[index]}>
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
            <RoomLabel id="field" />
          </div>
        </section>

        {/* ─── vii · EGRESS — contact ───────────────────────────────── */}
        <section className="fluid-room egress" id="egress" style={{ ["--span" as string]: 150 } as React.CSSProperties}>
          <div className="fluid-air air-egress" aria-hidden="true" />
          <div className="egress-body">
            <div className="egress-head">
              <p className="fluid-over fluid-in">{GALLERY.egress.over}</p>
              <h2 className="fluid-display fluid-l fluid-in">{CONTACT.prompt}</h2>
            </div>

            <div className="egress-cols">
              <div className="fluid-in">
                <h3>{GALLERY.egress.available}</h3>
                <p><Rich text={AVAILABILITY_LINE} /></p>
                <ul className="egress-list">
                  {Object.values(CONTRACTING).map((term) => <li key={term}>{term}</li>)}
                </ul>
              </div>

              <div className="fluid-in">
                <h3>{GALLERY.egress.elsewhere}</h3>
                <ul className="egress-list">
                  {SOCIALS.map((social) => (
                    <li key={social.label}>
                      <a href={social.url} target="_blank" rel="noopener noreferrer">
                        {social.label} ↗
                      </a>
                    </li>
                  ))}
                  {cvAvailable && (
                    <li><a href={CV_PATH} download>{CTA.cv} ↓</a></li>
                  )}
                  <li><a href="/classic">{CTA.classic} →</a></li>
                </ul>
              </div>
            </div>

            <div className="fluid-in"><FluidChannels /></div>
          </div>
        </section>

        <div className="starfield" aria-hidden="true">
          <div className="starfield-depth">
            {Array.from({ length: PLANES.stars }, (_, i) => <i key={i} style={depth(i)} />)}
          </div>
        </div>
        </div>
      </main>
    </div>
  );
}
