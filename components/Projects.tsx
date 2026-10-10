"use client";

import React from "react";
import { useInView } from "react-intersection-observer";
import { SOCIAL } from "@/datasets/Site";
import CarouselDots, { useCarouselIndex } from "./CarouselDots";
import ProjectSnapshot from "./ProjectSnapshot";
import { PROJECTS as projects, projectPeriod, type Project } from "@/datasets/Content";
import { CTA, PROJECT_UI, SECTIONS } from "@/datasets/Copy";
import "../styles/components/Projects.css";

const ProjectRow: React.FC<{ project: Project; index: number }> = ({ project, index }) =>
{
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: false });

  return (
    <article ref={ref} className={`project-row${inView ? " in-view" : ""}`}>
      <div className="project-meta faux-mono">
        <span className="project-node" aria-hidden="true" />
        <p className="project-period">{projectPeriod(project)}</p>
        <p className="project-role">{project.role}</p>
      </div>
      <div className={`project-card faux-pane${project.snapshot ? " has-snapshot" : ""}`}>
        <h3 data-sprite-target>
          <span className="faux-mono project-index">0{index + 1}.</span> {project.title}
          {project.href && (
            <a
              className="project-link faux-mono"
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={PROJECT_UI.liveAria(project.title)}
            >
              {CTA.live} ↗
            </a>
          )}
          {project.pending && (
            <span className="project-link project-link-pending faux-mono">
              {PROJECT_UI.pending}
            </span>
          )}
          {project.locked && (
            <a
              className="project-link project-link-locked faux-mono"
              href="#contact"
              aria-label={PROJECT_UI.lockedAria(project.title)}
            >
              {PROJECT_UI.locked}
            </a>
          )}
        </h3>
        <div className="project-body">
          <p className="project-description">{project.description}</p>
          {project.outcomes && (
            <ul className="project-outcomes" aria-label={PROJECT_UI.outcomes}>
              {project.outcomes.map((outcome, outcomeIndex) => (
                <li className="faux-mono" style={{ transitionDelay: `${0.3 + outcomeIndex * 0.12}s` }} key={outcome}>
                  {outcome}
                </li>
              ))}
            </ul>
          )}
          <ul className="project-stack" aria-label={PROJECT_UI.stack}>
            {project.stack.map((tech, techIndex) => (
              <li className="faux-mono" style={{ transitionDelay: `${0.35 + techIndex * 0.12}s` }} key={tech}>
                {tech}
              </li>
            ))}
          </ul>
        </div>
        <ProjectSnapshot project={project} className="project-snapshot" />
      </div>
    </article>
  );
};

const Projects: React.FC = () =>
{
  const { containerRef, activeIndex, scrollToIndex } = useCarouselIndex(projects.length);

  return (
    <section id="projects">
      <p className="faux-kicker">{SECTIONS.projects.kicker}</p>
      <h2 className="faux-heading" data-sprite-target>
        <span className="faux-hash">#</span>{SECTIONS.projects.heading}, <span className="faux-shimmer">{SECTIONS.projects.accent}</span>
      </h2>
      <p className="projects-note">{SECTIONS.projects.note}</p>
      <div className="projects-timeline" ref={containerRef}>
        {projects.map((project, index) => (
          <ProjectRow project={project} index={index} key={project.id} />
        ))}
      </div>

      <CarouselDots count={projects.length} activeIndex={activeIndex} onSelect={scrollToIndex} label={PROJECT_UI.slides} />

      <aside className="project-vault faux-pane" aria-label={PROJECT_UI.vault.aria}>
        <svg className="vault-lock" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="4.5" y="10.5" width="15" height="10" rx="2" />
          <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
          <circle cx="12" cy="15.5" r="1.4" />
        </svg>
        <div className="vault-copy">
          <h3 className="faux-mono">{`/* ${PROJECT_UI.vault.title} `}<span className="redacted">{PROJECT_UI.vault.redacted}</span>{" */"}</h3>
          <p>{PROJECT_UI.vault.body}</p>
        </div>
        <a
          className="faux-btn faux-ghost"
          href={SOCIAL.github.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {CTA.github} ↗
        </a>
      </aside>
    </section>
  );
};

export default Projects;
