"use client";

import React, { useId, useRef } from "react";
import { projectPeriod, type Project } from "@/datasets/Content";
import { CTA, PROJECT_UI } from "@/datasets/Copy";
import "../styles/components/ProjectSnapshot.css";

/* "www.mak99interiors.co.uk/" → "mak99interiors.co.uk", keeping any path. */
const addressOf = (href: string) =>
{
  const url = new URL(href);
  return (url.host + url.pathname).replace(/^www\./, "").replace(/\/$/, "");
};

/**
 * A little browser window onto a live project: a still of its landing page
 * under a title bar carrying the real address. Shared by the main site and
 * the fluid gallery, which re-themes it through `--snap-*` custom properties
 * and the `theme` class on the overview sheet.
 *
 * With an `overview`, the window opens that fuller story in place, in a
 * native <dialog> (focus trap, Esc and the top layer come free). Without
 * one it is simply a link to the live site.
 */
const ProjectSnapshot: React.FC<{ project: Project; className?: string; theme?: "faux" | "fluid" }> = ({
  project,
  className,
  theme = "faux",
}) =>
{
  const sheetRef = useRef<HTMLDialogElement>(null);
  const headingId = useId();

  const { snapshot, href, title, overview } = project;
  if (!snapshot || !href) return null;

  const address = addressOf(href);
  const classes = `snapshot${className ? ` ${className}` : ""}`;
  const bar = (glyph: string) => (
    <span className="snapshot-bar" aria-hidden="true">
      <span className="snapshot-lights"><i /><i /><i /></span>
      <span className="snapshot-address">{address}</span>
      <span className="snapshot-go">{glyph}</span>
    </span>
  );
  const shot = (
    <span className="snapshot-view">
      <img
        src={snapshot.src}
        width={snapshot.width}
        height={snapshot.height}
        alt={snapshot.alt}
        loading="lazy"
        decoding="async"
      />
    </span>
  );

  if (!overview)
  {
    return (
      <a className={classes} href={href} target="_blank" rel="noopener noreferrer" aria-label={PROJECT_UI.openSite(title)}>
        {bar("↗")}
        {shot}
      </a>
    );
  }

  const close = () => sheetRef.current?.close();

  return (
    <>
      <button
        type="button"
        className={classes}
        aria-haspopup="dialog"
        aria-label={PROJECT_UI.openOverview(title)}
        onClick={() => sheetRef.current?.showModal()}
      >
        {bar("⤢")}
        {shot}
      </button>

      <dialog
        ref={sheetRef}
        className={`snapshot-sheet is-${theme}`}
        aria-labelledby={headingId}
        /* a click on the backdrop lands on the dialog itself */
        onClick={(event) => { if (event.target === sheetRef.current) close(); }}
      >
        <div className="sheet-body">
          <button type="button" className="sheet-close" onClick={close} aria-label={PROJECT_UI.closeOverview}>
            ×
          </button>

          <figure className="sheet-shot">
            <span className="snapshot-bar" aria-hidden="true">
              <span className="snapshot-lights"><i /><i /><i /></span>
              <span className="snapshot-address">{address}</span>
            </span>
            <img src={snapshot.src} width={snapshot.width} height={snapshot.height} alt={snapshot.alt} loading="lazy" decoding="async" />
          </figure>

          <div className="sheet-copy">
            <p className="sheet-kicker">{projectPeriod(project)}</p>
            <h2 className="sheet-title" id={headingId}>{title}</h2>
            <p className="sheet-role">{project.role}</p>
            <p className="sheet-lede">{overview.lede}</p>

            <h3 className="sheet-label">{PROJECT_UI.built}</h3>
            <ul className="sheet-built">
              {overview.built.map((item) => <li key={item}>{item}</li>)}
            </ul>

            <ul className="sheet-stack" aria-label={PROJECT_UI.stack}>
              {project.stack.map((tech) => <li key={tech}>{tech}</li>)}
            </ul>

            <div className="sheet-links">
              <a className="sheet-link is-primary" href={href} target="_blank" rel="noopener noreferrer">
                {CTA.visit} ↗
              </a>
              {overview.links?.map((link) => (
                <a className="sheet-link" key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label} ↗
                </a>
              ))}
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ProjectSnapshot;
