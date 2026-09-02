"use client";

import React from "react";
import { useInView } from "react-intersection-observer";
import { SOCIALS } from "@/datasets/Site";
import CarouselDots, { useCarouselIndex } from "./CarouselDots";
import "../styles/components/Projects.css";

const githubUrl = SOCIALS.find((social) => social.label === "GitHub")?.url ?? "https://github.com/TheImitation/";

interface Project
{
  id: string;
  period: string;
  title: string;
  role: string;
  description: string;
  outcomes?: string[];
  stack: string[];
  href?: string;
  locked?: boolean;
  /* Site is temporarily down — show a badge instead of a dead `href`. */
  pending?: boolean;
}

const projects: Project[] = [
  {
    id: "lighthouse",
    period: "IBM · Public Sector",
    title: "Generative AI Lighthouse — Centre of Excellence",
    role: "Senior Technical Consultant",
    description:
      "Propositions and proof-of-concept solutions showing public sector clients what Generative AI can actually do: bespoke AWS cloud architectures, foundational software, and GPT-4-powered showcases that modernised technical and customer-support capabilities for genuine service excellence.",
    outcomes: ["8 PoCs delivered", "2 MVPs shipped", "AI ethics framework", "Strategic AI pipeline"],
    stack: ["AI Platform", "Cloud Architecture", "Technical Strategy", "Business Analysis"],
    locked: true,
  },
  {
    id: "ai-platform",
    period: "IBM · Public Sector",
    title: "The First Successful Public-Sector AI Platform",
    role: "Engineer → Consultant → Architect",
    description:
      "Built, stress-tested, torn down and rebuilt. The platform survived full architectural reincarnations on its way to becoming the first successful AI platform delivered for public sector clients — and the blueprint I still measure every platform against.",
    outcomes: ["£4m programme", "+77% process throughput", "10/10 NPS"],
    stack: ["AWS", "Meta", "TypeScript", "Kubernetes", "Terraform"],
    locked: true,
  },
  {
    id: "wc-sweeps",
    period: "2026 · Personal challenge",
    title: "World Cup 2026 Sweepstakes Tracker",
    role: "Solo build — design to production",
    description:
      "A production sweepstakes platform for the 2026 World Cup: live brackets, draw management and leaderboards that update as the tournament unfolds. Built end-to-end as a personal challenge and shipped for real players to use all summer.",
    stack: ["Next.js", "TypeScript", "Render", "Neon", "Cloudflare R2", "Vibes"],
    /* href: "https://sportssweepstakes.co.uk/" — offline for now. */
    pending: true,
  },
  {
    id: "mak99-interiors",
    period: "2026 · Freelance client",
    title: "MAK99 Interiors — Studio Site Rebuild",
    role: "Freelance build — redesign to production",
    description:
      "A full Next.js rebuild of a Washington D.C. interior design studio's marketing site: filterable project galleries with lightbox carousels, client testimonials, an Instagram feed and SEO groundwork (JSON-LD, OG cards, sitemap). Delivered end-to-end as billed freelance client work, from redesign to production launch.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    href: "https://www.mak99interiors.co.uk/",
  },
];

const ProjectRow: React.FC<{ project: Project; index: number }> = ({ project, index }) =>
{
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: false });

  return (
    <article ref={ref} className={`project-row${inView ? " in-view" : ""}`}>
      <div className="project-meta faux-mono">
        <span className="project-node" aria-hidden="true" />
        <p className="project-period">{project.period}</p>
        <p className="project-role">{project.role}</p>
      </div>
      <div className="project-card faux-pane">
        <h3 data-sprite-target>
          <span className="faux-mono project-index">0{index + 1}.</span> {project.title}
          {project.href && (
            <a
              className="project-link faux-mono"
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${project.title} (opens in a new tab)`}
            >
              live ↗
            </a>
          )}
          {project.pending && (
            <span className="project-link project-link-pending faux-mono">
              Coming back soon
            </span>
          )}
          {project.locked && (
            <a
              className="project-link project-link-locked faux-mono"
              href="#contact"
              aria-label={`${project.title} is under NDA — contact me to hear about it`}
            >
              NDA · ask me about it
            </a>
          )}
        </h3>
        <p className="project-description">{project.description}</p>
        {project.outcomes && (
          <ul className="project-outcomes" aria-label="Measured outcomes">
            {project.outcomes.map((outcome, outcomeIndex) => (
              <li className="faux-mono" style={{ transitionDelay: `${0.3 + outcomeIndex * 0.12}s` }} key={outcome}>
                {outcome}
              </li>
            ))}
          </ul>
        )}
        <ul className="project-stack" aria-label="Technologies used">
          {project.stack.map((tech, techIndex) => (
            <li className="faux-mono" style={{ transitionDelay: `${0.35 + techIndex * 0.12}s` }} key={tech}>
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

const Projects: React.FC = () =>
{
  const { containerRef, activeIndex, scrollToIndex } = useCarouselIndex(projects.length);

  return (
    <section id="projects">
      <p className="faux-kicker">03 / selected works</p>
      <h2 className="faux-heading" data-sprite-target>
        <span className="faux-hash">#</span>Projects, <span className="faux-shimmer">battle-tested</span>
      </h2>
      <p className="projects-note">
        Multi-million-pound public sector transformations — plus a couple of freelance and side-quest builds.
      </p>
      <div className="projects-timeline" ref={containerRef}>
        {projects.map((project, index) => (
          <ProjectRow project={project} index={index} key={project.id} />
        ))}
      </div>

      <CarouselDots count={projects.length} activeIndex={activeIndex} onSelect={scrollToIndex} label="Project slides" />

      <aside className="project-vault faux-pane" aria-label="Where the rest of the work lives">
        <svg className="vault-lock" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="4.5" y="10.5" width="15" height="10" rx="2" />
          <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
          <circle cx="12" cy="15.5" r="1.4" />
        </svg>
        <div className="vault-copy">
          <h3 className="faux-mono">{"/* 99% of my commits are "}<span className="redacted">redacted</span>{" */"}</h3>
          <p>
            The work above is real and I&apos;ll happily talk through any of it —
            but the commits live in enterprise GitLab behind client walls, so I
            can&apos;t link you to the proof. A couple of hobby builds escaped
            to GitHub.
          </p>
        </div>
        <a
          className="faux-btn faux-ghost"
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Browse the escapees ↗
        </a>
      </aside>
    </section>
  );
};

export default Projects;
