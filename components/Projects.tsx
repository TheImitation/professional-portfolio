"use client";

import React from "react";
import { useInView } from "react-intersection-observer";
import { SOCIALS } from "@/datasets/Site";
import CarouselDots, { useCarouselIndex } from "./CarouselDots";
import { PROJECTS as projects, type Project } from "@/datasets/Content";
import "../styles/components/Projects.css";

const githubUrl = SOCIALS.find((social) => social.label === "GitHub")?.url ?? "https://github.com/TheImitation/";

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
