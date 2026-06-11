"use client";

import React from "react";
import { useInView } from "react-intersection-observer";
import "../styles/components/Projects.css";

interface Project
{
  id: string;
  period: string;
  title: string;
  role: string;
  description: string;
  stack: string[];
}

const projects: Project[] = [
  {
    id: "lighthouse",
    period: "IBM · Public Sector",
    title: "Generative AI Lighthouse — Centre of Excellence",
    role: "Senior Technical Consultant",
    description:
      "Propositions and proof-of-concept solutions showing public sector clients what Generative AI can actually do: bespoke AWS cloud architectures, foundational software, and GPT-4-powered showcases that modernised technical and customer-support capabilities for genuine service excellence.",
    stack: ["AWS", "GPT-4", "TypeScript", "Serverless"],
  },
  {
    id: "ai-platform",
    period: "IBM · Public Sector",
    title: "The First Successful Public-Sector AI Platform",
    role: "Engineer → Consultant → Architect",
    description:
      "Built, stress-tested, torn down and rebuilt. The platform survived full architectural reincarnations on its way to becoming the first successful AI platform delivered for public sector clients — and the blueprint I still measure every platform against.",
    stack: ["AI Platform", "Cloud Architecture", "Technical Strategy"],
  },
  {
    id: "theimitation",
    period: "2026 · Side quest",
    title: "theimitation.dev — the site you're reading",
    role: "Designer, engineer & resident sprite wrangler",
    description:
      "A heavy-CSS playground: self-drawing SVGs, a flashlight-masked easter egg with its own physics loop, scroll-driven reveals — and not a single animation library in the bundle. You are currently standing inside the deliverable.",
    stack: ["Next.js", "TypeScript", "Pure CSS"],
  },
];

const ProjectRow: React.FC<{ project: Project; index: number }> = ({ project, index }) =>
{
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: false });

  return (
    <article ref={ref} className={`project-row${inView ? " in-view" : ""}`}>
      <div className="project-meta mono">
        <span className="project-node" aria-hidden="true" />
        <p className="project-period">{project.period}</p>
        <p className="project-role">{project.role}</p>
      </div>
      <div className="project-card glass">
        <h3 data-sprite-target>
          <span className="mono project-index">0{index + 1}.</span> {project.title}
        </h3>
        <p className="project-description">{project.description}</p>
        <ul className="project-stack" aria-label="Technologies used">
          {project.stack.map((tech, techIndex) => (
            <li className="mono" style={{ transitionDelay: `${0.35 + techIndex * 0.12}s` }} key={tech}>
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

const Projects: React.FC = () => (
  <section id="projects">
    <p className="section-kicker">03 / selected works</p>
    <h2 className="section-heading" data-sprite-target>
      <span className="hash">#</span>Projects, <span className="gradient-text">battle-tested</span>
    </h2>
    <p className="projects-note">
      Multi-million-pound public sector transformations — plus one nerdy side quest.
    </p>
    <div className="projects-timeline">
      {projects.map((project, index) => (
        <ProjectRow project={project} index={index} key={project.id} />
      ))}
    </div>
  </section>
);

export default Projects;
